import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './homeBookingForm.css';
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
import { personNameValidationError, sanitizePersonNameInput } from '@/utils/personName';
import { customerBookingApi } from '@/services/customerBookingApi';
import { rotateBookingSession } from '@/utils/bookingSession';
import {
  calculateCatalogQuotePrice,
  type CatalogRate,
} from '@/utils/catalogPricing';
import ClockTimePicker from './ClockTimePicker';
import { AddressInput } from './GoogleMaps';
import IndiaFlagIcon from './icons/IndiaFlagIcon';
import { BUSINESS, whatsAppUrl } from '@/config/business';
import {
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

const PEST_CARDS = [
  { value: 'cockroach-ants', label: 'Cockroach & Ants', image: '/images/booking-pests/cockroach.jpg' },
  { value: 'bedbugs', label: 'Bed Bugs', image: '/images/booking-pests/bedbug.jpg' },
  { value: 'termite', label: 'Termite', image: '/images/booking-pests/termite.jpg' },
  { value: 'rodent', label: 'Rodent', image: '/images/booking-pests/rodent.jpg' },
  { value: 'mosquito', label: 'Mosquito', image: '/images/booking-pests/mosquito.jpg' },
  { value: 'wood-borer', label: 'Wood Borer', image: '/images/booking-pests/woodborer.jpg' },
] as const;

const HOME_SIZE_CHIPS = [
  { value: '1rk', label: '1RK' },
  { value: '1bhk', label: '1BHK' },
  { value: '2bhk', label: '2BHK' },
  { value: '3bhk', label: '3BHK' },
  { value: '4bhk', label: '4BHK' },
] as const;

function Tick() {
  return <i className="pc-tick" aria-hidden="true" />;
}

function CheckLine() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8.2 6.2 11.3 13 4.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
  }, [defaultCity, catalogReloadKey]);

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
  const [homeKind, setHomeKind] = useState<'flat' | 'villa'>('flat');
  const [infoModal, setInfoModal] = useState<'standard' | 'premium' | null>(null);
  const [otherSizeModalOpen, setOtherSizeModalOpen] = useState(false);

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
  /** Always-current form for blur handlers (avoids stale 9-digit closure on 10th digit). */
  const formDataRef = useRef(formData);
  formDataRef.current = formData;

  // Fresh session per form mount so refresh / reopen creates + Telegram-notifies
  // again instead of silently updating the previous session lead (HTTP 200).
  useEffect(() => {
    rotateBookingSession();
    lastInquiryFingerprintRef.current = '';
    pendingInquiryDataRef.current = null;
    inquiryInFlightRef.current = false;
  }, []);

  const queueSilentInquiry = useCallback(
    (data: HomeFormData) => {
      if (!isValidBookingMobile(data.phone)) return;

      // Omit estimatedPrice — catalog load updates price after phone entry and used
      // to reset the debounce / re-fingerprint without changing the lead payload.
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

  // Fast path: as soon as mobile becomes a valid 10-digit number, capture the lead
  // (~300ms) so CRM + Telegram fire without waiting for blur or other field edits.
  useEffect(() => {
    if (!isValidBookingMobile(formData.phone)) return;
    const timer = window.setTimeout(() => {
      queueSilentInquiry(formDataRef.current);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [formData.phone, queueSilentInquiry]);

  // Debounced silent CRM capture for later edits (name/address/options) on the
  // same session lead — no duplicate Telegram (backend create-only notify).
  useEffect(() => {
    if (!isValidBookingMobile(formData.phone)) return;
    const timer = window.setTimeout(() => {
      queueSilentInquiry(formData);
    }, 600);
    return () => window.clearTimeout(timer);
  }, [formData, queueSilentInquiry]);

  const isInspectionQuote =
    formData.premiseType === 'commercial' || formData.pestTypes.includes('hotel-commercial');
  const isOtherPremiseSize = formData.premiseSize === 'other';
  const residentialBooking = formData.premiseType === 'residential' && !isInspectionQuote;
  const amcAvailable = amcAvailableForPests(formData.pestTypes);
  const showTreatmentQuality = showTreatmentQualityForPests(formData.pestTypes);
  const bedBugsPrimaryPlan = isBedBugsPrimaryPlan(formData.pestTypes);

  const dateMin = formatLocalDateYYYYMMDD(new Date());

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

    {
      const nameErr = personNameValidationError(formData.name, { required: true });
      if (nameErr) newErrors.name = nameErr;
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
      setOtpHint(otpSend.devOtp ? `Local DEBUG OTP: ${otpSend.devOtp}` : '');
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
      setOtpHint(otpSend.devOtp ? `Local DEBUG OTP: ${otpSend.devOtp}` : '');
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

    // Phone clear / replace → new session so staff get a fresh Website Lead + Telegram.
    if (field === 'phone') {
      const nextDigits = String(value || '').replace(/\D/g, '').slice(0, 10);
      const prevDigits = String(formDataRef.current.phone || '').replace(/\D/g, '');
      const clearedFully = isValidBookingMobile(prevDigits) && nextDigits.length === 0;
      const replacedValid =
        isValidBookingMobile(prevDigits) &&
        isValidBookingMobile(nextDigits) &&
        prevDigits !== nextDigits;
      if (clearedFully || replacedValid) {
        rotateBookingSession();
        lastInquiryFingerprintRef.current = '';
        pendingInquiryDataRef.current = null;
        inquiryInFlightRef.current = false;
      } else if (!isValidBookingMobile(nextDigits)) {
        // Partial edit (e.g. fix last digit) — allow upsert to re-fire when valid again.
        lastInquiryFingerprintRef.current = '';
      }
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

  const priceSummaryLabel = (() => {
    if (!selectionsComplete) return 'Select options for price';
    if (isOtherPremiseSize) return 'Custom quote — call / WhatsApp';
    if (isInspectionQuote) return 'Site inspection';
    if (formData.serviceType === 'amc') {
      const quality = formData.treatmentQuality === 'premium' ? 'Premium' : 'Standard';
      const services = formData.pestTypes.length > 1 ? ` • ${formData.pestTypes.length} services` : '';
      return `${quality} AMC • 3 visits${services}`;
    }
    if (formData.serviceType === 'one-time') {
      if (bedBugsPrimaryPlan) return '2-Service Package • 2 visits';
      if (showTreatmentQuality) {
        const quality = formData.treatmentQuality === 'premium' ? 'Premium' : 'Standard';
        const services = formData.pestTypes.length > 1 ? ` • ${formData.pestTypes.length} services` : '';
        return `${quality} • One-Time${services}`;
      }
      if (formData.pestTypes.length > 1) return `${formData.pestTypes.length} services • One-Time`;
      return 'One-Time service';
    }
    return 'Select options for price';
  })();

  const showPromoPricing =
    selectionsComplete &&
    !isInspectionQuote &&
    !pricePending &&
    !catalogLoading &&
    offerPrice > 0 &&
    listPrice > offerPrice &&
    discountPercent > 0;

  const showExclGstLabel =
    selectionsComplete && !isInspectionQuote && !pricePending && !catalogLoading && offerPrice > 0;

  const title = formTitle || 'Book Your Service';

  return (
    <section id="get-quote" className="booking-form-section scroll-mt-24 pc-book-section">
      <div data-hero-form-card="" className="booking-form-card pc-book">
        <div className="pc-title-row">
          <h2 className="pc-title">{title}</h2>
        </div>
        {formSubtitle ? <p className="booking-form-subtitle">{formSubtitle}</p> : null}

        {catalogError ? (
          <div className="mb-2 rounded-[10px] border border-amber-200 bg-amber-50 p-2.5 text-xs font-semibold text-amber-900">
            <div>
              Live prices unavailable — booking may need staff price confirmation. {catalogError}
            </div>
            <button
              type="button"
              className="mt-1.5 text-[11px] font-bold underline underline-offset-2"
              disabled={catalogLoading}
              onClick={() => setCatalogReloadKey((k) => k + 1)}
            >
              {catalogLoading ? 'Retrying prices…' : 'Retry live prices'}
            </button>
          </div>
        ) : null}

        {submitMessage && !showSuccessPopup && (
          <div className="mb-2 rounded-[10px] border border-red-200 bg-red-50 p-2.5 text-xs font-semibold text-red-800">
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="booking-form-fields pc-form">
          <div className="booking-form-body pc-body">
            <div className="pc-seg" role="radiogroup" aria-label="Service category">
              <button
                type="button"
                className={`pc-seg-btn${formData.premiseType === 'residential' ? ' is-on' : ''}`}
                role="radio"
                aria-checked={formData.premiseType === 'residential'}
                onClick={() => handleChange('premiseType', 'residential')}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5.2v-6.2H10.2V21H5a1 1 0 0 1-1-1v-9.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
                Residential
                {formData.premiseType === 'residential' ? <Tick /> : null}
              </button>
              <button
                type="button"
                className={`pc-seg-btn${formData.premiseType === 'commercial' ? ' is-on' : ''}`}
                role="radio"
                aria-checked={formData.premiseType === 'commercial'}
                onClick={() => handleChange('premiseType', 'commercial')}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V6.5A1.5 1.5 0 0 1 5.5 5H14v15M14 9h4.5A1.5 1.5 0 0 1 20 10.5V20M4 20h16M7.5 8.5h2M7.5 12h2M7.5 15.5h2M16 13h1.5M16 16.5h1.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
                Commercial
                {formData.premiseType === 'commercial' ? <Tick /> : null}
              </button>
            </div>
            {errors.premiseType ? <p className="pc-error">{errors.premiseType}</p> : null}

            <p className="pc-label">What pest problem? <span className="pc-req">*</span></p>
            <div className="pc-pest-grid" role="group" aria-label="What pest problem?">
              {PEST_CARDS.map((pest) => {
                const on = formData.pestTypes.includes(pest.value);
                return (
                  <button
                    key={pest.value}
                    type="button"
                    className={`pc-pest${on ? ' is-on' : ''}`}
                    role="checkbox"
                    aria-checked={on}
                    onClick={() => {
                      const current = formData.pestTypes.filter((p) => p !== 'hotel-commercial');
                      const next = current.includes(pest.value)
                        ? current.filter((p) => p !== pest.value)
                        : [...current, pest.value];
                      handleChange('pestTypes', next);
                    }}
                  >
                    <span className="pc-pest-photo">
                      <img src={pest.image} alt="" />
                    </span>
                    <span className="pc-pest-name">{pest.label}</span>
                    {on ? <Tick /> : null}
                  </button>
                );
              })}
            </div>
            {errors.pestTypes ? <p className="pc-error">{errors.pestTypes}</p> : null}

            <p className="pc-label">Property type <span className="pc-req">*</span></p>
            <div className="pc-pair" role="radiogroup" aria-label="Property type">
              <button
                type="button"
                className={`pc-pair-btn${homeKind === 'flat' ? ' is-on' : ''}`}
                role="radio"
                aria-checked={homeKind === 'flat'}
                onClick={() => setHomeKind('flat')}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V7.5L12 4l7 3.5V20M9 20v-4.5h6V20M9 9.5h.01M12 9.5h.01M15 9.5h.01M9 13h.01M12 13h.01M15 13h.01" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Flat
                {homeKind === 'flat' ? <Tick /> : null}
              </button>
              <button
                type="button"
                className={`pc-pair-btn${homeKind === 'villa' ? ' is-on' : ''}`}
                role="radio"
                aria-checked={homeKind === 'villa'}
                onClick={() => setHomeKind('villa')}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 11 12 4l8.5 7M6 10.5V20h12v-9.5M10 20v-5h4v5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Villa
                {homeKind === 'villa' ? <Tick /> : null}
              </button>
            </div>

            <p className="pc-label">Home size</p>
            <div className="pc-sizes" role="radiogroup" aria-label="Home size">
              {HOME_SIZE_CHIPS.map((size) => {
                const on = formData.premiseSize === size.value;
                return (
                  <button
                    key={size.value}
                    type="button"
                    className={on ? 'is-on' : ''}
                    role="radio"
                    aria-checked={on}
                    disabled={!residentialBooking}
                    onClick={() => handleChange('premiseSize', size.value)}
                  >
                    {size.label}
                    {on ? <Tick /> : null}
                  </button>
                );
              })}
            </div>
            {errors.premiseSize ? <p className="pc-error">{errors.premiseSize}</p> : null}

            {residentialBooking && showTreatmentQuality ? (
              <>
                <p className="pc-label">Choose treatment <span className="pc-req">*</span></p>
                <div className="pc-treats" role="radiogroup" aria-label="Choose treatment">
                  <div
                    className={`pc-treat${formData.treatmentQuality === 'standard' ? ' is-on' : ''}`}
                    role="radio"
                    aria-checked={formData.treatmentQuality === 'standard'}
                    tabIndex={0}
                    onClick={() => handleChange('treatmentQuality', 'standard')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleChange('treatmentQuality', 'standard');
                      }
                    }}
                  >
                    <div className="pc-treat-head">
                      <strong>Standard</strong>
                      {formData.treatmentQuality === 'standard' ? <Tick /> : null}
                    </div>
                    <p><CheckLine />Spray + standard gel</p>
                    <p className="pc-treat-last">
                      <span><CheckLine />Kitchen items need removal</span>
                      <button
                        type="button"
                        className="pc-benefits"
                        onClick={(e) => {
                          e.stopPropagation();
                          setInfoModal('standard');
                        }}
                      >
                        Benefits
                      </button>
                    </p>
                  </div>
                  <div
                    className={`pc-treat${formData.treatmentQuality === 'premium' ? ' is-on' : ''}`}
                    role="radio"
                    aria-checked={formData.treatmentQuality === 'premium'}
                    tabIndex={0}
                    onClick={() => handleChange('treatmentQuality', 'premium')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleChange('treatmentQuality', 'premium');
                      }
                    }}
                  >
                    <div className="pc-treat-head">
                      <strong>Premium</strong>
                      {formData.treatmentQuality === 'premium' ? <Tick /> : null}
                    </div>
                    <p><CheckLine />Odourless gel</p>
                    <p className="pc-treat-last">
                      <span><CheckLine />No kitchen item removal</span>
                      <button
                        type="button"
                        className="pc-benefits"
                        onClick={(e) => {
                          e.stopPropagation();
                          setInfoModal('premium');
                        }}
                      >
                        Benefits
                      </button>
                    </p>
                  </div>
                </div>
                {errors.treatmentQuality ? <p className="pc-error">{errors.treatmentQuality}</p> : null}
              </>
            ) : null}

            {residentialBooking ? (
              <>
                <p className="pc-label">Service plan <span className="pc-req">*</span></p>
                <div className="pc-pair" role="radiogroup" aria-label="Service plan">
                  <button
                    type="button"
                    className={`pc-pair-btn pc-plan${formData.serviceType === 'one-time' ? ' is-on' : ''}`}
                    role="radio"
                    aria-checked={formData.serviceType === 'one-time'}
                    onClick={() => handleChange('serviceType', 'one-time')}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5.5" width="16" height="14.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M8 3.5v4M16 3.5v4M4 9.5h16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
                    <span className="pc-plan-copy">
                      <b>{oneTimePlanTitle(formData.pestTypes)}</b>
                      <small>{oneTimePlanSub(formData.pestTypes)}</small>
                    </span>
                    {formData.serviceType === 'one-time' ? <Tick /> : null}
                  </button>
                  <button
                    type="button"
                    className={`pc-pair-btn pc-plan${formData.serviceType === 'amc' ? ' is-on' : ''}${!amcAvailable ? ' is-disabled' : ''}`}
                    role="radio"
                    aria-checked={formData.serviceType === 'amc'}
                    aria-disabled={!amcAvailable}
                    disabled={!amcAvailable}
                    title={amcAvailable ? undefined : AMC_UNAVAILABLE_LABEL}
                    onClick={() => amcAvailable && handleChange('serviceType', 'amc')}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.2-5.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><path d="M20 4.5V9h-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span className="pc-plan-copy">
                      <b>AMC</b>
                      <small>{amcAvailable ? 'Annual plan' : AMC_UNAVAILABLE_LABEL}</small>
                    </span>
                    {formData.serviceType === 'amc' ? <Tick /> : null}
                    {!amcAvailable ? <span className="pc-unavail">{AMC_UNAVAILABLE_BADGE}</span> : null}
                  </button>
                </div>
                {errors.serviceType ? <p className="pc-error">{errors.serviceType}</p> : null}
              </>
            ) : null}

            <AddressInput
              label=""
              value={formData.streetAddress}
              onChange={(value) => handleChange('streetAddress', value)}
              placeholder="Area, building & full address"
              inlineLocate
              className="pc-address-input"
              error={errors.streetAddress}
            />

            <div className="pc-split">
              <label className={`pc-field${errors.preferredDate ? ' is-invalid' : ''}`} htmlFor="preferred-date">
                <span className="pc-sr">Preferred date, required</span>
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5.5" width="16" height="14.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M8 3.5v4M16 3.5v4M4 9.5h16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
                <input
                  id="preferred-date"
                  name="preferredDate"
                  type="date"
                  min={dateMin}
                  value={formData.preferredDate || ''}
                  onChange={(e) => handleChange('preferredDate', e.target.value)}
                />
                <span className="pc-field-face">
                  {formatFriendlyPreferredDate(formData.preferredDate) || 'Select date'}
                </span>
                <svg className="pc-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </label>
              <div className={`pc-field pc-time${errors.preferredTime ? ' is-invalid' : ''}`}>
                <ClockTimePicker
                  id="preferred-time"
                  value={formData.preferredTime || ''}
                  onChange={(val) => handleChange('preferredTime', toPreferredTime(val))}
                  className="pc-clock"
                />
              </div>
            </div>
            {errors.preferredDate || errors.preferredTime ? (
              <p className="pc-error">{errors.preferredDate || errors.preferredTime}</p>
            ) : null}

            <div className="pc-split">
              <label className={`pc-field${errors.name ? ' is-invalid' : ''}`} htmlFor="booking-name">
                <span className="pc-sr">Your name, required</span>
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.2" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M5.5 19.2c1.2-2.8 3.5-4.2 6.5-4.2s5.3 1.4 6.5 4.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
                <input
                  id="booking-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    const cleaned = sanitizePersonNameInput(e.target.value);
                    handleChange('name', cleaned);
                    if (errors.name) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.name;
                        return next;
                      });
                    }
                  }}
                  onBlur={() => {
                    const latest = formDataRef.current;
                    if (isValidBookingMobile(latest.phone) && latest.name.trim()) {
                      queueSilentInquiry(latest);
                    }
                  }}
                  placeholder="Full name"
                  autoComplete="name"
                  inputMode="text"
                  autoCapitalize="words"
                />
              </label>
              <label className={`pc-field pc-phone${errors.phone ? ' is-invalid' : ''}`} htmlFor="booking-phone">
                <span className="pc-sr">Mobile number, required</span>
                <IndiaFlagIcon className="pc-flag" />
                <span className="pc-cc">+91</span>
                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    handleChange('phone', value);
                  }}
                  onBlur={() => {
                    const latest = formDataRef.current;
                    if (isValidBookingMobile(latest.phone)) {
                      queueSilentInquiry(latest);
                    }
                  }}
                  placeholder="10-digit number"
                  maxLength={10}
                  aria-invalid={Boolean(errors.phone)}
                />
              </label>
            </div>
            {errors.name || errors.phone ? (
              <p className="pc-error">{errors.name || errors.phone}</p>
            ) : null}
          </div>

          <div className="booking-form-cta pc-cta">
            <div className="pc-price">
              <div className="pc-price-copy">
                <span>{priceSummaryLabel}</span>
                {showExclGstLabel ? <b>Price (Excluding GST)</b> : null}
              </div>
              <div className="pc-price-amounts">
                {catalogLoading ? (
                  <strong className="pc-price-now">…</strong>
                ) : isInspectionQuote ? (
                  <strong className="pc-price-now">Free visit</strong>
                ) : showPromoPricing ? (
                  <>
                    <span className="pc-price-was">{formatInrWhole(listPrice)}</span>
                    <span className="pc-price-off">{discountPercent}% OFF</span>
                    <strong className="pc-price-now">{formatInrWhole(offerPrice)}</strong>
                  </>
                ) : selectionsComplete && !pricePending && offerPrice > 0 ? (
                  <strong className="pc-price-now">{formatInrWhole(offerPrice)}</strong>
                ) : selectionsComplete && (pricePending || isOtherPremiseSize) ? (
                  <strong className="pc-price-now">On request</strong>
                ) : (
                  <strong className="pc-price-now">₹0</strong>
                )}
              </div>
            </div>

            <button type="submit" disabled={isSubmitting || otpSending} className="pc-confirm">
              {isSubmitting || otpSending ? 'Sending OTP…' : isOtherPremiseSize ? 'Call / WhatsApp for Quote →' : 'Confirm Booking →'}
            </button>

            <section className="pc-deep" aria-label="Deep Cleaning Services">
              <div className="pc-deep-head">
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M6 14.2 16 6l10 8.2V26a1.4 1.4 0 0 1-1.4 1.4H7.4A1.4 1.4 0 0 1 6 26V14.2Z" fill="none" stroke="#1D4F91" strokeWidth="1.7" />
                  <path d="M13 27.4v-7h6v7" fill="none" stroke="#1D4F91" strokeWidth="1.7" />
                </svg>
                <div>
                  <strong>Deep Cleaning Services</strong>
                  <a href="https://www.deepcleaning99.com/" target="_blank" rel="noopener noreferrer">
                    Deepcleaning99.com
                  </a>
                </div>
              </div>
              <a className="pc-deep-book" href="https://www.deepcleaning99.com/" target="_blank" rel="noopener noreferrer">
                Book Deep Cleaning ↗
              </a>
              <ul className="pc-deep-services">
                <li>Full Home</li>
                <li>Kitchen</li>
                <li>Sofa</li>
                <li>Bathroom</li>
                <li>Mattress</li>
                <li>Carpet</li>
                <li>Office</li>
              </ul>
            </section>
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
              OTP sent to +91 {otpMobile || formData.phone.replace(/\D/g, '')} to confirm your
              booking.
            </p>
            <p className="booking-otp-whatsapp-note">
              OTP will be sent to your WhatsApp number. Please check WhatsApp only.
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
