'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Phone, MessageCircle, Star, CalendarCheck, Sparkles } from 'lucide-react'
import type { Demo } from '@/lib/demos'
import { whatsappLink } from '@/lib/site-config'
import { Reveal } from '@/components/reveal'

const TIERS = ['Basic', 'Standard', 'Premium'] as const
type TierName = (typeof TIERS)[number]

export function DemoExperience({ demo }: { demo: Demo }) {
  const [tier, setTier] = useState<TierName>('Basic')
  const level = TIERS.indexOf(tier) // 0, 1, 2

  const style = {
    '--demo-accent': demo.accent,
    '--demo-soft': demo.accentSoft,
  } as React.CSSProperties

  return (
    <div style={style} className="min-h-screen bg-background text-foreground">
      {/* Demo banner */}
      <div className="border-b border-border bg-[var(--demo-soft)] px-4 py-2.5 text-center text-xs font-semibold text-[var(--demo-accent)]">
        Sample concept demo — switch tiers below to see how the website scales with each plan.
      </div>

      {/* Sticky tier switcher */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <Link
              href="/#demos"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
              aria-label="Back to Apex Forge"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="font-display text-base font-bold leading-tight">{demo.industry} demo</h1>
              <p className="text-xs text-muted-foreground">{demo.business} — concept build</p>
            </div>
          </div>
          <div className="flex rounded-xl border border-border bg-card p-1" role="tablist" aria-label="Website tier">
            {TIERS.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tier === t}
                onClick={() => setTier(t)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all duration-300 ${
                  tier === t
                    ? 'bg-[var(--demo-accent)] text-white shadow-lg scale-105'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero — all tiers */}
      <section className="relative overflow-hidden py-24">
        <img
          src={demo.hero || '/placeholder.svg'}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <span className="inline-block rounded-full bg-[var(--demo-soft)] px-4 py-1.5 text-xs font-bold text-[var(--demo-accent)]">
            {demo.industry}
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
            {demo.business}
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">{demo.tagline}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={whatsappLink(`Hi ${demo.business}! I found you online and would like to enquire.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--demo-accent)] px-7 py-3.5 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Us
            </a>
            <a
              href="tel:+919999999999"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold transition-colors hover:bg-secondary"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Offerings — all tiers */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <h3 className="font-display text-2xl font-bold">
              {demo.slug === 'restaurant' ? 'Our Menu' : demo.slug === 'coaching' ? 'Our Courses' : 'Our Services'}
            </h3>
          </Reveal>
          <div className="mt-6 space-y-1">
            {demo.offerings.map((o, i) => (
              <Reveal key={o.name} delay={i * 60}>
                <div className="flex items-start justify-between gap-4 border-b border-border py-4 transition-colors hover:bg-secondary/40 rounded-lg px-2">
                  <div>
                    <span className="block text-sm font-semibold">{o.name}</span>
                    <span className="text-xs text-muted-foreground">{o.desc}</span>
                  </div>
                  <span className="whitespace-nowrap text-sm font-bold text-[var(--demo-accent)]">{o.price}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — Standard+ */}
      {level >= 1 && (
        <section className="border-t border-border bg-card/50 py-16">
          <div className="mx-auto max-w-5xl px-4">
            <Reveal>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-2xl font-bold">Gallery</h3>
                <span className="rounded-full bg-[var(--demo-soft)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--demo-accent)]">
                  Standard+
                </span>
              </div>
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {demo.gallery.map((g, i) => (
                <Reveal key={g.src} delay={i * 80} variant="zoom">
                  <div className="group overflow-hidden rounded-2xl border border-border">
                    <img
                      src={g.src || '/placeholder.svg'}
                      alt={g.alt}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews — Standard+ */}
      {level >= 1 && (
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-4xl px-4">
            <Reveal>
              <h3 className="font-display text-2xl font-bold">What customers say</h3>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {demo.reviews.map((r, i) => (
                <Reveal key={r.name} delay={i * 100} variant={i % 2 === 0 ? 'left' : 'right'}>
                  <figure className="hover-lift h-full rounded-2xl border border-border bg-card p-6">
                    <div className="flex gap-1" aria-label="5 star rating">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-[var(--demo-accent)] text-[var(--demo-accent)]" />
                      ))}
                    </div>
                    <blockquote className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      &ldquo;{r.text}&rdquo;
                    </blockquote>
                    <figcaption className="mt-3 text-xs font-bold">{r.name}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium features — Premium only */}
      {level >= 2 && (
        <section className="border-t border-border bg-[var(--demo-soft)] py-16">
          <div className="mx-auto max-w-4xl px-4">
            <Reveal variant="blur">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[var(--demo-accent)]" aria-hidden="true" />
                <h3 className="font-display text-2xl font-bold">Premium capabilities</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Custom systems built into the site — fully functional, not mockups.
              </p>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {demo.premiumFeatures.map((f, i) => (
                <Reveal key={f} delay={i * 100} variant="zoom">
                  <div className="hover-lift flex h-full flex-col items-start gap-3 rounded-2xl border border-border bg-card p-6">
                    <CalendarCheck className="h-6 w-6 text-[var(--demo-accent)]" aria-hidden="true" />
                    <span className="text-sm font-semibold leading-snug">{f}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Conversion footer */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <Reveal variant="blur">
            <h3 className="font-display text-2xl font-bold text-balance">
              Want a website like this for your {demo.industry.toLowerCase()}?
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              This entire demo was built by one engineer. Yours can be live within days.
            </p>
            <a
              href={whatsappLink(
                `Hi Apex Forge! I saw the ${demo.industry} demo (${tier} tier) and want one for my business.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_var(--primary)]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Get my website
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
