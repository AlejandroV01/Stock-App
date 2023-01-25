import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { ThemeProvider } from "@granite/core";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme="light">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
