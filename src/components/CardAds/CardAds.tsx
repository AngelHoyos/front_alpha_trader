import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { CardAdsCustomProps } from "../../models/CardAds.model";

const CardAds: React.FC<CardAdsCustomProps> = ({
  title,
  backgroundCard = "rgba(87,23,115,0.51)",
  backgroundButton = "#5114A6",
  img,
  textButton = "Empezar",
}) => {
  return (
    <Card
      sx={{
        width: "90%",
        mr: "30px",
        mt: 4,
        height: "400px",
        backgroundColor: backgroundCard,
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid #571773",
        justifyContent: "space-between",
      }}
    >
      {/* Contenedor de imagen */}
      <Box
        sx={{
          width: "100%",
          height: "200px",
          overflow: "hidden",
          borderRadius: "10px 10px 0 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={img}
          alt="imagen"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>

      {/* Contenedor de título */}
      <Box sx={{ p: 2, textAlign: "left", ml:'15px'}}>
        <Typography variant="h6" sx={{ color: "white", fontWeight: "600", fontSize:'1.3rem' }}>
          {title}
        </Typography>
      </Box>

      {/* Contenedor del botón */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 3}}>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: backgroundButton,
            fontWeight: "600",
            textTransform: "none",
            width: "40%",
            borderRadius: "10px",
          }}
        >
          {textButton}
        </Button>
      </Box>
    </Card>
  );
};

export default CardAds;
