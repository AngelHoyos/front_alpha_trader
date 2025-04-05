import React, { useEffect, useState } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";
import { AlertCustomProps } from "../../models/AlertCustom";

const Alerts: React.FC<AlertCustomProps> = ({
  tipoAlerta,
  titulo,
  mensaje,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(true);
  }, [tipoAlerta, titulo, mensaje]);

  const handleClose = (_: unknown, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={tipoAlerta as AlertColor}
        variant="filled"
        sx={{ width: "100%" }}
      >
        <strong>{titulo}</strong> — {mensaje}
      </Alert>
    </Snackbar>
  );
};

export default Alerts;
