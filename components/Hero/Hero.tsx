"use client";

import { Button } from "@granite/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { json } from "stream/consumers";
import StockBG from "../../public/images/undrawinvest.svg";
import styles from "./Hero.module.css";

const Hero = (): JSX.Element => {
  const [topFour, setTopFour]: any[] = useState([]);

  const fetchIcon = async ({ symbol }: { symbol: string }) => {
    let lowerSymbol = symbol.toLowerCase();
    const res = await fetch(
      `https://cryptoicons.org/api/black/${lowerSymbol}/100`
    );
  };

  const fetchTopFour = async () => {
    const res = await fetch("https://api.coincap.io/v2/assets");
    const jsonData = res.json();
    console.log(jsonData);
  };

  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let fourArr = [];
        for (let i = 0; i < 4; i++) {
          let coinPrice = data.data[i].priceUsd;
          let roundedPrice = Math.round(coinPrice * 100) / 100;
          fourArr.push({
            name: data.data[i].id,
            symbol: data.data[i].symbol,
            price: roundedPrice,
            priceChange: data.data[i].changePercent24Hr,
          });
        }
        setTopFour(fourArr);
      });
  }, []);

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
            width={550}
            src={StockBG}
            alt=""
            style={{
              height: "fit-content",
              objectFit: "contain",
            }}
          ></Image>
        </div>
      </div>
      <hr className={styles.hr}></hr>
      <div className={styles.priceDisplay}>
        {topFour &&
          topFour.map((coin: any, index: number) => (
            <div className={styles.card} key={index}>
              <Image
                width={50}
                height={50}
                style={{ height: "fit-content", objectFit: "contain" }}
                alt=""
                src={`https://cryptoicons.org/api/black/${coin.symbol.toLowerCase()}/50`}
              ></Image>
              <div className={styles.cardInfo}>
                <p>{coin.name.charAt(0).toUpperCase() + coin.name.slice(1)}</p>
                <div className={styles.priceContainer}>
                  <span className={styles.ifIncreaseOrDecreaseIcon}>
                    {coin.priceChange >= 0 ? (
                      <GoTriangleUp style={{ color: "#00ff00" }} />
                    ) : (
                      <GoTriangleDown style={{ color: "#ff0000" }} />
                    )}
                  </span>
                  <p>{coin.price === 1 ? "1.00" : coin.price}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Hero;
