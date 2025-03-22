import React from "react";
import Chart from "react-apexcharts";

interface AreaChartProps {
  categories: number[];
  series: {
    name: string;
    data: number[];
  }[];
  type?: "bar" | "line" | "area";
  width?: number;
}

const AreaChart: React.FC<AreaChartProps> = ({ categories, series, type = "bar", width = 500 }) => {
  const options = {
    chart: {
      id: "basic-chart",
    },
    xaxis: {
      categories,
    },
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type={type} width={width} />
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
