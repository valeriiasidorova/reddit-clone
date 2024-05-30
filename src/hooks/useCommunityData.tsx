import React, { useEffect, useState } from "react";
import {
  Community,
  CommunitySnippet,
  communityState,
} from "@/atoms/communitiesAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import {
  getDocs,
  collection,
  writeBatch,
  doc,
  increment,
} from "firebase/firestore";
import { authModalState } from "@/atoms/authModalAtom";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // open auth modal if user is not signed in and wants to join the community
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    setLoading(true);
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      // get docs of all communities the user is in
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
      console.log("snippets", snippets);
    } catch (error) {
      console.log("getMySnippets error", error);
    }
    setLoading(false);
  };

  const joinCommunity = async (communityData: Community) => {
    try {
      const batch = writeBatch(firestore);
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };
      // 1. create a new community snippet for this user when they click `join`
      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet // new doc to add to user's communitySnippets
      );

      // 2. update numberOfMembers (+1) on this community
      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1), // object with community properties we want to update
      });
      await batch.commit();

      // 3. after a successful batch, update UI through recoil state (communityState.mySnippets)
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("joinCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    try {
      // 1. delete the community snippet from this user in DB when they click to leave community (`joined` button)
      const batch = writeBatch(firestore);
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );
      // 2. update numberOfMembers (-1) on this community
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });
      await batch.commit();

      // 3. after a successful batch, update UI through recoil state (communityState.mySnippets)
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log("leaveCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return; // prevent calling the func if there's no user
    getMySnippets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // useEffect will be triggered every time `user` changes

  return {
    // data and functions that will be accessible by components that use this hook
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
export default useCommunityData;
