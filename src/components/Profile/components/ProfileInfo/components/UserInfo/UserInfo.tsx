import React, { useEffect, useState } from "react";
import { useUserProfileForm } from "../../../../../../hooks/useUserProfileForm";
import { DataUser } from "../../../../../../models/DataUserRegister.model";
import InputCustom from "../../../../../Input/InputCustom";
import {
  Snackbar,
  Alert,
  Avatar,
  IconButton,
  Tooltip,
  CircularProgress,
  Divider,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

interface Props {
  initialData: DataUser;
}

const UserProfile: React.FC<Props> = ({ initialData }) => {
  const {
    formData,
    handleChange,
    handleUpdateUser,
    handleFileChange,
    handleUpdateProfilePicture,
    handleUpdatePassword,
    loading,
    message,
    profilePicture,
  } = useUserProfileForm(initialData);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handlePasswordSubmit = () => {
    if (formData.Password !== confirmPassword) {
      return alert("Las contraseñas no coinciden.");
    }
    handleUpdatePassword();
  };

  useEffect(() => {
    if (message.text) {
      setOpenSnackbar(true);
    }
  }, [message]);

  useEffect(() => {
    if (profilePicture) {
      const previewUrl = URL.createObjectURL(profilePicture);
      setPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [profilePicture]);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      {/* Sección de Foto de Perfil */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h2>Foto de Perfil</h2>
        <Tooltip title="Cambiar foto de perfil">
          <IconButton component="label">
            <Avatar
              sx={{ width: 100, height: 100, margin: "0 auto" }}
              src={
                preview ||
                initialData.profilePicture ||
                "https://via.placeholder.com/100"
              }
            />
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleFileChange}
            />
            <PhotoCameraIcon
              sx={{ position: "absolute", bottom: 8, right: 8 }}
            />
          </IconButton>
        </Tooltip>
        <div>
          <button onClick={handleUpdateProfilePicture} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Actualizar Foto"}
          </button>
        </div>
      </div>

      <Divider sx={{ my: 3 }} />

      {/* Sección de Información del Usuario */}
      <div style={{ marginBottom: 20 }}>
        <h2>Información del Usuario</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <InputCustom
            label="Nombre"
            name="FullName"
            value={formData.FullName}
            onChange={handleChange}
          />
          <InputCustom
            label="Correo Electrónico"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
          <InputCustom
            label="Fecha de Nacimiento"
            name="DateOfBirth"
            type="date"
            value={formData.DateOfBirth}
            onChange={handleChange}
          />
          <InputCustom
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
          <button onClick={handleUpdateUser} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Actualizar Usuario"}
          </button>
        </form>
      </div>

      <Divider sx={{ my: 3 }} />

      {/* Sección de Contraseña */}
      <div>
        <h2>Cambiar Contraseña</h2>
        <InputCustom
          label="Nueva Contraseña"
          name="Password"
          type="password"
          value={formData.Password}
          onChange={handleChange}
        />
        <InputCustom
          label="Confirmar Contraseña"
          name="ConfirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handlePasswordSubmit} disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Actualizar Contraseña"}
        </button>
      </div>

      {/* Snackbar para mostrar errores o éxitos */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={message.type}
          sx={{ width: "100%" }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserProfile;
