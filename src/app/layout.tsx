import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <header className='bg-gray-800 text-white py-4'>
            <Navigation />
          </header>

          <main className='flex-grow container mx-auto px-4 py-8'>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
