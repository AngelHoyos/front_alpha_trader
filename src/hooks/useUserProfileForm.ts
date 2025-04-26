import { useState } from "react";
import { DataUser } from "../models/DataUserRegister.model";
import axiosInstance from "../api/axiosInstance/axiosInstance";
import { useAuth } from "./useAuth";
type Severity = "error" | "info" | "success" | "warning";

interface Message {
  text: string;
  type: Severity;
}
interface ImageProfileResponse {
  status: boolean;
  message: string;
  imageUrl: string;
  user: DataUser;
}

export const useUserProfileForm = (initialData: DataUser) => {
  const { token, setUserData, userData } = useAuth();
  const [formData, setFormData] = useState<DataUser>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({
    text: "",
    type: "info",
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
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

  const updateProfilePicture = async () => {
    const formImage = new FormData();
    formImage.append("profilePicture", profilePicture as File);

    const response = await axiosInstance.put<ImageProfileResponse>(
      `/user/imageProfile`,
      formImage,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const updatedUserData = response.data.imageUrl;
    if (userData) {
      setUserData({
        ...userData,
        profilePicture: updatedUserData,
      });
    }
    return response;
  };

  const updatePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      throw new Error("Las nuevas contraseñas no coinciden.");
    }
    const email = formData?.Email;
    const response = await axiosInstance.post(
      `/auth/password-change`,
      {
        token: `${token}`,
        password: currentPassword,
        passwordConfirmation: confirmPassword,
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const handleSubmitAll = async () => {
    setLoading(true);
    setMessage({ text: "", type: "info" });

    try {
      if (profilePicture) {
        await updateProfilePicture();
      }

      // if (
      //   passwordData.currentPassword &&
      //   passwordData.newPassword &&
      //   passwordData.confirmPassword
      // ) {
      //   await updatePassword();
      // }

      setMessage({
        text: "Perfil actualizado con éxito.",
        type: "success",
      });

      // Ya no forzamos reload. Solo si quieres de verdad recargar, lo dejas:
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    } catch (err: any) {
      setMessage({
        text:
          err.response?.data?.message ||
          err.message ||
          "Error al actualizar el perfil.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    passwordData,
    profilePicture,
    handleChange,
    handlePasswordChange,
    handleFileChange,
    handleSubmitAll,
    loading,
    message,
  };
};
