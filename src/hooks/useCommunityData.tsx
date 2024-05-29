import React, { useEffect, useState } from "react";
import {
  Community,
  CommunitySnippet,
  communityState,
} from "@/atoms/communitiesAtom";
import { useRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import { getDocs, collection } from "firebase/firestore";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    /* TODO: is the user signed in?
      if not => open auth modal
    */
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

  const joinCommunity = (communityData: Community) => {};
  const leaveCommunity = (communityId: string) => {};

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
