# SEO Audit Report — Pest Control 99

**Domain:** https://www.pestcontrol99.com  
**Codebase:** `pestcontroll99/` (Vite + React SPA)  
**Audit date:** June 16, 2026  
**Pages inventoried:** 18 static + 45 area templates + dynamic blog routes

---

## Executive summary

Pest Control 99 has a **solid foundation** for local SEO: unique meta on most money pages, canonical URLs, trailing-slash consistency, global Organization/LocalBusiness schema, and a deliberate **noindex strategy** for thin location pages until rich content is ready.

The **biggest risks** are:

1. **Client-side-only metadata** — titles/descriptions are injected after JavaScript runs; crawlers that do not execute JS may index `index.html` defaults for all URLs.
2. **`robots.txt` and `sitemap.xml` exist** in `public/` but sitemap is incomplete (missing blog posts, most area pages) and was missing legal URLs until updated.
3. **Duplicate Lonavala URLs** — `/pest-control-in-lonavala/` (landing) and `/pest-control-lonavala/` (area) both indexable with overlapping intent.
4. **Four routes previously had no PageMeta** — feedback, booking feedback, delete-account, 404 inherited homepage meta. **Fixed in code (June 2026).**
5. **Suboptimal social image** — default OG image is 512×512 app icon, not a 1200×630 branded share card.

Overall SEO health: **6.5 / 10** — good on-page intent and structure; needs technical SEO hardening for an SPA.

---

## Step 1 — Site crawl results

### Public pages found ✅

| Category | Routes | Count |
|----------|--------|-------|
| Core | Home, About, Contact, Services hub | 4 |
| Service detail | Cockroach, Mosquito, Termite, Rodent, Honey Bee, Wood Borer | 6 |
| Conversion | Quote, Lonavala landing | 2 |
| Blog | Listing, post, category, tag | Dynamic |
| Legal | Privacy, Terms, Refund, Legal, Data deletion | 5 |
| Location | `/pest-control-{slug}/` | 45 |
| Partner support | Delete account | 1 |

### Not found (N/A for this site)

- Login / Register / OTP flows
- User dashboard, CRM, analytics (separate apps)
- Property / product catalog pages
- Dedicated FAQ or Pricing pages (FAQ sections exist inline on area/service pages)

---

## Step 2 — Metadata audit

### Missing title tags

| URL | Status |
|-----|--------|
| `/feedback/` | ❌ Falls back to `index.html` title |
| `/feedback/{id}/` | ❌ Same |
| `/delete-account/` | ❌ Same |
| `/*` (404) | ❌ Same |

All other routed pages set title via `PageMeta`.

### Missing meta descriptions

| URL | Status |
|-----|--------|
| `/quote-simple/` | ❌ No description prop |
| `/test/` | ❌ No description prop |
| `/feedback/`, `/feedback/{id}/`, `/delete-account/`, 404 | ❌ Fallback only |

### Duplicate / near-duplicate titles

| Issue | URLs | Severity |
|-------|------|----------|
| Lonavala landing vs area page | `/pest-control-in-lonavala/` and `/pest-control-lonavala/` share nearly identical title & description | **High** |
| Brand spelling split | `Pest Control 99` vs `PestControl99` across blog titles | Medium |
| 43 noindex area pages share identical title **pattern** (only city name differs) | Low (mitigated by noindex) |

### Duplicate descriptions

| Issue | Notes |
|-------|-------|
| Lonavala pair | Same monsoon-focused description on landing + area URL |
| Area template | 43 pages use identical description template with `{area}` swap — acceptable while noindex |

### Title length analysis

| Page | Chars | Verdict |
|------|-------|---------|
| Home | 55 | ✅ Ideal |
| Lonavala landing | 68 | ⚠️ Too long (may truncate in SERPs) |
| Blog listing | 64 | ⚠️ Slightly long |
| Cockroach service | 54 | ✅ Ideal |
| About | 52 | ✅ Ideal |

### Description length analysis

| Page | Chars | Verdict |
|------|-------|---------|
| Home | 163 | ⚠️ Slightly over 160 |
| Lonavala landing | 186 | ❌ Too long |
| Blog listing | 62 | ❌ Too short — expand with CTA |
| Contact | 138 | ✅ Good |

---

## Step 3 — Heading structure audit

### H1 inventory

| Page type | H1 status | Issue |
|-----------|-----------|-------|
| Home | sr-only only | No visible H1 after hero text removal — acceptable if sr-only H1 kept; consider one visible H2 as primary heading |
| Lonavala landing | sr-only only | Same as home |
| About, Services, Service detail, Blog, Area (rich) | Visible H1 | ✅ Good |
| Quote | **No H1** | ❌ Missing — form acts as main content |
| Thank you | H1 present | ✅ |
| 404 | H1 "404" + H2 "Page Not Found" | ⚠️ Two headings compete — use single H1 "Page Not Found" |

