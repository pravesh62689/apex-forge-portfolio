'use client'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { zLayer } from '@/lib/motion-presets'
import type { Tier, NicheTheme } from '@/lib/niche-config'

type Props = {
  tier: Tier
  theme: NicheTheme
  channel?: 'whatsapp' | 'phone' | 'email'
  target?: string // "919999999999" for whatsapp/phone, "hello@x.com" for email
  label?: string
}

/**
 * MagneticContactFab
 * - Basic: static
 * - Moderate: idle breathing pulse
 * - Premium: cursor magnetism (30-40% damped, clamped ±14px)
 */
export function MagneticContactFab({
  tier,
  theme,
  channel,
  target = '916268935890',
  label,
}: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const ch = channel ?? theme.channel

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 150, damping: 15 })
  const y = useSpring(rawY, { stiffness: 150, damping: 15 })

  useEffect(() => {
    if (tier !== 'premium' || reduced) return
    const el = ref.current
    if (!el) return
    function onMove(e: MouseEvent) {
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      // Trigger only when cursor is within ~120px
      const dist = Math.hypot(dx, dy)
      if (dist > 140) {
        rawX.set(0)
        rawY.set(0)
        return
      }
      // Damp to 35% and clamp to ±14px
      const pull = 0.35
      const clamp = (v: number) => Math.max(-14, Math.min(14, v))
      rawX.set(clamp(dx * pull))
      rawY.set(clamp(dy * pull))
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [tier, reduced, rawX, rawY])

  const href =
    ch === 'whatsapp'
      ? `https://wa.me/${target.replace(/\D/g, '')}`
      : ch === 'phone'
        ? `tel:+${target.replace(/\D/g, '')}`
        : `mailto:${target}`

  const icon =
    ch === 'whatsapp' ? (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
      </svg>
    ) : ch === 'phone' ? (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ) : (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )

  const displayLabel = label ?? (ch === 'whatsapp' ? 'WhatsApp' : ch === 'phone' ? 'Call now' : 'Email us')

  return (
    <motion.a
      ref={ref}
      href={href}
      target={ch === 'whatsapp' ? '_blank' : undefined}
      rel="noopener noreferrer"
      className={cn(
        'fixed bottom-5 right-5 md:bottom-8 md:right-8 flex items-center gap-2 rounded-full px-4 py-3 md:px-5 md:py-3.5',
        'font-semibold text-white shadow-2xl',
        'ring-1 ring-white/20',
      )}
      style={{
        backgroundColor: theme.primaryHex,
        zIndex: zLayer.sticky,
        x: tier === 'premium' ? x : 0,
        y: tier === 'premium' ? y : 0,
      }}
      animate={
        tier === 'moderate' && !reduced
          ? { scale: [1, 1.05, 1] }
          : undefined
      }
      transition={
        tier === 'moderate' && !reduced
          ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
          : undefined
      }
      whileHover={!reduced ? { scale: 1.06 } : undefined}
      whileTap={!reduced ? { scale: 0.95 } : undefined}
      data-testid="fab-magnetic-contact"
    >
      {icon}
      <span className="hidden sm:inline">{displayLabel}</span>
    </motion.a>
  )
}