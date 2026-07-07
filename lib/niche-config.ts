// Central per-niche + per-tier design + content config.
// A seventh niche later = a config entry, not a page-component edit.

export type Tier = 'basic' | 'moderate' | 'premium'
export type Niche =
  | 'dentist'
  | 'gym'
  | 'salon'
  | 'coaching'
  | 'restaurant'
  | 'tech'

export type NicheTheme = {
  name: string
  vibe: string
  register?: 'fine-dining' | 'casual-cafe'
  // Semantic tailwind tokens (raw class-friendly strings)
  primary: string // solid bg class (bg-teal-600)
  primaryText: string // text-teal-600
  primaryBorder: string // border-teal-600
  primaryHex: string // for inline styles + magnetic buttons
  accent: string // secondary accent bg class
  accentText: string
  accentHex: string
  bg: string // page background class
  surface: string // card surface class
  text: string // primary text color class
  textMuted: string
  isDark: boolean
  fontHeading: string // css var name
  fontBody: string
  signatureMoment: string
  ctaLabel: string // "Book Appointment" | "Reserve Table" | ...
  channel: 'whatsapp' | 'phone' | 'email' // MagneticContactFab default
}

export type NicheContent = {
  headline: string
  subhead: string
  business: string
  location: string
  heroImage: string
  heroImageBlur?: string
  galleryImages: { src: string; alt: string }[]
  services: { name: string; desc: string; price?: string; icon?: string }[]
  testimonials: { name: string; role?: string; text: string }[]
  stats: { label: string; value: number; suffix?: string; prefix?: string }[]
  menuCategories?: { name: string; items: { name: string; desc: string; price: string }[] }[]
  classes?: { day: string; slots: { time: string; name: string; coach: string }[] }[]
  courses?: { name: string; desc: string; duration: string; seatsLeft: number; price: string }[]
  packages?: { name: string; price: string; features: string[]; recommended?: boolean }[]
  beforeAfter?: { before: string; after: string; label: string }[]
}

// ─── THEMES ────────────────────────────────────────────────────────────────
export const nicheThemes: Record<Niche, NicheTheme> = {
  dentist: {
    name: 'Smile Craft Dental',
    vibe: 'Clinical Warmth',
    primary: 'bg-teal-600',
    primaryText: 'text-teal-600',
    primaryBorder: 'border-teal-600',
    primaryHex: '#0d9488',
    accent: 'bg-amber-400',
    accentText: 'text-amber-500',
    accentHex: '#fbbf24',
    bg: 'bg-slate-50',
    surface: 'bg-white',
    text: 'text-slate-900',
    textMuted: 'text-slate-600',
    isDark: false,
    fontHeading: 'var(--font-jakarta)',
    fontBody: 'var(--font-inter)',
    signatureMoment: 'before-after-slider',
    ctaLabel: 'Book Appointment',
    channel: 'whatsapp',
  },
  gym: {
    name: 'Iron Pulse Fitness',
    vibe: 'Iron & Ember',
    primary: 'bg-orange-600',
    primaryText: 'text-orange-500',
    primaryBorder: 'border-orange-600',
    primaryHex: '#ea580c',
    accent: 'bg-orange-500',
    accentText: 'text-orange-400',
    accentHex: '#f97316',
    bg: 'bg-neutral-950',
    surface: 'bg-neutral-900',
    text: 'text-neutral-50',
    textMuted: 'text-neutral-400',
    isDark: true,
    fontHeading: 'var(--font-anton)',
    fontBody: 'var(--font-sora)',
    signatureMoment: 'kinetic-headline-wipe',
    ctaLabel: 'Start Free Trial',
    channel: 'whatsapp',
  },
  salon: {
    name: 'Luxe Locks Studio',
    vibe: 'The Private Lounge',
    primary: 'bg-rose-900',
    primaryText: 'text-rose-900',
    primaryBorder: 'border-rose-900',
    primaryHex: '#881337',
    accent: 'bg-amber-600',
    accentText: 'text-amber-600',
    accentHex: '#d97706',
    bg: 'bg-stone-50',
    surface: 'bg-white',
    text: 'text-stone-900',
    textMuted: 'text-stone-600',
    isDark: false,
    fontHeading: 'var(--font-italiana)',
    fontBody: 'var(--font-karla)',
    signatureMoment: 'silk-drape-wipe',
    ctaLabel: 'Book Your Session',
    channel: 'whatsapp',
  },
  coaching: {
    name: 'Ascent Academy',
    vibe: 'Aspirational Authority',
    primary: 'bg-indigo-700',
    primaryText: 'text-indigo-700',
    primaryBorder: 'border-indigo-700',
    primaryHex: '#4338ca',
    accent: 'bg-amber-400',
    accentText: 'text-amber-500',
    accentHex: '#fbbf24',
    bg: 'bg-slate-50',
    surface: 'bg-white',
    text: 'text-slate-900',
    textMuted: 'text-slate-600',
    isDark: false,
    fontHeading: 'var(--font-space-grotesk)',
    fontBody: 'var(--font-inter)',
    signatureMoment: 'stat-counter-timing',
    ctaLabel: 'Enquire Now',
    channel: 'phone',
  },
  restaurant: {
    name: 'Bistro 62',
    vibe: 'Sensory Warmth',
    register: 'fine-dining',
    primary: 'bg-amber-500',
    primaryText: 'text-amber-400',
    primaryBorder: 'border-amber-500',
    primaryHex: '#f59e0b',
    accent: 'bg-amber-600',
    accentText: 'text-amber-500',
    accentHex: '#d97706',
    bg: 'bg-neutral-900',
    surface: 'bg-neutral-800',
    text: 'text-neutral-50',
    textMuted: 'text-neutral-400',
    isDark: true,
    fontHeading: 'var(--font-fraunces)',
    fontBody: 'var(--font-nunito)',
    signatureMoment: 'menu-tab-layout-glide',
    ctaLabel: 'Reserve a Table',
    channel: 'whatsapp',
  },
  tech: {
    name: 'Perimeter.dev',
    vibe: 'Signal & Perimeter',
    primary: 'bg-blue-600',
    primaryText: 'text-blue-500',
    primaryBorder: 'border-blue-500',
    primaryHex: '#2563eb',
    accent: 'bg-cyan-400',
    accentText: 'text-cyan-400',
    accentHex: '#22d3ee',
    bg: 'bg-slate-950',
    surface: 'bg-slate-900',
    text: 'text-slate-50',
    textMuted: 'text-slate-400',
    isDark: true,
    fontHeading: 'var(--font-geist)',
    fontBody: 'var(--font-geist-mono)',
    signatureMoment: 'data-flow-pulse',
    ctaLabel: 'Get a Quote',
    channel: 'email',
  },
}

