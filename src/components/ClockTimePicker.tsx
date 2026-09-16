import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { formatFriendlyTime, toClockDisplay } from '@/utils/clockTime';

type ClockTimePickerProps = {
  id?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
};

const HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const MINS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const R = 62;
const CX = 84;

function numCoords(idx: number, r: number) {
  const angle = ((idx / 12) * 360 - 90) * (Math.PI / 180);
  return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
}

function parseTime(val: string) {
  const display = toClockDisplay(val);
  if (display) {
    const m = display.match(/^(\d{2}):(\d{2})\s*(AM|PM)$/);
    if (m) {
      return {
        h: parseInt(m[1], 10),
        min: parseInt(m[2], 10),
        ampm: m[3] as 'AM' | 'PM',
      };
    }
  }
  return { h: 10, min: 0, ampm: 'AM' as const };
}

function ClockIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10 6.25V10l2.6 1.55"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function ClockTimePicker({
  id,
  value,
  onChange,
  placeholder = '-- : -- --',
  className = '',
}: ClockTimePickerProps) {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<'hour' | 'minute'>('hour');
  const { h: ph, min: pm, ampm: pa } = parseTime(value);
  const [hour, setHour] = useState(ph);
  const [minute, setMin] = useState(pm);
  const [ampm, setAmpm] = useState<'AM' | 'PM'>(pa);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const { h, min, ampm: nextAmpm } = parseTime(value);
    setHour(h);
    setMin(min);
    setAmpm(nextAmpm);
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const confirm = useCallback(
    (nextHour = hour, nextMinute = minute, nextAmpm = ampm) => {
      onChange(
        `${String(nextHour).padStart(2, '0')}:${String(nextMinute).padStart(2, '0')} ${nextAmpm}`
      );
      setOpen(false);
    },
    [hour, minute, ampm, onChange]
  );

  const openPicker = () => {
    const parsed = parseTime(value);
    setHour(parsed.h);
    setMin(parsed.min);
    setAmpm(parsed.ampm);
    setMode('hour');
    setOpen((o) => !o);
  };

  const closePicker = () => setOpen(false);

  const display = formatFriendlyTime(value);
  const items = mode === 'hour' ? HOURS : MINS;
  const selItem = mode === 'hour' ? hour : minute;
  const selIdx = items.indexOf(selItem);
  const { x: hx, y: hy } = selIdx >= 0 ? numCoords(selIdx, R) : { x: 0, y: 0 };

  const modal =
    open && mounted
      ? createPortal(
          <div
            className="clock-time-overlay"
            role="presentation"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closePicker();
            }}
          >
            <div
              ref={panelRef}
              className="clock-time-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <h2 id={titleId} className="sr-only">
                Select preferred time
              </h2>

              <div className="clock-time-header">
                <div className="clock-time-display">
                  <button
                    type="button"
                    onClick={() => setMode('hour')}
                    className={`clock-time-digit${mode === 'hour' ? ' is-active' : ''}`}
                  >
                    {String(hour).padStart(2, '0')}
                  </button>
                  <span className="clock-time-colon">:</span>
                  <button
                    type="button"
                    onClick={() => setMode('minute')}
                    className={`clock-time-digit${mode === 'minute' ? ' is-active' : ''}`}
                  >
                    {String(minute).padStart(2, '0')}
                  </button>
                </div>
                <div className="clock-time-ampm">
                  <button
                    type="button"
                    onClick={() => setAmpm('AM')}
                    className={`clock-ampm-btn${ampm === 'AM' ? ' is-active' : ''}`}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setAmpm('PM')}
                    className={`clock-ampm-btn${ampm === 'PM' ? ' is-active' : ''}`}
                  >
                    PM
                  </button>
                </div>
              </div>

              <div className="clock-time-face">
                <svg width={168} height={168} viewBox="0 0 168 168" className="select-none">
                  <circle cx={CX} cy={CX} r={80} fill="#E8F5EE" />
                  {selIdx >= 0 && (
                    <>
                      <line
                        x1={CX}
                        y1={CX}
                        x2={CX + hx}
                        y2={CX + hy}
                        stroke="#0E8345"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                      />
                      <circle cx={CX} cy={CX} r={3.5} fill="#0D2167" />
                    </>
                  )}
                  {items.map((num, idx) => {
                    const { x, y } = numCoords(idx, R);
                    const active = num === selItem;
                    return (
                      <g
                        key={`${mode}-${num}`}
                        className="cursor-pointer"
                        onClick={() => {
                          if (mode === 'hour') {
                            setHour(num);
                            window.setTimeout(() => setMode('minute'), 160);
                          } else {
                            setMin(num);
                            confirm(hour, num, ampm);
                          }
                        }}
                      >
                        <circle
                          cx={CX + x}
                          cy={CX + y}
                          r={14}
                          fill={active ? '#0E8345' : 'transparent'}
                        />
                        <text
                          x={CX + x}
                          y={CX + y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={mode === 'minute' ? '10' : '12'}
                          fontWeight="800"
                          fill={active ? '#fff' : '#0D2167'}
                        >
                          {mode === 'minute' ? String(num).padStart(2, '0') : num}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <p className="clock-time-hint">
                {mode === 'hour' ? 'Tap hour, then minutes' : '5-minute steps'}
              </p>

              <div className="clock-time-footer">
                <button type="button" className="clock-time-cancel" onClick={closePicker}>
                  Cancel
                </button>
                <div className="clock-time-footer-actions">
                  {mode === 'minute' && (
                    <button type="button" className="clock-time-back" onClick={() => setMode('hour')}>
                      ← Hour
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <div className={`clock-time-picker ${className}`}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        onClick={openPicker}
        className="booking-input booking-time-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Preferred time"
      >
        <span className="booking-input-icon booking-input-icon--clock" aria-hidden>
          <ClockIcon />
        </span>
        <span className={display ? 'booking-time-value' : 'booking-time-placeholder'}>
          {display || placeholder}
        </span>
        <span className="booking-input-icon booking-input-icon--chevron" aria-hidden>
          <ChevronIcon />
        </span>
      </button>
      {modal}
    </div>
  );
}
