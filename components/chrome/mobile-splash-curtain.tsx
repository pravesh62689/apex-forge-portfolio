'use client'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { motionPresets, zLayer } from '@/lib/motion-presets'
import type { Tier, NicheTheme } from '@/lib/niche-config'

type Props = {
  tier: Tier
  theme: NicheTheme
  onDone: () => void
}

/**
 * MobileSplashCurtain
 * Premium tier, mobile viewport, first session only.
 * Sequence: fill in niche primary → logo scale/fade → hold 400ms → clip-path wipe out.
 * Chains to onDone() so hero entrance can start on completion.
 * Skipped entirely when prefers-reduced-motion.
 */
export function MobileSplashCurtain({ tier, theme, onDone }: Props) {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only Premium, mobile viewport (<= 768), first session.
    if (tier !== 'premium') { onDone(); return }
    if (reduced) { onDone(); return }
    if (typeof window === 'undefined') return
    if (window.innerWidth > 768) { onDone(); return }
    try {
      if (sessionStorage.getItem('splash-shown')) { onDone(); return }
      sessionStorage.setItem('splash-shown', '1')
    } catch { /* ignore */ }

    setVisible(true)
    const t = setTimeout(() => setVisible(false), 1400)
    return () => clearTimeout(t)
  }, [tier, reduced, onDone])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: theme.primaryHex, zIndex: zLayer.splash }}
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          data-testid="mobile-splash-curtain"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={motionPresets.confident}
            className="text-center text-white"
          >
            <p style={{ fontFamily: theme.fontHeading }} className="text-3xl font-bold tracking-tight">
              {theme.name}
            </p>
            <p className="text-sm opacity-80 mt-2">{theme.vibe}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}