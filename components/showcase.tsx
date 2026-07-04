import Link from 'next/link'
import { Reveal, TiltCard } from '@/components/reveal'
import { whatsappLink } from '@/lib/site-config'
import { demos } from '@/lib/demos'
import { DeviceShowcase } from '@/components/device-showcase'

export function Showcase() {
  return (
    <section id="demos" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Live demos</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance max-w-3xl">
            Explore real websites I&apos;ve built — switch tiers inside each demo
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            See your business on every screen — each preview shows the website live on a laptop
            and phone. Open a demo and flip between Basic, Growth and Premium to watch it grow
            from a sharp single-page site into a full multi-page experience with live booking
            that turns visitors into paying customers.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {demos.map((demo, i) => (
            <Reveal key={demo.slug} delay={i * 70} variant={i % 2 === 0 ? 'up' : 'zoom'} className="h-full">
              <TiltCard className="h-full rounded-2xl">
                <Link
                  href={`/demos/${demo.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40"
                >
                  <div
                    className="relative overflow-hidden px-4 pt-6"
                    style={{ background: `radial-gradient(ellipse at 50% 120%, ${demo.accentSoft}, transparent 70%)` }}
                  >
                    <DeviceShowcase demo={demo} />
                    <span
                      className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{ backgroundColor: demo.accent }}
                    >
                      {demo.industry}
                    </span>
                  </div>
                  <div className="tilt-inner flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-bold">{demo.business}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{demo.tagline}</p>
                    <span className="mt-4 inline-block text-sm font-bold text-primary transition-transform duration-300 group-hover:translate-x-1">
                      Open live demo →
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}

          <Reveal delay={350} variant="blur" className="h-full">
            <a
              href={whatsappLink(
                'Hi Apex Forge! My business is in a different industry. Can you build a website for it too?',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-lift group flex h-full flex-col justify-center rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-7 hover:bg-primary/10"
            >
              <h3 className="font-display text-xl font-bold text-primary">A different business?</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Retail, real estate, services, events — the same craft applies. Tell me what you do
                and I&apos;ll show you what&apos;s possible.
              </p>
              <span className="mt-5 text-sm font-bold text-primary">Chat with me →</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
