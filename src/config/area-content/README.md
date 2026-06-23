# Area page content — manual daily rollout

Your content creator delivers **one area per day**. You add it here — no code changes elsewhere except 3 steps.

## Priority queue (suggested order)

| Done | Slug | URL | Area name |
|------|------|-----|-----------|
| ✅ | `andheri` | `/pest-control-andheri/` | Andheri |
| ⬜ | `thane` | `/pest-control-thane/` | Thane |
| ⬜ | `borivali` | `/pest-control-borivali/` | Borivali |
| ⬜ | `bandra` | `/pest-control-bandra/` | Bandra |
| ⬜ | `powai` | `/pest-control-powai/` | Powai |
| ⬜ | `vashi` | `/pest-control-vashi/` | Vashi |
| ⬜ | `kharghar` | `/pest-control-kharghar/` | Kharghar |
| ⬜ | `navi-mumbai` | `/pest-control-navi-mumbai/` | Navi Mumbai |
| ⬜ | `pune` | `/pest-control-pune/` | Pune |

> `lonavala` uses the Ads landing at `/pest-control-in-lonavala/` — the area URL stays noindex.

---

## When you receive new content (3 steps)

### 1. Create the content file

```bash
cp src/config/area-content/_TEMPLATE.ts src/config/area-content/thane.ts
```

Paste the creator’s copy into `thane.ts`. Rename the export to `THANE_AREA_CONTENT`.

### 2. Register in `index.ts`

```ts
import { THANE_AREA_CONTENT } from './thane';

const AREA_CONTENT_REGISTRY = {
  andheri: ANDHERI_AREA_CONTENT,
  thane: THANE_AREA_CONTENT,  // ← add this line
};
```

### 3. Enable indexing + sitemap

Add the slug to `indexed-slugs.json`:

```json
["andheri", "thane"]
```

Then run:

```bash
npm run generate-sitemap
```

Deploy. The page automatically becomes **indexable** (rich content removes noindex).

---

## Validate before deploy

```bash
npm run validate-area-content
```

Checks title length, description length, FAQ count, and that the slug exists in `areasWeServe.ts`.

---

## Field guide for content creator

| Field | Limit | Notes |
|-------|-------|-------|
| `pageTitle` | ≤60 chars | `Pest Control in {Area} \| Pest Control 99` |
| `metaDescription` | 140–160 chars | Include phone or “free quote” CTA |
| `introParagraphs` | 5–7 paragraphs | Unique local copy, not template filler |
| `faq` | 4–5 items | Area-specific questions |
| `keywords` | comma-separated | Local SEO phrases |
