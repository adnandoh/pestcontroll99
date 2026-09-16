import { crmApi, type InquiryTrackingOptions } from '@/services/crmApi';
import { customerBookingApi } from '@/services/customerBookingApi';
import {
  areaKeyForForm,
  calculateCatalogQuotePrice,
  type CatalogRate,
  PEST_SERVICE_LABELS,
} from '@/utils/catalogPricing';
import {
  bookingPlanLabelForNotes,
  showTreatmentQualityForPests,
} from '@/config/serviceOptions';
import { isBookablePreferredTime, resolveCityFromAddress, toBookingTime24, toPreferredTime } from '@/utils/clockTime';
import type { HomeFormData } from '@/utils/formStorage';
import {
  getBookingSessionId,
  getStoredInquiryId,
  readUtmParams,
  setStoredInquiryId,
} from '@/utils/bookingSession';

export function isValidBookingMobile(phone: string | undefined | null): boolean {
  return /^\d{10}$/.test(String(phone || '').replace(/\D/g, ''));
}

/**
 * Silent Website Lead upsert from the home booking form.
 * Failures are swallowed — never blocks Confirm Booking.
 */
export async function silentUpsertWebsiteInquiry(
  formData: Record<string, unknown>,
  tracking?: InquiryTrackingOptions,
): Promise<{ ok: true; inquiryId: number } | { ok: false }> {
  try {
    const cleanPhone = String(formData.phone || '').replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      return { ok: false };
    }

    const sessionId = getBookingSessionId();
    const utm = readUtmParams();
    const pageUrl =
      typeof window !== 'undefined' ? window.location.href.split('#')[0] : undefined;

    // Send the real name when known; omit placeholder so the backend can keep
    // an earlier real name and upgrade "Website Lead" once the customer types it.
    const customerName = String(formData.name || '').trim();

    const mapped = crmApi.mapFormDataToInquiry(
      {
        ...(formData as Parameters<typeof crmApi.mapFormDataToInquiry>[0]),
        phone: cleanPhone,
        name: customerName,
      },
      'home',
      {
        ...tracking,
        leadSource: tracking?.leadSource || 'Website Booking Form',
      },
    );

    const payload = {
      ...mapped,
      booking_session_id: sessionId,
      page_url: pageUrl,
      ...utm,
      remark: mapped.remark || 'Lead source: Website Booking Form',
    };

    const result = await crmApi.upsertWebsiteInquiry(payload);
    if (result.success && result.data?.id) {
      setStoredInquiryId(result.data.id);
      return { ok: true, inquiryId: result.data.id };
    }
    return { ok: false };
  } catch {
    return { ok: false };
  }
}

export async function submitContactForm(formData: {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
}) {
  const name = formData.name?.trim() || '';
  const message = formData.message?.trim() || '';

  if (name.length < 2) {
    return { ok: false, error: 'Name must be at least 2 characters long' };
  }

  const cleanPhone = formData.phone.replace(/\D/g, '');
  if (cleanPhone.length !== 10) {
    return { ok: false, error: 'Phone number must be exactly 10 digits' };
  }

  if (message.length < 10) {
    return { ok: false, error: 'Message must be at least 10 characters long' };
  }

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    return { ok: false, error: 'Please enter a valid email address' };
  }

  const crmData = {
    name,
    mobile: cleanPhone,
    email: formData.email,
    city: 'Mumbai',
    service_interest: formData.service || 'General Inquiry',
    message,
  };

  const validation = crmApi.validateInquiryData(crmData);
  if (!validation.isValid) {
    const firstError = Object.values(validation.errors)[0];
    return { ok: false, error: firstError || 'Please check your form' };
  }

  const crmResponse = await crmApi.submitInquiry(crmData);
  if (crmResponse.success) {
    return {
      ok: true,
      message: 'Contact form submitted successfully! We will get back to you soon.',
    };
  }

  return {
    ok: false,
    error: crmResponse.error || 'Failed to submit contact form',
  };
}

