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
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      style={{ backgroundColor: "#1d1d1d", height: "100vh", overflowY: "hidden" }}
    >
      {isLoading ? (
        <>
          <Spinner color='green' />
          <Text mt={2} color={"white"}>Please wait...</Text>
        </>
      ) : (
        <>
          <FormRegister />
          <Box display={"flex"} gap={2} mt={4} justifyContent={"space-between"}>
            <Text color={"white"}>Already have an account?</Text>
            <Text 
              color={"green"} 
              cursor={"pointer"}  
              onClick={() => navigate("/auth/login")}
            >
              Login
            </Text>
          </Box>
        </>
      )}
    </Box>
  );
}
