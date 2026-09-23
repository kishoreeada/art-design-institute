
(() => {
  'use strict';

  const body = document.body;
  const role = body.dataset.role || 'student';
  const email = new URLSearchParams(window.location.search).get('email') || '';
  const safeEmail = email.trim();
  const avatarLetter = (safeEmail[0] || (role === 'admin' ? 'A' : 'S')).toUpperCase();

  document.querySelectorAll('[data-user-email]').forEach(el => {
    el.textContent = safeEmail || (role === 'admin' ? 'admin@stackly.in' : 'student@stackly.in');
  });
  document.querySelectorAll('[data-avatar]').forEach(el => {
    el.textContent = avatarLetter;
  });

  const openButton = document.querySelector('[data-menu-open]');
  const closeButton = document.querySelector('[data-menu-close]');
  const overlay = document.querySelector('[data-menu-overlay]');
  const sidebarLinks = [...document.querySelectorAll('[data-tab]')];
  const views = [...document.querySelectorAll('[data-view]')];

  const setMenu = open => {
    body.classList.toggle('is-menu-open', open);
    if (openButton) openButton.setAttribute('aria-expanded', String(open));
  };

  openButton?.addEventListener('click', () => setMenu(true));
  closeButton?.addEventListener('click', () => setMenu(false));
  overlay?.addEventListener('click', () => setMenu(false));

  const activateTab = tab => {
    const target = document.querySelector(`[data-view="${tab}"]`);
    if (!target) return;

    sidebarLinks.forEach(link => {
      const active = link.dataset.tab === tab;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    views.forEach(view => view.classList.toggle('active', view.dataset.view === tab));
    document.title = `${target.dataset.title || tab} — Stackly Arts Institute`;
    setMenu(false);
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  const validTabs = new Set(sidebarLinks.map(link => link.dataset.tab));
  const initial = window.location.hash.replace('#','');
  activateTab(validTabs.has(initial) ? initial : 'overview');

  document.querySelectorAll('[data-tab-link]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const tab = link.dataset.tabLink;
      if (!validTabs.has(tab)) return;
      history.replaceState(null, '', `#${tab}`);
      activateTab(tab);
    });
  });

  sidebarLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const tab = link.dataset.tab;
      if (!validTabs.has(tab)) return;
      history.replaceState(null, '', `#${tab}`);
      activateTab(tab);
    });
  });

  window.addEventListener('hashchange', () => {
    const tab = window.location.hash.replace('#','');
    if (validTabs.has(tab)) activateTab(tab);
  });

  // Subtle number reveal on the active dashboard view.
  const animateNumbers = container => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    container.querySelectorAll('[data-count]').forEach(el => {
      const finalValue = Number(el.dataset.count);
      if (!Number.isFinite(finalValue)) return;
      const suffix = el.dataset.suffix || '';
      const duration = 650;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.round(finalValue * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };

  views.forEach(view => {
    const observer = new MutationObserver(() => {
      if (view.classList.contains('active')) {
        animateNumbers(view);
        observer.disconnect();
      }
    });
    observer.observe(view, { attributes: true, attributeFilter: ['class'] });
  });
})();
