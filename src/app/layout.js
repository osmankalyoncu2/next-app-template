// Styles
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

// Authentication
import NextAuthProvider from '@/security/NextAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Next App Template',
    template: '%s | Next App Template',
  },
  description: 'Next App Template',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={inter.className}>
          {children}
        </body>
      </NextAuthProvider>
    </html>
  )
}
