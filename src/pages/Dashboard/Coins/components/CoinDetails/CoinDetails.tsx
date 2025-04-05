import React from "react";
import { Box, Typography } from "@mui/material";
import CryptoChart from "../../../../../components/Charts/Area/AreaChart";
import CryptoConverter from "../CrytoConverter/CryptoConverter";
import CoinsTable from "../TableHistoryCoin/CoinsTable";
import { Coin } from "../../../../../models/Coins.model";

const CoinDetails: React.FC = () => {
   const cryptoData = {
    dia: [
      { time: "10:00 AM", price: 45000 },
      { time: "10:10 AM", price: 45250 },
      { time: "10:20 AM", price: 44980 },
      { time: "10:30 AM", price: 45400 },
      { time: "10:40 AM", price: 45520 },
      { time: "10:50 AM", price: 45310 },
      { time: "11:00 AM", price: 45670 },
    ],
    semana: [
      { time: "Lunes", price: 44000 },
      { time: "Martes", price: 44550 },
      { time: "Miércoles", price: 44800 },
      { time: "Jueves", price: 44620 },
      { time: "Viernes", price: 45010 },
      { time: "Sábado", price: 45200 },
      { time: "Domingo", price: 45500 },
    ],
    mes: [
      { time: "1 Mar", price: 43000 },
      { time: "5 Mar", price: 43750 },
      { time: "10 Mar", price: 43900 },
      { time: "15 Mar", price: 44200 },
      { time: "20 Mar", price: 44600 },
      { time: "25 Mar", price: 44950 },
      { time: "30 Mar", price: 45200 },
    ],
    año: [
      { time: "Ene", price: 39000 },
      { time: "Feb", price: 41000 },
      { time: "Mar", price: 43000 },
      { time: "Abr", price: 45500 },
      { time: "May", price: 47000 },
      { time: "Jun", price: 46000 },
      { time: "Jul", price: 48000 },
      { time: "Ago", price: 49500 },
      { time: "Sep", price: 50000 },
      { time: "Oct", price: 51000 },
      { time: "Nov", price: 52500 },
      { time: "Dic", price: 54000 },
    ],
  };
  
  const bitcoinMovements: Coin[] = [
    {
      date: "2025-04-01 14:00",
      price: "$68,200",
      change: "-0.4%",
      isPositive: false,
      volume: { "1h": "$4.8B", "24h": "$34B", "7d": "$198B" },
      marketCap: "$1.28T",
    },
    {
      date: "2025-04-01 13:00",
      price: "$68,500",
      change: "+0.3%",
      isPositive: true,
      volume: { "1h": "$5B", "24h": "$35B", "7d": "$200B" },
      marketCap: "$1.3T",
    },
    {
      date: "2025-04-01 12:00",
      price: "$68,700",
      change: "+0.5%",
      isPositive: true,
      volume: { "1h": "$5.2B", "24h": "$36B", "7d": "$202B" },
      marketCap: "$1.32T",
    },
    {
      date: "2025-04-01 11:00",
      price: "$68,100",
      change: "-0.9%",
      isPositive: false,
      volume: { "1h": "$4.6B", "24h": "$33B", "7d": "$196B" },
      marketCap: "$1.27T",
    },
    {
      date: "2025-04-01 10:00",
      price: "$68,800",
      change: "+1.0%",
      isPositive: true,
      volume: { "1h": "$5.4B", "24h": "$37B", "7d": "$204B" },
      marketCap: "$1.34T",
    },
  ];

  return (
    <Box
      sx={{
        p: 5,
        pt: 0,
        color: "white",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "100%", textAlign: "left", pl: 7 }}>
        <Typography variant="h4">
          Bitcoin{" "}
          <Typography component="span" sx={{ fontSize: 22 }}>
            (BTC)
          </Typography>
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1, color: "#b0b0b0" }}>
          1 BTC equivale a <strong>USD $20.00</strong>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 3,
          width: "100%",
        }}
      >
        <CryptoChart
          title=""
          backgroundColor="rgba(81,20,166,0.45)"
          data={cryptoData}
        />
        <CryptoConverter />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          pl: 7,
          mt: 6,
        }}
      >
        <Box sx={{ width: "100%", textAlign: "left", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "700" }}>
            Movimientos
          </Typography>
        </Box>
        <CoinsTable coins={bitcoinMovements} show={true} />
      </Box>
    </Box>
  );
};

export default CoinDetails;
