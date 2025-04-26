import React, { useState } from "react";
import { IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ChartOptionsModal } from "../ChartOptionsModal/ChartOptionsModal";
import { TypesProps } from "../../../../../models/Chart.model";

interface ChartSelectorWrapperProps {
  interval: keyof TypesProps;
  setInterval: (value: keyof TypesProps) => void;
  chartType: "area" | "line";
  setChartType: (value: "area" | "line") => void;
  intervals: (keyof TypesProps)[];
  preferredCoin: string;
  setPreferredCoin: (value: string) => void;
  coins?: string[];
}

const ChartSelectorWrapper: React.FC<ChartSelectorWrapperProps> = ({
  interval,
  setInterval,
  chartType,
  setChartType,
  intervals,
  preferredCoin,
  setPreferredCoin,
  coins,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)} sx={{ color: "white" }}>
        <MoreHorizIcon />
      </IconButton>

      <ChartOptionsModal
        open={open}
        onClose={() => setOpen(false)}
        interval={interval}
        setInterval={setInterval}
        chartType={chartType}
        setChartType={setChartType}
        intervals={intervals}
        preferredCoin={preferredCoin}
        setPreferredCoin={setPreferredCoin}
        coins={coins}
      />
    </>
  );
};

export default ChartSelectorWrapper;
