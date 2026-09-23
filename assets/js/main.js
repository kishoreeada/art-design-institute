
(() => {
 const toast=(msg)=>{
   let t=document.querySelector('.toast');
   if(!t){
     t=document.createElement('div');
     t.className='toast';
     document.body.appendChild(t);
   }
   t.textContent=msg;
   t.classList.add('show');
   setTimeout(()=>t.classList.remove('show'),2800);
 };
 window.showToast=toast;
})();

// Primary navigation active state
 const currentFile = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
 const primaryMap = {
   'index.html':'home',
   'about.html':'about',
   'blog.html':'blog',
   'services.html':'services',
   'contact.html':'contact'
 };
 document.querySelectorAll('.main-nav [data-nav]').forEach(link=>{
   link.classList.toggle('active', link.dataset.nav === (primaryMap[currentFile] || ''));
   if(link.classList.contains('active')) link.setAttribute('aria-current','page');
 });

/* ===== STACKLY FOOTER V10 — ACTIVE NAV + JOIN VALIDATION ===== */
(() => {
  const currentFile=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const footerMap={'index.html':'home','about.html':'about','blog.html':'blog','gallery.html':'gallery','events.html':'events','programs.html':'programs','admissions.html':'admissions','faculty.html':'faculty','student-life.html':'student-life','contact.html':'contact'};
  const currentFooter=footerMap[currentFile]||'';
  document.querySelectorAll('.site-footer [data-footer-nav]').forEach(link=>{
    const active=link.dataset.footerNav===currentFooter;
    link.classList.toggle('is-footer-active',active);
    if(active) link.setAttribute('aria-current','page');
  });
  const form=document.querySelector('.footer-newsletter');
  if(!form)return;
  const input=form.querySelector('#footer-email'),error=form.querySelector('#footer-email-error'),status=form.querySelector('#footer-form-status'),button=form.querySelector('button[type="submit"]');
  if(!input)return;
  const validate=()=>{
    const value=input.value.trim();let message='';
    if(!value)message='Please enter your email address.';
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value))message='Please enter a valid email address.';
    form.classList.toggle('has-error',Boolean(message));error.textContent=message;input.setAttribute('aria-invalid',message?'true':'false');return !message;
  };
  input.addEventListener('input',()=>{if(form.classList.contains('has-error'))validate()});
  form.addEventListener('submit',event=>{
    event.preventDefault();status.textContent='';
    if(!validate()){input.focus();return}
    button.disabled=true;status.textContent='Email validated. Redirecting…';
    window.setTimeout(()=>{window.location.href='404.html'},250);
  });
})();


/* =====================================================================
   PRODUCTION MOBILE NAVIGATION V27
   ===================================================================== */
(() => {
  const menu = document.getElementById('mobileMenu');
  const trigger = document.querySelector('.menu-btn');
  const close = menu ? menu.querySelector('.mobile-close') : null;
  if (!menu || !trigger || !close) return;

  const mobileLinks = [...menu.querySelectorAll('[data-mobile-nav]')];

  const setActiveMobileLink = () => {
    const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const map = {
      'index.html': 'home',
      'about.html': 'about',
      'blog.html': 'blog',
      'services.html': 'services',
      'contact.html': 'contact'
    };
    mobileLinks.forEach(link => {
      const active = link.dataset.mobileNav === map[file];
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };

  const openMenu = () => {
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    trigger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mobile-menu-open');
    close.focus({preventScroll:true});
  };

  const closeMenu = (restoreFocus = true) => {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-menu-open');
    if (restoreFocus) trigger.focus({preventScroll:true});
  };

  // Ensure the menu is closed on initial load, even if browser state is restored.
  closeMenu(false);
  setActiveMobileLink();

  trigger.addEventListener('click', () => {
    if (menu.classList.contains('open')) closeMenu();
    else openMenu();
  });

  close.addEventListener('click', () => closeMenu());

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => closeMenu(false));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && menu.classList.contains('open')) {
      closeMenu(false);
    }
  });
})();
