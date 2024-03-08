'use client'

import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import SearchInput from './SearchInput';
import RightContent from './RightContent';

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
      <SearchInput />
      <RightContent />
      
      {/* 
        <Directory /> –– dropdown menu
      */}
    </Flex>
  )
}

export default Navbar;
