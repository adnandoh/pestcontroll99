/**
 * Unit tests for preferred booking time defaults / bookable window.
 * Run: npx --yes tsx --test src/utils/clockTime.test.ts
 */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  EARLIEST_BOOKABLE_HOUR,
  getDefaultPreferredSchedule,
  isBookableClockHour,
  isBookablePreferredTime,
  isBeforeEarliestBookable,
  toBookingTime24,
} from './clockTime.ts';

function localDate(
  y: number,
  mo: number,
  d: number,
  h: number,
  mi: number,
  s = 0,
): Date {
  return new Date(y, mo - 1, d, h, mi, s, 0);
}

describe('earliest bookable window', () => {
  it('blocks 12:00 AM–7:59 AM clock hours', () => {
    assert.equal(isBookableClockHour(12, 'AM'), false);
    assert.equal(isBookableClockHour(1, 'AM'), false);
    assert.equal(isBookableClockHour(7, 'AM'), false);
    assert.equal(isBookableClockHour(EARLIEST_BOOKABLE_HOUR, 'AM'), true);
    assert.equal(isBookableClockHour(11, 'AM'), true);
    assert.equal(isBookableClockHour(12, 'PM'), true);
    assert.equal(isBookableClockHour(1, 'PM'), true);
  });

  it('isBookablePreferredTime uses 08:00 cutoff', () => {
    assert.equal(isBookablePreferredTime('12:00 AM'), false);
    assert.equal(isBookablePreferredTime('02:00 AM'), false);
    assert.equal(isBookablePreferredTime('07:59 AM'), false);
    assert.equal(isBookablePreferredTime('08:00 AM'), true);
    assert.equal(isBookablePreferredTime('09:00 AM'), true);
    assert.equal(isBookablePreferredTime('02:00 PM'), true);
  });
});

describe('getDefaultPreferredSchedule', () => {
  it('defaults midnight / early morning to 8:00 AM same day', () => {
    const cases = [
      localDate(2026, 9, 16, 0, 0),
      localDate(2026, 9, 16, 2, 0),
      localDate(2026, 9, 16, 5, 30),
      localDate(2026, 9, 16, 7, 59),
    ];
    for (const now of cases) {
      assert.equal(isBeforeEarliestBookable(now), true);
      const { preferredDate, preferredTime } = getDefaultPreferredSchedule(now);
      assert.equal(preferredDate, '2026-09-16');
      assert.equal(preferredTime, '08:00 AM');
      assert.equal(toBookingTime24(preferredTime), '08:00');
    }
  });

  it('at 8:00 AM uses now + 1 hour', () => {
    const { preferredDate, preferredTime } = getDefaultPreferredSchedule(
      localDate(2026, 9, 16, 8, 0),
    );
    assert.equal(preferredDate, '2026-09-16');
    assert.equal(preferredTime, '09:00 AM');
    assert.equal(toBookingTime24(preferredTime), '09:00');
  });

  it('at 9:00 AM defaults to 10:00 AM', () => {
    const { preferredDate, preferredTime } = getDefaultPreferredSchedule(
      localDate(2026, 9, 16, 9, 0),
    );
    assert.equal(preferredDate, '2026-09-16');
    assert.equal(preferredTime, '10:00 AM');
  });

  it('afternoon defaults to now + 1 hour', () => {
    const { preferredDate, preferredTime } = getDefaultPreferredSchedule(
      localDate(2026, 9, 16, 14, 0),
    );
    assert.equal(preferredDate, '2026-09-16');
    assert.equal(preferredTime, '03:00 PM');
    assert.equal(toBookingTime24(preferredTime), '15:00');
  });

  it('late evening now+1h that lands before 08:00 bumps to 8:00 AM next day', () => {
    const { preferredDate, preferredTime } = getDefaultPreferredSchedule(
      localDate(2026, 9, 16, 23, 30),
    );
    assert.equal(preferredDate, '2026-09-17');
    assert.equal(preferredTime, '08:00 AM');
  });
});
