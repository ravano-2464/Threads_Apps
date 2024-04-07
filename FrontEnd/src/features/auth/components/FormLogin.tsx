import { KeyboardEvent } from 'react';
import { FormControl, Input, Text, Button, Box } from "@chakra-ui/react"
import { useLogin } from "../hooks/useLogin"

const FormLogin = () : React.JSX.Element => {
  const { handleChange, handleLogin } = useLogin()

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <FormControl
      isRequired
      display={"flex"}
      flexDirection={"column"}
      gap={3}
      width={"350px"}
      borderRadius={10}
      padding={5}
      boxShadow={"0 0px 6px rgba(50, 50, 93, 0.5), 0 1px 3px rgba(0, 0, 0, 0.08)"} 
    >
      <Text 
        color={"green"} 
        fontSize={"2xl"} 
        fontWeight={"bold"}
        textAlign={"center"}
        mb={3}
        >
        LOGIN
      </Text>
      <Input 
        border={"2px solid #d3d3d3"}
        fontSize={"sm"}
        placeholder="Email" 
        name="email" 
        onChange={handleChange} 
        onKeyDown={handleKeyPress}         
      />
      <Input 
        border={"2px solid #d3d3d3"}
        fontSize={"sm"}
        type="password" 
        placeholder="Password" 
        name="password" 
        onChange={handleChange}    
        onKeyDown={handleKeyPress} 
      />
      <Box display="flex" justifyContent={"flex-end"} fontSize={"sm"}>
        <Text>Forgot password?</Text>
      </Box>
      <Button 
        backgroundColor={"green"} 
        colorScheme="green" 
        color={"white"}
        onClick={handleLogin}
      >
        Login
      </Button>
    </FormControl>
  )
}

export default FormLogin;