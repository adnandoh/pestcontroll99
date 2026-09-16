import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  HomeFormData,
  createEmptyHomeFormData,
  decodeFormDataFromURL,
  clearFormData,
} from '@/utils/formStorage';
import {
  submitHomeBookingForm,
  sendHomeBookingOtp,
  verifyHomeBookingOtp,
  silentUpsertWebsiteInquiry,
  isValidBookingMobile,
} from '@/services/formSubmit';
import { customerBookingApi } from '@/services/customerBookingApi';
import { getBookingSessionId } from '@/utils/bookingSession';
import {
  calculateCatalogQuotePrice,
  type CatalogRate,
} from '@/utils/catalogPricing';
import MultiSelectPest from './MultiSelectPest';
import ClockTimePicker from './ClockTimePicker';
import { AddressInput } from './GoogleMaps';
import IndiaFlagIcon from './icons/IndiaFlagIcon';
import { BUSINESS, whatsAppUrl } from '@/config/business';
import {
  RESIDENTIAL_PREMISE_SIZE_OPTIONS,
  AMC_UNAVAILABLE_BADGE,
  AMC_UNAVAILABLE_LABEL,
  amcAvailableForPests,
  isBedBugsPrimaryPlan,
  oneTimePlanSub,
  oneTimePlanTitle,
  showTreatmentQualityForPests,
} from '@/config/serviceOptions';
import {
  formatFriendlyPreferredDate,
  formatLocalDateYYYYMMDD,
  toPreferredTime,
} from '@/utils/clockTime';

const PREMISE_SIZE_OPTIONS = RESIDENTIAL_PREMISE_SIZE_OPTIONS;
const OTHER_PREMISE_WHATSAPP_MESSAGE =
  'Hi Pest Control 99, I selected Other for premise size on the website booking form and need a custom quote.';

type TreatmentDetail = {
  title: string;
  bullets: string[];
  whyChooseTitle?: string;
  whyChooseBody?: string;
};

const TREATMENT_DETAILS: Record<'standard' | 'premium', TreatmentDetail> = {
  standard: {
    title: 'Standard Treatment',
    bullets: [
      'Strong chemical spray with standard gel treatment.',
      'Kitchen utensils and food items must be removed before treatment.',
      'Our technician can assist with utensil removal for an additional charge of ₹300.',
      'Keep children and pets away from the treated area.',
      'Do not use the treated area for at least 3 hours after treatment.',
    ],
  },
  premium: {
    title: 'Premium Treatment — Recommended',
    bullets: [
      'Advanced premium gel treatment for complete-home cockroach control.',
      'Premium gel remains active and continuously targets hidden cockroaches.',
      'No need to remove kitchen utensils for gel-only treatment.',
      'Odourless spray with no unpleasant smell with premium gel is also available if spray treatment is required.',
      'Cockroach monitoring pads/traps will be provided wherever necessary.',
      'Tried-and-tested treatment method for effective and long-lasting control.',
      'Ideal for families looking for minimum preparation, less inconvenience and better protection.',
    ],
    whyChooseTitle: 'Why Choose Premium?',
    whyChooseBody:
      'Choose Premium Treatment for hassle-free service, no utensil removal and long-lasting cockroach control.',
  },
};

