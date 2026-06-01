import { BUSINESS } from '@/config/business';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BUSINESS.website}/#organization`,
    name: BUSINESS.brandName,
    legalName: BUSINESS.legalName,
    alternateName: [BUSINESS.legalName, 'PestControl99'],
    url: BUSINESS.website,
    email: BUSINESS.email,
    telephone: BUSINESS.phoneTel,
    logo: `${BUSINESS.website}/android-chrome-512x512.png`,
    parentOrganization: {
      '@type': 'Organization',
      name: BUSINESS.legalName,
    },
    sameAs: [BUSINESS.website],
  };
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BUSINESS.website}/#localbusiness`,
    name: BUSINESS.brandName,
    legalName: BUSINESS.legalName,
    description: BUSINESS.tagline,
    url: BUSINESS.website,
    telephone: BUSINESS.phoneTel,
    email: BUSINESS.email,
    image: `${BUSINESS.website}/images/heroimage.webp`,
    logo: `${BUSINESS.website}/android-chrome-512x512.png`,
    parentOrganization: {
      '@type': 'Organization',
      name: BUSINESS.legalName,
      url: BUSINESS.website,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.line1,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    areaServed: BUSINESS.serviceAreas.map((name) => ({
      '@type': 'City',
      name,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS.aggregateRating.ratingValue,
      reviewCount: BUSINESS.aggregateRating.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    priceRange: '₹₹',
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BUSINESS.website}/#website`,
    name: BUSINESS.brandName,
    alternateName: BUSINESS.legalName,
    url: BUSINESS.website,
    publisher: {
      '@id': `${BUSINESS.website}/#organization`,
    },
    inLanguage: 'en-IN',
  };
}

export function getStructuredDataGraph() {
  return [getOrganizationSchema(), getLocalBusinessSchema(), getWebSiteSchema()];
}
