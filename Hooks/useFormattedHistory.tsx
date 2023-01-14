import React, { useState, useEffect } from "react";
import { IHistory } from "../types/api/IHistory";

export interface FormattedHistory {
  x: string;
  y: string;
}

export const useFormattedHistory = ({ data }: IHistory) => {
  const [formattedData, setFormattedData] = useState<FormattedHistory[] | null>(
    null
  );

  useEffect(() => {
    if (!data) return;
    const resultArray = data.map((elm) => {
      return { x: elm.date, y: elm.priceUsd };
    });

    setFormattedData(resultArray);
  }, [data]);

  return { formattedData };
};
