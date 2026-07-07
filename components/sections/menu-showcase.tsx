'use client'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { RevealOrchestrator } from '@/components/orchestrator/reveal-orchestrator'
import { motionPresets } from '@/lib/motion-presets'
import type { Tier, NicheTheme, NicheContent } from '@/lib/niche-config'

/** Restaurant signature — shared-layout tab indicator glide with confident-preset item stagger. */
export function MenuShowcase({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  const cats = content.menuCategories ?? []
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()

  if (!cats.length) return null

  return (
    <section
      id="menu"
      className={cn('relative py-20 md:py-28', theme.bg)}
      data-testid="menu-showcase"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <RevealOrchestrator tier={tier} className="mb-10">
          <p className={cn('text-xs font-semibold uppercase tracking-widest mb-3', theme.primaryText)}>
            The menu
          </p>
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            Small kitchen. Slow cooking. Big flavour.
          </h2>
        </RevealOrchestrator>

        <div
          className={cn(
            'flex gap-1 md:gap-2 mb-10 overflow-x-auto pb-2 relative',
            theme.isDark ? 'border-b border-white/10' : 'border-b border-black/10',
          )}
          role="tablist"
        >
          {cats.map((c, i) => (
            <button
              key={c.name}
              role="tab"
              onClick={() => setActive(i)}
              className={cn(
                'relative shrink-0 px-4 md:px-5 py-2.5 text-sm md:text-base font-semibold transition-colors',
                active === i ? theme.text : theme.textMuted,
              )}
              data-testid={`menu-tab-${i}`}
            >
              {active === i && (
                <motion.span
                  layoutId="menu-tab-indicator"
                  className="absolute inset-x-0 -bottom-[2px] h-[2px]"
                  style={{ backgroundColor: theme.primaryHex }}
                  transition={motionPresets.confident}
                />
              )}
              {c.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={motionPresets.confident}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {cats[active].items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...motionPresets.confident, delay: 0.04 * i }}
                className={cn(
                  'flex items-start justify-between gap-4 rounded-2xl p-5 md:p-6 ring-1',
                  theme.surface,
                  theme.isDark ? 'ring-white/10' : 'ring-black/5',
                )}
                data-testid={`menu-item-${i}`}
              >
                <div className="min-w-0">
                  <h4 className={cn('text-lg font-bold', theme.text)}>{item.name}</h4>
                  <p className={cn('mt-1 text-sm', theme.textMuted)}>{item.desc}</p>
                </div>
                <span className={cn('shrink-0 font-bold', theme.primaryText)}>{item.price}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}