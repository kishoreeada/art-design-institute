window.addEventListener('load', () => {
  if (window.AOS) {
    AOS.init({ duration: 850, once: true, offset: 80 });
  }
  if (!window.gsap) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.timeline({ defaults: { ease: 'power4.out' } })
    .from('.hero-copy .eyebrow', { y: 25, opacity: 0, duration: .5 })
    .from('.hero h1', { y: 70, opacity: 0, duration: .9 }, '-=.2')
    .from('.hero-facts', { y: 20, opacity: 0, duration: .45 }, '-=.45')
    .from('.hero-intro', { y: 30, opacity: 0, duration: .6 }, '-=.3')
    .from('.hero-copy .cta-link', { y: 20, opacity: 0, duration: .5 }, '-=.3')
    .from('.hero-visual', { y: 45, opacity: 0, duration: 1 }, '-=.8');

  gsap.to('.hero-visual img', {
    scale: 1.055,
    yPercent: -4,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });

  gsap.utils.toArray('.discipline').forEach((el, i) => {
    gsap.from(el, {
      y: 55,
      opacity: 0,
      duration: .75,
      delay: i * .05,
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  const workSection = document.querySelector('.student-work-section');
  const workStage = document.querySelector('.work-stage');
  const workCards = document.querySelectorAll('[data-work-card]');
  if (workSection && workStage && workCards.length) {
    gsap.from(workCards, {
      y: 34, opacity: 0, scale: .985, stagger: .12, duration: .85,
      ease: 'power4.out', clearProps: 'transform',
      scrollTrigger: { trigger: workStage, start: 'top 88%', once: true }
    });
    // Subtle horizontal/rotation movement only — never push cards vertically into the heading.
    gsap.to('.work-a', { rotate: -1.7, x: -5, ease: 'none', scrollTrigger: { trigger: workStage, start: 'top 85%', end: 'bottom 20%', scrub: 1.2 } });
    gsap.to('.work-b', { rotate: 1.8, x: 4, ease: 'none', scrollTrigger: { trigger: workStage, start: 'top 85%', end: 'bottom 20%', scrub: 1.2 } });
    gsap.to('.work-c', { rotate: -1.65, x: -3, ease: 'none', scrollTrigger: { trigger: workStage, start: 'top 85%', end: 'bottom 20%', scrub: 1.2 } });
    gsap.utils.toArray('.work-card .work-media img').forEach((img) => {
      gsap.fromTo(img, { scale: 1.08 }, { scale: 1.015, ease: 'none', scrollTrigger: { trigger: img, start: 'top 94%', end: 'bottom 30%', scrub: 1.15 } });
    });
  }

  const campus = document.querySelector('.campus-v2');
  const campusImage = document.querySelector('.campus-v2-image-wrap');
  const campusPhoto = document.querySelector('.campus-v2-image');
  const campusRule = document.querySelector('.campus-v2-rule');
  const campusHeading = document.querySelector('.campus-v2-heading');
  const campusBody = document.querySelector('.campus-v2-body');
  const campusFacts = document.querySelectorAll('.campus-v2-fact');
  const campusTag = document.querySelector('.campus-v2-tag');
  const campusCaption = document.querySelector('.campus-v2-caption');

  if (campus && campusImage && campusPhoto) {
    const campusReveal = gsap.timeline({
      scrollTrigger: { trigger: campus, start: 'top 82%', once: true }
    });
    campusReveal.fromTo(campusImage,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.15, ease: 'power4.inOut' }
    );
    if (campusTag) campusReveal.fromTo(campusTag,
      { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .5, ease: 'power3.out' }, '-=.62');
    if (campusCaption) campusReveal.fromTo(campusCaption,
      { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .5, ease: 'power3.out' }, '-=.45');
    if (campusHeading) campusReveal.fromTo(campusHeading,
      { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: 'power3.out' }, '-=.42');
    if (campusBody) campusReveal.fromTo(campusBody,
      { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: 'power3.out' }, '-=.46');
    if (campusFacts.length) campusReveal.fromTo(campusFacts,
      { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: .1, duration: .45, ease: 'power3.out' }, '-=.32');

    gsap.to(campusPhoto, {
      scale: 1.0, xPercent: -1.5, ease: 'none',
      scrollTrigger: { trigger: campus, start: 'top bottom', end: 'bottom top', scrub: 1.1 }
    });
  }

  if (campusRule) {
    gsap.from(campusRule, {
      scaleX: 0,
      duration: .8,
      ease: 'power3.out',
      scrollTrigger: { trigger: campusRule, start: 'top 88%', once: true }
    });
  }
  // People / faculty section — layout-safe GSAP motion. AOS is used globally,
  // while the core content uses GSAP so a slow/unavailable AOS CDN can never hide it.
  const people = document.querySelector('.people');
  const peopleImage = document.querySelector('.people-image img');
  const peopleCopy = document.querySelector('.people-copy');
  const peopleStats = document.querySelectorAll('[data-stat]');
  if (people && window.gsap) {
    const peopleHeading = peopleCopy?.querySelector('[data-people-title]');
    const peopleBody = peopleCopy?.querySelector('[data-people-body]');

    // Keep the section fully visible without JS; GSAP only enhances the entrance.
    const peopleTl = gsap.timeline({
      scrollTrigger: { trigger: people, start: 'top 82%', once: true },
      defaults: { ease: 'power3.out' }
    });
    peopleTl
      .fromTo(peopleImage,
        { clipPath: 'inset(0 100% 0 0)', scale: 1.045 },
        { clipPath: 'inset(0 0% 0 0)', scale: 1.015, duration: 1.05, ease: 'power4.inOut' }
      )
      .from(peopleHeading, { y: 34, opacity: 0, duration: .65, ease: 'power4.out' }, '-=.58')
      .from(peopleBody, { y: 22, opacity: 0, duration: .48 }, '-=.34');

    gsap.to(peopleImage, {
      yPercent: -2.1,
      scale: 1.04,
      ease: 'none',
      scrollTrigger: { trigger: people, start: 'top bottom', end: 'bottom top', scrub: 1.15 }
    });
  }

  if (peopleStats.length) {
    gsap.from(peopleStats, {
      y: 22, opacity: 0, stagger: .08, duration: .55, ease: 'power3.out',
      scrollTrigger: { trigger: '.stats', start: 'top 88%', once: true }
    });
    gsap.utils.toArray('.stat b').forEach((num) => {
      gsap.from(num, { y: 22, opacity: 0, duration: .55, ease: 'power3.out', scrollTrigger: { trigger: num, start: 'top 92%', once: true } });
    });
  }



  // Public Program — GSAP-only enhancement. Content stays visible without JS/AOS.
  const publicProgram = document.querySelector('.public-program-section');
  if (publicProgram && window.gsap) {
    const publicHead = publicProgram.querySelector('.public-program-head');
    const kicker = publicProgram.querySelector('.section-kicker');
    const title = publicProgram.querySelector('h2');
    const headSide = publicProgram.querySelector('.public-program-head-side');
    const intro = publicProgram.querySelector('.public-program-intro');
    const cta = publicProgram.querySelector('.public-program-cta');
    const featuredEvent = publicProgram.querySelector('.featured-event');
    const eventRows = publicProgram.querySelectorAll('[data-event-row]');

    const tl = gsap.timeline({
      scrollTrigger: { trigger: publicProgram, start: 'top 84%', once: true },
      defaults: { ease: 'power4.out' }
    });

    if (kicker) tl.from(kicker, { y: 16, opacity: 0, duration: .45 });
    if (title) tl.from(title, { y: 34, opacity: 0, duration: .7 }, '-=.25');
    if (headSide) tl.from(headSide, { y: 18, opacity: 0, duration: .55 }, '-=.45');
    if (intro) tl.from(intro, { y: 14, opacity: 0, duration: .42 }, '-=.30');
    if (cta) tl.from(cta, { x: 18, opacity: 0, duration: .45 }, '-=.30');
    if (featuredEvent) tl.from(featuredEvent, { y: 28, opacity: 0, duration: .65 }, '-=.25');
    if (eventRows.length) tl.from(eventRows, { y: 22, opacity: 0, stagger: .09, duration: .5 }, '-=.38');

    // Subtle editorial hover lift without changing document flow.
    eventRows.forEach((row) => {
      const enter = () => gsap.to(row, { x: 7, duration: .3, ease: 'power2.out' });
      const leave = () => gsap.to(row, { x: 0, duration: .35, ease: 'power2.out' });
      row.addEventListener('mouseenter', enter);
      row.addEventListener('mouseleave', leave);
    });
  }

  // Journal / editorial index — compact reveal with no layout displacement.
  const journal = document.querySelector('#journal');
  if (journal && window.gsap) {
    const journalTitle = journal.querySelector('.journal-title-block');
    const journalSide = journal.querySelector('.journal-head-side');
    const journalRows = journal.querySelectorAll('.journal-row');
    const journalFooter = journal.querySelector('.journal-footer');

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const journalIntro = gsap.timeline({
        scrollTrigger: { trigger: journal, start: 'top 82%', once: true }
      });

      if (journalTitle) {
        journalIntro.from(journalTitle, {
          y: 34, opacity: 0, duration: .72, ease: 'power4.out'
        });
      }
      if (journalSide) {
        journalIntro.from(journalSide, {
          y: 24, opacity: 0, duration: .62, ease: 'power3.out'
        }, '-=.42');
      }
      if (journalRows.length) {
        journalIntro.from(journalRows, {
          y: 26,
          opacity: 0,
          duration: .62,
          stagger: .1,
          ease: 'power4.out'
        }, '-=.2');
      }
      if (journalFooter) {
        journalIntro.from(journalFooter, {
          opacity: 0, y: 10, duration: .4, ease: 'power3.out'
        }, '-=.25');
      }
    }

    journal.querySelectorAll('.journal-row').forEach((row) => {
      const title = row.querySelector('.journal-content strong');
      const arrow = row.querySelector('.journal-arrow');
      row.addEventListener('mouseenter', () => {
        if (window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          gsap.to(title, { x: 8, duration: .35, ease: 'power3.out', overwrite: true });
          gsap.to(arrow, { x: 4, y: -4, duration: .35, ease: 'power3.out', overwrite: true });
        }
      });
      row.addEventListener('mouseleave', () => {
        if (window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          gsap.to(title, { x: 0, duration: .4, ease: 'power3.out', overwrite: true });
          gsap.to(arrow, { x: 0, y: 0, duration: .4, ease: 'power3.out', overwrite: true });
        }
      });
    });
  }


  // About hero V22 — restrained editorial entrance, fully scoped to About.
  const aboutHero = document.querySelector('.about-hero-v2');
  if (aboutHero && window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const top = aboutHero.querySelector('.about-hero-v2-top');
    const index = aboutHero.querySelector('.about-hero-v2-index');
    const title = aboutHero.querySelector('#about-hero-title');
    const intro = aboutHero.querySelector('.about-hero-v2-intro');
    const actions = aboutHero.querySelector('.about-hero-v2-actions');
    const panel = aboutHero.querySelector('.about-hero-v2-panel');
    const panelItems = aboutHero.querySelectorAll('.about-panel-list > div');
    const footer = aboutHero.querySelector('.about-hero-v2-footer');

    gsap.set([top,index,title,intro,actions,panel,footer].filter(Boolean), { opacity: 0 });
    gsap.set([index,title,intro,actions,panel,footer].filter(Boolean), { y: 28 });
    gsap.set(panelItems, { opacity: 0, y: 16 });

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    if (top) tl.to(top, { opacity: 1, duration: .45 });
    if (index) tl.to(index, { opacity: 1, y: 0, duration: .45 }, '-=.18');
    if (title) tl.to(title, { opacity: 1, y: 0, duration: .85 }, '-=.18');
    if (intro) tl.to(intro, { opacity: 1, y: 0, duration: .55 }, '-=.45');
    if (actions) tl.to(actions, { opacity: 1, y: 0, duration: .45 }, '-=.28');
    if (panel) tl.to(panel, { opacity: 1, y: 0, duration: .7 }, '-=.48');
    if (panelItems.length) tl.to(panelItems, { opacity: 1, y: 0, duration: .4, stagger: .07 }, '-=.28');
    if (footer) tl.to(footer, { opacity: 1, y: 0, duration: .35 }, '-=.18');

    const panelNumber = aboutHero.querySelector('.about-panel-number');
    if (panelNumber) {
      gsap.to(panelNumber, {
        yPercent: 9,
        ease: 'none',
        scrollTrigger: { trigger: aboutHero, start: 'top top', end: 'bottom top', scrub: 1.2 }
      });
    }
  }

});

/* Admissions CTA — restrained editorial motion, no layout displacement. */
window.addEventListener('load', () => {
  if (!window.gsap) return;
  const section = document.querySelector('#admissions-cta');
  if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const intro = section.querySelector('.apply-intro');
  const detail = section.querySelector('.apply-detail');
  const steps = section.querySelectorAll('.apply-step');
  const primary = section.querySelector('.apply-primary');
  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 82%', once: true },
    defaults: { ease: 'power4.out' }
  });
  if (intro) tl.from(intro, { y: 34, opacity: 0, duration: .75 });
  if (detail) tl.from(detail, { y: 28, opacity: 0, duration: .68 }, '-=.48');
  if (steps.length) tl.from(steps, { y: 18, opacity: 0, stagger: .08, duration: .48 }, '-=.32');
  if (primary) tl.from(primary, { y: 12, opacity: 0, duration: .42 }, '-=.25');

  steps.forEach((step) => {
    const arrow = step.querySelector('i');
    step.addEventListener('mouseenter', () => {
      gsap.to(arrow, { x: 5, y: -4, duration: .28, ease: 'power2.out', overwrite: true });
    });
    step.addEventListener('mouseleave', () => {
      gsap.to(arrow, { x: 0, y: 0, duration: .32, ease: 'power2.out', overwrite: true });
    });
  });
});

