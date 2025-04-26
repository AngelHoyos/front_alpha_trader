import React from "react";
import { Modal, Box, Typography, FormControl, MenuItem } from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import { CustomSelect } from "../../styled-components/style.select";
import { TypesProps } from "../../../../../models/Chart.model";

interface ChartOptionsModalProps {
  open: boolean;
  onClose: () => void;
  interval: keyof TypesProps;
  setInterval: (value: keyof TypesProps) => void;
  chartType: "area" | "line";
  setChartType: (value: "area" | "line") => void;
  intervals: (keyof TypesProps)[];
  preferredCoin: string;
  setPreferredCoin: (value: string) => void;
  coins: string[];
}


const chartTypeLabels = {
  area: "Área",
  line: "Línea",
};

export const ChartOptionsModal: React.FC<ChartOptionsModalProps> = ({
  open,
  onClose,
  chartType,
  setChartType,
  preferredCoin,
  setPreferredCoin,
  coins,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "#1e1e2f",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          color: "white",
        }}
      >
        <Typography variant="h6" mb={2}>
          Opciones
        </Typography>
        {/* Tipo de gráfico */}
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <CustomSelect
            value={chartType}
            onChange={(e) => setChartType(e.target.value as "area" | "line")}
          >
            {Object.entries(chartTypeLabels).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {value === "area" ? (
                  <TimelineIcon fontSize="small" sx={{ mr: 1 }} />
                ) : (
                  <ShowChartIcon fontSize="small" sx={{ mr: 1 }} />
                )}
                {label}
              </MenuItem>
            ))}
          </CustomSelect>
        </FormControl>

        {/* Coins preferidas */}
        {Array.isArray(coins) && coins.length > 0 && (
          <FormControl fullWidth size="small">
            <CustomSelect
              value={preferredCoin}
              onChange={(e) => setPreferredCoin(e.target.value as string)}
            >
              {coins.map((coin) => (
                <MenuItem key={coin} value={coin}>
                  {coin.toUpperCase()}
                </MenuItem>
              ))}
            </CustomSelect>
          </FormControl>
        )}
      </Box>
    </Modal>
  );
};
