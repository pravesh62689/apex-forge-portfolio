# Portfolio Redesign V2 — Awwwards-Inspired, Performance-Honest Edition



| V1 said | V2 says | Why |
|---|---|---|
| No new JS animation libraries | Lenis + GSAP (ScrollTrigger, SplitText) | Both are genuinely free for commercial use (GSAP since April 2025) and add ~30KB total — not the same risk as Framer Motion + Three.js |
| "Selected Work" section = MechaniQ.AI | New "What I Build" capability section, no named project | You asked not to mention MechaniQ; real resume facts (Oritso, CTS/CBS, Redis, AES/JWT) carry the credibility instead |
| Real headshot placeholder | Same — but flagging that an AI-generated face is currently in that slot and needs replacing with an actual photo | Found in your execution log; this is a trust problem, not a polish problem |
| Unsplash/Pexels for all niche photography | Same, explicitly **not** AI-generated images | Your own feedback: the AI-generated interiors read as "childish" — this is a known failure mode of AI photography, not a one-off |
| Three-tier pricing | Same structure, but the external "decoy pricing / fake scarcity" tactics from your other doc are explicitly excluded | Three tiers is honest, sound pricing design; "only 5 spots available" when untrue is not — see Section 7 |

---

## 0. What the reference sites actually teach you (and what they don't)

You listed 40 Awwwards/Webby-winning sites — Lusion, Active Theory, Epic, BDSN Club, and others. I'm not going to pretend you can or should build what they built. Those are multi-person creative-technologist studios shipping 4-12 week WebGL builds where slow, immersive load time is *part of the brand statement* — the client is paying for the experience of being impressed, not for a fast page that converts a salon customer on 3G in Sector 62.

What's actually transferable, distilled to principles rather than tech stacks:

1. **Confident, oversized typography that moves with intent** — not decoration, but the headline itself becomes the visual centerpiece (Epic, Bureau Cool)
2. **Inertial smooth scroll** — the single biggest "this feels expensive" signal across nearly all of them, and the cheapest to replicate (3KB)
3. **Scroll as narrative, not just a list** — each section reveals like a beat in a story, not a static page flick
4. **Restraint in motion count** — the best ones animate fewer things, more deliberately, than the worst ones. If a visitor consciously notices "wow, animation," you've usually overdone it
5. **Cursor as a living element** — subtle reactivity (not gimmicks) signals craft
6. **Real, specific photography** — every one of these sites uses real shot imagery or deliberate illustration, never generic-looking AI output

What you're explicitly *not* taking: WebGL particle fields, custom shaders, 3D scenes, video-background hero sections, multi-second preloaders. Those cost load time you can't spend — your entire pitch to a dentist or salon owner is "fast site that won't lose your customer on bad signal." A 4-second preloader directly contradicts your own sales pitch.

---

## 1. The animation stack — confirmed free, confirmed lightweight

| Library | Size | License | Confirmed |
|---|---|---|---|
| **Lenis** | ~3KB | MIT | Free, open source, built specifically to sync with GSAP ScrollTrigger |
| **GSAP core + ScrollTrigger + SplitText** | ~50KB combined | Standard License, 100% free incl. commercial use since April 30, 2025 | Webflow acquired GreenSock and removed all paywalls; AI-generated GSAP code is explicitly permitted under the license |

No React, no Framer Motion, no Three.js. Both libraries work as plain `<script>` includes or npm packages inside Astro with zero framework migration.

### 1.1 Global setup — smooth scroll + reduced-motion respect

```js
// src/scripts/motion.js
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis;
if (!prefersReduced) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
// If prefersReduced is true, skip Lenis entirely — native instant scroll, no GSAP
// scroll-triggered motion either. Build every animation below inside this same guard.

export { gsap, ScrollTrigger, SplitText, prefersReduced };
```

Import this once in `Base.astro` via a `<script type="module" src="/src/scripts/motion.js">`. Every other animation script imports `gsap`/`ScrollTrigger`/`prefersReduced` from this file rather than re-registering plugins.

### 1.2 Headline reveal (Hero)

```js
if (!prefersReduced) {
  const split = SplitText.create('.hero-headline', { type: 'chars' });
  gsap.from(split.chars, {
    y: 40, opacity: 0, duration: 0.6, stagger: 0.02, ease: 'power3.out', delay: 0.2,
  });
}
```

### 1.3 Staggered card reveal (Showcase grid, demo grids)

```js
gsap.utils.toArray('.demo-card').forEach((card) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 85%', once: true },
    y: 40, opacity: 0, duration: 0.6, ease: 'power2.out',
  });
});
```

`once: true` matters — it fires once, doesn't re-trigger on scroll-back, keeps the trigger count low.

### 1.4 Trust Gap — pinned split reveal, desktop only

