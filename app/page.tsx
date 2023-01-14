import React from "react";
import Hero from "../components/Hero/Hero";
import HomeCoinTable from "../components/HomeCoinTable/HomeCoinTable";
import { ICoin } from "../types/api/ICoin";

const fetchTopFour = async (): Promise<{ data: ICoin[]; error?: any }> => {
  const res = await fetch("https://api.coincap.io/v2/assets?limit=4");
  return res.json();
};

const fetch100Coins = async (): Promise<{ data: ICoin[]; error?: any }> => {
  const res = await fetch("https://api.coincap.io/v2/assets?limit=100");
  return res.json();
};

// const fetchCountryOrigin = async () => {
//   const res = await fetch("https://ipinfo.io/json");
//   return res.json();
// };

const Page = async (): Promise<JSX.Element> => {
  const topFour = await fetchTopFour();
  if (topFour.error || !topFour.data) {
    throw new Error("Unable to get top four coins today");
  }

  const top100 = await fetch100Coins();
  if (top100.error || !top100.data) {
    throw new Error("Unable to get top twenty coins today");
  }

  // const ipData = await fetchCountryOrigin();
  // if (ipData.error || !ipData) {
  //   throw new Error("Unable to get top four coins today");
  // }

  return (
    <div>
      <Hero topFour={topFour.data} />
      <HomeCoinTable top100={top100.data} />
    </div>
  );
};

export default Page;
