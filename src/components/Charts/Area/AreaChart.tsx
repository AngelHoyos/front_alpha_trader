import React, { useState, useEffect } from "react";
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
import {
  Box,
  MenuItem,
  FormControl,
  Typography,
  Card,
} from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import { CustomSelect } from "./styled-components/style.select";
import {
  CryptoChartProps,
  TypesProps,
} from "../../../models/Chart.model";
import { motion } from "framer-motion";
const MotionBox = motion(Box);

// Función para formatear valores como dólares ($)
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

const CryptoChart: React.FC<CryptoChartProps> = ({ title, data, backgroundColor = "linear-gradient(to bottom, #2D0C43, #16082C)" }) => {
  const intervals = Object.keys(data) as (keyof TypesProps)[];
  const [interval, setInterval] = useState<keyof TypesProps>(
    intervals[0] || "dia"
  );
  const [chartType, setChartType] = useState("area");

  // Estado para mantener la escala fija
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  useEffect(() => {
    const allPrices = Object.values(data)
      .flat()
      .map((d) => d.price);
    setMinPrice(Math.min(...allPrices));
    setMaxPrice(Math.max(...allPrices));
  }, [data]);

  return (
    <Card
      sx={{
        width: "92%",
        height: "auto",
        mt: 4,
        py: "30px",
        px: "10px",
        ml: "60px",
        zIndex: 2,
        backgroundColor: 'transparent', 
        border: "1px solid #571773",
        display: "flex",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: backgroundColor,
        borderRadius: "15px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          pr: "30px",
          pl: "60px",
          mb: "20px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "900" }}>
          {title}
        </Typography>
        <Box>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <CustomSelect
              value={interval}
              onChange={(e) =>
                setInterval(e.target.value as "dia" | "semana" | "mes" | "año")
              }
              sx={{ color: "white" }}
            >
              {intervals.map((key) => (
                <MenuItem key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </MenuItem>
              ))}
            </CustomSelect>
          </FormControl>
          <FormControl sx={{ minWidth: 120, ml: 2 }} size="small">
            <CustomSelect
              value={chartType}
              onChange={(e) => setChartType(e.target.value as "area" | "line")}
              sx={{ color: "white" }}
            >
              <MenuItem value="area">
                <TimelineIcon fontSize="small" sx={{ mr: 1 }} /> Área
              </MenuItem>
              <MenuItem value="line">
                <ShowChartIcon fontSize="small" sx={{ mr: 1 }} /> Línea
              </MenuItem>
            </CustomSelect>
          </FormControl>
        </Box>
      </Box>
      <MotionBox
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        sx={{ width: "100%", height: "400px" }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart
              data={data[interval].map((d) => ({
                ...d,
                price: parseFloat(d.price.toFixed(2)), // Redondear datos
              }))}
              margin={{ top: 10, right: 30, left: 50, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorChart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#571773" stopOpacity={1} />
                  <stop offset="64%" stopColor="#5114A6" stopOpacity={0.66} />
                  <stop offset="92%" stopColor="#5114A6" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#5114A6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.2)"
              />
              <XAxis dataKey="time" tick={{ fill: "white", dy: 5 }} />
              <YAxis
                domain={[minPrice ?? "auto", maxPrice ?? "auto"]}
                tickFormatter={(value) => formatCurrency(value)} // Formato en dólares
                tickMargin={10}
                tick={{ fill: "white", dx: -5 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F0840",
                  borderRadius: "5px",
                }}
                labelStyle={{ color: "#ffffff" }}
                itemStyle={{ color: "#ffffff" }}
                formatter={(value) => formatCurrency(value)} // Tooltip en dólares
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#571773"
                strokeOpacity={0.8}
                strokeWidth={2}
                fill={`url(#colorChart)`}
              />
            </AreaChart>
          ) : (
            <LineChart
              data={data[interval].map((d) => ({
                ...d,
                price: parseFloat(d.price.toFixed(2)), // Redondear datos
              }))}
              margin={{ top: 10, right: 30, left: 50, bottom: 20 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.2)"
              />
              <XAxis dataKey="time" tick={{ fill: "white", dy: 5 }} />
              <YAxis
                domain={[minPrice ?? "auto", maxPrice ?? "auto"]}
                tickFormatter={(value) => formatCurrency(value)} // Formato en dólares
                tickMargin={10}
                tick={{ fill: "white", dx: -5 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F0840",
                  borderRadius: "5px",
                }}
                labelStyle={{ color: "#ffffff" }}
                itemStyle={{ color: "#ffffff" }}
                formatter={(value) => formatCurrency(value)} // Tooltip en dólares
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#5114A6"
                strokeOpacity={0.8}
                strokeWidth={2}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </MotionBox>
    </Card>
  );
};

export default CryptoChart;
