import { useRegister } from '../hooks/useRegister';
import { FormControl, Input, Text, Button, Box } from '@chakra-ui/react';

export default function FormRegister() {
  const { form, handleChange, handleRegister } = useRegister();

  return (
    <FormControl
      isRequired
      width={"350px"}
      display="flex"
      flexDirection="column"
      padding={5}
      borderRadius={10}
      style={{ backgroundColor: "#1d1d1d" }}
    >
      <Box mb={6}>
        <Text fontSize="3xl" fontWeight="bold" color="green">
          Circle
        </Text>
        <Text as="b" fontSize="3xl" color="#ffffff">
          Register for Circle
        </Text>
      </Box>
      <Input 
        border={"2px solid #d3d3d3"}
        fontSize={"sm"}
        color="white"
        placeholder="First name" 
        name="full_name" 
        onChange={handleChange}
        value={form.full_name}
        mb={3}
      />
      <Input 
        border={"2px solid #d3d3d3"}
        fontSize={"sm"}
        color="white"
        placeholder="Username" 
        name="username" 
        onChange={handleChange}
        value={form.username}
        mb={3}
      />
      <Input 
        border={"2px solid #d3d3d3"}
        fontSize={"sm"}
        color="white"
        placeholder="Email" 
        name="email" 
        onChange={handleChange}
        value={form.email}
        mb={3}
      />
      <Input 
        type="password" 
        border={"2px solid #d3d3d3"}
        fontSize={"sm"}
        color="white"
        placeholder="Password" 
        name="password" 
        onChange={handleChange}
        value={form.password}
        mb={3}
      />
      <Button
        backgroundColor="green"
        color="white"
        _hover={{ bg: "green" }}
        onClick={handleRegister}
        mb={3}
      >
        Create 
      </Button>
    </FormControl>
  );
}