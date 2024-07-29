import React, { useEffect } from "react";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// both for login and signup modals
const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  // Cloud Functions alternative for adding custom user properties (e.g. karma)
  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image
          src="/images/googlelogo.png"
          alt="Google logo"
          height="20px"
          // mr={4}
        />
        <Text flexGrow={1}>Continue with Google</Text>
      </Button>
      <Button variant="oauth">
        {" "}
        {/* TODO: change logo and text later */}
        <Image
          src="/images/googlelogo.png"
          alt="Other provider"
          height="20px"
          // mr={4}
        />
        <Text flexGrow={1}>Continue with Other</Text>
      </Button>
      {error && (
        <Text color="red" fontSize="10pt" mt={2} ml={5}>
          {error.message}
        </Text>
      )}
    </Flex>
  );
};

export default OAuthButtons;
