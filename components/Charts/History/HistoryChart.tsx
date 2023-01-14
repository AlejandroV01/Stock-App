"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";
import { useFormattedHistory } from "../../../Hooks/useFormattedHistory";
import { IHistory } from "../../../types/api/IHistory";

const HistoryChart = ({ data }: IHistory): JSX.Element => {
  const { formattedData } = useFormattedHistory({ data });

  return (
    <ReactApexChart
      height={400}
      options={{
        chart: {
          foreColor: "white",
          type: "area",
          stacked: false,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: "zoom",
          },
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
        title: {
          text: "Stock Price Movement",
          align: "left",
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [40, 90, 100],
          },
        },
        grid: {
          show: true,
          borderColor: "rgba(100,100,100, 0.2)",
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        yaxis: {
          labels: {
            formatter(val): string {
              return (val / 1).toFixed(0);
            },
          },
          title: {
            text: "Price",
          },
        },
        xaxis: {
          type: "datetime",
        },
        tooltip: {
          shared: false,
          theme: "dark",
          marker: {
            show: true,
          },
          y: {
            title: {
              formatter: (seriesName) => seriesName,
            },
          },
        },
      }}
      series={[{ data: formattedData }]}
      type="area"
      width="100%"
    />
  );
};

export default HistoryChart;
