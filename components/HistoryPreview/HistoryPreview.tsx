"use client";

import { Flex, Spinner } from "@granite/core";
import React, { useEffect, useState } from "react";
import useInViewport from "../../Hooks/useInViewport";
import { IHistory } from "../../types/api/IHistory";
import PreviewChart from "../Charts/Preview/PreviewChart";

interface Props {
  coin_id: string;
}

const HistoryPreview = ({ coin_id }: Props) => {
  const { isInViewport, ref } = useInViewport();
  const [historyData, setHistoryData] = useState<IHistory | null>(null);

  useEffect(() => {
    if (!isInViewport) return;
    if (historyData) return;

    const getData = async () => {
      if (!isInViewport) return;
      const getCoinHistoricData = async (): Promise<IHistory> => {
        const oneDayInSeconds = 86400000;
        const timestampNow = Date.now();
        const startTime = timestampNow - oneDayInSeconds;
        const res = await fetch(
          `https://api.coincap.io/v2/assets/${coin_id}/history?interval=m30&start=${startTime}&end=${timestampNow}`,
          {
            cache: "no-store",
          }
        );
        if (!res) throw new Error("Unable to get coin data.");
        return res.json();
      };
      const data = await getCoinHistoricData();
      setHistoryData(data);
    };
    getData();
  }, [coin_id, isInViewport, historyData]);

  return (
    <div ref={ref}>
      {isInViewport && (
        <div>
          {historyData ? (
            <PreviewChart data={historyData.data} />
          ) : (
            <Flex justifyContent="flex-end">
              <Spinner />
            </Flex>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryPreview;
