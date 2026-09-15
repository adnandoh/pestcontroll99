import { getApiBase, getCrmSubmitBases } from '@/config/env';
import type { CatalogResponse } from '@/utils/catalogPricing';

export type WebsiteBookingPayload = {
  full_name: string;
  mobile: string;
  service_type: string;
  package_tier: 'standard' | 'premium';
  property_type: string;
  bhk_size: string;
  address: string;
  full_address?: string;
  city: string;
  area?: string;
  booking_type: 'one_time' | 'amc';
  pricing_rate_id?: number | null;
  price_confirmation_pending?: boolean;
  notes?: string;
  booking_date?: string;
  booking_time?: string;
  timezone?: string;
  time_slot?: string;
  schedule_datetime?: string;
  latitude?: string | number | null;
  longitude?: string | number | null;
  otp_verification_token: string;
  booking_session_id?: string;
  inquiry_id?: number | null;
};

export type WebsiteBookingResult = {
  id: number;
  code?: string;
  service_type?: string;
  client_name?: string;
  price?: string;
  total_amount?: string;
  schedule_datetime?: string | null;
  bhk_size?: string;
  booking_type?: string;
  package_tier?: string;
  notes?: string;
  price_confirmation_pending?: boolean;
};

export type BookingOtpSendResult = {
  message: string;
  mobile: string;
  purpose: string;
  expires_in: number;
  delivery: string;
  resend_after?: number;
  dev_otp?: string;
};

export type BookingOtpVerifyResult = {
  message: string;
  mobile: string;
  purpose: string;
  otp_verification_token: string;
  expires_in: number;
};

export type ApiResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  retry_after?: number;
  errors?: Record<string, string[] | string>;
};

function apiPath(baseUrl: string, path: string): string {
  if (!baseUrl) return path;
  return `${baseUrl}${path}`;
}

function formatError(result: unknown, status: number, fallback: string): string {
  const errorResult = result as {
    message?: string;
    detail?: string;
    error?: string;
    errors?: Record<string, string[] | string>;
  };

  if (errorResult.errors && typeof errorResult.errors === 'object') {
    const first = Object.values(errorResult.errors)[0];
    if (Array.isArray(first) && first[0]) return String(first[0]);
    if (typeof first === 'string') return first;
  }

  return (
    errorResult.message ||
    errorResult.detail ||
    errorResult.error ||
    `${fallback} (HTTP ${status})`
  );
}

class CustomerBookingApiService {
  async fetchCatalog(city?: string): Promise<ApiResult<CatalogResponse>> {
    const bases = getCrmSubmitBases();
    let lastError = 'Failed to load pricing catalog';

    for (const base of bases) {
      try {
        const qs = city ? `?city=${encodeURIComponent(city)}` : '';
        const response = await fetch(apiPath(base, `/api/customer/catalog/${qs}`), {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          lastError = formatError(result, response.status, 'Failed to load pricing catalog');
          continue;
        }
        return {
          success: true,
          data: {
            regions: result.regions || [],
            results: Array.isArray(result.results) ? result.results : [],
          },
        };
      } catch (err) {
        lastError = err instanceof Error ? err.message : 'Network error loading catalog';
      }
    }

    return { success: false, error: lastError };
  }

  async sendBookingOtp(
    mobile: string,
    fullName?: string,
  ): Promise<ApiResult<BookingOtpSendResult>> {
    const primary = getApiBase();
    const bases = primary ? [primary] : [''];
    let lastError = 'Failed to send OTP';

    for (const base of bases) {
      try {
        const response = await fetch(apiPath(base, '/api/customer/otp/send/'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            mobile,
            purpose: 'website_booking',
            full_name: fullName || '',
          }),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          lastError = formatError(result, response.status, 'Failed to send OTP');
          return {
            success: false,
            error: lastError,
            code: typeof result.code === 'string' ? result.code : undefined,
            retry_after:
              typeof result.retry_after === 'number' ? result.retry_after : undefined,
            errors: result.errors,
          };
        }
        return {
          success: true,
          data: {
            message: result.message || 'OTP sent successfully.',
            mobile: result.mobile || mobile,
            purpose: result.purpose || 'website_booking',
            expires_in: Number(result.expires_in) || 300,
            delivery: result.delivery || 'queued',
            resend_after:
              typeof result.resend_after === 'number' ? result.resend_after : undefined,
            dev_otp: typeof result.dev_otp === 'string' ? result.dev_otp : undefined,
          },
        };
      } catch (err) {
        lastError = err instanceof Error ? err.message : 'Network error sending OTP';
      }
    }

    return { success: false, error: lastError };
  }

  async verifyBookingOtp(
    mobile: string,
    otp: string,
  ): Promise<ApiResult<BookingOtpVerifyResult>> {
    const primary = getApiBase();
    const bases = primary ? [primary] : [''];
    let lastError = 'Failed to verify OTP';

    for (const base of bases) {
      try {
        const response = await fetch(apiPath(base, '/api/customer/otp/verify/'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            mobile,
            otp,
            purpose: 'website_booking',
          }),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          lastError = formatError(result, response.status, 'Failed to verify OTP');
          return {
            success: false,
            error: lastError,
            code: typeof result.code === 'string' ? result.code : undefined,
            errors: result.errors,
          };
        }
        if (!result.otp_verification_token) {
          return {
            success: false,
            error: 'Verification succeeded but no booking token was issued.',
          };
        }
        return {
          success: true,
          data: {
            message: result.message || 'Mobile verified.',
            mobile: result.mobile || mobile,
            purpose: result.purpose || 'website_booking',
            otp_verification_token: result.otp_verification_token,
            expires_in: Number(result.expires_in) || 600,
          },
        };
      } catch (err) {
        lastError = err instanceof Error ? err.message : 'Network error verifying OTP';
      }
    }

    return { success: false, error: lastError };
  }

  async createWebsiteBooking(
    payload: WebsiteBookingPayload,
  ): Promise<ApiResult<{ message: string; booking: WebsiteBookingResult }>> {
    // Prefer local/primary only for writes — never silently create production bookings from local UI.
    const primary = getApiBase();
    const bases = primary ? [primary] : [''];
    let lastError = 'Failed to create booking';

    for (const base of bases) {
      try {
        const response = await fetch(apiPath(base, '/api/customer/website-bookings/'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          lastError = formatError(result, response.status, 'Failed to create booking');
          if (result.errors || result.code) {
            return {
              success: false,
              error: lastError,
              code: typeof result.code === 'string' ? result.code : undefined,
              errors: result.errors,
            };
          }
          continue;
        }
        return {
          success: true,
          data: {
            message: result.message || 'Booking created.',
            booking: result.booking,
          },
        };
      } catch (err) {
        lastError = err instanceof Error ? err.message : 'Network error creating booking';
      }
    }

    return { success: false, error: lastError };
  }
}

export const customerBookingApi = new CustomerBookingApiService();
