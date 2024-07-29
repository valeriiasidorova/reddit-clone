import React from "react";
import { useRecoilState } from "recoil";
import { Post, postState } from "@/atoms/postsAtom";
import { deleteObject, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore, storage } from "@/firebase/clientApp";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};
  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      // 1. check if the post has an image attached
      // if yes: delete the image from storage
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      // 2. delete post document from DB
      const postDocRef = doc(firestore, "posts", post.id!);
      await deleteDoc(postDocRef);

      // 3. update UI
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));

      return true;
    } catch (error) {
      return false;
    }
  };

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
