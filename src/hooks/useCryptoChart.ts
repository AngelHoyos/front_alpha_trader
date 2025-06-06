import { useState, useEffect } from "react";
import { IntervalKey, TypesProps } from "../models/Chart.model";

const useCryptoChart = (
  data: TypesProps
) => {
  const validIntervals = Object.keys(data).filter(
    (key) => data[key as IntervalKey]?.length
  ) as IntervalKey[];

  const [interval, setInterval] = useState<IntervalKey>(
    validIntervals[0] ?? "1d"
  );

  const [chartType, setChartType] = useState<"area" | "line">("area");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  useEffect(() => {
    if (data[interval] && data[interval]!.length > 0) {
      const allPrices = data[interval]!.map((d) => d.price);
      setMinPrice(Math.min(...allPrices));
      setMaxPrice(Math.max(...allPrices));
    }
  }, [data, interval]);

  return {
    interval,
    setInterval,
    chartType,
    setChartType,
    minPrice,
    maxPrice,
    intervals: validIntervals,
  };
};

export default useCryptoChart;
