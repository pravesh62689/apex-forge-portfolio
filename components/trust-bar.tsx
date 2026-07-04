import { Reveal, CountUp } from '@/components/reveal'

const facts = [
  {
    stat: <CountUp end={2} suffix=" days" className="tabular-nums" />,
    label: 'to launch a Basic site — a real commitment, not a marketing line.',
  },
  {
    stat: <CountUp end={4} suffix=" days" className="tabular-nums" />,
    label: 'for a complete Growth site with forms, galleries and local SEO.',
  },
  {
    stat: <CountUp end={100} suffix="%" className="tabular-nums" />,
    label: 'yours — you own the code, the domain, and the content. No lock-in.',
  },
  {
    stat: <CountUp end={0} className="tabular-nums" />,
    label: 'hidden charges. Every feature and its price is agreed before we start.',
  },
]

const marqueeItems = [
  'Mobile-first design',
  'Google Maps ready',
  'WhatsApp enquiry buttons',
  'Loads in under 2 seconds',
  'Local SEO built in',
  'You own everything',
  'Honest fixed pricing',
  'Free minor fixes after launch',
]

export function TrustBar() {
  return (
    <section aria-label="Our commitments" className="border-y border-border">
      {/* Scrolling marquee strip */}
      <div className="overflow-hidden border-b border-border bg-card/50 py-3" aria-hidden="true">
        <div className="marquee-track flex w-max gap-8">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-8 whitespace-nowrap text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f, i) => (
          <Reveal
            key={i}
            delay={i * 100}
            variant="zoom"
            className="group border-b sm:border-b-0 last:border-b-0 sm:border-r border-border p-8 lg:last:border-r-0 transition-colors duration-300 hover:bg-card/60"
          >
            <p className="font-display text-3xl font-bold text-primary transition-transform duration-300 group-hover:scale-105 origin-left">
              {f.stat}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
