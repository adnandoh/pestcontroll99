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
    line1: '503 Sai Rushabh CHS Ltd, Geeta Nagar Phase 1',
    city: 'Mira Road',
    state: 'Maharashtra',
    postalCode: '401107',
    country: 'IN',
    full: '503 Sai Rushabh CHS Ltd, Geeta Nagar Phase 1, Mira Road, Thane, Maharashtra 401107, India',
  },
  tagline: 'Professional pest management services in Mumbai, Thane & Navi Mumbai',
  operatingStatement:
    'Pest Control 99 is a professional pest management service operated by Multi Pest Care LLP.',
  brandStatement:
    'Pest Control 99 is a brand operated and managed by Multi Pest Care LLP.',
  legalOperatorLine: 'Multi Pest Care LLP operates Pest Control 99.',
  serviceAreas: ['Mumbai', 'Thane', 'Navi Mumbai'],
  certifications: [
    'CIB&RC-approved treatment products',
    'Licensed & trained technicians',
    'Transparent pricing',
    'Written service warranty',
  ],
  aggregateRating: {
    ratingValue: '4.8',
    reviewCount: '150',
  },
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
