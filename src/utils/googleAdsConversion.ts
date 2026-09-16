/** Google Ads account + lead-form conversion (thank-you pages only). */
export const GOOGLE_ADS_ID = 'AW-17687478045';
export const GOOGLE_ADS_LEAD_CONVERSION_SEND_TO =
  'AW-17687478045/w87ECNKenawcEJ3-hfJB';

const SCRIPT_ID = 'google-ads-gtag-js';
const CONFIGURED_FLAG = '__pc99GoogleAdsConfigured';

type AdsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  [CONFIGURED_FLAG]?: boolean;
};

/** Survives React StrictMode remount; resets on full document reload. */
const firedConversionKeys = new Set<string>();

function ensureGtagFunction(win: AdsWindow): NonNullable<AdsWindow['gtag']> {
  win.dataLayer = win.dataLayer || [];
  if (typeof win.gtag !== 'function') {
    // Official snippet shape: dataLayer.push(arguments)
    win.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      win.dataLayer!.push(arguments);
    };
  }
  return win.gtag;
}

/** Load AW gtag.js + config once (thank-you mount only — not sitewide). */
export function ensureGoogleAdsGtag(): NonNullable<AdsWindow['gtag']> {
  const win = window as AdsWindow;
  const gtag = ensureGtagFunction(win);

  if (!document.getElementById(SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
    document.head.appendChild(script);
  }

  if (!win[CONFIGURED_FLAG]) {
    win[CONFIGURED_FLAG] = true;
    gtag('js', new Date());
    gtag('config', GOOGLE_ADS_ID);
  }

  return gtag;
}

/**
 * Fire the lead-form conversion once per page load for this send_to + URL.
 * Safe under StrictMode double-mount.
 */
export function fireGoogleAdsLeadConversion(options: {
  sendTo?: string;
  analyticsEventName?: string;
  eventCategory?: string;
}): void {
  const sendTo = options.sendTo || GOOGLE_ADS_LEAD_CONVERSION_SEND_TO;
  const guardKey = `${sendTo}|${window.location.pathname}${window.location.search}|${performance.timeOrigin}`;
  if (firedConversionKeys.has(guardKey)) return;
  firedConversionKeys.add(guardKey);

  const gtag = ensureGoogleAdsGtag();
  gtag('event', 'conversion', {
    send_to: sendTo,
    value: 1.0,
    currency: 'INR',
  });

  if (options.analyticsEventName) {
    gtag('event', options.analyticsEventName, {
      event_category: options.eventCategory || 'lead',
      event_label: sendTo,
    });
  }
}
