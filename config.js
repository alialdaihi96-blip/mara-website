/* ─── MARA — Site Configuration ─────────────────────────────────────────────
   Edit these values in ONE place. Everything else reads from here.
   ─────────────────────────────────────────────────────────────────────────── */

const MARA_CONFIG = {
  /* WhatsApp number for orders & enquiries.
     Full international format, digits only, no "+", spaces or dashes.
     e.g. Saudi +966 50 000 0000  →  "966500000000"
     ⚠️  REPLACE THE PLACEHOLDER BELOW WITH MARA'S REAL NUMBER. */
  whatsappNumber: '966500000000',

  /* Newsletter signup endpoint (Mailchimp / Formspree / etc.).
     Leave empty ('') to keep the graceful "Thank you" fallback with no backend. */
  newsletterEndpoint: '',
};

/* Build a wa.me link with a pre-filled message. */
function maraWhatsappLink(message) {
  const num = (MARA_CONFIG.whatsappNumber || '').replace(/\D/g, '');
  return `https://wa.me/${num}?text=${encodeURIComponent(message || '')}`;
}
