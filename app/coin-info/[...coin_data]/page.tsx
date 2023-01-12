import React from "react";
import HistoryChart from "../../../components/Charts/History/HistoryChart";
import { IHistory } from "../../../types/api/IHistory";
import IntervalSelectionHeader from "./(components)/IntervalSelectionHeader/IntervalSelectionHeader";

interface PageProps {
  params: {
    coin_data: string[];
  };
}

const getCoinData = async ({ coin_id }: { coin_id: string }) => {
  const res = await fetch(`https://api.coincap.io/v2/assets/${coin_id}`, {
    cache: "no-store",
  });

  if (!res) throw new Error("Unable to get coin data.");

  return res.json();
};

const getCoinHistoricData = async ({
  coin_id,
  interval,
}: {
  coin_id: string;
  interval: string;
}): Promise<IHistory> => {
  const res = await fetch(
    `https://api.coincap.io/v2/assets/${coin_id}/history?interval=${interval}`,
    {
      cache: "no-store",
    }
  );

  if (!res) throw new Error("Unable to get coin data.");

  return res.json();
};

const CoinInfoPage = async ({ params }: PageProps): Promise<JSX.Element> => {
  let interval = params.coin_data[1];
  if (!interval) interval = "d1";

  const coinInfoData = getCoinData({ coin_id: params.coin_data[0] });
  const coinHistoryData = getCoinHistoricData({
    coin_id: params.coin_data[0],
    interval,
  });

  const [coinInfo, coinInterval] = await Promise.all([
    coinInfoData,
    coinHistoryData,
  ]);

  if (coinInterval?.error) throw new Error(coinInterval?.error);
  if (coinInfo?.error) throw new Error(coinInterval?.error);

  return (
    <div>
      <IntervalSelectionHeader
        coin_id={params.coin_data[0]}
        interval={interval}
      />

      <HistoryChart data={coinInterval.data} />
    </div>
  );
};

export default CoinInfoPage;
