import { Search, MessageCircle, Star, TrendingUp, MapPin, Zap } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const mechanisms = [
  {
    icon: Search,
    title: 'Get found when customers search',
    desc: 'When someone nearby searches "best salon near me" or "dentist in Noida", a properly optimised website with local SEO and structured data is what puts you in those results. No website means that customer finds your competitor instead.',
  },
  {
    icon: MapPin,
    title: 'Turn Google Maps lookers into visitors',
    desc: 'People check your Google listing before visiting. A listing that links to a fast, professional website converts far better than one that goes nowhere — it answers their questions before they even call.',
  },
  {
    icon: MessageCircle,
    title: 'Capture enquiries 24/7, even when closed',
    desc: 'One-tap WhatsApp buttons and enquiry forms mean a customer browsing at 11pm can still reach you. You wake up to leads instead of losing them to whoever answered first.',
  },
  {
    icon: Star,
    title: 'Put your real reviews to work',
    desc: 'Your happy customers already left Google reviews. We put them on your site where new customers see them at the exact moment they are deciding — social proof doing the selling for you.',
  },
  {
    icon: Zap,
    title: 'Speed keeps customers from leaving',
    desc: 'Most visitors abandon slow sites within seconds — especially on mobile data. We build on modern static technology so your pages load near-instantly, which means fewer lost visitors and better Google rankings.',
  },
  {
    icon: TrendingUp,
    title: 'Look bigger than your competition',
    desc: 'A premium website changes how customers perceive your prices and quality before they walk in. When your online presence looks professional, customers expect — and accept — professional service.',
  },
]

export function Growth() {
  return (
    <section id="growth" className="py-20 lg:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            How a website grows your business
          </p>
          <h2 className="mx-auto mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance max-w-3xl">
            More reach. More enquiries. More sales. Here&apos;s exactly how.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            No inflated promises — these are the real, well-understood mechanisms by which a
            good website brings local businesses more customers.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mechanisms.map((m, i) => (
            <Reveal
              key={m.title}
              delay={i * 80}
              variant={i % 3 === 0 ? 'left' : i % 3 === 2 ? 'right' : 'up'}
              className="h-full"
            >
              <div className="hover-lift group flex h-full flex-col rounded-2xl border border-border bg-card p-7 hover:border-primary/30">
                <span className="icon-pop flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                  <m.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-balance">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
