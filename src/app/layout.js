// Styles
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

// Authentication
import NextAuthProvider from '@/security/NextAuthProvider'

// Theming
import ThemeProvider from '@/lib/theme/ThemeProvider'

// Navigation
import NavigationProvider from '@/navigation/NavigationProvider'

// Tools
import Analytics from '@/lib/analytics/Analytics'
import SupportTools from '@/lib/support/SupportTools'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Make Next App',
    template: '%s | Make Next App',
  },
  description: 'Make Next App',
  // If you need site verifications, add them here
  verification: {
    google: 'google_site_verification',
    bing: 'bing_site_verification',
    yandex: 'yandex_verification',
    yahoo: 'yahoo_site_verification',
    other: {
      me: ['verification_name', 'verification_token'],
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <ThemeProvider>
          {/* Other Stuff */}
          <body className={inter.className + " " + "bg-primary-950"}>
            <NavigationProvider>
              {children}
            </NavigationProvider>
            {/* Tools */}
            <Analytics />
            <SupportTools />
          </body>
        </ThemeProvider>
      </NextAuthProvider>
    </html>
  )
}
