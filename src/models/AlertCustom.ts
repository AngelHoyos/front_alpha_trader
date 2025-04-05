import { AlertColor } from "@mui/material";

export interface AlertCustomProps {
  id: string | number;
  tipoAlerta: AlertColor; 
  titulo: string;
  mensaje: string;
  estadoBotonCancelar?: boolean;
  mensajeConfirmar?: string;
  mensajeCancelar?: string;
}
