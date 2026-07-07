import { Reveal } from '@/components/orchestrator/reveal-orchestrator'

const steps = [
  {
    step: '01',
    title: 'Tell us about your business',
    desc: 'A short WhatsApp chat or call. We learn what you do, who your customers are, and what you want the website to achieve.',
    time: 'Day 0',
  },
  {
    step: '02',
    title: 'We design and build',
    desc: 'You send photos, text and your logo. We build a fast, mobile-first site and share a live preview link so you see progress in real time.',
    time: 'Day 1–2 (Basic) or 1–3 (Growth)',
  },
  {
    step: '03',
    title: 'You review, we refine',
    desc: 'Request changes directly on the preview. We refine until you are happy — revisions within scope are included, not billed.',
    time: 'Same day turnaround',
  },
  {
    step: '04',
    title: 'Go live and grow',
    desc: 'We connect your domain, set up SSL and analytics, and hand over everything. Your site is live, fast, and fully yours.',
    time: 'Day 2 (Basic) / Day 4 (Growth)',
  },
]

export function Process() {
  return (
    <section className="py-20 lg:py-28 border-t border-border bg-grid">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">The process</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance max-w-3xl">
            From first message to live website — in days
          </h2>
        </Reveal>

        <ol className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 130} variant="left" className="h-full">
              <li className="hover-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 hover:border-primary/30">
                <span
                  className="pointer-events-none absolute -right-4 -top-6 font-display text-8xl font-bold text-primary/5 transition-all duration-500 group-hover:text-primary/10 group-hover:scale-110"
                  aria-hidden="true"
                >
                  {s.step}
                </span>
                <span className="font-display text-4xl font-bold text-primary/30 transition-colors duration-300 group-hover:text-primary/60">
                  {s.step}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-success">
                  {s.time}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
