"use client";

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { IHistory } from "../../../types/api/IHistory";

interface FormattedHistory {
  x: string;
  y: string;
}

const HistoryChart = ({ data }: IHistory): JSX.Element => {
  const [formattedData, setFormattedData] = useState<FormattedHistory[] | null>(
    null
  );

  useEffect(() => {
    if (!data) return;
    const resultArray = data.map((elm) => {
      return { x: elm.date, y: elm.priceUsd };
    });

    setFormattedData(resultArray);
  }, [data]);

  return (
    <ReactApexChart
      height={400}
      options={{
        chart: {
          foreColor: "white",
          type: "area",
          stacked: false,
          height: 350,
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
