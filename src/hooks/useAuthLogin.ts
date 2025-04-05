import { useState } from "react";
import axiosInstance from "../api/axiosInstance/axiosInstance";
import { useNavigates } from "./useNavigates";
import { DataUserLogin } from "../models/DataUserLogin.model";

interface ResponseToken {
  token: string;
  message?: string;
}

export const useAuthLogin = () => {
  const [userDataLogin, setUserDataLogin] = useState<DataUserLogin>({
    Email: "",
    Password: "",
  });

  const { goToDashboard } = useNavigates();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDataLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post<ResponseToken>("/auth/login", userDataLogin);

      const { token } = response.data;

      localStorage.setItem("token", token);
      console.log("Usuario autenticado con éxito");

      goToDashboard();
    } catch (error: any) {
      console.error("Error en login:", error.response?.data);
    }
  };

  return {
    userDataLogin,
    handleChange,
    handleSubmit,
  };
};
