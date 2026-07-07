'use client'
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion'
import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { RevealOrchestrator } from '@/components/orchestrator/reveal-orchestrator'
import { SkeletonImage } from '@/components/orchestrator/skeleton-image'
import { motionPresets } from '@/lib/motion-presets'
import type { Tier, NicheTheme, NicheContent, Niche } from '@/lib/niche-config'

/** Dentist signature — draggable before/after slider on Premium, tap-toggle on Moderate. */
export function BeforeAfterSection({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  const set = content.beforeAfter?.[0]
  const [showAfter, setShowAfter] = useState(false)
  const x = useMotionValue(50)
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  if (!set) return null

  const draggable = tier === 'premium' && !reduced

  function handleDrag(clientX: number) {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100))
    x.set(pct)
  }

  return (
    <section className={cn('py-20 md:py-28', theme.bg)} data-testid="before-after-section">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <RevealOrchestrator tier={tier} className="mb-8">
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            The proof is in the transformation.
          </h2>
          <p className={cn('mt-3', theme.textMuted)}>{set.label}</p>
        </RevealOrchestrator>

        <RevealOrchestrator tier={tier}>
          <div
            ref={ref}
            className="relative aspect-[16/10] rounded-3xl overflow-hidden ring-1 ring-black/10 select-none touch-none"
            onMouseMove={draggable ? (e) => handleDrag(e.clientX) : undefined}
            onTouchMove={draggable ? (e) => handleDrag(e.touches[0].clientX) : undefined}
            onClick={tier === 'moderate' ? () => setShowAfter((v) => !v) : undefined}
            data-testid="before-after-container"
          >
            <SkeletonImage src={set.before} alt="Before" tier={tier} aspect="aspect-[16/10]" className="absolute inset-0" accentHex={theme.primaryHex} />
            <motion.div
              className="absolute inset-0"
              style={
                draggable
                  ? { clipPath: useTransform(x, (v) => `inset(0 0 0 ${v}%)`) }
                  : { clipPath: showAfter ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)', transition: 'clip-path 500ms ease' }
              }
            >
              <SkeletonImage src={set.after} alt="After" tier={tier} aspect="aspect-[16/10]" className="absolute inset-0" accentHex={theme.primaryHex} />
            </motion.div>
            {/* Divider handle — draggable on Premium */}
            {draggable && (
              <motion.div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                style={{ left: useTransform(x, (v) => `${v}%`) }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-2xl" style={{ color: theme.primaryHex }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 4l-7 8 7 8V4zm6 0v16l7-8-7-8z"/></svg>
                </div>
              </motion.div>
            )}
            <div className="absolute top-4 left-4 rounded-full bg-black/60 text-white px-3 py-1 text-xs font-semibold">Before</div>
            <div className="absolute top-4 right-4 rounded-full text-white px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.primaryHex }}>After</div>
          </div>
        </RevealOrchestrator>
      </div>
    </section>
  )
}

