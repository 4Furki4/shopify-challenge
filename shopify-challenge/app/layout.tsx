'use client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ChackraProviders from './ChackraProviders'
import './globals.css'
import { Inter } from 'next/font/google'
import { ColorModeScript } from '@chakra-ui/react'
import theme from './theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }
const queryClient = new QueryClient()
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChackraProviders>
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ChackraProviders>
      </body>
    </html>
  )
}
