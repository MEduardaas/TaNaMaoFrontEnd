import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/Provider/useCart'
import { AuthProvider } from '@/Provider/AuthProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'TaNaMão',
  description:
    'Plataforma de compra, aluguel e venda de produtos novos eusados',
  icons: {
    icon: '/images/logo.png'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={true} data-lt-installed={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        data-new-gr-c-s-check-loaded="14.1259.0"
        data-gr-ext-installed=""
      >
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
