/* eslint-disable @next/next/no-sync-scripts */
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar/Navbar'
import styles from './page.module.css'
import Footer from '@/components/footer/Footer'
import { ThemeProvider } from '@/context/ThemeContext'
const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'Birth and Death Registration',
  description: 'Register a new Birth or Death Certificate',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
      <ThemeProvider>
      <div className='container'>

      <Navbar />

      {children}
      <Footer />
      </div>
      </ThemeProvider>
      </body>
    </html>
  )
}
