import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Alert,
  Tabs,
  Tab,
  Typography,
  Snackbar,
} from "@mui/material";
import { useProfile } from "../../hooks/useProfile";
import InputCustom from "../Input/InputCustom";
import { StyledTab, StyledTabs } from "./styled-component/Profile.styled";
import { ButtonCustomLoad } from "../Button/ButtonCustomLoad";

const Profile: React.FC = () => {
  const { userData, message, handleChange, setMessage, handleSave } =
    useProfile();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box
      sx={{
        textAlign: "left",
        p: 3,
        width: "100%",
        maxWidth: 800,
        margin: "auto",
      }}
    >
      <StyledTabs
        value={tabIndex}
        onChange={handleTabChange}
        sx={{ color: "black" }}
        centered
      >
        <StyledTab label="Perfil" />
        <StyledTab label="Estado de Cuenta" />
        <StyledTab label="Actividad Reciente" />
      </StyledTabs>

      {tabIndex === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: 3,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 4,
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography variant="h5">Foto de Perfil</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Usuario"
                src={userData.avatar}
                sx={{ width: 80, height: 80, cursor: "pointer" }}
              />
              <Button component="label" variant="outlined" sx={{ ml: 3, color:'#D55F5A', border:'1px solid #D55F5A' }}>
                Eliminar Imagen
                <input
                  type="file"
                  hidden
                  onChange={(e) => console.log(e.target.files)}
                />
              </Button>
              <Button component="label" variant="outlined" sx={{ ml: 3 }}>
                Subir Imagen
                <input
                  type="file"
                  hidden
                  onChange={(e) => console.log(e.target.files)}
                />
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 4,
              mt: 3,
            }}
          >
            <InputCustom
              label="Nombre"
              name="nombre"
              value={userData.nombre}
              onChange={handleChange}
              fullWidth
            />
            <InputCustom
              label="Correo Electrónico"
              name="correo_electronico"
              value={userData.correo_electronico}
              onChange={handleChange}
              fullWidth
            />
            <InputCustom
              label="Fecha de Nacimiento"
              name="fecha_nacimiento"
              type="date"
              value={userData.fecha_nacimiento}
              onChange={handleChange}
              fullWidth
            />
            <InputCustom
              label="Teléfono"
              name="telefono"
              value={userData.telefono}
              onChange={handleChange}
              fullWidth
            />
            <InputCustom
              label="Contraseña"
              name="contraseña"
              type="password"
              value={userData.contraseña}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <ButtonCustomLoad onClick={handleSave}>Guardar</ButtonCustomLoad>
          </Box>
        </Box>
      )}

      {tabIndex === 1 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Configuraciones avanzadas</Typography>
          <Typography>
            Aquí puedes agregar más opciones de configuración para el usuario.
          </Typography>
        </Box>
      )}

      <Snackbar
        open={!!message.text}
        autoHideDuration={3000}
        onClose={() => setMessage({ text: "", type: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} 
      >
        <Alert
          onClose={() => setMessage({ text: "", type: "" })}
          severity={message.type as "success" | "error"}
        >
              {message.text} 
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
