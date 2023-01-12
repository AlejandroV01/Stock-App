"use client";

import { Button, Divider, Flex } from "@granite/core";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  coin_id: string;
  interval: string;
}

const IntervalSelectionHeader = ({ coin_id, interval }: Props) => {
  const { push } = useRouter();

  const handleChangeInterval = (newInterval: string): void => {
    push(`/coin-info/${coin_id}/${newInterval}`);
  };

  return (
    <div>
      <Flex justifyContent="space-between">
        <h1>{coin_id}</h1>
        <Flex justifyContent="flex-end">
          <Button onClick={() => handleChangeInterval("m1")}>M1</Button>
          <Button onClick={() => handleChangeInterval("m5")}>M5</Button>
          <Button onClick={() => handleChangeInterval("m15")}>M15</Button>
          <Button onClick={() => handleChangeInterval("m30")}>M30</Button>
          <Button onClick={() => handleChangeInterval("h1")}>H1</Button>
          <Button onClick={() => handleChangeInterval("h2")}>H2</Button>
          <Button onClick={() => handleChangeInterval("h6")}>H6</Button>
          <Button onClick={() => handleChangeInterval("h12")}>H12</Button>
          <Button onClick={() => handleChangeInterval("d1")}>D1</Button>
        </Flex>
      </Flex>
      <Divider
        color="rgb(100, 100, 100)"
        label={`Time interval: ${interval}`}
        labelPosition="right"
        marginBottom={50}
      />
    </div>
  );
};

export default IntervalSelectionHeader;
