import React from "react";
import ReactApexChart from "react-apexcharts";
import { useFormattedHistory } from "../../../Hooks/useFormattedHistory";

import { IHistory } from "../../../types/api/IHistory";

const PreviewChart = ({ data }: IHistory): JSX.Element => {
  const { formattedData } = useFormattedHistory({ data });

  return (
    <ReactApexChart
      height={100}
      options={{
        chart: {
          foreColor: "white",
          type: "area",
          stacked: false,
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 1,
          curve: "smooth",
        },

        markers: {
          size: 0,
        },

        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        yaxis: {
          show: false,
        },
        xaxis: {
          labels: {
            show: false,
          },
        },
        tooltip: {
          enabled: false,
        },
      }}
      series={[{ data: formattedData }]}
      type="area"
      width="100%"
    />
  );
};

export default PreviewChart;
