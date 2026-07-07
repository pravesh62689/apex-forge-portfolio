I have enough to build. Now let me create the full component library. I'll build the core files in parallel — starting with the config, motion presets, and evolved reveal system.
Action: file_editor create /app/lib/motion-presets.ts --file-text "// Central Framer Motion motion vocabulary. All components import from here.
// Damping ratios: confident ≈ 0.87, glide ≈ 1.00, kinetic ≈ 0.38

export const motionPresets = {
  // Nav, buttons, hovers, focus states — feels responsive & confident
  confident: { type: 'spring' as const, stiffness: 300, damping: 30, mass: 1 },
  // Hero reveals, image settles — slow, cinematic
  glide: { type: 'spring' as const, stiffness: 120, damping: 22, mass: 1 },
  // Gym CTA pops, magnetic release, urgency pulses, error shakes — playful & bouncy
  kinetic: { type: 'spring' as const, stiffness: 400, damping: 15, mass: 1 },
} as const

export type MotionPresetName = keyof typeof motionPresets

// Common easing curves for CSS transitions
export const easing = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
}

// Z-index scale — kept in JS so components stay consistent
export const zLayer = {
  gallery: 20,
  nav: 40,
  sticky: 50,
  back: 70,
  splash: 100,
} as const

// Reveal defaults per context
export const revealDefaults = {
  hero: { margin: '-15%', staggerChildren: 0.15 },
  grid: { margin: '-10%', staggerChildren: 0.1, delayChildren: 0.1 },
  dense: { margin: '-5%', staggerChildren: 0.05 },
  headline: { margin: '-15%', staggerChildren: 0.04 },
} as const
"
Observation: Create successful: /app/lib/motion-presets.ts




Action: file_editor create /app/lib/niche-config.ts --file-text "// Central per-niche + per-tier design + content config.
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
  ctaLabel: string // \"Book Appointment\" | \"Reserve Table\" | ...
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
"
Observation: Create successful: /app/lib/niche-config.ts


Now let me create the content data file (separate from theme so it stays manageable), and all core chrome components in parallel.
Action: file_editor create /app/lib/niche-content.ts --file-text "import type { Niche, NicheContent } from './niche-config'

