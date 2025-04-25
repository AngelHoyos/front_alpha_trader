import React from "react";
import { Typography, Snackbar, Alert, Box } from "@mui/material";
import {
  RootContainer,
  FormContainer,
} from "./styled-component/RecoveryPassword.style";
import { useRecoveryPassword } from "../../hooks/useRecoveryPassword";
import { useQueryParams } from "../../hooks/useQueryParams"; // Importamos el hook para obtener los parámetros
import InputCustom from "../../components/Input/InputCustom";
import { ButtonCustomLoad } from "../../components/Button/ButtonCustomLoad";

const RecoveryPassword: React.FC = () => {
  const { token, email, expiresAt } = useQueryParams(); // Usamos el hook para obtener los parámetros
  const {
    password,
    confirmPassword,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    setPassword,
    setConfirmPassword,
    handleSubmit,
    handleSnackbarClose,
  } = useRecoveryPassword(token, email, expiresAt);

  return (
    <RootContainer>
      <FormContainer>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Restablecer contraseña
        </Typography>
        <>
          <Box sx={{ marginTop: 4, "& > *:not(:last-child)": { mb: 3 } }}>
            <InputCustom
              label="Nueva contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              name="Password"
            />

            <InputCustom
              label="Confirmar contraseña"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              name="Confirmar_Password"
            />
          </Box>

          <ButtonCustomLoad
            onClick={handleSubmit}
            sx={{ mt: 2, width: "100%" }}
          >
            Cambiar contraseña
          </ButtonCustomLoad>
        </>
      </FormContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbarSeverity} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </RootContainer>
  );
};

export default RecoveryPassword;
