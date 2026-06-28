import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const motionProfiles = {
  restaurant: { duration: 0.8, ease: 'power1.out', stagger: 0.06 },
  dental: { duration: 0.5, ease: 'power2.out', stagger: 0.05 },
  salon: { duration: 0.9, ease: 'power1.inOut', stagger: 0.07 },
  coaching: { duration: 0.5, ease: 'power3.out', stagger: 0.04 },
  gym: { duration: 0.35, ease: 'back.out(1.4)', stagger: 0.03 },
  shell: { duration: 0.6, ease: 'power3.out', stagger: 0.05 },
};

const tierMotionProfiles = {
  premium: { duration: 1.0, ease: 'power3.inOut', y: 50, scale: 0.97, stagger: 0.08 },
  standard: { duration: 0.6, ease: 'power2.out', y: 30, scale: 1, stagger: 0.05 },
  basic: { duration: 0.35, ease: 'power1.out', y: 15, scale: 1, stagger: 0.03 },
};

let lenis = null;
let ctx = null;
let cleanupFns = [];
let currentScrollHandler = null;
let currentMouseMoveHandler = null;
let currentMenuToggleHandler = null;
let currentTabClickHandler = null;
let currentMenuCatHandlers = [];
let currentHoverHandlers = [];

function getElementTierProfile(el) {
  if (!el) return tierMotionProfiles.standard;
  if (el.closest('#tier-premium-content') || el.closest('.tier-premium')) return tierMotionProfiles.premium;
  if (el.closest('#tier-basic-content') || el.closest('.tier-basic')) return tierMotionProfiles.basic;
  return tierMotionProfiles.standard;
}

function getProfile() {
  const name = document.body?.getAttribute('data-motion-profile') || 'shell';
  return motionProfiles[name] || motionProfiles.shell;
}

function safeKillScrollTriggers() {
  ScrollTrigger.getAll().forEach(t => t.kill());
  ScrollTrigger.clearMatchMedia?.();
}

// -------- splitIntoLines – now applies initial state immediately --------
function splitIntoLines(el, singleWordLines = false) {
  if (!el) return [];
  const text = (el.textContent || '').trim();
  if (!text) return [];

  // Check if we already processed this element (prevent duplicate rebuilds)
  if (el.dataset.splitDone) {
    // Return the existing line inner spans
    const lineWraps = el.querySelectorAll('span > span');
    return Array.from(lineWraps);
  }

  const words = text.split(/\s+/);
  el.innerHTML = '';

  const temp = document.createElement('span');
  temp.style.visibility = 'hidden';
  temp.style.position = 'absolute';
  temp.style.whiteSpace = 'nowrap';

  const wordSpans = words.map(w => {
    const span = document.createElement('span');
    span.style.display = 'inline-block';
    span.style.whiteSpace = 'pre';
    span.textContent = w + ' ';
    temp.appendChild(span);
    return span;
  });

  el.appendChild(temp);
  const lines = [];
  let currentLine = [];
  let currentTop = null;

  wordSpans.forEach(span => {
    const top = span.offsetTop;
    if (currentTop !== null && (Math.abs(top - currentTop) > 4 || singleWordLines)) {
      lines.push(currentLine);
      currentLine = [];
    }
    currentTop = top;
    currentLine.push(span);
  });
  if (currentLine.length) lines.push(currentLine);

  el.innerHTML = '';
  const lineEls = [];
  lines.forEach(wordGroup => {
    const lineWrap = document.createElement('span');
    lineWrap.style.display = 'block';
    lineWrap.style.overflow = 'hidden';
    lineWrap.style.position = 'relative';

    const inner = document.createElement('span');
    inner.style.display = 'inline-block';
    inner.style.willChange = 'transform, opacity';
    // **FIX: set initial state immediately to avoid flash**
    inner.style.transform = 'translateY(110%)';
    inner.style.opacity = '0';
    inner.textContent = wordGroup.map(s => s.textContent).join('').trim();
    lineWrap.appendChild(inner);
    el.appendChild(lineWrap);
    lineEls.push(inner);
  });

  el.dataset.splitDone = 'true';
  return lineEls;
}

