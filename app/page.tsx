<<<<<<< HEAD
import React from 'react'
import Hero from '../components/Hero/Hero'

const Page = (): JSX.Element => {
  return (
    <div>
      <Hero />
=======
import React from "react";
import Hero from "../components/Hero/Hero";
import { ICoin } from "../types/api/ICoin";

// If we do the requests in a server component
// (all components are server components unless you add 'use client' at the top)
// the data is going to load quicker since we can load it in parallel (if we have more than 1)

const fetchTopFour = async (): Promise<{ data: ICoin[]; error?: any }> => {
  // Get the top 4 in the request, this way we do less client calculations and its less data fetched
  const res = await fetch("https://api.coincap.io/v2/assets?limit=4");

  return res.json();
};

const Page = async (): Promise<JSX.Element> => {
  // This will happen before the page loads. This is the backend
  const topFour = await fetchTopFour();

  // If this error is thrown, whats below it will not render
  // instead the 'error.tsx' component will be rendered
  if (topFour.error || !topFour.data) {
    throw new Error("Unable to get top four coins today");
  }

  return (
    <div>
      Home Page
      <Hero topFour={topFour.data} />
>>>>>>> a1d22f5c995cd3ef5358556f5c64f9f45643b17c
    </div>
  );
};

export default Page;
