"use client";

import React from "react";
import { Icon } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";

const CommunityIcon: React.FC = () => {
  return (
    <Icon
      as={FaReddit}
      fontSize={64}
      position="relative"
      top={-3}
      color="blue.500"
      border="4px solid white"
      borderRadius="50%"
    />
  );
};

export default CommunityIcon;
