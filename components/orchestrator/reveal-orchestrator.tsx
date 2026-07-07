'use client'
import { motion, useReducedMotion, type MotionProps, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { motionPresets, revealDefaults, type MotionPresetName } from '@/lib/motion-presets'

type Preset = MotionPresetName
type Ctx = 'hero' | 'grid' | 'dense' | 'headline'

interface Props extends MotionProps {
  children: ReactNode
  tier?: 'basic' | 'moderate' | 'premium'
  preset?: Preset
  context?: Ctx
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
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
  direction = 'up',
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

  const offset = {
    x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
  }

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
          transition: { ...spring, delay },
        },
      }

  const childVariants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0, transition: spring },
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