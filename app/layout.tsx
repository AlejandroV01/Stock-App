import React from "react";
import { Heebo } from "@next/font/google";
import styles from "./app.css";
import NavBar from "./nav-bar";
// import NavBar from "./nav-bar";

const heebo = Heebo({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html className={`${heebo.className} ${styles.enable}`} lang="en">
      <head />
      <body style={{ padding: "0 5rem", backgroundColor: "#131722" }}>
        <NavBar />
        <div>{children}</div>
      </body>
    </html>
  );
}
