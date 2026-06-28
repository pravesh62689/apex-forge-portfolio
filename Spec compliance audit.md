# Spec compliance audit — run this before any more design work

Your job in this pass is to compare what actually exists in this repo against
`PORTFOLIO_REDESIGN_V2.md` and `NICHE_IDENTITY_SYSTEM.md` — not to write new
code. Open the real current content of every file below and report PASS,
FAIL, or PARTIAL for each checklist item, with the actual file path and a
quoted snippet or line range as evidence. "I built this earlier" is not
evidence — show me what's actually in the file right now.

Do not fix anything in this pass. Report first. I'll decide what to
prioritize after seeing the actual gap.

## 1. Animation stack (PORTFOLIO_REDESIGN_V2.md Section 1)

- [ ] Is `lenis` in `package.json` dependencies? Quote the line.
- [ ] Is `gsap` in `package.json` dependencies? Quote the line.
- [ ] Does `src/scripts/motion.js` exist? If yes, paste its current full
  contents. If no, say so plainly.
- [ ] Is `motion.js` actually imported in `Base.astro`? Quote the import line
  and the surrounding context.
- [ ] Open the live homepage in a browser, open DevTools console, reload, and
  report any red errors verbatim.

## 2. Real photography, no AI-generated images (V2 Section 2)

- [ ] List every file currently in `public/images/`.
- [ ] For `pravesh-headshot.jpg` specifically: is this the AI-generated image
  from the prior build log, or has it been replaced with a real photo? State
  which one it currently is.
- [ ] For each of restaurant/dentist/salon/coaching/gym hero images: AI-generated
  or real licensed stock photo? State which for each one individually.

## 3. Six distinct color identities (NICHE_IDENTITY_SYSTEM.md Section 1)

- [ ] Open `tailwind.config.cjs` and paste the current full color token
  section.
- [ ] Does it define six separate theme variants (restaurant, dental, salon,
  coaching, gym, shell) with the specific hex values from Section 1? Or is it
  still one shared palette? Quote the actual config.

## 4. Niche-specific page architecture (NICHE_IDENTITY_SYSTEM.md Section 2)

For each of the 5 demo pages, open the file and report its actual current
section order (paste the list of section headings/components in the order
they appear in the file):

- [ ] `src/pages/demos/restaurant-demo.astro` — actual section order
- [ ] `src/pages/demos/dentist-demo.astro` — actual section order
- [ ] `src/pages/demos/salon-demo.astro` — actual section order
- [ ] `src/pages/demos/coaching-demo.astro` — actual section order
- [ ] `src/pages/demos/gym-demo.astro` — actual section order

Then state plainly: are these 5 pages using genuinely different component
sets per niche, or are they the same shared components
(`ServiceCard.astro`/`PricingTable.astro`/etc.) reused with different copy
and images? Quote which components each page actually imports.

## 5. Content rules (V2 Sections 3, 6, 7)

- [ ] Search the entire `src/` directory for the string "MechaniQ" — report
  every match found, with file and line. There should be zero.
- [ ] Search for any scarcity/urgency language ("only X spots", "limited
  time", a countdown timer component) — report every match found. There
  should be zero unless it's a literally true statement I wrote myself.
- [ ] Check `Base.astro`'s `<title>` tag, the nav/footer brand text, and the
  contact signature — what brand name is currently applied? Quote each
  instance. (Context: "TrustPixel Studio" was applied in a prior build
  without my confirmation — I need to know if it's still there.)

## 6. Output format

Produce a single table: Category | Item | Status (PASS/FAIL/PARTIAL) |
Evidence. After the table, list the 5 highest-impact gaps in your own
judgment — the ones that, if fixed first, would close the most visible
distance between the live site and the specs.

Do not start fixing anything until I respond to the audit.