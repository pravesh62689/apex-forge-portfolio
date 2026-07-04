import { Reveal } from '@/components/reveal'
import { addons, whatsappLink } from '@/lib/site-config'

export function Addons() {
  return (
    <section id="addons" className="py-20 lg:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Build it your way
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance max-w-3xl">
            Any feature, any package — priced per feature
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            You shouldn&apos;t have to buy a bigger package for one feature. Add exactly what
            your business needs to any tier — the price of the feature is all you pay extra.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {addons.map((addon, i) => (
            <Reveal key={addon.name} delay={i * 60} variant="zoom" className="h-full">
              <a
                href={whatsappLink(
                  `Hi Apex Forge! I'd like to know more about adding "${addon.name}" to my website.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift group flex h-full flex-col rounded-2xl border border-border bg-card p-6 hover:border-primary/40"
              >
                <h3 className="font-display text-base font-bold">{addon.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {addon.desc}
                </p>
                <p className="mt-4 text-sm font-bold text-primary transition-transform duration-300 origin-left group-hover:scale-110">
                  Ask for a quote →
                </p>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 text-sm text-muted-foreground">
            Exact price depends on your specific requirement — we confirm it before any work
            begins, and it never changes mid-project.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
