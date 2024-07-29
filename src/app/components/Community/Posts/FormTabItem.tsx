import React from "react";
import { TabItem } from "./NewPostForm";
import { Flex, Icon, Text } from "@chakra-ui/react";

type FormTabItemProps = {
  item: TabItem;
  selected: boolean;
  setSelectedTab: (value: string) => void;
};

const FormTabItem: React.FC<FormTabItemProps> = ({
  item,
  selected,
  setSelectedTab,
}) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      p="14px 0"
      cursor="pointer"
      fontWeight={700}
      borderRightColor="gray.200"
      color={selected ? "blue.500" : "gray.500"}
      borderWidth={selected ? "0 1px 2px 0" : "0 1px 1px 0"}
      borderBottomColor={selected ? "blue.500" : "gray.200"}
      _hover={{ bg: "gray.50" }}
      onClick={() => setSelectedTab(item.title)}
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon as={item.icon} />
      </Flex>
      <Text fontSize="10pt">{item.title}</Text>
    </Flex>
  );
};
export default FormTabItem;
