import React from "react";
import { Input } from "@chakra-ui/react";

const CustomInput = ({
  value,
  onChange,
  mt,
  errorBorderColor,
  placeholder,
}) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      mt={mt}
      variant="outline"
      errorBorderColor={errorBorderColor}
      placeholder={placeholder}
    />
  );
};

export default CustomInput;
