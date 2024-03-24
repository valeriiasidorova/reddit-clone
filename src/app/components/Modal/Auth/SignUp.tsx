import React, { useState } from 'react';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';

const SignUp:React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [ error, setError ] = useState(""); // form error
  const [ createUserWithEmailAndPassword, user, loading, userError ] = useCreateUserWithEmailAndPassword(auth);

  // Firebase logic
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (error) setError("");
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Passwords do not match");
    };
    /* TODO: add more validation later (min password length, special characters, email domain, outline incorrect field, disable submit button, etc.) */

    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    
    setSignUpForm(prev => ({
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
      <Input 
        required
        name="confirmPassword" 
        onChange={onChange}
        placeholder="Confirm password" 
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
        {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button 
        type="submit"
        width="100%"
        height="36px"
        mb={2}
      >
        Sign Up
      </Button>
      <Flex
        fontSize="9pt"
        justifyContent="center"
      >
        <Text mr={1}>Already a redditor?</Text>
        <Text 
          color="blue.500" 
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
      </Flex>
    </form>
  );
}

export default SignUp;
