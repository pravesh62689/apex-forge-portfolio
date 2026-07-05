'use client'

import dynamic from 'next/dynamic'

// Lazy-load the WebGL scene client-side with a matching skeleton, so the page
// paints instantly and the 3D bundle never blocks first render.
const HeroScene = dynamic(() => import('@/components/hero-scene'), {
  ssr: false,
  loading: () => (
    <div className="hero-media flex items-center justify-center" aria-hidden="true">
      <div className="relative">
        <div className="skeleton h-44 w-44 rounded-full sm:h-56 sm:w-56" />
        <div className="skeleton absolute -right-6 top-6 h-6 w-6 rounded-full" />
        <div className="skeleton absolute -left-4 bottom-8 h-4 w-4 rounded-full" />
      </div>
    </div>
  ),
})

export function HeroSceneLazy() {
  return <HeroScene />
}
