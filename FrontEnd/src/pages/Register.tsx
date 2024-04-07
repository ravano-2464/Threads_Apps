import { useState, useEffect } from 'react';
import { Box, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FormRegister from "@/features/auth/components/FormRegister";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 500); 
    return () => clearTimeout(delay);
  }, []);

  return (
    isLoading ? (
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={"150px"}
        style={{ backgroundColor: "black" }} 
      >
        <Spinner color='green.500' />
        <Text mt={2}>Please wait...</Text>
      </Box>
    ) : (
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={"100px"}
      >
        <FormRegister />
        <Box display={"flex"} gap={2} mt={4}>
          <Text>Already have account?</Text>
          <Text 
            color={"green"} 
            cursor={"pointer"}  
            onClick={() => navigate("/auth/login")}
          >
            Login
          </Text>
        </Box>
      </Box>
    )
  )
}