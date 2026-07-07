'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Tier } from '@/lib/niche-config'

type Props = {
  src: string
  alt: string
  tier?: Tier
  aspect?: string // e.g. 'aspect-[16/9]'
  className?: string
  imgClassName?: string
  priority?: boolean
  accentHex?: string
}

/**
 * SkeletonPulseCore + SkeletonMorphPremium in one component,
 * gated by `tier`. Basic/Moderate → shimmer sweep + fade.
 * Premium → shimmer → blur-scale settle on decode.
 */
export function SkeletonImage({
  src,
  alt,
  tier = 'moderate',
  aspect = 'aspect-[16/10]',
  className,
  imgClassName,
  priority,
  accentHex,
}: Props) {
  const [loaded, setLoaded] = useState(false)
  const isPremium = tier === 'premium'

  return (
    <div
      className={cn('relative overflow-hidden isolate', aspect, className)}
      style={
        accentHex
          ? ({
              // Shimmer uses the niche's own tokens (light backdrop -> accent)
              ['--shimmer-accent' as string]: accentHex + '33',
            } as React.CSSProperties)
          : undefined
      }
    >
      {/* Shimmer skeleton — persists until image finishes loading */}
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 skeleton-shimmer transition-opacity duration-500',
          loaded ? 'opacity-0' : 'opacity-100',
        )}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        className={cn(
          'absolute inset-0 h-full w-full object-cover will-change-transform',
          // Premium: three-stage settle on decode — blur + scale into place on glide preset
          isPremium
            ? loaded
              ? 'opacity-100 blur-0 scale-100 transition-[opacity,filter,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]'
              : 'opacity-0 blur-[10px] scale-[1.03]'
            : loaded
              ? 'opacity-100 transition-opacity duration-500'
              : 'opacity-0',
          imgClassName,
        )}
      />
    </div>
  )
}