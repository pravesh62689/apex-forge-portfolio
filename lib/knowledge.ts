export type Faq = {
  q: string
  a: string
  // Keywords that map a user's question to this answer (all lowercase).
  keywords: string[]
}

// Single source of truth for the FAQ section AND the free chat assistant.
export const faqs: Faq[] = [
  {
    q: 'Is 2 days really enough to build a website?',
    a: 'Yes — for the Starter one-page site, once we have your content (photos, text, logo). We build on a proven, high-performance foundation and spend the 2 days on your branding, content and local SEO. Growth sites take 4 days. If anything would push the timeline, we tell you before we start, not after.',
    keywords: ['2 days', 'two days', 'fast', 'quick', 'time', 'timeline', 'how long', 'delivery', 'deadline', 'days'],
  },
  {
    q: 'What do I need to provide?',
    a: 'Your logo (or we can make a simple one), photos of your business, your services with prices, contact details, and your Google listing if you have one. The faster you share content, the faster we deliver — the clock starts when your content arrives.',
    keywords: ['provide', 'need from me', 'require', 'content', 'photos', 'logo', 'material', 'give you', 'what do i'],
  },
  {
    q: 'Are there any recurring or hidden costs?',
    a: 'The package price is one-time. The only recurring costs are your domain (about ₹800–1,500/year, paid to the registrar in your name) and hosting — which is free for most local business sites on modern platforms. Both are set up in your name, so you are never locked to us.',
    keywords: ['cost', 'price', 'hidden', 'recurring', 'monthly', 'fee', 'charge', 'expensive', 'cheap', 'hosting', 'domain', 'money'],
  },
  {
    q: 'Can I add features later, or mix features between packages?',
    a: 'Absolutely. Any feature can be added to any plan at its own price — before launch or months later. Start with Starter today and add a booking system next quarter. Your site is built so it can grow with you.',
    keywords: ['add', 'later', 'mix', 'upgrade', 'feature', 'extend', 'change plan', 'combine'],
  },
  {
    q: 'Will my website show up on Google?',
    a: 'We set up proper on-page SEO, structured data and submit your site to Google, so it gets indexed and is eligible to rank for local searches. We will not promise a specific ranking — no honest developer can. What we promise is a technically correct foundation that gives you a real shot at ranking.',
    keywords: ['google', 'seo', 'rank', 'search', 'found', 'visible', 'discover', 'ranking'],
  },
  {
    q: 'What happens after the site goes live?',
    a: 'You own everything — code, domain and content. Growth includes 1 month of fixes; Premium includes 3 months of priority support. After that you can maintain it yourself, hire anyone, or keep us on at transparent per-change or monthly rates.',
    keywords: ['after', 'launch', 'live', 'support', 'maintenance', 'own', 'ownership', 'update', 'later'],
  },
  {
    q: 'How do payments work?',
    a: '50% to begin and 50% when you approve the finished site — before it goes live. You see the complete working website on a preview link before paying the balance. UPI or bank transfer, with a proper invoice.',
    keywords: ['pay', 'payment', 'upi', 'advance', 'invoice', 'installment', 'deposit', 'billing'],
  },
  {
    q: 'Which plan is right for my business?',
    a: 'Starter suits a first web presence (one page, live in 2 days). Growth is the most popular — a full multi-section site with forms and galleries in 4 days. Premium is for app-grade builds with reservations, payments and an admin dashboard. Tell me your business type on WhatsApp and I will recommend one.',
    keywords: ['which plan', 'recommend', 'suit', 'best plan', 'starter', 'growth', 'premium', 'package', 'choose', 'plan'],
  },
  {
    q: 'Who actually builds the website?',
    a: 'A software engineer — not an agency. Pravesh designs, codes and launches every site personally, from Noida & NCR. That is exactly why the work is agency-level but the price is not.',
    keywords: ['who', 'agency', 'developer', 'engineer', 'build it', 'team', 'pravesh', 'freelancer'],
  },
]

// Simple offline keyword matcher — no API, works anywhere (Cloudflare-friendly).
export function findAnswer(input: string): Faq | null {
  const text = input.toLowerCase().trim()
  if (!text) return null
  let best: { faq: Faq; score: number } | null = null
  for (const faq of faqs) {
    let score = 0
    for (const kw of faq.keywords) {
      if (text.includes(kw)) score += kw.includes(' ') ? 2 : 1
    }
    if (score > 0 && (!best || score > best.score)) best = { faq, score }
  }
  return best?.faq ?? null
}
