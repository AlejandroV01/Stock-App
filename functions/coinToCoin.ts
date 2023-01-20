const getPrice = async (coin: string) => {
  const res = await fetch(`https://api.coincap.io/v2/assets/${coin}`);
  return res.json();
};
const coinToCoin = async (
  coinPrice: string | undefined,
  desiredCoin: "bitcoin" | "ethereum"
) => {
  let desiredCoinPrice = 1;
  if (typeof coinPrice === "string") coinPrice = parseFloat(coinPrice);
  const fullData = await getPrice(desiredCoin);
  desiredCoinPrice = parseFloat(fullData.data.priceUsd);

  return (coinPrice / desiredCoinPrice).toFixed(5);
};

export default coinToCoin;
