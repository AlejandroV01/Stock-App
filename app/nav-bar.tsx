import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from './images/alogo-4.png'
import styles from './nav-bar.module.css'
const NavBar = () => {
  return (
    <nav className={styles.Nav}>
      <ul className={styles.list}>
        <li style={{ position: 'relative' }}>
          <Link href='/' className={styles.centerFlex}>
            <Image src={Logo} alt='' style={{ width: '100px', height: 'fit-content', objectFit: 'contain' }} />
          </Link>
        </li>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/browse'>Browse</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
