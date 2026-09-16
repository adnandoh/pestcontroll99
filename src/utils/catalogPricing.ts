/**
 * Match website home-form selections to GET /api/customer/catalog/ rates
 * (same rules as pest_99_customer_app booking_flow_provider + customer.catalog_match).
 */

export type CatalogRate = {
  id: number;
  service_package: string;
  plan_type: string;
  area_key: string;
  property_category?: string | null;
  /** Master chart / DB selling amount (excl GST when price_includes_gst is false). */
  amount: string;
  /** Always the excl-GST base from rate_gst_payload. Prefer this for website display. */
  base_amount?: string;
  total_with_gst?: string;
  gst_percent?: string;
  price_includes_gst?: boolean;
  /**
   * Backend currently fills these with GST-inclusive customer totals (standard =
   * total_with_gst, premium = total_with_gst × 1.15). Do not use for website
   * display when showing “Price (Excluding GST)”.
   */
  package_tiers?: {
    standard?: string;
    premium?: string;
  };
};

export type CatalogResponse = {
  regions?: Array<{ id: number; slug: string; name: string; is_default?: boolean }>;
  results: CatalogRate[];
};

/** Website pest slug → keywords used against CRM service_package names */
export const PEST_MATCH_KEYS: Record<string, string[]> = {
  'cockroach-ants': ['cockroach', 'ant'],
  mosquito: ['mosquito'],
  termite: ['termite'],
  rodent: ['rodent', 'rat'],
  bedbugs: ['bed bug', 'bedbug', 'bed bugs'],
  'honey-bee': ['bee', 'wasp'],
  'wood-borer': ['wood borer', 'woodborer', 'borer'],
  // Prefer multi-word fly phrases; bare "fly" still used but addons are excluded below.
  'house-fly': ['house fly', 'housefly', 'fly control', 'flies', 'fly'],
  'hotel-commercial': ['general', 'commercial'],
  other: ['general pest', 'general'],
};

/** Preferred CRM package names (ordered) for residential home booking. */
export const PEST_PREFERRED_PACKAGES: Record<
  string,
  { standard: string[]; premium: string[] }
> = {
  'cockroach-ants': {
    standard: ['Cockroach Standard', 'Cockroach / Ants'],
    premium: ['Cockroach Premium', 'Cockroach Standard', 'Cockroach / Ants'],
  },
  rodent: {
    standard: ['Regular Rodent', 'Rodent'],
    premium: ['Kill-Rodent System', 'Regular Rodent', 'Rodent'],
  },
  mosquito: {
    standard: ['Mosquito Cold Fogging', 'Mosquito'],
    premium: ['Mosquito Thermal Fogging', 'Mosquito Cold Fogging', 'Mosquito'],
  },
  termite: {
    standard: ['Termite Spot Treatment', 'Termite'],
    premium: ['Termite Spot Treatment', 'Termite'],
  },
  bedbugs: {
    standard: ['Bed Bugs'],
    premium: ['Bed Bugs'],
  },
};

/** Website pest slug → service_type label sent on booking create */
export const PEST_SERVICE_LABELS: Record<string, string> = {
  'cockroach-ants': 'Cockroach Control, Ant Control',
  mosquito: 'Mosquito Control',
  termite: 'Termite Control',
  rodent: 'Rodent / Rat Control',
  bedbugs: 'Bed Bug Control',
  'honey-bee': 'Honey Bee / Wasp Removal',
  'wood-borer': 'Wood Borer Control',
  'house-fly': 'Fly Control',
  'hotel-commercial': 'General Pest Control',
  other: 'General Pest Control',
};

export const PREMISE_SIZE_TO_AREA: Record<string, string> = {
  '1rk': '1 RK',
  '1bhk': '1 BHK',
  '2bhk': '2 BHK',
  '3bhk': '3 BHK',
  '4bhk': '4 BHK',
  '5bhk': '5 BHK',
  '6bhk': '6 BHK',
  other: 'Other',
};

