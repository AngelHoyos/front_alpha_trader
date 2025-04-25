import { useState } from "react";
import { DataUser } from "../models/DataUserRegister.model";
import axiosInstance from "../api/axiosInstance/axiosInstance";
import { useAuth } from "./useAuth";

export const useUserProfileForm = (initialData: DataUser) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState<DataUser>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      setMessage({ text: "", type: "" });

      const response = await axiosInstance.put(`/user/profile`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setMessage({
          text: "Usuario actualizado con éxito.",
          type: "success",
        });
        console.log("Usuario actualizado con éxito", response.data);
      }
    } catch (err) {
      setMessage({
        text: "Error al actualizar la información del usuario.",
        type: "error",
      });
      console.error("Error al actualizar:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfilePicture = async () => {
    if (!profilePicture) {
      setMessage({
        text: "Por favor, selecciona una imagen.",
        type: "error",
      });
      return;
    }

    try {
      const formImage = new FormData();
      formImage.append("profilePicture", profilePicture);

      setLoading(true);
      setMessage({ text: "", type: "" });

      const response = await axiosInstance.put(
        `/user/imageProfile`,
        formImage,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setMessage({
          text: "Foto de perfil actualizada con éxito.",
          type: "success",
        });
        console.log("Foto de perfil actualizada con éxito", response.data);
      }
    } catch (err) {
      setMessage({
        text: "Error al actualizar la foto de perfil.",
        type: "error",
      });
      console.error("Error al actualizar foto de perfil:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!formData.Password) {
      setMessage({
        text: "La contraseña no puede estar vacía.",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      setMessage({ text: "", type: "" });

      const response = await axiosInstance.put(
        `/user/password`,
        { Password: formData.Password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage({
          text: "Contraseña actualizada con éxito.",
          type: "success",
        });
        console.log("Contraseña actualizada con éxito", response.data);
      }
    } catch (err) {
      setMessage({
        text: "Error al actualizar la contraseña.",
        type: "error",
      });
      console.error("Error al actualizar contraseña:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleUpdateUser,
    handleFileChange,
    handleUpdateProfilePicture,
    handleUpdatePassword, 
    loading,
    message,
    profilePicture,
  };
};
