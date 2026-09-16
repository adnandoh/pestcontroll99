/**
 * Unit tests for home catalog pricing matchers.
 * Run: npx --yes tsx --test src/utils/catalogPricing.test.ts
 */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  areaKeyForForm,
  calculateCatalogQuotePrice,
  isHomeExcludedRate,
  matchRateForPest,
  packageTokenMatches,
  PREMISE_SIZE_TO_AREA,
  type CatalogRate,
} from './catalogPricing.ts';
import { RESIDENTIAL_PREMISE_SIZE_OPTIONS } from '../config/serviceOptions.ts';

function rate(partial: Partial<CatalogRate> & Pick<CatalogRate, 'id' | 'service_package'>): CatalogRate {
  return {
    plan_type: 'One Time Service',
    area_key: '1 BHK',
    property_category: 'residential',
    amount: '1000',
    base_amount: '1000',
    price_includes_gst: false,
    gst_percent: '18.00',
    total_with_gst: '1180',
    // Intentionally GST-inclusive — display must ignore these.
    package_tiers: { standard: '1180', premium: '1357' },
    ...partial,
  };
}

const fixtureRates: CatalogRate[] = [
  rate({
    id: 1,
    service_package: 'Integrated IPM',
    area_key: 'Large Hospital - 76-150 beds / 30,001-75,000 sq.ft.',
    property_category: 'hospital',
    amount: '24000',
    base_amount: '24000',
    total_with_gst: '28320',
    package_tiers: { standard: '28320', premium: '32568' },
  }),
  rate({
    id: 2,
    service_package: 'Fly catcher servicing',
    plan_type: 'Add-On',
    area_key: 'Per unit/month',
    property_category: 'addon',
    amount: '750',
    base_amount: '750',
    total_with_gst: '885',
    package_tiers: { standard: '885', premium: '1017.75' },
  }),
  rate({
    id: 3,
    service_package: 'General Pest Control',
    area_key: 'Large',
    property_category: 'society',
    amount: '11500',
    base_amount: '11500',
    total_with_gst: '13570',
    package_tiers: { standard: '13570', premium: '15605.5' },
  }),
  rate({
    id: 4,
    service_package: 'Regular Rodent',
    area_key: '1 BHK',
    amount: '1300',
    base_amount: '1300',
    total_with_gst: '1534',
    package_tiers: { standard: '1534', premium: '1764.1' },
  }),
  rate({
    id: 5,
    service_package: 'Cockroach Standard',
    area_key: '1 BHK',
    amount: '1250',
    base_amount: '1250',
    total_with_gst: '1475',
    package_tiers: { standard: '1475', premium: '1696.25' },
  }),
  rate({
    id: 6,
    service_package: 'Kill-Rodent System',
    area_key: '1 BHK',
    amount: '1650',
    base_amount: '1650',
    total_with_gst: '1947',
    package_tiers: { standard: '1947', premium: '2239.05' },
  }),
  rate({
    id: 7,
    service_package: 'Cockroach Premium',
    plan_type: 'AMC 3 Services',
    area_key: '1 BHK',
    amount: '3300',
    base_amount: '3300',
    total_with_gst: '3894',
    package_tiers: { standard: '3894', premium: '4478.1' },
  }),
];

describe('packageTokenMatches', () => {
  it('does not match rat inside integrated', () => {
    assert.equal(packageTokenMatches(['rat'], 'Integrated IPM'), false);
    assert.equal(packageTokenMatches(['rodent', 'rat'], 'Regular Rodent'), true);
  });
});

