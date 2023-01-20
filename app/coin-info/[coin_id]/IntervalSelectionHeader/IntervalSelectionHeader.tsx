"use client";

import { Button, Divider, Flex } from "@granite/core";
// import { useRouter } from "next/navigation";
import React from "react";
import { ICoin } from "../../../../types/api/ICoin";

interface Props {
  coin_id: string;
  interval: string;
  handleIntervalChange: (intervalInput: string) => void;
  coinInfo: ICoin;
}

const IntervalSelectionHeader = ({
  coin_id,
  interval,
  coinInfo,
  handleIntervalChange,
}: Props) => {
  // const { push } = useRouter();

  // const handleChangeInterval = (newInterval: string): void => {
  //   push(`/coin-info/${coin_id}/${newInterval}`);
  // };

  return (
    <div>
      <Flex justifyContent="space-between">
        <h1 style={{ whiteSpace: "nowrap", margin: "0" }}>
          {coinInfo.data.name} Chart
        </h1>
        <Flex justifyContent="flex-end">
          <Button onClick={() => handleIntervalChange("m1")}>M1</Button>
          <Button onClick={() => handleIntervalChange("m5")}>M5</Button>
          <Button onClick={() => handleIntervalChange("m15")}>M15</Button>
          <Button onClick={() => handleIntervalChange("m30")}>M30</Button>
          <Button onClick={() => handleIntervalChange("h1")}>H1</Button>
          <Button onClick={() => handleIntervalChange("h2")}>H2</Button>
          <Button onClick={() => handleIntervalChange("h6")}>H6</Button>
          <Button onClick={() => handleIntervalChange("h12")}>H12</Button>
          <Button onClick={() => handleIntervalChange("d1")}>D1</Button>
        </Flex>
      </Flex>
      <Divider
        color="rgb(100, 100, 100)"
        label={`Time interval: ${interval}`}
        labelPosition="right"
        marginBottom={50}
        marginTop={10}
      />
    </div>
  );
};

export default IntervalSelectionHeader;
