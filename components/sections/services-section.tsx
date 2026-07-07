'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { RevealOrchestrator } from '@/components/orchestrator/reveal-orchestrator'
import { motionPresets } from '@/lib/motion-presets'
import { SkeletonImage } from '@/components/orchestrator/skeleton-image'
import type { Tier, NicheTheme, NicheContent } from '@/lib/niche-config'

type Props = { tier: Tier; theme: NicheTheme; content: NicheContent }

export function ServicesSection({ tier, theme, content }: Props) {
  const reduced = useReducedMotion()

  return (
    <section
      id="services"
      className={cn('relative py-20 md:py-28 lg:py-32', theme.bg)}
      data-testid="services-section"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <RevealOrchestrator tier={tier} className="max-w-2xl mb-12 md:mb-16">
          <p
            className={cn('text-xs font-semibold uppercase tracking-widest mb-3', theme.primaryText)}
          >
            What we do
          </p>
          <h2
            className={cn('text-3xl md:text-5xl font-bold tracking-tight', theme.text)}
            style={{ fontFamily: theme.fontHeading }}
          >
            Services built around real outcomes.
          </h2>
          <p className={cn('mt-4 text-base md:text-lg', theme.textMuted)}>
            No filler line items. Every service listed here we actually deliver, priced honestly.
          </p>
        </RevealOrchestrator>

        {tier === 'basic' ? (
          // Basic — icon-label-line grid, single fade
          <RevealOrchestrator
            tier={tier}
            stagger
            context="grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {content.services.map((s, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-2xl p-6 ring-1',
                  theme.surface,
                  theme.isDark ? 'ring-white/10' : 'ring-black/5',
                )}
                data-testid={`service-card-${i}`}
              >
                <div
                  className="h-10 w-10 rounded-lg mb-4 flex items-center justify-center"
                  style={{ backgroundColor: theme.primaryHex + '22', color: theme.primaryHex }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className={cn('font-semibold text-lg', theme.text)}>{s.name}</h3>
                <p className={cn('mt-2 text-sm', theme.textMuted)}>{s.desc}</p>
                {s.price && (
                  <p className={cn('mt-3 text-sm font-semibold', theme.primaryText)}>{s.price}</p>
                )}
              </div>
            ))}
          </RevealOrchestrator>
        ) : (
          // Moderate + Premium — alternating image/text rows
          <div className="space-y-14 md:space-y-20">
            {content.services.slice(0, 4).map((s, i) => {
              const flipped = i % 2 === 1
              return (
                <RevealOrchestrator
                  key={i}
                  tier={tier}
                  className={cn(
                    'grid md:grid-cols-12 gap-6 md:gap-10 items-center',
                    flipped && 'md:[&>*:first-child]:order-2',
                  )}
                >
                  <div className="md:col-span-6">
                    <motion.div
                      whileHover={tier === 'premium' && !reduced ? { y: -6 } : undefined}
                      transition={motionPresets.confident}
                    >
                      <SkeletonImage
                        src={content.galleryImages[i % content.galleryImages.length]?.src ?? content.heroImage}
                        alt={s.name}
                        tier={tier}
                        aspect="aspect-[4/3]"
                        className="rounded-3xl"
                        accentHex={theme.primaryHex}
                      />
                    </motion.div>
                  </div>
                  <div className="md:col-span-6">
                    <p
                      className={cn('text-xs font-semibold uppercase tracking-widest mb-3', theme.primaryText)}
                    >
                      0{i + 1}
                    </p>
                    <h3
                      className={cn('text-2xl md:text-3xl font-bold', theme.text)}
                      style={{ fontFamily: theme.fontHeading }}
                    >
                      {s.name}
                    </h3>
                    <p className={cn('mt-3 text-base', theme.textMuted)}>{s.desc}</p>
                    {s.price && (
                      <p className={cn('mt-4 text-lg font-bold', theme.primaryText)}>{s.price}</p>
                    )}
                    <a
                      href="#booking"
                      className={cn(
                        'mt-5 inline-flex items-center gap-2 text-sm font-semibold',
                        theme.primaryText,
                      )}
                    >
                      Learn more
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </RevealOrchestrator>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}