'use client'
import { motion, useMotionValue, useSpring, useInView, useReducedMotion, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { RevealOrchestrator } from '@/components/orchestrator/reveal-orchestrator'
import { motionPresets } from '@/lib/motion-presets'
import type { Tier, NicheTheme, NicheContent } from '@/lib/niche-config'

function useCountUp(target: number, tier: Tier) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [value, setValue] = useState(tier === 'basic' ? target : 0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView || tier === 'basic' || reduced) {
      setValue(target)
      return
    }
    const start = performance.now()
    const dur = 1400
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const isDecimal = target % 1 !== 0
      setValue(isDecimal ? +(target * eased).toFixed(2) : Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, tier, reduced])

  return { ref, value }
}

function StatItem({ tier, theme, stat, i }: { tier: Tier; theme: NicheTheme; stat: NicheContent['stats'][number]; i: number }) {
  const { ref, value } = useCountUp(stat.value, tier)
  return (
    <div className="text-center" data-testid={`stat-card-${i}`}>
      <div className="flex items-baseline justify-center gap-0.5">
        {stat.prefix && <span className={cn('text-3xl md:text-4xl font-bold', theme.text)}>{stat.prefix}</span>}
        <span ref={ref} className={cn('text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums', theme.text)} style={{ fontFamily: theme.fontHeading }}>
          {stat.value % 1 !== 0 ? value.toFixed(2).replace(/\.?0+$/, '') : value.toLocaleString('en-IN')}
        </span>
        {stat.suffix && <span className={cn('text-3xl md:text-4xl font-bold', theme.primaryText)}>{stat.suffix}</span>}
      </div>
      <p className={cn('mt-2 text-sm uppercase tracking-widest', theme.textMuted)}>{stat.label}</p>
    </div>
  )
}

export function StatsSection({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  return (
    <section className={cn('py-20 md:py-28', theme.bg)} data-testid="stats-section">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <RevealOrchestrator tier={tier} stagger context="grid" className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {content.stats.map((s, i) => <StatItem key={i} tier={tier} theme={theme} stat={s} i={i} />)}
        </RevealOrchestrator>
      </div>
    </section>
  )
}

/** Testimonial section — grid on Basic, carousel on Moderate, CSS marquee on Premium. */
export function TestimonialsSection({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  const reduced = useReducedMotion()
  const items = content.testimonials

  return (
    <section className={cn('py-20 md:py-28 overflow-hidden', theme.bg)} data-testid="testimonials-section">
      <div className="mx-auto max-w-6xl px-6 md:px-12 mb-10">
        <RevealOrchestrator tier={tier} className="max-w-2xl">
          <p className={cn('text-xs font-semibold uppercase tracking-widest mb-3', theme.primaryText)}>What people say</p>
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            Real reviews. Real people.
          </h2>
        </RevealOrchestrator>
      </div>

      {tier === 'premium' && !reduced ? (
        // CSS marquee, pauses on hover
        <div className="relative overflow-hidden" data-testid="testimonials-marquee">
          <div className="flex gap-6 marquee-track">
            {[...items, ...items, ...items].map((t, i) => (
              <TestimonialCard key={i} t={t} i={i} theme={theme} className="w-[320px] shrink-0" />
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <RevealOrchestrator tier={tier} stagger context="grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((t, i) => (
              <TestimonialCard key={i} t={t} i={i} theme={theme} />
            ))}
          </RevealOrchestrator>
        </div>
      )}
    </section>
  )
}

function TestimonialCard({ t, i, theme, className }: { t: NicheContent['testimonials'][number]; i: number; theme: NicheTheme; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-3xl p-6 ring-1',
        theme.surface,
        theme.isDark ? 'ring-white/10' : 'ring-black/5',
        className,
      )}
      data-testid={`testimonial-card-${i}`}
    >
      <div className="flex gap-0.5 mb-3" style={{ color: theme.primaryHex }}>
        {[...Array(5)].map((_, s) => (
          <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        ))}
      </div>
      <p className={cn('text-base leading-relaxed', theme.text)}>"{t.text}"</p>
      <p className={cn('mt-4 text-sm font-semibold', theme.text)}>{t.name}</p>
      {t.role && <p className={cn('text-xs', theme.textMuted)}>{t.role}</p>}
    </div>
  )
}

