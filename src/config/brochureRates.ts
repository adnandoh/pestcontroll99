export type BrochureRegion = 'mumbai' | 'lonavala';

export type RateColumn = {
  key: string;
  label: string;
  align?: 'left' | 'right';
};

export type RateRow = Record<string, string | number>;

export type BrochureRateSection = {
  id: string;
  title: string;
  subtitle?: string;
  warranty?: string;
  /** Circular pest illustration shown at the top of the rate card */
  icon?: string;
  /** One-line "why this matters" hook under the card title */
  tagline?: string;
  columns: RateColumn[];
  rows: RateRow[];
  note?: string;
};

export const BROCHURE_HIGHLIGHTS = [
  { title: '365-Day Warranty', desc: 'Written warranty on eligible general pest treatments.' },
  { title: 'Same-Day Service', desc: 'Book before noon for same-day slots in most areas.' },
  { title: 'Herbal & Safe', desc: 'CIB&RC-approved, child- and pet-safe when applied as directed.' },
  { title: 'No Hidden Charges', desc: 'Transparent, all-inclusive quotes before work begins.' },
  { title: 'Licensed Technicians', desc: 'Trained, uniformed experts with digital service reports.' },
  { title: '24/7 Emergency', desc: 'Urgent pest problems — call or WhatsApp anytime.' },
] as const;

export const BROCHURE_SERVICES = [
  'General Pest Control (Cockroach & Ants)',
  'Bed Bug Treatment',
  'Termite Treatment',
  'Mosquito Spray & Fogging',
  'Rodent & Reptile Management',
  'Honey Bee Hive Removal',
  'Wood Borer Control',
  'Commercial & Society AMC',
] as const;

function inr(amount: number): string {
  return amount > 0 ? `₹${amount.toLocaleString('en-IN')}` : 'On inspection';
}

/** Pest illustration + hook line per service category */
const SECTION_META: Record<string, { icon: string; tagline: string }> = {
  'general-pest': {
    icon: '/images/Cockroach.webp',
    tagline: 'Cockroaches contaminate kitchens and spread bacteria year-round',
  },
  'bed-bugs': {
    icon: '/images/BedBug.webp',
    tagline: 'Bed bugs multiply fast — professional treatment targets every life stage',
  },
  termite: {
    icon: '/images/Termite.webp',
    tagline: 'Termites silently destroy furniture and woodwork before you spot them',
  },
  mosquito: {
    icon: '/images/Mosquito.webp',
    tagline: 'Cut dengue, malaria & chikungunya risk at the breeding source',
  },
  rodent: {
    icon: '/images/Rat.webp',
    tagline: 'Rats damage wiring, stock and food supplies while spreading disease',
  },
};

export function getSectionMeta(sectionId: string): { icon: string; tagline: string } | undefined {
  if (sectionId.startsWith('general-pest')) return SECTION_META['general-pest'];
  if (sectionId.startsWith('mosquito')) return SECTION_META.mosquito;
  return SECTION_META[sectionId];
}

