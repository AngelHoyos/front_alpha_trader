import React, { useState } from "react";
import { Props } from "../../models/ButtomCustom";
import {  CircularProgress } from "@mui/material";
import { ButtonCustom } from "./styled-component/ButtomCustom.style";

export const ButtonCustomLoad: React.FC<Props> = ({
  onClick,
  children,
  sx={}

}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  };
  return (
    <ButtonCustom
      variant="contained"
      onClick={handleClick}
      startIcon={
        loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : null
      }
      sx={{
        backgroundColor: "#5114A6",
        textTransform: "none",
        fontSize: "1rem",
        width:'15%',
        ...sx,
      }}
    >
      {loading ? "Cargando..." : children}{" "}
    </ButtonCustom>
  );
};
