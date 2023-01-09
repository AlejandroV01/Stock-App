'use client'

import { Button } from '@granite/core'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Logo from './images/alogo-4.png'
import styles from './nav-bar.module.css'
const NavBar = () => {
  return (
    <nav className={styles.Nav}>
      <div className={styles.logoDiv} style={{ position: 'relative' }}>
        <Link href='/' className={styles.centerFlex}>
          <Image src={Logo} alt='' style={{ width: '100px', height: 'fit-content', objectFit: 'contain' }} />
        </Link>
      </div>
      <ul className={styles.list}>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/browse'>Browse</Link>
        </li>
        <li>
          <Link href='/converter'>Converter</Link>
        </li>
      </ul>
      <div className={styles.buttonDiv}>
        <Button>Login</Button>
        <Button variant='subtle'>Sign Up</Button>
      </div>
    </nav>
  )
}

export default NavBar