export const MUMBAI_RATE_SECTIONS: BrochureRateSection[] = [
  {
    id: 'general-pest',
    title: 'General Pest Control',
    subtitle: 'Cockroach & Ant treatment',
    warranty: '30-day service warranty',
    columns: [
      { key: 'property', label: 'Property' },
      { key: 'oneTime', label: 'One Time', align: 'right' },
      { key: 'amc', label: 'AMC (3 Services)', align: 'right' },
    ],
    rows: [
      { property: '1 RK', oneTime: inr(1000), amc: inr(1800) },
      { property: '1 BHK', oneTime: inr(1200), amc: inr(2200) },
      { property: '2 BHK', oneTime: inr(1500), amc: inr(2500) },
      { property: '3 BHK', oneTime: inr(1800), amc: inr(3000) },
      { property: '4 BHK', oneTime: inr(2000), amc: inr(3500) },
      { property: 'Commercial', oneTime: 'On inspection', amc: 'On inspection' },
    ],
  },
  {
    id: 'bed-bugs',
    title: 'Bed Bug Treatment',
    warranty: '2-service treatment plan',
    columns: [
      { key: 'property', label: 'Property' },
      { key: 'rate', label: 'Rate', align: 'right' },
    ],
    rows: [
      { property: '1 RK', rate: inr(2000) },
      { property: '1 BHK', rate: inr(2500) },
      { property: '2 BHK', rate: inr(3000) },
      { property: '3 BHK', rate: inr(3500) },
      { property: '4 BHK', rate: inr(4000) },
    ],
  },
  {
    id: 'termite',
    title: 'Termite Treatment',
    warranty: 'Up to 2-year warranty on eligible plans',
    columns: [
      { key: 'property', label: 'Property' },
      { key: 'rate', label: 'Rate', align: 'right' },
    ],
    rows: [
      { property: '1 RK', rate: inr(2000) },
      { property: '1 BHK', rate: inr(2500) },
      { property: '2 BHK', rate: inr(3000) },
      { property: '3 BHK', rate: inr(3500) },
      { property: '4 BHK', rate: inr(4000) },
    ],
  },
  {
    id: 'mosquito',
    title: 'Mosquito Control',
    warranty: '30-day service warranty',
    columns: [
      { key: 'property', label: 'Property' },
      { key: 'rate', label: 'Rate', align: 'right' },
    ],
    rows: [
      { property: '1 RK', rate: inr(800) },
      { property: '1 BHK', rate: inr(1000) },
      { property: '2 BHK', rate: inr(1500) },
      { property: '3 BHK', rate: inr(1800) },
      { property: '4 BHK', rate: inr(2000) },
    ],
  },
  {
    id: 'rodent',
    title: 'Rodent Control',
    columns: [
      { key: 'property', label: 'Area / Type' },
      { key: 'rate', label: 'Rate', align: 'right' },
    ],
    rows: [
      { property: 'Windows / entry treatment', rate: inr(1000) },
      { property: 'Society / commercial', rate: 'On inspection' },
    ],
    note: 'Larger properties quoted after site inspection.',
  },
];

