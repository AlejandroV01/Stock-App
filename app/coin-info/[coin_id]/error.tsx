"use client";

import { Button } from "@granite/core";
import React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}): JSX.Element {
  return (
    <div>
      <p>Something went wrong!</p>
      <Button onClick={reset}>Try again</Button>
      <br />
      <h2>Error: {error.message}</h2>
      <span>{JSON.stringify(error)}</span>
    </div>
  );
}
