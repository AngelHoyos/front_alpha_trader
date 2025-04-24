import { useState, useEffect } from 'react';
import { ModalEmailRecoveryPasswordProps } from '../models/ModalEmailRecoveryPassword.model';
import axiosInstance from '../api/axiosInstance/axiosInstance';

const emailRegex = /^\S+@\S+\.\S+$/;

export const useModalEmailRecoveryPassword = ({
  open,
  onClose,
}: Pick<ModalEmailRecoveryPasswordProps, 'open' | 'onClose'>) => {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    if (!open) {
      setEmail('');
      setErrorMsg('');
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    setErrorMsg(val && !emailRegex.test(val) ? 'El correo es inválido' : '');
  };

  const handleSubmit = async () => {
    if (!email.trim() || errorMsg) return;

    try {
      const response = await axiosInstance.post('/auth/recover-password', {
        Email:email,
      });

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: 'Correo enviado correctamente',
          severity: 'success',
        });
        onClose(); 
      } else {
        setSnackbar({
          open: true,
          message: 'Error al enviar correo',
          severity: 'error',
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al enviar correo',
        severity: 'error',
      });
    }
  };

  const handleSnackbarClose = () =>
    setSnackbar((s) => ({ ...s, open: false }));

  return {
    email,
    errorMsg,
    snackbar,
    handleChange,
    handleSubmit, 
    handleSnackbarClose,
  };
};
