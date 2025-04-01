import React from "react";
import { Box, Typography, Avatar, Button, Grid, Card, CardContent } from "@mui/material";
import InputCustom from "../../../Input/InputCustom";
import { ButtonCustomLoad } from "../../../Button/ButtonCustomLoad";
import { ProfileInfoProps } from "../../../../models/Profile.model";

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userData, handleSave, handleChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 3,
        width: "100%",
        px: { xs: 2, sm: 4 },
      }}
    >
      <Card sx={{ borderRadius: 3, padding: 3, width: "100%", maxWidth: "800px", boxShadow: 3, backgroundColor:'transparent'}}>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, mb: 6 }}>
            <Avatar
              alt="Usuario"
              src={userData.avatar}
              sx={{
                width: 120,
                height: 120,
                cursor: "pointer",
                border: "4px solid #2E7D32",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                component="label"
                variant="outlined"
                sx={{ color: "#D55F5A", border: "1px solid #D55F5A", textTransform: "none" }}
              >
                Eliminar Imagen
              </Button>
              <Button component="label" variant="outlined" sx={{ textTransform: "none" }}>
                Subir Imagen
                <input
                  type="file"
                  hidden
                  onChange={(e) => console.log(e.target.files)}
                />
              </Button>
            </Box>
          </Box>

          {/* Información del Usuario */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputCustom
                label="Nombre"
                name="nombre"
                value={userData.nombre}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputCustom
                label="Correo Electrónico"
                name="correo_electronico"
                value={userData.correo_electronico}
                onChange={handleChange}
                fullWidth
                error={
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.correo_electronico)
                }
                helperText={
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.correo_electronico)
                    ? "El correo es invalido"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputCustom
                label="Fecha de Nacimiento"
                name="fecha_nacimiento"
                type="date"
                value={userData.fecha_nacimiento}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputCustom
                label="Teléfono"
                name="telefono"
                value={userData.telefono}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputCustom
                label="Contraseña"
                name="contraseña"
                type="password"
                value={userData.contraseña}
                onChange={handleChange}
                fullWidth
                error={
                  userData.contraseña.length > 0 &&
                  (userData.contraseña.length < 8 ||
                    !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*\.])[A-Za-z\d!@#$%^&*\.]{8,}/.test(
                      userData.contraseña
                    ))
                }
                helperText={
                  userData.contraseña.length > 0 &&
                  (userData.contraseña.length < 8 ||
                    !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*\.])[A-Za-z\d!@#$%^&*\.]{8,}/.test(
                      userData.contraseña
                    ))
                    ? "Debe tener 8 caracteres, mayúscula, minúscula, número y símbolo."
                    : ""
                }
              />
            </Grid>
          </Grid>

          {/* Botón de Guardar */}
          <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <ButtonCustomLoad onClick={handleSave}>Guardar</ButtonCustomLoad>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileInfo;
