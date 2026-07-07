'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  MessageCircle,
  Star,
  CalendarCheck,
  Sparkles,
  Check,
  CreditCard,
  LayoutDashboard,
  Languages,
  Users,
  TrendingUp,
  Clock,
} from 'lucide-react'
import type { Demo } from '@/lib/demos'
import { whatsappLink } from '@/lib/site-config'
import { Reveal } from '@/components/orchestrator/reveal-orchestrator'
import { SkeletonImage as ImageWithSkeleton } from '@/components/orchestrator/skeleton-image'

const TIERS = ['Basic', 'Standard', 'Premium'] as const
type TierName = (typeof TIERS)[number]

// Capabilities unlocked at each tier — cumulative.
const CAPABILITIES: { tier: number; label: string }[] = [
  { tier: 0, label: 'Mobile-first responsive site' },
  { tier: 0, label: 'Google Maps & directions' },
  { tier: 0, label: 'One-tap WhatsApp enquiry' },
  { tier: 0, label: 'Business hours & contact' },
  { tier: 1, label: 'Photo gallery showcase' },
  { tier: 1, label: 'Full service / menu list' },
  { tier: 1, label: 'Customer review wall' },
  { tier: 1, label: 'Enquiry form with instant alerts' },
  { tier: 2, label: 'Live online reservations' },
  { tier: 2, label: 'Online payments (UPI / cards)' },
  { tier: 2, label: 'Admin dashboard & leads' },
  { tier: 2, label: 'Multi-language (Hindi + English)' },
]