/* Global footer motion — shared across the public-facing site. */
window.addEventListener('load', () => {
  const footer = document.querySelector('.site-footer');
  if (!footer || !window.gsap) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = footer.querySelectorAll('[data-footer-reveal]');
  if (!reduced && window.ScrollTrigger) {
    gsap.from(items, {
      y: 28,
      opacity: 0,
      duration: .7,
      stagger: .09,
      ease: 'power4.out',
      scrollTrigger: { trigger: footer, start: 'top 88%', once: true }
    });
  }

  footer.querySelectorAll('.footer-socials a, .footer-links a').forEach((link) => {
    link.addEventListener('mouseenter', () => {
      if (!reduced) gsap.to(link, { overwrite: true });
    });
  });

});


  // About hero V23 — image-led motion system. Scoped to the About hero only.
  const aboutV3 = document.querySelector('.about-hero-v3');
  if (aboutV3 && window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const image = aboutV3.querySelector('.about-v3-image');
    const frame = aboutV3.querySelector('.about-v3-image-frame');
    const note = aboutV3.querySelector('.about-v3-note');
    const rail = aboutV3.querySelector('.about-hero-v3-rail');
    const title = aboutV3.querySelector('#about-hero-title');

    gsap.fromTo(frame,
      { clipPath: 'inset(0 0 0 100%)' },
      { clipPath: 'inset(0 0 0 0%)', duration: 1.15, ease: 'power4.inOut', delay: .08 }
    );
    gsap.from(note, { y: 42, opacity: 0, duration: .75, ease: 'power4.out', delay: .45 });
    if (title) gsap.from(title, { y: 38, opacity: 0, duration: .85, ease: 'power4.out', delay: .16 });
    if (rail) gsap.from(rail, { opacity: 0, duration: .5, delay: .7 });

    if (image) {
      gsap.to(image, {
        scale: 1.10,
        yPercent: -3,
        ease: 'none',
        scrollTrigger: { trigger: aboutV3, start: 'top bottom', end: 'bottom top', scrub: 1.1 }
      });
    }
    if (note) {
      gsap.to(note, {
        yPercent: -4,
        ease: 'none',
        scrollTrigger: { trigger: aboutV3, start: 'top bottom', end: 'bottom top', scrub: 1.25 }
      });
    }
  }


