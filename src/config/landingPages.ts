import type { PageMetaProps } from '@/components/PageMeta';

export type LandingPageConfig = {
  /** CRM + reporting identifier */
  leadSource: string;
  thankYouPath: string;
  defaultCity: string;
  defaultState: string;
  seo: PageMetaProps;
  hero: {
    title: string;
    subtitle: string;
    imageAlt: string;
    srOnlyH1: string;
  };
  form: {
    title: string;
    subtitle: string;
  };
  services: {
    title: string;
    subtitle: string;
  };
  localSection: {
    title: string;
    subtitle: string;
    bullets: string[];
  };
  credibility: {
    title: string;
    subtitle: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
  };
};

const SITE = 'https://www.pestcontrol99.com';

export const LONAVALA_LANDING: LandingPageConfig = {
  leadSource: 'Lonavala Landing Page | /pest-control-in-lonavala | Google Ads',
  thankYouPath: '/lonavala-thank-you/',
  defaultCity: 'Lonavala',
  defaultState: 'Maharashtra',
  seo: {
    title: 'Pest Control in Lonavala | Same-Day Service & Free Quote | Pest Control 99',
    description:
      'Professional pest control in Lonavala for homes, villas, resorts & commercial properties. Cockroach, termite, rodent & mosquito treatment. Same-day visits, 365-day warranty. Get a free quote.',
    keywords:
      'pest control lonavala, pest control services lonavala, cockroach control lonavala, termite treatment lonavala, mosquito control lonavala, villa pest control lonavala, resort pest control lonavala, pest control near lonavala',
    canonical: `${SITE}/pest-control-in-lonavala/`,
    ogUrl: `${SITE}/pest-control-in-lonavala/`,
  },
  hero: {
    title: 'Pest Control 99 — Lonavala',
    subtitle: 'Safe, same-day pest control for homes, villas & resorts in Lonavala',
    imageAlt: 'Pest Control 99 technician providing professional pest control in Lonavala',
    srOnlyH1: 'Pest Control in Lonavala — Same-Day Certified Pest Management Services',
  },
  form: {
    title: 'Get Your Free Quote in Lonavala',
    subtitle:
      'Tell us about your pest problem in Lonavala — we respond the same day with an accurate quote.',
  },
  services: {
    title: 'Pest Control Services in Lonavala',
    subtitle: 'Trusted treatments for villas, bungalows, hotels and local businesses across Lonavala',
  },
  localSection: {
    title: 'Why Lonavala Properties Need Professional Pest Control',
    subtitle:
      'Hill-station humidity, monsoon dampness and weekend homes make Lonavala especially vulnerable to pests.',
    bullets: [
      'Monsoon moisture increases cockroach, ant and mosquito activity in kitchens and bathrooms',
      'Wooden villas and bungalows need termite and wood borer inspections before damage spreads',
      'Resorts and homestays benefit from discreet, odourless treatments between guest check-ins',
      'Rodent control for properties near market areas, warehouses and food storage zones',
    ],
  },
  credibility: {
    title: 'Why Lonavala Customers Choose Pest Control 99',
    subtitle:
      '365-day warranty • Herbal & lab-tested chemicals • Same-day Lonavala response • Transparent pricing',
  },
  finalCta: {
    title: 'Need Pest Control in Lonavala Today?',
    subtitle:
      'Submit the form above or call us — lock a same-day slot and relax under our 365-day no-return warranty.',
  },
};
