import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

const OAuthButtons:React.FC = () => {
  
  return (
  <Flex direction="column" width="100%" mb={4}>
    <Button variant="oauth" mb={2}>
      <Image 
        src="/images/googlelogo.png" 
        alt="Google logo" 
        height="20px"
        // mr={4}
      />
      <Text flexGrow={1}>Continue with Google</Text>
    </Button>
    <Button variant="oauth"> {/* TODO: change logo and text later */}
      <Image
          src="/images/googlelogo.png" 
          alt="Other provider" 
          height="20px"
          // mr={4}
        />
      <Text flexGrow={1}>Continue with Other</Text>
    </Button>
  </Flex>
  );
}
export default OAuthButtons;
