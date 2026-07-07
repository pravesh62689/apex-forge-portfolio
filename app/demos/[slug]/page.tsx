'use client'
import { useState, use } from 'react'
import { notFound } from 'next/navigation'
import { nicheThemes, tierMeta, getPageSlots, type Niche, type Tier, type Slot } from '@/lib/niche-config'
import { nicheContent } from '@/lib/niche-content'

import { NavPillAdaptive } from '@/components/chrome/nav-pill-adaptive'
import { MagneticContactFab } from '@/components/chrome/magnetic-contact-fab'
import { StickyConversionBar } from '@/components/chrome/sticky-conversion-bar'
import { MobileSplashCurtain } from '@/components/chrome/mobile-splash-curtain'
import { UniversalHero } from '@/components/sections/universal-hero'
import { ServicesSection } from '@/components/sections/services-section'
import { MenuShowcase } from '@/components/sections/menu-showcase'
import { BeforeAfterSection, GallerySection, DataFlowSection, ScheduleSection, CoursesSection } from '@/components/sections/visual-sections'
import { StatsSection, TestimonialsSection, PricingSection, BookingSection, FinalCTASection, FooterSection } from '@/components/sections/interactive-sections'

const VALID: Niche[] = ['dentist', 'gym', 'salon', 'coaching', 'restaurant', 'tech']
const VALID_TIERS: Tier[] = ['basic', 'moderate', 'premium']

export default function DemoPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ tier?: string }> }) {
  const { slug } = use(params)
  const { tier: qTier } = use(searchParams)

  if (!VALID.includes(slug as Niche)) return notFound()
  const niche = slug as Niche

  const initialTier: Tier = VALID_TIERS.includes(qTier as Tier) ? (qTier as Tier) : 'premium'
  const [tier, setTier] = useState<Tier>(initialTier)
  const [splashDone, setSplashDone] = useState(tier !== 'premium')

  const theme = nicheThemes[niche]
  const content = nicheContent[niche]
  const slots = getPageSlots(niche, tier)

  const scrollToBooking = () => {
    if (typeof document === 'undefined') return
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  function renderSlot(slot: Slot, key: string) {
    switch (slot) {
      case 'nav':
        return <NavPillAdaptive key={key} tier={tier} theme={theme} onTierChange={setTier} business={content.business} />
      case 'splash':
        return <MobileSplashCurtain key={key} tier={tier} theme={theme} onDone={() => setSplashDone(true)} />
      case 'hero':
        return <UniversalHero key={key} tier={tier} niche={niche} theme={theme} content={content} onCta={scrollToBooking} />
      case 'services':
        return <ServicesSection key={key} tier={tier} theme={theme} content={content} />
      case 'menu':
        return <MenuShowcase key={key} tier={tier} theme={theme} content={content} />
      case 'gallery':
        return <GallerySection key={key} tier={tier} theme={theme} content={content} />
      case 'before-after':
        return <BeforeAfterSection key={key} tier={tier} theme={theme} content={content} />
      case 'data-flow':
        return <DataFlowSection key={key} tier={tier} theme={theme} />
      case 'schedule':
        return <ScheduleSection key={key} tier={tier} theme={theme} content={content} />
      case 'courses':
        return <CoursesSection key={key} tier={tier} theme={theme} content={content} />
      case 'stats':
        return <StatsSection key={key} tier={tier} theme={theme} content={content} />
      case 'proof':
        return <TestimonialsSection key={key} tier={tier} theme={theme} content={content} />
      case 'pricing':
        return <PricingSection key={key} tier={tier} theme={theme} content={content} />
      case 'booking':
        return <BookingSection key={key} tier={tier} theme={theme} content={content} />
      case 'final-cta':
        return <FinalCTASection key={key} tier={tier} theme={theme} onCta={scrollToBooking} />
      case 'footer':
        return <FooterSection key={key} theme={theme} content={content} />
      case 'fab':
        return <MagneticContactFab key={key} tier={tier} theme={theme} />
      case 'sticky-cta':
        return <StickyConversionBar key={key} tier={tier} theme={theme} ctaLabel={theme.ctaLabel} onClick={scrollToBooking} />
      default:
        return null
    }
  }

  return (
    <main className={theme.bg} data-testid={`demo-page-${niche}`}>
      {slots.map((s, i) => renderSlot(s, `${s}-${i}`))}
    </main>
  )
}