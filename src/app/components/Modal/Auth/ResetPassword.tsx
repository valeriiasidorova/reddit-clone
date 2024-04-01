import React from "react";
import { Input, Button, Flex, Text, Icon } from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Text fontSize="xs" mb={5} align="center">
        Enter your email address and we&apos;ll send you a link to reset your
        password
      </Text>
      <form onSubmit={onSubmit}>
        <Input
          required
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
        <Button
          // isLoading={}
          type="submit"
          width="100%"
          height="36px"
          mb={3}
        >
          Reset password
        </Button>
        <Flex fontSize="9pt" justify="center" align="center" color="blue.500">
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
      </form>
    </>
  );
};

export default ResetPassword;
