import React from "react";

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
  history,
}: {
  coin_id: string;
  history: string;
}) => {
  const res: any = await fetch(
    `https://api.coincap.io/v2/assets/${coin_id}/history?interval=${history}`,
    {
      cache: "no-store",
    }
  );

  if (!res) throw new Error("Unable to get coin data.");

  return res.json();
};

const CoinInfoPage = async ({ params }: PageProps): Promise<JSX.Element> => {
  let history = params.coin_data[1];
  if (!history) history = "d1";

  const coinInfoData = getCoinData({ coin_id: params.coin_data[0] });
  const coinHistoryData = getCoinHistoricData({
    coin_id: params.coin_data[0],
    history,
  });

  const [coinInfo, coinHistory] = await Promise.all([
    coinInfoData,
    coinHistoryData,
  ]);

  if (coinHistory?.error) throw new Error(coinHistory?.error);
  if (coinInfo?.error) throw new Error(coinHistory?.error);

  return (
    <div>
      <h1>Coin Info:</h1>
      <p>id: {params.coin_data[0]}</p>
      <p>history: {params.coin_data[1]}</p>
      <br />
      <h2>Basic data:</h2>
      <p>{JSON.stringify(coinInfo)}</p>
      <br />
      <h2>History:</h2>
      <p>{JSON.stringify(coinHistory)}</p>
    </div>
  );
};

export default CoinInfoPage;
