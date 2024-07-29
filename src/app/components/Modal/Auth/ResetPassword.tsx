import React, { useState } from "react";
import { Input, Button, Flex, Text, Icon } from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
// import { FIREBASE_ERRORS } from "@/firebase/errors";

const ResetPassword: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendPasswordResetEmail(email);
    setSuccess(true); // TODO: should only happen if there are no POST errors
  };

  return (
    <>
      {success ? (
        <Text mb={4} fontSize="xs" align="center">
          We&apos;ve sent a link to the email address associated with your
          account
        </Text>
      ) : (
        <>
          <Text fontSize="xs" mb={5} align="center">
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </Text>
          <form onSubmit={onSubmit} style={{ width: "100%" }}>
            <Input
              required
              onChange={(event) => setEmail(event.target.value)}
              name="email"
              placeholder="Email"
              type="email"
              mb={4}
              fontSize="10pt"
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
              bg="gray.50"
            />
            <Text color="red" fontSize="10pt" mb={2} ml={4}>
              {error?.message}
            </Text>
            <Button
              isLoading={sending}
              type="submit"
              width="100%"
              height="36px"
              mb={3}
            >
              Reset password
            </Button>
          </form>
        </>
      )}
      <Flex fontSize="9pt" align="center" color="blue.500">
        <Text
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          LOG IN
        </Text>
        <Icon as={BsDot} />
        <Text
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
        >
          SIGN UP
        </Text>
      </Flex>
    </>
  );
};

export default ResetPassword;
