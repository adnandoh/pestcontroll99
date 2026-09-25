import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HomeFormData, decodeFormDataFromURL, getFormData, clearFormData } from '@/utils/formStorage';
import { submitHomeInquiryForm } from '@/services/formSubmit';
import { personNameValidationError, sanitizePersonNameInput } from '@/utils/personName';
import { customerBookingApi } from '@/services/customerBookingApi';
import {
  calculateCatalogQuotePrice,
  type CatalogRate,
} from '@/utils/catalogPricing';
import MultiSelectPest from './MultiSelectPest';
import { AddressInput } from './GoogleMaps';
import { CommercialIcon, ResidentialIcon } from './icons/PremiseTypeIcons';
import IndiaFlagIcon from './icons/IndiaFlagIcon';
import { BUSINESS, whatsAppUrl } from '@/config/business';
import {
  RESIDENTIAL_PREMISE_SIZE_OPTIONS,
  amcAvailableForPests,
  showTreatmentQualityForPests,
} from '@/config/serviceOptions';

const PREMISE_SIZE_OPTIONS = RESIDENTIAL_PREMISE_SIZE_OPTIONS;

/** Same whole-rupee display as HomeQuoteForm (Confirm Your Booking). */
function formatInrWhole(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

type HomeInquiryFormProps = {
  /** Tighter layout (~30% less vertical footprint) for hero pairing */
  compact?: boolean;
  /** CRM remark + message tag for campaign landing pages */
  leadSource?: string;
  thankYouPath?: string;
  defaultCity?: string;
  defaultState?: string;
  formTitle?: string;
  formSubtitle?: string;
};

export default function HomeInquiryForm({
  compact = false,
  leadSource,
  thankYouPath = '/thank-you/',
  defaultCity,
  defaultState,
  formTitle,
  formSubtitle,
}: HomeInquiryFormProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<HomeFormData>({
    pestTypes: ['cockroach-ants'],
    phone: '',
    address: '',
    streetAddress: '',
    name: '',
    premiseType: 'residential',
    premiseSize: '',
    serviceType: 'one-time',
    treatmentQuality: '',
    estimatedPrice: 0
  });
  const [catalogRates, setCatalogRates] = useState<CatalogRate[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState('');
  const [catalogReloadKey, setCatalogReloadKey] = useState(0);

  const priceFromCatalog = useCallback(
    (data: HomeFormData, rates: CatalogRate[] = catalogRates) =>
      calculateCatalogQuotePrice({
        rates,
        pestTypes: data.pestTypes,
        premiseType: data.premiseType,
        premiseSize: data.premiseSize,
        serviceType: data.serviceType,
        treatmentQuality: data.treatmentQuality,
      }),
    [catalogRates],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setCatalogLoading(true);
      setCatalogError('');
      try {
        // Same unfiltered catalog as Confirm Your Booking (no area-name filter).
        const res = await customerBookingApi.fetchCatalog();
        if (cancelled) return;
        if (res.success && res.data) {
          setCatalogRates(res.data.results);
          setCatalogError('');
          setFormData((prev) => ({
            ...prev,
            estimatedPrice: calculateCatalogQuotePrice({
              rates: res.data!.results,
              pestTypes: prev.pestTypes,
              premiseType: prev.premiseType,
              premiseSize: prev.premiseSize,
              serviceType: prev.serviceType,
              treatmentQuality: prev.treatmentQuality,
            }).offerPrice,
          }));
        } else {
          setCatalogError(res.error || 'Could not load live prices');
        }
      } catch (err) {
        if (cancelled) return;
        console.error('Catalog load failed:', err);
        setCatalogError(
          err instanceof Error ? err.message : 'Could not load live prices',
        );
      } finally {
        if (!cancelled) setCatalogLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [catalogReloadKey]);

  // Load pre-filled data on component mount
  useEffect(() => {
    const urlData = decodeFormDataFromURL(searchParams);
    const storageData = getFormData();
    
    if (Object.keys(urlData).length > 0 || storageData) {
      setFormData(prev => ({
        ...prev,
        ...storageData,
        ...urlData,
      }));
    }
    
    if (storageData) {
      clearFormData();
    }
  }, [searchParams]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [premiseSizeOpen, setPremiseSizeOpen] = useState(false);
  const [serviceTypeOpen, setServiceTypeOpen] = useState(false);
  const premiseSizeRef = useRef<HTMLDivElement>(null);
  const serviceTypeRef = useRef<HTMLDivElement>(null);

  const quotePrice = priceFromCatalog(formData);
  const offerPrice = quotePrice.offerPrice;
  const listPrice = quotePrice.listPrice;
  const discountPercent = quotePrice.discountPercent;
  const pricePending = quotePrice.pricePending;
  const isInspectionQuote =
    formData.premiseType === 'commercial' || formData.pestTypes.includes('hotel-commercial');
  const showPremiseSize =
    formData.premiseType === 'residential' &&
    formData.pestTypes.length > 0 &&
    !formData.pestTypes.includes('hotel-commercial');
  const showServiceType = formData.premiseType === 'residential';
  const showTreatmentQuality = showTreatmentQualityForPests(formData.pestTypes);
  const amcAvailable = amcAvailableForPests(formData.pestTypes);
  const isOtherPremiseSize = formData.premiseSize === 'other';
  const selectionsComplete =
    Boolean(formData.premiseType) &&
    formData.pestTypes.length > 0 &&
    (isInspectionQuote ||
      (Boolean(formData.premiseSize) &&
        !isOtherPremiseSize &&
        Boolean(formData.serviceType) &&
        (!showTreatmentQuality || Boolean(formData.treatmentQuality))));
  const showPromoPricing =
    selectionsComplete &&
    !isInspectionQuote &&
    !pricePending &&
    !catalogLoading &&
    offerPrice > 0 &&
    listPrice > offerPrice &&
    discountPercent > 0;
  const oneTimeOnlyHint = formData.pestTypes.some((p) =>
    ['rodent', 'bedbugs', 'termite', 'mosquito'].includes(p),
  );
  const selectedPremiseSize = PREMISE_SIZE_OPTIONS.find((o) => o.value === formData.premiseSize);
  const serviceTypeLabel =
    formData.serviceType === 'amc'
      ? 'AMC — 3 Services'
      : formData.serviceType === 'one-time'
        ? 'One Time Service'
        : 'Select type';

  useEffect(() => {
    if (!premiseSizeOpen && !serviceTypeOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (premiseSizeRef.current && !premiseSizeRef.current.contains(e.target as Node)) {
        setPremiseSizeOpen(false);
      }
      if (serviceTypeRef.current && !serviceTypeRef.current.contains(e.target as Node)) {
        setServiceTypeOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPremiseSizeOpen(false);
        setServiceTypeOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [premiseSizeOpen, serviceTypeOpen]);

  useEffect(() => {
    const offer = priceFromCatalog(formData).offerPrice;
    setFormData((prev) =>
      prev.estimatedPrice === offer ? prev : { ...prev, estimatedPrice: offer },
    );
  }, [
    priceFromCatalog,
    formData.pestTypes,
    formData.premiseType,
    formData.premiseSize,
    formData.serviceType,
    formData.treatmentQuality,
  ]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.pestTypes.length === 0) {
      newErrors.pestTypes = 'Please select at least one pest type';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    {
      const nameErr = personNameValidationError(formData.name, { required: true });
      if (nameErr) newErrors.name = nameErr;
    }

    if (
      formData.premiseType === 'residential' &&
      formData.pestTypes.length > 0 &&
      !formData.pestTypes.includes('hotel-commercial') &&
      !formData.premiseSize
    ) {
      newErrors.premiseSize = 'Please select a premise size';
    }

    if (formData.premiseType === 'residential' && !isInspectionQuote) {
      if (showTreatmentQuality && !formData.treatmentQuality) {
        newErrors.treatmentQuality = 'Please select treatment quality';
      }
      if (!formData.serviceType) {
        newErrors.serviceType = 'Please select a service type';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setShowSuccessPopup(false);
    setSubmitMessage('');

    try {
      // Submit to the backend API which handles both CRM and Email
      const result = await submitHomeInquiryForm(formData as unknown as Record<string, unknown>, {
        leadSource,
        defaultCity,
        defaultState,
      });

      if (result.ok) {
        clearFormData();
        setErrors({});
        navigate(thankYouPath, { replace: true });
        return;
      } else {
        setShowSuccessPopup(false);
        setSubmitMessage(result.error || 'Failed to submit quote request. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowSuccessPopup(false);
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof HomeFormData, value: any) => {
    setFormData(prev => {
      const nextData = {
        ...prev,
        [field]: value
      };

      nextData.pestTypes = nextData.pestTypes.filter((p) => p !== 'hotel-commercial');

      // AMC exists only for cockroach/ants-only selections (same rule as booking).
      const hasAmcSupport = amcAvailableForPests(nextData.pestTypes);
      const needsTreatmentQuality = showTreatmentQualityForPests(nextData.pestTypes);

      if (!hasAmcSupport && nextData.serviceType === 'amc') {
        nextData.serviceType = 'one-time';
      }

      // Standard/Premium only for Cockroach / Ants; otherwise catalog default = standard.
      if (!needsTreatmentQuality) {
        nextData.treatmentQuality = 'standard';
      } else if (field === 'pestTypes' && !showTreatmentQualityForPests(prev.pestTypes)) {
        nextData.treatmentQuality = '';
      }

      if (nextData.premiseType === 'commercial') {
        nextData.treatmentQuality = '';
        nextData.serviceType = '';
        nextData.premiseSize = '';
      }

      nextData.estimatedPrice = priceFromCatalog(nextData).offerPrice;

      return nextData;
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
    if (field === 'pestTypes') {
      setErrors((prev) => ({ ...prev, treatmentQuality: '', serviceType: '' }));
    }

    // Clear success popup when user starts editing
    if (showSuccessPopup) {
      setShowSuccessPopup(false);
      setSubmitMessage('');
    }
  };

  const priceContent = (() => {
    if (catalogLoading && !isInspectionQuote) {
      return <strong className="inquiry-price-inline-amount">…</strong>;
    }
    if (isInspectionQuote) {
      return (
        <>
          <strong className="inquiry-price-inline-amount">Inspection</strong>
          <span className="inquiry-price-inline-sub">Free site visit</span>
        </>
      );
    }
    if (isOtherPremiseSize) {
      return (
        <>
          <strong className="inquiry-price-inline-amount">Custom</strong>
          <span className="inquiry-price-inline-sub">Call / WhatsApp</span>
        </>
      );
    }
    if (!selectionsComplete) {
      return (
        <>
          <strong className="inquiry-price-inline-amount">—</strong>
          <span className="inquiry-price-inline-sub">Select options</span>
        </>
      );
    }
    if (pricePending || offerPrice <= 0) {
      return (
        <>
          <strong className="inquiry-price-inline-amount">On request</strong>
          <span className="inquiry-price-inline-sub">Staff confirmation</span>
        </>
      );
    }
    return (
      <>
        <strong className="inquiry-price-inline-amount">{formatInrWhole(offerPrice)}</strong>
        {showPromoPricing ? (
          <span className="inquiry-price-inline-promo">
            <span className="line-through">{formatInrWhole(listPrice)}</span>
            <span className="inquiry-price-save">{discountPercent}% OFF</span>
          </span>
        ) : (
          <span className="inquiry-price-inline-sub">Excl. GST</span>
        )}
      </>
    );
  })();

  const treatmentPicker = showTreatmentQuality && formData.premiseType === 'residential' && !isInspectionQuote ? (
    <div>
      <p className="booking-field-label">Treatment Quality *</p>
      <div className="booking-choice-grid">
        <button
          type="button"
          onClick={() => handleChange('treatmentQuality', 'standard')}
          className={`booking-choice-card${formData.treatmentQuality === 'standard' ? ' is-selected' : ''}`}
        >
          <strong className="booking-choice-title">Standard</strong>
          <small className="booking-choice-sub">Gel + spray</small>
        </button>
        <button
          type="button"
          onClick={() => handleChange('treatmentQuality', 'premium')}
          className={`booking-choice-card booking-choice-recommended${formData.treatmentQuality === 'premium' ? ' is-selected' : ''}`}
        >
          <strong className="booking-choice-title">Premium</strong>
          <small className="booking-choice-sub">No-smell treatment</small>
        </button>
      </div>
      {errors.treatmentQuality && (
        <p className="mt-1 text-[10px] font-semibold text-red-600">{errors.treatmentQuality}</p>
      )}
    </div>
  ) : null;

  return (
    <section
      id="get-quote"
      className={`pt-0 bg-transparent relative overflow-hidden scroll-mt-24 ${compact ? 'pb-4 sm:pb-6 md:pb-8' : 'pb-12 sm:pb-16 md:pb-20'}`}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-green-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className={`container mx-auto relative z-10 ${compact ? 'px-3 sm:px-6' : 'px-4 sm:px-6'}`}>
        <div className={`mx-auto ${compact ? 'max-w-2xl' : 'max-w-3xl'}`}>
          <div
            data-hero-form-card={compact ? '' : undefined}
            className={`bg-white border border-[#e8f0ea] relative overflow-hidden shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05),0_2px_4px_-2px_rgb(0_0_0_/_0.05)] ${compact ? 'inquiry-form-compact p-2.5 sm:p-4 rounded-xl' : 'p-6 sm:p-10 rounded-2xl'}`}
          >
            {(formTitle || formSubtitle) ? (
              <div className={`text-center ${compact ? 'mb-1.5 sm:mb-2.5' : 'mb-6 sm:mb-8'}`}>
                {formTitle ? (
                  <h2
                    className={`font-bold text-gray-900 leading-tight ${compact ? 'text-base sm:text-xl md:text-2xl mb-0.5' : 'text-2xl sm:text-3xl md:text-4xl mb-1.5 sm:mb-3'}`}
                  >
                    {formTitle}
                  </h2>
                ) : null}
                {formSubtitle ? (
                  <p className={`text-gray-600 max-w-xl mx-auto ${compact ? 'text-[10px] sm:text-xs leading-snug' : 'text-sm sm:text-base'}`}>
                    {formSubtitle}
                  </p>
                ) : null}
              </div>
            ) : null}

            {catalogError ? (
              <div className={`rounded-lg border border-amber-200 bg-amber-50 font-semibold text-amber-900 ${compact ? 'mb-2 p-2 text-[11px]' : 'mb-4 p-3 text-sm'}`}>
                <div>Live prices unavailable — quote may need staff confirmation. {catalogError}</div>
                <button
                  type="button"
                  className="mt-1 text-[11px] font-bold underline underline-offset-2"
                  disabled={catalogLoading}
                  onClick={() => setCatalogReloadKey((k) => k + 1)}
                >
                  {catalogLoading ? 'Retrying prices…' : 'Retry live prices'}
                </button>
              </div>
            ) : null}

            {submitMessage && !showSuccessPopup && (
              <div className={`rounded-lg bg-red-50 border border-red-200 text-red-800 animate-in fade-in slide-in-from-top-2 ${compact ? 'mb-2 p-2 text-xs' : 'mb-6 p-4'}`}>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{submitMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className={compact ? 'inquiry-form-body' : 'space-y-5'}>
              {/* Premise Type */}
              {compact ? (
                <div className="booking-prop-toggle" role="group" aria-label="Premise type">
                  <button
                    type="button"
                    onClick={() => handleChange('premiseType', 'residential')}
                    className={`booking-prop-btn${formData.premiseType === 'residential' ? ' is-active' : ''}`}
                    aria-pressed={formData.premiseType === 'residential'}
                  >
                    <ResidentialIcon className="h-3.5 w-3.5" />
                    Residential
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('premiseType', 'commercial')}
                    className={`booking-prop-btn${formData.premiseType === 'commercial' ? ' is-active' : ''}`}
                    aria-pressed={formData.premiseType === 'commercial'}
                  >
                    <CommercialIcon className="h-3.5 w-3.5" />
                    Commercial
                  </button>
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-[#1a1a1a] text-[15px] mb-2.5">
                    Premise Type *
                  </label>
                  <div className="quote-field-toggle flex">
                    <button
                      type="button"
                      onClick={() => handleChange('premiseType', 'residential')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-4 transition-all duration-200 ${formData.premiseType === 'residential' ? 'bg-green-base text-white' : 'bg-white text-green-base'}`}
                    >
                      <ResidentialIcon className="h-5 w-5" />
                      <span className="font-bold text-[15px]">Residential</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange('premiseType', 'commercial')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-4 transition-all duration-200 ${formData.premiseType === 'commercial' ? 'bg-green-base text-white' : 'bg-white text-green-base'}`}
                    >
                      <CommercialIcon className="h-5 w-5" />
                      <span className="font-bold text-[15px]">Commercial</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Service + Premise Size (side-by-side on compact / mobile) */}
              {compact ? (
                <div className="booking-grid-2 booking-grid-service">
                  <div>
                    <MultiSelectPest
                      selectedPests={formData.pestTypes}
                      onChange={(pests) => handleChange('pestTypes', pests)}
                      compact
                    />
                    {errors.pestTypes && (
                      <p className="mt-1 text-[10px] font-semibold text-red-600">{errors.pestTypes}</p>
                    )}
                  </div>

                  {showPremiseSize ? (
                    <div ref={premiseSizeRef}>
                      <label id="premise-size-label" className="booking-field-label">
                        Premise Size *
                      </label>
                      <div
                        className={`booking-select${errors.premiseSize ? ' booking-select-error' : ''}${premiseSizeOpen ? ' is-open' : ''}`}
                      >
                        <button
                          type="button"
                          id="premise-size-trigger"
                          aria-haspopup="listbox"
                          aria-expanded={premiseSizeOpen}
                          aria-labelledby="premise-size-label premise-size-trigger"
                          onClick={() => {
                            setServiceTypeOpen(false);
                            setPremiseSizeOpen((open) => !open);
                          }}
                          className="booking-select-trigger"
                        >
                          <span className={selectedPremiseSize ? '' : 'is-placeholder'}>
                            {selectedPremiseSize?.label ?? 'Select size'}
                          </span>
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {premiseSizeOpen && (
                          <ul role="listbox" aria-labelledby="premise-size-label" className="booking-select-menu">
                            {PREMISE_SIZE_OPTIONS.map((option) => (
                              <li key={option.value} role="presentation">
                                <button
                                  type="button"
                                  role="option"
                                  aria-selected={formData.premiseSize === option.value}
                                  className={`booking-select-option${formData.premiseSize === option.value ? ' is-selected' : ''}`}
                                  onClick={() => {
                                    handleChange('premiseSize', option.value);
                                    setPremiseSizeOpen(false);
                                  }}
                                >
                                  {option.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {errors.premiseSize && (
                        <p className="mt-1 text-[10px] font-semibold text-red-600">{errors.premiseSize}</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <span className="booking-field-label">Est. Price</span>
                      <div className="inquiry-price-inline" data-quote-mode={isInspectionQuote ? 'inspection' : 'priced'}>
                        {priceContent}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <MultiSelectPest
                    selectedPests={formData.pestTypes}
                    onChange={(pests) => handleChange('pestTypes', pests)}
                  />
                  {errors.pestTypes && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {errors.pestTypes}
                    </p>
                  )}
                </div>
              )}

              {/* Select Type + Price (compact) or full price + residential options */}
              {compact ? (
                <>
                  {showServiceType || showPremiseSize ? (
                    <div className="booking-grid-2">
                      {showServiceType ? (
                        <div ref={serviceTypeRef}>
                          <label id="service-type-label" className="booking-field-label">
                            Select Type *
                          </label>
                          <div
                            className={`booking-select${errors.serviceType ? ' booking-select-error' : ''}${serviceTypeOpen ? ' is-open' : ''}`}
                          >
                            <button
                              type="button"
                              id="service-type-trigger"
                              aria-haspopup="listbox"
                              aria-expanded={serviceTypeOpen}
                              aria-labelledby="service-type-label service-type-trigger"
                              onClick={() => {
                                setPremiseSizeOpen(false);
                                setServiceTypeOpen((open) => !open);
                              }}
                              className="booking-select-trigger"
                            >
                              <span className={formData.serviceType ? '' : 'is-placeholder'}>
                                {serviceTypeLabel}
                              </span>
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {serviceTypeOpen && (
                              <ul role="listbox" aria-labelledby="service-type-label" className="booking-select-menu">
                                <li role="presentation">
                                  <button
                                    type="button"
                                    role="option"
                                    aria-selected={formData.serviceType === 'one-time'}
                                    className={`booking-select-option${formData.serviceType === 'one-time' ? ' is-selected' : ''}`}
                                    onClick={() => {
                                      handleChange('serviceType', 'one-time');
                                      setServiceTypeOpen(false);
                                    }}
                                  >
                                    One Time Service
                                  </button>
                                </li>
                                {amcAvailable ? (
                                  <li role="presentation">
                                    <button
                                      type="button"
                                      role="option"
                                      aria-selected={formData.serviceType === 'amc'}
                                      className={`booking-select-option${formData.serviceType === 'amc' ? ' is-selected' : ''}`}
                                      onClick={() => {
                                        handleChange('serviceType', 'amc');
                                        setServiceTypeOpen(false);
                                      }}
                                    >
                                      AMC — 3 Services
                                    </button>
                                  </li>
                                ) : null}
                              </ul>
                            )}
                          </div>
                          {oneTimeOnlyHint ? (
                            <p className="mt-0.5 text-[9px] font-semibold italic text-orange-600">
                              * One-Time only for selected service(s)
                            </p>
                          ) : null}
                          {errors.serviceType && (
                            <p className="mt-1 text-[10px] font-semibold text-red-600">{errors.serviceType}</p>
                          )}
                        </div>
                      ) : (
                        <div className="hidden sm:block" aria-hidden />
                      )}

                      {showPremiseSize ? (
                        <div>
                          <span className="booking-field-label">Est. Price</span>
                          <div className="inquiry-price-inline" data-quote-mode={isInspectionQuote ? 'inspection' : 'priced'}>
                            {priceContent}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  {treatmentPicker}
                </>
              ) : (
                <>
                  <div className="quote-price-block py-1.5">
                    {isInspectionQuote ? (
                      <div className="flex flex-col gap-0.5" data-quote-mode="inspection">
                        <span className="font-bold text-slate-900 text-2xl">Inspection Required</span>
                        <p className="text-green-base font-semibold text-[11px] mt-0.5">
                          Free Consultation & Site Visit
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-start gap-0.5" data-quote-mode="priced">
                        {selectionsComplete && !pricePending && offerPrice > 0 ? (
                          <span className="font-medium text-slate-800 text-[15px]">Price (Excluding GST)</span>
                        ) : null}
                        <span className="font-bold text-slate-900 tracking-tight tabular-nums text-[1.85rem] sm:text-[2rem] leading-tight">
                          {catalogLoading
                            ? '…'
                            : isOtherPremiseSize
                              ? 'Custom quote'
                              : !selectionsComplete
                                ? '—'
                                : pricePending || offerPrice <= 0
                                  ? 'On request'
                                  : formatInrWhole(offerPrice)}
                        </span>
                        {showPromoPricing && (
                          <div className="flex flex-wrap items-center gap-2 mt-0.5">
                            <span className="text-slate-500 line-through tabular-nums text-[15px]">
                              {formatInrWhole(listPrice)}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-sm font-medium text-green-800">
                              ({discountPercent}% OFF)
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {treatmentPicker}

                  {showPremiseSize && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-2 animate-in fade-in slide-in-from-top-2">
                      <div className="flex flex-col">
                        <label id="premise-size-label" className="block font-semibold text-slate-800 text-[15px] mb-2">
                          Premise Size *
                        </label>
                        <div
                          className={`quote-size-select ${errors.premiseSize ? 'quote-size-select-error' : ''} ${premiseSizeOpen ? 'quote-size-select-open' : ''}`}
                          ref={premiseSizeRef}
                        >
                          <button
                            type="button"
                            id="premise-size-trigger"
                            aria-haspopup="listbox"
                            aria-expanded={premiseSizeOpen}
                            aria-labelledby="premise-size-label premise-size-trigger"
                            onClick={() => setPremiseSizeOpen((open) => !open)}
                            className="quote-size-trigger w-full flex items-center justify-between gap-3 text-left px-4 py-3 text-[15px]"
                          >
                            <span className={`font-bold ${selectedPremiseSize ? 'text-slate-800' : 'text-slate-400'}`}>
                              {selectedPremiseSize?.label ?? 'Select size'}
                            </span>
                            <svg
                              className={`quote-size-chevron shrink-0 h-5 w-5 transition-transform duration-200 ${premiseSizeOpen ? 'rotate-180' : ''}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {premiseSizeOpen && (
                            <ul role="listbox" aria-labelledby="premise-size-label" className="quote-size-menu">
                              {PREMISE_SIZE_OPTIONS.map((option) => {
                                const selected = formData.premiseSize === option.value;
                                return (
                                  <li key={option.value} role="presentation">
                                    <button
                                      type="button"
                                      role="option"
                                      aria-selected={selected}
                                      className={`quote-size-option w-full text-left font-bold text-slate-800 px-4 py-3 text-[15px] ${selected ? 'quote-size-option-selected' : ''}`}
                                      onClick={() => {
                                        handleChange('premiseSize', option.value);
                                        setPremiseSizeOpen(false);
                                      }}
                                    >
                                      {option.label}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                        {errors.premiseSize && (
                          <p className="mt-1 text-xs text-red-600 font-bold">{errors.premiseSize}</p>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label className="block font-bold text-[#1a1a1a] text-[15px] mb-2">
                          Select Type *
                        </label>
                        <select
                          value={formData.serviceType || ''}
                          onChange={(e) => handleChange('serviceType', e.target.value)}
                          className={`quote-field w-full font-bold text-gray-700 cursor-pointer appearance-none px-4 py-3 ${errors.serviceType ? 'quote-field-error' : ''}`}
                          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%237fbf94\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2rem' }}
                        >
                          <option value="" disabled>Select Type</option>
                          <option value="one-time">One Time Service</option>
                          {amcAvailable && (
                            <option value="amc">Annual Maintenance Contract 3 Services</option>
                          )}
                        </select>
                        {oneTimeOnlyHint && (
                          <p className="mt-1 text-[10px] text-orange-600 font-bold italic">* Selected service(s) available only as One-Time treatment</p>
                        )}
                        {errors.serviceType && (
                          <p className="mt-1 text-xs text-red-600 font-bold">{errors.serviceType}</p>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Name + Phone — always 2-col on compact (incl. ~360px) */}
              {compact ? (
                <div className="booking-grid-2 booking-grid-phone">
                  <div>
                    <label htmlFor="quote-name" className="booking-field-label">
                      Your Name *
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', sanitizePersonNameInput(e.target.value))}
                      placeholder="Full name"
                      className={`booking-input${errors.name ? ' booking-input-error' : ''}`}
                      autoComplete="name"
                      inputMode="text"
                      autoCapitalize="words"
                    />
                    {errors.name && (
                      <p className="mt-1 text-[10px] font-semibold text-red-600">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="quote-phone" className="booking-field-label">
                      Mobile *
                    </label>
                    <div className={`booking-phone-field${errors.phone ? ' booking-phone-field-error' : ''}`}>
                      <div className="booking-phone-prefix" aria-hidden="true">
                        <IndiaFlagIcon className="booking-phone-flag" />
                        <span className="booking-phone-prefix-code">+91</span>
                      </div>
                      <input
                        id="quote-phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        value={formData.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          handleChange('phone', value);
                        }}
                        placeholder="10 digits"
                        maxLength={10}
                        className="booking-phone-input"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'quote-phone-error' : undefined}
                      />
                    </div>
                    {errors.phone && (
                      <p id="quote-phone-error" className="mt-1 text-[10px] font-semibold text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-bold text-[#1a1a1a] text-[15px] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', sanitizePersonNameInput(e.target.value))}
                      placeholder="Enter your full name"
                      className={`quote-field w-full font-medium px-4 py-3 ${errors.name ? 'quote-field-error' : ''}`}
                      inputMode="text"
                      autoCapitalize="words"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600 font-bold">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="quote-phone" className="block font-bold text-[#1a1a1a] text-[15px] mb-2">
                      Phone Number *
                    </label>
                    <div className={`quote-phone-field${errors.phone ? ' quote-phone-field-error' : ''}`}>
                      <div className="quote-phone-prefix" aria-hidden="true">
                        <IndiaFlagIcon className="quote-phone-flag" />
                        <span className="quote-phone-prefix-code">+91</span>
                      </div>
                      <input
                        id="quote-phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        value={formData.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          handleChange('phone', value);
                        }}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className="quote-phone-input font-medium text-base"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'quote-phone-error' : undefined}
                      />
                    </div>
                    {errors.phone && (
                      <p id="quote-phone-error" className="mt-1 text-xs text-red-600 font-bold">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {compact ? (
                <AddressInput
                  label="Street Address (optional)"
                  value={formData.streetAddress}
                  onChange={(value) => handleChange('streetAddress', value)}
                  placeholder="Area, building or street (optional)"
                  inlineLocate
                  className=""
                  error={errors.streetAddress}
                />
              ) : (
                <div>
                  <label htmlFor="streetAddress" className="block font-bold text-[#1a1a1a] mb-2 text-[15px]">
                    Street Address <span className="font-normal text-gray-500">(optional)</span>
                  </label>
                  <AddressInput
                    label=""
                    value={formData.streetAddress}
                    onChange={(value) => handleChange('streetAddress', value)}
                    placeholder="Enter your street address (optional)"
                    className={`py-3 ${errors.streetAddress ? 'quote-field-error' : ''}`}
                    error={errors.streetAddress}
                  />
                </div>
              )}

              <div className={compact ? 'pt-0.5' : 'pt-4'}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-cta w-full rounded-lg font-bold transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:transform-none flex items-center justify-center group ${compact ? 'py-2.5 px-4 text-sm' : 'py-4 px-8'}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Request...
                    </>
                  ) : (
                    <>
                      Submit Inquiry
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 relative transform transition-all duration-300 scale-100 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowSuccessPopup(false);
                setSubmitMessage('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-full p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Success Icon */}
            <div className="text-center mb-6">
              <div className="mx-auto w-20 h-20 bg-green-pale rounded-full flex items-center justify-center mb-4 relative">
                <div className="absolute inset-0 bg-green-pale rounded-full animate-ping opacity-25"></div>
                <svg className="w-10 h-10 text-green-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
              <p className="text-gray-600 leading-relaxed">{submitMessage}</p>
            </div>

            {/* Contact Options */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-center text-sm text-gray-500 mb-3 font-medium">
                Want a faster response?
              </p>

              <div className="grid grid-cols-2 gap-3">
                {/* WhatsApp Button */}
                <a
                  href={whatsAppUrl(
                    'Hi, I just submitted a quote request on your website. Can you please provide me with a detailed quote?',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382" />
                  </svg>
                  WhatsApp
                </a>

                {/* Call Button */}
                <a
                  href={`tel:${BUSINESS.phoneTel}`}
                  className="bg-blue-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
