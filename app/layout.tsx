import React from "react";
import { Heebo } from "@next/font/google";
import styles from "./app.css";
// import NavBar from "./nav-bar";

const heebo = Heebo({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className={`${heebo.className} ${styles.enable}`}>
      <head />
      <body style={{ padding: "0 5rem", backgroundColor: "#131722" }}>
        {/* <NavBar></NavBar> */}
        <div>{children}</div>
      </body>
    </html>
  );
}
