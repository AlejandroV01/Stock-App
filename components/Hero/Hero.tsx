"use client";

import { Divider } from "@granite/core";
import React from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { ICoin } from "../../types/api/ICoin";
import styles from "./Hero.module.css";

interface Props {
  topFour: ICoin[];
}

const Hero = ({ topFour }: Props): JSX.Element => {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <h1>The Info Center For Exchanges</h1>
          <p>Idea, Search, Find, Act.</p>
        </div>
      </div>
      <Divider color="white" label="Top 4 coins today" labelPosition="left" />
      <div className={styles.priceDisplay}>
        {topFour.map((coin: ICoin) => {
          return (
            <div key={`top-four-coin-${coin.id}`} className={styles.card}>
              {coin.symbol && (
                <img
                  alt=""
                  className={styles.coinIcon}
                  src={`https://cryptoicons.org/api/black/${coin.symbol.toLowerCase()}/50`}
                />
              )}
              <div className={styles.cardInfo}>
                <div className={styles.leftCardSide}>
                  {coin.name && (
                    <div className={styles.nameContainer}>
                      <p className={styles.name}>
                        {/* eslint-disable-next-line operator-linebreak  */}
                        {coin.name.charAt(0).toUpperCase() + coin.name.slice(1)}
                      </p>
                      <p className={styles.symbol}>{coin.symbol}</p>
                    </div>
                  )}
                  <div className={styles.priceContainer}>
                    {coin.changePercent24Hr && (
                      <>
                        {parseFloat(coin.changePercent24Hr) >= 0 ? (
                          <GoTriangleUp style={{ color: "#00ff00" }} />
                        ) : (
                          <GoTriangleDown style={{ color: "#ff0000" }} />
                        )}

                        <div className={styles.percentChange}>
                          <p>
                            {parseFloat(coin.changePercent24Hr).toFixed(2)}%
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.rightCardSide}>
                  {coin.priceUsd && (
                    <p className={styles.price}>
                      ${parseFloat(coin.priceUsd).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.gradient} />
    </div>
  );
};

export default Hero;
