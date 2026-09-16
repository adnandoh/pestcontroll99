/**
 * Bridges ClockTimePicker 12h display ("02:30 PM") with optional 24h "HH:MM"
 * values that may already be in form storage from the old native time input.
 */

const DISPLAY_12H = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
const STORED_24H = /^(\d{1,2}):(\d{2})(?::\d{2})?$/;

/** Matches ClockTimePicker minute dial (0, 5, …, 55). */
export const CLOCK_MINUTE_STEP = 5;

/**
 * Earliest bookable preferred start in the customer's local timezone.
 * Slots from 12:00 AM through 7:59 AM are not offered; defaults land on 8:00 AM.
 */
export const EARLIEST_BOOKABLE_HOUR = 8;

const MONTH_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
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
 * Friendly date label for the booking field, e.g. `Today • 15 Sep` (compact)
 * or `16 Sep 2026` for other dates. Value remains `YYYY-MM-DD` for the API.
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

/** Minutes from local midnight for a Date. */
export function localMinutesSinceMidnight(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

/** True when local wall-clock is before the earliest bookable hour (08:00). */
export function isBeforeEarliestBookable(date: Date): boolean {
  return localMinutesSinceMidnight(date) < EARLIEST_BOOKABLE_HOUR * 60;
}

/** 12h clock hour + AM/PM → whether that wall time is bookable (≥ 08:00). */
export function isBookableClockHour(hour12: number, ampm: 'AM' | 'PM'): boolean {
  if (ampm === 'PM') return true;
  // AM: 12 (midnight) and 1–7 are blocked; 8–11 are allowed.
  return hour12 >= EARLIEST_BOOKABLE_HOUR && hour12 <= 11;
}

/** Display/12h/24h string → bookable (≥ 08:00 local). Empty/invalid → false. */
export function isBookablePreferredTime(value: string | null | undefined): boolean {
  const t24 = toBookingTime24(value);
  if (!t24) return false;
  const [h, m] = t24.split(':').map(Number);
  return h * 60 + m >= EARLIEST_BOOKABLE_HOUR * 60;
}

function formatPreferredTimeFromParts(hour24: number, minute: number): string {
  const period = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 || 12;
  return `${String(hour12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${period}`;
}

/**
 * Preferred booking defaults (customer local timezone):
 * - 12:00 AM–7:59 AM → 8:00 AM same day
 * - 8:00 AM onward → now + 1 hour, rounded up to the clock picker's 5-minute step
 * If now+1h lands before 08:00 (e.g. 11:30 PM → 12:30 AM), bump to 8:00 AM on that date.
 * Example: 10:00 am → 11:00 AM (shown as "11:00 am").
 */
export function getDefaultPreferredSchedule(now: Date = new Date()): {
  preferredDate: string;
  preferredTime: string;
} {
  let target: Date;

  if (isBeforeEarliestBookable(now)) {
    target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), EARLIEST_BOOKABLE_HOUR, 0, 0, 0);
  } else {
    target = new Date(now.getTime() + 60 * 60 * 1000);
    const roundedMinutes =
      Math.ceil(target.getMinutes() / CLOCK_MINUTE_STEP) * CLOCK_MINUTE_STEP;
    target.setMinutes(roundedMinutes, 0, 0);
    if (isBeforeEarliestBookable(target)) {
      target = new Date(
        target.getFullYear(),
        target.getMonth(),
        target.getDate(),
        EARLIEST_BOOKABLE_HOUR,
        0,
        0,
        0,
      );
    }
  }

  return {
    preferredDate: formatLocalDateYYYYMMDD(target),
    preferredTime: formatPreferredTimeFromParts(target.getHours(), target.getMinutes()),
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
