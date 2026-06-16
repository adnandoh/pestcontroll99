/**
 * Areas We Serve — zones, local SEO pages, and internal linking.
 * Source: pestcontrol99_dev_prompt.json
 */

export type ServiceArea = {
  /** URL segment after /pest-control- e.g. "andheri" */
  slug: string;
  /** Display name e.g. "Andheri" */
  name: string;
  zone: string;
  nearbySlugs: string[];
};

export type AreaZone = {
  zone: string;
  areas: { label: string; slug: string }[];
};

const SITE = 'https://www.pestcontrol99.com';

/** Zone-grouped links for the homepage "Areas We Serve" section */
export const AREAS_WE_SERVE_ZONES: AreaZone[] = [
  {
    zone: 'Mumbai – Western Suburbs',
    areas: [
      { label: 'Pest Control Andheri', slug: 'andheri' },
      { label: 'Pest Control Borivali', slug: 'borivali' },
      { label: 'Pest Control Kandivali', slug: 'kandivali' },
      { label: 'Pest Control Malad', slug: 'malad' },
      { label: 'Pest Control Goregaon', slug: 'goregaon' },
      { label: 'Pest Control Santacruz', slug: 'santacruz' },
      { label: 'Pest Control Vile Parle', slug: 'vile-parle' },
      { label: 'Pest Control Bandra', slug: 'bandra' },
    ],
  },
  {
    zone: 'Mumbai – Central & Eastern',
    areas: [
      { label: 'Pest Control Dadar', slug: 'dadar' },
      { label: 'Pest Control Chembur', slug: 'chembur' },
      { label: 'Pest Control Ghatkopar', slug: 'ghatkopar' },
      { label: 'Pest Control Mulund', slug: 'mulund' },
      { label: 'Pest Control Worli', slug: 'worli' },
      { label: 'Pest Control Powai', slug: 'powai' },
      { label: 'Pest Control Kurla', slug: 'kurla' },
      { label: 'Pest Control Wadala', slug: 'wadala' },
    ],
  },
  {
    zone: 'Navi Mumbai',
    areas: [
      { label: 'Pest Control Navi Mumbai', slug: 'navi-mumbai' },
      { label: 'Pest Control Vashi', slug: 'vashi' },
      { label: 'Pest Control Nerul', slug: 'nerul' },
      { label: 'Pest Control Kharghar', slug: 'kharghar' },
      { label: 'Pest Control Airoli', slug: 'airoli' },
      { label: 'Pest Control Belapur', slug: 'belapur' },
      { label: 'Pest Control Seawoods', slug: 'seawoods' },
      { label: 'Pest Control Ghansoli', slug: 'ghansoli' },
      { label: 'Pest Control Ulwe', slug: 'ulwe' },
    ],
  },
  {
    zone: 'Thane & Mira-Bhayandar Belt',
    areas: [
      { label: 'Pest Control Thane', slug: 'thane' },
      { label: 'Pest Control Mira Road', slug: 'mira-road' },
      { label: 'Pest Control Bhayandar', slug: 'bhayandar' },
      { label: 'Pest Control Vasai', slug: 'vasai' },
      { label: 'Pest Control Virar', slug: 'virar' },
      { label: 'Pest Control Bhiwandi', slug: 'bhiwandi' },
      { label: 'Pest Control Kalyan', slug: 'kalyan' },
      { label: 'Pest Control Dombivli', slug: 'dombivli' },
      { label: 'Pest Control Mumbra', slug: 'mumbra' },
      { label: 'Pest Control Diva', slug: 'diva' },
    ],
  },
  {
    zone: 'Beyond Thane',
    areas: [
      { label: 'Pest Control Ambernath', slug: 'ambernath' },
      { label: 'Pest Control Ulhasnagar', slug: 'ulhasnagar' },
      { label: 'Pest Control Badlapur', slug: 'badlapur' },
      { label: 'Pest Control Panvel', slug: 'panvel' },
      { label: 'Pest Control Kamothe', slug: 'kamothe' },
      { label: 'Pest Control Taloja', slug: 'taloja' },
    ],
  },
  {
    zone: 'Lonavala & Pune Belt',
    areas: [
      { label: 'Pest Control Lonavala', slug: 'lonavala' },
      { label: 'Pest Control Pune', slug: 'pune' },
      { label: 'Pest Control Khandala', slug: 'khandala' },
      { label: 'Pest Control Khopoli', slug: 'khopoli' },
    ],
  },
];

