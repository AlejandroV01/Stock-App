"use client";

import React, { useState } from "react";
import HistoryChart from "../../../../components/Charts/History/HistoryChart";
import { ICoin } from "../../../../types/api/ICoin";
import { IHistory } from "../../../../types/api/IHistory";
import IntervalSelectionHeader from "../IntervalSelectionHeader/IntervalSelectionHeader";

const CoinInfoPage = ({
  coinId,
  historyData,
  interval,
  coinInfo,
}: {
  coinId: string;
  historyData: IHistory;
  interval: string;
  coinInfo: ICoin;
}) => {
  const [intervalState, setIntervalState] = useState(interval);
  const [historyDataState, setHistoryDataState] = useState(historyData.data);
  // I can't do the async await because it'll make this tsx file a promise child to page.tsx which is not allowed
  const handleIntervalChange = (intervalInput: string) => {
    setIntervalState(intervalInput);
    fetch(
      `https://api.coincap.io/v2/assets/${coinId}/history?interval=${intervalInput}`
    )
      .then((res) => res.json())
      .then((data) => {
        setHistoryDataState(data.data);
      });
  };
  return (
    <div>
      <IntervalSelectionHeader
        coin_id={coinId}
        coinInfo={coinInfo}
        handleIntervalChange={handleIntervalChange}
        interval={intervalState}
      />
      {historyDataState && (
        <HistoryChart
          coin_id={coinId}
          data={historyDataState}
          interval={intervalState}
        />
      )}
    </div>
  );
};
export default CoinInfoPage;