/* About Hero V24 — progressive enhancement only. Base CSS keeps all content visible. */
window.addEventListener('load', () => {
  const hero = document.querySelector('.about-hero-v3');
  if (!hero || !window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const parts = [
    hero.querySelector('.about-hero-v3-kicker'),
    hero.querySelector('#about-hero-title'),
    hero.querySelector('.about-hero-v3-bottom p'),
    hero.querySelector('.about-hero-v3-actions'),
    hero.querySelector('.about-v3-image-frame'),
    hero.querySelector('.about-v3-note'),
    hero.querySelector('.about-hero-v3-rail')
  ].filter(Boolean);

  gsap.fromTo(parts,
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, duration: .8, stagger: .08, ease: 'power4.out', clearProps: 'transform' }
  );

  const image = hero.querySelector('.about-v3-image');
  if (image && window.ScrollTrigger) {
    gsap.to(image, {
      scale: 1.045,
      yPercent: -2.2,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.1 }
    });
  }
});


// About Orientation V1 — progressive editorial reveal.
window.addEventListener('load', () => {
  const section = document.querySelector('.about-orientation');
  if (!section || !window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const copy = section.querySelector('.about-orientation-copy');
  const visual = section.querySelector('.about-orientation-visual');
  const items = section.querySelectorAll('.orientation-principle');
  const image = section.querySelector('.orientation-photo-wrap');
  const stamp = section.querySelector('.orientation-stamp');
  gsap.fromTo([copy, visual].filter(Boolean), { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: .9, stagger: .12, ease: 'power4.out', clearProps: 'transform' });
  if (items.length) gsap.fromTo(items, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .65, stagger: .1, ease: 'power3.out', delay: .35, clearProps: 'transform' });
  if (stamp) gsap.fromTo(stamp, { scale: .72, rotation: -8, opacity: 0 }, { scale: 1, rotation: 5, opacity: 1, duration: .8, ease: 'back.out(1.5)', delay: .5 });
  if (image && window.ScrollTrigger) {
    gsap.fromTo(image, { clipPath: 'inset(0 0 0 12%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 1.1, ease: 'power4.inOut', scrollTrigger: { trigger: section, start: 'top 82%' } });
    const img = image.querySelector('img');
    if (img) gsap.to(img, { yPercent: -3, scale: 1.055, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.1 } });
  }
});


// About Creative Ecosystem V2 — enhanced editorial motion.
window.addEventListener('load', () => {
  const section = document.querySelector('.about-ecosystem');
  if (!section || !window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const intro = section.querySelector('.ecosystem-intro');
  const visual = section.querySelector('.ecosystem-image-wrap');
  const paths = section.querySelectorAll('.ecosystem-path');
  const bottom = section.querySelectorAll('.ecosystem-bottom-card');
  const badge = section.querySelector('.ecosystem-badge');
  const image = section.querySelector('.ecosystem-image');

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 82%', once: true },
    defaults: { ease: 'power4.out' }
  });

  tl.fromTo(intro, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: .85 })
    .fromTo(visual, { y: 42, opacity: 0, clipPath: 'inset(0 0 0 12%)' },
      { y: 0, opacity: 1, clipPath: 'inset(0 0 0 0%)', duration: 1.05 }, '-=.58')
    .fromTo(paths, { x: 26, opacity: 0 }, { x: 0, opacity: 1, duration: .62, stagger: .1 }, '-=.7')
    .fromTo(bottom, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: .55, stagger: .1 }, '-=.32');

  if (badge) {
    gsap.fromTo(badge,
      { scale: .7, rotation: 8, opacity: 0 },
      { scale: 1, rotation: -7, opacity: 1, duration: .75, delay: .4, ease: 'back.out(1.45)',
        scrollTrigger: { trigger: section, start: 'top 82%', once: true } }
    );
  }

  if (image && window.ScrollTrigger) {
    const img = image.querySelector('img');
    if (img) {
      gsap.to(img, {
        yPercent: -3,
        scale: 1.055,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.1 }
      });
    }
  }
});


// About Learn By Doing V3 — editorial process motion.
window.addEventListener('load', () => {
  const section = document.querySelector('.about-practice');
  if (!section || !window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const q = (s) => section.querySelectorAll(s);
  const stageLine = section.querySelector('.practice-stage-line');

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 82%', once: true },
    defaults: { ease: 'power4.out' }
  });

  tl.fromTo('.practice-topline-label', { x:-20, opacity:0 }, { x:0, opacity:1, duration:.55 })
    .fromTo('.practice-topline p', { y:22, opacity:0 }, { y:0, opacity:1, duration:.7 }, '-=.35')
    .fromTo('.practice-kicker', { y:18, opacity:0 }, { y:0, opacity:1, duration:.5 }, '-=.3')
    .fromTo('.practice-intro h2', { y:55, opacity:0 }, { y:0, opacity:1, duration:1 }, '-=.25')
    .fromTo('.practice-description', { y:25, opacity:0 }, { y:0, opacity:1, duration:.65 }, '-=.7')
    .fromTo(q('.practice-step'), { y:35, opacity:0 }, { y:0, opacity:1, duration:.62, stagger:.11 }, '-=.35')
    .fromTo('.practice-footer', { y:20, opacity:0 }, { y:0, opacity:1, duration:.55 }, '-=.25');

  if (stageLine && window.ScrollTrigger) {
    gsap.fromTo(stageLine, { scaleX:0 }, {
      scaleX:1, duration:1.25, ease:'power3.inOut',
      scrollTrigger:{ trigger:stageLine, start:'top 84%', once:true }
    });
  }
});


