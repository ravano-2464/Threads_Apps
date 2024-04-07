import { useRegister } from '../hooks/useRegister'
import { FormControl, Input, Text, Button, Box } from '@chakra-ui/react'

export default function FormRegister() {
  const { form, handleChange, handleRegister } = useRegister()

  return (
    <FormControl
      isRequired
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
        mb={6}
        >
        REGISTER
      </Text>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={3}
      >
        <Input 
          border={"2px solid #d3d3d3"}
          fontSize={"sm"}
          placeholder="First name" 
          name="full_name" 
          onChange={handleChange}
          value={form.full_name}
        />
        <Input 
          border={"2px solid #d3d3d3"}
          fontSize={"sm"}
          placeholder="Username" 
          name="username" 
          onChange={handleChange}
          value={form.username}
        />
        <Input 
          border={"2px solid #d3d3d3"}
          fontSize={"sm"}
          placeholder="Email" 
          name="email" 
          onChange={handleChange}
          value={form.email}
        />
        <Input 
          type="password" 
          border={"2px solid #d3d3d3"}
          fontSize={"sm"}
          placeholder="Password" 
          name="password" 
          onChange={handleChange}
          value={form.password}
        />
        <Button 
          backgroundColor={"green"} 
          colorScheme="green" 
          color={"white"} 
          onClick={handleRegister}
          mt={3}
        >
          Create Account
        </Button>
      </Box>      
    </FormControl>
  )
}