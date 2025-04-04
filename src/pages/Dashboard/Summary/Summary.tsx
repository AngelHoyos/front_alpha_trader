import React from "react";
import { Box } from "@mui/material";
import HistoryTable from "../../../components/HistoryTable/HistoryTable";
import TopCoins from "./components/TopCoins/TopCoins";
import CryptoChart from "../../../components/Charts/Area/AreaChart";
import CardAds from "../../../components/CardAds/CardAds";
import ImgCard from "../../../../public/assets/imgs/img1.png";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
const Summary = () => {
  const coinHistoryData = [
    {
      id: 1,
      iconMoneda: "🪙",
      moneda: "Bitcoin",
      ltp: 65800,
      porcentaje: "2.5%",
      valor: 1.5,
    },
    {
      id: 2,
      iconMoneda: "⚡",
      moneda: "Ethereum",
      ltp: 3800,
      porcentaje: "1.2%",
      valor: 3.2,
    },
    {
      id: 3,
      iconMoneda: "🌕",
      moneda: "Dogecoin",
      ltp: 0.15,
      porcentaje: "-5.0%",
      valor: 1500,
    },
    {
      id: 4,
      iconMoneda: "🏛️",
      moneda: "BNB",
      ltp: 420,
      porcentaje: "0.8%",
      valor: 2.8,
    },
  ];

  const generateCryptoData = (
    initialPrice: number,
    variations: string[],
    volatility: number
  ) => {
    let price = initialPrice;
    return variations.map((time) => {
      // Genera una variación aleatoria dentro del rango de volatilidad
      const change = Math.random() * volatility * 2 - volatility;
      price = Math.max(40000, price + change); // Asegura que no baje de 40,000
      return { time, price: parseFloat(price.toFixed(2)) }; // Redondear a 2 decimales
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

  const dummyCoins = [
    {
      id: "btc",
      icon: "🟡",
      moneda: "Bitcoin",
      estado: "subió",
      iconEstado: faArrowUp,
      valor: 0.23,
    },
    {
      id: "eth",
      icon: "🔵",
      moneda: "Ethereum",
      estado: "bajó",
      iconEstado: faArrowDown,
      valor: -1.8,
    },
    {
      id: "bnb",
      icon: "🟢",
      moneda: "Binance Coin",
      estado: "subió",
      iconEstado: faArrowUp,
      valor: 3.5,
    },
    {
      id: "bnb",
      icon: "🟢",
      moneda: "Binance Coin",
      estado: "subió",
      iconEstado: faArrowUp,
      valor: 3.5,
    },
    {
      id: "bnb",
      icon: "🟢",
      moneda: "Binance Coin",
      estado: "subió",
      iconEstado: faArrowUp,
      valor: 3.5,
    },
    {
      id: "bnb",
      icon: "🟢",
      moneda: "Binance Coin",
      estado: "subió",
      iconEstado: faArrowUp,
      valor: 3.5,
    },
    {
      id: "bnb",
      icon: "🟢",
      moneda: "Binance Coin",
      estado: "subió",
      iconEstado: faArrowUp,
      valor: 3.5,
    },
    {
      id: "bnb",
      icon: "🟢",
      moneda: "Binance Coin",
      estado: "subió",
      iconEstado: faArrowUp,
      valor: 3.5,
    },
  ];

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
        <CryptoChart
          title="Analisis"
          data={cryptoData}
        />
        <HistoryTable data={coinHistoryData} />
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
        <CardAds img={ImgCard} title="Potencia tu inversión con Alpha X" />
        <TopCoins coinsData={dummyCoins} />
      </Box>
    </Box>
  );
};

export default Summary;
