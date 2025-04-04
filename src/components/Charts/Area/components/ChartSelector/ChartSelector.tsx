import React from "react";
import { Box, MenuItem, FormControl } from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import { CustomSelect } from "../../styled-components/style.select";
import { TypesProps } from "../../../../../models/Chart.model";

interface ChartSelectorProps {
  interval: keyof TypesProps;
  setInterval: (value: keyof TypesProps) => void;
  chartType: string;
  setChartType: (value: "area" | "line") => void;
  intervals: (keyof TypesProps)[];
}

const ChartSelector: React.FC<ChartSelectorProps> = ({ interval, setInterval, chartType, setChartType, intervals }) => (
  <Box>
    <FormControl sx={{ minWidth: 120 }} size="small">
      <CustomSelect
        value={interval}
        onChange={(e) => setInterval(e.target.value as keyof TypesProps)}
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
);

export default ChartSelector;