function computeNearbySlugs(zoneSlugs: string[], currentSlug: string, count = 5): string[] {
  const idx = zoneSlugs.indexOf(currentSlug);
  if (idx === -1) return zoneSlugs.filter((s) => s !== currentSlug).slice(0, count);

  const nearby: string[] = [];
  for (let offset = 1; offset < zoneSlugs.length && nearby.length < count; offset++) {
    const before = zoneSlugs[(idx - offset + zoneSlugs.length) % zoneSlugs.length];
    const after = zoneSlugs[(idx + offset) % zoneSlugs.length];
    if (before !== currentSlug && !nearby.includes(before)) nearby.push(before);
    if (nearby.length < count && after !== currentSlug && !nearby.includes(after)) nearby.push(after);
  }
  return nearby.slice(0, count);
}

function buildAreaRegistry(): Map<string, ServiceArea> {
  const registry = new Map<string, ServiceArea>();

  for (const { zone, areas } of AREAS_WE_SERVE_ZONES) {
    const zoneSlugs = areas.map((a) => a.slug);
    for (const area of areas) {
      registry.set(area.slug, {
        slug: area.slug,
        name: area.label.replace(/^Pest Control /, ''),
        zone,
        nearbySlugs: computeNearbySlugs(zoneSlugs, area.slug),
      });
    }
  }

  return registry;
}

export const AREA_REGISTRY = buildAreaRegistry();

export const ALL_AREA_SLUGS = Array.from(AREA_REGISTRY.keys());

/** Top area links for footer internal linking (SEO) */
export const FOOTER_TOP_AREAS = [
  'andheri',
  'borivali',
  'bandra',
  'thane',
  'vashi',
  'kharghar',
  'powai',
  'mira-road',
  'lonavala',
  'dombivli',
] as const;

export function getAreaPath(slug: string): string {
  return `/pest-control-${slug}/`;
}

export function getAreaCanonical(slug: string): string {
  return `${SITE}${getAreaPath(slug)}`;
}

export function getAreaBySlug(slug: string | undefined): ServiceArea | undefined {
  if (!slug) return undefined;
  return AREA_REGISTRY.get(slug.toLowerCase());
}

export function getAreaPageTitle(areaName: string): string {
  return `Pest Control in ${areaName} | Same-Day Service | Pest Control 99`;
}

export function getAreaMetaDescription(areaName: string): string {
  return `Looking for pest control in ${areaName}? Pest Control 99 offers same-day cockroach, termite, mosquito & rodent treatment with CIB&RC-approved, family-safe products and a written warranty. Call +91 80807 48282 for a free quote.`;
}

export function getAreaLocalBusinessSchema(area: ServiceArea) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Pest Control 99',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '503 Sai Rushabh CHS Ltd, Geeta Nagar Phase 1, Mira Road',
      addressLocality: 'Thane',
      addressRegion: 'Maharashtra',
      postalCode: '401107',
      addressCountry: 'IN',
    },
    areaServed: `${area.name}, Maharashtra`,
    telephone: '+918080748282',
    url: getAreaCanonical(area.slug),
  };
}

/** Service cards shown on every local area page */
export const AREA_PAGE_SERVICES = [
  { label: 'Cockroach Control', href: '/services/cockroach-pest-control/' },
  { label: 'Termite Control', href: '/services/termite-pest-control/' },
  { label: 'Bed Bug Treatment', href: '/services/' },
  { label: 'Rodent Control', href: '/services/rodent-pest-control/' },
  { label: 'Mosquito Control', href: '/services/mosquito-pest-control/' },
  { label: 'Ant Control', href: '/services/cockroach-pest-control/' },
  { label: 'General Pest Control', href: '/services/' },
] as const;

export function getAreaFaqItems(areaName: string) {
  return [
    {
      id: 'cost',
      question: `How much does pest control cost in ${areaName}?`,
      answer: `Pest control in ${areaName} typically starts from ₹800–₹1,000 for a one-time treatment, depending on the pest type and property size. You receive a transparent, all-inclusive quote before any work begins — with no hidden charges.`,
    },
    {
      id: 'best',
      question: `Which is the best pest control service in ${areaName}?`,
      answer: `Pest Control 99 is a trusted, licensed pest control provider serving ${areaName} and the wider Mumbai region. We use CIB&RC-approved, family-safe treatments backed by a written warranty and same-day service.`,
    },
    {
      id: 'same-day',
      question: `Do you offer same-day pest control in ${areaName}?`,
      answer: `Yes. In most parts of ${areaName} we offer same-day pest control when you book before noon, subject to technician availability. Call +91 80807 48282 to confirm a slot.`,
    },
    {
      id: 'safe',
      question: 'Is the treatment safe for children and pets?',
      answer:
        'Yes. We use low-odour, CIB&RC-approved treatments that are safe for children and pets once dry. Our technicians advise on any short re-entry time after each treatment.',
    },
    {
      id: 'frequency',
      question: `How often should I get pest control done in ${areaName}?`,
      answer: `For most homes in ${areaName}, a general pest treatment every 3–6 months keeps cockroaches, ants and mosquitoes under control. Termite and rodent treatments are warranty-backed and scheduled based on inspection.`,
    },
  ];
}
