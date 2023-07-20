import './globals.css'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import Footer from '@/components/footer'

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
        {children}
        <Footer />
      </body>
    </html>
  )
}
