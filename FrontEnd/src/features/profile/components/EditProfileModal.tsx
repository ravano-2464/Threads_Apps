import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { useProfile } from "../hooks/useProfile";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function EditProfileModal(props: any) {
  const { handleChange, form, handleSubmit, preview } = useProfile();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box>
            <Image
              borderRadius="full"
              boxSize="100px"
              src={
                typeof preview === "string"
                  ? preview
                  : typeof form?.image === "string"
                  ? form?.image
                  : ""
              }
              alt="image-profile"
              objectFit={"cover"}
            />
          </Box>

          <FormControl>
            <FormLabel
              htmlFor="upload"
              w={8}
              h={8}
              borderRadius={"full"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              position={"absolute"}
              bg={"gray"}
              textColor={"white"}
              cursor={"pointer"}
              top={"-90px"}
              left={"75px"}
            >
              <AiFillEdit />
            </FormLabel>
            <Input
              ref={initialRef}
              type="file"
              hidden
              id="upload"
              onChange={handleChange}
              name="image"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Full Name</FormLabel>
            <Input
              ref={initialRef}
              defaultValue={form?.full_name}
              placeholder="First name"
              onChange={handleChange}
              name="full_name"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Username</FormLabel>
            <Input
              ref={initialRef}
              defaultValue={form?.username}
              placeholder="username"
              onChange={handleChange}
              name="username"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input
              ref={initialRef}
              defaultValue={form?.description}
              placeholder="description"
              onChange={handleChange}
              name="description"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            bg={"green"}
            colorScheme="green"
            mr={3}
            px={10}
            onClick={async () => {
              await handleSubmit.mutate()
              props.onClose()
            }}
            borderRadius={"full"}
          >
            Save
          </Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}