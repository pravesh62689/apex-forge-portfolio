import { Code2, IndianRupee, MessageCircle, Zap } from 'lucide-react'
import { Reveal, TiltCard } from '@/components/reveal'
import { ImageWithSkeleton } from '@/components/image-with-skeleton'
import { siteConfig, whatsappLink } from '@/lib/site-config'

const points = [
  {
    icon: Code2,
    title: 'You talk to the engineer',
    desc: 'No sales team, no middlemen. The person you message is the person who writes your code.',
  },
  {
    icon: IndianRupee,
    title: 'No agency markup',
    desc: 'Agencies charge for offices and managers. You pay only for engineering — same quality, cheaper.',
  },
  {
    icon: Zap,
    title: 'Faster decisions, faster delivery',
    desc: 'One engineer, direct communication. Changes discussed in the morning ship the same day.',
  },
  {
    icon: MessageCircle,
    title: 'Direct support after launch',
    desc: 'Your WhatsApp goes to the developer who built the site — not a ticket queue.',
  },
]

export function Developer() {
  return (
    <section id="developer" className="relative py-24 sm:py-32">
      <div className="orb left-[-10%] top-[20%] h-72 w-72 bg-primary/10" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal variant="left">
            <div className="relative">
              <div className="tilt-wrap">
                <TiltCard className="rounded-3xl">
                  <img
                    src="/images/dev-demo-review.jpg"
                    alt="Pravesh, the software engineer behind Apex Forge, reviewing a client demo website at his desk"
                    className="w-full rounded-3xl border border-border object-cover"
                  />
                </TiltCard>
              </div>
              <div className="absolute -bottom-5 left-6 right-6 grid grid-cols-2 gap-3 sm:left-10 sm:right-10">
                <img
                  src="/images/dev-coding.jpg"
                  alt="Coding a client website in a home studio in Noida"
                  className="hover-lift h-24 w-full rounded-xl border border-border object-cover sm:h-28"
                />
                <img
                  src="/images/dev-research.jpg"
                  alt="Researching local Noida businesses that need websites"
                  className="hover-lift h-24 w-full rounded-xl border border-border object-cover sm:h-28"
                />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal variant="right">
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                Who builds your website
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
                You&apos;re hiring a <span className="text-shimmer">software engineer</span> — not
                an agency.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                I&apos;m {siteConfig.developer}, a software engineer in {siteConfig.location}. Every
                site here is designed, coded and launched by me personally — which is exactly why I
                can deliver agency-level work at engineer-level prices.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {points.map((p, i) => (
                <Reveal key={p.title} delay={i * 90} variant="zoom">
                  <div className="hover-lift group h-full rounded-2xl border border-border bg-card p-5 hover:border-primary/30">
                    <p.icon className="icon-pop h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="mt-3 text-sm font-bold">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={300}>
              <a
                href={whatsappLink(
                  'Hi Pravesh! I saw your Apex Forge site and want to talk about a website for my business.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-[1.03] hover:shadow-[0_0_32px_-8px_var(--primary)] active:scale-[0.98]"
              >
                Talk directly to the developer
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
