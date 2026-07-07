// Central Framer Motion motion vocabulary. All components import from here.
// Damping ratios: confident ≈ 0.87, glide ≈ 1.00, kinetic ≈ 0.38

export const motionPresets = {
  // Nav, buttons, hovers, focus states — feels responsive & confident
  confident: { type: 'spring' as const, stiffness: 300, damping: 30, mass: 1 },
  // Hero reveals, image settles — slow, cinematic
  glide: { type: 'spring' as const, stiffness: 120, damping: 22, mass: 1 },
  // Gym CTA pops, magnetic release, urgency pulses, error shakes — playful & bouncy
  kinetic: { type: 'spring' as const, stiffness: 400, damping: 15, mass: 1 },
} as const

export type MotionPresetName = keyof typeof motionPresets

// Common easing curves for CSS transitions
export const easing = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
}

// Z-index scale — kept in JS so components stay consistent
export const zLayer = {
  gallery: 20,
  nav: 40,
  sticky: 50,
  back: 70,
  splash: 100,
} as const

// Reveal defaults per context
export const revealDefaults = {
  hero: { margin: '-15%', staggerChildren: 0.15 },
  grid: { margin: '-10%', staggerChildren: 0.1, delayChildren: 0.1 },
  dense: { margin: '-5%', staggerChildren: 0.05 },
  headline: { margin: '-15%', staggerChildren: 0.04 },
} as const