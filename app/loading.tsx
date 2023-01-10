"use client";

import { Flex, Spinner } from "@granite/core";
import React from "react";

export default function Loading(): JSX.Element {
  return (
    <Flex>
      <Spinner />
      <p style={{ marginLeft: "5px" }}>Loading...</p>
    </Flex>
  );
}
