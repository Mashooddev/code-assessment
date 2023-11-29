import React from "react";
import { Button as ChakraButton } from "@chakra-ui/react";

const CustomButton = ({ onClick, mt, children }) => {
  return (
    <ChakraButton onClick={onClick} mt={mt}>
      {children}
    </ChakraButton>
  );
};

export default CustomButton;
