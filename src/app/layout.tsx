'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'

import { theme } from './theme'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      networkMode: 'always',
      retry: false,
    },
  },
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ThemeProvider>

        <ToastContainer theme="colored" />
      </body>
    </html>
  )
}
