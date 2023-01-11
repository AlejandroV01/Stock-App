/* eslint-disable */

import { Heebo } from '@next/font/google'
import React from 'react'
import Hero from '../components/Hero/Hero'
import Navbar from '../components/Navbar/Navbar'
import styles from './app.module.css'
const heebo = Heebo({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html className={heebo.className} lang='en'>
      <head />
      <body className={styles.main_layout}>
        <Navbar />
        <div className={styles.app_content}>{children}</div>
      </body>
    </html>
  )
}