```js
gsap.matchMedia().add('(min-width: 768px)', () => {
  gsap.timeline({
    scrollTrigger: { trigger: '.trust-gap', start: 'top top', end: '+=80%', pin: true, scrub: 1 },
  })
    .from('.trust-gap .without-col', { xPercent: -60, opacity: 0 })
    .from('.trust-gap .with-col', { xPercent: 60, opacity: 0 }, '<');
});
// Below 768px: no pin, no scrub — just the Section 1.3 fade-in pattern. Pinned
// scroll-jacking is disorienting on touch screens; don't ship it there.
```

### 1.5 Magnetic CTA buttons

```js
document.querySelectorAll('.btn-magnetic').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
  });
});
// Skip entirely on touch devices — wrap the listener registration in
// window.matchMedia('(hover: hover)').matches
```

### 1.6 Cursor dot — cheap, not a library

```css
.cursor-dot {
  position: fixed; width: 8px; height: 8px; border-radius: 50%;
  background: var(--brand-primary); pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%); will-change: transform;
}
@media (hover: none) { .cursor-dot { display: none; } }
```
```js
const cursor = document.querySelector('.cursor-dot');
if (cursor && window.matchMedia('(hover: hover)').matches) {
  window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' });
  });
}
```

### 1.7 Ambient spotlight background (the "Lusion mouse-reactive depth" lesson, cheap version)

Pure CSS custom properties, no canvas, no WebGL:

```css
.spotlight-bg {
  background: radial-gradient(600px circle at var(--x, 50%) var(--y, 50%),
    rgba(99,102,241,0.08), transparent 60%);
}
```
```js
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--x', `${e.clientX}px`);
  document.documentElement.style.setProperty('--y', `${e.clientY}px`);
});
```

### 1.8 Performance guardrails — non-negotiable

- Animate only `transform` and `opacity`. Never animate `width`, `height`, `top`, `left`, or layout-affecting properties.
- Keep total active ScrollTrigger instances under ~30 across the whole page.
- Every animation above is already wrapped in or compatible with the `prefersReduced` check from 1.1 — do not ship one that isn't.
- Profile with Chrome DevTools Performance panel, CPU throttled 4×, before calling any page done.
- Target: Lighthouse Performance 90+, not 95+. The extra motion costs a few points versus a fully static page — that's an acceptable, deliberate trade against a fully static one. If a page drops below 85, something above is implemented wrong, not "acceptable cost."

---

## 2. Real photography — no AI-generated images, anywhere

Your own feedback after the last build: the AI-generated restaurant/clinic/salon/gym interiors read as fake and "childish." This is a known, common failure mode of AI-generated photography — slightly-wrong reflections, impossible architecture, uncanny staging — and it directly undercuts a site whose whole job is to look premium and real.

**Fix: real licensed stock photography only**, sourced from Unsplash or Pexels (both free for commercial use, no attribution required). Exact search terms per niche:

| Niche | Search terms |
|---|---|
| Restaurant | "fine dining interior warm", "restaurant plated dish overhead", "chef cooking kitchen" |
| Dentist/clinic | "modern dental clinic interior", "dentist patient consultation", "dental equipment clean" |
| Salon | "hair salon interior modern", "salon styling chair mirror", "hairstylist working client" |
| Coaching center | "students studying classroom modern", "tutor whiteboard teaching", "study group library" |
| Gym | "modern gym interior equipment", "personal trainer session", "gym weights dark moody" |

**Your headshot specifically:** the current file at `public/images/pravesh-headshot.jpg` is an AI-generated face per your build log, not a photo of you. Replace it with an actual photo before anything else ships. This isn't a style note — presenting a fabricated face as "this is me" to a business owner deciding whether to trust you with their money is the opposite of the trust this whole site is built to earn, and it's discoverable the moment anyone meets you or video-calls you.

---

## 3. About section — web developer framing, no named platform

Per your instruction, drop any mention of MechaniQ.AI. Use only what's true and doesn't require naming a specific proprietary product:

> I'm Pravesh, a full-stack web developer based in Noida. For the last two years I've built and maintained software for banking and financial institutions — systems that process cheque clearances, validate core banking transactions, and move money safely between systems that can't afford to go down.
>
> That might sound unrelated to a local salon or restaurant website, but it's not. The same discipline that goes into a banking system that can't fail is the discipline I bring to a one-page site that has to load fast, work on a customer's phone in bad signal, and never show a broken WhatsApp button.
>
> I'm not a template reseller. I'm an engineer who thinks your business deserves the same level of care I'd put into a banking system — just built fast, and priced for a local business, not a bank.

Stats row (real, from your background): **2+ Years in Fintech** / **3+ Institutions Supported** / **AES & JWT Security Background**. No client count, no fabricated number.

### "What I Build" — replaces the old MechaniQ-based "Selected Work" section

Three capability cards, each grounded in real resume content, none naming a proprietary platform:

1. **Security-first by default** — "AES encryption and JWT authentication aren't new concepts to me — they're what I build with daily for systems handling real financial data."
2. **Built for speed under load** — "Redis caching work that cut data-routing latency by over 30% across high-concurrency banking environments translates directly into a site that loads fast on a customer's phone."
3. **Production discipline** — "99.9% uptime compliance across multiple institutions means I don't ship something and walk away — I build things that keep working."

