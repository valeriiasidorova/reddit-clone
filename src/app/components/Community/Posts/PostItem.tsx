import React, { useState } from "react";
import { Post } from "@/atoms/postsAtom";
import {
  Alert,
  AlertIcon,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => {};
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [error, setError] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  dayjs.extend(RelativeTime);
  const postDate = dayjs(post.createdAt?.seconds * 1000).fromNow();

  // call onDelete and provide error handling
  // TODO: get user's confirmation before deleting
  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post); // boolean
      if (!success) {
        throw new Error("Failed to delete post");
      }
      console.log("Post was successfully deleted");
    } catch (error: any) {
      setError(error.message);
    }
    setLoadingDelete(false);
  };

  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor="gray.300"
      borderRadius={4}
      cursor="pointer"
      _hover={{ borderColor: "gray.500" }}
      onClick={onSelectPost}
    >
      <Flex
        direction="column"
        align="center"
        bg="gray.100"
        p={2}
        width="40px"
        borderRadius={4}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={onVote}
        />
        <Text fontSize="9pt">{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={onVote}
        />
      </Flex>
      <Flex direction="column" width="100%">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text mr={2}>{error}</Text>
          </Alert>
        )}
        <Stack spacing={1} p="10px">
          <Stack direction="row" spacing={1} align="center" fontSize="9pt">
            {/* TODO: Homepage check */}
            <Text>
              Posted by u/{post.creatorDisplayName} {postDate}
            </Text>
          </Stack>
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="10pt">{post.body}</Text>
          {post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              {loadingImage && (
                <Skeleton height="200px" width="100%" borderRadius={4} />
              )}
              <Image
                alt="Post Image"
                src={post.imageURL}
                maxHeight="460px"
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
              ></Image>
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={1} color="gray.500" fontWeight={600}>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            cursor="pointer"
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize="9pt">{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            cursor="pointer"
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt">Share</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            cursor="pointer"
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize="9pt">Save</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              cursor="pointer"
              _hover={{ bg: "gray.200" }}
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size="xs" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize="9pt">Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
