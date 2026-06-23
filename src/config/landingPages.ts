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
    title: 'Monsoon Pest Control in Lonavala | Same-Day Service | Pest Control 99',
    description:
      'Trusted pest control for villas, resorts & homestays in Lonavala. Cockroach, mosquito, termite & rodent treatment. Same-day, herbal, warranty-backed. Call +91 80807 48282.',
    keywords:
      'pest control services in Lonavala, monsoon pest control in Lonavala, best pest control service in Lonavala, villa pest control in Lonavala, resort pest control in Lonavala, hotel pest control in Lonavala, cockroach control in Lonavala, mosquito control service in Lonavala, termite treatment in Lonavala, emergency pest control in Lonavala',
    canonical: `${SITE}/pest-control-in-lonavala/`,
    ogUrl: `${SITE}/pest-control-in-lonavala/`,
  },
  hero: {
    title: 'Reliable Monsoon Pest Control in Lonavala',
    subtitle: 'Professional pest management for villas, resorts, hotels & homestays across Lonavala',
    imageAlt: 'Professional monsoon pest control service in Lonavala by Pest Control 99',
    srOnlyH1: 'Reliable Monsoon Pest Control Services in Lonavala | Pest Control 99',
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
    title: 'Monsoon Pest Control for Lonavala Villas, Resorts & Hotels',
    subtitle:
      'Lonavala’s damp monsoon climate encourages cockroaches, mosquitoes, termites, ants, and rodents — especially in villas, resorts, and restaurants.',
    bullets: [
      'Cockroach control in resort kitchens and commercial food areas',
      'Mosquito control & fogging near swimming pools and garden zones',
      'Termite treatment for wooden furniture and villa interiors',
      'Rodent control for villas, hotels, and homestays',
      'Ant control, bed bug treatment & preventive monsoon pest protection',
      'Same-day service and 24/7 emergency support across Lonavala',
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
