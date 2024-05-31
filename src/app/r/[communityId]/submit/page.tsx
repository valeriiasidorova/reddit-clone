import React from "react";
import PageLayout from "@/app/components/Community/layout";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "@/app/components/Community/Posts/NewPostForm";

const SubmitPostPage: React.FC = () => {
  return (
    <PageLayout>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create a post</Text>
        </Box>
        <NewPostForm />
      </>
      <>{/* About */}</>
    </PageLayout>
  );
};

export default SubmitPostPage;
