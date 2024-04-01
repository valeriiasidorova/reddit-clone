import React, { useEffect } from 'react';
import { AbsoluteCenter, Box, Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/clientApp';
import OAuthButtons from './OAuthButtons';
import AuthInputs from './AuthInputs';
import ResetPassword from './ResetPassword';

const AuthModal:React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  useEffect(() => {
    if(user) handleClose();
    console.log("user", user);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {modalState.view === "login" && "Log In"}
            {modalState.view === "signup" && "Sign Up"}
            {modalState.view === "resetPassword" && "Reset your password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={8}
          >
            <Flex 
              direction="column" 
              align="center"
              justify="center"
              width="70%"
            >
              {modalState.view !== "resetPassword" ? (
                <>
                  <OAuthButtons />
                  {/* Horizontal line */}
                  <Box position="relative" py={6} width="100%">
                    <Divider borderColor="gray.500" />
                    <AbsoluteCenter 
                      bg="white" 
                      px='4' 
                      fontWeight={600} 
                      fontSize="12" 
                      color="gray.500"
                    >
                      OR
                    </AbsoluteCenter>
                  </Box>
                  <AuthInputs />
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>  
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AuthModal;