describe('matchRateForPest home guards', () => {
  it('rodent standard OT 1 BHK → Regular Rodent, not Integrated IPM', () => {
    const matched = matchRateForPest(fixtureRates, 'rodent', {
      isAmc: false,
      premiseType: 'residential',
      premiseSize: '1bhk',
      treatmentQuality: 'standard',
    });
    assert.equal(matched?.id, 4);
    assert.equal(matched?.service_package, 'Regular Rodent');
  });

  it('house fly does not match fly catcher addon → null / pending', () => {
    assert.equal(isHomeExcludedRate(fixtureRates[1]), true);
    const matched = matchRateForPest(fixtureRates, 'house-fly', {
      isAmc: false,
      premiseType: 'residential',
      premiseSize: '1bhk',
      treatmentQuality: 'standard',
    });
    assert.equal(matched, null);
    const quote = calculateCatalogQuotePrice({
      rates: fixtureRates,
      pestTypes: ['house-fly'],
      premiseType: 'residential',
      premiseSize: '1bhk',
      serviceType: 'one-time',
      treatmentQuality: 'standard',
    });
    assert.equal(quote.pricePending, true);
    assert.equal(quote.offerPrice, 0);
    assert.equal(quote.pricingRateId, null);
  });

  it('other/general does not match society General Pest → pending', () => {
    const matched = matchRateForPest(fixtureRates, 'other', {
      isAmc: false,
      premiseType: 'residential',
      premiseSize: '2bhk',
      treatmentQuality: 'premium',
    });
    assert.equal(matched, null);
    const quote = calculateCatalogQuotePrice({
      rates: fixtureRates,
      pestTypes: ['other'],
      premiseType: 'residential',
      premiseSize: '2bhk',
      serviceType: 'one-time',
      treatmentQuality: 'premium',
    });
    assert.equal(quote.pricePending, true);
    assert.equal(quote.offerPrice, 0);
  });

  it('cockroach standard OT 1 BHK shows excl-GST amount (not package_tiers GST total)', () => {
    const matched = matchRateForPest(fixtureRates, 'cockroach-ants', {
      isAmc: false,
      premiseType: 'residential',
      premiseSize: '1bhk',
      treatmentQuality: 'standard',
    });
    assert.equal(matched?.id, 5);
    const quote = calculateCatalogQuotePrice({
      rates: fixtureRates,
      pestTypes: ['cockroach-ants'],
      premiseType: 'residential',
      premiseSize: '1bhk',
      serviceType: 'one-time',
      treatmentQuality: 'standard',
    });
    assert.equal(quote.pricePending, false);
    assert.equal(quote.offerPrice, 1250);
    assert.equal(quote.listPrice, Math.round(1250 / 0.7));
    assert.equal(quote.discountPercent, 30);
    assert.equal(quote.pricingRateId, 5);
  });

  it('cockroach premium AMC 1 BHK shows excl-GST ₹3300 (not ₹3894)', () => {
    const matched = matchRateForPest(fixtureRates, 'cockroach-ants', {
      isAmc: true,
      premiseType: 'residential',
      premiseSize: '1bhk',
      treatmentQuality: 'premium',
    });
    assert.equal(matched?.id, 7);
    assert.equal(matched?.service_package, 'Cockroach Premium');
    const quote = calculateCatalogQuotePrice({
      rates: fixtureRates,
      pestTypes: ['cockroach-ants'],
      premiseType: 'residential',
      premiseSize: '1bhk',
      serviceType: 'amc',
      treatmentQuality: 'premium',
    });
    assert.equal(quote.pricePending, false);
    assert.equal(quote.offerPrice, 3300);
    assert.equal(quote.listPrice, Math.round(3300 / 0.7));
    assert.equal(quote.discountPercent, 30);
    assert.equal(quote.packageTier, 'standard'); // named Premium → no extra +15%
    assert.equal(quote.pricingRateId, 7);
  });

  it('residential premise options are 1 RK → 1–6 BHK → Other', () => {
    assert.deepEqual(
      RESIDENTIAL_PREMISE_SIZE_OPTIONS.map((o) => o.value),
      ['1rk', '1bhk', '2bhk', '3bhk', '4bhk', '5bhk', '6bhk', 'other'],
    );
    assert.equal(PREMISE_SIZE_TO_AREA['6bhk'], '6 BHK');
    assert.equal(PREMISE_SIZE_TO_AREA.other, 'Other');
    assert.equal(areaKeyForForm('residential', '6bhk'), '6 BHK');
    assert.equal(areaKeyForForm('residential', 'other'), 'Other');
  });

  it('premise size Other stays price-pending (custom quote)', () => {
    const quote = calculateCatalogQuotePrice({
      rates: fixtureRates,
      pestTypes: ['cockroach-ants'],
      premiseType: 'residential',
      premiseSize: 'other',
      serviceType: 'one-time',
      treatmentQuality: 'standard',
    });
    assert.equal(quote.pricePending, true);
    assert.equal(quote.offerPrice, 0);
    assert.equal(quote.pricingRateId, null);
  });

  it('6 BHK without catalog row stays price-pending', () => {
    const quote = calculateCatalogQuotePrice({
      rates: fixtureRates,
      pestTypes: ['cockroach-ants'],
      premiseType: 'residential',
      premiseSize: '6bhk',
      serviceType: 'one-time',
      treatmentQuality: 'standard',
    });
    assert.equal(quote.pricePending, true);
    assert.equal(quote.offerPrice, 0);
  });
});
