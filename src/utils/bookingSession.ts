/** Browser session UUID linking HomeQuoteForm ↔ Website Inquiry ↔ booking. */

const SESSION_KEY = 'pest99_booking_session_id';
const INQUIRY_ID_KEY = 'pest99_booking_inquiry_id';

function createUuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `sess-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getBookingSessionId(): string {
  if (typeof window === 'undefined') {
    return createUuid();
  }
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing && existing.length >= 8) {
      return existing;
    }
    const next = createUuid();
    sessionStorage.setItem(SESSION_KEY, next);
    return next;
  } catch {
    return createUuid();
  }
}

export function getStoredInquiryId(): number | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(INQUIRY_ID_KEY);
    if (!raw) return null;
    const id = Number(raw);
    return Number.isFinite(id) && id > 0 ? id : null;
  } catch {
    return null;
  }
}

export function setStoredInquiryId(id: number): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(INQUIRY_ID_KEY, String(id));
  } catch {
    // ignore quota / private mode
  }
}

export function clearStoredInquiryId(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(INQUIRY_ID_KEY);
  } catch {
    // ignore
  }
}

export function readUtmParams(search?: string): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
} {
  if (typeof window === 'undefined' && !search) return {};
  try {
    const params = new URLSearchParams(search ?? window.location.search);
    const utm_source = params.get('utm_source') || undefined;
    const utm_medium = params.get('utm_medium') || undefined;
    const utm_campaign = params.get('utm_campaign') || undefined;
    return { utm_source, utm_medium, utm_campaign };
  } catch {
    return {};
  }
}