---

## 4. Tier justification — why pay more when AI can spin up a site in 5 minutes

You raised the real challenge directly: AI website builders make a basic page trivial now. The honest answer isn't to pretend Basic is secretly bad — it's to be specific about what a human engineer adds at each tier that a template generator can't:

| What a 5-minute AI builder gives you | What Standard/Premium add |
|---|---|
| Generic template, generic copy | Niche-specific conversion psychology — copy and layout decisions based on how *this type* of business's customers actually behave |
| Static contact form | Real working integrations — WhatsApp auto-routing, booking logic wired to something real, not a mockup |
| One-size animation or none | Bespoke scroll storytelling tuned to this business's actual photos and offer, built with the stack in Section 1 |
| No ongoing relationship | A maintenance plan and a person who picks up the phone when something breaks |
| No human review of what converts | Iteration based on what's actually working for this business's customers, not a template's generic assumption |

Tier comparison matrix — keep this real, no fabricated feature counts:

| Feature | Basic (₹6-8k) | Standard (₹12-15k) | Premium (₹20-30k) |
|---|---|---|---|
| Mobile responsive | ✓ | ✓ | ✓ |
| WhatsApp / call CTA | ✓ | ✓ | ✓ |
| Scroll-reveal animation (Section 1) | Minimal | Full | Full + pinned storytelling |
| FAQ / tabbed content | — | ✓ | ✓ |
| Image gallery | — | ✓ | ✓ |
| Booking/lead-capture logic | — | Basic form | Wired to a real backend or automation |
| Local SEO basics | — | ✓ | ✓ |
| Maintenance plan included | Add-on | Add-on | First month included |

### On scarcity: real, not fabricated

Do not add "only 5 spots available" or a countdown timer — that's a lie if untrue, and discoverable. A true, honest capacity statement is fine and you can actually say it: *"I take on a small number of projects each month alongside a full-time job, so turnaround is realistic, not rushed."* That's a real constraint, stated honestly, and it does the same psychological work without the lie.

---

## 5. Homepage section order (unchanged from V1, content updated)

1. Hero — SplitText headline reveal, Lenis smooth scroll active from first scroll
2. Showcase grid — staggered reveal per Section 1.3, restaurant first (flagship 3-tier demo)
3. Trust Gap — pinned split reveal on desktop (Section 1.4), simple fade on mobile
4. **What I Build** — capability cards, Section 3, no named platform
5. Tier comparison — Section 4's matrix
6. About — Section 3's body copy, real photo (Section 2)
7. Process — three honest steps, no "24 hour" promise
8. Contact — WhatsApp, call, form

No Testimonials section — same reasoning as V1: a labeled-fake testimonial reads as fake, and you don't have a real one yet.

---

## 6. What NOT to do — V2 additions on top of V1's list

- Do not add Three.js, WebGL, custom shaders, particle systems, or video backgrounds
- Do not use AI-generated photography anywhere — real licensed stock only (Section 2)
- Do not mention MechaniQ.AI anywhere on the site
- Do not add fabricated scarcity ("only 5 spots," countdown timers) or fabricated stats outside clearly-labeled demo content
- Do not exceed ~30 active ScrollTrigger instances on a single page
- Do not ship a preloader animation longer than ~0.5s, if you use one at all — it directly contradicts the "fast site" pitch
- Do not use the AI-generated headshot currently in `public/images/pravesh-headshot.png` — replace with a real photo before this goes live

---

## 7. Brand name — flagging a decision that may have already been made without confirmation

The brand name is confirmed as **APEX FORGE Technologies**. This should be applied globally, replacing any instances of "TrustPixel Studio". This includes, but is not limited to, the `<title>` tag in `Base.astro`, header and footer components, and the contact signature.

---

## 8. Build order for Antigravity

1. Add Lenis + GSAP to the project: `npm install lenis gsap`
2. Create `src/scripts/motion.js` per Section 1.1, import it once in `Base.astro`
3. Implement Section 1.2 (headline reveal) on the Hero
4. Implement Section 1.3 (staggered reveal) on the Showcase grid and all demo-page galleries
5. Implement Section 1.4 (Trust Gap pinned reveal, desktop-gated)
6. Implement Sections 1.5–1.7 (magnetic buttons, cursor dot, spotlight background) site-wide
7. Replace all AI-generated images with real Unsplash/Pexels photography per Section 2's search terms — including the headshot
8. Rewrite the About section and replace "Selected Work" with "What I Build" per Section 3 — remove all MechaniQ references
9. Update the tier comparison content per Section 4 — remove any decoy/scarcity language if present from the prior build
10. Run the Section 1.8 performance check (Lighthouse + 4× CPU throttle) before calling this done

Stop after each step for review, same as the prior build pattern — this is a lot of new motion code touching every page, and it's easier to catch a broken ScrollTrigger early than after it's wired into ten pages.