export function DemoExperience({ demo }: { demo: Demo }) {
  const [tier, setTier] = useState<TierName>('Basic')
  const level = TIERS.indexOf(tier) // 0, 1, 2

  const [resDate, setResDate] = useState('Fri')
  const [resTime, setResTime] = useState('7:30 PM')
  const [resGuests, setResGuests] = useState(2)

  const style = {
    '--demo-accent': demo.accent,
    '--demo-soft': demo.accentSoft,
  } as React.CSSProperties

  return (
    <div style={style} className="min-h-screen bg-background text-foreground">
      {/* Demo banner */}
      <div className="border-b border-border bg-[var(--demo-soft)] px-4 py-2.5 text-center text-xs font-semibold text-[var(--demo-accent)]">
        Sample concept demo — switch tiers below to watch the website grow with each plan.
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
        <ImageWithSkeleton
          src={demo.hero}
          alt=""
          loading="eager"
          className="absolute inset-0 h-full w-full"
          imgClassName="h-full w-full object-cover opacity-25"
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

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1.5">
              <Star className="h-3.5 w-3.5 fill-[var(--demo-accent)] text-[var(--demo-accent)]" />
              4.9 · 200+ reviews
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1.5">
              <Clock className="h-3.5 w-3.5 text-[var(--demo-accent)]" />
              Open today
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1.5">
              <Users className="h-3.5 w-3.5 text-[var(--demo-accent)]" />
              Trusted locally
            </span>
          </div>

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
            {level >= 2 && (
              <a
                href="#reserve"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold transition-colors hover:bg-secondary"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Book / Reserve
              </a>
            )}
          </div>
        </div>
      </section>

      {/* What you get at this tier — dynamic capability checklist */}
      <section className="border-t border-border bg-card/40 py-14">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--demo-accent)]">
                {tier} plan
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold">
                What this website can do
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {CAPABILITIES.filter((c) => c.tier <= level).length} of {CAPABILITIES.length} features active
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => {
              const active = c.tier <= level
              return (
                <div
                  key={c.label}
                  className={`flex items-center gap-3 rounded-xl border p-3.5 text-sm transition-all duration-300 ${
                    active
                      ? 'border-[var(--demo-accent)]/40 bg-[var(--demo-soft)] text-foreground'
                      : 'border-border bg-card text-muted-foreground/50'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      active ? 'bg-[var(--demo-accent)] text-white' : 'bg-secondary'
                    }`}
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  <span className={active ? 'font-medium' : 'line-through'}>{c.label}</span>
                </div>
              )
            })}
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
                <div className="flex items-start justify-between gap-4 rounded-lg border-b border-border px-2 py-4 transition-colors hover:bg-secondary/40">
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
                  <ImageWithSkeleton
                    src={g.src}
                    alt={g.alt}
                    className="group aspect-square w-full rounded-2xl border border-border"
                    imgClassName="aspect-square w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
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

      {/* Premium systems — Premium only */}
      {level >= 2 && (
        <>
          {/* Interactive reservation widget */}
          <section id="reserve" className="border-t border-border bg-[var(--demo-soft)] py-16">
            <div className="mx-auto max-w-4xl px-4">
              <Reveal variant="blur">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[var(--demo-accent)]" aria-hidden="true" />
                  <h3 className="font-display text-2xl font-bold">Live reservations</h3>
                  <span className="rounded-full bg-[var(--demo-accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Premium
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  A real booking system built into the site — customers reserve 24/7, you get instant alerts.
                </p>
              </Reveal>

              <div className="mt-6 rounded-3xl border border-border bg-card p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pick a day</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Thu', 'Fri', 'Sat', 'Sun', 'Mon'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setResDate(d)}
                      className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
                        resDate === d
                          ? 'border-transparent bg-[var(--demo-accent)] text-white'
                          : 'border-border hover:bg-secondary'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Time</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['6:00 PM', '7:30 PM', '9:00 PM'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setResTime(t)}
                      className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
                        resTime === t
                          ? 'border-transparent bg-[var(--demo-accent)] text-white'
                          : 'border-border hover:bg-secondary'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Guests</p>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => setResGuests((g) => Math.max(1, g - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-lg font-bold hover:bg-secondary"
                    aria-label="Fewer guests"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-lg font-bold tabular-nums">{resGuests}</span>
                  <button
                    onClick={() => setResGuests((g) => Math.min(12, g + 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-lg font-bold hover:bg-secondary"
                    aria-label="More guests"
                  >
                    +
                  </button>
                </div>

                <div className="mt-7 flex flex-col items-center justify-between gap-3 rounded-2xl bg-[var(--demo-soft)] p-4 sm:flex-row">
                  <p className="text-sm">
                    <span className="font-bold text-[var(--demo-accent)]">
                      {resDate}, {resTime}
                    </span>{' '}
                    · {resGuests} {resGuests === 1 ? 'guest' : 'guests'}
                  </p>
                  <button className="btn-shine w-full rounded-xl bg-[var(--demo-accent)] px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03] sm:w-auto">
                    Confirm reservation
                  </button>
                </div>
                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  Demo only — on a real Premium site this books instantly and notifies the owner.
                </p>
              </div>
            </div>
          </section>

          {/* Owner dashboard preview */}
          <section className="border-t border-border py-16">
            <div className="mx-auto max-w-5xl px-4">
              <Reveal>
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5 text-[var(--demo-accent)]" aria-hidden="true" />
                  <h3 className="font-display text-2xl font-bold">Owner dashboard</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Every booking, enquiry and payment in one private screen — only you see this.
                </p>
              </Reveal>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: CalendarCheck, label: "Today's bookings", value: '18' },
                  { icon: MessageCircle, label: 'New enquiries', value: '7' },
                  { icon: TrendingUp, label: 'Revenue this week', value: '₹84,200' },
                ].map((s) => (
                  <Reveal key={s.label} variant="zoom">
                    <div className="hover-lift rounded-2xl border border-border bg-card p-6">
                      <s.icon className="h-5 w-5 text-[var(--demo-accent)]" aria-hidden="true" />
                      <p className="mt-4 font-display text-3xl font-bold tabular-nums">{s.value}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                  <CreditCard className="h-6 w-6 shrink-0 text-[var(--demo-accent)]" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold">Online payments</p>
                    <p className="text-xs text-muted-foreground">Accept UPI & cards, collect advances automatically.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                  <Languages className="h-6 w-6 shrink-0 text-[var(--demo-accent)]" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold">Multi-language</p>
                    <p className="text-xs text-muted-foreground">Serve customers in Hindi and English on one site.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Premium capability tags */}
          <section className="border-t border-border bg-[var(--demo-soft)] py-16">
            <div className="mx-auto max-w-4xl px-4">
              <Reveal>
                <h3 className="font-display text-2xl font-bold">Custom capabilities for {demo.industry.toLowerCase()}</h3>
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
        </>
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

      {/* Sticky bottom CTA bar */}
      <div className="sticky bottom-0 z-40 border-t border-border bg-background/90 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <p className="hidden text-sm font-semibold sm:block">
            Viewing the <span className="text-[var(--demo-accent)]">{tier}</span> version of {demo.business}
          </p>
          <a
            href={whatsappLink(`Hi Apex Forge! I like the ${demo.industry} demo (${tier} tier). Can we build mine?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine ml-auto inline-flex items-center gap-2 rounded-full bg-[var(--demo-accent)] px-6 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.03]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Build mine
          </a>
        </div>
      </div>
    </div>
  )
}
