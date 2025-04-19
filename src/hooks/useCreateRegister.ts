import React, { useState } from "react";
import { DataUser } from "../models/DataUserRegister.model";
import { AlertCustomProps } from "../models/AlertCustom";
import { useNavigates } from "./useNavigates";
import axiosInstance from "../api/axiosInstance/axiosInstance";
import { ResponseToken } from "../models/ResponseToken";

export const useCreateRegister = () => {
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [alerta, setAlerta] = useState<AlertCustomProps | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { goToDashboard } = useNavigates();

  const [userData, setUserData] = useState<DataUser>({
    FullName: "",
    Email: "",
    DateOfBirth: "",
    telefono: "",
    Password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "confirmar_contraseña") {
      setConfirmarContraseña(value);
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitGoogle = () => {
    // Integración futura
  };

  const handleSubmit = async (): Promise<boolean> => {
    const { FullName, Email, DateOfBirth, telefono, Password } = userData;

    // Validar que todos los campos estén completos
    if (!FullName || !Email || !DateOfBirth || !telefono || !Password || !confirmarContraseña) {
      setAlerta({
        id: Date.now(),
        titulo: "Advertencia",
        mensaje: "Debe llenar todos los campos antes de continuar.",
        tipoAlerta: "warning",
      });
      return false;
    }

    if (!acceptedTerms) {
      setAlerta({
        id: Date.now(),
        titulo: "Advertencia",
        mensaje: "Debes aceptar los términos y condiciones",
        tipoAlerta: "warning",
      });
      return false;
    }

    if (Password !== confirmarContraseña) {
      setAlerta({
        id: Date.now(),
        titulo: "Error",
        mensaje: "Las contraseñas no coinciden",
        tipoAlerta: "error",
      });
      return false;
    }

    try {
      const response = await axiosInstance.post<ResponseToken>("/user/register", {
        Email,
        Password,
        FullName,
        DateOfBirth,
        telefono,
        acceptedTerms,
      });

      if (!response.data.token) {
        setAlerta({
          id: Date.now(),
          titulo: "Error",
          mensaje: response.data.message || "Error desconocido",
          tipoAlerta: "error",
        });
        return false;
      }

      sessionStorage.setItem("token", response.data.token);

      setAlerta({
        id: Date.now(),
        titulo: "Éxito",
        mensaje: "Registro exitoso",
        tipoAlerta: "success",
      });

      goToDashboard();
      return true;
    } catch (error: any) {
      setAlerta({
        id: Date.now(),
        titulo: "Error",
        mensaje: error.response?.data?.message || "Ocurrió un problema",
        tipoAlerta: "error",
      });
      return false;
    }
  };

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
  };

  return {
    handleSubmitGoogle,
    handleSubmit,
    handleChange,
    confirmarContraseña,
    alerta,
    userData,
    acceptedTerms,
    handleAcceptTerms
  };
};
