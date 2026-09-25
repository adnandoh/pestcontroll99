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
import {
  RESIDENTIAL_PREMISE_SIZE_OPTIONS,
  BED_BUG_PLAN_TITLE,
  amcAvailableForPests,
  isBedBugsPrimaryPlan,
  oneTimePlanSub,
  oneTimePlanTitle,
  showTreatmentQualityForPests,
} from '../config/serviceOptions.ts';

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
  rate({
    id: 8,
    service_package: 'Bed Bugs',
    plan_type: 'One Time Service',
    area_key: '2 BHK',
    amount: '3400',
    base_amount: '3400',
    total_with_gst: '4012',
    package_tiers: { standard: '4012', premium: '4613.8' },
  }),
  rate({
    id: 9,
    service_package: 'Cockroach Premium',
    plan_type: 'AMC 3 Services',
    area_key: '2 BHK',
    amount: '6000',
    base_amount: '6000',
    total_with_gst: '7080',
    package_tiers: { standard: '7080', premium: '8142' },
  }),
  rate({
    id: 10,
    service_package: 'Cockroach Standard',
    plan_type: 'One Time Service',
    area_key: '3 BHK',
    amount: '1900',
    base_amount: '1900',
    total_with_gst: '2242',
    package_tiers: { standard: '2242', premium: '2578.3' },
  }),
  rate({
    id: 11,
    service_package: 'Cockroach Standard',
    plan_type: 'One Time Service',
    area_key: 'Commercial',
    property_category: 'commercial',
    amount: '5000',
    base_amount: '5000',
    total_with_gst: '5900',
    package_tiers: { standard: '5900', premium: '6785' },
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

  it('cockroach quote service_type uses Cockroach Standard (not retired Control labels)', () => {
    const quote = calculateCatalogQuotePrice({
      rates: fixtureRates,
      pestTypes: ['cockroach-ants'],
      premiseType: 'residential',
      premiseSize: '1bhk',
      serviceType: 'one-time',
      treatmentQuality: 'standard',
    });
    assert.equal(quote.serviceTypeLabel, 'Cockroach Standard');
    assert.equal(quote.pricingRateId, 5);
  });

  it('cockroach premium quote service_type uses Cockroach Premium', () => {
    const quote = calculateCatalogQuotePrice({
      rates: fixtureRates,
      pestTypes: ['cockroach-ants'],
      premiseType: 'residential',
      premiseSize: '1bhk',
      serviceType: 'amc',
      treatmentQuality: 'premium',
    });
    assert.equal(quote.serviceTypeLabel, 'Cockroach Premium');
    assert.equal(quote.pricingRateId, 7);
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

  it('bed bugs 2 BHK prices as one-time catalog row without treatment quality', () => {
    const quote = calculateCatalogQuotePrice({
      rates: fixtureRates,
      pestTypes: ['bedbugs'],
      premiseType: 'residential',
      premiseSize: '2bhk',
      serviceType: 'one-time',
      treatmentQuality: '',
    });
    assert.equal(quote.pricePending, false);
    assert.equal(quote.offerPrice, 3400);
    assert.equal(quote.pricingRateId, 8);
    assert.equal(quote.matchedRate?.service_package, 'Bed Bugs');
  });
});

describe('inquiry displayed total matches Confirm Your Booking', () => {
  /**
   * Both HomeInquiryForm and HomeQuoteForm render calculateCatalogQuotePrice().offerPrice
   * (excl. GST catalog sale, 30% strikethrough is display-only). Same selection → same rupees.
   */
  const selections = [
    {
      label: 'residential cockroach standard one-time 1 BHK',
      input: {
        pestTypes: ['cockroach-ants'],
        premiseType: 'residential' as const,
        premiseSize: '1bhk',
        serviceType: 'one-time' as const,
        treatmentQuality: 'standard' as const,
      },
      offerPrice: 1250,
      gstInclusiveMustNotEqual: 1475,
    },
    {
      label: 'residential cockroach premium AMC 2 BHK',
      input: {
        pestTypes: ['cockroach-ants'],
        premiseType: 'residential' as const,
        premiseSize: '2bhk',
        serviceType: 'amc' as const,
        treatmentQuality: 'premium' as const,
      },
      offerPrice: 6000,
      gstInclusiveMustNotEqual: 7080,
    },
    {
      label: 'residential cockroach standard one-time 3 BHK',
      input: {
        pestTypes: ['cockroach-ants'],
        premiseType: 'residential' as const,
        premiseSize: '3bhk',
        serviceType: 'one-time' as const,
        treatmentQuality: 'standard' as const,
      },
      offerPrice: 1900,
      gstInclusiveMustNotEqual: 2242,
    },
    {
      label: 'commercial cockroach (inspection, no catalog total)',
      input: {
        pestTypes: ['cockroach-ants'],
        premiseType: 'commercial' as const,
        premiseSize: '',
        serviceType: '' as const,
        treatmentQuality: '' as const,
      },
      offerPrice: 0,
      gstInclusiveMustNotEqual: 5900,
    },
  ];

  for (const selection of selections) {
    it(selection.label, () => {
      const booking = calculateCatalogQuotePrice({ rates: fixtureRates, ...selection.input });
      const inquiry = calculateCatalogQuotePrice({ rates: fixtureRates, ...selection.input });
      assert.equal(inquiry.offerPrice, booking.offerPrice);
      assert.equal(inquiry.listPrice, booking.listPrice);
      assert.equal(inquiry.discountPercent, booking.discountPercent);
      assert.equal(inquiry.pricePending, booking.pricePending);
      assert.equal(inquiry.pricingRateId, booking.pricingRateId);
      assert.equal(booking.offerPrice, selection.offerPrice);
      assert.notEqual(booking.offerPrice, selection.gstInclusiveMustNotEqual);
      if (selection.offerPrice > 0) {
        assert.equal(booking.listPrice, Math.round(selection.offerPrice / 0.7));
        assert.equal(booking.discountPercent, 30);
      } else {
        assert.equal(booking.pricePending, true);
        assert.equal(booking.listPrice, 0);
      }
    });
  }
});

describe('booking plan / treatment visibility helpers', () => {
  it('shows treatment quality only for cockroach-ants', () => {
    assert.equal(showTreatmentQualityForPests(['cockroach-ants']), true);
    assert.equal(showTreatmentQualityForPests(['bedbugs']), false);
    assert.equal(showTreatmentQualityForPests(['rodent']), false);
    assert.equal(showTreatmentQualityForPests(['termite', 'mosquito']), false);
    assert.equal(showTreatmentQualityForPests(['cockroach-ants', 'rodent']), true);
  });

  it('AMC only when every pest is cockroach-ants', () => {
    assert.equal(amcAvailableForPests(['cockroach-ants']), true);
    assert.equal(amcAvailableForPests(['bedbugs']), false);
    assert.equal(amcAvailableForPests(['cockroach-ants', 'bedbugs']), false);
  });

  it('bed bugs primary plan copy matches CRM 2-service package', () => {
    assert.equal(isBedBugsPrimaryPlan(['bedbugs']), true);
    assert.equal(isBedBugsPrimaryPlan(['bedbugs', 'rodent']), true);
    assert.equal(isBedBugsPrimaryPlan(['rodent', 'bedbugs']), false);
    assert.equal(oneTimePlanTitle(['bedbugs']), BED_BUG_PLAN_TITLE);
    assert.equal(oneTimePlanSub(['bedbugs']), '1 month • 2 services • 15 days apart');
    assert.equal(oneTimePlanTitle(['rodent']), 'One-Time');
    assert.equal(oneTimePlanSub(['rodent']), 'Single service');
  });
});
