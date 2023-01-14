"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import currencyFormatter from "../../functions/currencyFormatter";
import { ICoin } from "../../types/api/ICoin";
import HistoryPreview from "../HistoryPreview/HistoryPreview";
import ImageWithFallback from "../_helpers/ImageWithFallback/ImageWithFallback";
import styles from "./HomeCoinTable.module.css";

interface Props {
  top100: ICoin[];
}

const HomeCoinTable = ({ top100 }: Props): JSX.Element => {
  const { push } = useRouter();

  return (
    <table border={0} cellSpacing={0} className={styles.table}>
      <thead>
        <th>#</th>
        <th>Name</th>
        <th>Price</th>
        <th>24h %</th>
        <th>Market Cap</th>
        <th>Volume(24h)</th>
        <th>Circulating Supply</th>
        <th>Graph</th>
      </thead>
      <tbody>
        {top100.map((coin: ICoin): JSX.Element => {
          return (
            <tr
              key={coin.rank}
              onClick={() => push(`/coin-info/${coin.id}/d1`)}
            >
              <td>{coin.rank}</td>
              <td>
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
              </td>
              <td>
                <p className={styles.price}>
                  {currencyFormatter({ value: coin.priceUsd ?? "--" })}
                </p>
              </td>
              <td>
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
              </td>
              <td>
                {currencyFormatter({
                  value: coin.marketCapUsd ?? "--",
                  approximate: true,
                })}
              </td>
              <td>
                {currencyFormatter({
                  value: coin.volumeUsd24Hr ?? "--",
                  approximate: true,
                })}
              </td>
              <td>
                {currencyFormatter({
                  value: coin.supply ?? "--",
                  approximate: true,
                })}
                <span className={styles.coin_symbol}>{coin.symbol}</span>
              </td>
              <td>
                <HistoryPreview coin_id={coin.id} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default HomeCoinTable;
