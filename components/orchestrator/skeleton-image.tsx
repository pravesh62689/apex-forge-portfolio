'use client'
import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Tier } from '@/lib/niche-config'

type Props = {
  src: string
  alt: string
  tier?: Tier
  aspect?: string // e.g. 'aspect-[16/9]'
  className?: string
  wrapperClassName?: string
  imgClassName?: string
  priority?: boolean
  accentHex?: string
  width?: any
  height?: any
  fill?: boolean
  loading?: 'lazy' | 'eager'
  [key: string]: any
}

/**
 * SkeletonPulseCore + SkeletonMorphPremium in one component,
 * gated by `tier`. Basic/Moderate → shimmer sweep + fade.
 * Premium → shimmer → blur-scale settle on decode.
 * Backward compatible with ImageWithSkeleton.
 */
export function SkeletonImage({
  src,
  alt,
  tier = 'moderate',
  aspect,
  className,
  wrapperClassName,
  imgClassName,
  priority,
  accentHex,
  width,
  height,
  fill,
  loading = 'lazy',
  ...props
}: Props) {
  const [loaded, setLoaded] = useState(false)
  const isPremium = tier === 'premium'

  const hasSize = width || height || fill
  const finalAspect = aspect || (hasSize ? '' : 'aspect-[16/10]')
  const resolvedLoading = priority ? 'eager' : loading

  return (
    <div
      className={cn('relative overflow-hidden isolate', finalAspect, wrapperClassName || className)}
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
          'absolute inset-0 skeleton-shimmer transition-opacity duration-500 z-10 pointer-events-none',
          loaded ? 'opacity-0' : 'opacity-100',
        )}
      />

      {hasSize ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority || loading === 'eager'}
          onLoad={() => setLoaded(true)}
          className={cn(
            'transition-[opacity,filter,transform] duration-700 ease-in-out',
            isPremium
              ? loaded
                ? 'opacity-100 blur-0 scale-100 transition-[opacity,filter,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]'
                : 'opacity-0 blur-[10px] scale-[1.03]'
              : loaded
                ? 'opacity-100 duration-500'
                : 'opacity-0',
            imgClassName || className
          )}
          {...props}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading={resolvedLoading}
          onLoad={() => setLoaded(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover will-change-transform',
            isPremium
              ? loaded
                ? 'opacity-100 blur-0 scale-100 transition-[opacity,filter,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]'
                : 'opacity-0 blur-[10px] scale-[1.03]'
              : loaded
                ? 'opacity-100 transition-opacity duration-500'
                : 'opacity-0',
            imgClassName || className,
          )}
          {...props}
        />
      )}
    </div>
  )
}