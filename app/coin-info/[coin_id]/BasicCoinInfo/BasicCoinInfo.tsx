"use client";

import React, { useEffect, useState } from "react";
import coinToCoin from "../../../../functions/coinToCoin";
import currencyFormatter from "../../../../functions/currencyFormatter";
import { ICoin } from "../../../../types/api/ICoin";
import styles from "./BasicCoinInfo.module.css";

coinToCoin;
const BasicCoinInfo = (coinData: ICoin) => {
  coinData = coinData.coinData;
  const {
    symbol,
    name,
    rank,
    priceUsd,
    changePercent24Hr,
    marketCapUsd,
    volumeUsd24Hr,
    supply,
    maxSupply,
  } = coinData;
  interface Props {
    priceUsd: string | undefined;
    desiredCoin: "bitcoin" | "ethereum";
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  const MyComponent = ({ priceUsd, desiredCoin }: Props) => {
    const [coinAmount, setCoinAmount] = useState(null);

    const handleCoinToCoin = async () => {
      const amount = await coinToCoin(priceUsd, desiredCoin);
      setCoinAmount(amount);
    };

    useEffect(() => {
      handleCoinToCoin();
    }, [priceUsd, desiredCoin]);

    return (
      <div>{coinAmount !== null ? <p>{coinAmount}</p> : <p>Loading...</p>}</div>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.coinTitle}>
          <img
            alt=""
            src={`/icons/${symbol.toLowerCase()}.svg`}
            style={{ width: "30px" }}
          />
          <p className={styles.headingFont}>{name}</p>
          <span className={styles.graySquare}>{symbol}</span>
        </div>
        <span
          className={styles.graySquare}
          style={{ backgroundColor: "rgb(106, 118, 129)" }}
        >
          Rank #{rank}
        </span>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.pricesContainer}>
          <div className={styles.allPrices}>
            <p>
              {name} Price ({symbol})
            </p>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <p className={styles.headingFont}>
                {currencyFormatter({
                  value: priceUsd ?? "--",
                  approximate: false,
                })}
              </p>
              <div
                className={
                  parseFloat(changePercent24Hr) >= 0
                    ? `${styles.positiveChange}`
                    : `${styles.negativeChange}`
                }
              >
                {parseFloat(changePercent24Hr).toFixed(2)}%
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <MyComponent desiredCoin="bitcoin" priceUsd={priceUsd} /> BTC
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <MyComponent desiredCoin="ethereum" priceUsd={priceUsd} /> ETH
            </div>
          </div>
        </div>
        <div className={styles.flexInfoContainer}>
          <div className={styles.infoContainer}>
            <span>Market Cap</span>$
            {currencyFormatter({
              value: marketCapUsd ?? "--",
              approximate: true,
            })}
          </div>
          <div className={styles.infoContainer}>
            <span>
              Volume <span className={styles.graySquare}>24h</span>
            </span>
            $
            {currencyFormatter({
              value: volumeUsd24Hr ?? "--",
              approximate: true,
            })}
          </div>
          <div className={styles.infoContainer}>
            <span>Circulating Supply</span>
            {currencyFormatter({
              value: supply ?? "--",
              approximate: true,
            })}
          </div>
          <div className={styles.infoContainer}>
            <span>Max Supply</span>
            {currencyFormatter({
              value: maxSupply ?? "--",
              approximate: true,
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicCoinInfo;
