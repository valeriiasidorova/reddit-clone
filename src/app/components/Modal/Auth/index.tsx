import React from 'react';
import { AbsoluteCenter, Box, Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import OAuthButtons from './OAuthButtons';
import AuthInputs from './AuthInputs';

const AuthModal:React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {modalState.view === "login" && "Log In"}
            {modalState.view === "signup" && "Sign Up"}
            {modalState.view === "resetPassword" && "Reset Password"}
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
              {/* <ResetPassword /> */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AuthModal;
