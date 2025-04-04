import React from "react";
import { useParams } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";
import { useNavigates } from "../../../../../hooks/useNavigates";
import CryptoChart from "../../../../../components/Charts/Area/AreaChart";
import CryptoConverter from "../CrytoConverter/CryptoConverter";
import CoinsTable from "../TableHistoryCoin/CoinsTable";
import { Coin } from "../../../../../models/Coins.model";

const CoinDetails: React.FC = () => {
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

  const { id } = useParams();
  const { goTo } = useNavigates();

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
