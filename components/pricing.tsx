import { Check, X, Clock, Gift } from 'lucide-react'
import { Reveal } from '@/components/orchestrator/reveal-orchestrator'
import { tiers, whatsappLink } from '@/lib/site-config'

export function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 border-t border-border bg-grid">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Three plans
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            More features. Fair quotes. Real deadlines.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Every business is different, so every quote is personal. Pick the plan that fits,
            message me on WhatsApp, and get an exact price for your exact needs — no hidden costs,
            no agency markup.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier, i) => (
            <Reveal
              key={tier.name}
              delay={i * 120}
              variant={i === 0 ? 'left' : i === 2 ? 'right' : 'zoom'}
              className="h-full"
            >
              <div
                className={`hover-lift relative flex h-full flex-col rounded-3xl p-8 ${
                  tier.highlighted
                    ? 'border-beam glow-pulse bg-primary/5'
                    : 'border border-border bg-card'
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                    Most Popular
                  </span>
                )}

                <div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      tier.highlighted
                        ? 'bg-primary/15 text-primary border border-primary/30'
                        : 'bg-secondary text-muted-foreground border border-border'
                    }`}
                  >
                    {tier.badge}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold">{tier.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground min-h-[3.75rem]">
                    {tier.description}
                  </p>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold tracking-tight text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {tier.priceNote}
                  </span>
                </div>

                <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-success">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {tier.delivery}
                </p>

                <ul className="mt-6 flex flex-col gap-3.5 border-t border-border pt-6">
                  {tier.features.map((f) => (
                    <li key={f.label} className="flex items-start gap-3 text-sm">
                      {f.included ? (
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                      ) : (
                        <X
                          className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40"
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={
                          f.included ? 'text-foreground' : 'text-muted-foreground/50 line-through'
                        }
                      >
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl border border-success/30 bg-success/5 p-4">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-success">
                    <Gift className="h-4 w-4" aria-hidden="true" />
                    Included free with {tier.name}
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {tier.freeFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-8">
                  <a
                    href={whatsappLink(tier.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-shine block w-full rounded-full py-3.5 text-center text-sm font-bold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${
                      tier.highlighted
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_32px_-8px_var(--primary)]'
                        : 'border border-border bg-secondary text-foreground hover:bg-secondary/70 hover:border-primary/40'
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 text-center text-sm text-muted-foreground text-pretty">
            Delivery timelines start once we receive your content (photos, text, logo). Premium
            timelines depend on the features you choose — we agree on the date in writing before
            starting.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
