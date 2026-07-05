'use client'

import { useEffect, useState } from 'react'

/**
 * Cinematic first-load intro ("forge ignition"). Full-screen CSS animation that
 * plays on every fresh page load, locks scroll while it runs, then splits open
 * like a curtain to reveal the hero. Respects prefers-reduced-motion.
 */
const BRAND = 'APEX FORGE'

export function IntroLoader() {
  const [phase, setPhase] = useState<'run' | 'reveal' | 'done'>('run')

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setPhase('done')
      return
    }
    document.body.style.overflow = 'hidden'
    const revealTimer = setTimeout(() => setPhase('reveal'), 2600)
    const doneTimer = setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = ''
    }, 3500)
    return () => {
      clearTimeout(revealTimer)
      clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      className={`intro-root ${phase === 'reveal' ? 'intro-reveal' : ''}`}
      role="status"
      aria-label="Loading Apex Forge"
    >
      {/* Curtain panels that split apart on reveal */}
      <span className="intro-curtain intro-curtain-top" aria-hidden="true" />
      <span className="intro-curtain intro-curtain-bottom" aria-hidden="true" />

      <div className="intro-center">
        <span className="intro-mark" aria-hidden="true">
          <span className="intro-mark-inner">AF</span>
          <span className="intro-ring" />
          <span className="intro-ring intro-ring-2" />
          <span className="intro-spark" />
        </span>

        <span className="intro-word" aria-hidden="true">
          {BRAND.split('').map((c, i) => (
            <span
              key={i}
              className="intro-letter"
              style={{ animationDelay: `${0.5 + i * 0.06}s` }}
            >
              {c === ' ' ? '\u00A0' : c}
            </span>
          ))}
        </span>

        <span className="intro-sub">Forging websites that win customers</span>

        <span className="intro-bar" aria-hidden="true">
          <span className="intro-bar-fill" />
        </span>
      </div>
    </div>
  )
}