function formatInrWhole(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

type HomeQuoteFormProps = {
  compact?: boolean;
  leadSource?: string;
  thankYouPath?: string;
  defaultCity?: string;
  defaultState?: string;
  formTitle?: string;
  formSubtitle?: string;
};

export default function HomeQuoteForm({
  leadSource,
  thankYouPath = '/thank-you/',
  defaultCity,
  defaultState,
  formTitle,
  formSubtitle,
}: HomeQuoteFormProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<HomeFormData>(() => createEmptyHomeFormData());
  const [catalogRates, setCatalogRates] = useState<CatalogRate[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState('');

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
      const res = await customerBookingApi.fetchCatalog(defaultCity);
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
      setCatalogLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [defaultCity]);

  useEffect(() => {
    // Drop stale localStorage so it cannot overwrite defaults (e.g. Commercial / plans / hotel pest).
    clearFormData();

    const urlData = decodeFormDataFromURL(searchParams);
    // Contact fields only from URL — keep Residential + Cockroach + fresh schedule defaults.
    // Run once on mount only — re-running on searchParams identity churn would wipe phone/name
    // mid-OTP and surface a bogus "Missing required fields" on verify.
    const defaults = createEmptyHomeFormData();
    setFormData((prev) => ({
      ...defaults,
      estimatedPrice: prev.estimatedPrice,
      name: urlData.name || '',
      phone: urlData.phone || '',
      address: urlData.address || '',
      streetAddress: urlData.streetAddress || urlData.address || '',
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional mount-only hydrate
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [premiseSizeOpen, setPremiseSizeOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<'standard' | 'premium' | null>(null);
  const [otherSizeModalOpen, setOtherSizeModalOpen] = useState(false);
  const premiseSizeRef = useRef<HTMLDivElement>(null);

  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpHint, setOtpHint] = useState('');
  const [otpMobile, setOtpMobile] = useState('');
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const otpInputRef = useRef<HTMLInputElement>(null);
  /** Snapshot of the validated form at OTP-send time — create booking must use this. */
  const bookingDraftRef = useRef<HomeFormData | null>(null);
  const inquiryInFlightRef = useRef(false);
  const lastInquiryFingerprintRef = useRef('');
  /** Latest form snapshot to retry after an in-flight upsert (avoids dropping name). */
  const pendingInquiryDataRef = useRef<HomeFormData | null>(null);

  // Ensure booking session id exists for this browser tab.
  useEffect(() => {
    getBookingSessionId();
  }, []);

  const queueSilentInquiry = useCallback(
    (data: HomeFormData) => {
      if (!isValidBookingMobile(data.phone)) return;

      const fingerprint = [
        data.phone,
        data.name,
        data.streetAddress || data.address,
        data.premiseType,
        data.premiseSize,
        data.treatmentQuality,
        data.serviceType,
        (data.pestTypes || []).join(','),
        data.preferredDate,
        data.preferredTime,
        String(data.estimatedPrice || 0),
      ].join('|');

      if (fingerprint === lastInquiryFingerprintRef.current) return;

      // If an upsert is already running, queue the latest snapshot and retry after.
      // Without this, typing the name during the first mobile-blur upsert permanently
      // leaves CRM/Telegram stuck on "Website Lead".
      if (inquiryInFlightRef.current) {
        pendingInquiryDataRef.current = data;
        return;
      }

      inquiryInFlightRef.current = true;
      pendingInquiryDataRef.current = null;
      void silentUpsertWebsiteInquiry(data as unknown as Record<string, unknown>, {
        leadSource: leadSource || 'Website Booking Form',
        defaultCity,
        defaultState,
      })
        .then((res) => {
          if (res.ok) {
            lastInquiryFingerprintRef.current = fingerprint;
          }
        })
        .finally(() => {
          inquiryInFlightRef.current = false;
          const pending = pendingInquiryDataRef.current;
          if (pending) {
            pendingInquiryDataRef.current = null;
            queueSilentInquiry(pending);
          }
        });
    },
    [leadSource, defaultCity, defaultState],
  );

  // Debounced silent CRM capture once mobile is a valid 10-digit number.
  useEffect(() => {
    if (!isValidBookingMobile(formData.phone)) return;
    const timer = window.setTimeout(() => {
      queueSilentInquiry(formData);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [formData, queueSilentInquiry]);

  const isInspectionQuote =
    formData.premiseType === 'commercial' || formData.pestTypes.includes('hotel-commercial');
  const isOtherPremiseSize = formData.premiseSize === 'other';
  const selectedPremiseSize = PREMISE_SIZE_OPTIONS.find((o) => o.value === formData.premiseSize);
  const amcAvailable = amcAvailableForPests(formData.pestTypes);
  const showTreatmentQuality = showTreatmentQualityForPests(formData.pestTypes);
  const bedBugsPrimaryPlan = isBedBugsPrimaryPlan(formData.pestTypes);

  const dateMin = formatLocalDateYYYYMMDD(new Date());

  useEffect(() => {
    if (!premiseSizeOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (premiseSizeRef.current && !premiseSizeRef.current.contains(e.target as Node)) {
        setPremiseSizeOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPremiseSizeOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [premiseSizeOpen]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = window.setTimeout(() => setResendCooldown((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (!otpModalOpen) return;
    const t = window.setTimeout(() => otpInputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [otpModalOpen]);

  const quotePrice = priceFromCatalog(formData);
  const offerPrice = quotePrice.offerPrice;
  const listPrice = quotePrice.listPrice;
  const discountPercent = quotePrice.discountPercent;
  const pricePending = quotePrice.pricePending;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.premiseType) {
      newErrors.premiseType = 'Please select Residential or Commercial';
    }

    if (formData.pestTypes.length === 0) {
      newErrors.pestTypes = 'Please select at least one pest type';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const address = (formData.streetAddress || formData.address || '').trim();
    if (address.length < 5) {
      newErrors.streetAddress = 'Please enter your service address';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date';
    }

    if (!toPreferredTime(formData.preferredTime || '')) {
      newErrors.preferredTime = 'Please select a preferred time';
    }

    if (
      formData.premiseType === 'residential' &&
      formData.pestTypes.length > 0 &&
      !formData.pestTypes.includes('hotel-commercial') &&
      !formData.premiseSize
    ) {
      newErrors.premiseSize = 'Please select a premise size';
    }

    if (formData.premiseSize === 'other') {
      newErrors.premiseSize = 'Please call or WhatsApp us for a custom quote';
    }

    if (formData.premiseType === 'residential' && !isInspectionQuote) {
      if (showTreatmentQuality && !formData.treatmentQuality) {
        newErrors.treatmentQuality = 'Please select treatment quality';
      }
      if (!formData.serviceType) {
        newErrors.serviceType = 'Please select a service plan';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const closeOtpModal = () => {
    setOtpModalOpen(false);
    setOtpValue('');
    setOtpError('');
    setOtpHint('');
    setOtpSending(false);
    setOtpVerifying(false);
    bookingDraftRef.current = null;
  };

  const startOtpFlow = async () => {
    setOtpSending(true);
    setOtpError('');
    setSubmitMessage('');
    try {
      const draft = { ...formData, pestTypes: [...formData.pestTypes] };
      const otpSend = await sendHomeBookingOtp(draft as unknown as Record<string, unknown>);
      if (!otpSend.ok) {
        // Hourly cap: show server message on the form banner (no short "wait Xs" cooldown).
        setSubmitMessage(otpSend.error);
        setOtpModalOpen(false);
        bookingDraftRef.current = null;
        return false;
      }
      bookingDraftRef.current = draft;
      setOtpMobile(otpSend.mobile);
      // Soft button debounce only — website booking has no short server cooldown.
      setResendCooldown(otpSend.resendAfter > 0 ? otpSend.resendAfter : 2);
      setOtpHint(
        otpSend.devOtp
          ? `Local DEBUG OTP: ${otpSend.devOtp}`
          : `OTP sent on WhatsApp to +91 ${otpSend.mobile}`,
      );
      setOtpModalOpen(true);
      setOtpValue('');
      return true;
    } catch (error) {
      console.error('Error sending booking OTP:', error);
      setSubmitMessage('Network error sending OTP. Please try again.');
      bookingDraftRef.current = null;
      return false;
    } finally {
      setOtpSending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.premiseSize === 'other') {
      setOtherSizeModalOpen(true);
      setErrors((prev) => ({
        ...prev,
        premiseSize: 'Please call or WhatsApp us for a custom quote',
      }));
      return;
    }
    if (!validateForm()) return;

    setIsSubmitting(true);
    setShowSuccessPopup(false);
    setSubmitMessage('');

    try {
      await startOtpFlow();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || otpSending || otpVerifying) return;
    setOtpError('');
    setOtpSending(true);
    try {
      const draft =
        bookingDraftRef.current ??
        ({ ...formData, pestTypes: [...formData.pestTypes] } as HomeFormData);
      const otpSend = await sendHomeBookingOtp(draft as unknown as Record<string, unknown>);
      if (!otpSend.ok) {
        setOtpError(otpSend.error);
        return;
      }
      bookingDraftRef.current = draft;
      setOtpMobile(otpSend.mobile);
      setResendCooldown(otpSend.resendAfter > 0 ? otpSend.resendAfter : 2);
      setOtpHint(
        otpSend.devOtp
          ? `Local DEBUG OTP: ${otpSend.devOtp}`
          : `OTP resent on WhatsApp to +91 ${otpSend.mobile}`,
      );
      setOtpValue('');
    } catch (error) {
      console.error('Error resending booking OTP:', error);
      setOtpError('Network error. Please try again.');
    } finally {
      setOtpSending(false);
    }
  };

  const handleVerifyOtpAndBook = async () => {
    if (otpVerifying || otpSending) return;
    const cleanOtp = otpValue.replace(/\D/g, '');
    if (cleanOtp.length !== 4) {
      setOtpError('Enter the 4-digit OTP');
      return;
    }

    setOtpVerifying(true);
    setOtpError('');
    try {
      const draft =
        bookingDraftRef.current ??
        ({ ...formData, pestTypes: [...formData.pestTypes] } as HomeFormData);
      const mobileForVerify = otpMobile || draft.phone || formData.phone;
      const verified = await verifyHomeBookingOtp(mobileForVerify, cleanOtp);
      if (!verified.ok) {
        setOtpError(verified.error);
        return;
      }

      const result = await submitHomeBookingForm(
        draft as unknown as Record<string, unknown>,
        {
          leadSource,
          defaultCity,
          defaultState,
        },
        catalogRates,
        verified.otpVerificationToken,
      );

      if (result.ok) {
        bookingDraftRef.current = null;
        clearFormData();
        setErrors({});
        closeOtpModal();
        const params = new URLSearchParams();
        if (result.bookingCode) params.set('code', result.bookingCode);
        if (result.bookingId) params.set('id', String(result.bookingId));
        if (result.priceConfirmationPending) params.set('pending', '1');
        const qs = params.toString();
        navigate(qs ? `${thankYouPath}?${qs}` : thankYouPath, { replace: true });
        return;
      }
      setOtpError(
        result.error || 'Failed to confirm booking. Please try again or contact us directly.',
      );
    } catch (error) {
      console.error('Error verifying OTP / booking:', error);
      setOtpError('Network error. Please check your connection and try again.');
    } finally {
      setOtpVerifying(false);
    }
  };

  const handleChange = (field: keyof HomeFormData, value: unknown) => {
    if (field === 'pestTypes') {
      const pests = (Array.isArray(value) ? value : []).filter(
        (p): p is string => typeof p === 'string' && p !== 'hotel-commercial',
      );
      if (!showTreatmentQualityForPests(pests)) setInfoModal(null);
    }
    if (field === 'premiseType' && value === 'commercial') {
      setInfoModal(null);
    }

    setFormData((prev) => {
      const nextData = { ...prev, [field]: value } as HomeFormData;

      // Strip removed Hotel / Commercial pest slug if it ever appears (legacy storage).
      nextData.pestTypes = nextData.pestTypes.filter((p) => p !== 'hotel-commercial');

      const hasAmcSupport = amcAvailableForPests(nextData.pestTypes);
      const needsTreatmentQuality = showTreatmentQualityForPests(nextData.pestTypes);

      // Clear invalid AMC only — do not auto-select One-Time or Residential.
      if (!hasAmcSupport && nextData.serviceType === 'amc') {
        nextData.serviceType = '';
      }

      // Standard/Premium only for Cockroach / Ants; otherwise catalog default = standard.
      if (!needsTreatmentQuality) {
        nextData.treatmentQuality = 'standard';
      } else if (field === 'pestTypes' && !showTreatmentQualityForPests(prev.pestTypes)) {
        // Switching onto cockroach — ask the customer to pick quality again.
        nextData.treatmentQuality = '';
      }

      // Commercial / inspection: clear residential-only selections.
      if (nextData.premiseType === 'commercial') {
        nextData.treatmentQuality = '';
        nextData.serviceType = '';
        nextData.premiseSize = '';
      }

      nextData.estimatedPrice = priceFromCatalog(nextData).offerPrice;
      return nextData;
    });

    if (errors[field as string]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    if (field === 'pestTypes') {
      setErrors((prev) => ({ ...prev, treatmentQuality: '', serviceType: '' }));
    }
    if (showSuccessPopup) {
      setShowSuccessPopup(false);
      setSubmitMessage('');
    }
  };

  const selectionsComplete =
    Boolean(formData.premiseType) &&
    formData.pestTypes.length > 0 &&
    (isInspectionQuote ||
      (Boolean(formData.premiseSize) &&
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

  const priceSummaryLabel = (() => {
    if (!selectionsComplete) return 'Select options for price';
    if (isOtherPremiseSize) return 'Custom quote — call / WhatsApp';
    if (isInspectionQuote) return 'Site inspection';
    if (formData.serviceType === 'amc') {
      const quality = formData.treatmentQuality === 'premium' ? 'Premium' : 'Standard';
      return `${quality} AMC • 3 visits`;
    }
    if (formData.serviceType === 'one-time') {
      if (bedBugsPrimaryPlan) return '2-Service Package • 2 visits';
      if (showTreatmentQuality) {
        const quality = formData.treatmentQuality === 'premium' ? 'Premium' : 'Standard';
        return `${quality} • One-Time`;
      }
      return 'One-Time service';
    }
    return 'Select options for price';
  })();

  const title = formTitle || 'Confirm Your Booking';

  return (
    <section id="get-quote" className="booking-form-section scroll-mt-24">
      <div data-hero-form-card="" className="booking-form-card">
        <div className="booking-form-header">
          <h2 className="booking-form-title">{title}</h2>
          <span className="booking-required-hint">* Required</span>
        </div>
        {formSubtitle ? <p className="booking-form-subtitle">{formSubtitle}</p> : null}

        {catalogError ? (
          <div className="mb-2 rounded-[10px] border border-amber-200 bg-amber-50 p-2.5 text-xs font-semibold text-amber-900">
            Live prices unavailable — booking may need staff price confirmation. {catalogError}
          </div>
        ) : null}

        {submitMessage && !showSuccessPopup && (
          <div className="mb-2 rounded-[10px] border border-red-200 bg-red-50 p-2.5 text-xs font-semibold text-red-800">
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="booking-form-fields">
          <div className="booking-form-body">
            <div>
              <div className="booking-prop-toggle" role="group" aria-label="Property type">
                <button
                  type="button"
                  onClick={() => handleChange('premiseType', 'residential')}
                  className={`booking-prop-btn${formData.premiseType === 'residential' ? ' is-active' : ''}`}
                  aria-pressed={formData.premiseType === 'residential'}
                >
                  🏠 Residential
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('premiseType', 'commercial')}
                  className={`booking-prop-btn${formData.premiseType === 'commercial' ? ' is-active' : ''}`}
                  aria-pressed={formData.premiseType === 'commercial'}
                >
                  🏢 Commercial
                </button>
              </div>
              {errors.premiseType && (
                <p className="mt-1 text-[10px] font-semibold text-red-600">{errors.premiseType}</p>
              )}
            </div>

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

              {formData.premiseType === 'residential' &&
              formData.pestTypes.length > 0 &&
              !formData.pestTypes.includes('hotel-commercial') ? (
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
                      onClick={() => setPremiseSizeOpen((o) => !o)}
                      className="booking-select-trigger"
                    >
                      <span className={selectedPremiseSize ? '' : 'is-placeholder'}>
                        {selectedPremiseSize?.label ?? 'Select size'}
                      </span>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {premiseSizeOpen && (
                      <ul
                        role="listbox"
                        aria-labelledby="premise-size-label"
                        className="booking-select-menu"
                      >
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
                                if (option.value === 'other') {
                                  setOtherSizeModalOpen(true);
                                }
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
                <div className="hidden sm:block" aria-hidden />
              )}
            </div>

            {formData.premiseType === 'residential' && !isInspectionQuote && showTreatmentQuality && (
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
                    <i
                      className="booking-info-icon"
                      role="button"
                      tabIndex={0}
                      aria-label="Standard treatment info"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setInfoModal('standard');
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.stopPropagation();
                          e.preventDefault();
                          setInfoModal('standard');
                        }
                      }}
                    >
                      i
                    </i>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('treatmentQuality', 'premium')}
                    className={`booking-choice-card booking-choice-recommended${formData.treatmentQuality === 'premium' ? ' is-selected' : ''}`}
                  >
                    <strong className="booking-choice-title">Premium</strong>
                    <small className="booking-choice-sub">No-smell treatment</small>
                    <i
                      className="booking-info-icon"
                      role="button"
                      tabIndex={0}
                      aria-label="Premium treatment info"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setInfoModal('premium');
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.stopPropagation();
                          e.preventDefault();
                          setInfoModal('premium');
                        }
                      }}
                    >
                      i
                    </i>
                  </button>
                </div>
                {errors.treatmentQuality && (
                  <p className="mt-1 text-[10px] font-semibold text-red-600">
                    {errors.treatmentQuality}
                  </p>
                )}
              </div>
            )}

            {formData.premiseType === 'residential' && !isInspectionQuote && (
              <div>
                <p className="booking-field-label">Service Plan *</p>
                <div className="booking-choice-grid">
                  <button
                    type="button"
                    onClick={() => handleChange('serviceType', 'one-time')}
                    className={`booking-choice-card${formData.serviceType === 'one-time' ? ' is-selected' : ''}${bedBugsPrimaryPlan ? ' booking-choice-tall' : ''}`}
                  >
                    <strong className="booking-choice-title">
                      {oneTimePlanTitle(formData.pestTypes)}
                    </strong>
                    <small className="booking-choice-sub">
                      {oneTimePlanSub(formData.pestTypes)}
                    </small>
                  </button>
                  <button
                    type="button"
                    disabled={!amcAvailable}
                    onClick={() => amcAvailable && handleChange('serviceType', 'amc')}
                    className={`booking-choice-card booking-choice-recommended${formData.serviceType === 'amc' ? ' is-selected' : ''}${!amcAvailable ? ' is-disabled booking-choice-unavailable' : ''}${bedBugsPrimaryPlan && !amcAvailable ? ' booking-choice-tall' : ''}`}
                    title={amcAvailable ? undefined : AMC_UNAVAILABLE_LABEL}
                    aria-disabled={!amcAvailable}
                  >
                    <strong className="booking-choice-title">
                      {amcAvailable ? (
                        'AMC — 3 Visits'
                      ) : (
                        <span className="booking-choice-title-row">
                          <svg
                            className="booking-lock-icon"
                            viewBox="0 0 16 16"
                            width="11"
                            height="11"
                            aria-hidden
                          >
                            <path
                              fill="currentColor"
                              d="M4.5 7V5.5a3.5 3.5 0 1 1 7 0V7h.75A1.75 1.75 0 0 1 14 8.75v4.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25v-4.5A1.75 1.75 0 0 1 3.75 7H4.5Zm1.5 0h4V5.5a2 2 0 1 0-4 0V7Z"
                            />
                          </svg>
                          AMC — 3 Visits
                        </span>
                      )}
                    </strong>
                    <small className="booking-choice-sub">
                      {amcAvailable ? '12-month protection' : AMC_UNAVAILABLE_LABEL}
                    </small>
                    {!amcAvailable && (
                      <span className="booking-unavailable-badge">{AMC_UNAVAILABLE_BADGE}</span>
                    )}
                  </button>
                </div>
                {errors.serviceType && (
                  <p className="mt-1 text-[10px] font-semibold text-red-600">{errors.serviceType}</p>
                )}
              </div>
            )}

            <AddressInput
              label="Service Address *"
              value={formData.streetAddress}
              onChange={(value) => handleChange('streetAddress', value)}
              placeholder="Area, building or full address"
              inlineLocate
              className=""
              error={errors.streetAddress}
            />

            <div className="booking-grid-2 booking-grid-schedule">
              <div>
                <label htmlFor="preferred-date" className="booking-field-label">
                  Preferred Date *
                </label>
                <div className="booking-date-field">
                  <span className="booking-date-display" aria-hidden="true">
                    <span
                      className={
                        formatFriendlyPreferredDate(formData.preferredDate)
                          ? 'booking-date-value'
                          : 'booking-date-placeholder'
                      }
                    >
                      {formatFriendlyPreferredDate(formData.preferredDate) || 'Select date'}
                    </span>
                  </span>
                  <input
                    id="preferred-date"
                    type="date"
                    min={dateMin}
                    value={formData.preferredDate || ''}
                    onChange={(e) => handleChange('preferredDate', e.target.value)}
                    className="booking-input booking-date-native"
                    aria-label={
                      formatFriendlyPreferredDate(formData.preferredDate) || 'Preferred date'
                    }
                  />
                </div>
              </div>
              <div>
                <label htmlFor="preferred-time" className="booking-field-label">
                  Preferred Time *
                </label>
                <ClockTimePicker
                  id="preferred-time"
                  value={formData.preferredTime || ''}
                  onChange={(val) => handleChange('preferredTime', toPreferredTime(val))}
                />
              </div>
            </div>

            <div className="booking-grid-2 booking-grid-phone">
              <div>
                <label htmlFor="booking-name" className="booking-field-label">
                  Your Name *
                </label>
                <input
                  id="booking-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => {
                    if (isValidBookingMobile(formData.phone) && formData.name.trim()) {
                      queueSilentInquiry(formData);
                    }
                  }}
                  placeholder="Full name"
                  className={`booking-input${errors.name ? ' booking-input-error' : ''}`}
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="mt-1 text-[10px] font-semibold text-red-600">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="booking-phone" className="booking-field-label">
                  Mobile Number *
                </label>
                <div
                  className={`booking-phone-field${errors.phone ? ' booking-phone-field-error' : ''}`}
                >
                  <div className="booking-phone-prefix" aria-hidden="true">
                    <IndiaFlagIcon className="booking-phone-flag" />
                    <span className="booking-phone-prefix-code">+91</span>
                  </div>
                  <input
                    id="booking-phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      handleChange('phone', value);
                    }}
                    onBlur={() => {
                      if (isValidBookingMobile(formData.phone)) {
                        queueSilentInquiry(formData);
                      }
                    }}
                    placeholder="10 digits"
                    maxLength={10}
                    className="booking-phone-input"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'booking-phone-error' : undefined}
                  />
                </div>
                {errors.phone && (
                  <p
                    id="booking-phone-error"
                    className="mt-1 text-[10px] font-semibold text-red-600"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="booking-form-cta">
            <div className="booking-price-bar">
              <div className="booking-price-rate-copy">
                <span>{priceSummaryLabel}</span>
                {selectionsComplete && !isInspectionQuote && !pricePending && offerPrice > 0 ? (
                  <b>Price (Excluding GST)</b>
                ) : null}
                {selectionsComplete && pricePending && !isInspectionQuote ? (
                  <b>Price confirmation pending</b>
                ) : null}
              </div>
              <div className="booking-price-amounts">
                {catalogLoading ? (
                  <strong className="booking-price-discounted">…</strong>
                ) : isInspectionQuote ? (
                  <strong className="booking-price-discounted">Free visit</strong>
                ) : showPromoPricing ? (
                  <>
                    <span className="booking-price-actual">{formatInrWhole(listPrice)}</span>
                    <span className="booking-price-off">{discountPercent}% OFF</span>
                    <strong className="booking-price-discounted">{formatInrWhole(offerPrice)}</strong>
                  </>
                ) : selectionsComplete && !pricePending && offerPrice > 0 ? (
                  <strong className="booking-price-discounted">{formatInrWhole(offerPrice)}</strong>
                ) : selectionsComplete && pricePending ? (
                  <strong className="booking-price-discounted">On request</strong>
                ) : (
                  <strong className="booking-price-discounted">₹0</strong>
                )}
              </div>
            </div>

            <button type="submit" disabled={isSubmitting || otpSending} className="booking-submit-btn">
              {isSubmitting || otpSending ? (
                <>
                  <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Sending OTP…
                </>
              ) : isOtherPremiseSize ? (
                <>Call / WhatsApp for Quote →</>
              ) : (
                <>Confirm Booking →</>
              )}
            </button>
          </div>
        </form>
      </div>

      {infoModal && (
        <div
          className="booking-info-modal open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-info-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setInfoModal(null);
          }}
        >
          <div className="booking-info-sheet booking-treatment-info-sheet">
            <h3 id="booking-info-title">{TREATMENT_DETAILS[infoModal].title}</h3>
            <ul className="booking-treatment-info-list">
              {TREATMENT_DETAILS[infoModal].bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {TREATMENT_DETAILS[infoModal].whyChooseTitle &&
              TREATMENT_DETAILS[infoModal].whyChooseBody && (
                <div className="booking-treatment-why">
                  <h4>{TREATMENT_DETAILS[infoModal].whyChooseTitle}</h4>
                  <p>{TREATMENT_DETAILS[infoModal].whyChooseBody}</p>
                </div>
              )}
            <button type="button" onClick={() => setInfoModal(null)}>
              Got it
            </button>
          </div>
        </div>
      )}

      {otpModalOpen && (
        <div
          className="booking-info-modal open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-otp-title"
          onClick={(e) => {
            if (e.target === e.currentTarget && !otpVerifying) closeOtpModal();
          }}
        >
          <div className="booking-info-sheet booking-otp-sheet">
            <div className="booking-otp-header">
              <h3 id="booking-otp-title">Verify mobile number</h3>
              <button
                type="button"
                className="booking-otp-close"
                onClick={closeOtpModal}
                disabled={otpVerifying}
                aria-label="Close"
                title="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p>
              Enter the 4-digit OTP sent to{' '}
              <strong>+91 {otpMobile || formData.phone.replace(/\D/g, '')}</strong> to confirm your
              booking.
            </p>
            <p className="booking-otp-whatsapp-note">
              You&apos;ll receive the OTP on WhatsApp.
            </p>
            {otpHint ? <p className="booking-otp-hint">{otpHint}</p> : null}
            <label className="booking-otp-label" htmlFor="booking-otp-input">
              OTP
            </label>
            <input
              ref={otpInputRef}
              id="booking-otp-input"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={4}
              value={otpValue}
              onChange={(e) => {
                const next = e.target.value.replace(/\D/g, '').slice(0, 4);
                setOtpValue(next);
                if (otpError) setOtpError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  void handleVerifyOtpAndBook();
                }
              }}
              className="booking-otp-input"
              placeholder="••••"
              disabled={otpVerifying}
              aria-invalid={Boolean(otpError)}
            />
            {otpError ? <p className="booking-otp-error">{otpError}</p> : null}
            <button
              type="button"
              className="booking-otp-verify-btn"
              onClick={() => void handleVerifyOtpAndBook()}
              disabled={otpVerifying || otpSending || otpValue.replace(/\D/g, '').length !== 4}
            >
              {otpVerifying ? 'Confirming booking…' : 'Verify & Confirm Booking'}
            </button>
            <div className="booking-otp-actions">
              <button
                type="button"
                className="booking-otp-resend"
                onClick={() => void handleResendOtp()}
                disabled={resendCooldown > 0 || otpSending || otpVerifying}
              >
                {otpSending
                  ? 'Sending…'
                  : resendCooldown > 3
                    ? `Resend OTP in ${resendCooldown}s`
                    : 'Resend OTP'}
              </button>
            </div>
          </div>
        </div>
      )}

      {otherSizeModalOpen && (
        <div
          className="booking-info-modal open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-other-size-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOtherSizeModalOpen(false);
          }}
        >
          <div className="booking-info-sheet booking-other-size-sheet">
            <div className="booking-otp-header">
              <h3 id="booking-other-size-title">Need a custom quote?</h3>
              <button
                type="button"
                className="booking-otp-close"
                onClick={() => setOtherSizeModalOpen(false)}
                aria-label="Close"
                title="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p>
              For premise sizes outside our standard 1 RK–6 BHK list, talk to an agent for pricing.
              Online booking stays on hold until you get a quote.
            </p>
            <div className="booking-other-size-actions">
              <a
                href={whatsAppUrl(OTHER_PREMISE_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="booking-other-size-whatsapp"
              >
                WhatsApp
              </a>
              <a href={`tel:${BUSINESS.phoneTel}`} className="booking-other-size-call">
                Call {BUSINESS.phoneDisplay}
              </a>
            </div>
            <button type="button" className="booking-other-size-dismiss" onClick={() => setOtherSizeModalOpen(false)}>
              Keep browsing
            </button>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm">
          <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => {
                setShowSuccessPopup(false);
                setSubmitMessage('');
              }}
              className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-2xl font-bold text-gray-900">Request Received!</h3>
              <p className="leading-relaxed text-gray-600">{submitMessage}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={whatsAppUrl('Hi, I just submitted a booking request on your website.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-2.5 text-sm font-semibold text-white"
              >
                WhatsApp
              </a>
              <a
                href={`tel:${BUSINESS.phoneTel}`}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#092456] py-2.5 text-sm font-semibold text-white"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