/** Categories that must never price a residential home booking unless explicitly commercial. */
const NON_HOME_CATEGORIES = new Set([
  'addon',
  'society',
  'hotel',
  'hospital',
  'corporate',
  'commercial',
  'chain',
]);

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Token / word-boundary match. "rat" must not match "integRATed";
 * "fly" must not match inside unrelated words.
 */
export function packageTokenMatches(keys: string[], servicePackage: string): boolean {
  const pkg = servicePackage || '';
  return keys.some((key) => {
    const k = key.trim().toLowerCase();
    if (!k) return false;
    const escaped = escapeRegExp(k).replace(/\s+/g, '\\s+');
    const re = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i');
    return re.test(pkg);
  });
}

export function isHomeExcludedRate(rate: CatalogRate): boolean {
  const cat = (rate.property_category || '').toLowerCase().trim();
  if (NON_HOME_CATEGORIES.has(cat)) return true;

  const pkg = (rate.service_package || '').toLowerCase();
  if (pkg.includes('integrated ipm')) return true;
  if (pkg.includes('fly catcher')) return true;
  if (pkg.includes('add-on') || pkg.includes('addon')) return true;
  if (/\bsociety\b/.test(pkg)) return true;
  if (pkg.includes('servicing') && pkg.includes('fly')) return true;
  return false;
}

function planMatches(rate: CatalogRate, isAmc: boolean): boolean {
  const plan = (rate.plan_type || '').toLowerCase();
  const amc = plan.includes('amc');
  return isAmc ? amc : !amc;
}

export function areaKeyForForm(premiseType: string, premiseSize?: string): string {
  if (premiseType === 'commercial') return 'Commercial';
  if (!premiseSize) return '';
  return PREMISE_SIZE_TO_AREA[premiseSize] || premiseSize;
}

function preferNamedPackages(
  pool: CatalogRate[],
  pestSlug: string,
  treatmentQuality?: 'standard' | 'premium',
): CatalogRate[] {
  const prefs = PEST_PREFERRED_PACKAGES[pestSlug];
  if (!prefs || pool.length === 0) return pool;
  const quality = treatmentQuality === 'premium' ? 'premium' : 'standard';
  const names = prefs[quality] || prefs.standard;
  for (const name of names) {
    const hits = pool.filter(
      (r) => (r.service_package || '').toLowerCase() === name.toLowerCase(),
    );
    if (hits.length > 0) return hits;
  }
  return pool;
}

export function matchRateForPest(
  rates: CatalogRate[],
  pestSlug: string,
  opts: {
    isAmc: boolean;
    premiseType: 'residential' | 'commercial';
    premiseSize?: string;
    treatmentQuality?: 'standard' | 'premium';
  },
): CatalogRate | null {
  const keys = PEST_MATCH_KEYS[pestSlug];
  if (!keys || rates.length === 0) return null;

  const isHome = opts.premiseType !== 'commercial';
  const area = areaKeyForForm(opts.premiseType, opts.premiseSize).toLowerCase();

  let candidates = rates.filter((r) => packageTokenMatches(keys, r.service_package));
  if (candidates.length === 0) return null;

  if (isHome) {
    candidates = candidates.filter((r) => !isHomeExcludedRate(r));
    if (candidates.length === 0) return null;
  }

  const byPlan = candidates.filter((r) => planMatches(r, opts.isAmc));
  let pool = byPlan.length > 0 ? byPlan : candidates;

  // Prefer CRM packages named Standard/Premium when the form picks treatment quality.
  if (opts.treatmentQuality) {
    const quality = opts.treatmentQuality.toLowerCase();
    const qualityHits = pool.filter((r) =>
      (r.service_package || '').toLowerCase().includes(quality),
    );
    if (qualityHits.length > 0) {
      pool = qualityHits;
    } else if (quality === 'standard') {
      const nonPremium = pool.filter(
        (r) => !(r.service_package || '').toLowerCase().includes('premium'),
      );
      if (nonPremium.length > 0) pool = nonPremium;
    }
  }

  pool = preferNamedPackages(pool, pestSlug, opts.treatmentQuality);

  if (area) {
    const exact = pool.filter((r) => (r.area_key || '').toLowerCase() === area);
    if (exact.length > 0) return exact[0];
    const soft = pool.filter((r) => {
      const key = (r.area_key || '').toLowerCase();
      return key.includes(area) || area.includes(key);
    });
    if (soft.length > 0) return soft[0];
    // Explicit size requested but no catalog row — do not price a different BHK/RK.
    if (isHome) return null;
  }

  if (isHome) {
    const residential = pool.filter((r) => {
      const cat = (r.property_category || '').toLowerCase();
      const key = (r.area_key || '').toLowerCase();
      return cat.includes('residential') || key.includes('bhk') || key.includes('rk');
    });
    if (residential.length > 0) return residential[0];
    // No residential BHK/RK row for this pest — do not fall back to a wrong rate.
    return null;
  }

  const commercial = pool.filter((r) => {
    const cat = (r.property_category || '').toLowerCase();
    const key = (r.area_key || '').toLowerCase();
    return cat.includes('commercial') || key === 'commercial';
  });
  if (commercial.length > 0) return commercial[0];

  return pool[0] || null;
}

