export type AreaRichContent = {
  pageTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  /** Overrides the default “Pest Control in {area}” pill above the H1. */
  heroBadge?: string;
  /** Overrides default section H2s for landing pages with a distinct topic (e.g. monsoon). */
  introHeading?: string;
  servicesHeading?: string;
  servicesSubheading?: string;
  breadcrumbLabel?: string;
  faqAreaLabel?: string;
  introParagraphs: string[];
  servicesOffered: string[];
  serviceDescriptions?: Record<string, string>;
  commitmentParagraph: string;
  closingParagraph: string;
  phoneCta: string;
  keywords: string;
  faq: { id: string; question: string; answer: string }[];
};