// Pexels/Unsplash direct URLs per niche
export const nicheContent: Record<Niche, NicheContent> = {
  dentist: {
    headline: 'Painless, modern dentistry\nyou can actually smile about.',
    subhead: 'Digital X-rays, single-visit RCTs and transparent pricing — right here in Noida.',
    business: 'Smile Craft Dental',
    location: 'Sector 18, Noida',
    heroImage: 'https://images.pexels.com/photos/4269276/pexels-photo-4269276.jpeg?auto=compress&cs=tinysrgb&w=1600',
    galleryImages: [
      { src: 'https://images.pexels.com/photos/7800666/pexels-photo-7800666.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Modern dental clinic' },
      { src: 'https://images.pexels.com/photos/6528856/pexels-photo-6528856.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Dental treatment room' },
      { src: 'https://images.pexels.com/photos/4269354/pexels-photo-4269354.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Dentist with patient' },
    ],
    services: [
      { name: 'Consultation + X-Ray', desc: 'Full check-up with digital X-ray.', price: '₹500' },
      { name: 'Teeth Whitening', desc: 'In-clinic laser whitening in one sitting.', price: '₹6,000' },
      { name: 'Root Canal (RCT)', desc: 'Painless, single-visit rotary RCT.', price: '₹4,500' },
      { name: 'Dental Implant', desc: 'Titanium implant with ceramic crown.', price: '₹25,000' },
      { name: 'Braces & Aligners', desc: 'Metal, ceramic and clear-aligner options.', price: 'from ₹35,000' },
      { name: 'Kids Dentistry', desc: 'Gentle, cavity-focused care for children.', price: '₹800' },
    ],
    testimonials: [
      { name: 'Anita V.', role: 'Patient, Sector 15', text: 'Booked online, zero waiting. Completely painless RCT.' },
      { name: 'Farhan A.', role: 'Patient, Noida Extn', text: 'Doctor explained everything with photos. Very transparent.' },
      { name: 'Ritika S.', role: 'Bride, 2024', text: 'Got my smile whitening done a week before my wedding. Perfect.' },
      { name: 'Karan M.', role: 'Patient', text: 'The clinic looks and feels premium without pretending to be expensive.' },
    ],
    stats: [
      { label: 'Happy patients', value: 4200, suffix: '+' },
      { label: 'Google rating', value: 4.9, suffix: '/5' },
      { label: 'Years practicing', value: 12, suffix: '+' },
      { label: 'Painless procedures', value: 100, suffix: '%' },
    ],
    beforeAfter: [
      { label: 'Full smile makeover', before: 'https://images.pexels.com/photos/6812554/pexels-photo-6812554.jpeg?auto=compress&cs=tinysrgb&w=900', after: 'https://images.pexels.com/photos/6528858/pexels-photo-6528858.jpeg?auto=compress&cs=tinysrgb&w=900' },
    ],
  },
  gym: {
    headline: 'Train harder.\nRecover smarter.\nBecome iron.',
    subhead: 'Certified coaches, 24/7 access, group HIIT and a floor that never sleeps.',
    business: 'Iron Pulse Fitness',
    location: 'Sector 62, Noida',
    heroImage: 'https://images.pexels.com/photos/33360899/pexels-photo-33360899.jpeg?auto=compress&cs=tinysrgb&w=1600',
    galleryImages: [
      { src: 'https://images.pexels.com/photos/33832204/pexels-photo-33832204.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Gym floor' },
      { src: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Personal training' },
      { src: 'https://images.pexels.com/photos/136404/pexels-photo-136404.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'HIIT class' },
      { src: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Weight rack' },
    ],
    services: [
      { name: 'Strength Floor', desc: 'Free weights, Olympic platforms, rigs.', price: 'included' },
      { name: 'HIIT & Group', desc: 'Bootcamp, HRX, spin, yoga — unlimited.', price: '₹2,000/mo' },
      { name: 'Personal Training', desc: '12 sessions with certified coach.', price: '₹8,000' },
      { name: 'Nutrition Plan', desc: 'Custom macros + monthly check-ins.', price: '₹3,500' },
    ],
    testimonials: [
      { name: 'Vikram T.', role: 'Member since 2023', text: 'Joined after seeing the class schedule online. Zero hassle, real results.' },
      { name: 'Neha P.', text: 'Paid my annual fee through the website in one tap. Coaches actually care.' },
      { name: 'Aditya R.', role: 'Lost 18kg', text: 'The coach programmed everything. I just had to show up.' },
    ],
    stats: [
      { label: 'Active members', value: 1800, suffix: '+' },
      { label: 'Certified coaches', value: 14 },
      { label: 'Group classes / week', value: 42 },
      { label: 'Open hours', value: 24, suffix: '/7' },
    ],
    classes: [
      { day: 'Mon', slots: [{ time: '6:00', name: 'HRX', coach: 'Rohit' }, { time: '7:30', name: 'HIIT', coach: 'Priya' }, { time: '19:00', name: 'Spin', coach: 'Aman' }] },
      { day: 'Tue', slots: [{ time: '6:00', name: 'Yoga', coach: 'Nisha' }, { time: '8:00', name: 'Strength', coach: 'Rohit' }, { time: '19:30', name: 'HIIT', coach: 'Priya' }] },
      { day: 'Wed', slots: [{ time: '6:00', name: 'HRX', coach: 'Rohit' }, { time: '18:00', name: 'Bootcamp', coach: 'Aman' }, { time: '20:00', name: 'Yoga', coach: 'Nisha' }] },
      { day: 'Thu', slots: [{ time: '6:00', name: 'Spin', coach: 'Aman' }, { time: '7:30', name: 'HIIT', coach: 'Priya' }, { time: '19:00', name: 'Strength', coach: 'Rohit' }] },
      { day: 'Fri', slots: [{ time: '6:00', name: 'HRX', coach: 'Rohit' }, { time: '18:00', name: 'Zumba', coach: 'Sonia' }, { time: '20:00', name: 'Yoga', coach: 'Nisha' }] },
      { day: 'Sat', slots: [{ time: '7:00', name: 'Bootcamp', coach: 'Aman' }, { time: '9:00', name: 'HIIT', coach: 'Priya' }] },
      { day: 'Sun', slots: [{ time: '8:00', name: 'Long-Run Club', coach: 'Rohit' }] },
    ],
    packages: [
      { name: 'Monthly', price: '₹1,500', features: ['Full floor access', 'Locker + shower', 'Free WiFi'] },
      { name: 'Quarterly', price: '₹4,000', features: ['Everything in Monthly', '1 group class type', '1 free InBody scan'], recommended: false },
      { name: 'Annual', price: '₹15,000', features: ['Everything in Quarterly', 'Unlimited group classes', 'Nutrition plan', '2 months free'], recommended: true },
    ],
  },
  salon: {
    headline: 'Walk in.\nGlow out.',
    subhead: 'A private lounge for premium hair, beauty and nail artistry.',
    business: 'Luxe Locks Studio',
    location: 'DLF Mall, Sector 18',
    heroImage: 'https://images.pexels.com/photos/13068377/pexels-photo-13068377.jpeg?auto=compress&cs=tinysrgb&w=1600',
    galleryImages: [
      { src: 'https://images.pexels.com/photos/7195809/pexels-photo-7195809.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Stylist at work' },
      { src: 'https://images.pexels.com/photos/3993454/pexels-photo-3993454.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Salon interior' },
      { src: 'https://images.pexels.com/photos/3997388/pexels-photo-3997388.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Bridal makeup' },
      { src: 'https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Nail art' },
    ],
    services: [
      { name: 'Hair Cut & Style', desc: 'Consultation, cut, wash and blow-dry.', price: '₹800' },
      { name: 'Global Hair Colour', desc: 'Ammonia-free colour with treatment.', price: '₹3,500' },
      { name: 'Bridal Makeup', desc: 'HD makeup with trial session included.', price: '₹15,000' },
      { name: 'Gel Nail Art', desc: 'Custom designs, 3-week wear guarantee.', price: '₹1,200' },
      { name: 'Balayage', desc: 'Hand-painted highlights, foilyage finish.', price: '₹5,500' },
      { name: 'Signature Facial', desc: '60-min glow facial + LED therapy.', price: '₹2,400' },
    ],
    testimonials: [
      { name: 'Shreya M.', role: 'Bride, 2024', text: 'Booked my bridal trial through the site. Flawless experience.' },
      { name: 'Kavya R.', text: 'Loved the gallery — I picked my exact hairstyle before visiting.' },
      { name: 'Isha K.', text: 'The private-lounge vibe is real. Quiet, plush, unhurried.' },
    ],
    stats: [
      { label: 'Happy clients', value: 3400, suffix: '+' },
      { label: 'Repeat rate', value: 78, suffix: '%' },
      { label: 'Master stylists', value: 8 },
    ],
    beforeAfter: [
      { label: 'Balayage transformation', before: 'https://images.pexels.com/photos/3993323/pexels-photo-3993323.jpeg?auto=compress&cs=tinysrgb&w=900', after: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=900' },
    ],
  },
  coaching: {
    headline: 'Where India\'s\nnext toppers train.',
    subhead: 'JEE / NEET / Boards — small batches, real teachers, honest reporting.',
    business: 'Ascent Academy',
    location: 'Sector 15, Noida',
    heroImage: 'https://images.unsplash.com/photo-1643386581833-6ca5e552255c?auto=format&fit=crop&w=1600',
    galleryImages: [
      { src: 'https://images.pexels.com/photos/8617715/pexels-photo-8617715.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Smart classroom' },
      { src: 'https://images.pexels.com/photos/8617543/pexels-photo-8617543.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Faculty' },
    ],
    services: [
      { name: 'JEE Foundation', desc: 'PCM — 6 days/week, XI + XII.', price: '₹45,000/yr' },
      { name: 'NEET Crash', desc: '90-day intensive with daily tests.', price: '₹30,000' },
      { name: 'Class X Boards', desc: 'Science + Maths, weekend batches.', price: '₹18,000/yr' },
      { name: 'Doubt-Clearing Pass', desc: 'Unlimited 1-on-1 doubt sessions.', price: '₹5,000/mo' },
    ],
    courses: [
      { name: 'JEE Advanced 2026', desc: 'Two-year full track with monthly tests', duration: '24 months', seatsLeft: 6, price: '₹85,000' },
      { name: 'NEET Rapid Revision', desc: 'Focused 90-day final push', duration: '3 months', seatsLeft: 12, price: '₹30,000' },
      { name: 'JEE Mains 2026', desc: 'Class XII focused fast-track', duration: '10 months', seatsLeft: 4, price: '₹42,000' },
      { name: 'Class X Boards', desc: 'Science + Maths weekend batches', duration: '10 months', seatsLeft: 18, price: '₹18,000' },
    ],
    testimonials: [
      { name: 'Ishita (NEET 2025)', role: 'Ranked 4,821', text: 'Small batches meant real attention. Cleared in first attempt.' },
      { name: 'Parent of Aarav', text: 'Weekly test reports on WhatsApp keep us fully informed.' },
      { name: 'Rahul K.', role: 'JEE 2024', text: 'The doubt-clearing pass paid for itself in one week.' },
    ],
    stats: [
      { label: 'Selections in top 100', value: 42 },
      { label: 'Student-to-faculty', value: 12, suffix: ':1' },
      { label: 'Years teaching', value: 15, suffix: '+' },
      { label: 'Avg. attendance', value: 96, suffix: '%' },
    ],
    packages: [
      { name: 'Weekend Boards', price: '₹18,000', features: ['Science + Maths', 'Weekend batches', 'Monthly tests'] },
      { name: 'JEE Foundation', price: '₹45,000', features: ['PCM daily', 'Weekly tests', 'Doubt sessions', 'Study material'], recommended: true },
      { name: 'JEE Advanced Track', price: '₹85,000', features: ['Everything in Foundation', '2-year full track', '1-on-1 mentor', 'Parent dashboard'] },
    ],
  },
  restaurant: {
    headline: 'A quiet corner of Noida\nfor loud, honest flavour.',
    subhead: 'Wood-fired pizzas, artisan coffee and slow Sunday brunches at Bistro 62.',
    business: 'Bistro 62',
    location: 'Sector 62, Noida',
    heroImage: 'https://images.pexels.com/photos/10633476/pexels-photo-10633476.jpeg?auto=compress&cs=tinysrgb&w=1600',
    galleryImages: [
      { src: 'https://images.pexels.com/photos/29962487/pexels-photo-29962487.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Signature dish' },
      { src: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Warm interior' },
      { src: 'https://images.pexels.com/photos/1878346/pexels-photo-1878346.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Chef plating' },
      { src: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Private event' },
    ],
    services: [
      { name: 'À la carte dining', desc: 'Chef-led seasonal menu, 7 days a week.' },
      { name: 'Private events', desc: 'Sit-down for up to 40, buffet for 80.' },
      { name: 'Catering', desc: 'Delivered to your door across Noida-NCR.' },
    ],
    testimonials: [
      { name: 'Rohit S.', text: 'Best cappuccino in Sector 62. The truffle pizza is unreal.' },
      { name: 'Megha K.', text: 'Booked a birthday dinner via WhatsApp in 2 minutes.' },
      { name: 'Team @ Paytm', text: 'Best off-site venue we\'ve found in NCR.' },
    ],
    stats: [
      { label: 'Zomato rating', value: 4.6, suffix: '/5' },
      { label: 'Signature dishes', value: 42 },
      { label: 'Repeat guests', value: 71, suffix: '%' },
    ],
    menuCategories: [
      { name: 'Signatures', items: [
        { name: 'Truffle Mushroom Pizza', desc: 'Hand-stretched crust, wild mushrooms, truffle oil.', price: '₹650' },
        { name: 'Slow-Braised Lamb Shank', desc: '6-hour braise, root-veg mash, jus.', price: '₹890' },
        { name: 'Miso Cod', desc: 'Sake-marinated cod, dashi broth, greens.', price: '₹950' },
      ] },
      { name: 'Small Plates', items: [
        { name: 'Burrata & Peach', desc: 'Fresh burrata, grilled peach, basil oil.', price: '₹480' },
        { name: 'Tuna Tartare', desc: 'Sushi-grade tuna, avocado, chilli-lime.', price: '₹620' },
        { name: 'Charred Broccolini', desc: 'Miso butter, sesame, chilli crisp.', price: '₹380' },
      ] },
      { name: 'Bakery', items: [
        { name: 'Sourdough Loaf', desc: '48-hour ferment, cultured butter.', price: '₹280' },
        { name: 'Chocolate Croissant', desc: 'Laminated 27 layers, dark 70%.', price: '₹180' },
        { name: 'Belgian Waffle Stack', desc: 'Berries, maple, whipped cream.', price: '₹350' },
      ] },
      { name: 'Bar', items: [
        { name: 'Espresso Martini', desc: 'Cold-brew, vanilla vodka, kahlua.', price: '₹480' },
        { name: 'Yuzu Highball', desc: 'Suntory whisky, yuzu, soda.', price: '₹520' },
        { name: 'Cappuccino', desc: 'Freshly roasted single-origin.', price: '₹220' },
      ] },
    ],
  },
  tech: {
    headline: 'Zero-trust perimeters.\nHigh-signal engineering.',
    subhead: 'We ship secure, fast, boring-in-a-good-way infrastructure for teams that can\'t afford drama.',
    business: 'Perimeter.dev',
    location: 'Bengaluru + Remote',
    heroImage: 'https://images.pexels.com/photos/6804612/pexels-photo-6804612.jpeg?auto=compress&cs=tinysrgb&w=1600',
    galleryImages: [
      { src: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Engineer at work' },
      { src: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Server rack' },
    ],
    services: [
      { name: 'Zero-Trust Migration', desc: 'BeyondCorp-style rollout, phased over 6 weeks.' },
      { name: 'Platform Engineering', desc: 'IDPs, CI/CD, K8s baselines, golden paths.' },
      { name: 'SRE On-Call', desc: 'PagerDuty-integrated, real humans, SLO-driven.' },
      { name: 'Security Audits', desc: 'SOC-2 & ISO-27001 readiness sprints.' },
    ],
    testimonials: [
      { name: 'CTO, Series-B Fintech', text: 'Cut our mean-time-to-recovery from 42 minutes to under 5.' },
      { name: 'VP Eng, HealthTech', text: 'The team ships. And they document. Both, in one contract.' },
      { name: 'Founder, Devtool Startup', text: 'Best security review I\'ve ever paid for. Actionable, not academic.' },
    ],
    stats: [
      { label: 'Uptime SLA', value: 99.99, suffix: '%' },
      { label: 'Projects shipped', value: 87 },
      { label: 'Avg response time', value: 4, suffix: ' min' },
    ],
    packages: [
      { name: 'Advisory', price: '$4,000/mo', features: ['Weekly office hours', 'Architecture reviews', 'On-call escalation path'] },
      { name: 'Platform Sprint', price: '$18,000', features: ['6-week sprint', 'IDP + CI/CD setup', 'Team enablement', 'Runbooks'], recommended: true },
      { name: 'Full SRE Retainer', price: '$28,000/mo', features: ['24/7 on-call', 'Incident response', 'Quarterly audits', 'Named engineer'] },
    ],
  },
}
"
Observation: Create successful: /app/lib/niche-content.ts

Now let me build all the components in parallel. I'll create the chrome, orchestrator, skeleton loader, magnetic FAB, and other core UI files.
Action: file_editor create /app/components/orchestrator/reveal-orchestrator.tsx --file-text "'use client'
import { motion, useReducedMotion, type MotionProps, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { motionPresets, revealDefaults, type MotionPresetName } from '@/lib/motion-presets'

type Preset = MotionPresetName
type Ctx = 'hero' | 'grid' | 'dense' | 'headline'

interface Props extends MotionProps {
  children: ReactNode
  tier?: 'basic' | 'moderate' | 'premium'
  preset?: Preset
  context?: Ctx
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'ul' | 'li' | 'span'
  stagger?: boolean // children mode
}

/**
 * RevealOrchestrator — the evolved reveal.tsx.
 * `tier` prop swaps the named Framer Motion preset, so the whole factory
 * shares one motion vocabulary. Respects prefers-reduced-motion.
 */
export function RevealOrchestrator({
  children,
  tier = 'moderate',
  preset,
  context = 'grid',
  direction = 'up',
  distance = 24,
  delay = 0,
  className,
  as = 'div',
  stagger = false,
  ...rest
}: Props) {
  const reduced = useReducedMotion()

  // Choose preset based on tier if not overridden
  const activePreset: Preset =
    preset ?? (tier === 'premium' ? 'glide' : tier === 'moderate' ? 'confident' : 'confident')

  const spring = motionPresets[activePreset]
  const ctx = revealDefaults[context]

  const offset = {
    x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
  }

  const containerVariants: Variants = stagger
    ? {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: ctx.staggerChildren,
            delayChildren: 'delayChildren' in ctx ? ctx.delayChildren : 0,
          },
        },
      }
    : {
        hidden: { opacity: 0, ...offset },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { ...spring, delay },
        },
      }

  const childVariants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0, transition: spring },
  }

  if (reduced) {
    const Tag = as as 'div'
    return (
      <Tag className={className}>{children}</Tag>
    )
  }

  const MotionTag = motion[as] as typeof motion.div

  if (stagger) {
    return (
      <MotionTag
        className={className}
        variants={containerVariants}
        initial=\"hidden\"
        whileInView=\"visible\"
        viewport={{ once: true, margin: ctx.margin }}
        {...rest}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div key={i} variants={childVariants}>
                {child}
              </motion.div>
            ))
          : (
              <motion.div variants={childVariants}>{children}</motion.div>
            )}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial=\"hidden\"
      whileInView=\"visible\"
      viewport={{ once: true, margin: ctx.margin }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
"
Observation: Create successful: /app/components/orchestrator/reveal-orchestrator.tsx


Action: file_editor create /app/components/orchestrator/skeleton-image.tsx --file-text "'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Tier } from '@/lib/niche-config'

type Props = {
  src: string
  alt: string
  tier?: Tier
  aspect?: string // e.g. 'aspect-[16/9]'
  className?: string
  imgClassName?: string
  priority?: boolean
  accentHex?: string
}

/**
 * SkeletonPulseCore + SkeletonMorphPremium in one component,
 * gated by `tier`. Basic/Moderate → shimmer sweep + fade.
 * Premium → shimmer → blur-scale settle on decode.
 */
export function SkeletonImage({
  src,
  alt,
  tier = 'moderate',
  aspect = 'aspect-[16/10]',
  className,
  imgClassName,
  priority,
  accentHex,
}: Props) {
  const [loaded, setLoaded] = useState(false)
  const isPremium = tier === 'premium'

  return (
    <div
      className={cn('relative overflow-hidden isolate', aspect, className)}
      style={
        accentHex
          ? ({
              // Shimmer uses the niche's own tokens (light backdrop -> accent)
              ['--shimmer-accent' as string]: accentHex + '33',
            } as React.CSSProperties)
          : undefined
      }
    >
      {/* Shimmer skeleton — persists until image finishes loading */}
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 skeleton-shimmer transition-opacity duration-500',
          loaded ? 'opacity-0' : 'opacity-100',
        )}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        className={cn(
          'absolute inset-0 h-full w-full object-cover will-change-transform',
          // Premium: three-stage settle on decode — blur + scale into place on glide preset
          isPremium
            ? loaded
              ? 'opacity-100 blur-0 scale-100 transition-[opacity,filter,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]'
              : 'opacity-0 blur-[10px] scale-[1.03]'
            : loaded
              ? 'opacity-100 transition-opacity duration-500'
              : 'opacity-0',
          imgClassName,
        )}
      />
    </div>
  )
}
"
Observation: Create successful: /app/components/orchestrator/skeleton-image.tsx


Action: file_editor create /app/components/chrome/nav-pill-adaptive.tsx --file-text "'use client'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { motionPresets, zLayer } from '@/lib/motion-presets'
import type { Tier, NicheTheme } from '@/lib/niche-config'
import { tierMeta } from '@/lib/niche-config'

type Props = {
  tier: Tier
  theme: NicheTheme
  onTierChange: (t: Tier) => void
  business: string
  showBack?: boolean
}

/**
 * NavPillAdaptive:
 * - Basic: static
 * - Moderate: shrinks & blurs past 80px scroll
 * - Premium: magnetic-hover logo, shared-layoutId active tier pill
 */
export function NavPillAdaptive({ tier, theme, onTierChange, business, showBack = true }: Props) {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 80))
  }, [scrollY])

  const shrinkable = tier !== 'basic'
  const compact = shrinkable && scrolled

  return (
    <motion.nav
      className={cn(
        'fixed left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3',
        'rounded-full border shadow-lg backdrop-blur-xl',
        theme.isDark
          ? 'bg-white/5 border-white/10 text-white'
          : 'bg-white/70 border-black/5 text-slate-900',
        compact ? 'top-3 px-2 py-1.5 md:px-3' : 'top-4 md:top-6 px-3 py-2 md:px-4',
        'transition-[top,padding] duration-300 ease-out',
      )}
      style={{ zIndex: zLayer.nav }}
      initial={reduced ? false : { y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={motionPresets.confident}
      data-testid=\"nav-pill-adaptive\"
    >
      {showBack && (
        <Link
          href=\"/\"
          className={cn(
            'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium hover:opacity-80',
            theme.isDark ? 'hover:bg-white/10' : 'hover:bg-black/5',
          )}
          data-testid=\"nav-back-to-portfolio\"
        >
          <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2.5\">
            <path d=\"M15 18l-6-6 6-6\" />
          </svg>
          <span className=\"hidden sm:inline\">Portfolio</span>
        </Link>
      )}

      <motion.span
        whileHover={tier === 'premium' && !reduced ? { scale: 1.05, x: 2 } : undefined}
        transition={motionPresets.confident}
        className={cn(
          'font-semibold tracking-tight truncate max-w-[160px] md:max-w-none',
          compact ? 'text-xs md:text-sm' : 'text-sm md:text-base',
        )}
        style={{ fontFamily: theme.fontHeading }}
        data-testid=\"nav-business-name\"
      >
        {business}
      </motion.span>

      <div
        className={cn(
          'ml-2 md:ml-4 flex items-center gap-0.5 rounded-full p-0.5 relative',
          theme.isDark ? 'bg-white/10' : 'bg-black/5',
        )}
        data-testid=\"nav-tier-switcher-pill\"
      >
        {(['basic', 'moderate', 'premium'] as Tier[]).map((t) => (
          <button
            key={t}
            onClick={() => onTierChange(t)}
            className={cn(
              'relative px-2.5 md:px-3.5 py-1 rounded-full text-[11px] md:text-xs font-semibold transition-colors z-10',
              tier === t ? 'text-white' : theme.isDark ? 'text-white/70 hover:text-white' : 'text-slate-700 hover:text-slate-900',
            )}
            data-testid={`nav-tier-option-${t}`}
          >
            {tier === t && (
              <motion.span
                layoutId=\"active-tier-pill\"
                className=\"absolute inset-0 rounded-full -z-10 shadow-sm\"
                style={{ backgroundColor: theme.primaryHex }}
                transition={motionPresets.confident}
              />
            )}
            {tierMeta[t].name}
          </button>
        ))}
      </div>
    </motion.nav>
  )
}
"
Observation: Create successful: /app/components/chrome/nav-pill-adaptive.tsx


Action: file_editor create /app/components/chrome/magnetic-contact-fab.tsx --file-text "'use client'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { zLayer } from '@/lib/motion-presets'
import type { Tier, NicheTheme } from '@/lib/niche-config'

type Props = {
  tier: Tier
  theme: NicheTheme
  channel?: 'whatsapp' | 'phone' | 'email'
  target?: string // \"919999999999\" for whatsapp/phone, \"hello@x.com\" for email
  label?: string
}

/**
 * MagneticContactFab
 * - Basic: static
 * - Moderate: idle breathing pulse
 * - Premium: cursor magnetism (30-40% damped, clamped ±14px)
 */
export function MagneticContactFab({
  tier,
  theme,
  channel,
  target = '919999999999',
  label,
}: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const ch = channel ?? theme.channel

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 150, damping: 15 })
  const y = useSpring(rawY, { stiffness: 150, damping: 15 })

  useEffect(() => {
    if (tier !== 'premium' || reduced) return
    const el = ref.current
    if (!el) return
    function onMove(e: MouseEvent) {
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      // Trigger only when cursor is within ~120px
      const dist = Math.hypot(dx, dy)
      if (dist > 140) {
        rawX.set(0)
        rawY.set(0)
        return
      }
      // Damp to 35% and clamp to ±14px
      const pull = 0.35
      const clamp = (v: number) => Math.max(-14, Math.min(14, v))
      rawX.set(clamp(dx * pull))
      rawY.set(clamp(dy * pull))
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [tier, reduced, rawX, rawY])

  const href =
    ch === 'whatsapp'
      ? `https://wa.me/${target.replace(/\D/g, '')}`
      : ch === 'phone'
        ? `tel:+${target.replace(/\D/g, '')}`
        : `mailto:${target}`

  const icon =
    ch === 'whatsapp' ? (
      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"currentColor\">
        <path d=\"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413\" />
      </svg>
    ) : ch === 'phone' ? (
      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\">
        <path d=\"M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z\" />
      </svg>
    ) : (
      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\">
        <path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\" />
        <polyline points=\"22,6 12,13 2,6\" />
      </svg>
    )

  const displayLabel = label ?? (ch === 'whatsapp' ? 'WhatsApp' : ch === 'phone' ? 'Call now' : 'Email us')

  return (
    <motion.a
      ref={ref}
      href={href}
      target={ch === 'whatsapp' ? '_blank' : undefined}
      rel=\"noopener noreferrer\"
      className={cn(
        'fixed bottom-5 right-5 md:bottom-8 md:right-8 flex items-center gap-2 rounded-full px-4 py-3 md:px-5 md:py-3.5',
        'font-semibold text-white shadow-2xl',
        'ring-1 ring-white/20',
      )}
      style={{
        backgroundColor: theme.primaryHex,
        zIndex: zLayer.sticky,
        x: tier === 'premium' ? x : 0,
        y: tier === 'premium' ? y : 0,
      }}
      animate={
        tier === 'moderate' && !reduced
          ? { scale: [1, 1.05, 1] }
          : undefined
      }
      transition={
        tier === 'moderate' && !reduced
          ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
          : undefined
      }
      whileHover={!reduced ? { scale: 1.06 } : undefined}
      whileTap={!reduced ? { scale: 0.95 } : undefined}
      data-testid=\"fab-magnetic-contact\"
    >
      {icon}
      <span className=\"hidden sm:inline\">{displayLabel}</span>
    </motion.a>
  )
}
"
Observation: Create successful: /app/components/chrome/magnetic-contact-fab.tsx


Action: file_editor create /app/components/chrome/sticky-conversion-bar.tsx --file-text "'use client'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { motionPresets, zLayer } from '@/lib/motion-presets'
import type { Tier, NicheTheme } from '@/lib/niche-config'

type Props = {
  tier: Tier
  theme: NicheTheme
  ctaLabel: string
  onClick?: () => void
}

/** Sticky bottom conversion bar — only on Moderate/Premium. Pinned above safe-area. */
export function StickyConversionBar({ tier, theme, ctaLabel, onClick }: Props) {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', (v) => setVisible(v > 400))
  }, [scrollY])

  if (tier === 'basic') return null

  return (
    <motion.div
      className={cn(
        'fixed left-3 right-3 md:left-auto md:right-8 md:bottom-8 bottom-3 md:hidden',
        'rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-between px-4 py-3',
        theme.isDark ? 'bg-white/10 text-white ring-1 ring-white/15' : 'bg-white text-slate-900 ring-1 ring-black/5',
      )}
      style={{ zIndex: zLayer.sticky, paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}
      initial={{ y: 100, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={reduced ? { duration: 0 } : motionPresets.confident}
      data-testid=\"sticky-conversion-bar\"
    >
      <div>
        <p className={cn('text-xs font-medium', theme.textMuted)}>Ready to start?</p>
        <p className=\"text-sm font-bold\">{theme.name}</p>
      </div>
      <button
        onClick={onClick}
        className=\"rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md\"
        style={{ backgroundColor: theme.primaryHex }}
        data-testid=\"sticky-conversion-cta\"
      >
        {ctaLabel}
      </button>
    </motion.div>
  )
}
"
Observation: Create successful: /app/components/chrome/sticky-conversion-bar.tsx


Action: file_editor create /app/components/chrome/mobile-splash-curtain.tsx --file-text "'use client'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { motionPresets, zLayer } from '@/lib/motion-presets'
import type { Tier, NicheTheme } from '@/lib/niche-config'

type Props = {
  tier: Tier
  theme: NicheTheme
  onDone: () => void
}

/**
 * MobileSplashCurtain
 * Premium tier, mobile viewport, first session only.
 * Sequence: fill in niche primary → logo scale/fade → hold 400ms → clip-path wipe out.
 * Chains to onDone() so hero entrance can start on completion.
 * Skipped entirely when prefers-reduced-motion.
 */
export function MobileSplashCurtain({ tier, theme, onDone }: Props) {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only Premium, mobile viewport (<= 768), first session.
    if (tier !== 'premium') { onDone(); return }
    if (reduced) { onDone(); return }
    if (typeof window === 'undefined') return
    if (window.innerWidth > 768) { onDone(); return }
    try {
      if (sessionStorage.getItem('splash-shown')) { onDone(); return }
      sessionStorage.setItem('splash-shown', '1')
    } catch { /* ignore */ }

    setVisible(true)
    const t = setTimeout(() => setVisible(false), 1400)
    return () => clearTimeout(t)
  }, [tier, reduced, onDone])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className=\"fixed inset-0 flex items-center justify-center\"
          style={{ backgroundColor: theme.primaryHex, zIndex: zLayer.splash }}
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          data-testid=\"mobile-splash-curtain\"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={motionPresets.confident}
            className=\"text-center text-white\"
          >
            <p style={{ fontFamily: theme.fontHeading }} className=\"text-3xl font-bold tracking-tight\">
              {theme.name}
            </p>
            <p className=\"text-sm opacity-80 mt-2\">{theme.vibe}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
"
Observation: Create successful: /app/components/chrome/mobile-splash-curtain.tsx


Now the content sections — heroes, services, gallery, before/after, data-flow, testimonials, stats, forms, pricing, menu, schedule, courses, final-cta, footer. I'll consolidate related components into single files to reduce file count.
Action: file_editor create /app/components/sections/universal-hero.tsx --file-text "'use client'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motionPresets } from '@/lib/motion-presets'
import { SkeletonImage } from '@/components/orchestrator/skeleton-image'
import type { Tier, Niche, NicheTheme } from '@/lib/niche-config'
import type { NicheContent } from '@/lib/niche-config'

type Props = {
  tier: Tier
  niche: Niche
  theme: NicheTheme
  content: NicheContent
  onCta: () => void
}

/**
 * Universal hero — theme-driven shell with niche-specific signature moments on Premium.
 */
export function UniversalHero({ tier, niche, theme, content, onCta }: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const fgY = useTransform(scrollYProgress, [0, 1], [0, -24])

  const preset = niche === 'gym' ? 'kinetic' : niche === 'salon' || niche === 'dentist' ? 'glide' : 'confident'
  const stagger = tier === 'premium' ? 0.15 : tier === 'moderate' ? 0.12 : 0.08

  const headlineLines = content.headline.split('\n')

  const isGymPremium = niche === 'gym' && tier === 'premium'

  return (
    <section
      ref={ref}
      className={cn(
        'relative isolate overflow-hidden min-h-[86vh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24',
        theme.bg,
      )}
      data-testid={`hero-${niche}`}
    >
      {/* Background image with parallax on moderate+ */}
      <motion.div
        className=\"absolute inset-0 -z-10\"
        style={tier !== 'basic' && !reduced ? { y: bgY } : undefined}
      >
        <SkeletonImage
          src={content.heroImage}
          alt=\"\"
          tier={tier}
          aspect=\"aspect-auto\"
          className=\"absolute inset-0 h-full w-full\"
          imgClassName={cn(theme.isDark ? 'opacity-40' : 'opacity-30')}
          accentHex={theme.primaryHex}
          priority
        />
        <div
          className={cn(
            'absolute inset-0',
            theme.isDark
              ? 'bg-gradient-to-b from-transparent via-black/40 to-neutral-950'
              : 'bg-gradient-to-b from-transparent via-white/60 to-slate-50',
          )}
        />
      </motion.div>

      {/* Ambient orb — Premium only */}
      {tier === 'premium' && !reduced && (
        <div
          aria-hidden
          className=\"absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl pointer-events-none opacity-40\"
          style={{ backgroundColor: theme.primaryHex }}
        />
      )}

      <div className=\"mx-auto max-w-6xl w-full px-6 md:px-12 lg:px-16 grid md:grid-cols-12 gap-8\">
        <motion.div
          className=\"md:col-span-8\"
          style={tier !== 'basic' && !reduced ? { y: fgY } : undefined}
          initial={reduced ? false : 'hidden'}
          animate=\"visible\"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: stagger, delayChildren: 0.1 } },
          }}
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: motionPresets[preset] } }}
            className={cn(
              'inline-flex items-center gap-2 text-xs md:text-sm font-medium mb-4 uppercase tracking-widest',
              theme.textMuted,
            )}
          >
            <span
              className=\"inline-block h-1.5 w-1.5 rounded-full\"
              style={{ backgroundColor: theme.primaryHex }}
            />
            {theme.vibe} · {content.location}
          </motion.p>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: motionPresets[preset] } }}
            className={cn(
              'font-bold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
              theme.text,
              isGymPremium && 'uppercase',
            )}
            style={{ fontFamily: theme.fontHeading }}
            data-testid=\"hero-headline\"
          >
            {headlineLines.map((line, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40, clipPath: isGymPremium ? 'inset(0 100% 0 0)' : 'inset(0 0 0 0)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    clipPath: 'inset(0 0% 0 0)',
                    transition: { ...motionPresets[preset], delay: i * 0.08 },
                  },
                }}
                className=\"block\"
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: motionPresets[preset] } }}
            className={cn('mt-6 text-base md:text-lg max-w-2xl', theme.textMuted)}
            style={{ fontFamily: theme.fontBody }}
          >
            {content.subhead}
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: motionPresets[preset] } }}
            className=\"mt-8 flex flex-wrap gap-3\"
          >
            <button
              onClick={onCta}
              className=\"rounded-full px-6 py-3.5 text-sm md:text-base font-semibold text-white shadow-lg hover:shadow-xl transition-shadow\"
              style={{ backgroundColor: theme.primaryHex }}
              data-testid=\"hero-primary-cta\"
            >
              {theme.ctaLabel} →
            </button>
            <a
              href=\"#services\"
              className={cn(
                'rounded-full px-6 py-3.5 text-sm md:text-base font-semibold ring-1 transition-colors',
                theme.isDark
                  ? 'ring-white/20 text-white hover:bg-white/5'
                  : 'ring-black/10 text-slate-900 hover:bg-black/5',
              )}
              data-testid=\"hero-secondary-cta\"
            >
              See what we do
            </a>
          </motion.div>
        </motion.div>

        {/* Side card — floats on md+ */}
        <motion.div
          className=\"md:col-span-4 hidden md:block\"
          initial={reduced ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...motionPresets[preset], delay: 0.4 }}
        >
          <div
            className={cn(
              'relative rounded-3xl overflow-hidden ring-1 shadow-2xl',
              theme.isDark ? 'ring-white/10' : 'ring-black/5',
            )}
          >
            <SkeletonImage
              src={content.heroImage}
              alt={content.business}
              tier={tier}
              aspect=\"aspect-[3/4]\"
              accentHex={theme.primaryHex}
            />
            <div className={cn('absolute inset-x-0 bottom-0 p-5', 'bg-gradient-to-t from-black/70 to-transparent')}>
              <p className=\"text-white text-sm font-medium opacity-90\">Featured</p>
              <p className=\"text-white text-lg font-bold\">{content.business}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
