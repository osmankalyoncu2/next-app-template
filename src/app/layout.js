// Styles
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

// Authentication
import NextAuthProvider from '@/security/NextAuthProvider'

// Theming
import ThemeProvider from '@/lib/theme/ThemeProvider'

// Navigation
import NavigationProvider from '@/navigation/NavigationProvider'
import Intercom from '@/lib/support/intercom'
import Hotjar from '@/lib/analytics/hotjar'
import GoogleAnalytics from '@/lib/analytics/google-analytics'

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
        <ThemeProvider>
          <body className={inter.className + " " + "bg-primary-950"}>
            <NavigationProvider>

              {children}
            </NavigationProvider>
            {/* Other Stuff */}
            <Intercom />
            <Hotjar />
            <GoogleAnalytics />
          </body>
        </ThemeProvider>
      </NextAuthProvider>
    </html>
  )
}
