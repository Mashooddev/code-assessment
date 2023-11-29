import React from "react";
import { Checkbox as ChakraCheckbox, Text, HStack } from "@chakra-ui/react";

const CustomCheckbox = ({ checked, onChange }) => {
  return (
    <HStack mt={4}>
      <ChakraCheckbox id="agree" isChecked={checked} onChange={onChange} />
      <Text>Agree to terms</Text>
    </HStack>
  );
};

export default CustomCheckbox;
