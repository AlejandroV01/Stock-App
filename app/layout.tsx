import { Heebo } from "@next/font/google";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "./app.module.css";

const heebo = Heebo({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html className={heebo.className} lang="en">
      <head />
      <body className={styles.main_layout}>
        <Navbar />
        <div className={styles.app_content}>{children}</div>
      </body>
    </html>
  );
}
