/* ─── MARA — Site Configuration ─────────────────────────────────────────────
   Edit these values in ONE place. Everything else reads from here.
   ─────────────────────────────────────────────────────────────────────────── */

const MARA_CONFIG = {
  /* WhatsApp number for orders & enquiries.
     Full international format, digits only, no "+", spaces or dashes.
     MARA — Bahrain +973 3210 2996 */
  whatsappNumber: '97332102996',

  /* Newsletter signup endpoint (Mailchimp / Formspree / etc.).
     Leave empty ('') to keep the graceful "Thank you" fallback with no backend. */
  newsletterEndpoint: '',
};

/* Build a wa.me link with a pre-filled message. */
function maraWhatsappLink(message) {
  const num = (MARA_CONFIG.whatsappNumber || '').replace(/\D/g, '');
  return `https://wa.me/${num}?text=${encodeURIComponent(message || '')}`;
}
