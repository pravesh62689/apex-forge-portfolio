'use client'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motionPresets } from '@/lib/motion-presets'
import { SkeletonImage } from '@/components/orchestrator/skeleton-image'
import type { Tier, Niche, NicheTheme } from '@/lib/niche-config'
import type { NicheContent } from '@/lib/niche-config'

type Props = {
  tier: Tier
  niche: Niche
  theme: NicheTheme
  content: NicheContent
  onCta: () => void
}

/**
 * Universal hero — theme-driven shell with niche-specific signature moments on Premium.
 */
export function UniversalHero({ tier, niche, theme, content, onCta }: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const fgY = useTransform(scrollYProgress, [0, 1], [0, -24])

  const preset = niche === 'gym' ? 'kinetic' : niche === 'salon' || niche === 'dentist' ? 'glide' : 'confident'
  const stagger = tier === 'premium' ? 0.15 : tier === 'moderate' ? 0.12 : 0.08

  const headlineLines = content.headline.split('\n')

  const isGymPremium = niche === 'gym' && tier === 'premium'

  return (
    <section
      ref={ref}
      className={cn(
        'relative isolate overflow-hidden min-h-[86vh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24',
        theme.bg,
      )}
      data-testid={`hero-${niche}`}
    >
      {/* Background image with parallax on moderate+ */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={tier !== 'basic' && !reduced ? { y: bgY } : undefined}
      >
        <SkeletonImage
          src={content.heroImage}
          alt=""
          tier={tier}
          aspect="aspect-auto"
          className="absolute inset-0 h-full w-full"
          imgClassName={cn(theme.isDark ? 'opacity-40' : 'opacity-30')}
          accentHex={theme.primaryHex}
          priority
        />
        <div
          className={cn(
            'absolute inset-0',
            theme.isDark
              ? 'bg-gradient-to-b from-transparent via-black/40 to-neutral-950'
              : 'bg-gradient-to-b from-transparent via-white/60 to-slate-50',
          )}
        />
      </motion.div>

      {/* Ambient orb — Premium only */}
      {tier === 'premium' && !reduced && (
        <div
          aria-hidden
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ backgroundColor: theme.primaryHex }}
        />
      )}

      <div className="mx-auto max-w-6xl w-full px-6 md:px-12 lg:px-16 grid md:grid-cols-12 gap-8">
        <motion.div
          className="md:col-span-8"
          style={tier !== 'basic' && !reduced ? { y: fgY } : undefined}
          initial={reduced ? false : 'hidden'}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: stagger, delayChildren: 0.1 } },
          }}
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: motionPresets[preset] } }}
            className={cn(
              'inline-flex items-center gap-2 text-xs md:text-sm font-medium mb-4 uppercase tracking-widest',
              theme.textMuted,
            )}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: theme.primaryHex }}
            />
            {theme.vibe} · {content.location}
          </motion.p>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: motionPresets[preset] } }}
            className={cn(
              'font-bold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
              theme.text,
              isGymPremium && 'uppercase',
            )}
            style={{ fontFamily: theme.fontHeading }}
            data-testid="hero-headline"
          >
            {headlineLines.map((line, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40, clipPath: isGymPremium ? 'inset(0 100% 0 0)' : 'inset(0 0 0 0)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    clipPath: 'inset(0 0% 0 0)',
                    transition: { ...motionPresets[preset], delay: i * 0.08 },
                  },
                }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: motionPresets[preset] } }}
            className={cn('mt-6 text-base md:text-lg max-w-2xl', theme.textMuted)}
            style={{ fontFamily: theme.fontBody }}
          >
            {content.subhead}
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: motionPresets[preset] } }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button
              onClick={onCta}
              className="rounded-full px-6 py-3.5 text-sm md:text-base font-semibold text-white shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: theme.primaryHex }}
              data-testid="hero-primary-cta"
            >
              {theme.ctaLabel} →
            </button>
            <a
              href="#services"
              className={cn(
                'rounded-full px-6 py-3.5 text-sm md:text-base font-semibold ring-1 transition-colors',
                theme.isDark
                  ? 'ring-white/20 text-white hover:bg-white/5'
                  : 'ring-black/10 text-slate-900 hover:bg-black/5',
              )}
              data-testid="hero-secondary-cta"
            >
              See what we do
            </a>
          </motion.div>
        </motion.div>

        {/* Side card — floats on md+ */}
        <motion.div
          className="md:col-span-4 hidden md:block"
          initial={reduced ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...motionPresets[preset], delay: 0.4 }}
        >
          <div
            className={cn(
              'relative rounded-3xl overflow-hidden ring-1 shadow-2xl',
              theme.isDark ? 'ring-white/10' : 'ring-black/5',
            )}
          >
            <SkeletonImage
              src={content.heroImage}
              alt={content.business}
              tier={tier}
              aspect="aspect-[3/4]"
              accentHex={theme.primaryHex}
            />
            <div className={cn('absolute inset-x-0 bottom-0 p-5', 'bg-gradient-to-t from-black/70 to-transparent')}>
              <p className="text-white text-sm font-medium opacity-90">Featured</p>
              <p className="text-white text-lg font-bold">{content.business}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}