/**
 * Excl-GST catalog base for display (CRM “Price Excluding GST”).
 * Prefer API `base_amount`; fall back to raw `amount` when the master rate is
 * GST-exclusive, or peel GST when `price_includes_gst` is true.
 * Never use `package_tiers` here — those are GST-inclusive totals.
 */
export function exclGstBaseAmount(rate: CatalogRate | null): number {
  if (!rate) return 0;

  const fromBase = Number.parseFloat(String(rate.base_amount ?? ''));
  if (Number.isFinite(fromBase) && fromBase > 0) return fromBase;

  const raw = Number.parseFloat(String(rate.amount ?? ''));
  if (!Number.isFinite(raw) || raw <= 0) return 0;

  if (rate.price_includes_gst === true) {
    const pct = Number.parseFloat(String(rate.gst_percent ?? '18'));
    const divisor = 1 + (Number.isFinite(pct) && pct > 0 ? pct / 100 : 0.18);
    return Math.round((raw / divisor) * 100) / 100;
  }

  return raw;
}

export function tierAmount(
  rate: CatalogRate | null,
  treatmentQuality: 'standard' | 'premium' = 'standard',
): number {
  if (!rate) return 0;
  const base = exclGstBaseAmount(rate);
  if (base <= 0) return 0;
  // Booking-tier uplift (+15%) on the excl-GST base when quality is premium
  // and the matched package is not already a named Premium/Standard row.
  if (treatmentQuality === 'premium') {
    return Math.round(base * 1.15 * 100) / 100;
  }
  return base;
}

/**
 * When the matched CRM package already encodes Standard/Premium in its name,
 * use the rate's excl-GST base and keep package_tier=standard so the API does
 * not apply an extra +15%. Otherwise apply the booking-tier uplift on the base.
 * JobCard billing still uses pricing_rate_id → server total_with_gst.
 */
export function resolveTierForMatchedRate(
  rate: CatalogRate | null,
  treatmentQuality: 'standard' | 'premium' = 'standard',
): { amount: number; packageTier: 'standard' | 'premium' } {
  if (!rate) return { amount: 0, packageTier: treatmentQuality };
  const pkg = (rate.service_package || '').toLowerCase();
  const namedPremium = pkg.includes('premium');
  const namedStandard = pkg.includes('standard');
  if (namedPremium || namedStandard) {
    return { amount: tierAmount(rate, 'standard'), packageTier: 'standard' };
  }
  return {
    amount: tierAmount(rate, treatmentQuality),
    packageTier: treatmentQuality,
  };
}

/**
 * Display-only list markup when the rate card has no separate MRP.
 * Matches the HTML prototype + HomeInquiryForm (~30% OFF badge):
 * sale = catalog excl-GST (booked amount); list = sale / 0.7.
 * Never change offerPrice / pricing_rate_id — JobCard still uses catalog amount.
 */