export type HomeInquirySubmitResult =
  | { ok: true; message: string }
  | { ok: false; error: string };

/** Classic quote/inquiry lead — POST /api/inquiries/ (not a website booking). */
export async function submitHomeInquiryForm(
  formData: Record<string, unknown>,
  tracking?: InquiryTrackingOptions,
): Promise<HomeInquirySubmitResult> {
  if (
    !formData.pestTypes ||
    !(formData.pestTypes as string[]).length ||
    !formData.phone
  ) {
    return { ok: false, error: 'Missing required fields' };
  }

  const name = String(formData.name || '').trim();
  if (name.length < 2) {
    return { ok: false, error: 'Name must be at least 2 characters long' };
  }

  const cleanPhone = String(formData.phone).replace(/\D/g, '');
  if (cleanPhone.length !== 10) {
    return { ok: false, error: 'Phone number must be exactly 10 digits' };
  }

  const inquiryData = crmApi.mapFormDataToInquiry(
    {
      ...(formData as Parameters<typeof crmApi.mapFormDataToInquiry>[0]),
      phone: cleanPhone,
      name,
    },
    'home',
    tracking,
  );
  const crmResult = await crmApi.submitInquiry(inquiryData);

  if (crmResult.success) {
    return {
      ok: true,
      message: 'Quote request submitted successfully! We will contact you soon.',
    };
  }

  return {
    ok: false,
    error: crmResult.error || 'Failed to submit quote request',
  };
}

export type HomeBookingSubmitResult =
  | {
      ok: true;
      message: string;
      bookingId?: number;
      bookingCode?: string;
      priceConfirmationPending?: boolean;
    }
  | { ok: false; error: string; code?: string };

export type HomeBookingOtpSendResult =
  | {
      ok: true;
      message: string;
      mobile: string;
      expiresIn: number;
      resendAfter: number;
      delivery: string;
      /** Only present when Django DEBUG=True — local testing aid. */
      devOtp?: string;
    }
  | { ok: false; error: string; code?: string; retryAfter?: number };

/** Send OTP for home website booking (before create). */
export async function sendHomeBookingOtp(
  formData: Record<string, unknown>,
): Promise<HomeBookingOtpSendResult> {
  const name = String(formData.name || '').trim();
  if (name.length < 2) {
    return { ok: false, error: 'Name must be at least 2 characters long' };
  }

  const cleanPhone = String(formData.phone || '').replace(/\D/g, '');
  if (cleanPhone.length !== 10) {
    return { ok: false, error: 'Phone number must be exactly 10 digits' };
  }

  const result = await customerBookingApi.sendBookingOtp(cleanPhone, name);
  if (result.success && result.data) {
    return {
      ok: true,
      message: result.data.message,
      mobile: result.data.mobile,
      expiresIn: result.data.expires_in,
      resendAfter: result.data.resend_after ?? 0,
      delivery: result.data.delivery,
      devOtp: result.data.dev_otp,
    };
  }

  return {
    ok: false,
    error: result.error || 'Failed to send OTP',
    code: result.code,
    retryAfter: result.retry_after,
  };
}

export type HomeBookingOtpVerifyResult =
  | { ok: true; otpVerificationToken: string; message: string; expiresIn: number }
  | { ok: false; error: string; code?: string };

/** Verify OTP and receive short-lived booking verification token. */
export async function verifyHomeBookingOtp(
  mobile: string,
  otp: string,
): Promise<HomeBookingOtpVerifyResult> {
  const cleanPhone = String(mobile || '').replace(/\D/g, '');
  const cleanOtp = String(otp || '').replace(/\D/g, '');
  if (cleanPhone.length !== 10) {
    return { ok: false, error: 'Phone number must be exactly 10 digits' };
  }
  if (cleanOtp.length !== 4) {
    return { ok: false, error: 'Enter the 4-digit OTP' };
  }

  const result = await customerBookingApi.verifyBookingOtp(cleanPhone, cleanOtp);
  if (result.success && result.data?.otp_verification_token) {
    return {
      ok: true,
      otpVerificationToken: result.data.otp_verification_token,
      message: result.data.message,
      expiresIn: result.data.expires_in,
    };
  }

  return {
    ok: false,
    error: result.error || 'Invalid OTP',
    code: result.code,
  };
}

