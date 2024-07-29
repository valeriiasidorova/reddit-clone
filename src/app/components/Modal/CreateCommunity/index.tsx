import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import {
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { auth, firestore } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void; // void == function doesn't return anything
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // recalculate how many characters left
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;

    setCommunityName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");
    // validate the community name
    // TODO: validation should happen during onChange
    const format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community names must be between 3-21 characters, and can only contain letters, numbers, or underscores"
      );
      return;
    }

    setLoading(true);
    try {
      const communityDocRef = doc(firestore, "communities", communityName);

      // wrapping create-community logic in a transaction to make sure every operation within it works
      // if an operation within the transaction fails, the rest will fail too => community won't be created and stored in DB
      await runTransaction(firestore, async (transaction) => {
        // Check if community exists in DB
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(
            `Sorry, r/${communityName} is already taken. Try another name`
          );
        }

        // Create community
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        // Create `communitySnippet` on user
        transaction.set(
          // db path structure: collection – document - collection – document, etc.
          /* In this case it means: 
            go to the `users` collection,
            find the document of the current `user`,
            find the `communitySnippets` subcollection inside `user`,
            create a document (communitySnippet) for the new community joined, created, or moderated by this user
           */
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          // then pass in the data that should be stored inside this `communitySnippet`
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });
    } catch (error: any) {
      console.log("handleCreateCommunity error", error);
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={4}
          >
            Create a community
          </ModalHeader>
          <Box pl={4} pr={4}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChange}
              />
              <Text
                fontSize="9pt"
                mt={1}
                color={charsRemaining === 0 ? "red" : "gray.500"}
              >
                {charsRemaining} characters remaining
              </Text>
              <Text fontSize="9pt" color="red" pt={1}>
                {error}
              </Text>
              <Box mt={4} mb={4}>
                <Text mb={2} fontSize={15} fontWeight={600}>
                  Type
                </Text>
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon mr={2} color="gray.500" as={BsFillPersonFill} />
                      <Text fontSize="10pt" mr={1}>
                        Public
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt="3px">
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon mr={2} color="gray.500" as={BsFillEyeFill} />
                      <Text fontSize="10pt" mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt="3px">
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon mr={2} color="gray.500" as={HiLockClosed} />
                      <Text fontSize="10pt" mr={1}>
                        Private
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt="3px">
                        Only approved users can view and submit to this
                        community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>
          <ModalFooter bg="gray.100" borderRadius="0 0 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={3}
              _hover={{ bg: "gray.50" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