function splitIntoChars(el) {
  if (!el) return [];
  const text = el.textContent || '';
  el.innerHTML = '';
  const chars = [];
  for (const char of text) {
    const span = document.createElement('span');
    span.style.display = 'inline-block';
    span.style.willChange = 'transform, opacity';
    span.textContent = char === ' ' ? '\u00A0' : char;
    el.appendChild(span);
    chars.push(span);
  }
  return chars;
}

function destroyLenis() {
  if (lenis) {
    try { lenis.destroy(); } catch { }
    lenis = null;
  }
}

function createLenis() {
  if (prefersReduced) return;
  destroyLenis();
  lenis = new Lenis({
    lerp: 0.07,
    smoothWheel: true,
    syncTouch: false,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.remove(tick);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
}

function tick(time) {
  if (lenis) lenis.raf(time * 1000);
}

function clearHandlers() {
  if (currentScrollHandler) {
    window.removeEventListener('scroll', currentScrollHandler);
    currentScrollHandler = null;
  }
  if (currentMouseMoveHandler) {
    window.removeEventListener('mousemove', currentMouseMoveHandler);
    currentMouseMoveHandler = null;
  }
  if (currentMenuToggleHandler) {
    const btn = document.getElementById('mobile-menu-btn');
    btn?.removeEventListener('click', currentMenuToggleHandler);
    currentMenuToggleHandler = null;
  }
  if (currentTabClickHandler) {
    document.removeEventListener('click', currentTabClickHandler);
    currentTabClickHandler = null;
  }
  currentMenuCatHandlers.forEach(({ btn, fn }) => btn.removeEventListener('click', fn));
  currentMenuCatHandlers = [];
  currentHoverHandlers.forEach(({ el, enter, leave }) => {
    el.removeEventListener('mouseenter', enter);
    el.removeEventListener('mouseleave', leave);
  });
  currentHoverHandlers = [];
  cleanupFns.forEach(fn => {
    try { fn(); } catch { }
  });
  cleanupFns = [];
}

// -------- INIT FUNCTIONS (all wrapped in try/catch) --------
function initPointerEffects() {
  if (prefersReduced) return;
  const cursor = document.querySelector('.cursor-dot');
  if (!cursor) return;

  currentMouseMoveHandler = (e) => {
    document.documentElement.style.setProperty('--x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    if (window.matchMedia('(hover: hover)').matches) {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'power2.out', overwrite: 'auto' });
    }
  };
  window.addEventListener('mousemove', currentMouseMoveHandler, { passive: true });

  const hide = () => { cursor.style.opacity = '0'; };
  const show = () => { cursor.style.opacity = '1'; };
  document.addEventListener('mouseleave', hide);
  document.addEventListener('mouseenter', show);
  cleanupFns.push(() => {
    document.removeEventListener('mouseleave', hide);
    document.removeEventListener('mouseenter', show);
  });

  const hoverables = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .btn-magnetic');
  hoverables.forEach(el => {
    const enter = () => gsap.to(cursor, { scale: 3, backgroundColor: '#10B981', duration: 0.2, overwrite: 'auto' });
    const leave = () => gsap.to(cursor, { scale: 1, backgroundColor: '#6366F1', duration: 0.2, overwrite: 'auto' });
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    currentHoverHandlers.push({ el, enter, leave });
  });
}

function initHeroEntrance() {
  const headline = document.querySelector('.hero-headline');
  const eyebrow = document.querySelector('.hero-eyebrow');
  const subtitle = document.querySelector('.hero-subtitle');
  const ctas = document.querySelector('.hero-ctas');
  const bg = document.querySelector('.hero-bg');
  const particles = document.querySelector('.hero-particles');
  const ambients = document.querySelectorAll('.hero-ambient');

  if (prefersReduced) return;

  const tl = gsap.timeline();

  if (bg) tl.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0);
  if (particles) tl.fromTo(particles, { opacity: 0 }, { opacity: 0.22, duration: 1.2, ease: 'power1.out' }, 0.2);
  if (eyebrow) tl.fromTo(eyebrow, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.25);

  if (headline) {
    // If we have line spans already (with inline styles), just animate them
    const lineInners = splitIntoLines(headline, true);
    if (lineInners.length) {
      tl.to(lineInners, {
        y: '0%',
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power4.out',
        overwrite: 'auto',
      }, 0.4);
    } else {
      // fallback to SplitText
      const split = SplitText.create(headline, { type: 'chars' });
      tl.fromTo(split.chars, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.02, ease: 'power3.out' }, 0.4);
      cleanupFns.push(() => split.revert?.());
    }
  }

  if (subtitle) tl.fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);
  if (ctas) tl.fromTo(ctas, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.75);
  if (ambients.length) tl.fromTo(ambients, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)' }, 0.9);

  cleanupFns.push(() => tl.kill());
}

