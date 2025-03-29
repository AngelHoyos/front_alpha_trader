import React, { useEffect } from "react";
import { AlertCustomProps } from "../../models/AlertCustom";
import Swal from "sweetalert2";
const Alerts: React.FC<AlertCustomProps> = ({
  tipoAlerta,
  titulo,
  mensaje,
  mensajeConfirmar = "Aceptar",
  mensajeCancelar = "Cancelar",
  estadoBotonCancelar = true,
}) => {
  useEffect(() => {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: tipoAlerta,
      showCancelButton: estadoBotonCancelar,
      confirmButtonText: mensajeConfirmar,
      cancelButtonText: mensajeCancelar,
    });
  }, [
    tipoAlerta,
    titulo,
    mensaje,
    mensajeConfirmar,
    mensajeCancelar,
    estadoBotonCancelar,
  ]);
  return null;
};

export default Alerts;
