'use client'
import { motion, useReducedMotion, type MotionProps, type Variants } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motionPresets, revealDefaults, type MotionPresetName } from '@/lib/motion-presets'

type Preset = MotionPresetName
type Ctx = 'hero' | 'grid' | 'dense' | 'headline'
type RevealVariant = 'up' | 'left' | 'right' | 'zoom' | 'blur' | 'none'

interface Props extends MotionProps {
  children: ReactNode
  tier?: 'basic' | 'moderate' | 'premium'
  preset?: Preset
  context?: Ctx
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  variant?: RevealVariant
  distance?: number
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'ul' | 'li' | 'span'
  stagger?: boolean // children mode
}

/**
 * RevealOrchestrator — the evolved reveal.tsx.
 * `tier` prop swaps the named Framer Motion preset, so the whole factory
 * shares one motion vocabulary. Respects prefers-reduced-motion.
 */
export function RevealOrchestrator({
  children,
  tier = 'moderate',
  preset,
  context = 'grid',
  direction,
  variant = 'up',
  distance = 24,
  delay = 0,
  className,
  as = 'div',
  stagger = false,
  ...rest
}: Props) {
  const reduced = useReducedMotion()

  // Choose preset based on tier if not overridden
  const activePreset: Preset =
    preset ?? (tier === 'premium' ? 'glide' : tier === 'moderate' ? 'confident' : 'confident')

  const spring = motionPresets[activePreset]
  const ctx = revealDefaults[context]

  // Map variant to direction if direction is not explicitly provided
  const dir = direction ?? (
    variant === 'left' ? 'left' :
    variant === 'right' ? 'right' :
    variant === 'none' ? 'none' : 'up'
  )

  // Support for scale and filter from zoom/blur variants
  const offset = {
    x: dir === 'left' ? distance : dir === 'right' ? -distance : 0,
    y: dir === 'up' ? distance : dir === 'down' ? -distance : 0,
    scale: variant === 'zoom' ? 0.92 : 1,
    filter: variant === 'blur' ? 'blur(8px)' : 'none',
  }

  // Convert delay in milliseconds to seconds if it looks like milliseconds (>= 1)
  const finalDelay = delay >= 1 ? delay / 1000 : delay

  const containerVariants: Variants = stagger
    ? {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: ctx.staggerChildren,
            delayChildren: 'delayChildren' in ctx ? ctx.delayChildren : 0,
          },
        },
      }
    : {
        hidden: { opacity: 0, ...offset },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: 'none',
          transition: { ...spring, delay: finalDelay },
        },
      }

  const childVariants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0, scale: 1, filter: 'none', transition: spring },
  }

  if (reduced) {
    const Tag = as as 'div'
    return (
      <Tag className={className}>{children}</Tag>
    )
  }

  const MotionTag = motion[as] as typeof motion.div

  if (stagger) {
    return (
      <MotionTag
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: ctx.margin }}
        {...rest}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div key={i} variants={childVariants}>
                {child}
              </motion.div>
            ))
          : (
              <motion.div variants={childVariants}>{children}</motion.div>
            )}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: ctx.margin }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

// Export under the legacy Reveal name as well for easier drop-in replacement
export { RevealOrchestrator as Reveal }

/** 3D tilt-on-hover wrapper. Wrap any card to give it perspective tilt. */
export function TiltCard({
  children,
  className = '',
  maxTilt = 8,
}: {
  children: ReactNode
  className?: string
  maxTilt?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `rotateY(${px * maxTilt}deg) rotateX(${-py * maxTilt}deg)`
  }

  function handleLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = 'rotateY(0deg) rotateX(0deg)'
  }

  return (
    <div className="tilt-wrap">
      <div
        ref={ref}
        className={`tilt-card ${className}`}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </div>
    </div>
  )
}

/** Animated number counter that counts up when scrolled into view. */
export function CountUp({
  end,
  duration = 1400,
  suffix = '',
  prefix = '',
  className = '',
}: {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.unobserve(el)
            const start = performance.now()
            const tick = (now: number) => {
              const t = Math.min((now - start) / duration, 1)
              const eased = 1 - Math.pow(1 - t, 3)
              setValue(Math.round(end * eased))
              if (t < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}