function initCardReveals() {
  const cards = gsap.utils.toArray('.demo-card, .showcase-card, .pricing-card, .capability-card, .process-card, .reveal-item');
  if (!cards.length || prefersReduced) return;

  const groups = [];
  let currentGroup = [];
  let lastTop = null;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const absTop = rect.top + window.scrollY;
    if (lastTop !== null && Math.abs(absTop - lastTop) > 30) {
      if (currentGroup.length) groups.push([...currentGroup]);
      currentGroup = [];
    }
    lastTop = absTop;
    currentGroup.push(card);
  });
  if (currentGroup.length) groups.push(currentGroup);

  groups.forEach(group => {
    const tierProfile = getElementTierProfile(group[0]);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: group[0],
        start: 'top 88%',
        once: true,
      },
    });
    tl.from(group, {
      y: tierProfile.y,
      opacity: 0,
      scale: tierProfile.scale,
      duration: tierProfile.duration,
      stagger: tierProfile.stagger,
      ease: tierProfile.ease,
    });
    cleanupFns.push(() => tl.kill());
  });
}

function initSectionHeaderReveals() {
  if (prefersReduced) return;
  const headers = gsap.utils.toArray('section > div > div:first-child');
  headers.forEach(header => {
    const eyebrow = header.querySelector('span');
    const title = header.querySelector('h2, h3');
    const desc = header.querySelector('p');
    const elements = [eyebrow, title, desc].filter(Boolean);
    if (!elements.length) return;

    gsap.from(elements, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        once: true,
      },
      y: 25,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
    });
  });
}

function initTrustGap() {
  const trustGap = document.querySelector('.trust-gap');
  if (!trustGap || prefersReduced) return;

  gsap.matchMedia().add('(min-width: 768px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trustGap,
        start: 'top top',
        end: '+=80%',
        pin: true,
        scrub: 1,
      },
    });

    tl.from('.trust-gap .without-col', { xPercent: -40, opacity: 0, duration: 1 })
      .from('.trust-gap .with-col', { xPercent: 40, opacity: 0, duration: 1 }, '<');

    cleanupFns.push(() => tl.kill());
  });
}

function initMagneticButtons() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    const move = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
    };
    const leave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.3)', overwrite: 'auto' });
    btn.addEventListener('mousemove', move);
    btn.addEventListener('mouseleave', leave);
    currentHoverHandlers.push({ el: btn, enter: move, leave });
  });
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  currentMenuToggleHandler = () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen && !prefersReduced) {
      gsap.fromTo('.mobile-nav-link', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: 'power2.out' });
    }
  };

  btn.addEventListener('click', currentMenuToggleHandler);
}

