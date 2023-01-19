"use client";

import React from "react";
import currencyFormatter from "../../../../functions/currencyFormatter";
import { ICoin } from "../../../../types/api/ICoin";
import styles from "./BasicCoinInfo.module.css";

const BasicCoinInfo = (coinData: ICoin) => {
  coinData = coinData.coinData;
  const { symbol, name, rank, priceUsd, changePercent24Hr } = coinData;
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
        <div>
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
                  changePercent24Hr >= 0
                    ? `${styles.positiveChange}`
                    : `${styles.negativeChange}`
                }
              >
                {parseFloat(changePercent24Hr).toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicCoinInfo;
