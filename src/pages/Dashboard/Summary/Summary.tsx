import React from "react";
import AreaChart from "../../../components/Charts/Area/AreaChart";
import { Box } from "@mui/material";
import HistoryTable from "../../../components/HistoryTable/HistoryTable";
import TopCoins from "./components/TopCoins/TopCoins";

const Summary = () => {
  const coinHistoryData = [
    {
      id: 1,
      iconMoneda: "🪙",
      moneda: "Bitcoin",
      ltp: 65800,
      porcentaje: "+2.5%",
      valor: 1.5,
    },
    {
      id: 2,
      iconMoneda: "⚡",
      moneda: "Ethereum",
      ltp: 3800,
      porcentaje: "-1.2%",
      valor: 3.2,
    },
    {
      id: 3,
      iconMoneda: "🌕",
      moneda: "Dogecoin",
      ltp: 0.15,
      porcentaje: "+5.0%",
      valor: 1500,
    },
    {
      id: 4,
      iconMoneda: "🏛️",
      moneda: "BNB",
      ltp: 420,
      porcentaje: "-0.8%",
      valor: 2.8,
    },
  ];
  return (
    <Box>
      <Box>
        <AreaChart
          categories={[1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]}
          series={[
            { name: "series-1", data: [30, 40, 45, 50, 49, 60, 70, 91] },
          ]}
          type="area"
          width={600}
        />
      </Box>

      <Box>
        <HistoryTable data={coinHistoryData} />
      </Box>
      <Box>
        <TopCoins/>
      </Box>
    </Box>
  );
};

export default Summary;
