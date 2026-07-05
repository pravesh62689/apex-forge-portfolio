'use client'

import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/site-config'

export function Intro() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.sessionStorage.getItem('intro-shown')) {
      setDone(true)
      return
    }
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setDone(true)
      window.sessionStorage.setItem('intro-shown', '1')
      document.body.style.overflow = ''
    }, 2200)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  if (done) return null

  return (
    <div className="intro-overlay" role="presentation" aria-hidden="true">
      <div className="intro-content">
        <span className="intro-mark">
          <span className="intro-dot" />
        </span>
        <h1 className="intro-brand font-display">{siteConfig.brand}</h1>
        <span className="intro-line" />
      </div>
    </div>
  )
}
