import React, { useState } from "react";
import { DataUser } from "../models/DataUserRegister.model";

export const useProfile = () => {
  const [userData, setUserData] = useState<DataUser>({
    FullName: "Juan Hernández",
    Email: "jh746509@gmail.com",
    DateOfBirth: "2005-10-10",
    telefono: "3112506998",
    Password: "123456789.As",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await new Promise((resolve, reject) => setTimeout(() => {
        Math.random() > 0.5 ? resolve('Exito'):reject('Error');
      },2000));

      setMessage({ text: "¡Accion completada con exito!", type:'success'})
    } catch (error) {
      setMessage({ text: "Hubo un error, intenta de nuevo", type:'error'})

    }
  };

  return { userData, message,setMessage, handleChange, handleSave };
};
