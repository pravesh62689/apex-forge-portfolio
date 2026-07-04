import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Upgraded to premium easing curves (Apple/Stripe feel)
const motionProfiles = {
  restaurant: { duration: 1.0, ease: 'expo.out', stagger: 0.06 },
  dental: { duration: 0.8, ease: 'power3.out', stagger: 0.05 },
  salon: { duration: 1.1, ease: 'power2.inOut', stagger: 0.07 },
  coaching: { duration: 0.8, ease: 'expo.out', stagger: 0.04 },
  gym: { duration: 0.6, ease: 'back.out(1.2)', stagger: 0.03 },
  shell: { duration: 0.9, ease: 'expo.out', stagger: 0.05 },
};

const tierMotionProfiles = {
  premium: { duration: 1.2, ease: 'expo.out', y: 40, scale: 0.98, stagger: 0.08 },
  standard: { duration: 0.8, ease: 'power3.out', y: 20, scale: 1, stagger: 0.05 },
  basic: { duration: 0.5, ease: 'power2.out', y: 10, scale: 1, stagger: 0.03 },
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

function splitIntoLines(el, singleWordLines = false) {
  if (!el) return [];
  const text = (el.textContent || '').trim();
  if (!text) return [];

  if (el.dataset.splitDone) {
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
    inner.style.willChange = 'transform, opacity, filter';
    inner.style.transform = 'translateY(110%)';
    inner.style.opacity = '0';
    inner.style.filter = 'blur(8px)';
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
    span.style.willChange = 'transform, opacity, filter';
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
    lerp: 0.08, // Slightly tighter for a premium feel
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

function initPointerEffects() {
  if (prefersReduced) return;
  const cursor = document.querySelector('.cursor-dot');
  if (!cursor) return;

  // Optimized pointer tracking with requestAnimationFrame internally handled by GSAP
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  currentMouseMoveHandler = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.documentElement.style.setProperty('--x', `${mouseX}px`);
    document.documentElement.style.setProperty('--y', `${mouseY}px`);
    if (window.matchMedia('(hover: hover)').matches) {
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.15,
        ease: 'expo.out',
        overwrite: 'auto'
      });
    }
  };
  window.addEventListener('mousemove', currentMouseMoveHandler, { passive: true });

  const hide = () => gsap.to(cursor, { opacity: 0, duration: 0.3 });
  const show = () => gsap.to(cursor, { opacity: 1, duration: 0.3 });
  document.addEventListener('mouseleave', hide);
  document.addEventListener('mouseenter', show);
  cleanupFns.push(() => {
    document.removeEventListener('mouseleave', hide);
    document.removeEventListener('mouseenter', show);
  });

  const hoverables = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .btn-magnetic');
  hoverables.forEach(el => {
    const enter = () => gsap.to(cursor, { scale: 3, backgroundColor: 'var(--primary-accent)', duration: 0.3, ease: 'expo.out', overwrite: 'auto' });
    const leave = () => gsap.to(cursor, { scale: 1, backgroundColor: 'var(--primary-accent)', duration: 0.3, ease: 'expo.out', overwrite: 'auto' });
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

  if (bg) tl.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power2.out' }, 0);
  if (particles) tl.fromTo(particles, { opacity: 0 }, { opacity: 0.25, duration: 1.5, ease: 'power1.out' }, 0.2);
  if (eyebrow) tl.fromTo(eyebrow, { opacity: 0, y: 15, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, ease: 'expo.out' }, 0.25);

  if (headline) {
    const lineInners = splitIntoLines(headline, true);
    if (lineInners.length) {
      tl.to(lineInners, {
        y: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.08,
        ease: 'expo.out',
        overwrite: 'auto',
      }, 0.3);
    } else {
      const split = SplitText.create(headline, { type: 'chars' });
      tl.fromTo(split.chars, { y: 40, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.02, ease: 'expo.out' }, 0.3);
      cleanupFns.push(() => split.revert?.());
    }
  }

  if (subtitle) tl.fromTo(subtitle, { opacity: 0, y: 20, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, ease: 'expo.out' }, 0.5);
  if (ctas) tl.fromTo(ctas, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out' }, 0.65);
  if (ambients.length) tl.fromTo(ambients, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.2, stagger: 0.15, ease: 'expo.out' }, 0.8);

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
    // Added a slight blur filter reveal for a premium feel
    gsap.set(group, { y: tierProfile.y, opacity: 0, scale: tierProfile.scale, filter: 'blur(8px)' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: group[0],
        start: 'top 90%',
        once: true,
      },
    });
    tl.to(group, {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
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
    const elements = Array.from(header.querySelectorAll('span, h2, h3, p')).filter(Boolean);
    if (!elements.length) return;

    gsap.fromTo(elements,
      { y: 30, opacity: 0, filter: 'blur(5px)' },
      {
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          once: true,
        },
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.0,
        stagger: 0.1,
        ease: 'expo.out',
      }
    );
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

    tl.from('.trust-gap .without-col', { xPercent: -40, opacity: 0, duration: 1, ease: 'none' })
      .from('.trust-gap .with-col', { xPercent: 40, opacity: 0, duration: 1, ease: 'none' }, '<');

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
      gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
    };
    const leave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)', overwrite: 'auto' });
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
      gsap.fromTo('.mobile-nav-link',
        { x: 40, opacity: 0, filter: 'blur(4px)' },
        { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, stagger: 0.08, ease: 'expo.out' }
      );
    }
  };

  btn.addEventListener('click', currentMenuToggleHandler);
}

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
  const normalizedTarget = target === 'moderate' ? 'standard' : target;
  const blocks = document.querySelectorAll('.tier-content-block');
  let currentBlock = null;
  let targetBlock = document.getElementById(`tier-${normalizedTarget}-content`);

  if (!targetBlock) {
    targetBlock = document.getElementById(`tier-${target}-content`);
  }

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
      y: -15,
      filter: 'blur(4px)',
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        currentBlock.classList.add('hidden');
        currentBlock.classList.remove('block');
        gsap.set(currentBlock, { opacity: 1, y: 0, filter: 'blur(0px)' });

        targetBlock.classList.remove('hidden');
        targetBlock.classList.add('block');

        gsap.fromTo(targetBlock,
          { opacity: 0, y: 15, filter: 'blur(4px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'expo.out', onComplete: () => ScrollTrigger.refresh() }
        );
      },
    });
  }
}

