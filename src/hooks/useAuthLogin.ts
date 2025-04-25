import { useState } from "react";
import { useNavigates } from "./useNavigates";
import { DataUserLogin } from "../models/DataUserLogin.model";
import { AlertCustomProps } from "../models/AlertCustom";
import { loginUser } from "../services/authService";
import { useAuth } from "./useAuth";

export const useAuthLogin = () => {
  const [userDataLogin, setUserDataLogin] = useState<DataUserLogin>({
    Email: "",
    Password: "",
  });
  const { setToken, setUserData } = useAuth();
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
      const { data, token, message } = await loginUser(userDataLogin);

      if (!token) {
        setAlerta({
          id: Date.now(),
          titulo: "Error",
          mensaje: message || "Error al iniciar sesión",
          tipoAlerta: "error",
        });
        return false;
      }

      setToken(token);
      if (data) {
        setUserData(data);
      }

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