// -------- TAB SWITCHING (fixed for "moderate" / "standard" mismatch) --------
function setTabState(container, activeBtn) {
  container.querySelectorAll('.tier-tab-btn').forEach(b => {
    const isActive = b === activeBtn;
    b.dataset.active = isActive ? 'true' : 'false';
    b.setAttribute('aria-selected', isActive ? 'true' : 'false');
    b.tabIndex = isActive ? 0 : -1;
    b.classList.toggle('bg-brand-primary', isActive);
    b.classList.toggle('text-white', isActive);
    b.classList.toggle('bg-[var(--primary-accent)]', isActive);
    b.classList.toggle('text-zinc-400', !isActive);
    b.classList.toggle('hover:text-white', !isActive);
  });
}

function switchTierBlock(target) {
  // Normalize: if target is 'moderate', treat as 'standard'
  const normalizedTarget = target === 'moderate' ? 'standard' : target;

  const blocks = document.querySelectorAll('.tier-content-block');
  let currentBlock = null;
  let targetBlock = document.getElementById(`tier-${normalizedTarget}-content`);

  // If no block found with normalized id, try the raw target id (fallback)
  if (!targetBlock) {
    targetBlock = document.getElementById(`tier-${target}-content`);
  }

  // Also find the currently visible block (not hidden)
  blocks.forEach(block => {
    if (!block.classList.contains('hidden')) currentBlock = block;
  });

  if (!targetBlock || targetBlock === currentBlock) return;

  if (prefersReduced) {
    currentBlock?.classList.add('hidden');
    currentBlock?.classList.remove('block');
    targetBlock.classList.remove('hidden');
    targetBlock.classList.add('block');
    ScrollTrigger.refresh();
    return;
  }

  if (currentBlock) {
    gsap.to(currentBlock, {
      opacity: 0,
      y: -12,
      duration: 0.2,
      ease: 'power1.in',
      onComplete: () => {
        currentBlock.classList.add('hidden');
        currentBlock.classList.remove('block');
        gsap.set(currentBlock, { opacity: 1, y: 0 });

        targetBlock.classList.remove('hidden');
        targetBlock.classList.add('block');

        gsap.fromTo(targetBlock, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', onComplete: () => ScrollTrigger.refresh() });
      },
    });
  }
}

function initDemoInteractions() {
  // Single document-level click handler for tier tabs
  if (!currentTabClickHandler) {
    currentTabClickHandler = (e) => {
      const btn = e.target.closest('.tier-tab-btn');
      if (!btn) return;
      const container = btn.closest('.tier-tabs-container');
      if (!container) return;
      let target = btn.getAttribute('data-tier');
      if (!target) return;

      setTabState(container, btn);
      switchTierBlock(target);
    };
    document.addEventListener('click', currentTabClickHandler);
  }

  // Menu category buttons (for demos page)
  document.querySelectorAll('.menu-cat-btn').forEach(btn => {
    const fn = () => {
      const target = btn.getAttribute('data-cat');
      if (!target) return;

      document.querySelectorAll('.menu-cat-btn').forEach(b => {
        b.classList.remove('text-brand-primary', 'text-amber-600', 'text-teal-600', 'text-rose-400', 'text-blue-600', 'text-orange-500');
        b.classList.add('text-zinc-400');
      });

      const path = window.location.pathname;
      let activeClass = 'text-brand-primary';
      if (path.includes('restaurant')) activeClass = 'text-amber-600';
      else if (path.includes('dentist')) activeClass = 'text-teal-600';
      else if (path.includes('salon')) activeClass = 'text-rose-400';
      else if (path.includes('coaching')) activeClass = 'text-blue-600';
      else if (path.includes('gym')) activeClass = 'text-orange-500';

      btn.classList.remove('text-zinc-400');
      btn.classList.add(activeClass);

      const menuBlocks = document.querySelectorAll('.menu-cat-block');
      menuBlocks.forEach(block => {
        const active = block.id === `cat-${target}`;
        block.classList.toggle('hidden', !active);
        block.classList.toggle('block', active);
        if (active && !prefersReduced) {
          const items = block.querySelectorAll('.showcase-card, .flex');
          gsap.from(items, { y: 12, opacity: 0, duration: 0.3, stagger: 0.03, ease: 'power2.out' });
        }
      });
    };
    btn.addEventListener('click', fn);
    currentMenuCatHandlers.push({ btn, fn });
  });
}

function initSpaceGallery() {
  const container = document.querySelector('.space-gallery-container');
  const scrollContent = document.querySelector('.horizontal-scroll-content');
  if (!container || !scrollContent || prefersReduced) return;

  gsap.matchMedia().add('(min-width: 768px)', () => {
    const tl = gsap.to(scrollContent, {
      x: () => -(scrollContent.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollContent.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
    cleanupFns.push(() => tl.kill());
  });
}

function initSpotlightCards() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const cards = document.querySelectorAll('.showcase-card, .capability-card, .pricing-card, .demo-card');
  cards.forEach(card => {
    const move = (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
    };
    card.addEventListener('mousemove', move);
    currentHoverHandlers.push({ el: card, enter: move, leave: () => { } });
  });
}

function initParallaxHero() {
  if (prefersReduced) return;
  const heroSection = document.querySelector('.hero-mesh');
  if (!heroSection) return;

  const blurs = heroSection.querySelectorAll('[class*="blur-"]');
  blurs.forEach((blur, i) => {
    const tween = gsap.to(blur, {
      y: () => (i + 1) * 40,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
    cleanupFns.push(() => tween.kill());
  });
}

function initNavScrollEffect() {
  const header = document.querySelector('header.sticky');
  if (!header) return;

  currentScrollHandler = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle('nav-scrolled', scrollY > 80);
  };

  window.addEventListener('scroll', currentScrollHandler, { passive: true });
  currentScrollHandler();
}

// -------- Master init / cleanup --------
function initAnimations() {
  clearHandlers();
  safeKillScrollTriggers();
  createLenis();

  // Wrap each feature in try/catch so one failure doesn't stop the rest
  try { initPointerEffects(); } catch (e) { console.warn('initPointerEffects:', e); }
  try { initHeroEntrance(); } catch (e) { console.warn('initHeroEntrance:', e); }
  try { initCardReveals(); } catch (e) { console.warn('initCardReveals:', e); }
  try { initSectionHeaderReveals(); } catch (e) { console.warn('initSectionHeaderReveals:', e); }
  try { initTrustGap(); } catch (e) { console.warn('initTrustGap:', e); }
  try { initMagneticButtons(); } catch (e) { console.warn('initMagneticButtons:', e); }
  try { initMobileMenu(); } catch (e) { console.warn('initMobileMenu:', e); }
  try { initDemoInteractions(); } catch (e) { console.warn('initDemoInteractions:', e); }
  try { initSpaceGallery(); } catch (e) { console.warn('initSpaceGallery:', e); }
  try { initSpotlightCards(); } catch (e) { console.warn('initSpotlightCards:', e); }
  try { initParallaxHero(); } catch (e) { console.warn('initParallaxHero:', e); }
  try { initNavScrollEffect(); } catch (e) { console.warn('initNavScrollEffect:', e); }
}

function cleanupAnimations() {
  clearHandlers();
  safeKillScrollTriggers();
  destroyLenis();
  if (ctx) {
    try { ctx.revert(); } catch { }
    ctx = null;
  }
  document.body.style.overflow = '';
}

// -------- Astro lifecycle hooks --------
if (typeof window !== 'undefined') {
  document.addEventListener('astro:page-load', initAnimations);
  document.addEventListener('astro:before-swap', cleanupAnimations);
}

// Expose utils for other components if needed
export { gsap, ScrollTrigger, SplitText, splitIntoLines, splitIntoChars, prefersReduced, lenis, initAnimations, cleanupAnimations };