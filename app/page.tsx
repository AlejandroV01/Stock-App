import React from "react";
import { create } from "zustand";
import Hero from "../components/Hero/Hero";
import { ICoin } from "../types/api/ICoin";

const fetchTopFour = async (): Promise<{ data: ICoin[]; error?: any }> => {
  const res = await fetch("https://api.coincap.io/v2/assets?limit=4");
  return res.json();
};

const fetchCountryOrigin = async () => {
  const res = await fetch("https://ipinfo.io");
  return res.json();
};

const Page = async (): Promise<JSX.Element> => {
  const topFour = await fetchTopFour();
  // const countryOrigin = await fetchCountryOrigin();
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
