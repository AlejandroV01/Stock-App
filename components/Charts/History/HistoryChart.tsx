"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";
import useSWR from "swr";
import fetcher from "../../../functions/fetcher";
import { useFormattedHistory } from "../../../Hooks/useFormattedHistory";
import { IHistory, IHistoryData } from "../../../types/api/IHistory";

interface Props extends IHistory {
  coin_id: string;
  interval: string;
  initialData?: IHistoryData[];
}

const HistoryChart = ({
  initialData,
  coin_id,
  interval,
}: Props): JSX.Element => {
  const { data, isLoading, error } = useSWR(
    `https://api.coincap.io/v2/assets/${coin_id}/history?interval=${interval}`,
    fetcher,
    { refreshInterval: 30000 } // refresh every 30 seconds
  );

  const { formattedData } = useFormattedHistory({
    data: data ? data.data : initialData,
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

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
      width="70%"
    />
  );
};

export default HistoryChart;
