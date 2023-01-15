import React from "react";
import { IHistory } from "../../../types/api/IHistory";
import CompleteCoinGraph from "./CompleteCoinGraph/CompleteCoinGraph";

const getCoinData = async (coin_id: string) => {
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

const CoinInfoPage = async ({ params }: any) => {
  const coinId = params.coin_id;

  let interval;
  if (!interval) interval = "d1";

  const coinInfoData = getCoinData(coinId);

  const coinHistoryData = getCoinHistoricData({
    coin_id: coinId,
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
      <CompleteCoinGraph
        coinId={coinId}
        historyData={coinInterval}
        interval={interval}
      />
    </div>
  );
};

export default CoinInfoPage;
