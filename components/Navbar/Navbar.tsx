/* eslint-disable */

"use client";

import { Button } from "@granite/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CVCLogo from "../../public/images/CVCLogoStandard.png";
import styles from "./Navbar.module.css";

const Navbar = (): JSX.Element => {
  return (
    <nav className={styles.Nav}>
      <div className={styles.navContainer}>
        <div className={styles.logoDiv} style={{ position: "relative" }}>
          <Link className={styles.centerFlex} href="/">
            <Image
              alt="logo"
              height={100}
              src={CVCLogo}
              style={{
                height: "fit-content",
                objectFit: "contain",
              }}
              width={175}
            />
          </Link>
        </div>
        <ul className={styles.list}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/browse">Browse</Link>
          </li>
          <li>
            <Link href="/converter">Converter</Link>
          </li>
        </ul>
        <div className={styles.buttonDiv}>
          <Button>Login</Button>
          <Button variant="subtle">Sign Up</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
