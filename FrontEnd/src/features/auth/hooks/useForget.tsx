import React, { useState } from "react";
import { API } from "@/libs/api";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function useForget() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
  });

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  async function handleForget() {
    try {
      alert(JSON.stringify(form));
      await API.post("/auth/forget", form);
      navigate("/auth/reset");
    } catch (error) {
      throw new Error();
    }
  }

  return {
    handleForget,
    handleChange,
    isOpen: isVisible,
    onClose,
    onOpen,
  };
}

export default useForget;
