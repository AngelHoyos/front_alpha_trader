import { Box } from "@mui/material";
import React from "react";
import CryptoChart from "../../../components/Charts/Area/AreaChart";
import CardAds from "../../../components/CardAds/CardAds";
import ImgCard from "../../../../public/assets/imgs/img2.png";

const Coins = () => {
  const generateCryptoData = (initialPrice, variations, volatility) => {
    let price = initialPrice;
    return variations.map((time, index) => {
      // Genera una variación aleatoria positiva o negativa
      const change = (Math.random() * volatility * 2 - volatility).toFixed(2);
      price = Math.max(40000, price + parseFloat(change)); // Asegura que no baje de 40,000
      return { time, price };
    });
  };

  const cryptoData = {
    dia: generateCryptoData(
      45000,
      [
        "10:00 AM",
        "10:10 AM",
        "10:20 AM",
        "10:30 AM",
        "10:40 AM",
        "10:50 AM",
        "11:00 AM",
      ],
      800
    ),
    semana: generateCryptoData(
      44000,
      [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
      ],
      2000
    ),
    mes: generateCryptoData(
      43000,
      ["1 Mar", "5 Mar", "10 Mar", "15 Mar", "20 Mar", "25 Mar", "30 Mar"],
      5000
    ),
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 2,
        px: 2,
      }}
    >
      {/* Contenedor Principal (Gráficos y Tabla) */}
      <Box
        sx={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <CryptoChart title="Balances" data={cryptoData} backgroundColor="rgba(81,20,166,0.45)" />
      </Box>

      {/* Barra Lateral */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CardAds
          img={ImgCard}
          title="Consejos inteligentes sobre criptomonedas"
          backgroundCard="rgba(81,20,166,0.45)"
          backgroundButton="rgb(81,20,166)"
        />
      </Box>
    </Box>
  );
};

export default Coins;
