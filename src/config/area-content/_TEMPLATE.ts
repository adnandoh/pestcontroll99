/**
 * COPY this file → rename to {slug}.ts (e.g. thane.ts)
 * Fill in content from your content creator, then register in index.ts
 *
 * Slug must match areasWeServe.ts (e.g. thane, borivali, bandra)
 * Live URL: https://www.pestcontrol99.com/pest-control-{slug}/
 */
import type { AreaRichContent } from './types';

export const THANE_AREA_CONTENT: AreaRichContent = {
  pageTitle: 'Professional Pest Control Services in Thane | Pest Control 99',
  metaDescription:
    'Professional pest control in Thane for homes and offices. Same-day cockroach, termite, rodent and mosquito control with warranty. Call +91 80807 48282 for a free quote.',
  heroTitle: 'Professional Pest Control Services in Thane',
  heroSubtitle: 'Same-day, warranty-backed pest control across Thane',
  heroImage: '/images/heroimage.webp',
  heroImageAlt: 'Professional pest control services in Thane by Pest Control 99',
  introParagraphs: [
    'Paragraph 1 — local context about the area and pest problems.',
    'Paragraph 2 — why professional pest control matters here.',
    // Add 4–7 paragraphs total (800–1200 words)
  ],
  servicesOffered: [
    'Cockroach Control',
    'Mosquito Control',
    'Rodent Control',
    'Termite Treatment',
    'Ant Control',
    'Residential Pest Control',
    'Commercial Pest Control',
  ],
  commitmentParagraph:
    'Pest Control 99 provides reliable pest control in {Area}…',
  closingParagraph:
    'Book a free inspection today…',
  phoneCta: '+91 80807 48282',
  keywords:
    'pest control in Thane, best pest control Thane, cockroach control Thane',
  faq: [
    {
      id: 'cost',
      question: 'How much does pest control cost in Thane?',
      answer: 'Typical one-time treatments start from ₹800–₹1,000 depending on pest type and property size.',
    },
    {
      id: 'same-day',
      question: 'Do you offer same-day pest control in Thane?',
      answer: 'Yes. Call +91 80807 48282 to confirm a same-day slot.',
    },
    // Add 3–5 FAQs total
  ],
};
