"use client";

import { Button } from "@granite/core";
import Image from "next/image";
import React from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import StockBG from "../../public/images/undrawinvest.svg";
import { ICoin } from "../../types/api/ICoin";
import styles from "./Hero.module.css";

interface Props {
  topFour: ICoin[];
}

const Hero = ({ topFour }: Props): JSX.Element => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <h1>The Info Center For Exchanges</h1>
          <p>Idea, Search, Find, Act.</p>
          <Button className={styles.heroButton}>Get Started</Button>
        </div>
        <div className={styles.rightContainer}>
          <Image
            alt=""
            src={StockBG}
            style={{
              height: "fit-content",
              objectFit: "contain",
            }}
            width={550}
          />
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.priceDisplay}>
        {topFour.map((coin: ICoin) => {
          return (
            <div key={`top-four-coin-${coin.id}`} className={styles.card}>
              {coin.symbol && (
                <Image
                  alt=""
                  height={50}
                  src={`https://cryptoicons.org/api/black/${coin.symbol.toLowerCase()}/50`}
                  style={{ height: "fit-content", objectFit: "contain" }}
                  width={50}
                />
              )}
              <div className={styles.cardInfo}>
                {coin.name && (
                  <p>
                    {coin.name.charAt(0).toUpperCase() + coin.name.slice(1)}
                  </p>
                )}
                <div className={styles.priceContainer}>
                  {coin.priceUsd && coin.changePercent24Hr && (
                    <>
                      <span className={styles.ifIncreaseOrDecreaseIcon}>
                        {parseFloat(coin.changePercent24Hr) >= 0 ? (
                          <GoTriangleUp style={{ color: "#00ff00" }} />
                        ) : (
                          <GoTriangleDown style={{ color: "#ff0000" }} />
                        )}
                      </span>
                      <div>
                        <p>{parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>

                        <p>{parseFloat(coin.priceUsd).toFixed(2)}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
