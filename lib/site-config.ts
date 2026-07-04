// Central config — swap the placeholder contact details here when ready.
// The phone number is NEVER shown on the site. It only powers the WhatsApp
// redirect link, so visitors reach you via WhatsApp without seeing the number.
export const siteConfig = {
  brand: 'Apex Forge',
  developer: 'Pravesh',
  tagline: 'Websites that win local customers',
  // Digits only, with country code — used ONLY inside wa.me links (kept private)
  whatsappNumber: '910000000000',
  // Public email — safe to display everywhere
  email: 'hello@apexforge.in',
  emailHref: 'mailto:hello@apexforge.in',
  location: 'Noida & NCR, India',
}

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const defaultWhatsappMessage =
  "Hi Apex Forge! I'm interested in getting a website for my business. Can we talk?"

export type Tier = {
  name: string
  badge: string
  delivery: string
  description: string
  features: { label: string; included: boolean }[]
  highlighted?: boolean
  cta: string
  whatsappMessage: string
}

export const tiers: Tier[] = [
  {
    name: 'Basic',
    badge: 'Clean & Fast',
    delivery: 'Live in 2 days',
    description:
      'A sharp one-page site that gets your business found on Google and reachable on WhatsApp.',
    features: [
      { label: '1-page high-speed website', included: true },
      { label: 'Mobile-first responsive design', included: true },
      { label: 'Google Maps + reviews embed', included: true },
      { label: 'One-tap WhatsApp & call buttons', included: true },
      { label: 'Basic on-page SEO setup', included: true },
      { label: 'Free SSL & hosting setup', included: true },
      { label: 'Multi-section pages & galleries', included: false },
      { label: 'Booking / enquiry forms', included: false },
    ],
    cta: 'Get Basic Quote',
    whatsappMessage:
      "Hi Apex Forge! I'd like a quote for the Basic website (2-day delivery). Let's discuss my business.",
  },
  {
    name: 'Growth',
    badge: 'Most Popular',
    delivery: 'Live in 4 days',
    description:
      'A complete multi-section site built to convert visitors into enquiries and walk-ins.',
    features: [
      { label: 'Everything in Basic', included: true },
      { label: '4–6 sections or pages', included: true },
      { label: 'Photo galleries & service menus', included: true },
      { label: 'Enquiry / booking form with alerts', included: true },
      { label: 'Local SEO + structured data (schema)', included: true },
      { label: 'Scroll animations & premium polish', included: true },
      { label: 'Google Business Profile guidance', included: true },
      { label: 'Custom web apps & integrations', included: false },
    ],
    highlighted: true,
    cta: 'Get Growth Quote',
    whatsappMessage:
      "Hi Apex Forge! I'm interested in the Growth website (4-day delivery). Can we discuss my requirements and a quote?",
  },
  {
    name: 'Premium',
    badge: 'Built to Spec',
    delivery: 'Timeline scoped per project',
    description:
      'Fully custom builds — booking systems, dashboards, payments, 3D experiences. Scoped feature by feature.',
    features: [
      { label: 'Everything in Growth', included: true },
      { label: 'Online booking / reservation systems', included: true },
      { label: 'Payment collection (UPI, cards)', included: true },
      { label: 'Admin dashboards & lead management', included: true },
      { label: 'Advanced SEO & analytics setup', included: true },
      { label: '3D & interactive experiences', included: true },
      { label: 'Multi-language support', included: true },
      { label: '3 months priority support included', included: true },
    ],
    cta: 'Scope My Project',
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
