/**
 * Static prerender (SSG) of per-route <head> + JSON-LD.
 *
 * Runs AFTER `vite build`. For every indexable route it writes
 * dist/<route>/index.html — a copy of the built SPA shell with the correct
 * per-page <title>, meta description, canonical, Open Graph / Twitter tags and
 * JSON-LD baked into the RAW HTML (what crawlers and social scrapers read).
 *
 * The <body> still hydrates client-side exactly as before, so there is no
 * hydration risk — PageMeta simply re-applies the same values on the client.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');
const BASE = 'https://www.pestcontrol99.com';
const DEFAULT_IMAGE = `${BASE}/android-chrome-512x512.png`;

/* ---------- Business identity (mirror of src/config/business.ts) ---------- */
const BUSINESS = {
  brandName: 'Pest Control 99',
  legalName: 'Multi Pest Care LLP',
  website: BASE,
  email: 'accounts@pestcontrol99.com',
  phoneTel: '+918080748282',
  tagline: 'Professional pest management services in Mumbai, Thane & Navi Mumbai',
  address: { line1: '503 Sai Rushabh CHS Ltd, Geeta Nagar Phase 1', city: 'Mira Road', state: 'Maharashtra', postalCode: '401107', country: 'IN' },
  serviceAreas: ['Mumbai', 'Thane', 'Navi Mumbai'],
  rating: { ratingValue: '4.8', reviewCount: '150' },
};

/* ---------- Shared schema graph (mirror of utils/structuredData.ts) ---------- */
function baseGraph() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${BASE}/#organization`,
      name: BUSINESS.brandName,
      legalName: BUSINESS.legalName,
      alternateName: [BUSINESS.legalName, 'PestControl99'],
      url: BASE,
      email: BUSINESS.email,
      telephone: BUSINESS.phoneTel,
      logo: `${BASE}/android-chrome-512x512.png`,
      parentOrganization: { '@type': 'Organization', name: BUSINESS.legalName },
      sameAs: [BASE],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${BASE}/#localbusiness`,
      name: BUSINESS.brandName,
      legalName: BUSINESS.legalName,
      description: BUSINESS.tagline,
      url: BASE,
      telephone: BUSINESS.phoneTel,
      email: BUSINESS.email,
      image: `${BASE}/images/heroimage.webp`,
      logo: `${BASE}/android-chrome-512x512.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS.address.line1,
        addressLocality: BUSINESS.address.city,
        addressRegion: BUSINESS.address.state,
        postalCode: BUSINESS.address.postalCode,
        addressCountry: BUSINESS.address.country,
      },
      areaServed: BUSINESS.serviceAreas.map((name) => ({ '@type': 'City', name })),
      aggregateRating: { '@type': 'AggregateRating', ratingValue: BUSINESS.rating.ratingValue, reviewCount: BUSINESS.rating.reviewCount, bestRating: '5', worstRating: '1' },
      priceRange: '₹₹',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${BASE}/#website`,
      name: BUSINESS.brandName,
      alternateName: BUSINESS.legalName,
      url: BASE,
      publisher: { '@id': `${BASE}/#organization` },
      inLanguage: 'en-IN',
    },
  ];
}

