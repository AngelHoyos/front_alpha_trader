import { Box, Typography } from "@mui/material";
import React from "react";
import PopularCoins from "./components/PopularCoins/PopularCoins";
import MostProminentCurrency from "./components/MostProminentCurrency/MostProminentCurrency";
import LessProminentCurrency from "./components/LessProminentCurrency/LessProminentCurrency";
import CoinsTable from "./components/TableHistoryCoin/CoinsTable";
// Array de Monedas Populares (mayor volumen y relevancia)
const popularCoins = [
  {
    name: "BTC",
    icon: "💵",
    price: "€78.52K",
    change: "+2.38%",
    isPositive: true,
  },
  {
    name: "ETH",
    icon: "💎",
    price: "€1.74K",
    change: "+2.76%",
    isPositive: true,
  },
  {
    name: "BNB",
    icon: "💰",
    price: "€559.68",
    change: "-0.46%",
    isPositive: false,
  },
  {
    name: "SOL",
    icon: "🔥",
    price: "€143.10",
    change: "-1.25%",
    isPositive: false,
  },
  {
    name: "XRP",
    icon: "⚡",
    price: "€0.52",
    change: "+0.89%",
    isPositive: true,
  },
  {
    name: "ADA",
    icon: "🔷",
    price: "€0.45",
    change: "-0.80%",
    isPositive: false,
  },
  {
    name: "DOGE",
    icon: "🐶",
    price: "€0.12",
    change: "+0.25%",
    isPositive: true,
  },
  {
    name: "DOT",
    icon: "🛠️",
    price: "€5.30",
    change: "+1.10%",
    isPositive: true,
  },
  {
    name: "LTC",
    icon: "🌙",
    price: "€88.42",
    change: "-0.50%",
    isPositive: false,
  },
  {
    name: "AVAX",
    icon: "❄️",
    price: "€28.75",
    change: "+1.45%",
    isPositive: true,
  },
];

// Array de Monedas Destacadas (mayor movimiento en %)
const mostProminentCoins = [
  {
    name: "MATIC",
    icon: "🔗",
    price: "€1.22",
    change: "+5.30%",
    isPositive: true,
  },
  {
    name: "FTM",
    icon: "👻",
    price: "€0.65",
    change: "-4.20%",
    isPositive: false,
  },
  {
    name: "ATOM",
    icon: "🌌",
    price: "€10.45",
    change: "+3.50%",
    isPositive: true,
  },
  {
    name: "NEAR",
    icon: "🚀",
    price: "€3.20",
    change: "-2.90%",
    isPositive: false,
  },
  {
    name: "VET",
    icon: "⚙️",
    price: "€0.035",
    change: "+6.70%",
    isPositive: true,
  },
  {
    name: "HBAR",
    icon: "🌿",
    price: "€0.11",
    change: "-1.60%",
    isPositive: false,
  },
  {
    name: "ALGO",
    icon: "🌀",
    price: "€0.23",
    change: "+4.10%",
    isPositive: true,
  },
  {
    name: "ICP",
    icon: "🌐",
    price: "€7.85",
    change: "-3.80%",
    isPositive: false,
  },
  {
    name: "GRT",
    icon: "📊",
    price: "€0.15",
    change: "+2.05%",
    isPositive: true,
  },
  {
    name: "SAND",
    icon: "🏖️",
    price: "€0.52",
    change: "-0.95%",
    isPositive: false,
  },
];

// Array de Monedas Menos Destacadas (bajo movimiento y valor)
const lessProminentCoins = [
  {
    name: "XLM",
    icon: "⭐",
    price: "€0.10",
    change: "+0.45%",
    isPositive: true,
  },
  {
    name: "ZIL",
    icon: "💠",
    price: "€0.03",
    change: "-0.80%",
    isPositive: false,
  },
  {
    name: "ENJ",
    icon: "🎮",
    price: "€0.41",
    change: "+1.60%",
    isPositive: true,
  },
  {
    name: "CHZ",
    icon: "⚽",
    price: "€0.12",
    change: "-1.20%",
    isPositive: false,
  },
  {
    name: "BTT",
    icon: "🎵",
    price: "€0.0000023",
    change: "+0.35%",
    isPositive: true,
  },
  {
    name: "ONE",
    icon: "🔷",
    price: "€0.015",
    change: "-0.45%",
    isPositive: false,
  },
  {
    name: "CELO",
    icon: "🌱",
    price: "€0.59",
    change: "+2.10%",
    isPositive: true,
  },
  {
    name: "HNT",
    icon: "📡",
    price: "€1.25",
    change: "-0.95%",
    isPositive: false,
  },
  {
    name: "QTUM",
    icon: "🔳",
    price: "€3.45",
    change: "+1.75%",
    isPositive: true,
  },
  {
    name: "ICX",
    icon: "🌉",
    price: "€0.18",
    change: "-0.60%",
    isPositive: false,
  },
];
const sampleCoins = [
  {
    name: "Bitcoin",
    icon: "🟡",
    price: "$68,500",
    change: "+2.5%",
    isPositive: true,
    volume: { "1h": "$5B", "24h": "$35B", "7d": "$200B" },
    marketCap: "$1.3T",
  },
  {
    name: "Ethereum",
    icon: "💎",
    price: "$3,500",
    change: "-1.2%",
    isPositive: false,
    volume: { "1h": "$2.5B", "24h": "$18B", "7d": "$100B" },
    marketCap: "$420B",
  },
  {
    name: "Cardano",
    icon: "🔵",
    price: "$0.45",
    change: "+5.8%",
    isPositive: true,
    volume: { "1h": "$500M", "24h": "$3.2B", "7d": "$20B" },
    marketCap: "$15B",
  },
  {
    name: "Solana",
    icon: "🟢",
    price: "$140",
    change: "-0.8%",
    isPositive: false,
    volume: { "1h": "$1B", "24h": "$7B", "7d": "$50B" },
    marketCap: "$60B",
  },
  {
    name: "ICX",
    icon: "🌉",
    price: "€0.18",
    change: "-0.60%",
    isPositive: false,
    volume: { "1h": "$100M", "24h": "$500M", "7d": "$3B" },
    marketCap: "$1.2B",
  },
];

const Coins = () => {
  return (
    <Box sx={{ p: 3, pt: 0 }}>
      <Box
        display="flex"
        justifyContent="space-around"
        gap={3}
        mb={4}
        flexWrap="wrap"
      >
        <PopularCoins coins={popularCoins} />
        <MostProminentCurrency coins={mostProminentCoins} />
        <LessProminentCurrency coins={lessProminentCoins} />
      </Box>
      <Box sx={{ width: "100%", px: 3}}>
        <Box sx={{width:'100%', display:'flex',justifyContent:'left', my:3}}>
          <Typography variant="h5" sx={{fontWeight:'700'}} gutterBottom>
          Mercado
          </Typography>
        </Box>
        <CoinsTable coins={sampleCoins} />
      </Box>
    </Box>
  );
};

export default Coins;
