'use client'

import { useState } from 'react'

/**
 * Image that shows an animated skeleton until it finishes loading, then fades
 * in. Prevents blank/janky image pop-in across the site.
 */
export function ImageWithSkeleton({
  src,
  alt,
  className = '',
  imgClassName = '',
  loading = 'lazy',
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  loading?: 'lazy' | 'eager'
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && <div className="skeleton absolute inset-0" aria-hidden="true" />}
      <img
        src={src || '/placeholder.svg'}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`${imgClassName} transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
