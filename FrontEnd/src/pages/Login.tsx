import { Box, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FormLogin from "@/features/auth/components/FormLogin";
import { useState, useEffect } from 'react'

export default function Login() {
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
        style={{ backgroundColor: "#1d1d1d", height: "100vh", overflowY: "hidden" }}
        height={"750px"}
      >
        <Spinner color='green' />
        <Text mt={2} color={"white"}>Please wait...</Text>
      </Box>
    ) : (
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        style={{ backgroundColor: "#1d1d1d", height: "100vh", overflowY: "hidden"}}
        height={"750px"}
      >
        <FormLogin />
        <Box display={"flex"} gap={2} mt={4}>
          <Text color={"white"}>Don't have an account yet ?</Text>
          <Text color={"green"} cursor={"pointer"} onClick={() => navigate("/auth/register")}>
            Create account
          </Text>
        </Box>
      </Box>
    )
  );
}