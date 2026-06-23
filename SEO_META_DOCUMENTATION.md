# SEO Meta Documentation — Pest Control 99

**Site:** [https://www.pestcontrol99.com](https://www.pestcontrol99.com)  
**Stack:** Vite + React (SPA), client-side meta via `PageMeta` component  
**Audit date:** June 16, 2026  
**Primary market:** Mumbai, Thane, Navi Mumbai, Lonavala, Pune

---

## How metadata is implemented

| Layer | File | Notes |
|-------|------|-------|
| Default (pre-JS) | `index.html` | Fallback title, description, OG tags for crawlers before React hydrates |
| Per-page (runtime) | `src/components/PageMeta.tsx` | Sets `document.title`, meta description, canonical, robots, OG, Twitter |
| Global schema | `src/layouts/RootLayout.tsx` | Organization, LocalBusiness, WebSite JSON-LD on every page |
| Area pages | `src/components/AreaPageTemplate.tsx` | Dynamic title/description; `noindex` unless rich content exists |
| Blog posts | `src/app/blog/[slug]/page.tsx` | CMS fields: `meta_title`, `meta_description`, `canonical_url`, `target_keywords` |

**Trailing slashes:** All public URLs use trailing slashes (`TrailingSlashRedirect` in `App.tsx`).

---

## Static public pages

| Page Name | URL | Meta Title (current) | Meta Description (current) | H1 (visible) | Canonical URL | Index | Priority |
|-----------|-----|----------------------|----------------------------|--------------|---------------|-------|----------|
| Home | `/` | Pest Control in Mumbai \| Safe, Same-Day & Certified Services | Trusted pest control services in Mumbai, Thane, & Navi Mumbai. 100% safe, herbal treatments for homes & offices. Get a same-day quote & 365-day warranty. Book now! | *(sr-only)* Pest Control 99 — Pest Control in Mumbai… | `https://www.pestcontrol99.com/` | Index | **High** |
| About Us | `/about/` | About Pest Control 99 \| Multi Pest Care LLP, Mumbai | Pest Control 99 by Multi Pest Care LLP — licensed, CIB&RC-approved pest management in Mumbai, Thane & Navi Mumbai. Same-day service, written warranty, transparent pricing. | About Pest Control 99 | `https://www.pestcontrol99.com/about/` | Index | Medium |
| Contact Us | `/contact/` | Contact Pest Control 99 \| Book Pest Control in Mumbai | Contact Pest Control 99 for same-day pest control in Mumbai, Thane & Navi Mumbai. Call +91 80807 48282, WhatsApp, or request a free quote online. | Contact Us | `https://www.pestcontrol99.com/contact/` | Index | **High** |
| Services Hub | `/services/` | Pest Control Services in Mumbai \| Cockroach, Termite, Rodent & More | Professional pest control services in Mumbai, Thane & Navi Mumbai — cockroach, termite, mosquito, rodent, honey bee & wood borer treatment. Same-day, warranty-backed. Free quote. | Professional Pest Control Services Mumbai | `https://www.pestcontrol99.com/services/` | Index | **High** |
| Cockroach Control | `/services/cockroach-pest-control/` | Cockroach Pest Control in Mumbai \| Odourless Gel Treatment | Same-day cockroach control in Mumbai, Thane & Navi Mumbai. Odourless, child & pet-safe gel treatment with a 365-day warranty. Free quote — call +91 80807 48282. | Cockroach Control Mumbai — Odourless Gel Treatment… | `https://www.pestcontrol99.com/services/cockroach-pest-control/` | Index | **High** |
| Mosquito Control | `/services/mosquito-pest-control/` | Mosquito Pest Control in Mumbai \| Same-Day Treatment | Professional mosquito control in Mumbai, Thane & Navi Mumbai. Safe, same-day fogging & larvicide treatment to cut dengue & malaria risk. Free quote — +91 80807 48282. | Mosquito Pest Control Mumbai | `https://www.pestcontrol99.com/services/mosquito-pest-control/` | Index | **High** |
| Termite Control | `/services/termite-pest-control/` | Termite Control in Mumbai \| Anti-Termite Treatment, 5-Yr Warranty | Anti-termite treatment in Mumbai, Thane & Navi Mumbai with up to 5-year warranty. Low-odour borate, neat drill & seal, same-day inspection. Free quote — +91 80807 48282. | Termite Control Mumbai | `https://www.pestcontrol99.com/services/termite-pest-control/` | Index | **High** |
| Rodent Control | `/services/rodent-pest-control/` | Rodent & Rat Control in Mumbai \| Removal & Entry Sealing | Effective rat & rodent control in Mumbai, Thane & Navi Mumbai. Trapping, baiting & entry-point sealing with 90-day warranty. Same-day service — +91 80807 48282. | Rodent & Rat Control Mumbai | `https://www.pestcontrol99.com/services/rodent-pest-control/` | Index | **High** |
| Honey Bee Removal | `/services/honey-bee-pest-control/` | Honey Bee Removal in Mumbai \| Safe Hive Removal Service | Safe honey bee & hive removal in Mumbai, Thane & Navi Mumbai. Trained technicians remove beehives without harm to your family. Same-day service — +91 80807 48282. | Honey Bee Removal Mumbai | `https://www.pestcontrol99.com/services/honey-bee-pest-control/` | Index | Medium |
| Wood Borer Control | `/services/wood-borer-control/` | Wood Borer Control in Mumbai \| Save Your Furniture | Professional wood borer treatment in Mumbai, Thane & Navi Mumbai. Protect furniture & woodwork from powder-post beetles. Warranty-backed — call +91 80807 48282. | Wood Borer Control Mumbai | `https://www.pestcontrol99.com/services/wood-borer-control/` | Index | Medium |
| Get Quote | `/quote/` | Get a Free Pest Control Quote \| Instant Price Estimate | Get an instant pest control price estimate for your home or office in Mumbai, Thane & Navi Mumbai. Same-day service, no hidden charges. Book your free quote now. | *(missing visible H1)* | `https://www.pestcontrol99.com/quote/` | Index | **High** |
| Blog Listing | `/blog/` | Pest Control Blog \| Tips, Guides & Expert Advice \| PestControl99 | Read expert pest control blogs, tips, and guides for Mumbai & India. | Blog | `https://www.pestcontrol99.com/blog/` | Index | Medium |
| Lonavala Landing (Ads) | `/pest-control-in-lonavala/` | Reliable Monsoon Pest Control Services in Lonavala \| Pest Control 99 | Professional monsoon pest control in Lonavala for villas, resorts, hotels & homestays. Cockroach, mosquito, termite & rodent treatment. Same-day service. Call 8080748282 for a free quote. | *(sr-only)* Reliable Monsoon Pest Control Services in Lonavala… | `https://www.pestcontrol99.com/pest-control-in-lonavala/` | Index | **High** |
| Privacy Policy | `/privacy-policy/` | Privacy Policy \| Pest Control 99 | How Pest Control 99 (Multi Pest Care LLP) collects, uses, and protects your personal data. | Privacy Policy | `https://www.pestcontrol99.com/privacy-policy/` | Index | Low |
| Terms & Conditions | `/terms-and-conditions/` | Terms & Conditions \| Pest Control 99 | Terms and conditions for pest control services provided by Pest Control 99 (Multi Pest Care LLP). | Terms & Conditions | `https://www.pestcontrol99.com/terms-and-conditions/` | Index | Low |
| Refund Policy | `/refund-policy/` | Refund Policy \| Pest Control 99 | Refund and cancellation policy for pest control services by Pest Control 99 (Multi Pest Care LLP). | Refund Policy | `https://www.pestcontrol99.com/refund-policy/` | Index | Low |
| Legal Information | `/legal/` | Legal Information \| Pest Control 99 | Legal information and business identity for Pest Control 99, operated by Multi Pest Care LLP. | Legal Information | `https://www.pestcontrol99.com/legal/` | Index | Low |
| Data Deletion | `/data-deletion/` | Data Deletion Request \| Pest Control 99 | Request deletion of your personal data held by Pest Control 99 (Multi Pest Care LLP). | Data Deletion Request | `https://www.pestcontrol99.com/data-deletion/` | Index | Low |

### Redirects (canonical targets)

| From | To |
|------|-----|
| `/contact-us/` | `/contact/` |
| `/terms/` | `/terms-and-conditions/` |
| `pestcontrol99.com` (non-www) | `www.pestcontrol99.com` (301, via `proxy.ts`) |

---

## Utility / conversion pages (noindex)

| Page Name | URL | Meta Title | Meta Description | H1 | Index | Priority |
|-----------|-----|------------|------------------|-----|-------|----------|
| Thank You (general) | `/thank-you/` | Thank You \| Pest Control 99 | Your pest control quote request was received. Our team will contact you shortly. | Thank You | **NoIndex** | N/A |
| Thank You (Lonavala Ads) | `/lonavala-thank-you/` | Thank You \| Lonavala Pest Control Quote \| Pest Control 99 | Your Lonavala pest control quote request was received… | Thank You | **NoIndex** | N/A |
| Quote Simple | `/quote-simple/` | Get a Quote \| Pest Control 99 | *(none)* | Get a Free Quote | **NoIndex** | N/A |
| Test Page | `/test/` | Test \| Pest Control 99 | *(none)* | — | **NoIndex** | N/A |

---

## Pages missing PageMeta — resolved (June 2026)

| Page Name | URL | Status |
|-----------|-----|--------|
| Feedback (general) | `/feedback/` | ✅ NoIndex + title added |
| Feedback (booking) | `/feedback/:id/` | ✅ NoIndex + title added |
| Delete Account | `/delete-account/` | ✅ NoIndex + title added |
| 404 Not Found | `/*` (catch-all) | ✅ NoIndex + title added |

---

## Dynamic page templates

### Blog post — `/blog/{slug}/`

| Field | Source |
|-------|--------|
| Meta Title | `blog.meta_title` or `{blog.title} \| PestControl99` |
| Meta Description | `blog.meta_description` or `blog.excerpt` |
| Keywords | `blog.target_keywords` |
| Canonical | `blog.canonical_url` or `https://www.pestcontrol99.com/blog/{slug}/` |
| OG Image | `blog.featured_image` |
| H1 | `blog.title` |
| Index | Index (default) |

**React implementation example:**

```tsx
<PageMeta
  title={blog.meta_title || `${blog.title} | Pest Control 99`}
  description={blog.meta_description || blog.excerpt}
  keywords={blog.target_keywords}
  canonical={blog.canonical_url || `https://www.pestcontrol99.com/blog/${blog.slug}/`}
  ogUrl={`https://www.pestcontrol99.com/blog/${blog.slug}/`}
  ogImage={blog.featured_image}
/>
```

### Blog category — `/blog/category/{slug}/`

| Field | Source |
|-------|--------|
| Meta Title | `{category.name} Blogs \| PestControl99` |
| Meta Description | `category.meta_description` or fallback |
| Canonical | `https://www.pestcontrol99.com/blog/category/{slug}/` |
| H1 | `category.name` |
| Index | Index |

### Blog tag — `/blog/tag/{slug}/`

| Field | Source |
|-------|--------|
| Meta Title | `Blogs tagged "{tag.name}" \| PestControl99` |
| Meta Description | `All pest control blogs tagged {tag.name}.` |
| Canonical | `https://www.pestcontrol99.com/blog/tag/{slug}/` |
| H1 | Tag name |
| Index | Index (consider NoIndex for thin tag pages) |

### Blog search / pagination

| URL pattern | Issue | Recommendation |
|-------------|-------|----------------|
| `/blog/?page=2` | Same canonical as page 1 | Use `rel="prev/next"` or canonical to self with `?page=` |
| `/blog/?q=term` | Search results indexed | Set `noindex` on search result pages |

---

## Location / area pages — `/pest-control-{slug}/`

**Total routes:** 45 (from `src/config/areasWeServe.ts`)

| Index status | Count | Slugs with rich content |
|--------------|-------|-------------------------|
| **Index** (rich content in `areaPageContent.ts`) | 2 | `andheri`, `lonavala` |
| **NoIndex** (template placeholder) | 43 | All others |

### Indexed area pages (full metadata)

| Page | URL | Meta Title | H1 |
|------|-----|------------|-----|
| Andheri | `/pest-control-andheri/` | Professional Pest Control Services in Andheri \| Pest Control 99 | Professional Pest Control Services in Andheri |
| Lonavala (area) | `/pest-control-lonavala/` | *(same as landing)* | Reliable Monsoon Pest Control Services in Lonavala | **NoIndex** — canonical → `/pest-control-in-lonavala/` |

### NoIndex area pages (template metadata)

All remaining 43 slugs use:

- **Title:** `Pest Control in {Area} | Same-Day Service | Pest Control 99`
- **Description:** `Looking for pest control in {Area}? Pest Control 99 offers same-day cockroach, termite, mosquito & rodent treatment…`
- **Robots:** `noindex, nofollow` (via `noindex={!richContent}` in `AreaPageTemplate`)
- **H1:** `{heroTitle}` from template or rich content

<details>
<summary>Full list of 45 area slugs</summary>

`andheri`, `borivali`, `kandivali`, `malad`, `goregaon`, `santacruz`, `vile-parle`, `bandra`, `dadar`, `chembur`, `ghatkopar`, `mulund`, `worli`, `powai`, `kurla`, `wadala`, `navi-mumbai`, `vashi`, `nerul`, `kharghar`, `airoli`, `belapur`, `seawoods`, `ghansoli`, `ulwe`, `thane`, `mira-road`, `bhayandar`, `vasai`, `virar`, `bhiwandi`, `kalyan`, `dombivli`, `mumbra`, `diva`, `ambernath`, `ulhasnagar`, `badlapur`, `panvel`, `kamothe`, `taloja`, `lonavala`, `pune`, `khandala`, `khopoli`

</details>

**Area page React pattern:**

```tsx
<PageMeta
  title={richContent?.pageTitle ?? getAreaPageTitle(area.name)}
  description={richContent?.metaDescription ?? getAreaMetaDescription(area.name)}
  keywords={richContent?.keywords}
  canonical={getAreaCanonical(area.slug)}
  ogUrl={getAreaCanonical(area.slug)}
  noindex={!richContent}
/>
```

---

## Pages not in scope (separate apps)

The following from the generic audit template do **not** exist on pestcontrol99.com:

- Authentication (login, register, OTP)
- User dashboard, CRM, reports, analytics
- Property listings / vacation rental pages

Partner app account deletion is served at `/delete-account/` (legal/support page, not a login flow).

---

## Recommended meta title & description patterns

### Title formula (50–60 characters)

```
{Primary Keyword} in {City} | {USP} | Pest Control 99
```

Examples:
- `Cockroach Control Mumbai | Same-Day Gel Treatment` (49 chars)
- `Pest Control in Thane | Same-Day & Warranty-Backed` (50 chars)

### Description formula (140–160 characters)

```
{Service} in {cities}. {Safety/approval claim}. {Warranty}. {CTA with phone or "Book free quote"}.
```

---

## Schema markup inventory

| Schema Type | Where implemented | Status |
|-------------|-------------------|--------|
| Organization | `RootLayout` → `structuredData.ts` | ✅ Live |
| LocalBusiness | `RootLayout` + per-area pages | ✅ Live |
| WebSite | `RootLayout` | ✅ Live |
| Service | Individual service pages (inline JSON-LD) | ✅ Live (6 pages) |
| FAQPage | `AreaPageFAQ.tsx` on area pages | ✅ Live |
| BlogPosting | Blog post pages | ❌ Missing |
| BreadcrumbList | — | ❌ Missing (breadcrumbs exist in UI only) |
| AggregateRating | LocalBusiness schema | ✅ In global schema |
| Article | — | ❌ Missing (use BlogPosting) |

---

## Implementation reference (Vite/React)

This site is **not** Next.js. Per-page metadata uses the `PageMeta` component:

```tsx
import PageMeta from '@/components/PageMeta';

export default function ExamplePage() {
  return (
    <>
      <PageMeta
        title="Pest Control in Thane | Same-Day Service | Pest Control 99"
        description="Same-day pest control in Thane for homes and offices. CIB&RC-approved, warranty-backed treatments. Call +91 80807 48282 or book a free quote."
        keywords="pest control thane, cockroach control thane"
        canonical="https://www.pestcontrol99.com/pest-control-thane/"
        ogUrl="https://www.pestcontrol99.com/pest-control-thane/"
        noindex={false}
      />
      <h1>Pest Control in Thane</h1>
      {/* page content */}
    </>
  );
}
```

### Django / CMS (blog backend) fields

```python
# blog.models — fields consumed by frontend
SEO_TITLE = models.CharField(max_length=70)          # meta_title
SEO_DESCRIPTION = models.CharField(max_length=160)   # meta_description
SEO_KEYWORDS = models.TextField(blank=True)          # target_keywords
CANONICAL_URL = models.URLField(blank=True)            # canonical_url
```

---

*Generated from codebase audit of `pestcontroll99/` — June 2026*
