import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { 
  Inter, 
  Space_Grotesk,
  Plus_Jakarta_Sans,
  Anton,
  Sora,
  Italiana,
  Karla,
  Fraunces,
  Nunito,
  Geist,
  Geist_Mono
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
    <html lang="en" className={`bg-background ${inter.variable} ${spaceGrotesk.variable} ${plusJakartaSans.variable} ${anton.variable} ${sora.variable} ${italiana.variable} ${karla.variable} ${fraunces.variable} ${nunito.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased font-sans">
        <IntroLoader />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
