// CreatePostLink redirects to SubmitPostPage
"use client";
import React from "react";
import { Flex, Icon, Input } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { BsLink45Deg } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { authModalState } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const CreatePostLink = ({ communityId }: { communityId: string }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const onClick = () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    router.push(`/r/${communityId}/submit`);
  };

  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="white"
      height="56px"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.300"
      p="8px 12px"
      mb={4}
    >
      <Icon as={FaReddit} fontSize={36} color="gray.300" mr={4} />
      <Input
        placeholder="Create Post"
        fontSize="10pt"
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={4}
        mr={4}
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        onClick={onClick}
      />
      <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="gray.400"
        cursor="pointer"
      />
      <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" />
    </Flex>
  );
};
export default CreatePostLink;
