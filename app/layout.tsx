import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import {
  Inter, Space_Grotesk, Plus_Jakarta_Sans, Anton, Sora,
  Italiana, Karla, Fraunces, Nunito, Geist, Geist_Mono
} from 'next/font/google'
import { IntroLoader } from '@/components/intro-loader'
import './theme.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })
const italiana = Italiana({ weight: '400', subsets: ['latin'], variable: '--font-italiana' })
const karla = Karla({ subsets: ['latin'], variable: '--font-karla' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })
const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

// --- PRODUCTION SE0 METADATA CONFIGURATION ---
export const metadata: Metadata = {
  metadataBase: new URL('https://apexforge.dev'), // Replace with your live domain
  title: {
    default: 'Apex Forge | Premium Web Design Agency in Noida & NCR',
    template: '%s | Apex Forge Noida'
  },
  description: 'Fast, high-performance, mobile-first websites for local businesses built personally by an expert software engineer in Noida. One-page business sites live in 48 hours. See live demos.',
  keywords: [
    'Web design agency in Noida',
    'Website developer in Noida',
    'Freelance web developer Noida NCR',
    'One page website price India',
    'Local business website builder Noida',
    'Next.js developer Noida Delhi NCR',
    'Affordable website design for small business'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Apex Forge | Premium Websites for Local Businesses in Noida',
    description: 'Get your local business online in 48 hours. Premium, high-converting 1-page websites built directly by a software engineer.',
    url: 'https://apexforge.dev',
    siteName: 'Apex Forge',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // Place a high-quality preview image (1200x630) in your /public directory
        width: 1200,
        height: 630,
        alt: 'Apex Forge Website Design Platform',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Forge | Premium Local Website Development',
    description: 'Get a professional, blazing fast website for your business in 2 days.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
    <html lang="en" className={`bg-background ${inter.variable} ${spaceGrotesk.variable} ${plusJakartaSans.variable} ${anton.variable} ${sora.variable} ${italiana.variable} ${karla.variable} ${fraunces.variable} ${nunito.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased font-sans">
        <IntroLoader />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}