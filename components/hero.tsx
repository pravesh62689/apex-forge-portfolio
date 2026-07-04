import dynamic from 'next/dynamic'
import { ArrowRight, Mail, ChevronDown } from 'lucide-react'
import { siteConfig, whatsappLink, defaultWhatsappMessage } from '@/lib/site-config'

const HeroScene = dynamic(() => import('@/components/hero-scene'))

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-grid">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_75%)]" />

      {/* Ambient floating orbs */}
      <div
        className="orb h-72 w-72 bg-primary/20 -top-20 -left-20"
        aria-hidden="true"
      />
      <div
        className="orb h-96 w-96 bg-accent/10 top-1/3 -right-32"
        style={{ animationDelay: '-6s' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
          <div className="lg:col-span-7 relative z-10 hero-stagger">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-wide text-primary uppercase glow-pulse">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Websites for local businesses — {siteConfig.location}
            </p>

            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-balance">
              Your business deserves a website that{' '}
              <span className="text-shimmer">wins customers</span> — not just exists
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty">
              Fast, mobile-first websites that make your business look as good online as it is
              in person. A basic site goes live in 2 days, a complete growth site in 4 — and
              anything custom, we scope it honestly and build it right.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={whatsappLink(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_var(--primary)] active:scale-[0.98]"
              >
                Start on WhatsApp
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href={siteConfig.emailHref}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-base font-bold text-foreground transition-all duration-300 hover:bg-secondary hover:border-primary/40 hover:scale-[1.03] active:scale-[0.98]"
              >
                <Mail
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
                  aria-hidden="true"
                />
                {siteConfig.email}
              </a>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Direct from a software engineer — no agency markup, no hidden fees. You see your
              website before you pay.
            </p>
          </div>

          <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-[520px]">
            <HeroScene />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 hidden lg:flex justify-center">
          <a
            href="#showcase"
            className="flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
            aria-label="Scroll to see our work"
          >
            <span className="text-[11px] font-semibold uppercase tracking-widest">Scroll</span>
            <span className="flex h-9 w-6 items-start justify-center rounded-full border border-border pt-1.5">
              <ChevronDown className="scroll-dot h-3 w-3" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