// ─── TIER META ─────────────────────────────────────────────────────────────
export const tierMeta: Record<Tier, { name: string; price: string; blurb: string; delivery: string }> = {
  basic: {
    name: 'Basic',
    price: '₹6,000 — ₹8,000',
    blurb: 'A fast, professional online presence. Ships in 2 days.',
    delivery: '2 days',
  },
  moderate: {
    name: 'Moderate',
    price: '₹12,000 — ₹15,000',
    blurb: 'Lead-gen ready. Interactions, forms, social proof.',
    delivery: '4 days',
  },
  premium: {
    name: 'Premium',
    price: '₹20,000+',
    blurb: 'The conversion engine. Signature motion. Custom everything.',
    delivery: '7-10 days',
  },
}

// ─── SLOT SYSTEM ───────────────────────────────────────────────────────────
// Each niche + tier resolves to an ordered list of slot names.
// Page.tsx has zero niche/tier conditionals.
export type Slot =
  | 'nav'
  | 'splash'
  | 'hero'
  | 'services'
  | 'menu'
  | 'schedule'
  | 'courses'
  | 'gallery'
  | 'before-after'
  | 'data-flow'
  | 'proof'
  | 'stats'
  | 'booking'
  | 'pricing'
  | 'sticky-cta'
  | 'final-cta'
  | 'fab'
  | 'footer'

const commonBase: Slot[] = ['nav', 'hero']

function slotsFor(niche: Niche, tier: Tier): Slot[] {
  const slots: Slot[] = [...commonBase]

  // Section pattern per niche
  if (niche === 'restaurant') slots.push('menu', 'gallery')
  else if (niche === 'gym') slots.push('services', 'schedule', 'gallery')
  else if (niche === 'coaching') slots.push('services', 'courses', 'stats')
  else if (niche === 'salon') slots.push('services', 'before-after', 'gallery')
  else if (niche === 'dentist') slots.push('services', 'before-after', 'stats')
  else if (niche === 'tech') slots.push('services', 'data-flow', 'stats')

  slots.push('proof')
  if (niche === 'gym' || niche === 'coaching' || niche === 'tech') slots.push('pricing')
  slots.push('booking', 'final-cta', 'footer', 'fab')

  if (tier !== 'basic') slots.push('sticky-cta')
  if (tier === 'premium') slots.unshift('splash')

  return slots
}

export function getPageSlots(niche: Niche, tier: Tier): Slot[] {
  return slotsFor(niche, tier)
}