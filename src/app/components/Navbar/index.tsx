import { Flex, Image } from '@chakra-ui/react';
import React from 'react';

const Navbar:React.FC = () => {
  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex align="center">
        <Image 
          src="/images/redditHead.svg" 
          alt="Logo: Reddit mascot in an orange-red bubble" 
          height="30px"
        />
        <Image 
          src="/images/redditText.svg" 
          alt="Reddit text logo" 
          height="46px"
          display={{ base: "none", md: "unset" }} 
        />
      </Flex>
    </Flex>
  )
}

export default Navbar;
