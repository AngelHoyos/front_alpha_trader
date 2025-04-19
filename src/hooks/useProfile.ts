import React, { useState } from "react";
import { DataUser } from "../models/DataUserRegister.model";

export const useProfile = () => {
  const [userData, setUserData] = useState<DataUser>({
    FullName: "Juan Hernández",
    Email: "jh746509@gmail.com",
    DateOfBirth: "2005-10-10",
    telefono: "3112506998",
    Password: "123456789.As",
    coinsList: ["bitcoin", "ethereum"],
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCoinPreferencesChange = (updatedCoins: string[]) => {
    setUserData((prev) => ({ ...prev, coinsList: updatedCoins }));
  };

  const handleSave = async () => {
    try {
      await new Promise((resolve, reject) =>
        setTimeout(() => {
          Math.random() > 0.5 ? resolve("Exito") : reject("Error");
        }, 2000)
      );

      setMessage({ text: "¡Acción completada con éxito!", type: "success" });
    } catch (error) {
      setMessage({ text: "Hubo un error, intenta de nuevo", type: "error" });
    }
  };

  const handleEditClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return {
    userData,
    setUserData,
    message,
    setMessage,
    handleChange,
    handleSave,
    openModal,
    handleEditClick,
    handleCloseModal,
    handleCoinPreferencesChange,
  };
};