/** Parallax masonry gallery — restaurant/gym/salon. */
export function GallerySection({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  const reduced = useReducedMotion()
  return (
    <section className={cn('py-20 md:py-28 overflow-hidden', theme.bg)} data-testid="gallery-section">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <RevealOrchestrator tier={tier} className="mb-10 max-w-2xl">
          <p className={cn('text-xs font-semibold uppercase tracking-widest mb-3', theme.primaryText)}>Gallery</p>
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            A look inside.
          </h2>
        </RevealOrchestrator>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {content.galleryImages.map((img, i) => {
            const isTall = i % 3 === 1
            return (
              <motion.div
                key={i}
                initial={reduced ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ ...motionPresets.confident, delay: i * 0.08 }}
                whileHover={tier === 'premium' && !reduced ? { y: -8 } : undefined}
                className={cn('relative', isTall && 'md:row-span-2')}
                data-testid={`gallery-item-${i}`}
              >
                <SkeletonImage src={img.src} alt={img.alt} tier={tier} aspect={isTall ? 'aspect-[3/4]' : 'aspect-[4/3]'} className="rounded-2xl" accentHex={theme.primaryHex} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/** Tech signature — animated data-flow pipeline. */
export function DataFlowSection({ tier, theme }: { tier: Tier; theme: NicheTheme }) {
  const reduced = useReducedMotion()
  const stages = ['REQUEST', 'ENCRYPT', 'PROCESS', 'RESPOND']
  const animated = tier === 'premium' && !reduced

  return (
    <section className={cn('py-20 md:py-32', theme.bg)} data-testid="data-flow-section">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <RevealOrchestrator tier={tier} className="mb-14 max-w-2xl">
          <p className={cn('text-xs font-semibold uppercase tracking-widest mb-3', theme.accentText)} style={{ fontFamily: theme.fontBody }}>
            $ zero-trust.pipeline
          </p>
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            Every request. Verified.
          </h2>
        </RevealOrchestrator>

        <div className="relative rounded-3xl p-6 md:p-10 ring-1 ring-white/10 bg-white/[0.02] overflow-hidden">
          <div className="relative flex items-center justify-between gap-2 md:gap-6">
            {stages.map((s, i) => (
              <div key={s} className="flex-1 text-center relative z-10">
                <div
                  className={cn(
                    'mx-auto h-14 w-14 md:h-16 md:w-16 rounded-2xl flex items-center justify-center ring-1',
                    'bg-slate-900 ring-white/10',
                  )}
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: theme.accentHex, boxShadow: `0 0 20px ${theme.accentHex}` }}
                  />
                </div>
                <p className={cn('mt-3 text-[10px] md:text-xs font-semibold tracking-widest uppercase', theme.textMuted)} style={{ fontFamily: theme.fontBody }}>
                  {s}
                </p>
              </div>
            ))}

            {/* Pipeline base line */}
            <div className="absolute top-7 md:top-8 left-[10%] right-[10%] h-px bg-white/10 -z-0" />

            {/* Animated pulse */}
            {animated && (
              <motion.div
                className="absolute top-6 md:top-7 h-2 w-2 rounded-full -z-0"
                style={{ backgroundColor: theme.accentHex, boxShadow: `0 0 20px ${theme.accentHex}` }}
                animate={{ left: ['10%', '90%'] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Gym class schedule — momentum drag on Premium. */
export function ScheduleSection({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  const days = content.classes ?? []
  const today = new Date().getDay() // 0=Sun
  const todayIdx = ((today + 6) % 7) // Mon-first

  return (
    <section className={cn('py-20 md:py-28 overflow-hidden', theme.bg)} data-testid="schedule-section">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <RevealOrchestrator tier={tier} className="mb-8">
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            THIS WEEK. ON THE FLOOR.
          </h2>
        </RevealOrchestrator>

        <motion.div
          drag={tier === 'premium' ? 'x' : false}
          dragConstraints={{ left: -400, right: 0 }}
          className="flex gap-3 md:gap-4 pb-4 cursor-grab active:cursor-grabbing"
        >
          {days.map((d, i) => (
            <div
              key={d.day}
              className={cn(
                'shrink-0 w-[220px] rounded-2xl p-5 ring-1',
                i === todayIdx ? 'ring-2' : theme.isDark ? 'ring-white/10' : 'ring-black/5',
                theme.surface,
              )}
              style={i === todayIdx ? { borderColor: theme.primaryHex, boxShadow: `0 0 40px ${theme.primaryHex}33` } : undefined}
              data-testid={`schedule-day-${d.day.toLowerCase()}`}
            >
              <p className={cn('text-xs font-semibold uppercase tracking-widest mb-4', i === todayIdx ? theme.primaryText : theme.textMuted)}>
                {d.day} {i === todayIdx && '· TODAY'}
              </p>
              <div className="space-y-3">
                {d.slots.map((slot) => (
                  <div key={slot.time} className={cn('flex items-baseline justify-between gap-3', theme.text)}>
                    <div>
                      <p className="font-bold">{slot.name}</p>
                      <p className={cn('text-xs', theme.textMuted)}>Coach {slot.coach}</p>
                    </div>
                    <span className={cn('text-sm font-mono', theme.primaryText)}>{slot.time}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/** Coaching signature — batch/course cards with tilt + urgency pulse on Premium. */
export function CoursesSection({ tier, theme, content }: { tier: Tier; theme: NicheTheme; content: NicheContent }) {
  const reduced = useReducedMotion()
  return (
    <section className={cn('py-20 md:py-28', theme.bg)} data-testid="courses-section">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <RevealOrchestrator tier={tier} className="mb-10 max-w-2xl">
          <p className={cn('text-xs font-semibold uppercase tracking-widest mb-3', theme.primaryText)}>Batches open now</p>
          <h2 className={cn('text-3xl md:text-5xl font-bold', theme.text)} style={{ fontFamily: theme.fontHeading }}>
            Pick your path. Show up.
          </h2>
        </RevealOrchestrator>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.courses?.map((c, i) => (
            <motion.div
              key={c.name}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ ...motionPresets.confident, delay: i * 0.08 }}
              whileHover={tier === 'premium' && !reduced ? { rotateY: 6, rotateX: -3, y: -6 } : tier === 'moderate' && !reduced ? { y: -4 } : undefined}
              style={{ transformStyle: 'preserve-3d' }}
              className={cn(
                'relative rounded-3xl p-6 ring-1 flex flex-col',
                theme.surface,
                theme.isDark ? 'ring-white/10' : 'ring-black/5',
              )}
              data-testid={`course-card-${i}`}
            >
              {tier === 'premium' && c.seatsLeft <= 8 && (
                <motion.span
                  className="absolute -top-2 -right-2 rounded-full text-white text-xs font-bold px-3 py-1 shadow-lg"
                  style={{ backgroundColor: theme.primaryHex }}
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                >
                  {c.seatsLeft} seats left
                </motion.span>
              )}
              <p className={cn('text-xs font-semibold uppercase tracking-widest', theme.primaryText)}>{c.duration}</p>
              <h3 className={cn('mt-2 text-lg font-bold', theme.text)}>{c.name}</h3>
              <p className={cn('mt-2 text-sm flex-1', theme.textMuted)}>{c.desc}</p>
              <p className={cn('mt-4 text-xl font-bold', theme.primaryText)}>{c.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}