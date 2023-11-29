import React from "react";
import { Text as ChakraText } from "@chakra-ui/react";

const CustomText = ({ fontSize, children }) => {
  return <ChakraText fontSize={fontSize}>{children}</ChakraText>;
};

export default CustomText;