function service(name, serviceType, description, offerDescription) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS.brandName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${BUSINESS.address.line1}, ${BUSINESS.address.city}`,
        addressLocality: BUSINESS.address.city,
        addressRegion: BUSINESS.address.state,
        postalCode: BUSINESS.address.postalCode,
        addressCountry: BUSINESS.address.country,
      },
      telephone: BUSINESS.phoneTel,
    },
    areaServed: BUSINESS.serviceAreas.map((name) => ({ '@type': 'City', name })),
    serviceType,
    offers: { '@type': 'Offer', description: offerDescription },
  };
}

/* ---------- Indexable routes (mirror of each page's PageMeta) ---------- */
const ROUTES = [
  { path: '/', title: 'Pest Control in Mumbai | Safe, Same-Day & Certified Services', description: 'Trusted pest control services in Mumbai, Thane & Navi Mumbai. 100% safe treatments for homes & offices. Get a same-day quote & 365-day warranty. Book now!', image: `${BASE}/images/hero-home.webp` },
  { path: '/services/', title: 'Pest Control Services in Mumbai | Cockroach, Termite, Rodent & More', description: 'Professional pest control services in Mumbai, Thane & Navi Mumbai — cockroach, termite, mosquito, rodent, honey bee & wood borer treatment. Same-day, warranty-backed. Free quote.' },
  { path: '/services/cockroach-pest-control/', title: 'Cockroach Pest Control in Mumbai | Odourless Gel Treatment', description: 'Same-day cockroach control in Mumbai, Thane & Navi Mumbai. Odourless, child & pet-safe gel treatment with a 365-day warranty. Free quote — call +91 80807 48282.', extra: [service('Cockroach Pest Control Mumbai', 'Cockroach Control', 'Professional cockroach pest control in Mumbai, Thane & Navi Mumbai with odourless, child- and pet-safe gel treatment and a 365-day warranty.', 'Same-day cockroach gel treatment with 365-day warranty')] },
  { path: '/services/mosquito-pest-control/', title: 'Mosquito Pest Control in Mumbai | Same-Day Treatment', description: 'Professional mosquito control in Mumbai, Thane & Navi Mumbai. Safe, same-day fogging & larvicide treatment to cut dengue & malaria risk. Free quote — +91 80807 48282.', extra: [service('Mosquito Pest Control Mumbai', 'Mosquito Control', 'Professional mosquito control in Mumbai, Thane & Navi Mumbai with safe, low-odour fogging and larvicide treatment.', 'Same-day mosquito fogging and larvicide treatment')] },
  { path: '/services/termite-pest-control/', title: 'Termite Control in Mumbai | Anti-Termite Treatment, 5-Yr Warranty', description: 'Anti-termite treatment in Mumbai, Thane & Navi Mumbai with up to 5-year warranty. Low-odour borate, neat drill & seal, same-day inspection. Free quote — +91 80807 48282.', extra: [service('Termite Pest Control Mumbai', 'Termite Control', 'Professional termite pest control in Mumbai, Thane & Navi Mumbai with low-odour borate treatment and up to a 5-year warranty.', 'Same-day termite inspection and treatment with up to 5-year warranty')] },
  { path: '/services/rodent-pest-control/', title: 'Rodent & Rat Control in Mumbai | Removal & Entry Sealing', description: 'Effective rat & rodent control in Mumbai, Thane & Navi Mumbai. Trapping, baiting & entry-point sealing with 90-day warranty. Same-day service — +91 80807 48282.', extra: [service('Rodent Pest Control Mumbai', 'Rodent Control', 'Professional rodent pest control in Mumbai, Thane & Navi Mumbai with humane trapping, entry-point sealing and a 90-day warranty.', 'Same-day rodent inspection and treatment with up to 90-day warranty')] },
  { path: '/services/honey-bee-pest-control/', title: 'Honey Bee Removal in Mumbai | Safe Hive Removal Service', description: 'Safe honey bee & hive removal in Mumbai, Thane & Navi Mumbai. Trained technicians remove beehives without harm to your family. Same-day service — +91 80807 48282.', extra: [service('Honey Bee Pest Control Mumbai', 'Honey Bee Pest Control', 'Safe and eco-friendly honey bee removal in Mumbai, Thane & Navi Mumbai by trained technicians.', 'Professional honey bee removal with warranty')] },
  { path: '/services/wood-borer-control/', title: 'Wood Borer Control in Mumbai | Save Your Furniture', description: 'Professional wood borer treatment in Mumbai, Thane & Navi Mumbai. Protect furniture & woodwork from powder-post beetles. Warranty-backed — call +91 80807 48282.', extra: [service('Wood Borer Control Mumbai', 'Wood Borer Control', 'Professional wood borer control in Mumbai, Thane & Navi Mumbai with low-odour, warranty-backed treatment.', 'Professional wood borer treatment with warranty')] },
  { path: '/about/', title: 'About Pest Control 99 | Multi Pest Care LLP, Mumbai', description: 'Pest Control 99 by Multi Pest Care LLP — licensed, CIB&RC-approved pest management in Mumbai, Thane & Navi Mumbai. Same-day service, written warranty, transparent pricing.' },
  { path: '/contact/', title: 'Contact Pest Control 99 | Book Pest Control in Mumbai', description: 'Contact Pest Control 99 for same-day pest control in Mumbai, Thane & Navi Mumbai. Call +91 80807 48282, WhatsApp, or request a free quote online.' },
  { path: '/quote/', title: 'Get a Free Pest Control Quote | Instant Price Estimate', description: 'Get an instant pest control price estimate for your home or office in Mumbai, Thane & Navi Mumbai. Same-day service, no hidden charges. Book your free quote now.' },
  { path: '/blog/', title: 'Pest Control Blog | Tips, Guides & Expert Advice | PestControl99', description: 'Read expert pest control blogs, tips, and guides for Mumbai & India.' },
  { path: '/pest-control-in-lonavala/', title: 'Reliable Monsoon Pest Control Services in Lonavala | Pest Control 99', description: 'Professional monsoon pest control in Lonavala for villas, resorts, hotels & homestays. Cockroach, mosquito, termite & rodent treatment. Same-day service — call +91 80807 48282.', image: `${BASE}/images/pest-control-lonavala.webp` },
  { path: '/pest-control-andheri/', title: 'Professional Pest Control Services in Andheri | Pest Control 99', description: 'Professional pest control in Andheri for homes, offices, restaurants & shops. Same-day cockroach, termite, rodent & mosquito control with warranty. Call +91 80807 48282.', image: `${BASE}/images/heroimage.webp` },
  { path: '/privacy-policy/', title: 'Privacy Policy | Pest Control 99', description: 'How Pest Control 99 (Multi Pest Care LLP) collects, uses, and protects your personal data.' },
  { path: '/terms-and-conditions/', title: 'Terms & Conditions | Pest Control 99', description: 'Terms and conditions for pest control services provided by Pest Control 99 (Multi Pest Care LLP).' },
  { path: '/refund-policy/', title: 'Refund Policy | Pest Control 99', description: 'Refund and cancellation policy for pest control services by Pest Control 99 (Multi Pest Care LLP).' },
];

/* ---------- helpers ---------- */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function setTitle(html, title) {
  return html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
}
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[\\s\\S]*?(" ?/?>)`);
  if (re.test(html)) return html.replace(re, `$1${esc(value)}$2`);
  // insert before </head> if not present
  return html.replace('</head>', `    <meta ${attr}="${key}" content="${esc(value)}" />\n  </head>`);
}

