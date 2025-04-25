import { Box, Typography } from "@mui/material";
import MostProminentCurrency from "./components/MostProminentCurrency/MostProminentCurrency";
import CoinsTable from "./components/TableHistoryCoin/CoinsTable";
import { useSummary } from "../../../hooks/useSummary";
import { useEffect } from "react";
import { mergeCoinsData } from "../../../utils/mergeCoinsData";


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
  const { getMainCoinsLiveData, mainCoinsData, mainCoinsDataUpdate } =
    useSummary();
  useEffect(() => {
    getMainCoinsLiveData();
  }, []);
  const mergeCoins = mergeCoinsData(mainCoinsData, mainCoinsDataUpdate);

  return (
    <Box sx={{ p: 3, pt: 0 }}>
      <Box
        display="flex"
        justifyContent="space-around"
        gap={3}
        mb={4}
        flexWrap="wrap"
      >
        {/* <PopularCoins coins={popularCoins} /> */}
        <MostProminentCurrency coins={mergeCoins} />
        {/* <LessProminentCurrency coins={lessProminentCoins} /> */}
      </Box>
      <Box sx={{ width: "100%", px: 3 }}>
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "left", my: 3 }}
        >
          <Typography variant="h5" sx={{ fontWeight: "700" }} gutterBottom>
            Mercado
          </Typography>
        </Box>
        <CoinsTable coins={sampleCoins} show={false} />
      </Box>
    </Box>
  );
};

export default Coins;
