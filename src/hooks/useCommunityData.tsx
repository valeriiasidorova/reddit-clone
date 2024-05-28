import React from "react";
import { Community, communityState } from "@/atoms/communitiesAtom";
import { useRecoilState } from "recoil";

const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

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

  const joinCommunity = (communityData: Community) => {};
  const leaveCommunity = (communityId: string) => {};

  return {
    // data and functions that will be accessible by components that use this hook
    communityStateValue,
    onJoinOrLeaveCommunity,
  };
};
export default useCommunityData;
