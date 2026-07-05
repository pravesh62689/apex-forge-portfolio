'use client'

import { useEffect, useState } from 'react'

/**
 * First-load "forge ignition" intro. Pure CSS animation, shown once per
 * browser session so repeat navigation stays instant. Respects
 * prefers-reduced-motion and never blocks interaction after it fades.
 */
export function IntroLoader() {
  const [mounted, setMounted] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Skip entirely if already seen this session or motion is reduced.
    const seen =
      typeof window !== 'undefined' && sessionStorage.getItem('af-intro-seen') === '1'
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (seen || reduced) {
      setDone(true)
      return
    }
    setMounted(true)
    document.body.style.overflow = 'hidden'
    const leaveTimer = setTimeout(() => setLeaving(true), 1800)
    const doneTimer = setTimeout(() => {
      setDone(true)
      sessionStorage.setItem('af-intro-seen', '1')
      document.body.style.overflow = ''
    }, 2500)
    return () => {
      clearTimeout(leaveTimer)
      clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [])

  if (done || !mounted) return null

  return (
    <div
      className={`intro-root ${leaving ? 'intro-leaving' : ''}`}
      role="status"
      aria-label="Loading Apex Forge"
    >
      <div className="intro-center">
        <span className="intro-mark" aria-hidden="true">
          <span className="intro-mark-inner">AF</span>
          <span className="intro-ring" />
          <span className="intro-ring intro-ring-2" />
        </span>
        <span className="intro-word">Apex Forge</span>
        <span className="intro-sub">Forging your web presence</span>
        <span className="intro-bar" aria-hidden="true">
          <span className="intro-bar-fill" />
        </span>
      </div>
    </div>
  )
}
