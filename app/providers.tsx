"use client";

import { ThemeProvider } from "@granite/core";
import React from "react";

function Providers({ children }: { children: any }) {
  return (
    <ThemeProvider
      defaultStyles={{
        global: {
          borderRadius: "md",
        },
      }}
      theme="dark"
    >
      {children}
    </ThemeProvider>
  );
}

export default Providers;
