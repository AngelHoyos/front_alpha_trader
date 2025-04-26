export interface ChartCustomProps {
  time: string;
  price: number;
}
export type IntervalKey = "1d" | "1w" | "1m" | "1y";

export interface TypesProps {
  "1d"?: ChartCustomProps[];
  "1w"?: ChartCustomProps[];
  "1m"?: ChartCustomProps[];
  "1y"?: ChartCustomProps[];
}

export interface CryptoChartProps {
  title: string;
  subtitle?: string;
  data: TypesProps;
  backgroundColor?: string;
  isSimple?: boolean;
  preferredCoin: string;
  listCoin?:string[];
  setPreferredCoin: (coin: string) => void;
  onChartSettingsChange?: (settings: {
    interval: IntervalKey;
    chartType: "area" | "line";
    preferredCoin: string;
  }) => void;
}

export type CryptoChartData = {
  [interval: string]: ChartCustomProps[];
};