/** Direct website booking — customer booking API (home Confirm Booking). Requires OTP token. */
export async function submitHomeBookingForm(
  formData: Record<string, unknown>,
  tracking?: InquiryTrackingOptions,
  catalogRates: CatalogRate[] = [],
  otpVerificationToken?: string,
): Promise<HomeBookingSubmitResult> {
  const pestTypesRaw = formData.pestTypes;
  const pestTypes = Array.isArray(pestTypesRaw)
    ? (pestTypesRaw as string[]).filter(Boolean)
    : [];
  const phoneRaw = formData.phone;

  if (pestTypes.length === 0) {
    return { ok: false, error: 'Please select at least one service' };
  }
  if (phoneRaw === undefined || phoneRaw === null || String(phoneRaw).trim() === '') {
    return { ok: false, error: 'Phone number is required' };
  }

  const token = (otpVerificationToken || '').trim();
  if (!token) {
    return {
      ok: false,
      error: 'Please verify the OTP sent to your mobile before confirming.',
      code: 'otp_verification_required',
    };
  }

  const name = String(formData.name || '').trim();
  if (name.length < 2) {
    return { ok: false, error: 'Name must be at least 2 characters long' };
  }

  const cleanPhone = String(phoneRaw).replace(/\D/g, '');
  if (cleanPhone.length !== 10) {
    return { ok: false, error: 'Phone number must be exactly 10 digits' };
  }

  const home = formData as unknown as HomeFormData;
  const address = (home.streetAddress || home.address || '').trim();
  if (address.length < 5) {
    return { ok: false, error: 'Please enter your service address' };
  }

  const preferredDate = (home.preferredDate || '').trim();
  const preferredTime = toPreferredTime(home.preferredTime || '');
  const bookingTime24 = toBookingTime24(preferredTime);
  if (!preferredDate) {
    return { ok: false, error: 'Please select a preferred date' };
  }
  if (!bookingTime24) {
    return { ok: false, error: 'Please select a preferred time' };
  }
  if (!isBookablePreferredTime(preferredTime)) {
    return {
      ok: false,
      error: 'Preferred time must be 8:00 AM or later. Overnight slots are not available.',
    };
  }

  const premiseType = home.premiseType;
  if (premiseType !== 'residential' && premiseType !== 'commercial') {
    return { ok: false, error: 'Please select Residential or Commercial' };
  }

  const isInspection =
    premiseType === 'commercial' || pestTypes.includes('hotel-commercial');

  const serviceType = home.serviceType;
  const treatmentQuality = home.treatmentQuality;
  const needsTreatmentQuality = showTreatmentQualityForPests(pestTypes);

  if (!isInspection) {
    if (!home.premiseSize) {
      return { ok: false, error: 'Please select a premise size' };
    }
    if (
      needsTreatmentQuality &&
      treatmentQuality !== 'standard' &&
      treatmentQuality !== 'premium'
    ) {
      return { ok: false, error: 'Please select treatment quality' };
    }
    if (serviceType !== 'amc' && serviceType !== 'one-time') {
      return { ok: false, error: 'Please select a service plan' };
    }
  }

  const planType = isInspection ? 'one-time' : serviceType!;
  // Non-cockroach path uses catalog default (standard); cockroach requires an explicit pick.
  const quality: 'standard' | 'premium' =
    isInspection || !needsTreatmentQuality
      ? treatmentQuality === 'premium'
        ? 'premium'
        : 'standard'
      : (treatmentQuality as 'standard' | 'premium');

  const quote = calculateCatalogQuotePrice({
    rates: catalogRates,
    pestTypes,
    premiseType,
    premiseSize: home.premiseSize,
    serviceType: planType,
    treatmentQuality: quality,
  });

  const city = resolveCityFromAddress(address, tracking?.defaultCity);
  const bhkSize = areaKeyForForm(premiseType, home.premiseSize);
  const propertyType =
    premiseType === 'commercial' ? 'Commercial Space' : 'Home / Flat';
  const bookingType = planType === 'amc' ? 'amc' : 'one_time';
  const qualityLabel = needsTreatmentQuality
    ? quality === 'premium'
      ? 'Premium'
      : 'Standard'
    : 'Standard';
  const planLabel = bookingPlanLabelForNotes(pestTypes, planType);
  const priceNote = quote.pricePending
    ? 'Inspection / on-request pricing'
    : `CRM ₹${quote.offerPrice} excl. GST`;
  const leadNote = tracking?.leadSource ? ` · Lead: ${tracking.leadSource}` : '';
  const serviceLabel =
    quote.serviceTypeLabel ||
    pestTypes.map((p) => PEST_SERVICE_LABELS[p] || p).join(', ');

  const payload = {
    full_name: name,
    mobile: cleanPhone,
    service_type: serviceLabel,
    package_tier: quote.packageTier,
    property_type: propertyType,
    bhk_size: bhkSize || (premiseType === 'commercial' ? 'Commercial' : ''),
    address,
    full_address: address,
    city,
    booking_type: bookingType as 'one_time' | 'amc',
    pricing_rate_id: quote.pricePending ? null : quote.pricingRateId,
    price_confirmation_pending: quote.pricePending,
    booking_date: preferredDate,
    booking_time: bookingTime24,
    timezone: 'Asia/Kolkata',
    time_slot: preferredTime,
    notes: `Website booking · ${
      premiseType === 'commercial' ? 'Commercial' : 'Home (Residential)'
    } · ${bhkSize || '—'} · ${qualityLabel} · ${planLabel} · ${preferredTime} · ${priceNote}${leadNote}`,
    otp_verification_token: token,
    booking_session_id: getBookingSessionId(),
    inquiry_id: getStoredInquiryId(),
  };

  // Best-effort refresh of inquiry details before booking (never blocks booking).
  try {
    await silentUpsertWebsiteInquiry(formData, {
      ...tracking,
      leadSource: tracking?.leadSource || 'Website Booking Form',
    });
  } catch {
    // ignore — booking must proceed even if CRM upsert fails
  }

  const result = await customerBookingApi.createWebsiteBooking({
    ...payload,
    inquiry_id: getStoredInquiryId(),
  });
  if (result.success && result.data?.booking) {
    return {
      ok: true,
      message: result.data.message || 'Booking confirmed.',
      bookingId: result.data.booking.id,
      bookingCode: result.data.booking.code,
      priceConfirmationPending: Boolean(result.data.booking.price_confirmation_pending),
    };
  }

  return {
    ok: false,
    error: result.error || 'Failed to create booking',
    code: result.code,
  };
}

export async function submitQuoteForm(formData: Record<string, unknown>) {
  const inquiryData = crmApi.mapFormDataToInquiry(
    formData as Parameters<typeof crmApi.mapFormDataToInquiry>[0],
    'quote',
  );
  const validation = crmApi.validateInquiryData(inquiryData);
  if (!validation.isValid) {
    const firstError = Object.values(validation.errors)[0];
    return { ok: false, error: firstError || 'Please check your form' };
  }

  const crmResult = await crmApi.submitInquiry(inquiryData);
  if (crmResult.success) {
    return {
      ok: true,
      message: 'Quote request submitted successfully! We will contact you soon.',
    };
  }

  return {
    ok: false,
    error: crmResult.error || 'Failed to submit quote request',
  };
}
