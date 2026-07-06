'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

type Variant = 'up' | 'left' | 'right' | 'zoom' | 'blur'

const variantClass: Record<Variant, string> = {
  up: 'reveal',
  left: 'reveal-left',
  right: 'reveal-right',
  zoom: 'reveal-zoom',
  blur: 'reveal-blur',
}

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  variant?: 'up' | 'left' | 'right' | 'zoom' | 'blur' | 'none';
  className?: string;
}

export function Reveal({ 
  children, 
  width = '100%', 
  delay = 0, 
  direction, 
  variant = 'up',
  className
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  // Map variant to direction if direction is not provided
  const dir = direction || (variant === 'left' ? 'left' : variant === 'right' ? 'right' : variant === 'none' ? 'none' : 'up');
  
  // Convert delay in milliseconds to seconds if it looks like milliseconds (>= 1)
  const finalDelay = delay >= 1 ? delay / 1000 : delay;

  const variants = {
    hidden: { 
      opacity: 0, 
      y: dir === 'up' ? 40 : 0,
      x: dir === 'left' ? 40 : dir === 'right' ? -40 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { duration: 0.6, delay: finalDelay, ease: [0.22, 1, 0.36, 1] as const }
    },
  };

  return (
    <div ref={ref} className={className} style={{ position: 'relative', width, overflow: 'hidden' }}>
      <motion.div variants={variants} initial="hidden" animate={mainControls}>
        {children}
      </motion.div>
    </div>
  )
}



/** 3D tilt-on-hover wrapper. Wrap any card to give it perspective tilt. */
export function TiltCard({
  children,
  className = '',
  maxTilt = 8,
}: {
  children: ReactNode
  className?: string
  maxTilt?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `rotateY(${px * maxTilt}deg) rotateX(${-py * maxTilt}deg)`
  }

  function handleLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = 'rotateY(0deg) rotateX(0deg)'
  }

  return (
    <div className="tilt-wrap">
      <div
        ref={ref}
        className={`tilt-card ${className}`}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </div>
    </div>
  )
}

/** Animated number counter that counts up when scrolled into view. */
export function CountUp({
  end,
  duration = 1400,
  suffix = '',
  prefix = '',
  className = '',
}: {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.unobserve(el)
            const start = performance.now()
            const tick = (now: number) => {
              const t = Math.min((now - start) / duration, 1)
              const eased = 1 - Math.pow(1 - t, 3)
              setValue(Math.round(end * eased))
              if (t < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}
