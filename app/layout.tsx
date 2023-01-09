import { Heebo } from '@next/font/google'
import styles from './app.css'
import NavBar from './nav-bar'
const heebo = Heebo({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${heebo.className} ${styles.htmlTag}`}>
      <head />
      <body>
        <NavBar></NavBar>
        <div>{children}</div>
      </body>
    </html>
  )
}
