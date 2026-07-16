import { BUSINESS } from '@/config/business';

export const ECARD_URL = `${BUSINESS.website}/e-card/`;

export const ECARD_SOCIAL = {
  facebook: 'https://www.facebook.com/pestcontrol99IN',
  instagram: 'https://www.instagram.com/pestcontrol_99/',
  youtube: 'https://www.youtube.com/@pestcontrol99',
} as const;

export const ECARD_ABOUT =
  'PestControl99.com is a Government Licensed Professional Pest Management Company providing safe, effective, and reliable pest control solutions for residential and commercial properties. Our trained technicians specialize in Cockroach, Termite, Bed Bug, Rodent, Mosquito, and General Pest Control using modern treatment methods and quality products. We proudly serve Mumbai, Navi Mumbai, Thane, Lonavala, and Pune with one-time and AMC services.';

export type ECardService = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const ECARD_SERVICES: ECardService[] = [
  {
    id: 'cockroach',
    name: 'Cockroach & General Pest Control',
    price: 'Starting From ₹1,000',
    description:
      'Safe & effective treatment for Cockroaches, Ants, Spiders, Silverfish & House Lizards. Free inspection available.',
    image: '/images/Cockroach.webp',
    imageAlt: 'Cockroach close-up for Pest Control 99 cockroach treatment',
  },
  {
    id: 'termite',
    name: 'Termite Treatment',
    price: 'Starting From ₹2,000',
    description:
      'Protect your property from termite damage with safe, effective and long-lasting anti-termite treatment.',
    image: '/images/Termite.webp',
    imageAlt: 'Termite close-up for Pest Control 99 anti-termite treatment',
  },
  {
    id: 'bed-bugs',
    name: 'Bed Bugs Treatment',
    price: 'Starting From ₹2,000',
    description:
      'Safe and effective bed bug treatment with professional inspection and 2-visit service.',
    image: '/images/BedBug.webp',
    imageAlt: 'Bed bug close-up for Pest Control 99 bed bug treatment',
  },
  {
    id: 'mosquito',
    name: 'Mosquito Control',
    price: 'Starting From ₹800',
    description:
      'Advanced mosquito control with spray and fogging solutions for homes, societies, hotels and commercial premises.',
    image: '/images/Mosquito.webp',
    imageAlt: 'Mosquito close-up for Pest Control 99 mosquito control',
  },
  {
    id: 'rodent',
    name: 'Rodent Control',
    price: 'Starting From ₹1,000',
    description:
      'Safe and effective rat & mouse control with professional inspection and treatment.',
    image: '/images/Rat.webp',
    imageAlt: 'Rat close-up for Pest Control 99 rodent control',
  },
];

export type ECardRateRow = {
  property: string;
  oneTime?: string;
  amc?: string;
  price?: string;
};

export type ECardRateSection = {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  icon: string;
  iconBg: string;
  columns: { key: 'oneTime' | 'amc' | 'price'; label: string }[];
  rows: ECardRateRow[];
};

function rs(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/** Residential rate card — matches PestControl99_Rate_Card PDF */
export const ECARD_RATE_SECTIONS: ECardRateSection[] = [
  {
    id: 'general-pest',
    title: 'Cockroach & General Pest Control',
    subtitle: 'Covers Cockroach, Ants, Spider, Silverfish & House Lizard',
    icon: '/images/Cockroach.webp',
    iconBg: 'bg-[#1E7E34]',
    columns: [
      { key: 'oneTime', label: 'One Time' },
      { key: 'amc', label: 'AMC (3 Visits)' },
    ],
    rows: [
      { property: '1 RK', oneTime: rs(1000), amc: rs(1800) },
      { property: '1 BHK', oneTime: rs(1200), amc: rs(2200) },
      { property: '2 BHK', oneTime: rs(1500), amc: rs(2500) },
      { property: '3 BHK', oneTime: rs(1800), amc: rs(3000) },
      { property: '4 BHK', oneTime: rs(2000), amc: rs(3500) },
    ],
  },
  {
    id: 'bed-bugs',
    title: 'Bed Bugs Treatment',
    badge: '2 Visits Included',
    icon: '/images/BedBug.webp',
    iconBg: 'bg-[#E11D48]',
    columns: [{ key: 'price', label: 'Price' }],
    rows: [
      { property: '1 RK', price: rs(2000) },
      { property: '1 BHK', price: rs(2500) },
      { property: '2 BHK', price: rs(3000) },
      { property: '3 BHK', price: rs(3500) },
      { property: '4 BHK', price: rs(4000) },
    ],
  },
  {
    id: 'termite',
    title: 'Termite Treatment',
    badge: '2 Years Warranty',
    icon: '/images/Termite.webp',
    iconBg: 'bg-[#1B2A6B]',
    columns: [{ key: 'price', label: 'Price' }],
    rows: [
      { property: '1 RK', price: rs(2000) },
      { property: '1 BHK', price: rs(2500) },
      { property: '2 BHK', price: rs(3000) },
      { property: '3 BHK', price: rs(3500) },
      { property: '4 BHK', price: rs(4000) },
    ],
  },
];

export const ECARD_OTHER_SERVICES = [
  'Rodent Control',
  'Mosquito Control',
  'Society Pest Control',
  'Hotel & Restaurant',
  'Office',
  'Warehouse & Factory',
] as const;

export const ECARD_GALLERY = [
  {
    src: '/images/ecard/gallery-monsoon-kitchen.webp',
    alt: 'Pest Control 99 monsoon pest protection creative — kitchen safety',
  },
  {
    src: '/images/ecard/gallery-mosquito-bedroom.webp',
    alt: 'Pest Control 99 mosquito control creative — sleep peacefully wake up bite-free',
  },
  {
    src: '/images/ecard/gallery-protect-home.webp',
    alt: 'Pest Control 99 protect your home this monsoon creative',
  },
  {
    src: '/images/ecard/gallery-monsoon-pests.webp',
    alt: 'Pest Control 99 service categories — mosquitoes, cockroaches, termites, rodents',
  },
] as const;

/** Build a downloadable vCard (.vcf) for Save Contact */
export function buildECardVcf(): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${BUSINESS.brandName}`,
    `ORG:${BUSINESS.legalName}`,
    'TITLE:Government Licensed Professional Pest Management Company',
    `TEL;TYPE=CELL,VOICE,PREF:${BUSINESS.phoneTel}`,
    `EMAIL;TYPE=INTERNET,PREF:${BUSINESS.email}`,
    `URL:${BUSINESS.website}`,
    `ADR;TYPE=WORK:;;${BUSINESS.address.line1};${BUSINESS.address.city};${BUSINESS.address.state};${BUSINESS.address.postalCode};${BUSINESS.address.country}`,
    `NOTE:24x7 pest control — Mumbai, Navi Mumbai, Thane, Lonavala, Pune. Digital card: ${ECARD_URL}`,
    'END:VCARD',
  ];
  return lines.join('\r\n');
}
