import { Box } from "@mui/material";
import HistoryTable from "../../../components/HistoryTable/HistoryTable";
import TopCoins from "./components/TopCoins/TopCoins";
import CryptoChart from "../../../components/Charts/Area/AreaChart";
import CardAds from "../../../components/CardAds/CardAds";
import ImgCard from "../../../../public/assets/imgs/img1.png";
import { useChart } from "../../../hooks/useChart";
import {  useEffect, useState } from "react";
import { IntervalKey } from "../../../models/Chart.model";
import { useSummary } from "../../../hooks/useSummary";
const Summary = () => {
  const [valueName, setValueName] = useState("bitcoin");
  const [intervals, setIntervals] = useState<IntervalKey>("1m");
  const [ListCoin, setListCoin] = useState<string[]>([]);
  const {
    rawCryptoData,

    getDetailsCrypto,
  } = useChart();
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

  useEffect(() => {
    if (valueName && intervals) {
      getDetailsCrypto(valueName, intervals);
    }
  }, [valueName, intervals]);

  const { getMainCoinsLiveData,mainCoinsData } = useSummary();
  useEffect(() => {
    getMainCoinsLiveData();
  }, []);

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
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 2,
        px: 2,
      }}
    >
      <Box
        sx={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <CryptoChart
          title=""
          data={structuredData}
          preferredCoin={valueName}
          setPreferredCoin={(coin) => setValueName(coin)}
          onChartSettingsChange={handleChartSettingsChange}
          listCoin={ListCoin}
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
        <CardAds
          img={ImgCard}
          title="Potencia tu inversión con Alpha X"
          targetPath={"/dashboard/Alpha_X"}
          predeterminedQuestion={"Como puedo potenciar mi inversión?"}
        />
        <TopCoins coinsData={mainCoinsData} />
      </Box>
    </Box>
  );
};

export default Summary;
