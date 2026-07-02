/* ─── MARA — Product Page Renderer ──────────────────────────────────────────
   Reads ?id= from the URL, looks the product up in MARA_PRODUCTS, and renders
   the gallery, details, colour & size selectors, special instructions, and
   the WhatsApp order button.
   ─────────────────────────────────────────────────────────────────────────── */

(function () {
  const root = document.getElementById('pdp');
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = typeof maraFindProduct === 'function' ? maraFindProduct(id) : null;

  if (!product) {
    root.innerHTML = `
      <div class="pdp__notfound">
        <p class="section-label">Piece not found</p>
        <h1 class="section-title">This piece isn’t available.</h1>
        <a href="index.html#collections" class="btn btn--dark">Back to Collection</a>
      </div>`;
    return;
  }

  document.title = `MARA — ${product.name}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', `${product.name} — ${product.tagline}. ${product.description}`);

  let selectedLength = null;
  let selectedWidth = null;
  let customSize = false;
  let selectedColor = null;

  const thumbs = product.images
    .map((src, i) => `<button class="pdp__thumb${i === 0 ? ' is-active' : ''}" data-src="${src}" aria-label="View image ${i + 1}"><img src="${src}" alt="${product.name} view ${i + 1}" loading="lazy" /></button>`)
    .join('');

  const colorBtns = (product.colors || [])
    .map((c) => `<button class="pdp__color" data-color="${c.name}" data-image="${c.image}" aria-label="${c.name}"><span class="pdp__color-dot" style="background:${c.swatch}"></span><span class="pdp__color-name">${c.name}</span></button>`)
    .join('');

  const lengthBtns = (product.lengths || [])
    .map((s) => `<button class="pdp__size" data-length="${s}">${s}</button>`)
    .join('');

  const widthBtns = (product.widths || [])
    .map((s) => `<button class="pdp__size" data-width="${s}">${s}</button>`)
    .join('');

  const detailRows = Object.entries(product.details || {})
    .map(([k, v]) => `<div class="pdp__detail"><span class="pdp__detail-label">${k}</span><span class="pdp__detail-value">${v}</span></div>`)
    .join('');

  root.innerHTML = `
    <a href="index.html#collections" class="pdp__back">← Collection</a>
    <div class="pdp__inner">
      <div class="pdp__gallery">
        <div class="pdp__main">
          <img id="pdpMainImg" src="${product.images[0]}" alt="${product.name}" />
        </div>
        ${product.images.length > 1 ? `<div class="pdp__thumbs">${thumbs}</div>` : ''}
      </div>

      <div class="pdp__info">
        <span class="section-label">MARA · SS 2026</span>
        <h1 class="pdp__name">${product.name}</h1>
        <p class="pdp__tagline">${product.tagline}</p>
        <p class="pdp__price">${product.price}</p>

        <p class="pdp__desc">${product.description}</p>

        ${product.colors && product.colors.length ? `
        <div class="pdp__sizes-wrap">
          <div class="pdp__sizes-head">
            <span class="pdp__detail-label">Colour</span>
          </div>
          <div class="pdp__colors">${colorBtns}</div>
        </div>` : ''}

        ${product.lengths && product.lengths.length ? `
        <div class="pdp__sizes-wrap">
          <div class="pdp__sizes-head">
            <span class="pdp__detail-label">Length</span>
            <a href="size-guide.html" class="pdp__sizelink">Size guide</a>
          </div>
          <div class="pdp__sizes" id="pdpLengths">${lengthBtns}</div>
        </div>` : ''}

        ${product.widths && product.widths.length ? `
        <div class="pdp__sizes-wrap">
          <div class="pdp__sizes-head">
            <span class="pdp__detail-label">Width</span>
            ${product.lengths && product.lengths.length ? '' : '<a href="size-guide.html" class="pdp__sizelink">Size guide</a>'}
          </div>
          <div class="pdp__sizes" id="pdpWidths">${widthBtns}</div>
        </div>` : ''}

        ${product.customSize ? `
        <button class="pdp__custom" id="pdpCustom">Customise your size</button>` : ''}
        <p class="pdp__size-note" id="pdpSizeNote"></p>

        <div class="pdp__notes-wrap">
          <label class="pdp__detail-label" for="pdpNotes">Special Instructions · تعليمات خاصة</label>
          <textarea class="pdp__notes" id="pdpNotes" rows="3"
            placeholder="Any request — measurements, adjustments, gift wrapping…"></textarea>
        </div>

        <a href="#" class="pdp__order" id="pdpOrder">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 00-8.6 15l-1.4 5 5.1-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.3 7.3 0 01-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 000-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1 4.9 4.9 0 001 2.6 11.2 11.2 0 004.3 3.8c.6.3 1.1.4 1.5.5a3.5 3.5 0 001.6.1 2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.2c0-.1-.2-.2-.4-.3z"/>
          </svg>
          Order via WhatsApp
        </a>
        <p class="pdp__order-note">No checkout — we confirm availability, sizing & delivery personally on WhatsApp.</p>

        <div class="pdp__details">${detailRows}</div>
      </div>
    </div>`;

  /* Gallery thumb switching */
  const mainImg = document.getElementById('pdpMainImg');

  /* Graceful fallback if a photo is missing (e.g. new product, image pending) */
  mainImg.addEventListener('error', () => {
    const wrap = mainImg.closest('.pdp__main');
    if (wrap) {
      wrap.classList.add('pdp__main--pending');
      wrap.setAttribute('data-pending', 'Photography coming soon');
    }
  });
  const setMainImage = (src) => {
    mainImg.src = src;
    root.querySelectorAll('.pdp__thumb').forEach((x) =>
      x.classList.toggle('is-active', x.dataset.src === src));
  };
  root.querySelectorAll('.pdp__thumb').forEach((t) => {
    t.addEventListener('click', () => setMainImage(t.dataset.src));
  });

  /* Colour selection — switches the main photo too */
  root.querySelectorAll('.pdp__color').forEach((b) => {
    b.addEventListener('click', () => {
      selectedColor = b.dataset.color;
      root.querySelectorAll('.pdp__color').forEach((x) => x.classList.remove('is-active'));
      b.classList.add('is-active');
      if (b.dataset.image) setMainImage(b.dataset.image);
    });
  });

  /* Size selection */
  const sizeNote = document.getElementById('pdpSizeNote');
  const customBtn = document.getElementById('pdpCustom');

  const updateSizeNote = () => {
    if (customSize) {
      sizeNote.textContent = 'Customised size — we’ll take your measurements personally on WhatsApp.';
      return;
    }
    const parts = [];
    if (selectedLength) parts.push(`length ${selectedLength}`);
    if (selectedWidth) parts.push(`width ${selectedWidth}`);
    sizeNote.textContent = parts.length ? `Selected ${parts.join(' · ')}.` : '';
  };

  const clearCustom = () => {
    customSize = false;
    customBtn?.classList.remove('is-active');
  };

  root.querySelectorAll('[data-length]').forEach((b) => {
    b.addEventListener('click', () => {
      clearCustom();
      selectedLength = b.dataset.length;
      root.querySelectorAll('[data-length]').forEach((x) => x.classList.remove('is-active'));
      b.classList.add('is-active');
      updateSizeNote();
    });
  });

  root.querySelectorAll('[data-width]').forEach((b) => {
    b.addEventListener('click', () => {
      clearCustom();
      selectedWidth = b.dataset.width;
      root.querySelectorAll('[data-width]').forEach((x) => x.classList.remove('is-active'));
      b.classList.add('is-active');
      updateSizeNote();
    });
  });

  customBtn?.addEventListener('click', () => {
    customSize = !customSize;
    customBtn.classList.toggle('is-active', customSize);
    if (customSize) {
      selectedLength = null;
      selectedWidth = null;
      root.querySelectorAll('.pdp__size').forEach((x) => x.classList.remove('is-active'));
    }
    updateSizeNote();
  });

  /* WhatsApp order */
  const orderBtn = document.getElementById('pdpOrder');
  orderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const parts = [];
    if (selectedColor) parts.push(`in ${selectedColor}`);
    if (customSize) {
      parts.push('with a customised size');
    } else {
      const size = [];
      if (selectedLength) size.push(`length ${selectedLength}`);
      if (selectedWidth) size.push(`width ${selectedWidth}`);
      if (size.length) parts.push(`in ${size.join(', ')}`);
    }
    const notes = (document.getElementById('pdpNotes')?.value || '').trim();
    let msg = `Hello MARA, I'd like to order ${product.name}${product.code ? ' (' + product.code + ')' : ''} — ${product.price}${parts.length ? ' ' + parts.join(' ') : ''}. Could you confirm availability and delivery?`;
    if (notes) msg += `\n\nSpecial instructions: ${notes}`;
    window.open(maraWhatsappLink(msg), '_blank', 'noopener');
  });
})();
