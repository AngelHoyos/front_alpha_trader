import { DataUserLogin } from "./../models/DataUserLogin.model";
import { useState } from "react";
import axiosInstance from "../api/axiosinstance/axiosinstance";
import { useNavigates } from "./useNavigates";


export const useAuthLogin = () => {
  const [userDataLogin, setUserDataLogin] = useState<DataUserLogin>({
    correo_electronico: "",
    contraseña: "",
  });

  const { goToDashboard } = useNavigates();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDataLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        Email: userDataLogin.correo_electronico,
        Password: userDataLogin.contraseña,
      });

      const { token } = response.data;

      localStorage.setItem("token", token);
      console.log("Usuario autenticado con éxito");

      goToDashboard();     } catch (error: any) {
      console.error("Error en login:", error.response?.data || error.message);
      alert("Usuario o contraseña incorrectos");
    }
  };
   return {userDataLogin, handleChange, handleSubmit};
};

