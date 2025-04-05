import { TypesProps } from "./Chart.model";

export interface ChartSelectorProps {
    interval: keyof TypesProps;
    setInterval: (value: keyof TypesProps) => void;
    chartType: string;
    setChartType: (value: "area" | "line") => void;
    intervals: (keyof TypesProps)[];
  }