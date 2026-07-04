import { Phone, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { siteConfig, whatsappLink, defaultWhatsappMessage } from '@/lib/site-config'

export function FinalCta() {
  return (
    <section className="border-t border-border bg-grid">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <Reveal variant="blur" className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Your competitors are one search away.{' '}
            <span className="text-shimmer">Make sure customers find you first.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Message us now — tell us your business name and what you do. We&apos;ll reply with a
            plan, a fixed price, and a delivery date.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <a
              href={whatsappLink(defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_var(--primary)] active:scale-[0.98]"
            >
              Message on WhatsApp
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-base font-bold text-foreground transition-all duration-300 hover:bg-secondary hover:border-primary/40 hover:scale-[1.03] active:scale-[0.98]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 border border-primary/30">
              <span className="font-display text-xs font-bold text-primary">AF</span>
            </span>
            <span className="font-display text-sm font-bold">{siteConfig.brand}</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {siteConfig.tagline} · {siteConfig.location}
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.brand}. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  )
}
