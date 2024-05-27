import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

const CommunityNotFound: React.FC = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      There aren&apos;t any communities with that name.
      <Link href="/">
        <Button mt={4}>Browse Other Communities</Button>
      </Link>
    </Flex>
  );
};
export default CommunityNotFound;
