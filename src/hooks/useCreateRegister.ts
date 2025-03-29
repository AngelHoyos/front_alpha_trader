import React, { useState } from "react";
import { DataUser } from "../models/DataUserRegister.model";
import { AlertCustomProps } from "../models/AlertCustom";
import { closeLoading, Loading } from "../components/Alerts/Loading";

export const useCreateRegister = () => {
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [alerta, setAlerta] = useState<AlertCustomProps | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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

  const handleSubmit = () => {
    if (!acceptedTerms) {
      setAlerta({
        id: Date.now(),
        titulo: "Advertencia",
        mensaje: "Debes aceptar los terminos y condiciones",
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

    Loading("Cargando datos...");
    setTimeout(() => {
      closeLoading();
      setAlerta({
        id: Date.now(),
        titulo: "Exito",
        mensaje: "Registro Exitoso",
        tipoAlerta: "success",
      });
    }, 2000);
  };

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
  };

  return{ handleAcceptTerms, handleSubmit, handleChange, confirmarContraseña,alerta,userData,acceptedTerms}
};
