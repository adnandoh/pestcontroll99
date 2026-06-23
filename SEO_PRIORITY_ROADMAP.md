# SEO Priority Roadmap — Pest Control 99

**Planning horizon:** 12 weeks  
**Goal:** Improve organic visibility for Mumbai metro + Lonavala/Pune local queries  
**Baseline:** SPA with good on-page copy but weak technical SEO infrastructure

---

## Phase 0 — Week 1 (Critical fixes)

**Objective:** Stop indexation leaks and give crawlers a map of the site.

| # | Task | Owner | Effort | Impact |
|---|------|-------|--------|--------|
| 0.1 | Ship `robots.txt` + `sitemap.xml` | Dev | 4h | High |
| 0.2 | Fix missing `PageMeta` on feedback, delete-account, 404 | Dev | 2h | Medium |
| 0.3 | Resolve Lonavala duplicate (pick canonical, noindex or 301 the other) | SEO + Dev | 2h | High |
| 0.4 | Fix home `ogUrl` trailing slash mismatch | Dev | 15m | Low |
| 0.5 | Submit sitemap in Google Search Console | SEO | 30m | High |

**Exit criteria:** GSC shows sitemap processed; Lonavala duplicate flagged as resolved; no indexed URL returns homepage default title in URL Inspection.

---

## Phase 1 — Weeks 2–3 (Technical foundation)

**Objective:** Ensure search engines see correct metadata and rich results.

| # | Task | Owner | Effort | Impact |
|---|------|-------|--------|--------|
| 1.1 | Implement prerendering for top 15 URLs (home, services, contact, about, Lonavala) | Dev | 2–3d | **Critical** |
| 1.2 | Add `BlogPosting` schema to blog posts | Dev | 3h | Medium |
| 1.3 | Add `BreadcrumbList` schema | Dev | 2h | Medium |
| 1.4 | Create & deploy 1200×630 OG image | Design + Dev | 4h | Medium |
| 1.5 | Add visible H1 to `/quote/` | Dev | 30m | Low |

**Options for 1.1 (pick one):**

| Approach | Pros | Cons |
|----------|------|------|
| **Vite SSR plugin** | Full control, best long-term | Higher refactor cost |
| **Prerender at build** (`vite-plugin-prerender`) | Fast to ship for known routes | Must rebuild when blog/areas added |
| **Edge prerender service** | No code refactor | Monthly cost, vendor dependency |

**Recommended:** Build-time prerender for static + service + indexed area routes; SSR or ISR later for blog.

---

## Phase 2 — Weeks 4–6 (On-page optimization)

**Objective:** Improve CTR and keyword targeting on existing indexed pages.

| # | Task | Owner | Effort | Impact |
|---|------|-------|--------|--------|
| 2.1 | Rewrite meta titles/descriptions for top 10 pages (see audit) | SEO + Content | 1d | High |
| 2.2 | Standardize `| Pest Control 99` branding in all titles | Content | 2h | Low |
| 2.3 | Expand blog listing meta description | Content | 1h | Medium |
| 2.4 | Add FAQ schema to service pages with FAQ content | Dev | 3h | Medium |
| 2.5 | Internal linking: service pages → top area pages | Dev + SEO | 4h | Medium |

### Title/description rewrites (priority pages)

| Page | Current title issue | Recommended title (≤60c) |
|------|---------------------|--------------------------|
| Lonavala landing | 68 chars | `Monsoon Pest Control Lonavala \| Same-Day Service` |
| Blog | 64 chars, brand split | `Pest Control Blog \| Tips & Guides \| Pest Control 99` |
| Home | Good | Keep; trim description by ~5 chars |

---

## Phase 3 — Weeks 7–10 (Local SEO expansion)

**Objective:** Index high-value suburb pages with unique content.

| Week | Areas to publish (rich content) | Cumulative indexed areas |
|------|--------------------------------|--------------------------|
| 7 | Thane, Borivali, Bandra | 5 |
| 8 | Powai, Vashi, Kharghar, Navi Mumbai | 9 |
| 9 | Dadar, Chembur, Goregaon, Malad | 13 |
| 10 | Pune, Mira Road, Dombivli, Kalyan | 17 |

**Per area deliverable:**

1. 800–1,200 words unique copy (see `ANDHERI_AREA_CONTENT` as template)
2. 5+ local FAQs
3. Custom hero image where possible
4. Entry in `AREA_CONTENT_REGISTRY`
5. Add URL to sitemap on deploy

**Lonavala note:** If landing page `/pest-control-in-lonavala/` remains canonical for Ads, keep `/pest-control-lonavala/` as `noindex` with canonical pointing to landing — avoid two indexed Lonavala URLs.

---

## Phase 4 — Weeks 11–12 (Content & growth)

**Objective:** Capture additional keyword clusters and improve topical authority.

| # | Task | Owner | Effort | Impact |
|---|------|-------|--------|--------|
| 4.1 | Launch `/faq/` page (aggregate top 20 FAQs) | Content + Dev | 2d | Medium |
| 4.2 | Add pricing guide section or `/pricing/` page | Content + Dev | 2d | High |
| 4.3 | Publish 4 blog posts targeting: cost, monsoon, termite signs, cockroach DIY vs pro | Content | 2w | High |
| 4.4 | Pune Google Ads landing (if budget active) | Marketing + Dev | 3d | Medium |
| 4.5 | Review GSC queries — optimize pages ranking pos 5–15 | SEO | Ongoing | High |

---

## Ongoing maintenance (monthly)

| Activity | Frequency |
|----------|-----------|
| GSC coverage & Core Web Vitals review | Monthly |
| Sitemap regen after new blog posts / area pages | On publish |
| Meta description CTR test (home + top 3 services) | Quarterly |
| Schema validation (Rich Results Test) | After template changes |
| Competitor SERP spot-check (Mumbai pest control) | Monthly |

---

## KPI targets

| Metric | Baseline (est.) | 3-month target | 6-month target |
|--------|-----------------|----------------|----------------|
| Indexed pages (GSC) | ~25–35 | 50+ | 80+ |
| Organic clicks (GSC) | — | +20% | +50% |
| Avg position "pest control mumbai" | — | Top 15 | Top 10 |
| Indexed area pages with rich content | 2 | 10 | 20+ |
| Core Web Vitals (mobile) | — | All "Good" | Maintain |

---

## Dependencies & blockers

| Blocker | Blocks | Resolution |
|---------|--------|------------|
| No prerender/SSR | Correct meta in HTML source | Phase 1.1 |
| CMS blog API unavailable at build | Dynamic sitemap for posts | Runtime sitemap endpoint or weekly cron |
| Lonavala Ads URL vs SEO URL conflict | Duplicate content | Phase 0.3 decision |
| Area content writing bandwidth | Local page rollout | Phase 3 schedule; prioritize by search volume |

---

## Quick wins (can ship this week)

1. `robots.txt` + static sitemap for 30 known URLs  
2. PageMeta on 4 missing routes  
3. Lonavala canonical decision  
4. OG image upload  
5. Quote page H1  

**Estimated effort:** 1 developer day + 2 hours SEO review.

---

## Related documents

| Document | Purpose |
|----------|---------|
| `SEO_META_DOCUMENTATION.md` | Full page-by-page meta reference |
| `SEO_AUDIT_REPORT.md` | Detailed findings |
| `SEO_FIXES_CHECKLIST.md` | Trackable task list |
| `pestcontrol99-theme-prompt.md` | Brand/CSS (conversion support) |

---

*Roadmap owner: Development + SEO — Review date: September 2026*