### Multiple H1 issues

No pages found with multiple `<h1>` elements in the same view (404 uses H1+H2 which is a hierarchy issue, not duplicate H1).

### Heading hierarchy

- Service pages: H1 → H2 sections — ✅ generally correct
- Blog posts: H1 title + in-content H2/H3 from CMS — ✅
- Homepage: sr-only H1, visible sections start at H2 — ⚠️ unconventional but not invalid

---

## Step 4 — URL structure audit

| Check | Status | Notes |
|-------|--------|-------|
| Lowercase URLs | ✅ | All slugs lowercase |
| Hyphen-separated | ✅ | e.g. `cockroach-pest-control`, `vile-parle` |
| Trailing slashes | ✅ | Enforced client-side |
| www canonical | ✅ | Non-www → www 301 |
| Duplicate URLs | ⚠️ | Lonavala landing + area; `/contact-us/` redirects properly |
| SEO-friendly slugs | ✅ | Descriptive location and service paths |

---

## Step 5 — Technical SEO audit

### Images

| Check | Status | Notes |
|-------|--------|-------|
| Hero / service images | ✅ | WebP used (`hero-home.webp`, service images) |
| Alt text | ✅ | Present on `AppImage` / `OptimizedImage` usage reviewed |
| OG share image | ❌ | 512×512 icon — should be 1200×630 branded image |
| LCP preload | ✅ | `hero-home.webp` preloaded in `index.html` |

### Internal linking

| Check | Status | Notes |
|-------|--------|-------|
| Footer area links | ✅ | Top 10 areas linked |
| Homepage "Areas We Serve" | ✅ | All 45 areas linked |
| Service cross-links | ✅ | Area pages link to service detail pages |
| Orphan risk | ⚠️ | 43 noindex area pages are linked from homepage — creates crawl budget on thin pages (mitigated by noindex) |
| Broken internal patterns | ✅ | No obvious dead routes in `App.tsx` |

### Schema markup

| Type | Present | Gap |
|------|---------|-----|
| Organization | ✅ Global | — |
| LocalBusiness | ✅ Global + area pages | Add `openingHours`, `geo` if available |
| WebSite | ✅ Global | Add `SearchAction` if site search is promoted |
| Service | ✅ 6 service pages | Add to services hub |
| FAQPage | ✅ Area pages with FAQ | Add to service pages with FAQ sections |
| BlogPosting | ❌ | **Add to blog post template** |
| BreadcrumbList | ❌ | UI breadcrumbs exist — add JSON-LD |
| Review / AggregateRating | ⚠️ | Rating in global LocalBusiness — verify matches live Google reviews |

### Crawlability & indexing

| Check | Status | Notes |
|-------|--------|-------|
| `robots.txt` | ✅ In `public/` | Updated to disallow thank-you + feedback paths |
| `sitemap.xml` | ⚠️ Partial | Static file — missing dynamic blog URLs; area pages added as content goes live |
| SPA meta rendering | ⚠️ | Client-side only — consider SSR/prerender for money pages |
| Google Search Console | ✅ | Verification meta in `index.html` |
| Analytics | ✅ | GA4 + GTM + Google Ads conversion tags |

---

## Step 6 — Content & keyword observations

### Strengths

- Strong local intent keywords on service and area pages
- Phone number (+91 80807 48282) in descriptions — good for local CTR
- Warranty and safety claims (CIB&RC, herbal, same-day) repeated consistently
- Lonavala monsoon angle is differentiated for hill-station market

### Gaps

- No dedicated `/pricing/` page (common search query: "pest control cost mumbai")
- No standalone `/faq/` page (FAQ exists per area/service only)
- Blog meta description too generic — opportunity for category-specific landing copy
- Pune area page exists but no dedicated Pune landing page (unlike Lonavala)

---

## Step 7 — Theme / UX note (brand consistency)

Brand CSS tokens from `pestcontrol99-theme-prompt.md` are **already defined** in `src/app/globals.css` (navy + green palette, Barlow Condensed + Inter). Remaining work is replacing hardcoded Tailwind color classes (`green-600`, `gray-900`) with design-token utilities — this supports trust/conversion but is separate from meta tags.

---

## Risk matrix

| Risk | Impact | Likelihood | Priority |
|------|--------|------------|----------|
| SPA meta not seen by all crawlers | High | Medium | **Critical** |
| Missing sitemap | High | High | **Critical** |
| Lonavala duplicate content | High | High | **High** |
| Missing PageMeta on 4 routes | Medium | Certain | **High** |
| Poor OG image | Medium | High | **Medium** |
| 43 noindex pages linked from home | Low | Certain | **Medium** |
| Blog missing BlogPosting schema | Medium | Certain | **Medium** |

---

*Companion docs: `SEO_META_DOCUMENTATION.md`, `SEO_FIXES_CHECKLIST.md`, `SEO_PRIORITY_ROADMAP.md`*