"
Observation: Create successful: /app/components/sections/universal-hero.tsx


Action: file_editor create /app/components/sections/services-section.tsx --file-text "'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { RevealOrchestrator } from '@/components/orchestrator/reveal-orchestrator'
import { motionPresets } from '@/lib/motion-presets'
import { SkeletonImage } from '@/components/orchestrator/skeleton-image'
import type { Tier, NicheTheme, NicheContent } from '@/lib/niche-config'

type Props = { tier: Tier; theme: NicheTheme; content: NicheContent }

export function ServicesSection({ tier, theme, content }: Props) {
  const reduced = useReducedMotion()

  return (
    <section
      id=\"services\"
      className={cn('relative py-20 md:py-28 lg:py-32', theme.bg)}
      data-testid=\"services-section\"
    >
      <div className=\"mx-auto max-w-6xl px-6 md:px-12\">
        <RevealOrchestrator tier={tier} className=\"max-w-2xl mb-12 md:mb-16\">
          <p
            className={cn('text-xs font-semibold uppercase tracking-widest mb-3', theme.primaryText)}
          >
            What we do
          </p>
          <h2
            className={cn('text-3xl md:text-5xl font-bold tracking-tight', theme.text)}
            style={{ fontFamily: theme.fontHeading }}
          >
            Services built around real outcomes.
          </h2>
          <p className={cn('mt-4 text-base md:text-lg', theme.textMuted)}>
            No filler line items. Every service listed here we actually deliver, priced honestly.
          </p>
        </RevealOrchestrator>

        {tier === 'basic' ? (
          // Basic — icon-label-line grid, single fade
          <RevealOrchestrator
            tier={tier}
            stagger
            context=\"grid\"
            className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6\"
          >
            {content.services.map((s, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-2xl p-6 ring-1',
                  theme.surface,
                  theme.isDark ? 'ring-white/10' : 'ring-black/5',
                )}
                data-testid={`service-card-${i}`}
              >
                <div
                  className=\"h-10 w-10 rounded-lg mb-4 flex items-center justify-center\"
                  style={{ backgroundColor: theme.primaryHex + '22', color: theme.primaryHex }}
                >
                  <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2.5\">
                    <path d=\"M20 6L9 17l-5-5\" />
                  </svg>
                </div>
                <h3 className={cn('font-semibold text-lg', theme.text)}>{s.name}</h3>
                <p className={cn('mt-2 text-sm', theme.textMuted)}>{s.desc}</p>
                {s.price && (
                  <p className={cn('mt-3 text-sm font-semibold', theme.primaryText)}>{s.price}</p>
                )}
              </div>
            ))}
          </RevealOrchestrator>
        ) : (
          // Moderate + Premium — alternating image/text rows
          <div className=\"space-y-14 md:space-y-20\">
            {content.services.slice(0, 4).map((s, i) => {
              const flipped = i % 2 === 1
              return (
                <RevealOrchestrator
                  key={i}
                  tier={tier}
                  className={cn(
                    'grid md:grid-cols-12 gap-6 md:gap-10 items-center',
                    flipped && 'md:[&>*:first-child]:order-2',
                  )}
                >
                  <div className=\"md:col-span-6\">
                    <motion.div
                      whileHover={tier === 'premium' && !reduced ? { y: -6 } : undefined}
                      transition={motionPresets.confident}
                    >
                      <SkeletonImage
                        src={content.galleryImages[i % content.galleryImages.length]?.src ?? content.heroImage}
                        alt={s.name}
                        tier={tier}
                        aspect=\"aspect-[4/3]\"
                        className=\"rounded-3xl\"
                        accentHex={theme.primaryHex}
                      />
                    </motion.div>
                  </div>
                  <div className=\"md:col-span-6\">
                    <p
                      className={cn('text-xs font-semibold uppercase tracking-widest mb-3', theme.primaryText)}
                    >
                      0{i + 1}
                    </p>
                    <h3
                      className={cn('text-2xl md:text-3xl font-bold', theme.text)}
                      style={{ fontFamily: theme.fontHeading }}
                    >
                      {s.name}
                    </h3>
                    <p className={cn('mt-3 text-base', theme.textMuted)}>{s.desc}</p>
                    {s.price && (
                      <p className={cn('mt-4 text-lg font-bold', theme.primaryText)}>{s.price}</p>
                    )}
                    <a
                      href=\"#booking\"
                      className={cn(
                        'mt-5 inline-flex items-center gap-2 text-sm font-semibold',
                        theme.primaryText,
                      )}
                    >
                      Learn more
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </RevealOrchestrator>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
"
Observation: Create successful: /app/components/sections/services-section.tsx


Action: file_editor create /app/components/sections/menu-showcase.tsx --file-text "'use client'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { RevealOrchestrator } from '@/components/orchestrator/reveal-orchestrator'
import { motionPresets } from '@/lib/motion-presets'
import type { Tier, NicheTheme, NicheContent } from '@/lib/niche-config'

/** Restaurant signature — shared-layout tab indicator glide with confident-preset item stagger. */
export function MenuShowcase({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  const cats = content.menuCategories ?? []
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()

  if (!cats.length) return null

  return (
    <section
      id=\"menu\"
      className={cn('relative py-20 md:py-28', theme.bg)}
      data-testid=\"menu-showcase\"
    >
      <div className=\"mx-auto max-w-6xl px-6 md:px-12\">
        <RevealOrchestrator tier={tier} className=\"mb-10\">
          <p className={cn('text-xs font-semibold uppercase tracking-widest mb-3', theme.primaryText)}>
            The menu
          </p>
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            Small kitchen. Slow cooking. Big flavour.
          </h2>
        </RevealOrchestrator>

        <div
          className={cn(
            'flex gap-1 md:gap-2 mb-10 overflow-x-auto pb-2 relative',
            theme.isDark ? 'border-b border-white/10' : 'border-b border-black/10',
          )}
          role=\"tablist\"
        >
          {cats.map((c, i) => (
            <button
              key={c.name}
              role=\"tab\"
              onClick={() => setActive(i)}
              className={cn(
                'relative shrink-0 px-4 md:px-5 py-2.5 text-sm md:text-base font-semibold transition-colors',
                active === i ? theme.text : theme.textMuted,
              )}
              data-testid={`menu-tab-${i}`}
            >
              {active === i && (
                <motion.span
                  layoutId=\"menu-tab-indicator\"
                  className=\"absolute inset-x-0 -bottom-[2px] h-[2px]\"
                  style={{ backgroundColor: theme.primaryHex }}
                  transition={motionPresets.confident}
                />
              )}
              {c.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode=\"wait\">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={motionPresets.confident}
            className=\"grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8\"
          >
            {cats[active].items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...motionPresets.confident, delay: 0.04 * i }}
                className={cn(
                  'flex items-start justify-between gap-4 rounded-2xl p-5 md:p-6 ring-1',
                  theme.surface,
                  theme.isDark ? 'ring-white/10' : 'ring-black/5',
                )}
                data-testid={`menu-item-${i}`}
              >
                <div className=\"min-w-0\">
                  <h4 className={cn('text-lg font-bold', theme.text)}>{item.name}</h4>
                  <p className={cn('mt-1 text-sm', theme.textMuted)}>{item.desc}</p>
                </div>
                <span className={cn('shrink-0 font-bold', theme.primaryText)}>{item.price}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
"
Observation: Create successful: /app/components/sections/menu-showcase.tsx


Action: file_editor create /app/components/sections/visual-sections.tsx --file-text "'use client'
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion'
import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { RevealOrchestrator } from '@/components/orchestrator/reveal-orchestrator'
import { SkeletonImage } from '@/components/orchestrator/skeleton-image'
import { motionPresets } from '@/lib/motion-presets'
import type { Tier, NicheTheme, NicheContent, Niche } from '@/lib/niche-config'

/** Dentist signature — draggable before/after slider on Premium, tap-toggle on Moderate. */
export function BeforeAfterSection({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  const set = content.beforeAfter?.[0]
  const [showAfter, setShowAfter] = useState(false)
  const x = useMotionValue(50)
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  if (!set) return null

  const draggable = tier === 'premium' && !reduced

  function handleDrag(clientX: number) {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100))
    x.set(pct)
  }

  return (
    <section className={cn('py-20 md:py-28', theme.bg)} data-testid=\"before-after-section\">
      <div className=\"mx-auto max-w-5xl px-6 md:px-12\">
        <RevealOrchestrator tier={tier} className=\"mb-8\">
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            The proof is in the transformation.
          </h2>
          <p className={cn('mt-3', theme.textMuted)}>{set.label}</p>
        </RevealOrchestrator>

        <RevealOrchestrator tier={tier}>
          <div
            ref={ref}
            className=\"relative aspect-[16/10] rounded-3xl overflow-hidden ring-1 ring-black/10 select-none touch-none\"
            onMouseMove={draggable ? (e) => handleDrag(e.clientX) : undefined}
            onTouchMove={draggable ? (e) => handleDrag(e.touches[0].clientX) : undefined}
            onClick={tier === 'moderate' ? () => setShowAfter((v) => !v) : undefined}
            data-testid=\"before-after-container\"
          >
            <SkeletonImage src={set.before} alt=\"Before\" tier={tier} aspect=\"aspect-[16/10]\" className=\"absolute inset-0\" accentHex={theme.primaryHex} />
            <motion.div
              className=\"absolute inset-0\"
              style={
                draggable
                  ? { clipPath: useTransform(x, (v) => `inset(0 0 0 ${v}%)`) }
                  : { clipPath: showAfter ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)', transition: 'clip-path 500ms ease' }
              }
            >
              <SkeletonImage src={set.after} alt=\"After\" tier={tier} aspect=\"aspect-[16/10]\" className=\"absolute inset-0\" accentHex={theme.primaryHex} />
            </motion.div>
            {/* Divider handle — draggable on Premium */}
            {draggable && (
              <motion.div
                className=\"absolute top-0 bottom-0 w-0.5 bg-white shadow-lg\"
                style={{ left: useTransform(x, (v) => `${v}%`) }}
              >
                <div className=\"absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-2xl\" style={{ color: theme.primaryHex }}>
                  <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M9 4l-7 8 7 8V4zm6 0v16l7-8-7-8z\"/></svg>
                </div>
              </motion.div>
            )}
            <div className=\"absolute top-4 left-4 rounded-full bg-black/60 text-white px-3 py-1 text-xs font-semibold\">Before</div>
            <div className=\"absolute top-4 right-4 rounded-full text-white px-3 py-1 text-xs font-semibold\" style={{ backgroundColor: theme.primaryHex }}>After</div>
          </div>
        </RevealOrchestrator>
      </div>
    </section>
  )
}

/** Parallax masonry gallery — restaurant/gym/salon. */
export function GallerySection({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  const reduced = useReducedMotion()
  return (
    <section className={cn('py-20 md:py-28 overflow-hidden', theme.bg)} data-testid=\"gallery-section\">
      <div className=\"mx-auto max-w-6xl px-6 md:px-12\">
        <RevealOrchestrator tier={tier} className=\"mb-10 max-w-2xl\">
          <p className={cn('text-xs font-semibold uppercase tracking-widest mb-3', theme.primaryText)}>Gallery</p>
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            A look inside.
          </h2>
        </RevealOrchestrator>

        <div className=\"grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6\">
          {content.galleryImages.map((img, i) => {
            const isTall = i % 3 === 1
            return (
              <motion.div
                key={i}
                initial={reduced ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ ...motionPresets.confident, delay: i * 0.08 }}
                whileHover={tier === 'premium' && !reduced ? { y: -8 } : undefined}
                className={cn('relative', isTall && 'md:row-span-2')}
                data-testid={`gallery-item-${i}`}
              >
                <SkeletonImage src={img.src} alt={img.alt} tier={tier} aspect={isTall ? 'aspect-[3/4]' : 'aspect-[4/3]'} className=\"rounded-2xl\" accentHex={theme.primaryHex} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/** Tech signature — animated data-flow pipeline. */
export function DataFlowSection({ tier, theme }: { tier: Tier; theme: NicheTheme }) {
  const reduced = useReducedMotion()
  const stages = ['REQUEST', 'ENCRYPT', 'PROCESS', 'RESPOND']
  const animated = tier === 'premium' && !reduced

  return (
    <section className={cn('py-20 md:py-32', theme.bg)} data-testid=\"data-flow-section\">
      <div className=\"mx-auto max-w-5xl px-6 md:px-12\">
        <RevealOrchestrator tier={tier} className=\"mb-14 max-w-2xl\">
          <p className={cn('text-xs font-semibold uppercase tracking-widest mb-3', theme.accentText)} style={{ fontFamily: theme.fontBody }}>
            $ zero-trust.pipeline
          </p>
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            Every request. Verified.
          </h2>
        </RevealOrchestrator>

        <div className=\"relative rounded-3xl p-6 md:p-10 ring-1 ring-white/10 bg-white/[0.02] overflow-hidden\">
          <div className=\"relative flex items-center justify-between gap-2 md:gap-6\">
            {stages.map((s, i) => (
              <div key={s} className=\"flex-1 text-center relative z-10\">
                <div
                  className={cn(
                    'mx-auto h-14 w-14 md:h-16 md:w-16 rounded-2xl flex items-center justify-center ring-1',
                    'bg-slate-900 ring-white/10',
                  )}
                >
                  <div
                    className=\"h-3 w-3 rounded-full\"
                    style={{ backgroundColor: theme.accentHex, boxShadow: `0 0 20px ${theme.accentHex}` }}
                  />
                </div>
                <p className={cn('mt-3 text-[10px] md:text-xs font-semibold tracking-widest uppercase', theme.textMuted)} style={{ fontFamily: theme.fontBody }}>
                  {s}
                </p>
              </div>
            ))}

            {/* Pipeline base line */}
            <div className=\"absolute top-7 md:top-8 left-[10%] right-[10%] h-px bg-white/10 -z-0\" />

            {/* Animated pulse */}
            {animated && (
              <motion.div
                className=\"absolute top-6 md:top-7 h-2 w-2 rounded-full -z-0\"
                style={{ backgroundColor: theme.accentHex, boxShadow: `0 0 20px ${theme.accentHex}` }}
                animate={{ left: ['10%', '90%'] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Gym class schedule — momentum drag on Premium. */
export function ScheduleSection({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  const days = content.classes ?? []
  const today = new Date().getDay() // 0=Sun
  const todayIdx = ((today + 6) % 7) // Mon-first

  return (
    <section className={cn('py-20 md:py-28 overflow-hidden', theme.bg)} data-testid=\"schedule-section\">
      <div className=\"mx-auto max-w-6xl px-6 md:px-12\">
        <RevealOrchestrator tier={tier} className=\"mb-8\">
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            THIS WEEK. ON THE FLOOR.
          </h2>
        </RevealOrchestrator>

        <motion.div
          drag={tier === 'premium' ? 'x' : false}
          dragConstraints={{ left: -400, right: 0 }}
          className=\"flex gap-3 md:gap-4 pb-4 cursor-grab active:cursor-grabbing\"
        >
          {days.map((d, i) => (
            <div
              key={d.day}
              className={cn(
                'shrink-0 w-[220px] rounded-2xl p-5 ring-1',
                i === todayIdx ? 'ring-2' : theme.isDark ? 'ring-white/10' : 'ring-black/5',
                theme.surface,
              )}
              style={i === todayIdx ? { borderColor: theme.primaryHex, boxShadow: `0 0 40px ${theme.primaryHex}33` } : undefined}
              data-testid={`schedule-day-${d.day.toLowerCase()}`}
            >
              <p className={cn('text-xs font-semibold uppercase tracking-widest mb-4', i === todayIdx ? theme.primaryText : theme.textMuted)}>
                {d.day} {i === todayIdx && '· TODAY'}
              </p>
              <div className=\"space-y-3\">
                {d.slots.map((slot) => (
                  <div key={slot.time} className={cn('flex items-baseline justify-between gap-3', theme.text)}>
                    <div>
                      <p className=\"font-bold\">{slot.name}</p>
                      <p className={cn('text-xs', theme.textMuted)}>Coach {slot.coach}</p>
                    </div>
                    <span className={cn('text-sm font-mono', theme.primaryText)}>{slot.time}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/** Coaching signature — batch/course cards with tilt + urgency pulse on Premium. */
export function CoursesSection({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  const reduced = useReducedMotion()
  return (
    <section className={cn('py-20 md:py-28', theme.bg)} data-testid=\"courses-section\">
      <div className=\"mx-auto max-w-6xl px-6 md:px-12\">
        <RevealOrchestrator tier={tier} className=\"mb-10 max-w-2xl\">
          <p className={cn('text-xs font-semibold uppercase tracking-widest mb-3', theme.primaryText)}>Batches open now</p>
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            Pick your path. Show up.
          </h2>
        </RevealOrchestrator>

        <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6\">
          {content.courses?.map((c, i) => (
            <motion.div
              key={c.name}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ ...motionPresets.confident, delay: i * 0.08 }}
              whileHover={tier === 'premium' && !reduced ? { rotateY: 6, rotateX: -3, y: -6 } : tier === 'moderate' && !reduced ? { y: -4 } : undefined}
              style={{ transformStyle: 'preserve-3d' }}
              className={cn(
                'relative rounded-3xl p-6 ring-1 flex flex-col',
                theme.surface,
                theme.isDark ? 'ring-white/10' : 'ring-black/5',
              )}
              data-testid={`course-card-${i}`}
            >
              {tier === 'premium' && c.seatsLeft <= 8 && (
                <motion.span
                  className=\"absolute -top-2 -right-2 rounded-full text-white text-xs font-bold px-3 py-1 shadow-lg\"
                  style={{ backgroundColor: theme.primaryHex }}
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                >
                  {c.seatsLeft} seats left
                </motion.span>
              )}
              <p className={cn('text-xs font-semibold uppercase tracking-widest', theme.primaryText)}>{c.duration}</p>
              <h3 className={cn('mt-2 text-lg font-bold', theme.text)}>{c.name}</h3>
              <p className={cn('mt-2 text-sm flex-1', theme.textMuted)}>{c.desc}</p>
              <p className={cn('mt-4 text-xl font-bold', theme.primaryText)}>{c.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
"
Observation: Create successful: /app/components/sections/visual-sections.tsx


Action: file_editor create /app/components/sections/interactive-sections.tsx --file-text "'use client'
import { motion, useMotionValue, useSpring, useInView, useReducedMotion, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { RevealOrchestrator } from '@/components/orchestrator/reveal-orchestrator'
import { motionPresets } from '@/lib/motion-presets'
import type { Tier, NicheTheme, NicheContent } from '@/lib/niche-config'

function useCountUp(target: number, tier: Tier) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [value, setValue] = useState(tier === 'basic' ? target : 0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView || tier === 'basic' || reduced) {
      setValue(target)
      return
    }
    const start = performance.now()
    const dur = 1400
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const isDecimal = target % 1 !== 0
      setValue(isDecimal ? +(target * eased).toFixed(2) : Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, tier, reduced])

  return { ref, value }
}

function StatItem({ tier, theme, stat, i }: { tier: Tier; theme: NicheTheme; stat: NicheContent['stats'][number]; i: number }) {
  const { ref, value } = useCountUp(stat.value, tier)
  return (
    <div className=\"text-center\" data-testid={`stat-card-${i}`}>
      <div className=\"flex items-baseline justify-center gap-0.5\">
        {stat.prefix && <span className={cn('text-3xl md:text-4xl font-bold', theme.text)}>{stat.prefix}</span>}
        <span ref={ref} className={cn('text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums', theme.text)} style={{ fontFamily: theme.fontHeading }}>
          {stat.value % 1 !== 0 ? value.toFixed(2).replace(/\.?0+$/, '') : value.toLocaleString('en-IN')}
        </span>
        {stat.suffix && <span className={cn('text-3xl md:text-4xl font-bold', theme.primaryText)}>{stat.suffix}</span>}
      </div>
      <p className={cn('mt-2 text-sm uppercase tracking-widest', theme.textMuted)}>{stat.label}</p>
    </div>
  )
}

export function StatsSection({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  return (
    <section className={cn('py-20 md:py-28', theme.bg)} data-testid=\"stats-section\">
      <div className=\"mx-auto max-w-5xl px-6 md:px-12\">
        <RevealOrchestrator tier={tier} stagger context=\"grid\" className=\"grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6\">
          {content.stats.map((s, i) => <StatItem key={i} tier={tier} theme={theme} stat={s} i={i} />)}
        </RevealOrchestrator>
      </div>
    </section>
  )
}

/** Testimonial section — grid on Basic, carousel on Moderate, CSS marquee on Premium. */
export function TestimonialsSection({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  const reduced = useReducedMotion()
  const items = content.testimonials

  return (
    <section className={cn('py-20 md:py-28 overflow-hidden', theme.bg)} data-testid=\"testimonials-section\">
      <div className=\"mx-auto max-w-6xl px-6 md:px-12 mb-10\">
        <RevealOrchestrator tier={tier} className=\"max-w-2xl\">
          <p className={cn('text-xs font-semibold uppercase tracking-widest mb-3', theme.primaryText)}>What people say</p>
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            Real reviews. Real people.
          </h2>
        </RevealOrchestrator>
      </div>

      {tier === 'premium' && !reduced ? (
        // CSS marquee, pauses on hover
        <div className=\"relative overflow-hidden\" data-testid=\"testimonials-marquee\">
          <div className=\"flex gap-6 marquee-track\">
            {[...items, ...items, ...items].map((t, i) => (
              <TestimonialCard key={i} t={t} i={i} theme={theme} className=\"w-[320px] shrink-0\" />
            ))}
          </div>
        </div>
      ) : (
        <div className=\"mx-auto max-w-6xl px-6 md:px-12\">
          <RevealOrchestrator tier={tier} stagger context=\"grid\" className=\"grid grid-cols-1 md:grid-cols-3 gap-6\">
            {items.map((t, i) => (
              <TestimonialCard key={i} t={t} i={i} theme={theme} />
            ))}
          </RevealOrchestrator>
        </div>
      )}
    </section>
  )
}

function TestimonialCard({ t, i, theme, className }: { t: NicheContent['testimonials'][number]; i: number; theme: NicheTheme; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-3xl p-6 ring-1',
        theme.surface,
        theme.isDark ? 'ring-white/10' : 'ring-black/5',
        className,
      )}
      data-testid={`testimonial-card-${i}`}
    >
      <div className=\"flex gap-0.5 mb-3\" style={{ color: theme.primaryHex }}>
        {[...Array(5)].map((_, s) => (
          <svg key={s} width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z\"/></svg>
        ))}
      </div>
      <p className={cn('text-base leading-relaxed', theme.text)}>\"{t.text}\"</p>
      <p className={cn('mt-4 text-sm font-semibold', theme.text)}>{t.name}</p>
      {t.role && <p className={cn('text-xs', theme.textMuted)}>{t.role}</p>}
    </div>
  )
}

/** Pricing package cards — Premium: glow pulse on recommended. */
export function PricingSection({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  const reduced = useReducedMotion()
  const pkgs = content.packages ?? []
  if (!pkgs.length) return null

  return (
    <section id=\"pricing\" className={cn('py-20 md:py-28', theme.bg)} data-testid=\"pricing-section\">
      <div className=\"mx-auto max-w-6xl px-6 md:px-12\">
        <RevealOrchestrator tier={tier} className=\"mb-12 max-w-2xl\">
          <p className={cn('text-xs font-semibold uppercase tracking-widest mb-3', theme.primaryText)}>Pricing</p>
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            Honest packages. No haggling.
          </h2>
        </RevealOrchestrator>

        <div className=\"grid grid-cols-1 md:grid-cols-3 gap-6\">
          {pkgs.map((p, i) => (
            <motion.div
              key={p.name}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ ...motionPresets.confident, delay: i * 0.08 }}
              whileHover={tier === 'premium' && !reduced && p.recommended ? { rotateY: 4, rotateX: -2, y: -8 } : tier !== 'basic' && !reduced ? { y: -4 } : undefined}
              className={cn(
                'relative rounded-3xl p-8 ring-1',
                p.recommended ? 'ring-2' : theme.isDark ? 'ring-white/10' : 'ring-black/5',
                theme.surface,
              )}
              style={p.recommended ? { borderColor: theme.primaryHex } : undefined}
              data-testid={`pricing-card-${p.name.toLowerCase()}`}
            >
              {p.recommended && tier === 'premium' && !reduced && (
                <motion.div
                  className=\"absolute inset-0 rounded-3xl pointer-events-none\"
                  style={{ boxShadow: `0 0 40px ${theme.primaryHex}55` }}
                  animate={{ boxShadow: [`0 0 24px ${theme.primaryHex}33`, `0 0 60px ${theme.primaryHex}88`, `0 0 24px ${theme.primaryHex}33`] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                />
              )}
              {p.recommended && (
                <span className=\"absolute -top-3 left-6 rounded-full text-white text-xs font-bold px-3 py-1\" style={{ backgroundColor: theme.primaryHex }}>
                  Most popular
                </span>
              )}
              <h3 className={cn('text-xl font-bold', theme.text)}>{p.name}</h3>
              <p className={cn('mt-3 text-3xl md:text-4xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>{p.price}</p>
              <ul className=\"mt-6 space-y-3\">
                {p.features.map((f) => (
                  <li key={f} className={cn('flex items-start gap-2 text-sm', theme.text)}>
                    <svg className=\"mt-0.5 shrink-0\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke={theme.primaryHex} strokeWidth=\"3\"><path d=\"M20 6L9 17l-5-5\" /></svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className=\"mt-8 w-full rounded-full py-3 font-semibold text-white shadow-md\"
                style={{ backgroundColor: theme.primaryHex }}
                data-testid={`pricing-cta-${p.name.toLowerCase()}`}
              >
                Get started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Booking form — magnetic submit + inline checkmark morph on Premium. */
export function BookingSection({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  const reduced = useReducedMotion()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorField, setErrorField] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) { setErrorField('name'); return }
    if (form.phone.replace(/\D/g, '').length < 10) { setErrorField('phone'); return }
    setErrorField(null)
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 900)
  }

  return (
    <section id=\"booking\" className={cn('py-20 md:py-28', theme.bg)} data-testid=\"booking-section\">
      <div className=\"mx-auto max-w-3xl px-6 md:px-12\">
        <RevealOrchestrator tier={tier} className=\"mb-8 text-center\">
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            {theme.ctaLabel}
          </h2>
          <p className={cn('mt-3', theme.textMuted)}>{content.business} · {content.location}</p>
        </RevealOrchestrator>

        <RevealOrchestrator tier={tier}>
          <form onSubmit={submit} className={cn('rounded-3xl p-6 md:p-8 ring-1 space-y-4', theme.surface, theme.isDark ? 'ring-white/10' : 'ring-black/5')} data-testid=\"appointment-booking-form\">
            <FormField theme={theme} tier={tier} label=\"Your name\" name=\"name\" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} error={errorField === 'name'} />
            <FormField theme={theme} tier={tier} label=\"Phone / WhatsApp\" name=\"phone\" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} error={errorField === 'phone'} />
            <FormField theme={theme} tier={tier} label=\"Anything we should know?\" name=\"message\" value={form.message} onChange={(v) => setForm((f) => ({ ...f, message: v }))} textarea />

            <motion.button
              type=\"submit\"
              disabled={status === 'sending' || status === 'sent'}
              className=\"w-full rounded-full py-4 font-semibold text-white shadow-lg relative overflow-hidden\"
              style={{ backgroundColor: theme.primaryHex }}
              whileHover={tier !== 'basic' && !reduced ? { scale: 1.02 } : undefined}
              whileTap={!reduced ? { scale: 0.97 } : undefined}
              data-testid=\"appointment-booking-submit\"
            >
              {status === 'sent' && tier === 'premium' ? (
                <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={motionPresets.kinetic} className=\"flex items-center justify-center gap-2\">
                  <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"3\"><path d=\"M20 6L9 17l-5-5\" /></svg>
                  Sent — we'll be in touch
                </motion.span>
              ) : status === 'sent' ? 'Sent ✓' : status === 'sending' ? 'Sending...' : theme.ctaLabel}
            </motion.button>
          </form>
        </RevealOrchestrator>
      </div>
    </section>
  )
}

function FormField({ theme, tier, label, name, value, onChange, error, textarea }: { theme: NicheTheme; tier: Tier; label: string; name: string; value: string; onChange: (v: string) => void; error?: boolean; textarea?: boolean }) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0
  const Comp = textarea ? 'textarea' : 'input'
  const reduced = useReducedMotion()
  return (
    <motion.div
      className=\"relative\"
      animate={error && tier !== 'basic' && !reduced ? { x: [0, -4, 4, -3, 3, 0] } : undefined}
      transition={motionPresets.kinetic}
    >
      <label
        className={cn(
          'absolute left-4 transition-all pointer-events-none',
          active ? 'top-1.5 text-[10px] font-semibold uppercase tracking-widest' : 'top-4 text-sm',
          active ? theme.primaryText : theme.textMuted,
        )}
      >
        {label}
      </label>
      <Comp
        name={name}
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={textarea ? 3 : undefined}
        className={cn(
          'w-full rounded-2xl bg-transparent px-4 pb-3 pt-6 outline-none ring-1 transition-colors',
          theme.text,
          error ? 'ring-red-500' : theme.isDark ? 'ring-white/15 focus:ring-white/40' : 'ring-black/15 focus:ring-black/40',
        )}
        data-testid={`booking-field-${name}`}
      />
    </motion.div>
  )
}

/** Final CTA — every niche. Background gradient shift on scroll into view. */
export function FinalCTASection({ tier, theme, onCta }: { tier: Tier; theme: NicheTheme; onCta: () => void }) {
  return (
    <section className={cn('relative py-24 md:py-32 overflow-hidden', theme.bg)} data-testid=\"final-cta-section\">
      {tier !== 'basic' && (
        <div
          className=\"absolute inset-0 opacity-30 pointer-events-none\"
          style={{ background: `radial-gradient(circle at 50% 0%, ${theme.primaryHex}44, transparent 60%)` }}
        />
      )}
      <div className=\"relative mx-auto max-w-3xl px-6 md:px-12 text-center\">
        <RevealOrchestrator tier={tier}>
          <h2 className={cn('text-4xl md:text-6xl font-bold tracking-tight', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            Ready when you are.
          </h2>
          <p className={cn('mt-4 text-base md:text-lg', theme.textMuted)}>
            One quick message and we\'ll take it from there.
          </p>
          <button
            onClick={onCta}
            className=\"mt-8 rounded-full px-8 py-4 text-base font-semibold text-white shadow-2xl\"
            style={{ backgroundColor: theme.primaryHex }}
            data-testid=\"final-cta-button\"
          >
            {theme.ctaLabel} →
          </button>
        </RevealOrchestrator>
      </div>
    </section>
  )
}

/** Footer with contact info. */
export function FooterSection({ theme, content }: { theme: NicheTheme; content: NicheContent }) {
  return (
    <footer className={cn('py-16 border-t', theme.bg, theme.isDark ? 'border-white/10' : 'border-black/10')} data-testid=\"footer-section\">
      <div className=\"mx-auto max-w-6xl px-6 md:px-12 grid md:grid-cols-3 gap-8\">
        <div>
          <p className={cn('font-bold text-lg', theme.text)} style={{ fontFamily: theme.fontHeading }}>{content.business}</p>
          <p className={cn('mt-2 text-sm', theme.textMuted)}>{content.location}</p>
        </div>
        <div>
          <p className={cn('text-xs font-semibold uppercase tracking-widest mb-2', theme.primaryText)}>Contact</p>
          <p className={cn('text-sm', theme.text)}>+91 99999 99999</p>
          <p className={cn('text-sm', theme.text)}>hello@{content.business.toLowerCase().replace(/[^a-z]/g, '')}.in</p>
        </div>
        <div>
          <p className={cn('text-xs font-semibold uppercase tracking-widest mb-2', theme.primaryText)}>Hours</p>
          <p className={cn('text-sm', theme.text)}>Mon-Sat · 9:00 - 20:00</p>
          <p className={cn('text-sm', theme.text)}>Sun · Closed</p>
        </div>
      </div>
      <p className={cn('mt-10 text-center text-xs', theme.textMuted)}>
        Demo built by <a href=\"/\" className={cn('underline', theme.primaryText)}>Apex Forge</a> — this template can be your site.
      </p>
    </footer>
  )
}
"
Observation: Create successful: /app/components/sections/interactive-sections.tsx

Now the slot resolver page, the CSS additions, updated layout with new fonts, and the landing page:
Action: file_editor create /app/app/demos/[slug]/page.tsx --file-text "'use client'
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
"
Observation: Overwrite successful: /app/app/demos/[slug]/page.tsx

we have already created this much now tell me which are the things is pending
deeply analyse and give me indepth 