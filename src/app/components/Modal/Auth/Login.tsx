import React, { useState } from 'react';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';

type LoginProps = {};

const Login:React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  // Firebase logic
  const [ signInWithEmailAndPassword, user, loading, error ] = useSignInWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
    /* TODO: add more validation later */
  };
  
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setLoginForm(prev => ({
      ...prev, 
      [event.target.name]: event.target.value,
    }))
  };

  return (
    <form onSubmit={onSubmit}>
      <Input 
        required
        name="email" 
        onChange={onChange}
        placeholder="Email" 
        type="email" 
        mb={2} 
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
      <Input 
        required
        name="password" 
        onChange={onChange}
        placeholder="Password" 
        type="password"
        mb={2}
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
        {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button 
        isLoading={loading}
        type="submit"
        width="100%"
        height="36px"
        mb={3}
      >
        Log In
      </Button>
      <Text 
        fontSize="9pt"
        align="center"
        color="blue.500" 
        cursor="pointer"
        mb={3}
        onClick={() => 
          setAuthModalState((prev) => ({
          ...prev,
          view: "resetPassword",
          }))
        }
        >
          Forgot password?
        </Text>
      <Flex
        fontSize="9pt"
        justifyContent="center"
      >
        <Text mr={1}>New here?</Text>
        <Text 
          color="blue.500" 
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
  );
};

export default Login;
