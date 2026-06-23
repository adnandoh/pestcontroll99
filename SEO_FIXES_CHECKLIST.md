# SEO Fixes Checklist — Pest Control 99

Use this checklist to track implementation. Check items off in PRs as they ship.

**Legend:** `[ ]` todo · `[x]` done · `[-]` N/A

---

## Critical — fix immediately

### Crawlability & indexing

- [x] Add `public/robots.txt` with sitemap URL and disallow rules for `/test/`, `/thank-you/`, `/lonavala-thank-you/`, `/quote-simple/`, `/feedback/`
- [x] Expand `public/sitemap.xml` — auto from `indexed-slugs.json` + blog API on build
- [x] Prerendering for indexable routes (`scripts/prerender.mjs` runs on `npm run build`)
- [ ] Or: deploy **dynamic rendering** (e.g. Prerender.io, Rendertron) for bot user-agents — optional extra

### SPA metadata

- [x] Production build bakes per-route `<title>`, meta, canonical into `dist/**/index.html` via prerender
- [x] Client-side `PageMeta` re-applies same values after hydration

### Duplicate Lonavala URLs

- [x] Choose canonical Lonavala URL: `/pest-control-in-lonavala/` (Ads landing) — `/pest-control-lonavala/` set to `noindex` + canonical to landing

---

## High priority — ranking impact

### Missing PageMeta

- [x] `/feedback/` — add `PageMeta` with `noindex`
- [x] `/feedback/:id/` — add `PageMeta` with `noindex`
- [x] `/delete-account/` — add `PageMeta` with `noindex`
- [x] `/not-found.tsx` — add `PageMeta` with `noindex`

### Meta quality fixes

- [x] Home: align `ogUrl` to `https://www.pestcontrol99.com/` (trailing slash)
- [x] Lonavala landing: shorten title to ≤60 chars
- [x] Lonavala landing: shorten description to ≤160 chars
- [x] Blog listing: expand description to 140–160 chars with CTA
- [x] Standardize brand suffix: `| Pest Control 99` (with spaces) — blog pages updated

### H1 fixes

- [x] `/quote/` — add sr-only `<h1>Get a Free Pest Control Quote</h1>`
- [x] 404 — single H1 "Page Not Found" (404 demoted to non-heading text)
- [x] Lonavala area page (`/pest-control-lonavala/`) — `noindex` + canonical to `/pest-control-in-lonavala/`

### Schema

- [x] Add `BlogPosting` JSON-LD to `blog/[slug]/page.tsx`
- [x] Add `BreadcrumbList` JSON-LD to `Breadcrumb.tsx` (already present; trailing slashes fixed)

### Social / sharing

- [x] Default OG image upgraded to `/images/hero-home.webp` (replace with dedicated 1200×630 when design asset is ready)
- [x] Update `PageMeta` `DEFAULT_OG_IMAGE` and `index.html` og:image

---

## Medium priority — optimization

### Area pages (local SEO rollout) — manual, one per day

- [ ] Content creator delivers copy daily — **do not bulk-add**
- [x] Workflow: `src/config/area-content/README.md` + `_TEMPLATE.ts` + `indexed-slugs.json`
- [x] `npm run validate-area-content` before deploy
- [x] Sitemap auto-includes slugs from `indexed-slugs.json` on build
- [x] `noindex` removed automatically when rich content is registered

### Blog SEO

- [x] Set `noindex` on `/blog/?q=*` search results
- [x] Pagination: `noindex` on blog list page > 1; category page > 1
- [x] Tag pages: `noindex` (all tag pages)
- [ ] Enforce CMS validation: meta_title ≤60, meta_description 140–160 (backend)

### Internal linking

- [x] Add area links from service pages (`ServiceAreaLinks` component)
- [ ] Add blog links from service pages (topical posts)
- [ ] Consider reducing homepage links to noindex area pages until content ready (or keep for UX with noindex)

### New landing pages (content gaps)

- [ ] `/pricing/` or pricing section with indexable URL
- [ ] `/faq/` standalone page aggregating top FAQs
- [ ] Pune landing page (mirror Lonavala pattern if Pune Ads run)

---

## Low priority — nice to have

### Technical polish

- [ ] Add `hreflang` if Hindi/Marathi pages are planned (currently N/A)
- [ ] Add `WebSite` `SearchAction` schema if blog search is promoted
- [ ] Add `openingHours` and `geo` coordinates to LocalBusiness schema
- [ ] Submit sitemap in Google Search Console after deploy

### Content

- [ ] Refresh home meta quarterly with seasonal keywords (monsoon, dengue season)
- [ ] A/B test meta descriptions for CTR on home + top 3 services
- [ ] Add customer review schema only if synced with live Google review count

### Brand theme (from `pestcontrol99-theme-prompt.md`)

- [ ] Replace hardcoded `green-600` / `gray-*` Tailwind classes with CSS variable tokens
- [ ] Apply `.btn-primary`, `.btn-cta`, `.section-dark` utility classes sitewide
- [ ] *(Does not affect rankings directly — improves trust and CWV consistency)*

---

## Per-page quick reference

| Page | Title OK? | Desc OK? | H1 OK? | Canonical OK? | Schema OK? |
|------|-----------|----------|--------|---------------|------------|
| Home | ✅ | ⚠️ long | ⚠️ sr-only | ⚠️ ogUrl slash | ✅ global |
| About | ✅ | ✅ | ✅ | ✅ | ✅ global |
| Contact | ✅ | ✅ | ✅ | ✅ | ✅ global |
| Services hub | ✅ | ✅ | ✅ | ✅ | ⚠️ no Service schema |
| 6 service pages | ✅ | ✅ | ✅ | ✅ | ✅ Service |
| Quote | ✅ | ✅ | ❌ no H1 | ✅ | — |
| Blog list | ⚠️ long | ❌ short | ✅ | ✅ | — |
| Blog post | CMS | CMS | ✅ | CMS | ❌ no BlogPosting |
| Lonavala landing | ❌ long | ❌ long | ⚠️ sr-only | ✅ | ✅ global |
| Area (rich) | ⚠️ long | ⚠️ long | ✅ | ✅ | ✅ FAQ + LocalBusiness |
| Area (template) | ✅ | ✅ | ✅ | ✅ | ✅ noindex |
| Legal ×5 | ✅ | ✅ | ✅ | ✅ | — |
| Feedback | ❌ missing | ❌ missing | ✅ | — | — |
| Delete account | ❌ missing | ❌ missing | ✅ | — | — |
| 404 | ❌ missing | ❌ missing | ⚠️ | — | — |
| Thank you ×2 | ✅ | ✅ | ✅ | — | ✅ noindex |
| Test / quote-simple | ✅ | ❌ | ✅ | — | ✅ noindex |

---

## Verification after fixes

```bash
# Local smoke checks
curl -s https://www.pestcontrol99.com/robots.txt
curl -s https://www.pestcontrol99.com/sitemap.xml | head

# Rich results test (manual)
# https://search.google.com/test/rich-results

# Meta spot-check (view rendered HTML or use prerender)
curl -s https://www.pestcontrol99.com/services/cockroach-pest-control/ | grep -i '<title>'
```

- [ ] Re-run Google Search Console URL inspection on home + top 3 service pages
- [ ] Confirm Lonavala duplicate resolved in GSC coverage report
- [ ] Monitor indexed page count 2–4 weeks post-sitemap

---

*Last updated: June 16, 2026*
