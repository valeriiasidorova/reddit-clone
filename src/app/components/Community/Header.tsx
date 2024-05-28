import React from "react";
import { Community } from "@/atoms/communitiesAtom";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import CommunityIcon from "./CommunityIcon";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const isJoined = false; // TODO: get this data from communitySnippets
  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justify="center" bg="white" flexGrow={1}>
        <Flex width="95%" maxWidth="860px">
          {/* TODO: add Image logic */}
          {communityData.imageURL ? <Image alt="" /> : <CommunityIcon />}
          {/* TODO: fix the icon appearance */}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height="30px"
              pr={6}
              pl={6}
              /* TODO: onClick={onJoin} */
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