// About Practice V4 — animation for the actual fourth section.
window.addEventListener('load', () => {
  const section = document.querySelector('.about-practice-v4');
  if (!section || !window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const steps = section.querySelectorAll('.practice-v4-step');
  const tl = gsap.timeline({
    scrollTrigger:{trigger:section,start:'top 78%',once:true},
    defaults:{ease:'power4.out'}
  });

  tl.fromTo('.practice-v4-kicker',{y:18,opacity:0},{y:0,opacity:1,duration:.5})
    .fromTo('.practice-v4-title-row h2',{y:45,opacity:0},{y:0,opacity:1,duration:.85},'-=.25')
    .fromTo('.practice-v4-script',{y:25,opacity:0,rotation:-13},{y:0,opacity:1,rotation:-7,duration:.65},'-=.55')
    .fromTo('.practice-v4-lead',{y:25,opacity:0},{y:0,opacity:1,duration:.6},'-=.38')
    .fromTo('.practice-v4-cta',{y:18,opacity:0},{y:0,opacity:1,duration:.5},'-=.3')
    .fromTo('.practice-v4-visual',{x:40,opacity:0,clipPath:'inset(0 0 0 10%)'},{x:0,opacity:1,clipPath:'inset(0 0 0 0%)',duration:1},'-=.75')
    .fromTo(steps,{y:25,opacity:0},{y:0,opacity:1,duration:.5,stagger:.09},'-=.45')
    .fromTo('.practice-v4-badge',{scale:.7,opacity:0},{scale:1,opacity:1,duration:.6,ease:'back.out(1.5)'},'-=.4')
    .fromTo('.practice-v4-inset',{y:20,opacity:0},{y:0,opacity:1,duration:.45},'-=.25');

  const img = section.querySelector('.practice-v4-image img');
  if (img && window.ScrollTrigger) {
    gsap.to(img,{
      yPercent:-3,scale:1.06,ease:'none',
      scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',scrub:1}
    });
  }
});


// About People V6 — safe practitioner section motion.
window.addEventListener('load', () => {
  const section = document.querySelector('.about-people-v6');
  if (!section || !window.gsap || !window.ScrollTrigger || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const tl = gsap.timeline({
    scrollTrigger:{trigger:section,start:'top 80%',once:true},
    defaults:{ease:'power4.out'}
  });

  tl.fromTo(section.querySelector('.people-v6-image'),
      {x:-28,opacity:0,clipPath:'inset(0 8% 0 0)'},
      {x:0,opacity:1,clipPath:'inset(0 0 0 0)',duration:.9})
    .fromTo(section.querySelector('.people-v6-panel'),
      {x:28,opacity:0},
      {x:0,opacity:1,duration:.75},'-=.7')
    .fromTo(section.querySelector('.people-v6-kicker'),
      {y:16,opacity:0},{y:0,opacity:1,duration:.4},'-=.4')
    .fromTo(section.querySelector('.people-v6-heading h2'),
      {y:32,opacity:0},{y:0,opacity:1,duration:.7},'-=.2')
    .fromTo(section.querySelector('.people-v6-lead'),
      {y:16,opacity:0},{y:0,opacity:1,duration:.5},'-=.4')
    .fromTo(section.querySelector('.people-v6-link'),
      {y:12,opacity:0},{y:0,opacity:1,duration:.4},'-=.25')
    .fromTo(section.querySelectorAll('.people-v6-profile'),
      {y:18,opacity:0},{y:0,opacity:1,duration:.45,stagger:.08},'-=.15')
    .fromTo(section.querySelector('.people-v6-stats'),
      {y:16,opacity:0},{y:0,opacity:1,duration:.45},'-=.2');

  const image = section.querySelector('.people-v6-image img');
  gsap.to(image,{
    yPercent:-3,scale:1.055,ease:'none',
    scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',scrub:1}
  });

  section.querySelectorAll('.people-v6-stats strong').forEach(el => {
    const target = Number(el.dataset.count || 0);
    const obj = {value:0};
    gsap.to(obj,{
      value:target,duration:1.05,ease:'power2.out',
      scrollTrigger:{trigger:el,start:'top 86%',once:true},
      onUpdate:()=>{el.firstChild.textContent = Math.round(obj.value);}
    });
  });
});


// About Next V7 — final CTA / pathway motion.
window.addEventListener('load', () => {
  const section = document.querySelector('.about-next-v7');
  if (!section || !window.gsap || !window.ScrollTrigger || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const tl = gsap.timeline({scrollTrigger:{trigger:section,start:'top 82%',once:true},defaults:{ease:'power4.out'}});
  tl.fromTo(section.querySelector('.next-v7-top'),{y:-12,opacity:0},{y:0,opacity:1,duration:.45})
    .fromTo(section.querySelector('.next-v7-eyebrow'),{y:15,opacity:0},{y:0,opacity:1,duration:.4},'-=.25')
    .fromTo(section.querySelector('.next-v7-heading-wrap h2'),{y:45,opacity:0},{y:0,opacity:1,duration:.8},'-=.15')
    .fromTo(section.querySelector('.next-v7-intro'),{y:20,opacity:0},{y:0,opacity:1,duration:.5},'-=.45')
    .fromTo(section.querySelector('.next-v7-primary'),{y:15,opacity:0},{y:0,opacity:1,duration:.45},'-=.25')
    .fromTo(section.querySelectorAll('.next-v7-card'),{y:35,opacity:0},{y:0,opacity:1,duration:.55,stagger:.1},'-=.25')
    .fromTo(section.querySelector('.next-v7-bottom'),{y:15,opacity:0},{y:0,opacity:1,duration:.45},'-=.25');
});

// Blog Content V14 — AOS + GSAP editorial motion.
window.addEventListener('load', () => {
  if (window.AOS) {
    AOS.init({
      duration: 850,
      easing: 'ease-out-cubic',
      once: true,
      offset: 70,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const feature = document.querySelector('.blog-v14-feature');
  if (!window.gsap || prefersReduced) return;

  if (feature) {
    const copy = feature.querySelector('.blog-v14-feature-copy');
    const reveals = feature.querySelectorAll('[data-feature-reveal]');
    if (copy && reveals.length) {
      gsap.fromTo(reveals,
        {y:26, opacity:0},
        {y:0, opacity:1, duration:.72, stagger:.1, ease:'power3.out',
         scrollTrigger: window.ScrollTrigger ? {trigger:copy,start:'top 78%',once:true} : undefined}
      );
    }
    const details = feature.querySelectorAll('.blog-v14-feature-detail');
    if (details.length) {
      gsap.fromTo(details,
        {x:24, opacity:0},
        {x:0, opacity:1, duration:.6, stagger:.12, ease:'power2.out',
         scrollTrigger: window.ScrollTrigger ? {trigger:details[0],start:'top 82%',once:true} : undefined}
      );
    }

    const image = feature.querySelector('[data-gsap-parallax] img');
    if (image && window.ScrollTrigger) {
      gsap.fromTo(image,
        {yPercent:-4, scale:1.03},
        {yPercent:3, scale:1.06, ease:'none',
         scrollTrigger:{trigger:feature,start:'top bottom',end:'bottom top',scrub:1.2}}
      );
    }
  }

  document.querySelectorAll('.blog-v14-note-card').forEach((card, i) => {
    gsap.fromTo(card,
      {y:45, opacity:0},
      {y:0, opacity:1, duration:.8, delay:i*.08, ease:'power3.out',
       scrollTrigger: window.ScrollTrigger ? {trigger:card,start:'top 82%',once:true} : undefined}
    );
  });

  document.querySelectorAll('.blog-v14-archive-item').forEach((item, i) => {
    gsap.fromTo(item,
      {x:-25, opacity:0},
      {x:0, opacity:1, duration:.65, delay:i*.07, ease:'power3.out',
       scrollTrigger: window.ScrollTrigger ? {trigger:item,start:'top 88%',once:true} : undefined}
    );
  });

  const people = document.querySelector('.blog-v14-people');
  if (people) {
    gsap.fromTo(people.querySelector('.blog-v14-people-copy'),
      {x:35, opacity:0},
      {x:0, opacity:1, duration:.8, ease:'power3.out',
       scrollTrigger: window.ScrollTrigger ? {trigger:people,start:'top 75%',once:true} : undefined}
    );
  }
});



/* ===== BLOG CONTENT V18 — CONVERSATIONS GSAP ===== */
(function initBlogV18Conversations(){
  if (!window.gsap) return;
  const section = document.querySelector('.blog-v18-conversations');
  if (!section) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const kicker = section.querySelector('.blog-v18-kicker');
  const title = section.querySelector('.blog-v18-title-wrap');
  const lead = section.querySelector('.blog-v18-lead');
  const topics = section.querySelectorAll('.blog-v18-topic');
  const link = section.querySelector('.blog-v18-conversation-link');
  const visual = section.querySelector('.blog-v18-conversations-visual');
  const accent = section.querySelector('.blog-v18-accent-line');
  const bottom = section.querySelector('.blog-v18-bottom');

  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  gsap.set([kicker, title, lead, link, visual, bottom], {autoAlpha:0, y:34});
  gsap.set(topics, {autoAlpha:0, x:-24});
  gsap.set(accent, {scaleY:0});

  const tl = gsap.timeline({
    scrollTrigger: window.ScrollTrigger ? {
      trigger: section,
      start: 'top 72%',
      once: true
    } : undefined
  });

  tl.to(kicker, {autoAlpha:1, y:0, duration:.45, ease:'power2.out'})
    .to(accent, {scaleY:1, duration:.6, ease:'power3.out'}, '-=.25')
    .to(title, {autoAlpha:1, y:0, duration:.72, ease:'power3.out'}, '-=.35')
    .to(lead, {autoAlpha:1, y:0, duration:.55, ease:'power2.out'}, '-=.42')
    .to(topics, {autoAlpha:1, x:0, duration:.48, stagger:.09, ease:'power2.out'}, '-=.25')
    .to(link, {autoAlpha:1, y:0, duration:.5, ease:'power2.out'}, '-=.22')
    .to(visual, {autoAlpha:1, y:0, duration:.75, ease:'power3.out'}, '-=.55')
    .to(bottom, {autoAlpha:1, y:0, duration:.45, ease:'power2.out'}, '-=.35');

  if (window.ScrollTrigger) {
    gsap.to(visual.querySelector('img'), {
      yPercent:-5,
      ease:'none',
      scrollTrigger:{
        trigger:visual,
        start:'top bottom',
        end:'bottom top',
        scrub:1
      }
    });
  }
})();

/* ===== BLOG V20 — FINAL SECTION GSAP ===== */
(function(){
  if(!window.gsap)return;
  const s=document.querySelector('.blog-v20-journal-cta');
  if(!s||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
  const q=s.querySelectorAll('.blog-v20-cta-top,.blog-v20-cta-kicker,.blog-v20-cta-copy h2,.blog-v20-cta-copy p,.blog-v20-cta-button,.blog-v20-cta-visual,.blog-v20-cta-bottom');
  gsap.set(q,{autoAlpha:0,y:32});
  gsap.set(s.querySelector('.blog-v20-round-mark'),{scale:0,rotation:-25});
  const t=gsap.timeline({scrollTrigger:window.ScrollTrigger?{trigger:s,start:'top 72%',once:true}:undefined});
  t.to(q[0],{autoAlpha:1,y:0,duration:.4}).to(q[1],{autoAlpha:1,y:0,duration:.4},'-.2').to(q[2],{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.2').to(q[3],{autoAlpha:1,y:0,duration:.45},'-.4').to(q[4],{autoAlpha:1,y:0,duration:.45},'-.2').to(q[5],{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.5').to(q[6],{autoAlpha:1,y:0,duration:.4},'-.3').to(s.querySelector('.blog-v20-round-mark'),{scale:1,rotation:0,duration:.55,ease:'back.out(1.7)'},'-.5');
  if(window.ScrollTrigger)gsap.to(s.querySelector('.blog-v20-photo img'),{yPercent:-4,ease:'none',scrollTrigger:{trigger:s,start:'top bottom',end:'bottom top',scrub:1}});
})();

/* ===== SERVICES HERO V1 — GSAP ===== */
(function initServicesHeroV1(){
  if(!window.gsap)return;
  const section=document.querySelector('.services-v1-hero');
  if(!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);

  const targets=[
    section.querySelector('.services-v1-topbar'),
    section.querySelector('.services-v1-kicker'),
    section.querySelector('.services-v1-copy h1'),
    section.querySelector('.services-v1-intro'),
    section.querySelector('.services-v1-actions'),
    section.querySelector('.services-v1-visual'),
    section.querySelector('.services-v1-bottom')
  ].filter(Boolean);

  gsap.set(targets,{autoAlpha:0,y:34});
  gsap.set(section.querySelector('.services-v1-floating-card'),{autoAlpha:0,x:35,rotation:2});

  const tl=gsap.timeline();
  tl.to(targets[0],{autoAlpha:1,y:0,duration:.45,ease:'power2.out'})
    .to(targets[1],{autoAlpha:1,y:0,duration:.4,ease:'power2.out'},'-.2')
    .to(targets[2],{autoAlpha:1,y:0,duration:.75,ease:'power3.out'},'-.18')
    .to(targets[3],{autoAlpha:1,y:0,duration:.48,ease:'power2.out'},'-.4')
    .to(targets[4],{autoAlpha:1,y:0,duration:.45,ease:'power2.out'},'-.22')
    .to(targets[5],{autoAlpha:1,y:0,duration:.75,ease:'power3.out'},'-.55')
    .to(section.querySelector('.services-v1-floating-card'),{autoAlpha:1,x:0,rotation:0,duration:.6,ease:'back.out(1.4)'},'-.45')
    .to(targets[6],{autoAlpha:1,y:0,duration:.4,ease:'power2.out'},'-.25');

  gsap.to(section.querySelector('.services-v1-orb-one'),{x:35,y:22,duration:6,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to(section.querySelector('.services-v1-orb-two'),{x:-25,y:-18,duration:7,repeat:-1,yoyo:true,ease:'sine.inOut'});
})();

/* ===== SERVICES SECTION V2 — GSAP ===== */
(function initServicesPracticeV2(){
  if(!window.gsap)return;
  const s=document.querySelector('.services-v2-practice');
  if(!s || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
  const items=s.querySelectorAll('.services-v2-item');
  const targets=[
    s.querySelector('.services-v2-head'),
    s.querySelector('.services-v2-copy h2'),
    s.querySelector('.services-v2-copy>p'),
    s.querySelector('.services-v2-list'),
    s.querySelector('.services-v2-visual'),
    s.querySelector('.services-v2-note')
  ].filter(Boolean);
  gsap.set(targets,{autoAlpha:0,y:35});
  gsap.set(items,{autoAlpha:0,x:-24});
  const tl=gsap.timeline({scrollTrigger:window.ScrollTrigger?{trigger:s,start:'top 74%',once:true}:undefined});
  tl.to(targets[0],{autoAlpha:1,y:0,duration:.4,ease:'power2.out'})
    .to(targets[1],{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.18')
    .to(targets[2],{autoAlpha:1,y:0,duration:.45,ease:'power2.out'},'-.4')
    .to(targets[3],{autoAlpha:1,y:0,duration:.45,ease:'power2.out'},'-.2')
    .to(items,{autoAlpha:1,x:0,duration:.42,stagger:.09,ease:'power2.out'},'-.2')
    .to(targets[4],{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.5')
    .to(targets[5],{autoAlpha:1,y:0,duration:.4,ease:'power2.out'},'-.3');
  if(window.ScrollTrigger){
    gsap.to(s.querySelector('.services-v2-image img'),{yPercent:-4,ease:'none',
      scrollTrigger:{trigger:s,start:'top bottom',end:'bottom top',scrub:1}});
  }
})();

/* ===== SERVICES SECTION V3 — GSAP ===== */
(function initServicesPracticeV3(){
  if(!window.gsap)return;
  const s=document.querySelector('.services-v3-practice');
  if(!s||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
  const q=[s.querySelector('.services-v3-top'),s.querySelector('.services-v3-heading'),s.querySelector('.services-v3-intro'),s.querySelector('.services-v3-services'),s.querySelector('.services-v3-media'),s.querySelector('.services-v3-caption')].filter(Boolean);
  const rows=s.querySelectorAll('.services-v3-row');
  gsap.set(q,{autoAlpha:0,y:34}); gsap.set(rows,{autoAlpha:0,x:-20}); gsap.set(s.querySelector('.services-v3-accent'),{scaleY:0});
  const t=gsap.timeline({scrollTrigger:window.ScrollTrigger?{trigger:s,start:'top 74%',once:true}:undefined});
  t.to(q[0],{autoAlpha:1,y:0,duration:.4}).to(s.querySelector('.services-v3-accent'),{scaleY:1,duration:.55},'-.2').to(q[1],{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.35').to(q[2],{autoAlpha:1,y:0,duration:.45},'-.4').to(q[3],{autoAlpha:1,y:0,duration:.4},'-.2').to(rows,{autoAlpha:1,x:0,duration:.4,stagger:.09},'-.2').to(q[4],{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.5').to(q[5],{autoAlpha:1,y:0,duration:.4},'-.3');
  if(window.ScrollTrigger)gsap.to(s.querySelector('.services-v3-image img'),{yPercent:-4,ease:'none',scrollTrigger:{trigger:s,start:'top bottom',end:'bottom top',scrub:1}});
})();

/* ===== SERVICES SECTION V4 — GSAP ===== */
(function initServicesDisciplinesV4(){
  if(!window.gsap)return;
  const s=document.querySelector('.services-v4-disciplines');
  if(!s || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
  const q=[
    s.querySelector('.services-v4-head'),
    s.querySelector('.services-v4-intro'),
    s.querySelector('.services-v4-image'),
    s.querySelector('.services-v4-routes'),
    s.querySelector('.services-v4-footer')
  ].filter(Boolean);
  const routes=s.querySelectorAll('.services-v4-route');
  gsap.set(q,{autoAlpha:0,y:35});
  gsap.set(routes,{autoAlpha:0,y:22});
  const tl=gsap.timeline({scrollTrigger:window.ScrollTrigger?{trigger:s,start:'top 74%',once:true}:undefined});
  tl.to(q[0],{autoAlpha:1,y:0,duration:.4,ease:'power2.out'})
    .to(q[1],{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.18')
    .to(q[2],{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.38')
    .to(q[3],{autoAlpha:1,y:0,duration:.55,ease:'power2.out'},'-.5')
    .to(routes,{autoAlpha:1,y:0,duration:.4,stagger:.07,ease:'power2.out'},'-.28')
    .to(q[4],{autoAlpha:1,y:0,duration:.4,ease:'power2.out'},'-.2');
  if(window.ScrollTrigger){
    gsap.to(s.querySelector('.services-v4-image img'),{
      yPercent:-5,ease:'none',
      scrollTrigger:{trigger:s,start:'top bottom',end:'bottom top',scrub:1}
    });
  }
})();

/* ===== SERVICES SECTION V5 — GSAP ===== */
(function initServicesDisciplinesV5(){
  if(!window.gsap)return;
  const s=document.querySelector('.services-v5-disciplines');
  if(!s || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
  const q=[s.querySelector('.services-v5-top'),s.querySelector('.services-v5-intro h2'),s.querySelector('.services-v5-intro>p'),s.querySelector('.services-v5-cta'),s.querySelector('.services-v5-feature'),s.querySelector('.services-v5-routes'),s.querySelector('.services-v5-bottom')].filter(Boolean);
  const routes=s.querySelectorAll('.services-v5-route');
  gsap.set(q,{autoAlpha:0,y:32});
  gsap.set(routes,{autoAlpha:0,y:20});
  const tl=gsap.timeline({scrollTrigger:window.ScrollTrigger?{trigger:s,start:'top 75%',once:true}:undefined});
  tl.to(q[0],{autoAlpha:1,y:0,duration:.4,ease:'power2.out'})
    .to(q[1],{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.18')
    .to(q[2],{autoAlpha:1,y:0,duration:.45},'-.38')
    .to(q[3],{autoAlpha:1,y:0,duration:.4},'-.2')
    .to(q[4],{autoAlpha:1,y:0,duration:.65,ease:'power3.out'},'-.45')
    .to(q[5],{autoAlpha:1,y:0,duration:.5},'-.4')
    .to(routes,{autoAlpha:1,y:0,duration:.4,stagger:.07,ease:'power2.out'},'-.25')
    .to(q[6],{autoAlpha:1,y:0,duration:.4},'-.15');
  if(window.ScrollTrigger)gsap.to(s.querySelector('.services-v5-feature-image img'),{yPercent:-4,ease:'none',scrollTrigger:{trigger:s,start:'top bottom',end:'bottom top',scrub:1}});
})();

/* ===== SERVICES SECTION V7 — PROCESS GSAP ===== */
(function initServicesProcessV7(){
  if(!window.gsap)return;
  const s=document.querySelector('.services-v7-development');
  if(!s || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
  const q=[s.querySelector('.services-v7-top'),s.querySelector('.services-v7-heading'),s.querySelector('.services-v7-bottom')].filter(Boolean);
  const steps=s.querySelectorAll('.services-v7-step');
  gsap.set(q,{autoAlpha:0,y:30});
  gsap.set(steps,{autoAlpha:0,y:38});
  const tl=gsap.timeline({scrollTrigger:window.ScrollTrigger?{trigger:s,start:'top 75%',once:true}:undefined});
  tl.to(q[0],{autoAlpha:1,y:0,duration:.4,ease:'power2.out'})
    .to(q[1],{autoAlpha:1,y:0,duration:.65,ease:'power3.out'},'-.18')
    .to(steps,{autoAlpha:1,y:0,duration:.5,stagger:.1,ease:'power3.out'},'-.28')
    .to(q[2],{autoAlpha:1,y:0,duration:.4,ease:'power2.out'},'-.2');
})();

/* ===== SERVICES SECTION V8 — PEOPLE GSAP ===== */
(function initServicesPeopleV8(){
  if(!window.gsap)return;
  const s=document.querySelector('.services-v8-people');
  if(!s || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
  const q=[s.querySelector('.services-v8-top'),s.querySelector('.services-v8-visual'),s.querySelector('.services-v8-copy h2'),s.querySelector('.services-v8-lead'),s.querySelector('.services-v8-people-list'),s.querySelector('.services-v8-cta'),s.querySelector('.services-v8-bottom')].filter(Boolean);
  const people=s.querySelectorAll('.services-v8-person');
  gsap.set(q,{autoAlpha:0,y:32});
  gsap.set(people,{autoAlpha:0,x:28});
  const tl=gsap.timeline({scrollTrigger:window.ScrollTrigger?{trigger:s,start:'top 74%',once:true}:undefined});
  tl.to(q[0],{autoAlpha:1,y:0,duration:.4,ease:'power2.out'})
    .to(q[1],{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.15')
    .to(q[2],{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.45')
    .to(q[3],{autoAlpha:1,y:0,duration:.45},'-.4')
    .to(q[4],{autoAlpha:1,y:0,duration:.45},'-.25')
    .to(people,{autoAlpha:1,x:0,duration:.42,stagger:.09,ease:'power2.out'},'-.2')
    .to(q[5],{autoAlpha:1,y:0,duration:.4},'-.2')
    .to(q[6],{autoAlpha:1,y:0,duration:.35},'-.12');
  if(window.ScrollTrigger){
    gsap.to(s.querySelector('.services-v8-visual img'),{
      yPercent:-5,ease:'none',
      scrollTrigger:{trigger:s,start:'top bottom',end:'bottom top',scrub:1}
    });
  }
})();

/* ===== SERVICES SECTION V10 — FINAL CTA GSAP ===== */
(function initServicesFinalV10(){
  if(!window.gsap)return;
  const s=document.querySelector('.services-v10-final');
  if(!s || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
  const q=[s.querySelector('.services-v10-top'),s.querySelector('.services-v10-overline'),s.querySelector('.services-v10-copy h2'),s.querySelector('.services-v10-copy p'),s.querySelector('.services-v10-cta'),s.querySelector('.services-v10-image'),s.querySelector('.services-v10-bottom')].filter(Boolean);
  gsap.set(q,{autoAlpha:0,y:30});
  const tl=gsap.timeline({scrollTrigger:window.ScrollTrigger?{trigger:s,start:'top 76%',once:true}:undefined});
  tl.to(q[0],{autoAlpha:1,y:0,duration:.4,ease:'power2.out'})
    .to(q[1],{autoAlpha:1,y:0,duration:.35},'-.16')
    .to(q[2],{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.12')
    .to(q[3],{autoAlpha:1,y:0,duration:.45},'-.4')
    .to(q[4],{autoAlpha:1,y:0,duration:.4},'-.2')
    .to(q[5],{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.5')
    .to(q[6],{autoAlpha:1,y:0,duration:.35},'-.18');
  if(window.ScrollTrigger){
    gsap.to(s.querySelector('.services-v10-image img'),{
      yPercent:-5,ease:'none',
      scrollTrigger:{trigger:s,start:'top bottom',end:'bottom top',scrub:1}
    });
  }
})();

/* ===== SERVICES V12 — COMPLETE FINAL SECTION GSAP ===== */
(function initServicesFinalV12(){
  if(!window.gsap)return;
  const s=document.querySelector('.services-v12-final');
  if(!s || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
  const els=[
    s.querySelector('.services-v12-meta'),
    s.querySelector('.services-v12-label'),
    s.querySelector('.services-v12-intro h2'),
    s.querySelector('.services-v12-intro p'),
    s.querySelector('.services-v12-image'),
    s.querySelectorAll('.services-v12-action'),
    s.querySelector('.services-v12-footer')
  ];
  const flat=[];
  els.forEach(x=>x instanceof NodeList ? x.forEach(y=>flat.push(y)) : x && flat.push(x));
  gsap.set(flat,{autoAlpha:0,y:28});
  const tl=gsap.timeline({scrollTrigger:window.ScrollTrigger?{trigger:s,start:'top 76%',once:true}:undefined});
  tl.to(els[0],{autoAlpha:1,y:0,duration:.4,ease:'power2.out'})
    .to(els[1],{autoAlpha:1,y:0,duration:.35},'-.16')
    .to(els[2],{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.12')
    .to(els[3],{autoAlpha:1,y:0,duration:.45},'-.4')
    .to(els[4],{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.25')
    .to(els[5],{autoAlpha:1,y:0,duration:.42,stagger:.1,ease:'power2.out'},'-.42')
    .to(els[6],{autoAlpha:1,y:0,duration:.35},'-.18');
  if(window.ScrollTrigger){
    gsap.to(s.querySelector('.services-v12-image img'),{
      yPercent:-5,ease:'none',
      scrollTrigger:{trigger:s,start:'top bottom',end:'bottom top',scrub:1}
    });
  }
})();

/* ===== CONTACT V1 — FIVE SECTION GSAP MOTION ===== */
(function initContactV1(){
  if(!window.gsap)return;
  const sections=document.querySelectorAll('.contact-v1-hero,.contact-v1-connect,.contact-v1-visit,.contact-v1-form-section,.contact-v1-close');
  if(!sections.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);

  sections.forEach(section=>{
    const items=section.querySelectorAll(
      '.contact-v1-meta,.contact-v1-hero-copy,.contact-v1-hero-note,.contact-v1-section-head,'+
      '.contact-v1-connect-card,.contact-v1-visit-image,.contact-v1-visit-copy,'+
      '.contact-v1-form-intro,.contact-v1-form,.contact-v1-close-meta,.contact-v1-close-main'
    );
    gsap.set(items,{autoAlpha:0,y:28});
    gsap.to(items,{
      autoAlpha:1,y:0,duration:.6,stagger:.08,ease:'power3.out',
      scrollTrigger:window.ScrollTrigger?{trigger:section,start:'top 78%',once:true}:undefined
    });
  });

  if(window.ScrollTrigger){
    const image=document.querySelector('.contact-v1-visit-image img');
    if(image)gsap.to(image,{yPercent:-5,ease:'none',scrollTrigger:{trigger:image.closest('.contact-v1-visit'),start:'top bottom',end:'bottom top',scrub:1}});
  }
})();

/* ===== CONTACT V2 — SECTION 01 GSAP ===== */
(function initContactHeroV2(){
  if(!window.gsap)return;
  const s=document.querySelector('.contact-v2-hero');
  if(!s || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
  const items=[
    s.querySelector('.contact-v2-topline'),
    s.querySelector('.contact-v2-label'),
    s.querySelector('.contact-v2-copy h1'),
    s.querySelector('.contact-v2-lead'),
    s.querySelectorAll('.contact-v2-actions a'),
    s.querySelector('.contact-v2-visual'),
    s.querySelector('.contact-v2-note'),
    s.querySelector('.contact-v2-bottom')
  ];
  const flat=[];
  items.forEach(x=>x instanceof NodeList?x.forEach(y=>flat.push(y)):x&&flat.push(x));
  gsap.set(flat,{autoAlpha:0,y:26});
  const tl=gsap.timeline();
  tl.to(items[0],{autoAlpha:1,y:0,duration:.4,ease:'power2.out'})
    .to(items[1],{autoAlpha:1,y:0,duration:.35},'-.15')
    .to(items[2],{autoAlpha:1,y:0,duration:.75,ease:'power3.out'},'-.1')
    .to(items[3],{autoAlpha:1,y:0,duration:.45},'-.42')
    .to(items[4],{autoAlpha:1,y:0,duration:.4,stagger:.08},'-.28')
    .to(items[5],{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.4')
    .to(items[6],{autoAlpha:1,y:0,duration:.3},'-.25')
    .to(items[7],{autoAlpha:1,y:0,duration:.3},'-.12');
  if(window.ScrollTrigger){
    gsap.to(s.querySelector('.contact-v2-visual img'),{
      yPercent:-4,ease:'none',
      scrollTrigger:{trigger:s,start:'top top',end:'bottom top',scrub:1}
    });
  }
})();

/* ===== CONTACT V4 — SECTION 02 GSAP ===== */
(function initContactSectionV4(){
  if(!window.gsap)return;
  const s=document.querySelector('.contact-v4-paths');
  if(!s || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const q=(sel)=>s.querySelectorAll(sel);
  gsap.set([s.querySelector('.contact-v4-head'),s.querySelector('.contact-v4-eyebrow'),s.querySelector('.contact-v4-intro h2'),s.querySelector('.contact-v4-description'),s.querySelector('.contact-v4-image'),s.querySelectorAll('.contact-v4-option'),s.querySelector('.contact-v4-footerline')],{autoAlpha:0,y:24});
  const tl=gsap.timeline({
    scrollTrigger:window.ScrollTrigger?{trigger:s,start:'top 78%',once:true}:undefined
  });
  tl.to(s.querySelector('.contact-v4-head'),{autoAlpha:1,y:0,duration:.4,ease:'power2.out'})
    .to(s.querySelector('.contact-v4-eyebrow'),{autoAlpha:1,y:0,duration:.3},'-.12')
    .to(s.querySelector('.contact-v4-intro h2'),{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.1')
    .to(s.querySelector('.contact-v4-description'),{autoAlpha:1,y:0,duration:.4},'-.42')
    .to(s.querySelector('.contact-v4-image'),{autoAlpha:1,y:0,duration:.7,ease:'power3.out'},'-.25')
    .to(q('.contact-v4-option'),{autoAlpha:1,y:0,duration:.45,stagger:.1,ease:'power2.out'},'-.4')
    .to(s.querySelector('.contact-v4-footerline'),{autoAlpha:1,y:0,duration:.3},'-.15');
  if(window.ScrollTrigger){
    gsap.to(s.querySelector('.contact-v4-image img'),{
      yPercent:-5,ease:'none',
      scrollTrigger:{trigger:s,start:'top bottom',end:'bottom top',scrub:1}
    });
  }
})();

/* ===== CONTACT FORM V7 — CLIENT VALIDATION ===== */
(function initContactFormV7(){
  const form=document.getElementById('contactForm');
  if(!form)return;

  const fields={
    name:{el:form.elements.name,error:document.getElementById('nameError')},
    email:{el:form.elements.email,error:document.getElementById('emailError')},
    topic:{el:form.elements.topic,error:document.getElementById('topicError')},
    message:{el:form.elements.message,error:document.getElementById('messageError')}
  };

  const messages={
    name:'Please enter your name.',
    nameChars:'Name can contain letters, spaces, hyphens and apostrophes only.',
    nameLength:'Please enter at least 2 characters.',
    email:'Please enter your email address.',
    emailInvalid:'Please enter a valid email address.',
    topic:'Please select a topic.',
    message:'Please enter your message.',
    messageLength:'Please enter at least 10 characters.',
    messageLong:'Please keep your message under 1000 characters.'
  };

  const setError=(key,message)=>{
    const field=fields[key], wrapper=field.el.closest('.contact-field');
    field.error.textContent=message||'';
    wrapper.classList.toggle('has-error',Boolean(message));
    field.el.setAttribute('aria-invalid',message?'true':'false');
  };

  const validateName=()=>{
    const value=fields.name.el.value.trim();
    if(!value)return setError('name',messages.name),false;
    if(value.length<2)return setError('name',messages.nameLength),false;
    if(!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(value))
      return setError('name',messages.nameChars),false;
    setError('name',''); return true;
  };

  const validateEmail=()=>{
    const value=fields.email.el.value.trim();
    if(!value)return setError('email',messages.email),false;
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value))
      return setError('email',messages.emailInvalid),false;
    setError('email',''); return true;
  };

  const validateTopic=()=>{
    const ok=Boolean(fields.topic.el.value);
    setError('topic',ok?'':messages.topic); return ok;
  };

  const validateMessage=()=>{
    const value=fields.message.el.value.trim();
    if(!value)return setError('message',messages.message),false;
    if(value.length<10)return setError('message',messages.messageLength),false;
    if(value.length>1000)return setError('message',messages.messageLong),false;
    setError('message',''); return true;
  };

  fields.name.el.addEventListener('input',validateName);
  fields.email.el.addEventListener('input',validateEmail);
  fields.topic.el.addEventListener('change',validateTopic);
  fields.message.el.addEventListener('input',validateMessage);

  form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const valid=[validateName(),validateEmail(),validateTopic(),validateMessage()].every(Boolean);
    const status=document.getElementById('contactFormStatus');
    if(!valid){
      status.textContent='Please correct the highlighted fields before continuing.';
      const first=form.querySelector('.has-error input,.has-error select,.has-error textarea');
      if(first)first.focus();
      return;
    }
    status.textContent='Message details validated. Redirecting…';
    form.querySelector('button[type="submit"]').disabled=true;
    window.setTimeout(()=>{window.location.href='404.html';},250);
  });
})();

/* ===== CONTACT V8 — FINAL SECTION MOTION ===== */
(function initContactV8(){
  if(!window.gsap)return;
  const s=document.querySelector('.contact-v8-close');
  if(!s || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const q=(sel)=>s.querySelectorAll(sel);
  const tl=gsap.timeline({
    scrollTrigger:window.ScrollTrigger?{trigger:s,start:'top 78%',once:true}:undefined
  });
  gsap.set([s.querySelector('.contact-v8-topline'),s.querySelector('.contact-v8-eyebrow'),s.querySelector('.contact-v8-statement h2'),s.querySelector('.contact-v8-copy'),s.querySelectorAll('.contact-v8-link'),s.querySelector('.contact-v8-bottom')],{autoAlpha:0,y:28});
  tl.to(s.querySelector('.contact-v8-topline'),{autoAlpha:1,y:0,duration:.4,ease:'power2.out'})
    .to(s.querySelector('.contact-v8-eyebrow'),{autoAlpha:1,y:0,duration:.35},'-.12')
    .to(s.querySelector('.contact-v8-statement h2'),{autoAlpha:1,y:0,duration:.85,ease:'power3.out'},'-.1')
    .to(s.querySelector('.contact-v8-copy'),{autoAlpha:1,y:0,duration:.45},'-.45')
    .to(q('.contact-v8-link'),{autoAlpha:1,y:0,duration:.42,stagger:.09,ease:'power2.out'},'-.25')
    .to(s.querySelector('.contact-v8-bottom'),{autoAlpha:1,y:0,duration:.35},'-.1');
})();
