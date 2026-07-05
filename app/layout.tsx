import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { IntroLoader } from '@/components/intro-loader'
import './theme.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: 'Apex Forge — Premium Websites for Local Businesses | Noida & NCR',
  description:
    'Fast, mobile-first websites for local businesses, built personally by a software engineer in Noida. Basic sites live in 2 days, Growth sites in 4 days, and fully custom Premium builds — see live demos and get a personal quote on WhatsApp.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#101014',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased font-sans">
        <IntroLoader />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
