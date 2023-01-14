"use client";

import React from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { ICoin } from "../../types/api/ICoin";
import styles from "./HomeCoinTable.module.css";

interface Props {
  topFour: ICoin[];
}

const HomeCoinTable = ({ topFour }: Props): JSX.Element => {
  return (
    <div className={styles.grid}>
      <div className={styles.gridTitles}>
        <div className={styles.gridTitle}>#</div>
        <div className={styles.gridTitle}>Name</div>
        <div className={styles.gridTitle}>Price</div>
        <div className={styles.gridTitle}>24h %</div>
        <div className={styles.gridTitle}>Market Cap</div>
        <div className={styles.gridTitle}>Volume(24h)</div>
        <div className={styles.gridTitle}>Circulating Supply</div>
        <div className={styles.gridTitle}>Graph</div>
      </div>
      {topFour.map((coin: ICoin) => (
        <div key={coin.rank} className={styles.coinRow}>
          <div className={styles.coinColumn}>{coin.rank}</div>
          <div className={styles.coinColumn}>
            <img
              alt=""
              className={styles.cryptoIcon}
              onError={() => {
                `/icons/${coin.symbol?.toLowerCase()}.png`;
              }}
              src={`/icons/${coin.symbol?.toLowerCase()}.svg`}
            />
            <div className={styles.coinNameInfo}>
              <p>{coin.name}</p>
              <p style={{ color: "rgb(185, 185, 185) ", fontSize: "0.8rem" }}>
                {coin.symbol}
              </p>
            </div>
          </div>
          <div className={styles.coinColumn}>
            <p className={styles.price}>
              $
              {new Intl.NumberFormat().format(parseFloat(coin.priceUsd)) ===
              "1" ? (
                <>1.00</>
              ) : (
                new Intl.NumberFormat().format(parseFloat(coin.priceUsd))
              )}
            </p>
          </div>
          <div className={styles.coinColumn}>
            {parseFloat(coin.changePercent24Hr) >= 0 ? (
              <GoTriangleUp className={styles.positiveChange} />
            ) : (
              <GoTriangleDown className={styles.negativeChange} />
            )}
            <span
              className={`${
                parseFloat(coin.changePercent24Hr) >= 0
                  ? styles.positiveChange
                  : styles.negativeChange
              }`}
            >
              {parseFloat(coin.changePercent24Hr).toFixed(2)}%
            </span>
          </div>
          <div className={styles.coinColumn}>
            ${new Intl.NumberFormat().format(parseFloat(coin.marketCapUsd))}
          </div>
          <div className={styles.coinColumn}>
            ${new Intl.NumberFormat().format(parseFloat(coin.volumeUsd24Hr))}
          </div>
          <div className={styles.coinColumn}>
            {new Intl.NumberFormat().format(parseFloat(coin.supply))}{" "}
            {coin.symbol}
          </div>
          <div className={styles.coinColumn}>TBA</div>
        </div>
      ))}
    </div>
  );
};

export default HomeCoinTable;
