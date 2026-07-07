'use client'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { motionPresets, zLayer } from '@/lib/motion-presets'
import type { Tier, NicheTheme } from '@/lib/niche-config'

type Props = {
  tier: Tier
  theme: NicheTheme
  ctaLabel: string
  onClick?: () => void
}

/** Sticky bottom conversion bar — only on Moderate/Premium. Pinned above safe-area. */
export function StickyConversionBar({ tier, theme, ctaLabel, onClick }: Props) {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', (v) => setVisible(v > 400))
  }, [scrollY])

  if (tier === 'basic') return null

  return (
    <motion.div
      className={cn(
        'fixed left-3 right-3 md:left-auto md:right-8 md:bottom-8 bottom-3 md:hidden',
        'rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-between px-4 py-3',
        theme.isDark ? 'bg-white/10 text-white ring-1 ring-white/15' : 'bg-white text-slate-900 ring-1 ring-black/5',
      )}
      style={{ zIndex: zLayer.sticky, paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}
      initial={{ y: 100, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={reduced ? { duration: 0 } : motionPresets.confident}
      data-testid="sticky-conversion-bar"
    >
      <div>
        <p className={cn('text-xs font-medium', theme.textMuted)}>Ready to start?</p>
        <p className="text-sm font-bold">{theme.name}</p>
      </div>
      <button
        onClick={onClick}
        className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md"
        style={{ backgroundColor: theme.primaryHex }}
        data-testid="sticky-conversion-cta"
      >
        {ctaLabel}
      </button>
    </motion.div>
  )
}