function initDemoInteractions() {
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
          gsap.fromTo(items,
            { y: 15, opacity: 0, filter: 'blur(4px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, stagger: 0.04, ease: 'expo.out' }
          );
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
        scrub: 0.5, // Added slight smoothing to the scrub
        invalidateOnRefresh: true,
      },
    });
    cleanupFns.push(() => tl.kill());
  });
}

function initSpotlightCards() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const cards = document.querySelectorAll('.showcase-card, .capability-card, .pricing-card, .demo-card');

  // Debounce the spotlight effect slightly for performance
  let ticking = false;
  cards.forEach(card => {
    const move = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
          card.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
          ticking = false;
        });
        ticking = true;
      }
    };
    card.addEventListener('mousemove', move, { passive: true });
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
      y: () => (i + 1) * 60, // Increased parallax depth slightly
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
    cleanupFns.push(() => tween.kill());
  });
}

function initNavScrollEffect() {
  const header = document.querySelector('header.sticky');
  if (!header) return;

  let ticking = false;
  currentScrollHandler = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        header.classList.toggle('nav-scrolled', scrollY > 40); // Lowered threshold for earlier activation
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', currentScrollHandler, { passive: true });
  currentScrollHandler();
}

function initAnimations() {
  clearHandlers();
  safeKillScrollTriggers();
  createLenis();

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

if (typeof window !== 'undefined') {
  document.addEventListener('astro:page-load', initAnimations);
  document.addEventListener('astro:before-swap', cleanupAnimations);
}

export { gsap, ScrollTrigger, SplitText, splitIntoLines, splitIntoChars, prefersReduced, lenis, initAnimations, cleanupAnimations };