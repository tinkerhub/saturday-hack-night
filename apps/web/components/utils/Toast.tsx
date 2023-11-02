import React from "react";
import { HStack, Text } from "@chakra-ui/react";

const Toast = ({ title, status = "success" }: ToastProps) => (
  <HStack
    backgroundColor={
      status === "success" ? "rgb(50, 186, 124)" : "rgb(226, 76, 75)"
    }
    borderRadius="15px"
    width="fit-content"
    alignItems="center"
  >
    <Text
      paddingBlock="5px"
      paddingInline="10px"
      fontSize="16px"
      textColor="white"
      fontFamily="Clash Display"
      fontWeight="medium"
    >
      {title}
    </Text>
  </HStack>
);
interface ToastProps {
  title: React.ReactNode;
  status?: string;
}
export { Toast };
