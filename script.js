/* ─── MARA Brand Website — Scripts ──────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll-aware nav ────────────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    nav.classList.toggle('scrolled', scrollY > 60);
    lastScrollY = scrollY;
  }, { passive: true });


  /* ── Scroll reveal (IntersectionObserver) ────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Hero items stagger on load
  const heroItems = document.querySelectorAll('.hero .reveal');
  heroItems.forEach((el, i) => {
    el.style.transitionDelay = `${i * 140 + 200}ms`;
    setTimeout(() => el.classList.add('visible'), i * 140 + 200);
  });


  /* ── Mobile menu ─────────────────────────────────────────────────────── */
  const menuToggle = document.getElementById('menuToggle');
  const menuClose  = document.getElementById('menuClose');
  const mobileMenu = document.getElementById('mobileMenu');

  const openMenu = () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  menuToggle?.addEventListener('click', openMenu);
  menuClose?.addEventListener('click', closeMenu);

  mobileMenu?.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });


  /* ── Parallax-lite on hero ───────────────────────────────────────────── */
  const heroContent = document.querySelector('.hero__content');
  const heroHint    = document.querySelector('.hero__scroll-hint');

  if (heroContent) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroH   = document.querySelector('.hero')?.offsetHeight || 800;
      if (scrollY < heroH) {
        const progress = scrollY / heroH;
        heroContent.style.transform = `translateY(${scrollY * 0.28}px)`;
        heroContent.style.opacity   = `${1 - progress * 1.6}`;
        if (heroHint) heroHint.style.opacity = `${1 - progress * 3}`;
      }
    }, { passive: true });
  }


  /* ── Smooth anchor scroll ────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h')) || 72;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navH,
        behavior: 'smooth'
      });
    });
  });


  /* ── Newsletter form ─────────────────────────────────────────────────── */
  const form = document.querySelector('.newsletter__form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('.newsletter__input');
    const btn   = form.querySelector('.newsletter__btn');
    if (!input.value) return;

    btn.textContent = 'Thank you.';
    btn.style.background = 'var(--turquoise)';
    input.value = '';
    input.placeholder = 'You are on the list.';
    input.disabled = true;
    btn.disabled = true;
  });


  /* ── Cursor accent (desktop only) ───────────────────────────────────── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      background: var(--turquoise);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform 0.15s, opacity 0.3s, width 0.3s, height 0.3s;
      opacity: 0;
    `;
    document.body.appendChild(dot);

    document.addEventListener('mousemove', e => {
      dot.style.left = e.clientX + 'px';
      dot.style.top  = e.clientY + 'px';
      dot.style.opacity = '0.7';
    });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
    });

    // Expand dot over interactive elements
    const interactiveSelector = 'a, button, .product-card, .editorial__cell';
    document.querySelectorAll(interactiveSelector).forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.style.width  = '20px';
        dot.style.height = '20px';
        dot.style.opacity = '0.25';
      });
      el.addEventListener('mouseleave', () => {
        dot.style.width  = '6px';
        dot.style.height = '6px';
        dot.style.opacity = '0.7';
      });
    });
  }

});
