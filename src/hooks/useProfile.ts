import React, { useEffect, useState } from "react";
import { ApiResponse, DataUser, normalizeUserData, RawUserData } from "../models/DataUserRegister.model";
import { useAuth } from "./useAuth";
import axiosInstance from "../api/axiosInstance/axiosInstance";

export const useProfile = () => {
  const [userData, setUserData] = useState<DataUser | null>(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(true); 
  const [openModal, setOpenModal] = useState(false);
  const { token } = useAuth();

  const fetchUserData = async () => {
    if (!token) {
      setMessage({ text: "No estas autenticado", type: " error" });
      setLoading(false);
      return;
    }
    try {
      const response = await axiosInstance.get<ApiResponse<RawUserData>>("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const rawUserData = response.data.data;
      const normalizedData=normalizeUserData(rawUserData);
      console.log(normalizedData);
      
      setUserData(normalizedData);
      setLoading(false); 
    } catch (error) {
      setMessage({ text: "Error al cargar el perfil", type: "error" });
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (userData) {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const handleCoinPreferencesChange = (updatedCoins: string[]) => {
    if (userData) {
      setUserData((prev) =>
        prev ? { ...prev, coinsList: updatedCoins } : prev
      );
    }
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
    loading, 
  };
};
