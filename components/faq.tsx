import { Reveal } from '@/components/reveal'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Is 2 days really enough to build a website?',
    a: 'Yes — for the Basic one-page site, once we have your content (photos, text, logo). We use a proven, high-performance foundation and focus the 2 days on your branding, content and local SEO rather than reinventing the wheel. Growth sites take 4 days for the same reason. If anything would push the timeline, we tell you before starting, not after.',
  },
  {
    q: 'What do I need to provide?',
    a: 'Your logo (or we can create a simple one), photos of your business, your services with prices, contact details, and your Google Business listing if you have one. The faster you share content, the faster we deliver — the clock starts when content arrives.',
  },
  {
    q: 'Are there any recurring or hidden costs?',
    a: 'The package price is one-time. The only recurring costs are your domain name (typically ₹800–1,500/year, paid directly to the registrar in your name) and hosting — which for most local business sites is free on modern platforms. We set both up in your name so you are never dependent on us.',
  },
  {
    q: 'Can I add features later, or mix features between packages?',
    a: 'Absolutely. Any feature can be added to any package at its individual price — before launch or months later. Start with Basic today and add a booking system next quarter. Your site is built so it can grow.',
  },
  {
    q: 'Will my website show up on Google?',
    a: 'We set up proper on-page SEO, structured data, and submit your site to Google — that gets you indexed and eligible to rank for local searches. What we will not do is promise a specific ranking or "#1 on Google" — no honest agency can guarantee that. What we can promise is a technically correct foundation that gives you a genuine shot at it.',
  },
  {
    q: 'What happens after the site goes live?',
    a: 'You own everything — code, domain, content. Growth includes 1 month of fixes; Premium includes 3 months of priority support. After that, you can maintain it yourself, hire anyone, or keep us on for updates at transparent per-change or monthly rates.',
  },
  {
    q: 'How do payments work?',
    a: '50% to begin, 50% when you approve the finished site — before it goes live. You see the complete working website on a preview link before paying the balance. UPI or bank transfer, with a proper invoice.',
  },
]

export function Faq() {
  return (
    <section id="faq" className="py-20 lg:py-28 border-t border-border">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Straight answers
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            Questions every smart business owner asks
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 60} variant={i % 2 === 0 ? 'left' : 'right'}>
              <details className="group rounded-2xl border border-border bg-card transition-all duration-300 open:border-primary/30 open:shadow-[0_0_32px_-16px_var(--primary)] hover:border-primary/20">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-base font-bold list-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
