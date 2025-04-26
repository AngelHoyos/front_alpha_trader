import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  Avatar,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
  Grid,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close"; // Importamos el ícono de cierre
import { ProfileInfoProps } from "../../../../models/Profile.model";
import { useUserProfileForm } from "../../../../hooks/useUserProfileForm";
import InputCustom from "../../../Input/InputCustom";

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  userData,
  openModal,
  handleCloseModal,
}) => {
  const {
    formData,
    handleChange,
    handleSubmitAll,
    handleFileChange,
    loading,
    message,
    profilePicture,
  } = useUserProfileForm(userData);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#000317",
          borderRadius: "12px",
          width: "50%",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: 24,
          color: "#fff",
          p: 3,
        }}
      >
        {/* Encabezado con el ícono de cierre al mismo nivel */}
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            Perfil
          </Typography>
          <IconButton onClick={handleCloseModal} sx={{ color: "#fff", pt: 0 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Sección de Foto de Perfil */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Tooltip
            title="Cambiar foto de perfil"
            componentsProps={{
              tooltip: {
                sx: {
                  fontSize: ".8rem", // Cambia el tamaño del texto
                },
              },
            }}
          >
            <IconButton component="label">
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  border: "2px solid #5114A6",
                  cursor: "pointer",
                }}
                src={
                  preview ||
                  userData.profilePicture ||
                  "https://via.placeholder.com/120"
                }
              />
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileChange}
              />
              <PhotoCameraIcon
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  color: "#fff",
                  backgroundColor: "rgb(81,20,166)",
                  borderRadius: "50%",
                  padding: "6px",
                  fontSize: "40px",
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Sección de Información del Usuario */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#fff" }}>
            Detalles del Perfil{" "}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputCustom
                label="Nombre Completo"
                fullWidth
                value={formData.FullName}
                name="FullName"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <InputCustom
                label="Correo Electrónico"
                fullWidth
                value={formData.Email}
                name="Email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <InputCustom
                label="Teléfono"
                fullWidth
                value={formData.telefono}
                name="telefono"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <InputCustom
                label="Fecha de Nacimiento"
                fullWidth
                type="date"
                value={formData.DateOfBirth}
                name="DateOfBirth"
                onChange={handleChange}
                InputLabelProps={true}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Sección de Cambiar Contraseña */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#fff" }}>
            Actualizar Contraseña
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputCustom
                label="Contraseña Actual"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputCustom
                label="Nueva Contraseña"
                name="newPassword"
                type="password"
                onChange={handlePasswordChange}
                value={passwordData.newPassword}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputCustom
                label="Confirmar Nueva Contraseña"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>

        {/* Botones de acción */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}
        >
          <Button
            onClick={handleSubmitAll}
            disabled={loading}
            variant="contained"
            sx={{
              backgroundColor: "rgba(81,20,166,0.45)",
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "rgba(81,20,166,0.70)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Guardar"
            )}
          </Button>
        </Box>

        {/* Snackbar para mostrar mensajes */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={message.type}
            sx={{ width: "100%" }}
          >
            {message.text}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export default ProfileInfo;