export const LONAVALA_RATE_SECTIONS: BrochureRateSection[] = [
  {
    id: 'general-pest-res',
    title: 'General Pest Control — Residential',
    subtitle: 'Cockroach & Ant treatment',
    warranty: '30-day warranty',
    columns: [
      { key: 'property', label: 'Property' },
      { key: 'oneTime', label: 'One Time', align: 'right' },
      { key: 'amc', label: 'AMC (3 Services)', align: 'right' },
    ],
    rows: [
      { property: '1 RK', oneTime: inr(1000), amc: inr(2500) },
      { property: '1 BHK', oneTime: inr(1200), amc: inr(3000) },
      { property: '2 BHK', oneTime: inr(1500), amc: inr(4000) },
      { property: '3 BHK', oneTime: inr(1800), amc: inr(5000) },
      { property: '4 BHK', oneTime: inr(2200), amc: inr(6000) },
      { property: '5 BHK', oneTime: inr(2500), amc: inr(7000) },
      { property: '6 BHK', oneTime: inr(3000), amc: inr(8000) },
      { property: '7 BHK', oneTime: inr(3300), amc: inr(9000) },
      { property: '8 BHK', oneTime: inr(3600), amc: inr(10000) },
      { property: '9 BHK', oneTime: inr(3900), amc: inr(11000) },
      { property: '10 BHK', oneTime: inr(4200), amc: inr(12000) },
    ],
  },
  {
    id: 'general-pest-villa',
    title: 'General Pest Control — Villa / Bungalow / Farm House',
    warranty: '30-day warranty',
    columns: [
      { key: 'property', label: 'Area Size' },
      { key: 'oneTime', label: 'One Time', align: 'right' },
      { key: 'amc', label: 'AMC (3 Services)', align: 'right' },
    ],
    rows: [
      { property: 'Up to 1,000 Sq.Ft.', oneTime: inr(2000), amc: inr(5000) },
      { property: '1,001–2,000 Sq.Ft.', oneTime: inr(3500), amc: inr(7000) },
      { property: '2,001–4,000 Sq.Ft.', oneTime: inr(5500), amc: inr(10000) },
      { property: '4,001–6,000 Sq.Ft.', oneTime: inr(7500), amc: inr(15000) },
      { property: '6,001–10,000 Sq.Ft.', oneTime: inr(10000), amc: inr(20000) },
    ],
  },
  {
    id: 'bed-bugs',
    title: 'Bed Bug Treatment',
    warranty: '2 services included',
    columns: [
      { key: 'property', label: 'Property' },
      { key: 'rate', label: 'Rate', align: 'right' },
    ],
    rows: [
      { property: '1 BHK', rate: inr(3000) },
      { property: '2 BHK', rate: inr(4000) },
      { property: '3 BHK', rate: inr(5000) },
      { property: '4 BHK', rate: inr(6000) },
      { property: '5 BHK', rate: inr(7000) },
    ],
  },
  {
    id: 'termite',
    title: 'Termite Treatment',
    warranty: '1-year warranty',
    columns: [
      { key: 'property', label: 'Property' },
      { key: 'rate', label: 'Rate', align: 'right' },
    ],
    rows: [
      { property: '1 BHK', rate: inr(3500) },
      { property: '2 BHK', rate: inr(4500) },
      { property: '3 BHK', rate: inr(5500) },
      { property: '4 BHK', rate: inr(6500) },
      { property: '5 BHK', rate: inr(7500) },
    ],
  },
  {
    id: 'mosquito-spray',
    title: 'Mosquito Spray Service',
    warranty: '30-day warranty',
    columns: [
      { key: 'property', label: 'Property' },
      { key: 'rate', label: 'Rate', align: 'right' },
    ],
    rows: [
      { property: '1 RK', rate: inr(1000) },
      { property: '1 BHK', rate: inr(1200) },
      { property: '2 BHK', rate: inr(1500) },
      { property: '3 BHK', rate: inr(2000) },
      { property: '4 BHK', rate: inr(2500) },
      { property: '5 BHK', rate: inr(3000) },
    ],
  },
  {
    id: 'mosquito-fogging',
    title: 'Mosquito Fogging Service',
    columns: [
      { key: 'property', label: 'Area Size' },
      { key: 'rate', label: 'Rate', align: 'right' },
    ],
    rows: [
      { property: 'Up to 1,000 Sq.Ft.', rate: inr(1000) },
      { property: '1,001–2,000 Sq.Ft.', rate: inr(1500) },
      { property: '2,001–5,000 Sq.Ft.', rate: inr(2500) },
      { property: '5,001–10,000 Sq.Ft.', rate: inr(4000) },
    ],
  },
  {
    id: 'rodent',
    title: 'Rodent & Reptile Management',
    subtitle: 'One-time service',
    columns: [
      { key: 'property', label: 'Area Size' },
      { key: 'rate', label: 'Rate', align: 'right' },
    ],
    rows: [
      { property: 'Up to 1,000 Sq.Ft.', rate: inr(1000) },
      { property: '1,001–2,000 Sq.Ft.', rate: inr(1500) },
      { property: '2,001–4,000 Sq.Ft.', rate: inr(2500) },
      { property: '4,001–6,000 Sq.Ft.', rate: inr(4000) },
      { property: '6,001–10,000 Sq.Ft.', rate: inr(6000) },
      { property: '10,001–15,000 Sq.Ft.', rate: inr(9000) },
      { property: '15,001–20,000 Sq.Ft.', rate: inr(12000) },
    ],
  },
];

export const BROCHURE_REGIONS: { id: BrochureRegion; label: string; description: string }[] = [
  {
    id: 'mumbai',
    label: 'Mumbai MMR',
    description: 'Mumbai, Thane & Navi Mumbai residential rates',
  },
  {
    id: 'lonavala',
    label: 'Lonavala',
    description: 'Villa, bungalow, resort & farm house rates',
  },
];

export function getBrochureSections(region: BrochureRegion): BrochureRateSection[] {
  return region === 'lonavala' ? LONAVALA_RATE_SECTIONS : MUMBAI_RATE_SECTIONS;
}
