import React from "react";
import { useRecoilState } from "recoil";
import { postState } from "@/atoms/postsAtom";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};
  const onDeletePost = async () => {};
  const onSelectPost = () => {};

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  };
};
export default usePosts;