/** Pricing package cards — Premium: glow pulse on recommended. */
export function PricingSection({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  const reduced = useReducedMotion()
  const pkgs = content.packages ?? []
  if (!pkgs.length) return null

  return (
    <section id="pricing" className={cn('py-20 md:py-28', theme.bg)} data-testid="pricing-section">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <RevealOrchestrator tier={tier} className="mb-12 max-w-2xl">
          <p className={cn('text-xs font-semibold uppercase tracking-widest mb-3', theme.primaryText)}>Pricing</p>
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            Honest packages. No haggling.
          </h2>
        </RevealOrchestrator>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pkgs.map((p, i) => (
            <motion.div
              key={p.name}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ ...motionPresets.confident, delay: i * 0.08 }}
              whileHover={tier === 'premium' && !reduced && p.recommended ? { rotateY: 4, rotateX: -2, y: -8 } : tier !== 'basic' && !reduced ? { y: -4 } : undefined}
              className={cn(
                'relative rounded-3xl p-8 ring-1',
                p.recommended ? 'ring-2' : theme.isDark ? 'ring-white/10' : 'ring-black/5',
                theme.surface,
              )}
              style={p.recommended ? { borderColor: theme.primaryHex } : undefined}
              data-testid={`pricing-card-${p.name.toLowerCase()}`}
            >
              {p.recommended && tier === 'premium' && !reduced && (
                <motion.div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{ boxShadow: `0 0 40px ${theme.primaryHex}55` }}
                  animate={{ boxShadow: [`0 0 24px ${theme.primaryHex}33`, `0 0 60px ${theme.primaryHex}88`, `0 0 24px ${theme.primaryHex}33`] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                />
              )}
              {p.recommended && (
                <span className="absolute -top-3 left-6 rounded-full text-white text-xs font-bold px-3 py-1" style={{ backgroundColor: theme.primaryHex }}>
                  Most popular
                </span>
              )}
              <h3 className={cn('text-xl font-bold', theme.text)}>{p.name}</h3>
              <p className={cn('mt-3 text-3xl md:text-4xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>{p.price}</p>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className={cn('flex items-start gap-2 text-sm', theme.text)}>
                    <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.primaryHex} strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className="mt-8 w-full rounded-full py-3 font-semibold text-white shadow-md"
                style={{ backgroundColor: theme.primaryHex }}
                data-testid={`pricing-cta-${p.name.toLowerCase()}`}
              >
                Get started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Booking form — magnetic submit + inline checkmark morph on Premium. */
export function BookingSection({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  const reduced = useReducedMotion()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorField, setErrorField] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) { setErrorField('name'); return }
    if (form.phone.replace(/\D/g, '').length < 10) { setErrorField('phone'); return }
    setErrorField(null)
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 900)
  }

  return (
    <section id="booking" className={cn('py-20 md:py-28', theme.bg)} data-testid="booking-section">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <RevealOrchestrator tier={tier} className="mb-8 text-center">
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            {theme.ctaLabel}
          </h2>
          <p className={cn('mt-3', theme.textMuted)}>{content.business} · {content.location}</p>
        </RevealOrchestrator>

        <RevealOrchestrator tier={tier}>
          <form onSubmit={submit} className={cn('rounded-3xl p-6 md:p-8 ring-1 space-y-4', theme.surface, theme.isDark ? 'ring-white/10' : 'ring-black/5')} data-testid="appointment-booking-form">
            <FormField theme={theme} tier={tier} label="Your name" name="name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} error={errorField === 'name'} />
            <FormField theme={theme} tier={tier} label="Phone / WhatsApp" name="phone" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} error={errorField === 'phone'} />
            <FormField theme={theme} tier={tier} label="Anything we should know?" name="message" value={form.message} onChange={(v) => setForm((f) => ({ ...f, message: v }))} textarea />

            <motion.button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="w-full rounded-full py-4 font-semibold text-white shadow-lg relative overflow-hidden"
              style={{ backgroundColor: theme.primaryHex }}
              whileHover={tier !== 'basic' && !reduced ? { scale: 1.02 } : undefined}
              whileTap={!reduced ? { scale: 0.97 } : undefined}
              data-testid="appointment-booking-submit"
            >
              {status === 'sent' && tier === 'premium' ? (
                <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={motionPresets.kinetic} className="flex items-center justify-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                  Sent — we'll be in touch
                </motion.span>
              ) : status === 'sent' ? 'Sent ✓' : status === 'sending' ? 'Sending...' : theme.ctaLabel}
            </motion.button>
          </form>
        </RevealOrchestrator>
      </div>
    </section>
  )
}

function FormField({ theme, tier, label, name, value, onChange, error, textarea }: { theme: NicheTheme; tier: Tier; label: string; name: string; value: string; onChange: (v: string) => void; error?: boolean; textarea?: boolean }) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0
  const Comp = textarea ? 'textarea' : 'input'
  const reduced = useReducedMotion()
  return (
    <motion.div
      className="relative"
      animate={error && tier !== 'basic' && !reduced ? { x: [0, -4, 4, -3, 3, 0] } : undefined}
      transition={motionPresets.kinetic}
    >
      <label
        className={cn(
          'absolute left-4 transition-all pointer-events-none',
          active ? 'top-1.5 text-[10px] font-semibold uppercase tracking-widest' : 'top-4 text-sm',
          active ? theme.primaryText : theme.textMuted,
        )}
      >
        {label}
      </label>
      <Comp
        name={name}
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={textarea ? 3 : undefined}
        className={cn(
          'w-full rounded-2xl bg-transparent px-4 pb-3 pt-6 outline-none ring-1 transition-colors',
          theme.text,
          error ? 'ring-red-500' : theme.isDark ? 'ring-white/15 focus:ring-white/40' : 'ring-black/15 focus:ring-black/40',
        )}
        data-testid={`booking-field-${name}`}
      />
    </motion.div>
  )
}

