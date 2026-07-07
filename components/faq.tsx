import { Reveal } from '@/components/orchestrator/reveal-orchestrator'
import { ChevronDown } from 'lucide-react'
import { faqs } from '@/lib/knowledge'

export function Faq() {
  return (
    <section id="faq" className="py-20 lg:py-28 border-t border-border">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Straight answers
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            Questions every smart business owner asks
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 60} variant={i % 2 === 0 ? 'left' : 'right'}>
              <details className="group rounded-2xl border border-border bg-card transition-all duration-300 open:border-primary/30 open:shadow-[0_0_32px_-16px_var(--primary)] hover:border-primary/20">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-base font-bold list-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
