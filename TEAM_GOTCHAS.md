# PestControl99 — Loopholes & Gotchas to Understand Early

**For:** anyone working on the pestcontrol99.com frontend.
**Why:** this project has several "looks-right-but-isn't" traps that silently waste hours. Read this before touching SEO, meta, routing, redirects, or images.

---

## 🚨 #1 — The dual-framework trap (most important)

The repo **looks like a Next.js app** (`src/app/`, `layout.tsx`, `generateMetadata`, `sitemap.ts`, `robots.ts`) but it is **deployed as a Vite + React-Router SPA**. `next` isn't even installed.

**What this means:**
- The real entry is `src/main.tsx` → `src/App.tsx` (react-router). The `src/app/*` files are reused **as plain React components**, not Next pages.
- **Any Next.js-only feature is DEAD CODE** and never runs in production: `generateMetadata`, server components, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/api/*` routes.
- We already **deleted** the dead `layout.tsx`, `sitemap.ts`, `robots.ts`. Don't recreate them expecting them to work.

**Where the real things live:**
| You want… | Edit this (real) | NOT this (dead/ignored) |
|---|---|---|
| Page `<title>`/meta | `src/components/PageMeta.tsx` per page | `generateMetadata` |
| Layout/header/footer | `src/layouts/RootLayout.tsx` | `src/app/layout.tsx` |
| Routes | `src/App.tsx` | Next file-based routing |
| Sitemap | `scripts/generate-sitemap.mjs` | `app/sitemap.ts` |
| Robots | `public/robots.txt` | `app/robots.ts` |

---

## 🚨 #2 — It's client-side rendered (CSR), so crawlers see an empty shell

The initial HTML for **every** URL is the same ~1 KB shell (`<div id="root">`). Titles, meta, canonical, JSON-LD schema and H1 are injected **after JS runs** (via `PageMeta.tsx`, `useEffect`).

**Consequences to remember:**
- **Social/link crawlers (WhatsApp, Facebook, LinkedIn, X) do NOT run JS** → they only see the default tags in `index.html`. Per-page OG/Twitter previews won't differ until SSR.
- Google *can* render JS but defers it — slower, less reliable indexing.
- **Don't assume per-page SEO "works" just because it shows in the browser.** Always check **View Source / `curl`** (raw HTML), not DevTools (rendered DOM).
- The real fix is **SSR/prerender** (still pending). Until then, content quality alone won't fully rank.

---

## 🚨 #3 — Vercel controls deploy; `_redirects` and `.htaccess` are IGNORED

Hosting is **Vercel** (`framework: vite`). Therefore:
- `public/_redirects` (Netlify syntax) and `public/.htaccess` (Apache) **do nothing**. Don't add redirects there.
- **All redirects + headers go in `vercel.json`** (`redirects`, `headers` arrays). That's where non-www→www and caching live now.
- `vercel.json` has a catch-all `rewrites: /(.*) → /index.html` (needed for SPA routing). **Static files in `public/` still win** over the rewrite — that's why `sitemap.xml`, `robots.txt`, `llms.txt` serve correctly.
- HTTP→HTTPS is automatic on Vercel; don't hand-roll it.

---

## 🚨 #4 — The sitemap is build-generated, not framework-magic

`/sitemap.xml` is produced by **`scripts/generate-sitemap.mjs`**, wired into `npm run build`.
- **Add every new indexable URL to that script's `staticRoutes`** or it won't be in the sitemap.
- Blog posts are fetched from the CRM API **at build time** (network call) — it fails soft (logs a warning, still builds) if the API is down.
- Historic bug: `/sitemap.xml` used to return the SPA HTML shell (Google couldn't parse it). Don't reintroduce that by deleting the static file or the generator step.

---

## 🚨 #5 — Area pages: one template, 47 routes, auto-noindex rule

All `/pest-control-{slug}/` pages render from **`src/components/AreaPageTemplate.tsx`**. Slugs live in `src/config/areasWeServe.ts`; rich content in `src/config/areaPageContent.ts`.

**The rule:** a page is **`noindex` unless it has rich content** in `areaPageContent.ts`. This is deliberate — it stops thin/duplicate pages from hurting SEO.

**To make an area page live + indexable, you must do BOTH:**
1. Add an entry to `AREA_CONTENT_REGISTRY` in `areaPageContent.ts` (model it on `lonavala`/`andheri`).
2. Add its `/pest-control-{slug}/` URL to `scripts/generate-sitemap.mjs`.

Do only #1 and it won't be in the sitemap; the `noindex` flips off automatically once rich content exists.

---

## 🚨 #6 — Business identity has ONE source of truth

`src/config/business.ts` is the single source for **name, phone, WhatsApp, email, address, rating**. 

- **Never hardcode the phone/address in a page.** Import from `BUSINESS`.
- Past bugs we fixed: a **placeholder phone `98 XXX XX 990`** and a **broken WhatsApp link `wa.me/8080748282`** (missing the `91` country code) shipped on service pages; a **conflicting Andheri-West address** lived in the dead `layout.tsx`. All traced back to hardcoding instead of using `business.ts`.
- WhatsApp links must be `wa.me/918080748282` (use the `whatsAppUrl()` helper).

---

## 🚨 #7 — New page? It needs `<PageMeta>` or it inherits the wrong title

Because meta is client-side and global, a page **without `<PageMeta>` keeps whatever title the previous page set** (or the generic homepage title on hard load). **Always add `<PageMeta title/description/canonical>` to any new route.** Use `noindex` for utility pages (we did this for `/test/`, `/quote-simple/`).

---

## 🚨 #8 — Images: don't ship multi-MB PNGs

- Heroes used to be **1.9 MB PNGs** (killed mobile LCP). They're now WebP/AVIF.
- `AppImage`/`OptimizedImage` **auto-swap local `.png/.jpg` → `.webp`** at runtime — so a `.webp` must actually exist next to it, or it falls back.
- To compress new heavy images: `node scripts/optimize-heroes.mjs` (needs `sharp`, a devDependency). Target < 100 KB for heroes.
- Real pest photos already exist in `public/images/` (`Cockroach.webp`, `Mosquito.webp`, `Termite.webp`, `Rat.webp`, etc.) — reuse them.

---

## 🚨 #9 — Lead forms post to an external CRM (verify the domain)

Forms submit to **`https://api.vacationbna.site`** (hardcoded fallback in `src/config/env.ts`; overridable via `VITE_CRM_API_URL`). The domain name looks unrelated to the brand — **confirm it's the intended production CRM** before assuming leads are landing correctly. Blog content is also pulled from there.

---

## 🚨 #10 — TypeScript won't catch everything

`tsconfig.json` **excludes** `src/app/api`, `src/proxy.ts`, and `BlogPostClient.tsx` from typechecking (they import the uninstalled `next`). So `npm run build` (`tsc -b`) will **not** flag type errors in those files. Be extra careful editing them.

---

## ⚠️ Smaller traps

- **Don't invent trust claims.** Fabricated stats ("10,432 kitchens protected"), unverified "ISO/FSSAI" badges, and a **4.9★ vs 4.8 rating mismatch** existed. Ratings must match `business.ts` (4.8/150) and be real (legal + rich-result risk).
- **Two Lonavala URLs exist:** `/pest-control-in-lonavala/` (landing) and `/pest-control-lonavala/` (area page) — potential duplicate content. Pick a canonical if you expand either.
- **Don't delete the Google verification files** (`google*.html` in `public/`) or Search Console breaks.
- **Build order matters:** `npm run build` = generate sitemap → `tsc -b` → `vite build`. Don't bypass it for deploys.
- **`llms.txt`** (`public/llms.txt`) is a hand-maintained AI-visibility summary — update it when services/areas/pricing change.

---

## TL;DR for a new dev
1. It's a **Vite SPA**, not Next — ignore `next`-only features.
2. Meta/schema are **client-side**; check **raw HTML**, not DevTools.
3. Redirects/headers → **`vercel.json`** only.
4. New indexable URL → add to **`generate-sitemap.mjs`**.
5. New area page → rich content **+** sitemap entry (else it's `noindex`).
6. Phone/address/rating → **`business.ts`**, never hardcode.
7. Every new page → add **`<PageMeta>`**.
