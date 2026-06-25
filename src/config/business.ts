/**
 * Canonical business identity — keep identical across website, legal pages,
 * Meta Business Profile, and WhatsApp Business Display Name verification.
 */
export const BUSINESS = {
  brandName: 'Pest Control 99',
  legalName: 'Multi Pest Care LLP',
  website: 'https://www.pestcontrol99.com',
  websiteDisplay: 'pestcontrol99.com',
  email: 'accounts@pestcontrol99.com',
  phoneDisplay: '+91 80807 48282',
  phoneTel: '+918080748282',
  phoneWhatsApp: '918080748282',
  address: {
    line1: 'Office No. 2, Hava Mahal Bldg, Ground Floor, Gaothan Lane, 1, Swami Vivekanand Rd',
    city: 'Andheri West',
    state: 'Maharashtra',
    postalCode: '400058',
    country: 'IN',
    full: 'Office No. 2, Hava Mahal Bldg, Ground Floor, Gaothan Lane, 1, Swami Vivekanand Rd, Andheri West, Mumbai, Maharashtra 400058, India',
  },
  tagline: 'Professional pest management services in Mumbai, Thane, Navi Mumbai, Lonavala & Pune',
  operatingStatement:
    'Pest Control 99 is a professional pest management service operated by Multi Pest Care LLP.',
  brandStatement:
    'Pest Control 99 is a brand operated and managed by Multi Pest Care LLP.',
  legalOperatorLine: 'Multi Pest Care LLP operates Pest Control 99.',
  serviceAreas: ['Mumbai', 'Thane', 'Navi Mumbai', 'Lonavala', 'Pune'],
  certifications: [
    'CIB&RC-approved treatment products',
    'Licensed & trained technicians',
    'Transparent pricing',
    'Written service warranty',
  ],
  aggregateRating: {
    ratingValue: '4.8',
    reviewCount: '50',
  },
} as const;

/** Physical office locations — shown in footer and contact page. */
export const OFFICE_LOCATIONS = [
  {
    label: 'Registered Office (Andheri West, Mumbai)',
    full: 'Office No. 2, Hava Mahal Bldg, Ground Floor, Gaothan Lane, 1, Swami Vivekanand Rd, Andheri West, Mumbai, Maharashtra 400058, India',
  },
  {
    label: 'Mira Road, Thane',
    full: '503, Sai Rushabh CHS Ltd, Geeta Nagar Phase 1, Mira Road, Thane, Maharashtra 401107, India',
  },
  {
    label: 'Mumbai — Kurla West',
    full: 'William Industry Estate, Office No. 19, 2nd Floor, SG Barve Marg, Above Sheetal Mithaiwala, Kurla West, Mumbai, Maharashtra 400070',
  },
  {
    label: 'Pune — Hadapsar',
    full: '114, Bhaskar Colony, Near Krome Mall, Next to Vijay Sales, Solapur Road, Hadapsar, Pune, Maharashtra 411013',
  },
] as const;

/** Primary site logo (header, footer, marketing pages). */
export const SITE_LOGO = {
  src: '/images/pestcontrol99-logo-v5.webp',
  alt: 'Pest Control 99 — Safe, Eco-Friendly, Trusted Experts',
  width: 5184,
  height: 1261,
} as const;

export const FOOTER_BRAND_LINES = {
  line1: BUSINESS.brandName,
  line2: `A Brand of ${BUSINESS.legalName}`,
  copyright: `© ${BUSINESS.legalName}. All Rights Reserved.`,
} as const;

export function whatsAppUrl(message?: string): string {
  const base = `https://wa.me/${BUSINESS.phoneWhatsApp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE = `Hello ${BUSINESS.brandName}, I need help with pest control services.`;
