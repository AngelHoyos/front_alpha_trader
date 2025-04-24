import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance/axiosInstance";

export const useRecoveryPassword = (token: string, email: string, expiresAt: string) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const isLinkExpired = (): boolean => {
    if (!expiresAt) return true;
    return new Date(expiresAt) < new Date();
  };

  useEffect(() => {
    if (!token || !email || !expiresAt) {
      setSnackbarMessage("El enlace no es válido. Verifica tu correo o solicita uno nuevo.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } else if (isLinkExpired()) {
      setSnackbarMessage("El enlace ha expirado. Solicita uno nuevo para continuar.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [token, email, expiresAt]);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      setSnackbarMessage("Todos los campos son obligatorios.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setSnackbarMessage("Las contraseñas no coinciden.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      await axiosInstance.post("/password-change", {
        token: `Bearer ${token}`,
        password: password,
        passwordConfirmation: confirmPassword,
        email: email,
      });

      setSnackbarMessage("Contraseña restablecida exitosamente.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setPassword("");
      setConfirmPassword("");
    } catch {
      setSnackbarMessage("Hubo un error al restablecer la contraseña.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return {
    password,
    confirmPassword,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    setPassword,
    setConfirmPassword,
    handleSubmit,
    handleSnackbarClose,
  };
};
