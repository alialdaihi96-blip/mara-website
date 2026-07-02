/* ─── MARA — Product Catalogue ──────────────────────────────────────────────
   Single source of truth for products. The collection grid (index.html) and
   the product page (product.html) both read from here, keyed by `id`.
   Ordered by product code (MARA001 → MARA007).

   Sizing model:
   - Abayas: `lengths` (50–60, shoulder → hem) + `widths` (XS–XL),
     plus `customSize: true` to offer made-to-measure.
   - Dresses: `widths` only.
   - `colors`: optional colour variants — each with its own photo.
   ─────────────────────────────────────────────────────────────────────────── */

const MARA_LENGTHS = ['50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'];
const MARA_WIDTHS  = ['XS', 'S', 'M', 'L', 'XL'];

const MARA_PRODUCTS = [
  {
    id: 'elan',
    code: 'MARA001',
    name: 'Élan',
    price: 'BHD 55.000',
    category: 'abayas',
    tagline: 'Asymmetric floral embroidery · Front panels & hem',
    images: [
      'images/abaya-print-front.png',
      'images/abaya-print-front-2.png',
      'images/abaya-print-side.png',
      'images/abaya-print-seated.png',
    ],
    description:
      'An open-front abaya in premium black crepe, lifted by handcrafted floral ' +
      'thread embroidery placed asymmetrically across the front panels and hem. ' +
      'Wide, elegant sleeves and a relaxed, flowing silhouette give Élan its quiet ' +
      'movement — lightweight, with a graceful drape. Matching sheila included.',
    details: {
      Code: 'MARA001',
      Colour: 'Black',
      Fabric: 'Premium Crepe',
      Embroidery: 'Asymmetric floral — front panels & hem',
      Includes: 'Matching sheila',
      Care: 'Dry Clean Only',
    },
    lengths: MARA_LENGTHS,
    widths: MARA_WIDTHS,
    customSize: true,
  },
  {
    id: 'rosalie',
    code: 'MARA002',
    name: 'The Rosalie Abaya',
    price: 'BHD 45.000',
    category: 'abayas',
    tagline: 'Rose garden embroidery · Red, ivory & taupe',
    images: [
      'images/rosalie-front.jpg',
      'images/rosalie-front-2.jpg',
      'images/rosalie-side.jpg',
      'images/rosalie-side-2.jpg',
      'images/rosalie-detail.jpg',
    ],
    description:
      'Premium black crepe with a hand-finished rose garden blooming across the ' +
      'front panel — rich red, burgundy, ivory and taupe threads. An open-front ' +
      'silhouette with elegant long sleeves and a relaxed, graceful drape. ' +
      'Matching sheila included.',
    details: {
      Code: 'MARA002',
      Colour: 'Black',
      Fabric: 'Premium Crepe',
      Embroidery: 'Rose garden — red · burgundy · ivory · taupe',
      Includes: 'Matching sheila',
      Care: 'Dry Clean Only',
    },
    lengths: MARA_LENGTHS,
    widths: MARA_WIDTHS,
    customSize: true,
  },
  {
    id: 'azure',
    code: 'MARA003',
    name: 'The Azure Abaya',
    price: 'BHD 65.000',
    category: 'abayas',
    tagline: 'Blue floral sleeves · Tailored collar · Contrast piping',
    images: [
      'images/abaya-blue-front.png',
      'images/abaya-blue-front-2.png',
      'images/abaya-blue-front-3.png',
      'images/abaya-blue-front-4.png',
      'images/abaya-blue-side.png',
      'images/abaya-blue-back.png',
      'images/abaya-blue-seated.png',
      'images/abaya-blue-seated-2.png',
    ],
    description:
      'A tailored-collar, open-front abaya in premium black crepe. Blue floral ' +
      'embroidery runs the length of both sleeves, finished with fine contrast piping ' +
      'along the front panels and cuffs. Elegant long sleeves and a relaxed, flowing ' +
      'silhouette. Matching sheila included; inner dress sold separately.',
    details: {
      Code: 'MARA003',
      Colour: 'Black',
      Fabric: 'Premium Crepe',
      Detail: 'Tailored collar · Contrast piping',
      Embroidery: 'Blue floral — both sleeves',
      Includes: 'Matching sheila (inner dress sold separately)',
      Care: 'Dry Clean Only',
    },
    lengths: MARA_LENGTHS,
    widths: MARA_WIDTHS,
    customSize: true,
  },
  {
    id: 'blossom',
    code: 'MARA004',
    name: 'The Blossom',
    price: 'BHD 77.000',
    category: 'abayas',
    tagline: 'Intricate multicolour floral · Both sleeves',
    images: [
      'images/abaya-garden-front.png',
      'images/abaya-garden-front-2.png',
      'images/abaya-garden-side.png',
      'images/abaya-garden-detail.png',
    ],
    description:
      'An open-front abaya in premium black crepe with intricate multicolour floral ' +
      'embroidery blooming across both sleeves. Elegant long sleeves and a relaxed, ' +
      'flowing silhouette; lightweight with a graceful drape. Matching sheila ' +
      'included; inner dress sold separately.',
    details: {
      Code: 'MARA004',
      Colour: 'Black',
      Fabric: 'Premium Crepe',
      Embroidery: 'Multicolour floral — both sleeves',
      Includes: 'Matching sheila (inner dress sold separately)',
      Care: 'Dry Clean Only',
    },
    lengths: MARA_LENGTHS,
    widths: MARA_WIDTHS,
    customSize: true,
  },
  {
    id: 'saffron',
    code: 'MARA005',
    name: 'The Saffron Abaya',
    price: 'BHD 110.000',
    category: 'abayas',
    tagline: 'Botanical front-panel embroidery · Embroidered trim',
    images: [
      'images/saffron-front.jpg',
      'images/saffron-front-2.jpg',
      'images/saffron-front-3.jpg',
      'images/saffron-side.jpg',
    ],
    description:
      'The house statement. Premium black crepe with intricate multicolour floral and ' +
      'botanical embroidery running the length of both front panels, framed by a ' +
      'decorative embroidered trim along the front opening and sleeve cuffs. Wide, ' +
      'elegant sleeves and a relaxed, flowing silhouette with a graceful drape. ' +
      'Matching sheila included.',
    details: {
      Code: 'MARA005',
      Colour: 'Black',
      Fabric: 'Premium Crepe',
      Embroidery: 'Botanical front panels · embroidered trim & cuffs',
      Includes: 'Matching sheila',
      Care: 'Dry Clean Only',
    },
    lengths: MARA_LENGTHS,
    widths: MARA_WIDTHS,
    customSize: true,
  },
  {
    id: 'autumn',
    code: 'MARA006',
    name: 'The Autumn',
    price: 'BHD 50.000',
    category: 'abayas',
    tagline: 'Ivory blossoms & autumn leaves · Tailored collar',
    images: [
      'images/abaya-autumn-front.jpg',
      'images/abaya-autumn-front-2.jpg',
      'images/abaya-autumn-side.jpg',
      'images/abaya-autumn-side-2.jpg',
      'images/abaya-autumn-detail.jpg',
      'images/abaya-autumn-seated.jpg',
    ],
    description:
      'A tailored-collar, open-front abaya in premium black crepe. Handcrafted ' +
      'floral embroidery of ivory blossoms with warm autumn-toned leaves cascades ' +
      'gracefully across one shoulder. Long sleeves and a relaxed, flowing ' +
      'silhouette in a lightweight fabric with a graceful drape. Matching sheila ' +
      'included.',
    details: {
      Code: 'MARA006',
      Colour: 'Black',
      Fabric: 'Premium Crepe',
      Detail: 'Tailored collar · Open front',
      Embroidery: 'Ivory blossoms & autumn leaves — one shoulder',
      Includes: 'Matching sheila',
      Care: 'Dry Clean Only',
    },
    lengths: MARA_LENGTHS,
    widths: MARA_WIDTHS,
    customSize: true,
  },
  {
    id: 'inner-dress',
    code: 'MARA007',
    name: 'The Inner Dress',
    price: 'BHD 50.000',
    category: 'dress',
    tagline: 'Sleeveless maxi · Four colours',
    images: [
      'images/dress-navy.jpg',
      'images/dress-maroon.jpg',
      'images/dress-white.jpg',
      'images/dress-black.jpg',
    ],
    description:
      'A clean sleeveless maxi with a gently flared A-line drape — designed to wear ' +
      'beneath any MARA abaya or gracefully on its own. Available in navy blue, ' +
      'maroon, white and black.',
    details: {
      Code: 'MARA007',
      Colours: 'Navy Blue · Maroon · White · Black',
      Fabric: 'Premium Crepe',
      Cut: 'Sleeveless · Relaxed A-line',
      Care: 'Dry Clean Only',
    },
    widths: ['XS', 'M', 'L', 'XL'],
    colors: [
      { name: 'Navy Blue', swatch: '#232f52', image: 'images/dress-navy.jpg' },
      { name: 'Maroon',    swatch: '#5d1f2a', image: 'images/dress-maroon.jpg' },
      { name: 'White',     swatch: '#f4f1ea', image: 'images/dress-white.jpg' },
      { name: 'Black',     swatch: '#101010', image: 'images/dress-black.jpg' },
    ],
  },
];

/* Categories shown as tabs on the collection grid. `comingSoon` renders a
   placeholder instead of products. */
const MARA_CATEGORIES = [
  { id: 'abayas', label: 'Abayas' },
  { id: 'dress',  label: 'Dresses' },
  { id: 'beauty', label: 'Beauty', comingSoon: true },
];

function maraFindProduct(id) {
  return MARA_PRODUCTS.find((p) => p.id === id) || null;
}
