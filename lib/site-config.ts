// Central config — swap the placeholder values here when ready.
export const siteConfig = {
  brand: 'Apex Forge',
  developer: 'Pravesh',
  tagline: 'Websites that win local customers',
  // Placeholder WhatsApp number — replace with the real one (digits only for the wa.me link)
  whatsappNumber: '916268935890',
  // Email is the only public contact detail. Calls happen on WhatsApp.
  email: 'apexforgetechnologies@gmail.com',
  location: 'Noida & NCR, India',
}

export const emailHref = `mailto:${siteConfig.email}`

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const defaultWhatsappMessage =
  "Hi Apex Forge! I'm interested in getting a website for my business. Can we talk?"

export type Tier = {
  name: string
  badge: string
  price: string
  priceNote: string
  delivery: string
  description: string
  // Everything included in the package
  features: { label: string; included: boolean }[]
  // Highlighted "no extra cost" perks for this category
  freeFeatures: string[]
  highlighted?: boolean
  cta: string
  whatsappMessage: string
}

export const tiers: Tier[] = [
  {
    name: 'Starter',
    badge: 'Get online fast',
    price: '₹7,999',
    priceNote: 'one-time · from',
    delivery: 'Live in 2 days',
    description:
      'A polished, single-page site that gets your business found on Google and reachable on WhatsApp — everything a first web presence needs.',
    features: [
      { label: 'High-speed single-page website', included: true },
      { label: 'Mobile-first responsive design', included: true },
      { label: 'Google Maps + live reviews embed', included: true },
      { label: 'One-tap WhatsApp & enquiry buttons', included: true },
      { label: 'On-page SEO so locals can find you', included: true },
      { label: 'Contact & opening-hours section', included: true },
      { label: 'Multi-section pages & photo galleries', included: false },
      { label: 'Booking / reservation systems', included: false },
    ],
    freeFeatures: [
      'Free SSL certificate + secure hosting setup',
      'Free domain guidance (registered in your name)',
      'Free WhatsApp button integration',
    ],
    cta: 'Start with Starter',
    whatsappMessage:
      "Hi Apex Forge! I'd like a quote for the Starter website (2-day delivery). Let's discuss my business.",
  },
  {
    name: 'Standard',
    badge: 'Most popular',
    price: '₹12,999',
    priceNote: 'one-time · from',
    delivery: 'Live in 4 days',
    description:
      'A complete multi-section site engineered to turn visitors into enquiries and walk-ins — the sweet spot for most local businesses.',
    features: [
      { label: 'Everything in Starter', included: true },
      { label: '5–7 rich sections or pages', included: true },
      { label: 'Photo galleries & full service menus', included: true },
      { label: 'Enquiry / booking form with instant alerts', included: true },
      { label: 'Local SEO + structured data (schema)', included: true },
      { label: 'Smooth scroll animations & premium polish', included: true },
      { label: 'Customer review wall from Google', included: true },
      { label: 'Google Business Profile setup guidance', included: true },
    ],
    freeFeatures: [
      'Free 1 month of edits & fixes after launch',
      'Free performance tuning (loads under 2s)',
      'Free analytics dashboard setup',
    ],
    highlighted: true,
    cta: 'Choose Standard',
    whatsappMessage:
      "Hi Apex Forge! I'm interested in the Standard website (4-day delivery). Can we discuss my requirements and a quote?",
  },
  {
    name: 'Premium',
    badge: 'Fully custom',
    price: '₹19,999+',
    priceNote: 'one-time · from',
    delivery: 'Timeline scoped per project',
    description:
      'Multi-page, app-grade builds with real systems — online reservations, payments and an admin dashboard. Scoped feature by feature.',
    features: [
      { label: 'Everything in Standard', included: true },
      { label: 'Unlimited multi-page architecture', included: true },
      { label: 'Live booking / reservation system', included: true },
      { label: 'Online payments (UPI, cards)', included: true },
      { label: 'Admin dashboard & lead management', included: true },
      { label: 'Advanced SEO, analytics & automations', included: true },
      { label: '3D & interactive experiences', included: true },
      { label: 'Multi-language (Hindi + English)', included: true },
    ],
    freeFeatures: [
      'Free 3 months of priority support',
      'Free reservation system setup',
      'Free admin dashboard training call',
    ],
    cta: 'Scope my project',
    whatsappMessage:
      "Hi Apex Forge! I need a Premium custom website. Here's what my business does and what I need: ",
  },
]

export const addons = [
  { name: 'Online booking system', desc: 'Let customers book slots 24/7 without calling' },
  { name: 'UPI / card payments', desc: 'Collect advances and payments on the site' },
  { name: 'WhatsApp catalogue integration', desc: 'Products or services synced to WhatsApp' },
  { name: 'Photo & video gallery', desc: 'Fast-loading, optimised media showcase' },
  { name: 'Customer review wall', desc: 'Pull your real Google reviews onto the site' },
  { name: 'Multi-language pages', desc: 'Hindi + English (or any language pair)' },
  { name: 'Blog / updates section', desc: 'Post offers and news that help SEO' },
  { name: 'Admin dashboard', desc: 'See enquiries, bookings and leads in one place' },
]
