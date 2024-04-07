import { useRegister } from '../hooks/useRegister';
import { FormControl, Input, Text, Button, Box, VStack } from '@chakra-ui/react';

export default function FormRegister() {
  const { form, handleChange, handleRegister } = useRegister();

  return (
    <Box
      bg="#1d1d1d"
      h="100vh"
      w="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box maxW="md" mx="auto" w="50%" p={6}>
        <VStack spacing={4} align="stretch">
          <Text as="b" fontSize="3xl" color="#04A51E">
            Circle
          </Text>
          <Text as="b" fontSize="3xl" color="#ffffff">
            Create account circle
          </Text>
          <form onSubmit={handleRegister}>
            <FormControl>
            <Input 
               border={"2px solid #d3d3d3"}
               fontSize={"sm"}
               placeholder="Full Name *" 
               name="full_name" 
               color={'white'}
               value={form.full_name}
               onChange={handleChange}
              />
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Username *"
                color={'white'}
                value={form.username}
                onChange={handleChange}
              />
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email *"
                color={'white'}
                value={form.email}
                onChange={handleChange}
              />
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password *"
                color={'white'}
                value={form.password}
                onChange={handleChange}
              />
            <Button
              type="submit"
              colorScheme="teal"
              color="#ffffff"
              py={5}
              mt={4}
              size="xs"
              w="100%"
              bg="#04A51E"
              borderRadius="10px"
            >
              Create Account
            </Button>
            </FormControl>
          </form>
        </VStack>
      </Box>
    </Box>
  );
}
