export type AreaRichContent = {
  pageTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  introParagraphs: string[];
  servicesOffered: string[];
  commitmentParagraph: string;
  closingParagraph: string;
  phoneCta: string;
  keywords: string;
  faq: { id: string; question: string; answer: string }[];
};
