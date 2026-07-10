/* ─── MARA Brand Website — Scripts ──────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Render collection grid from catalogue, filtered by category tabs ── */
  const grid = document.getElementById('collectionsGrid');
  const tabsWrap = document.getElementById('collectionsTabs');

  const bindProductCards = () => {
    grid.querySelectorAll('.product-card[data-id]').forEach(card => {
      const go = () => { window.location.href = `product.html?id=${card.dataset.id}`; };
      card.addEventListener('click', go);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
    });
  };

  const renderGrid = (categoryId) => {
    const category = (typeof MARA_CATEGORIES !== 'undefined' &&
      MARA_CATEGORIES.find(c => c.id === categoryId)) || null;

    if (category?.comingSoon) {
      grid.classList.add('collections__grid--empty');
      grid.innerHTML = `
        <div class="collections__empty">
          <p class="collections__empty-line">${category.label} — coming soon.</p>
          <p class="collections__empty-sub">Crafted for timeless presence — arriving soon.</p>
        </div>`;
      return;
    }

    const items = MARA_PRODUCTS.filter(p => !categoryId || p.category === categoryId);
    if (!items.length) {
      grid.classList.add('collections__grid--empty');
      grid.innerHTML = `
        <div class="collections__empty">
          <p class="collections__empty-line">The new collection is being prepared.</p>
          <p class="collections__empty-sub">Crafted for timeless presence — arriving soon.</p>
        </div>`;
      return;
    }

    grid.classList.remove('collections__grid--empty');
    grid.innerHTML = items.map((p, i) => `
      <div class="product-card reveal visible" data-id="${p.id}" role="link" tabindex="0"
           aria-label="View ${p.name}" style="--delay: ${i * 80}ms">
        <div class="product-card__image" style="background-image:url('${p.images[0]}')">
          <div class="product-card__overlay"><span>View Piece</span></div>
          <div class="product-card__accent-line"></div>
        </div>
        <div class="product-card__info">
          <h3 class="product-card__name">${p.name}</h3>
          <p class="product-card__desc">${p.tagline}</p>
          <span class="product-card__price">${p.price}</span>
        </div>
      </div>`).join('');
    bindProductCards();
  };

  if (grid && typeof MARA_PRODUCTS !== 'undefined') {
    if (tabsWrap && typeof MARA_CATEGORIES !== 'undefined') {
      tabsWrap.innerHTML = MARA_CATEGORIES.map((c, i) => `
        <button class="collections__tab${i === 0 ? ' is-active' : ''}" data-category="${c.id}">
          ${c.label}${c.comingSoon ? '<span class="collections__tab-soon">Soon</span>' : ''}
        </button>`).join('');
      tabsWrap.querySelectorAll('.collections__tab').forEach(tab => {
        tab.addEventListener('click', () => {
          tabsWrap.querySelectorAll('.collections__tab').forEach(t => t.classList.remove('is-active'));
          tab.classList.add('is-active');
          renderGrid(tab.dataset.category);
        });
      });
      renderGrid(MARA_CATEGORIES[0].id);
    } else {
      renderGrid(null);
    }
  }


  /* ── Hero slideshow — cycle through all abayas every 5s ──────────────── */
  const heroSlides = document.getElementById('heroSlides');
  if (heroSlides && typeof MARA_PRODUCTS !== 'undefined') {
    const heroImages = MARA_PRODUCTS
      .filter(p => p.category === 'abayas' && p.images && p.images.length)
      .map(p => p.images[0]);

    if (heroImages.length) {
      heroImages.forEach((src, i) => {
        const slide = document.createElement('div');
        // First slide starts active so the backdrop is never blank
        slide.className = 'hero__slide' + (i === 0 ? ' is-active' : '');
        slide.style.backgroundImage = `url('${src}')`;
        heroSlides.appendChild(slide);
      });

      // Reveal the slideshow (fades the no-JS fallback backdrop out)
      document.querySelector('.hero__backdrop')?.classList.add('has-slides');

      // Preload so cross-fades are seamless
      heroImages.forEach(src => { const im = new Image(); im.src = src; });

      const slides = heroSlides.querySelectorAll('.hero__slide');
      if (slides.length > 1) {
        let current = 0;
        setInterval(() => {
          const next = (current + 1) % slides.length;
          slides[next].classList.add('is-active');
          slides[current].classList.remove('is-active');
          current = next;
        }, 3000);
      }
    }
  }


  /* ── Editorial marquee — every product, gliding film-strip ───────────── */
  const editorialTrack = document.getElementById('editorialTrack');
  if (editorialTrack && typeof MARA_PRODUCTS !== 'undefined' && MARA_PRODUCTS.length) {
    // Alternate cells "drop" for editorial rhythm. The same set is rendered
    // twice (real + aria-hidden duplicate) so the -50% glide loops seamlessly.
    const cell = (p, i, dup) => `
      <div class="editorial__cell${i % 2 ? ' is-dropped' : ''}"
           style="background-image:url('${p.images[0]}')"
           data-id="${p.id}"
           ${dup ? 'aria-hidden="true" tabindex="-1"' : 'role="link" tabindex="0"'}
           aria-label="View ${p.name}">
        <span class="editorial__cell-name">${p.name}</span>
      </div>`;
    const build = (dup) => MARA_PRODUCTS.map((p, i) => cell(p, i, dup)).join('');
    editorialTrack.innerHTML = build(false) + build(true);

    editorialTrack.querySelectorAll('.editorial__cell[data-id]').forEach(c => {
      const go = () => { window.location.href = `product.html?id=${c.dataset.id}`; };
      c.addEventListener('click', go);
      c.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
    });
  }


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


  /* ── Floating WhatsApp button (all pages) ────────────────────────────── */
  if (typeof maraWhatsappLink === 'function') {
    const wa = document.createElement('a');
    wa.className = 'wa-float';
    wa.href = maraWhatsappLink('Hello MARA, I have a question.');
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.setAttribute('aria-label', 'Contact MARA on WhatsApp');
    wa.innerHTML = `
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 00-8.6 15l-1.4 5 5.1-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.3 7.3 0 01-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 000-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1 4.9 4.9 0 001 2.6 11.2 11.2 0 004.3 3.8c.6.3 1.1.4 1.5.5a3.5 3.5 0 001.6.1 2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.2c0-.1-.2-.2-.4-.3z"/>
      </svg>`;
    document.body.appendChild(wa);
  }

  /* Footer "Contact" → WhatsApp */
  document.getElementById('footerContact')?.addEventListener('click', e => {
    if (typeof maraWhatsappLink !== 'function') return;
    e.preventDefault();
    window.open(maraWhatsappLink('Hello MARA, I have a question.'), '_blank', 'noopener');
  });


  /* ── Newsletter form ─────────────────────────────────────────────────── */
  const form = document.querySelector('.newsletter__form');
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const input = form.querySelector('.newsletter__input');
    const btn   = form.querySelector('.newsletter__btn');
    if (!input.value) return;

    const endpoint = (typeof MARA_CONFIG !== 'undefined' && MARA_CONFIG.newsletterEndpoint) || '';
    const finish = (label) => {
      btn.textContent = label;
      btn.style.background = 'var(--turquoise)';
      input.value = '';
      input.placeholder = 'You are on the list.';
      input.disabled = true;
      btn.disabled = true;
    };

    if (endpoint) {
      btn.textContent = '…';
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: input.value }),
        });
        finish('Thank you.');
      } catch (err) {
        btn.textContent = 'Try again';
      }
    } else {
      // No backend configured — graceful confirmation.
      finish('Thank you.');
    }
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