/** Final CTA — every niche. Background gradient shift on scroll into view. */
export function FinalCTASection({ tier, theme, onCta }: { tier: Tier; theme: NicheTheme; onCta: () => void }) {
  return (
    <section className={cn('relative py-24 md:py-32 overflow-hidden', theme.bg)} data-testid="final-cta-section">
      {tier !== 'basic' && (
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${theme.primaryHex}44, transparent 60%)` }}
        />
      )}
      <div className="relative mx-auto max-w-3xl px-6 md:px-12 text-center">
        <RevealOrchestrator tier={tier}>
          <h2 className={cn('text-4xl md:text-6xl font-bold tracking-tight', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            Ready when you are.
          </h2>
          <p className={cn('mt-4 text-base md:text-lg', theme.textMuted)}>
            One quick message and we\'ll take it from there.
          </p>
          <button
            onClick={onCta}
            className="mt-8 rounded-full px-8 py-4 text-base font-semibold text-white shadow-2xl"
            style={{ backgroundColor: theme.primaryHex }}
            data-testid="final-cta-button"
          >
            {theme.ctaLabel} →
          </button>
        </RevealOrchestrator>
      </div>
    </section>
  )
}

/** Footer with contact info. */
export function FooterSection({ theme, content }: { theme: NicheTheme; content: NicheContent }) {
  return (
    <footer className={cn('py-16 border-t', theme.bg, theme.isDark ? 'border-white/10' : 'border-black/10')} data-testid="footer-section">
      <div className="mx-auto max-w-6xl px-6 md:px-12 grid md:grid-cols-3 gap-8">
        <div>
          <p className={cn('font-bold text-lg', theme.text)} style={{ fontFamily: theme.fontHeading }}>{content.business}</p>
          <p className={cn('mt-2 text-sm', theme.textMuted)}>{content.location}</p>
        </div>
        <div>
          <p className={cn('text-xs font-semibold uppercase tracking-widest mb-2', theme.primaryText)}>Contact</p>
          <p className={cn('text-sm', theme.text)}>+91 99999 99999</p>
          <p className={cn('text-sm', theme.text)}>hello@{content.business.toLowerCase().replace(/[^a-z]/g, '')}.in</p>
        </div>
        <div>
          <p className={cn('text-xs font-semibold uppercase tracking-widest mb-2', theme.primaryText)}>Hours</p>
          <p className={cn('text-sm', theme.text)}>Mon-Sat · 9:00 - 20:00</p>
          <p className={cn('text-sm', theme.text)}>Sun · Closed</p>
        </div>
      </div>
      <p className={cn('mt-10 text-center text-xs', theme.textMuted)}>
        Demo built by <a href="/" className={cn('underline', theme.primaryText)}>Apex Forge</a> — this template can be your site.
      </p>
    </footer>
  )
}