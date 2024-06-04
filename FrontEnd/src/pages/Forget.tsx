import { useState, useEffect } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FormForget from "@/features/auth/components/FormForget";

export default function Forget() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(delay);
  }, []);

  return isLoading ? (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      style={{ backgroundColor: "#1d1d1d", height: "100vh", overflowY: "hidden" }}
      height={"750px"}
    >
      <Spinner color="green" />
      <Text mt={2} color="white">Please wait...</Text>
    </Box>
  ) : (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      h={"100vh"}
      w={"full"}
      style={{ backgroundColor: "#1d1d1d", height: "100vh", overflowY: "hidden" }}
      height={"750px"}
    >
      <FormForget />
      <Box display={"flex"} gap={2} mt={4} justifyContent={"space-between"}>
        <Text color={"white"}>Already have account?</Text>
        <Text
          color={"green"}
          cursor={"pointer"}
          onClick={() => navigate("/auth/login")}
        >
          Login
        </Text>
      </Box>
    </Box>
  );
}
