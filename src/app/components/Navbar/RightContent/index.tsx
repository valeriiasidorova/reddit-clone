import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import AuthButtons from './AuthButtons';
import AuthModal from '../../Modal/Auth';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';

type RightContentProps = {
  user: any;
};

// `{ user }` is the same as `props.user`
const RightContent:React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
    <AuthModal />
    <Flex justify="center" align="center">
      {user ? <Button onClick={() => signOut(auth)}>Log Out</Button> : <AuthButtons />}
    </Flex>
    </>
  );
}
export default RightContent;
