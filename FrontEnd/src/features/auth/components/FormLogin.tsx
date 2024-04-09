import React, { KeyboardEvent } from 'react';
import { FormControl, Input, Text, Button, Box, Link } from "@chakra-ui/react";
import { useLogin } from "../hooks/useLogin";

const FormLogin = (): React.JSX.Element => {
  const { handleChange, handleLogin } = useLogin();

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <FormControl
      isRequired
      display="flex"
      flexDirection="column"
      width="350px"
      borderRadius={10}
      padding={5}
    >
      <Box mb={6}>
        <Text fontSize="3xl" fontWeight="bold" color="green">
          Circle
        </Text>
        <Text as="b" fontSize="3xl" color="#ffffff">
          Login to Circle
        </Text>
      </Box>
      <Input
        border="2px solid #d3d3d3"
        fontSize="sm"
        placeholder="Email/Username"
        name="email"
        color="white"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        mb={3}
      />
      <Input
        border="2px solid #d3d3d3"
        fontSize="sm"
        type="password"
        placeholder="Password"
        name="password"
        color="white"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        mb={3}
      />
      <Box textAlign="right" fontSize="sm" mb={3}>
        <Link color="white">Forgot password?</Link>
      </Box>
      <Button
        backgroundColor="green"
        color="white"
        _hover={{ bg: "green" }}
        onClick={handleLogin}
        mb={3}
      >
        Login
      </Button>
    </FormControl>
  );
};

export default FormLogin;
