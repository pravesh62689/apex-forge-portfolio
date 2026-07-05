import type { Demo } from '@/lib/demos'

/**
 * Clean, realistic browser-window preview of the demo site.
 * Shows the actual website screenshot inside a simple browser chrome —
 * fast, responsive and not over-engineered.
 */
export function DeviceShowcase({ demo }: { demo: Demo }) {
  return (
    <div className="w-full" aria-hidden="true">
      <div className="overflow-hidden rounded-t-xl border border-b-0 border-border bg-card shadow-lg">
        {/* Browser top bar */}
        <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-3 py-2">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </span>
          <span className="ml-2 flex-1 truncate rounded-md bg-background/70 px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
            {demo.slug}.example.com
          </span>
        </div>
        {/* Live screenshot */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={demo.card || '/placeholder.svg'}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      </div>
    </div>
  )
}
