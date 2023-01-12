import React from "react";
import Hero from "../components/Hero/Hero";
import { ICoin } from "../types/api/ICoin";

const fetchTopFour = async (): Promise<{ data: ICoin[]; error?: any }> => {
  const res = await fetch("https://api.coincap.io/v2/assets?limit=4");
  return res.json();
};

const Page = async (): Promise<JSX.Element> => {
  const topFour = await fetchTopFour();

  if (topFour.error || !topFour.data) {
    throw new Error("Unable to get top four coins today");
  }

  return (
    <div>
      <Hero topFour={topFour.data} />
    </div>
  );
};

export default Page;
