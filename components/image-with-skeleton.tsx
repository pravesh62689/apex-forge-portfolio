'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function ImageWithSkeleton({
  src,
  alt,
  className,
  wrapperClassName,
  imgClassName,
  width,
  height,
  fill,
  loading = 'lazy',
  ...props
}: any) {
  const [isLoaded, setIsLoaded] = useState(false);

  const hasSize = width || height || fill;

  return (
    <div className={cn('relative overflow-hidden', wrapperClassName || className)}>
      {!isLoaded && (
        <div className="absolute inset-0 z-10 shimmer rounded-inherit" />
      )}
      {hasSize ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          loading={loading}
          className={cn(
            'transition-opacity duration-700 ease-in-out',
            isLoaded ? 'opacity-100' : 'opacity-0',
            imgClassName || className
          )}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          className={cn(
            'transition-opacity duration-700 ease-in-out',
            isLoaded ? 'opacity-100' : 'opacity-0',
            imgClassName || className
          )}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
    </div>
  );
}
