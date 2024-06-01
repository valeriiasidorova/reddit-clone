"use client";
import React from "react";
import PageLayout from "@/app/components/Community/layout";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "@/app/components/Community/Posts/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

const SubmitPostPage = ({ params }: { params: { communityId: string } }) => {
  const [user] = useAuthState(auth);
  return (
    <PageLayout>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create a post</Text>
        </Box>
        {user && <NewPostForm user={user} communityId={params.communityId} />}
      </>
      <>{/* About */}</>
    </PageLayout>
  );
};

export default SubmitPostPage;
