import type { Demo } from '@/lib/demos'

/**
 * CSS-3D laptop + phone mockup rendering a live mini version of the demo
 * website. Pure CSS transforms — fast, smooth, no WebGL cost per card.
 */
export function DeviceShowcase({ demo }: { demo: Demo }) {
  const accent = demo.accent
  const soft = demo.accentSoft

  return (
    <div className="device-stage" aria-hidden="true">
      {/* Laptop */}
      <div className="device-laptop">
        <div className="device-laptop-screen" style={{ borderColor: '#1f242c' }}>
          {/* Mini website inside the laptop */}
          <div className="flex h-full w-full flex-col overflow-hidden rounded-[6px] bg-white text-left">
            <div
              className="flex items-center justify-between px-2.5 py-1.5"
              style={{ backgroundColor: accent }}
            >
              <span className="text-[7px] font-bold text-white">{demo.business}</span>
              <span className="flex gap-1">
                <span className="h-[3px] w-4 rounded-full bg-white/60" />
                <span className="h-[3px] w-4 rounded-full bg-white/60" />
                <span className="h-[3px] w-4 rounded-full bg-white/60" />
              </span>
            </div>
            <div className="relative flex-1">
              <img
                src={demo.card || '/placeholder.svg'}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-1.5 left-2 right-2">
                <p className="text-[7px] font-bold leading-tight text-white">{demo.tagline}</p>
                <span
                  className="mt-1 inline-block rounded-full px-2 py-[2px] text-[6px] font-bold text-white"
                  style={{ backgroundColor: accent }}
                >
                  WhatsApp Us
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="device-laptop-base" />
      </div>

      {/* Floating phone */}
      <div className="device-phone">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-[10px] bg-white">
          <div className="px-2 py-1.5" style={{ backgroundColor: accent }}>
            <p className="text-[6px] font-bold text-white">{demo.business}</p>
          </div>
          <div className="flex flex-1 flex-col gap-1 p-2" style={{ backgroundColor: '#fff' }}>
            <div className="h-9 w-full overflow-hidden rounded-[4px]">
              <img src={demo.card || '/placeholder.svg'} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="h-[4px] w-4/5 rounded-full" style={{ backgroundColor: soft }} />
            <div className="h-[4px] w-3/5 rounded-full" style={{ backgroundColor: soft }} />
            <div
              className="mt-auto rounded-full py-1 text-center text-[6px] font-bold text-white"
              style={{ backgroundColor: accent }}
            >
              Book Now
            </div>
          </div>
        </div>
      </div>

      {/* Income sparkle — customers → revenue cue */}
      <div className="device-badge" style={{ backgroundColor: accent }}>
        <span className="text-[10px] font-bold text-white">↑ Customers</span>
      </div>
    </div>
  )
}
