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

/** Home / quote-simple multi-select — value slugs used for pricing.
 *  Commercial is chosen via Residential/Commercial toggle, not as a pest option. */
export const MULTI_SELECT_PEST_OPTIONS: ServiceOption[] = [
  { value: 'cockroach-ants', label: 'Cockroach / Ants' },
  { value: 'termite', label: 'Termite' },
  { value: 'bedbugs', label: 'Bed Bugs' },
  { value: 'rodent', label: 'Rodent' },
  { value: 'mosquito', label: 'Mosquito' },
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

/** Residential booking / quote premise sizes — 1 RK first, then 1–6 BHK, Other last. */
export const RESIDENTIAL_PREMISE_SIZE_OPTIONS: ServiceOption[] = [
  { value: '1rk', label: '1 RK' },
  { value: '1bhk', label: '1 BHK' },
  { value: '2bhk', label: '2 BHK' },
  { value: '3bhk', label: '3 BHK' },
  { value: '4bhk', label: '4 BHK' },
  { value: '5bhk', label: '5 BHK' },
  { value: '6bhk', label: '6 BHK' },
  { value: 'other', label: 'Other' },
];

/** Home booking pest slug for cockroach / ants (only pest with Standard/Premium + AMC). */
export const COCKROACH_ANTS_PEST = 'cockroach-ants';
/** Home booking pest slug for bed bugs (CRM 2-service package). */
export const BEDBUGS_PEST = 'bedbugs';

/** CRM-aligned customer copy for Bed Bugs (catalog plan_type stays One Time Service). */
export const BED_BUG_PLAN_TITLE = '2-Service Package';
export const BED_BUG_PLAN_SUB = '1 month • 2 services • 15 days apart';

export const AMC_UNAVAILABLE_LABEL = 'Not available for this service';
export const AMC_UNAVAILABLE_BADGE = 'Unavailable';

/** Standard/Premium treatment UI — only when Cockroach / Ants is in the selection. */
export function showTreatmentQualityForPests(pestTypes: string[]): boolean {
  return pestTypes.includes(COCKROACH_ANTS_PEST);
}

/** AMC selectable only when every selected pest is Cockroach / Ants. */
export function amcAvailableForPests(pestTypes: string[]): boolean {
  return pestTypes.length > 0 && pestTypes.every((p) => p === COCKROACH_ANTS_PEST);
}

/**
 * Bed Bugs plan messaging when Bed Bugs is alone or listed first (primary).
 * Catalog still prices as non-AMC / one_time; backend schedules the 2nd visit.
 */
export function isBedBugsPrimaryPlan(pestTypes: string[]): boolean {
  return (
    pestTypes.includes(BEDBUGS_PEST) &&
    (pestTypes.length === 1 || pestTypes[0] === BEDBUGS_PEST)
  );
}

export function oneTimePlanTitle(pestTypes: string[]): string {
  return isBedBugsPrimaryPlan(pestTypes) ? BED_BUG_PLAN_TITLE : 'One-Time';
}

export function oneTimePlanSub(pestTypes: string[]): string {
  return isBedBugsPrimaryPlan(pestTypes) ? BED_BUG_PLAN_SUB : 'Single service';
}

export function bookingPlanLabelForNotes(pestTypes: string[], serviceType: string): string {
  if (serviceType === 'amc') return 'AMC · 3 visits';
  if (isBedBugsPrimaryPlan(pestTypes)) return BED_BUG_PLAN_TITLE;
  return 'One-Time';
}
