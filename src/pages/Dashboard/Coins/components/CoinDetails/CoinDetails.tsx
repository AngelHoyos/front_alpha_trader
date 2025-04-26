import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CryptoChart from "../../../../../components/Charts/Area/AreaChart";
import CoinsTable from "../TableHistoryCoin/CoinsTable";
import { Coin } from "../../../../../models/Coins.model";
import { IntervalKey } from "../../../../../models/Chart.model";
import { useChart } from "../../../../../hooks/useChart";

const CoinDetails: React.FC = () => {
 

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
  const [valueName, setValueName] = useState("bitcoin");
  const [intervals, setIntervals] = useState<IntervalKey>("1m");
  const [ListCoin, setListCoin] = useState<string[]>([]);
  const {
    rawCryptoData,

    getDetailsCrypto,
  } = useChart();
  useEffect(() => {
    if (valueName && intervals) {
      getDetailsCrypto(valueName, intervals);
    }
  }, [valueName, intervals]);
  useEffect(() => {
    if (rawCryptoData && rawCryptoData.preferredSymbols) {
      setListCoin(rawCryptoData.preferredSymbols);
    }
  }, [rawCryptoData]);

  const transformatedData =
    rawCryptoData && rawCryptoData.klines
      ? rawCryptoData.klines.map((data: any) => {
          return {
            time: new Date(data.openTime).toLocaleDateString(),
            price: data.currentPrice,
          };
        })
      : [];

  const intervalsList = ["1d", "1w", "1m", "1y"];

  const structuredData = Object.fromEntries(
    intervalsList.map((key) => [
      key,
      key === intervals ? transformatedData : [],
    ])
  );

  const handleChartSettingsChange = ({
    interval,
    preferredCoin,
  }: {
    interval: IntervalKey;
    chartType: "area" | "line";
    preferredCoin: string;
  }) => {
    setIntervals(interval);
    setValueName(preferredCoin);
  };

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
        {/* <Typography variant="subtitle1" sx={{ mt: 1, color: "#b0b0b0" }}>
          1 BTC equivale a <strong>USD $20.00</strong>
        </Typography> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 3,
          width: "100%",
        }}
      >
        <CryptoChart
          title="Analisis"
          data={structuredData}
          preferredCoin={valueName}
          setPreferredCoin={(coin) => setValueName(coin)}
          onChartSettingsChange={handleChartSettingsChange}
        />
        {/* <CryptoConverter /> */}
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
