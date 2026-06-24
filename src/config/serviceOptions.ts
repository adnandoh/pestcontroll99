export type ServiceOption = {
  value: string;
  label: string;
};

/** Pest-specific services — matches site service pages & CRM labels */
export const PEST_SERVICE_OPTIONS: ServiceOption[] = [
  { value: 'Cockroach / Ants Control', label: 'Cockroach / Ants Control' },
  { value: 'Mosquito Control', label: 'Mosquito Control' },
  { value: 'Termite Control', label: 'Termite Control' },
  { value: 'Rodent Control', label: 'Rodent Control' },
  { value: 'Bed Bug Control', label: 'Bed Bug Control' },
  { value: 'Honey Bee Removal', label: 'Honey Bee Removal' },
  { value: 'Wood Borer Control', label: 'Wood Borer Control' },
  { value: 'House Fly Control', label: 'House Fly Control' },
  { value: 'General Pest Control', label: 'General Pest Control' },
];

/** Contact form — all pests + property types + emergency */
export const CONTACT_SERVICE_OPTIONS: ServiceOption[] = [
  ...PEST_SERVICE_OPTIONS,
  { value: 'Residential Pest Control', label: 'Residential Pest Control' },
  { value: 'Commercial Pest Control', label: 'Commercial Pest Control' },
  { value: 'Emergency Service', label: 'Emergency Service' },
  { value: 'Other', label: 'Other' },
];

/** Quote page single-select (CRM-compatible labels) */
export const QUOTE_FORM_SERVICE_OPTIONS: ServiceOption[] = [
  ...PEST_SERVICE_OPTIONS,
  { value: 'Other', label: 'Other' },
];

/** Feedback page */
export const FEEDBACK_SERVICE_OPTIONS: ServiceOption[] = PEST_SERVICE_OPTIONS;

/** Home / quote-simple multi-select — value slugs used for pricing */
export const MULTI_SELECT_PEST_OPTIONS: ServiceOption[] = [
  { value: 'cockroach-ants', label: 'Cockroach / Ants' },
  { value: 'mosquito', label: 'Mosquito' },
  { value: 'termite', label: 'Termite' },
  { value: 'rodent', label: 'Rodent' },
  { value: 'bedbugs', label: 'Bed Bugs' },
  { value: 'honey-bee', label: 'Honey Bee' },
  { value: 'wood-borer', label: 'Wood Borer' },
  { value: 'house-fly', label: 'House Flies' },
  { value: 'hotel-commercial', label: 'Hotel / Commercial' },
  { value: 'other', label: 'Other' },
];

/** Services that only support one-time treatment (no AMC) in QuoteForm */
export const ONE_TIME_ONLY_QUOTE_SERVICES = [
  'Mosquito Control',
  'Termite Control',
  'Bed Bug Control',
  'Rodent Control',
  'Honey Bee Removal',
  'Wood Borer Control',
  'House Fly Control',
  'Other',
] as const;
