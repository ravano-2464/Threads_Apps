import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { IUserRegister } from "@/types/User";
import { API } from "@/libs/api";

export function useRegister() {
  const navigate: any = useNavigate()
  
  const [form, setForm] = useState<IUserRegister>({
    full_name: "",
    username: "",
    email: "",
    password: ""
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleRegister() {
    try {
      await API.post('/auth/register', form)
      navigate("/auth/login")
    } catch (error) {
      throw new Error
    }
  }

  return { form, handleChange, handleRegister };
}