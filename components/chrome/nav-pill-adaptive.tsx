'use client'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { motionPresets, zLayer } from '@/lib/motion-presets'
import type { Tier, NicheTheme } from '@/lib/niche-config'
import { tierMeta } from '@/lib/niche-config'

type Props = {
  tier: Tier
  theme: NicheTheme
  onTierChange: (t: Tier) => void
  business: string
  showBack?: boolean
}

/**
 * NavPillAdaptive:
 * - Basic: static
 * - Moderate: shrinks & blurs past 80px scroll
 * - Premium: magnetic-hover logo, shared-layoutId active tier pill
 */
export function NavPillAdaptive({ tier, theme, onTierChange, business, showBack = true }: Props) {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 80))
  }, [scrollY])

  const shrinkable = tier !== 'basic'
  const compact = shrinkable && scrolled

  return (
    <motion.nav
      className={cn(
        'fixed left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3',
        'rounded-full border shadow-lg backdrop-blur-xl',
        theme.isDark
          ? 'bg-white/5 border-white/10 text-white'
          : 'bg-white/70 border-black/5 text-slate-900',
        compact ? 'top-3 px-2 py-1.5 md:px-3' : 'top-4 md:top-6 px-3 py-2 md:px-4',
        'transition-[top,padding] duration-300 ease-out',
      )}
      style={{ zIndex: zLayer.nav }}
      initial={reduced ? false : { y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={motionPresets.confident}
      data-testid="nav-pill-adaptive"
    >
      {showBack && (
        <Link
          href="/"
          className={cn(
            'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium hover:opacity-80',
            theme.isDark ? 'hover:bg-white/10' : 'hover:bg-black/5',
          )}
          data-testid="nav-back-to-portfolio"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span className="hidden sm:inline">Portfolio</span>
        </Link>
      )}

      <motion.span
        whileHover={tier === 'premium' && !reduced ? { scale: 1.05, x: 2 } : undefined}
        transition={motionPresets.confident}
        className={cn(
          'font-semibold tracking-tight truncate max-w-[160px] md:max-w-none',
          compact ? 'text-xs md:text-sm' : 'text-sm md:text-base',
        )}
        style={{ fontFamily: theme.fontHeading }}
        data-testid="nav-business-name"
      >
        {business}
      </motion.span>

      <div
        className={cn(
          'ml-2 md:ml-4 flex items-center gap-0.5 rounded-full p-0.5 relative',
          theme.isDark ? 'bg-white/10' : 'bg-black/5',
        )}
        data-testid="nav-tier-switcher-pill"
      >
        {(['basic', 'moderate', 'premium'] as Tier[]).map((t) => (
          <button
            key={t}
            onClick={() => onTierChange(t)}
            className={cn(
              'relative px-2.5 md:px-3.5 py-1 rounded-full text-[11px] md:text-xs font-semibold transition-colors z-10',
              tier === t ? 'text-white' : theme.isDark ? 'text-white/70 hover:text-white' : 'text-slate-700 hover:text-slate-900',
            )}
            data-testid={`nav-tier-option-${t}`}
          >
            {tier === t && (
              <motion.span
                layoutId="active-tier-pill"
                className="absolute inset-0 rounded-full -z-10 shadow-sm"
                style={{ backgroundColor: theme.primaryHex }}
                transition={motionPresets.confident}
              />
            )}
            {tierMeta[t].name}
          </button>
        ))}
      </div>
    </motion.nav>
  )
}