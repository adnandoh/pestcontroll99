/**
 * Bridges ClockTimePicker 12h display ("02:30 PM") with optional 24h "HH:MM"
 * values that may already be in form storage from the old native time input.
 */

const DISPLAY_12H = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
const STORED_24H = /^(\d{1,2}):(\d{2})(?::\d{2})?$/;

/** Matches ClockTimePicker minute dial (0, 5, …, 55). */
export const CLOCK_MINUTE_STEP = 5;

const MONTH_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
] as const;

/** Local calendar date as `YYYY-MM-DD` for `<input type="date">` / booking API. */
export function formatLocalDateYYYYMMDD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseLocalYYYYMMDD(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((value || '').trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  const date = new Date(y, mo, d);
  if (date.getFullYear() !== y || date.getMonth() !== mo || date.getDate() !== d) return null;
  return date;
}

/** Friendly trigger label: `9:00 am` (storage may still be `09:00 AM`). */
export function formatFriendlyTime(value: string | null | undefined): string {
  const display = toClockDisplay(value);
  if (!display) return '';
  const twelve = DISPLAY_12H.exec(display);
  if (!twelve) return '';
  const hour = Number(twelve[1]);
  return `${hour}:${twelve[2]} ${twelve[3].toLowerCase()}`;
}

/**
 * Friendly date label for the booking field, e.g. `Today • 15 Sept` (compact)
 * or `16 Sept 2026` for other dates. Value remains `YYYY-MM-DD` for the API.
 */
export function formatFriendlyPreferredDate(
  value: string | null | undefined,
  now: Date = new Date(),
): string {
  const date = parseLocalYYYYMMDD(value || '');
  if (!date) return '';

  const absolute = `${date.getDate()} ${MONTH_SHORT[date.getMonth()]} ${date.getFullYear()}`;
  const today = formatLocalDateYYYYMMDD(now);
  const tomorrowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const tomorrow = formatLocalDateYYYYMMDD(tomorrowDate);
  const iso = formatLocalDateYYYYMMDD(date);

  if (iso === today) return `Today • ${date.getDate()} ${MONTH_SHORT[date.getMonth()]}`;
  if (iso === tomorrow) return `Tomorrow • ${date.getDate()} ${MONTH_SHORT[date.getMonth()]}`;
  return absolute;
}

/**
 * Preferred booking defaults: local today, and local now + 1 hour rounded up to
 * the clock picker's 5-minute step. Crossing midnight rolls the date forward.
 * Example: 10:00 am → 11:00 AM (shown as "11:00 am").
 */
export function getDefaultPreferredSchedule(now: Date = new Date()): {
  preferredDate: string;
  preferredTime: string;
} {
  const target = new Date(now.getTime() + 60 * 60 * 1000);
  const roundedMinutes =
    Math.ceil(target.getMinutes() / CLOCK_MINUTE_STEP) * CLOCK_MINUTE_STEP;
  target.setMinutes(roundedMinutes, 0, 0);

  const hour24 = target.getHours();
  const minute = target.getMinutes();
  const period = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 || 12;
  const preferredTime = `${String(hour12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${period}`;

  return {
    preferredDate: formatLocalDateYYYYMMDD(target),
    preferredTime,
  };
}

/** 24h or empty → normalized picker/storage string (or '' for placeholder). */
export function toClockDisplay(value: string | null | undefined): string {
  const raw = (value ?? '').trim();
  if (!raw) return '';

  const twelve = DISPLAY_12H.exec(raw);
  if (twelve) {
    const hour = Number(twelve[1]);
    const minute = Number(twelve[2]);
    if (hour < 1 || hour > 12 || minute > 59) return '';
    return `${String(hour).padStart(2, '0')}:${twelve[2]} ${twelve[3].toUpperCase()}`;
  }

  const match = STORED_24H.exec(raw);
  if (!match) return '';

  const hour24 = Number(match[1]);
  const minute = Number(match[2]);
  if (hour24 > 23 || minute > 59) return '';

  const period = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 || 12;
  return `${String(hour12).padStart(2, '0')}:${match[2]} ${period}`;
}

/** Picker display (or 24h) → normalized 12h string for CRM notes / form state. */
export function toPreferredTime(display: string | null | undefined): string {
  return toClockDisplay(display);
}

/** Display/12h/24h → HH:MM 24-hour for booking API `booking_time`. */
export function toBookingTime24(value: string | null | undefined): string {
  const display = toClockDisplay(value);
  if (!display) return '';

  const twelve = DISPLAY_12H.exec(display);
  if (!twelve) return '';

  let hour = Number(twelve[1]);
  const minute = twelve[2];
  const period = twelve[3].toUpperCase();
  if (period === 'AM') {
    if (hour === 12) hour = 0;
  } else if (hour !== 12) {
    hour += 12;
  }
  return `${String(hour).padStart(2, '0')}:${minute}`;
}

/** Resolve city label from a free-text address (website heuristics). */
export function resolveCityFromAddress(address: string, defaultCity?: string): string {
  const addressLower = (address || '').toLowerCase();
  if (addressLower.includes('lonavala')) return 'Lonavala';
  if (addressLower.includes('khandala')) return 'Khandala';
  if (addressLower.includes('karjat')) return 'Karjat';
  if (defaultCity) return defaultCity;
  if (addressLower.includes('mumbai') || addressLower.includes('bombay')) return 'Mumbai';
  if (addressLower.includes('pune')) return 'Pune';
  if (addressLower.includes('navi mumbai') || addressLower.includes('new mumbai')) return 'Navi Mumbai';
  if (addressLower.includes('thane')) return 'Thane';

  const parts = address.split(',').map((part) => part.trim()).filter(Boolean);
  if (parts.length > 1) {
    return parts[parts.length - 1] || 'Mumbai';
  }
  return 'Mumbai';
}
