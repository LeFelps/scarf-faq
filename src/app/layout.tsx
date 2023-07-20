import './globals.css'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import Footer from '@/components/navigation/footer'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const lato = Lato({ subsets: ['latin'], weight: ['700', '400'] })

export const metadata: Metadata = {
  title: 'Scarf',
  description: 'O torcedor não tem razão. É a razão.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${lato.className} flex min-h-screen flex-col items-center relative`}>
        <ToastContainer />
        {children}
        <Footer />
      </body>
    </html>
  )
}
