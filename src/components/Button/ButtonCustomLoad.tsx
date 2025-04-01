import React, { useState } from "react";
import { ButtonCustomLoading } from "../../models/ButtomCustom";
import { Button, CircularProgress } from "@mui/material";

export const ButtonCustomLoad: React.FC<ButtonCustomLoading> = ({
  onClick,
  children,
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
    <Button
      variant="contained"
      onClick={handleClick}
      startIcon={
        loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : null
      }
      sx={{
        backgroundColor: "#5114A6",
        textTransform: "none",
        fontSize: "1rem",
        width:'15%'
      }}
    >
      {loading ? "Cargando..." : children}{" "}
    </Button>
  );
};
