/**
 * Generates a real XML sitemap at public/sitemap.xml (served as a static file,
 * so it is NOT swallowed by the SPA catch-all rewrite).
 *
 * Runs as part of `npm run build`. Only INDEXABLE URLs are included — placeholder
 * area pages are intentionally excluded until they have unique content (they are
 * also set to noindex in the app).
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://www.pestcontrol99.com';
const today = new Date().toISOString().split('T')[0];

/** Static, indexable routes. Add area/city pages here once they have unique content. */
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services/', priority: '0.9', changefreq: 'monthly' },
  { path: '/services/cockroach-pest-control/', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/mosquito-pest-control/', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/termite-pest-control/', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/rodent-pest-control/', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/honey-bee-pest-control/', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/wood-borer-control/', priority: '0.8', changefreq: 'monthly' },
  { path: '/pest-control-in-lonavala/', priority: '0.9', changefreq: 'weekly' },
  { path: '/about/', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact/', priority: '0.8', changefreq: 'monthly' },
  { path: '/quote/', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog/', priority: '0.7', changefreq: 'weekly' },
  // Area pages with unique, indexable content (add each slug here as content is written)
  { path: '/pest-control-andheri/', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy-policy/', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-and-conditions/', priority: '0.3', changefreq: 'yearly' },
  { path: '/refund-policy/', priority: '0.3', changefreq: 'yearly' },
];

/** Best-effort: append published blog posts from the CRM API (non-fatal on failure). */
async function getBlogRoutes() {
  const apiBase =
    process.env.VITE_CRM_API_URL ||
    process.env.NEXT_PUBLIC_CRM_API_URL ||
    'https://api.vacationbna.site';
  try {
    const res = await fetch(`${apiBase}/api/public/blogs/?page_size=100`, {
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const results = data?.results || data || [];
    return results
      .filter((p) => p && p.slug)
      .map((p) => ({
        path: `/blog/${p.slug}/`,
        priority: '0.6',
        changefreq: 'monthly',
        lastmod: (p.updated_at || p.publish_date || '').split('T')[0] || today,
      }));
  } catch (err) {
    console.warn(`[sitemap] Skipping blog posts (${err.message})`);
    return [];
  }
}

function urlNode({ path, priority, changefreq, lastmod }) {
  return [
    '  <url>',
    `    <loc>${BASE}${path}</loc>`,
    `    <lastmod>${lastmod || today}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

const blogRoutes = await getBlogRoutes();
const all = [...staticRoutes, ...blogRoutes];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  all.map(urlNode).join('\n'),
  '</urlset>',
  '',
].join('\n');

const out = resolve(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(out, xml, 'utf8');
console.log(`[sitemap] Wrote ${all.length} URLs to ${out}`);
