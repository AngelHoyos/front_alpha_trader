import React, { useState } from "react";
import { DataUser } from "../models/DataUserRegister.model";
import { AlertCustomProps } from "../models/AlertCustom";
import { closeLoading, Loading } from "../components/Alerts/Loading";
import { useNavigates } from "./useNavigates";
import axiosInstance from "../api/axiosinstance/axiosinstance";


export const useCreateRegister = () => {
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [alerta, setAlerta] = useState<AlertCustomProps | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { goToDashboard } = useNavigates();


  const [userData, setUserData] = useState<DataUser>({
    nombre: "",
    correo_electronico: "",
    fecha_nacimiento: "",
    telefono: "",
    contraseña: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "confirmar_contraseña") {
      setConfirmarContraseña(value);
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };


  const handleSubmitFacebook = async () => {
    try {

      window.location.href = "http://localhost:10101/auth/facebook/callback";
      
    } catch (error) {
      console.error("Error al iniciar sesión con Facebook", error);
    }
  };
  

  const handleSubmitGoogle = () => {
    
  };

  
  const handleSubmit = async () => {
    if (!acceptedTerms) {
      setAlerta({
        id: Date.now(),
        titulo: "Advertencia",
        mensaje: "Debes aceptar los términos y condiciones",
        tipoAlerta: "warning",
      });
      return;
    }
  
    if (userData.contraseña !== confirmarContraseña) {
      setAlerta({
        id: Date.now(),
        titulo: "Error",
        mensaje: "Las contraseñas no coinciden",
        tipoAlerta: "error",
      });
      return;
    }
  
    Loading("Registrando usuario...");
  
    try {
      const response = await axiosInstance.post("/user/register", {
        Email: userData.correo_electronico,
        Password: userData.contraseña,
        FullName: userData.nombre,
        DateOfBirth: userData.fecha_nacimiento,
        telefono: userData.telefono,
        acceptedTerms: acceptedTerms,
      });
  
      closeLoading();
  
      const { token } = response.data;
  
      localStorage.setItem("token", token);
  
      setAlerta({
        id: Date.now(),
        titulo: "Éxito",
        mensaje: "Registro exitoso",
        tipoAlerta: "success",
      });
  
      goToDashboard();
    } catch (error: any) {
      closeLoading();
  
      setAlerta({
        id: Date.now(),
        titulo: "Error",
        mensaje: error.response?.data?.message || "Ocurrió un problema",
        tipoAlerta: "error",
      });
    }
  };

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
  };

  return{ handleSubmitGoogle, handleSubmitFacebook,handleAcceptTerms, handleSubmit, handleChange, confirmarContraseña,alerta,userData,acceptedTerms}
};
