import { useState } from "react";
import axiosInstance from "../api/axiosInstance/axiosInstance";
import { useNavigates } from "./useNavigates";
import { DataUserLogin } from "../models/DataUserLogin.model";
import { AlertCustomProps } from "../models/AlertCustom";

interface ResponseToken {
  token: string;
  message?: string;
}

export const useAuthLogin = () => {
  const [userDataLogin, setUserDataLogin] = useState<DataUserLogin>({
    Email: "",
    Password: "",
  });

  const [alerta, setAlerta] = useState<AlertCustomProps | null>(null);
  const { goToDashboard } = useNavigates();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDataLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (): Promise<boolean> => {
    const { Email, Password } = userDataLogin;

    if (!Email || !Password) {
      setAlerta({
        id: Date.now(),
        titulo: "Advertencia",
        mensaje: "Debe llenar todos los campos antes de continuar.",
        tipoAlerta: "warning",
      });
      return false;
    }

    try {
      const response = await axiosInstance.post<ResponseToken>(
        "/auth/login",
        userDataLogin
      );

      const { token, message } = response.data;

      if (!token) {
        setAlerta({
          id: Date.now(),
          titulo: "Error",
          mensaje: message || "Error al iniciar sesión",
          tipoAlerta: "error",
        });
        return false;
      }

      localStorage.setItem("token", token);

      setAlerta({
        id: Date.now(),
        titulo: "Éxito",
        mensaje: "Inicio de sesión exitoso",
        tipoAlerta: "success",
      });

      goToDashboard();
      return true;
    } catch (error: any) {
      setAlerta({
        id: Date.now(),
        titulo: "Error",
        mensaje: error.response?.data?.message || "Ocurrió un error interno",
        tipoAlerta: "error",
      });
      return false;
    }
  };

  return {
    userDataLogin,
    handleChange,
    handleSubmit,
    alerta,
  };
};