function buildHtml(template, route) {
  const canonical = `${BASE}${route.path}`;
  const image = route.image || DEFAULT_IMAGE;
  let html = template;
  html = setTitle(html, route.title);
  html = setMeta(html, 'name', 'description', route.description);
  html = setMeta(html, 'property', 'og:title', route.title);
  html = setMeta(html, 'property', 'og:description', route.description);
  html = setMeta(html, 'property', 'og:url', canonical);
  html = setMeta(html, 'property', 'og:image', image);
  html = setMeta(html, 'name', 'twitter:title', route.title);
  html = setMeta(html, 'name', 'twitter:description', route.description);
  html = setMeta(html, 'name', 'twitter:image', image);

  const graph = [...baseGraph(), ...(route.extra || [])];
  const ld = graph
    .map((node) => `    <script type="application/ld+json">${JSON.stringify(node)}</script>`)
    .join('\n');
  const canonicalTag = `    <link rel="canonical" href="${canonical}" />`;

  html = html.replace('</head>', `${canonicalTag}\n${ld}\n  </head>`);
  return html;
}

/* ---------- blog posts from CRM (best-effort, non-fatal) ---------- */
async function getBlogRoutes() {
  const apiBase = process.env.VITE_CRM_API_URL || process.env.NEXT_PUBLIC_CRM_API_URL || 'https://api.vacationbna.site';
  try {
    const res = await fetch(`${apiBase}/api/public/blogs/?page_size=100`, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const results = data?.results || data || [];
    return results
      .filter((p) => p && p.slug)
      .map((p) => ({
        path: `/blog/${p.slug}/`,
        title: p.meta_title || p.title || 'Pest Control Blog | Pest Control 99',
        description: p.meta_description || p.excerpt || 'Expert pest control tips and guides for Mumbai & India.',
        image: typeof p.featured_image === 'string' && p.featured_image.startsWith('http') ? p.featured_image : undefined,
      }));
  } catch (err) {
    console.warn(`[prerender] Skipping blog posts (${err.message})`);
    return [];
  }
}

/* ---------- run ---------- */
const template = readFileSync(join(DIST, 'index.html'), 'utf8');
// Neutral SPA fallback (no route-specific canonical/title) for non-prerendered
// routes (e.g. noindex area pages). vercel.json rewrites unmatched paths here.
writeFileSync(join(DIST, 'app.html'), template, 'utf8');
const blogRoutes = await getBlogRoutes();
const allRoutes = [...ROUTES, ...blogRoutes];
let count = 0;
for (const route of allRoutes) {
  const html = buildHtml(template, route);
  const outDir = route.path === '/' ? DIST : join(DIST, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html, 'utf8');
  count++;
}
console.log(`[prerender] Wrote ${count} static route HTML files to dist/`);
