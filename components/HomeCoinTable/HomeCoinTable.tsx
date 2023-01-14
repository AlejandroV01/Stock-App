"use client";

import React from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import currencyFormatter from "../../functions/currencyFormatter";
import { ICoin } from "../../types/api/ICoin";
import ImageWithFallback from "../_helpers/ImageWithFallback/ImageWithFallback";
import styles from "./HomeCoinTable.module.css";

interface Props {
  top100: ICoin[];
}

const HomeCoinTable = ({ top100 }: Props): JSX.Element => {
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
      {top100.map((coin: ICoin): JSX.Element => {
        return (
          <div key={coin.rank} className={styles.coinRow}>
            <div className={styles.coinColumn}>{coin.rank}</div>
            <div className={styles.coinColumn}>
              <ImageWithFallback
                alt=""
                className={styles.cryptoIcon}
                fallback={`/icons/${coin.symbol?.toLowerCase()}.png`}
                src={`/icons/${coin.symbol?.toLowerCase()}.svg`}
              />

              <div className={styles.coinNameInfo}>
                <p>{coin.name}</p>
                <span className={styles.coin_symbol}>{coin.symbol}</span>
              </div>
            </div>
            <div className={styles.coinColumn}>
              <p className={styles.price}>
                {currencyFormatter({ value: coin.priceUsd ?? "--" })}
              </p>
            </div>
            <div className={styles.coinColumn}>
              {parseFloat(coin.changePercent24Hr || "0") >= 0 ? (
                <GoTriangleUp className={styles.positiveChange} />
              ) : (
                <GoTriangleDown className={styles.negativeChange} />
              )}
              <span
                className={`${
                  parseFloat(coin.changePercent24Hr ?? "0") >= 0
                    ? styles.positiveChange
                    : styles.negativeChange
                }`}
              >
                {parseFloat(coin.changePercent24Hr ?? "0").toFixed(2)}%
              </span>
            </div>
            <div className={styles.coinColumn}>
              {currencyFormatter({
                value: coin.marketCapUsd ?? "--",
                approximate: true,
              })}
            </div>
            <div className={styles.coinColumn}>
              {currencyFormatter({
                value: coin.volumeUsd24Hr ?? "--",
                approximate: true,
              })}
            </div>
            <div className={styles.coinColumn}>
              {currencyFormatter({
                value: coin.supply ?? "--",
                approximate: true,
              })}
              <span className={styles.coin_symbol}>{coin.symbol}</span>
            </div>
            <div className={styles.coinColumn}>TBA</div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeCoinTable;
