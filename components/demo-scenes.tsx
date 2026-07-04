/**
 * Animated, category-specific illustration scenes (pure SVG + CSS keyframes).
 * Doctor checking a patient, barber cutting hair, chef with pizza,
 * coach teaching, trainer lifting — each themed with the demo accent.
 */
export function DemoScene({ slug, accent }: { slug: string; accent: string }) {
  const common = {
    className: 'h-full w-full',
    viewBox: '0 0 320 240',
    fill: 'none',
    role: 'img' as const,
  }
  const skin = '#e8b98a'
  const dark = '#2b3140'
  const soft = 'rgba(255,255,255,0.14)'

  if (slug === 'dental') {
    return (
      <svg {...common} aria-label="Animated doctor checking a patient with a stethoscope">
        {/* room */}
        <rect x="20" y="200" width="280" height="6" rx="3" fill={soft} />
        {/* patient chair */}
        <rect x="150" y="140" width="120" height="16" rx="8" fill={dark} />
        <rect x="250" y="110" width="14" height="46" rx="7" fill={dark} />
        {/* patient (reclined) */}
        <g className="anim-breathe">
          <circle cx="170" cy="128" r="16" fill={skin} />
          <rect x="182" y="120" width="76" height="22" rx="11" fill={accent} opacity="0.85" />
        </g>
        {/* doctor */}
        <g className="anim-lean">
          <circle cx="96" cy="78" r="18" fill={skin} />
          <rect x="74" y="98" width="44" height="64" rx="14" fill="#f4f6fa" />
          <rect x="88" y="98" width="16" height="30" rx="6" fill={accent} />
          {/* stethoscope */}
          <path
            d="M96 96 q-14 30 8 44"
            stroke={dark}
            strokeWidth="3.5"
            strokeLinecap="round"
            className="anim-steth"
          />
          <circle cx="106" cy="142" r="6" fill={accent} className="anim-steth" />
          {/* arm reaching to patient */}
          <path d="M114 112 q26 8 42 14" stroke={skin} strokeWidth="8" strokeLinecap="round" />
        </g>
        {/* sparkle tooth */}
        <g className="anim-twinkle">
          <path d="M262 60 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 z" fill={accent} />
        </g>
        {/* heartbeat line */}
        <path
          d="M30 40 h40 l8 -14 10 26 8 -12 h44"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
          className="anim-dash"
        />
      </svg>
    )
  }

  if (slug === 'salon') {
    return (
      <svg {...common} aria-label="Animated barber giving a haircut">
        <rect x="20" y="200" width="280" height="6" rx="3" fill={soft} />
        {/* mirror */}
        <rect x="36" y="34" width="70" height="96" rx="10" fill={soft} />
        {/* client on chair */}
        <rect x="168" y="168" width="64" height="12" rx="6" fill={dark} />
        <rect x="194" y="132" width="12" height="40" rx="6" fill={dark} />
        <g>
          <circle cx="200" cy="96" r="20" fill={skin} />
          {/* hair being styled */}
          <path d="M182 88 q18 -22 36 0 v-8 q-18 -16 -36 0 z" fill={dark} />
          <rect x="176" y="116" width="48" height="44" rx="14" fill={accent} opacity="0.85" />
        </g>
        {/* falling hair snippets */}
        <g className="anim-fall">
          <path d="M188 128 q3 4 0 8" stroke={dark} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M212 132 q-3 4 0 8" stroke={dark} strokeWidth="2.5" strokeLinecap="round" />
        </g>
        {/* barber */}
        <g className="anim-lean">
          <circle cx="120" cy="82" r="17" fill={skin} />
          <rect x="100" y="100" width="42" height="62" rx="14" fill={dark} />
          <path d="M140 112 q22 -6 38 -14" stroke={skin} strokeWidth="8" strokeLinecap="round" />
        </g>
        {/* scissors snipping */}
        <g className="anim-snip" style={{ transformOrigin: '180px 92px' }}>
          <path d="M168 84 l24 10 M168 100 l24 -8" stroke={accent} strokeWidth="4" strokeLinecap="round" />
          <circle cx="166" cy="82" r="5" stroke={accent} strokeWidth="3" />
          <circle cx="166" cy="102" r="5" stroke={accent} strokeWidth="3" />
        </g>
        <g className="anim-twinkle">
          <path d="M70 60 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" fill={accent} />
        </g>
      </svg>
    )
  }

  if (slug === 'coaching') {
    return (
      <svg {...common} aria-label="Animated teacher explaining a rising results chart to students">
        <rect x="20" y="200" width="280" height="6" rx="3" fill={soft} />
        {/* whiteboard */}
        <rect x="150" y="34" width="140" height="94" rx="8" fill="#f4f6fa" />
        <path
          d="M166 110 l28 -22 22 10 34 -34 20 8"
          stroke={accent}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="anim-dash"
        />
        <path d="M262 60 l10 -12 4 16 z" fill={accent} className="anim-twinkle" />
        {/* teacher pointing */}
        <g className="anim-lean">
          <circle cx="112" cy="80" r="18" fill={skin} />
          <rect x="92" y="100" width="42" height="64" rx="14" fill={accent} opacity="0.9" />
          <path d="M132 108 q18 -14 30 -22" stroke={skin} strokeWidth="8" strokeLinecap="round" />
        </g>
        {/* students */}
        <g className="anim-breathe">
          <circle cx="52" cy="150" r="12" fill={skin} />
          <rect x="38" y="164" width="28" height="30" rx="10" fill={dark} />
          <circle cx="96" cy="158" r="12" fill={skin} />
          <rect x="82" y="172" width="28" height="26" rx="10" fill={dark} />
        </g>
        {/* A+ badge */}
        <g className="anim-bob">
          <circle cx="272" cy="160" r="18" fill={accent} />
          <text x="272" y="166" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff">
            A+
          </text>
        </g>
      </svg>
    )
  }

  if (slug === 'gym') {
    return (
      <svg {...common} aria-label="Animated trainer lifting a barbell">
        <rect x="20" y="200" width="280" height="6" rx="3" fill={soft} />
        {/* lifter */}
        <g>
          <circle cx="160" cy="98" r="18" fill={skin} />
          <rect x="138" y="118" width="44" height="58" rx="14" fill={dark} />
          <rect x="140" y="172" width="14" height="30" rx="7" fill={dark} />
          <rect x="166" y="172" width="14" height="30" rx="7" fill={dark} />
        </g>
        {/* barbell moving up and down */}
        <g className="anim-lift">
          <rect x="60" y="64" width="200" height="6" rx="3" fill="#8a93a6" />
          <rect x="66" y="48" width="16" height="38" rx="5" fill={accent} />
          <rect x="238" y="48" width="16" height="38" rx="5" fill={accent} />
          <path d="M132 96 l14 -26 M188 96 l-14 -26" stroke={skin} strokeWidth="9" strokeLinecap="round" />
        </g>
        {/* effort sparks */}
        <g className="anim-twinkle">
          <path d="M92 130 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" fill={accent} />
          <path d="M236 140 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" fill={accent} />
        </g>
        {/* progress bar */}
        <rect x="110" y="216" width="100" height="8" rx="4" fill={soft} />
        <rect x="110" y="216" width="70" height="8" rx="4" fill={accent} className="anim-grow" />
      </svg>
    )
  }

  // restaurant (default)
  return (
    <svg {...common} aria-label="Animated chef tossing a pizza with rising steam">
      <rect x="20" y="200" width="280" height="6" rx="3" fill={soft} />
      {/* counter */}
      <rect x="60" y="164" width="200" height="14" rx="7" fill={dark} />
      {/* chef */}
      <g className="anim-lean">
        <circle cx="150" cy="92" r="18" fill={skin} />
        {/* chef hat */}
        <path d="M132 82 q0 -22 18 -22 q18 0 18 22 z" fill="#f4f6fa" />
        <rect x="128" y="112" width="44" height="54" rx="14" fill="#f4f6fa" />
        <path d="M170 120 q20 -18 26 -34" stroke={skin} strokeWidth="8" strokeLinecap="round" />
      </g>
      {/* tossed pizza */}
      <g className="anim-toss">
        <circle cx="204" cy="66" r="22" fill="#f5c26b" />
        <circle cx="204" cy="66" r="16" fill="#e8734a" />
        <circle cx="198" cy="62" r="3" fill="#fff" />
        <circle cx="210" cy="70" r="3" fill="#fff" />
      </g>
      {/* coffee cup + steam */}
      <g>
        <rect x="86" y="142" width="26" height="22" rx="5" fill={accent} />
        <path d="M112 148 q10 2 0 10" stroke={accent} strokeWidth="4" fill="none" />
        <g className="anim-steam">
          <path d="M94 134 q4 -8 0 -14" stroke="#cbd2de" strokeWidth="3" strokeLinecap="round" />
          <path d="M104 134 q-4 -8 0 -14" stroke="#cbd2de" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>
      <g className="anim-twinkle">
        <path d="M252 120 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 z" fill={accent} />
      </g>
    </svg>
  )
}
