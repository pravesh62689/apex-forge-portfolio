'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  MessageCircle,
  Star,
  CalendarCheck,
  Sparkles,
  Clock,
  MapPin,
  CheckCircle2,
  BadgePercent,
  Users,
  ChevronDown,
} from 'lucide-react'
import type { Demo } from '@/lib/demos'
import { whatsappLink } from '@/lib/site-config'
import { Reveal } from '@/components/reveal'
import { DemoScene } from '@/components/demo-scenes'

const TIERS = ['Basic', 'Growth', 'Premium'] as const
type TierName = (typeof TIERS)[number]

const TIER_BLURB: Record<TierName, string> = {
  Basic: '6 essential sections — everything a customer needs to find, trust and contact you.',
  Growth: '10 sections — gallery, reviews, team, stats and visit steps that convert visitors.',
  Premium: 'Full multi-page site — live booking, loyalty, FAQ, portals and custom systems.',
}

export function DemoExperience({ demo }: { demo: Demo }) {
  const [tier, setTier] = useState<TierName>('Basic')
  const level = TIERS.indexOf(tier) // 0, 1, 2

  const style = {
    '--demo-accent': demo.accent,
    '--demo-soft': demo.accentSoft,
  } as React.CSSProperties

  const sectionCount = level === 0 ? '6 sections' : level === 1 ? '10 sections' : '14 sections'

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
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
              aria-label="Back to Apex Forge"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="font-display text-base font-bold leading-tight">{demo.industry} demo</h1>
              <p className="text-xs text-muted-foreground">
                {demo.business} — {sectionCount} in this tier
              </p>
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
        <p className="border-t border-border/60 px-4 py-1.5 text-center text-[11px] text-muted-foreground">
          {TIER_BLURB[tier]}
        </p>
      </div>

      {/* Premium: in-site page navigation (multi-page feel) */}
      {level >= 2 && (
        <nav
          aria-label="Demo site pages"
          className="sticky top-[105px] z-30 border-b border-border bg-background/95 backdrop-blur-md sm:top-[97px]"
        >
          <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2 text-xs font-semibold">
            {[
              ['#d-home', 'Home'],
              ['#d-about', 'About'],
              ['#d-services', 'Services'],
              ['#d-gallery', 'Gallery'],
              ['#d-team', 'Team'],
              ['#d-booking', 'Book Online'],
              ['#d-faq', 'FAQ'],
              ['#d-contact', 'Contact'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="whitespace-nowrap rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-[var(--demo-soft)] hover:text-[var(--demo-accent)]"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Premium: offer announcement bar */}
      {level >= 2 && (
        <div className="flex items-center justify-center gap-2 bg-[var(--demo-accent)] px-4 py-2 text-center text-xs font-bold text-white">
          <BadgePercent className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {demo.offer}
        </div>
      )}

      {/* 1. Hero — all tiers, with animated category scene */}
      <section id="d-home" className="relative overflow-hidden py-16 sm:py-20">
        <img
          src={demo.hero || '/placeholder.svg'}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <span className="inline-block rounded-full bg-[var(--demo-soft)] px-4 py-1.5 text-xs font-bold text-[var(--demo-accent)]">
              {demo.industry}
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              {demo.business}
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">{demo.tagline}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
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
                href={level >= 2 ? '#d-booking' : '#d-contact'}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold transition-colors hover:bg-secondary"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                {level >= 2 ? 'Book Online' : 'Get Directions'}
              </a>
            </div>
          </div>
          <Reveal variant="zoom">
            <div className="rounded-3xl border border-border bg-[var(--demo-soft)] p-4">
              <div className="aspect-[4/3] w-full">
                <DemoScene slug={demo.slug} accent={demo.accent} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. About + highlights — all tiers */}
      <section id="d-about" className="border-t border-border py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid items-start gap-10 md:grid-cols-2">
            <Reveal>
              <div>
                <h3 className="font-display text-2xl font-bold">About {demo.business}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">{demo.about}</p>
              </div>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {demo.highlights.map((h, i) => (
                <Reveal key={h.label} delay={i * 70} variant="zoom">
                  <div className="hover-lift h-full rounded-2xl border border-border bg-card p-4">
                    <CheckCircle2 className="h-5 w-5 text-[var(--demo-accent)]" aria-hidden="true" />
                    <p className="mt-2 text-sm font-bold">{h.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{h.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Growth+: stats strip */}
      {level >= 1 && (
        <section className="border-t border-border bg-[var(--demo-soft)] py-10">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 px-4 text-center sm:grid-cols-4">
            {demo.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} variant="zoom">
                <div>
                  <p className="font-display text-3xl font-bold text-[var(--demo-accent)]">{s.value}</p>
                  <p className="mt-1 text-xs font-semibold text-muted-foreground">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* 3. Offerings — all tiers */}
      <section id="d-services" className="border-t border-border py-16">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <h3 className="font-display text-2xl font-bold">{demo.offeringsTitle}</h3>
          </Reveal>
          <div className="mt-6 space-y-1">
            {(level >= 1 ? demo.offerings : demo.offerings.slice(0, 4)).map((o, i) => (
              <Reveal key={o.name} delay={i * 60}>
                <div className="flex items-start justify-between gap-4 rounded-lg border-b border-border px-2 py-4 transition-colors hover:bg-secondary/40">
                  <div>
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      {o.name}
                      {o.tag && level >= 1 && (
                        <span className="rounded-full bg-[var(--demo-soft)] px-2 py-0.5 text-[10px] font-bold text-[var(--demo-accent)]">
                          {o.tag}
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground">{o.desc}</span>
                  </div>
                  <span className="whitespace-nowrap text-sm font-bold text-[var(--demo-accent)]">{o.price}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Basic: 2-image glimpse (Growth gets the full gallery below) */}
      {level === 0 && (
        <section className="border-t border-border bg-card/50 py-16">
          <div className="mx-auto max-w-5xl px-4">
            <Reveal>
              <h3 className="font-display text-2xl font-bold">Inside {demo.business}</h3>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {demo.gallery.slice(0, 2).map((g, i) => (
                <Reveal key={g.src} delay={i * 90} variant="zoom">
                  <div className="group overflow-hidden rounded-2xl border border-border">
                    <img
                      src={g.src || '/placeholder.svg'}
                      alt={g.alt}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Growth+: Gallery */}
      {level >= 1 && (
        <section id="d-gallery" className="border-t border-border bg-card/50 py-16">
          <div className="mx-auto max-w-5xl px-4">
            <Reveal>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-2xl font-bold">Gallery</h3>
                <span className="rounded-full bg-[var(--demo-soft)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--demo-accent)]">
                  Growth+
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

      {/* Growth+: Reviews */}
      {level >= 1 && (
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-5xl px-4">
            <Reveal>
              <h3 className="font-display text-2xl font-bold">What customers say</h3>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Growth+: Plan your visit — 3 simple steps */}
      {level >= 1 && (
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-4xl px-4">
            <Reveal>
              <h3 className="font-display text-2xl font-bold text-center">Plan your visit in 3 steps</h3>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { n: '1', t: 'Message us on WhatsApp', d: 'One tap — no forms, no waiting on hold.' },
                { n: '2', t: 'Get your slot confirmed', d: 'We reply within minutes with your time.' },
                { n: '3', t: 'Walk in & enjoy', d: 'Everything is ready when you arrive.' },
              ].map((s, i) => (
                <Reveal key={s.n} delay={i * 100} variant="zoom">
                  <div className="hover-lift relative h-full rounded-2xl border border-border bg-card p-6 text-center">
                    <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[var(--demo-accent)] font-display text-base font-bold text-white">
                      {s.n}
                    </span>
                    <p className="mt-3 text-sm font-bold">{s.t}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Growth+: Team */}
      {level >= 1 && (
        <section id="d-team" className="border-t border-border bg-card/50 py-16">
          <div className="mx-auto max-w-4xl px-4">
            <Reveal>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[var(--demo-accent)]" aria-hidden="true" />
                <h3 className="font-display text-2xl font-bold">Meet the team</h3>
              </div>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {demo.team.map((t, i) => (
                <Reveal key={t.name} delay={i * 90} variant="zoom">
                  <div className="hover-lift h-full rounded-2xl border border-border bg-card p-6 text-center">
                    <span
                      aria-hidden="true"
                      className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--demo-soft)] font-display text-lg font-bold text-[var(--demo-accent)]"
                    >
                      {t.name
                        .split(' ')
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join('')}
                    </span>
                    <p className="mt-3 text-sm font-bold">{t.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium: interactive booking widget */}
      {level >= 2 && (
        <section id="d-booking" className="border-t border-border py-16">
          <div className="mx-auto max-w-3xl px-4">
            <Reveal variant="blur">
              <div className="flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-[var(--demo-accent)]" aria-hidden="true" />
                <h3 className="font-display text-2xl font-bold">{demo.booking.title}</h3>
                <span className="rounded-full bg-[var(--demo-soft)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--demo-accent)]">
                  Premium
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{demo.booking.subtitle}</p>
            </Reveal>
            <BookingWidget demo={demo} />
          </div>
        </section>
      )}

      {/* Premium: capability grid */}
      {level >= 2 && (
        <section className="border-t border-border bg-[var(--demo-soft)] py-16">
          <div className="mx-auto max-w-5xl px-4">
            <Reveal variant="blur">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[var(--demo-accent)]" aria-hidden="true" />
                <h3 className="font-display text-2xl font-bold">Premium capabilities</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Custom systems built into the site — fully functional, not mockups.
              </p>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {demo.premiumFeatures.map((f, i) => (
                <Reveal key={f.name} delay={i * 80} variant="zoom">
                  <div className="hover-lift flex h-full flex-col items-start gap-2 rounded-2xl border border-border bg-card p-6">
                    <CalendarCheck className="h-6 w-6 text-[var(--demo-accent)]" aria-hidden="true" />
                    <span className="text-sm font-bold leading-snug">{f.name}</span>
                    <span className="text-xs leading-relaxed text-muted-foreground">{f.desc}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium: loyalty & membership banner */}
      {level >= 2 && (
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-5xl px-4">
            <Reveal variant="blur">
              <div
                className="relative overflow-hidden rounded-3xl border border-border p-8 sm:p-10 text-center"
                style={{ background: `linear-gradient(135deg, ${demo.accentSoft}, transparent 60%)` }}
              >
                <Sparkles className="mx-auto h-7 w-7 text-[var(--demo-accent)]" aria-hidden="true" />
                <h3 className="mt-3 font-display text-2xl font-bold text-balance">
                  Loyalty rewards, built into the website
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Regulars earn points on every visit, unlock member-only offers and get automatic
                  reminders — all managed from this site, no extra app needed.
                </p>
                <a
                  href={whatsappLink(`Hi ${demo.business}! I'd like to join the loyalty programme.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--demo-accent)] px-7 py-3 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.03]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Join free on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Premium: FAQ */}
      {level >= 2 && (
        <section id="d-faq" className="border-t border-border py-16">
          <div className="mx-auto max-w-3xl px-4">
            <Reveal>
              <h3 className="font-display text-2xl font-bold">Frequently asked questions</h3>
            </Reveal>
            <div className="mt-6 space-y-3">
              {demo.faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 70}>
                  <details className="group rounded-2xl border border-border bg-card px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold">
                      {f.q}
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Hours + location — all tiers */}
      <section id="d-contact" className="border-t border-border bg-card/50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <h3 className="font-display text-2xl font-bold">Visit us</h3>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Reveal variant="left">
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[var(--demo-accent)]" aria-hidden="true" />
                  <p className="text-sm font-bold">Opening hours</p>
                </div>
                <dl className="mt-4 space-y-2">
                  {demo.hours.map((h) => (
                    <div key={h.days} className="flex items-center justify-between gap-4 text-sm">
                      <dt className="text-muted-foreground">{h.days}</dt>
                      <dd className="font-semibold">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
            <Reveal variant="right">
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[var(--demo-accent)]" aria-hidden="true" />
                  <p className="text-sm font-bold">Find us</p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{demo.address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(demo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--demo-accent)] hover:underline"
                >
                  Open in Google Maps
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Conversion footer — all tiers */}
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

/** Interactive booking widget shown in the Premium tier — sends to WhatsApp. */
function BookingWidget({ demo }: { demo: Demo }) {
  const [slot, setSlot] = useState(demo.booking.slots[0])
  const [option, setOption] = useState(demo.booking.options[0])
  const [name, setName] = useState('')

  const message = `Hi ${demo.business}! I'd like to book: ${option} at ${slot}.${name ? ` My name is ${name}.` : ''}`

  return (
    <div className="mt-6 rounded-2xl border border-border bg-card p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <fieldset>
          <legend className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {demo.booking.optionLabel}
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {demo.booking.options.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setOption(o)}
                aria-pressed={option === o}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  option === o
                    ? 'border-[var(--demo-accent)] bg-[var(--demo-soft)] text-[var(--demo-accent)]'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {demo.booking.slotLabel}
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {demo.booking.slots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSlot(s)}
                aria-pressed={slot === s}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  slot === s
                    ? 'border-[var(--demo-accent)] bg-[var(--demo-soft)] text-[var(--demo-accent)]'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Your name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--demo-accent)]"
          />
        </label>
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shine inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--demo-accent)] px-6 py-3 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Confirm on WhatsApp
        </a>
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        In a live build this connects to a real booking database with confirmations, reminders and an owner dashboard.
      </p>
    </div>
  )
}
