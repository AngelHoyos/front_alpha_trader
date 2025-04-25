import React from "react";
import {
  Modal,
  Typography,
  IconButton,
  Fade,
  Backdrop,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  ModalContainer,
  ModalHeader,
} from "./styled-component/ModalEmailRecoveryPassword.styled";
import { ModalEmailRecoveryPasswordProps } from "../../../models/ModalEmailRecoveryPassword.model";
import InputCustom from "../../Input/InputCustom";
import { ButtonCustomLoad } from "../../Button/ButtonCustomLoad";
import { useModalEmailRecoveryPassword } from "../../../hooks/useModalEmailRecoveryPassword";

export const ModalEmailRecoveryPassword: React.FC<
  ModalEmailRecoveryPasswordProps
> = (props) => {
  const { open, onClose } = props;
  const {
    email,
    errorMsg,
    snackbar,
    handleChange,
    handleSubmit,
    handleSnackbarClose,
  } = useModalEmailRecoveryPassword(props);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 300 } }}
        aria-labelledby="modal-recovery-title"
        aria-describedby="modal-recovery-description"
      >
        <Fade in={open}>
          <ModalContainer role="dialog" aria-modal="true">
            <ModalHeader>
              <Typography id="modal-recovery-title" variant="h6">
                Recuperación de Contraseña
              </Typography>
              <IconButton aria-label="cerrar modal" onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </ModalHeader>

            <Typography
              id="modal-recovery-description"
              mt={2}
              mb={1}
              variant="body2"
              sx={{ pb: 2 }}
            >
              Ingresa tu correo electrónico y te enviaremos un enlace para
              recuperar tu contraseña.
            </Typography>

            <InputCustom
              fullWidth
              label="Correo electrónico"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              error={!!errorMsg}
              helperText={errorMsg}
              aria-label="correo electrónico"
            />
              <ButtonCustomLoad
                onClick={handleSubmit}
                sx={{ width: "100%", mt: 2 }}
              >
                Enviar
              </ButtonCustomLoad>
          </ModalContainer>
        </Fade>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModalEmailRecoveryPassword;
