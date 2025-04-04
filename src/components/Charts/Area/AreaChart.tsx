import React from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, Card } from "@mui/material";
import { motion } from "framer-motion";
import useCryptoChart from "../../../hooks/useCryptoChart";
import ChartSelector from "./components/ChartSelector/ChartSelector";
import { CryptoChartProps } from "../../../models/Chart.model";

const MotionBox = motion(Box);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

const CryptoChart: React.FC<
  CryptoChartProps & { isSimple?: boolean; subtitle?: string }
> = ({
  title,
  subtitle,
  data,
  backgroundColor = "linear-gradient(to bottom, #2D0C43, #16082C)",
  isSimple = false,
}) => {
  const {
    interval,
    setInterval,
    chartType,
    setChartType,
    minPrice,
    maxPrice,
    intervals,
  } = useCryptoChart(data);

  const chartData = data[interval]
    ? data[interval]!.map((d) => ({
        ...d,
        price: isNaN(parseFloat(d.price.toString()))
          ? 0
          : parseFloat(d.price.toFixed(2)),
      }))
    : [];

  if (chartData.length === 0) {
    return (
      <Typography variant="h6" color="error">
        No hay datos disponibles
      </Typography>
    );
  }

  const chart = (
    <ResponsiveContainer width="100%" height={400}>
      {chartType === "area" ? (
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 50, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.2)"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            tick={{ fill: "white" }}
            tickMargin={10}
            tickLine={false}
            dy={5}
          />
          <YAxis
            domain={[minPrice ?? "auto", maxPrice ?? "auto"]}
            tickFormatter={formatCurrency}
            tick={{ fill: "white" }}
          />
          <Tooltip formatter={(value) => formatCurrency(value as number)} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#571773"
            fill="url(#gradient)"
          />
          <defs>
            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#571773" stopOpacity={1} />
              <stop offset="64%" stopColor="#5114A6" stopOpacity={0.66} />
              <stop offset="92%" stopColor="#5114A6" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#5114A6" stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      ) : (
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 50, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
          <XAxis
            dataKey="time"
            tick={{ fill: "white" }}
            tickMargin={10}
            tickLine={false}
            dy={5}
          />
          <YAxis
            domain={[minPrice ?? 0, maxPrice ?? "auto"]}
            tickFormatter={formatCurrency}
            tick={{ fill: "white" }}
          />
          <Tooltip formatter={(value) => formatCurrency(value as number)} />
          <Line type="monotone" dataKey="price" stroke="#5114A6" />
        </LineChart>
      )}
    </ResponsiveContainer>
  );

  if (isSimple) return chart;

  return (
    <Card
      sx={{
        width: "92%",
        mt: 4,
        p: 3,
        borderRadius: 3,
        background: backgroundColor,
        ml: "60px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          px: 4,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ color: "white" }} fontWeight={900}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="subtitle1" sx={{ color: "white", mt: 2 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        <ChartSelector
          {...{ interval, setInterval, chartType, setChartType, intervals }}
        />
      </Box>

      <MotionBox
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {chart}
      </MotionBox>
    </Card>
  );
};

export default CryptoChart;