export const QUOTE_DISPLAY_DISCOUNT = 0.3;

/** Strikethrough list from payable excl-GST sale; 0 when sale is unset. */
export function displayListFromOffer(offerPrice: number): number {
  if (!offerPrice || offerPrice <= 0) return 0;
  const list = Math.round(offerPrice / (1 - QUOTE_DISPLAY_DISCOUNT));
  return list > offerPrice ? list : 0;
}

export type QuotePriceResult = {
  /** Display-only strikethrough MRP (sale / 0.7); 0 when no priced match. */
  listPrice: number;
  /** Payable excl-GST catalog amount (what booking saves as estimatedPrice). */
  offerPrice: number;
  /** Rounded % OFF from list→offer when both set; else 0. */
  discountPercent: number;
  pricingRateId: number | null;
  pricePending: boolean;
  matchedRate: CatalogRate | null;
  serviceTypeLabel: string;
  packageTier: 'standard' | 'premium';
};

export function calculateCatalogQuotePrice(input: {
  rates: CatalogRate[];
  pestTypes: string[];
  premiseType?: 'residential' | 'commercial' | '';
  premiseSize?: string;
  serviceType?: 'amc' | 'one-time' | '';
  treatmentQuality?: 'standard' | 'premium' | '';
}): QuotePriceResult {
  const { rates, pestTypes, premiseType, premiseSize, serviceType, treatmentQuality } =
    input;

  const pending = (
    packageTier: 'standard' | 'premium' = 'standard',
  ): QuotePriceResult => ({
    listPrice: 0,
    offerPrice: 0,
    discountPercent: 0,
    pricingRateId: null,
    pricePending: true,
    matchedRate: null,
    serviceTypeLabel: pestTypes.map((p) => PEST_SERVICE_LABELS[p] || p).join(', '),
    packageTier,
  });

  if (!premiseType || pestTypes.length === 0) {
    return pending();
  }

  const isInspection =
    premiseType === 'commercial' || pestTypes.includes('hotel-commercial');

  if (isInspection) {
    return pending();
  }

  // Residential quote needs size + plan. Treatment quality defaults to standard
  // when the form hides Standard/Premium (non-cockroach pests).
  if (!premiseSize || !serviceType) {
    return pending(treatmentQuality === 'premium' ? 'premium' : 'standard');
  }

  const quality: 'standard' | 'premium' =
    treatmentQuality === 'premium' ? 'premium' : 'standard';
  const isAmc = serviceType === 'amc';
  let total = 0;
  let anyMissing = false;
  let firstRate: CatalogRate | null = null;
  let packageTier: 'standard' | 'premium' = quality;

  for (const pest of pestTypes) {
    const rate = matchRateForPest(rates, pest, {
      isAmc,
      premiseType,
      premiseSize,
      treatmentQuality: quality,
    });
    const resolved = resolveTierForMatchedRate(rate, quality);
    if (!rate || resolved.amount <= 0) {
      anyMissing = true;
      continue;
    }
    if (!firstRate) {
      firstRate = rate;
      packageTier = resolved.packageTier;
    }
    total += resolved.amount;
  }

  const pricePending = anyMissing || total <= 0 || !firstRate;
  const offerPrice = pricePending ? 0 : Math.round(total);
  const listPrice = displayListFromOffer(offerPrice);
  const discountPercent =
    listPrice > offerPrice && offerPrice > 0
      ? Math.round(((listPrice - offerPrice) / listPrice) * 100)
      : 0;
  return {
    listPrice,
    offerPrice,
    discountPercent,
    pricingRateId: pricePending ? null : firstRate!.id,
    pricePending,
    matchedRate: firstRate,
    serviceTypeLabel: pestTypes.map((p) => PEST_SERVICE_LABELS[p] || p).join(', '),
    packageTier: pricePending ? quality : packageTier,
  };
}
