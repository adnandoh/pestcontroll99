import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';
import PageMeta from '@/components/PageMeta';
import { BUSINESS, whatsAppUrl } from '@/config/business';
import { scrollToTopInstant } from '@/utils/scroll';
import {
  fireGoogleAdsLeadConversion,
  GOOGLE_ADS_LEAD_CONVERSION_SEND_TO,
} from '@/utils/googleAdsConversion';

export type ThankYouContentProps = {
  pageTitle?: string;
  metaDescription?: string;
  /** Google Ads conversion send_to (e.g. AW-xxx/label) */
  conversionSendTo?: string;
  /** Extra gtag event for campaign analytics */
  analyticsEventName?: string;
  backLink?: string;
  backLabel?: string;
  noindex?: boolean;
};

export default function ThankYouContent({
  pageTitle = 'Thank You | Pest Control 99',
  metaDescription = 'Your pest control booking was received. Our team will contact you shortly.',
  conversionSendTo = GOOGLE_ADS_LEAD_CONVERSION_SEND_TO,
  analyticsEventName,
  backLink = '/',
  backLabel = 'Back to Home',
  noindex = true,
}: ThankYouContentProps) {
  const [searchParams] = useSearchParams();
  const bookingCode = searchParams.get('code') || '';
  const bookingId = searchParams.get('id') || '';
  const pricePending = searchParams.get('pending') === '1';
  const isBooking = Boolean(bookingCode || bookingId);

  useLayoutEffect(() => {
    scrollToTopInstant();
  }, []);

  // Google Ads gtag + lead conversion — thank-you routes only (inquiry + booking).
  useEffect(() => {
    fireGoogleAdsLeadConversion({
      sendTo: conversionSendTo,
      analyticsEventName,
      eventCategory: isBooking ? 'booking' : 'lead',
    });
  }, [conversionSendTo, analyticsEventName, isBooking]);

  return (
    <>
      <PageMeta title={pageTitle} description={metaDescription} noindex={noindex} />
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25" />
              <div className="relative bg-white rounded-full p-6 shadow-xl border-4 border-green-500">
                <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {isBooking ? (
              <>
                Booking Confirmed. <span className="text-green-600">Thank You!</span>
              </>
            ) : (
              <>
                Thank You! <span className="text-green-600">Request Received.</span>
              </>
            )}
          </h1>

          {isBooking ? (
            <div className="mb-8 rounded-2xl border border-green-100 bg-white p-5 text-left shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
                Booking reference
              </p>
              <p className="mt-1 text-2xl font-extrabold text-gray-900">
                {bookingCode || `#${bookingId}`}
              </p>
              <p className="mt-3 text-base text-gray-600 leading-relaxed">
                {pricePending
                  ? 'Our team will confirm the final price and schedule with you shortly.'
                  : 'Our team will confirm your schedule shortly. A technician will be assigned from the partner app.'}
              </p>
            </div>
          ) : (
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto">
              Our team will contact you shortly to provide your personalized quote and discuss the next steps.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-1">Call Us Now</h3>
              <p className="text-sm text-gray-500 mb-3">For emergency service</p>
              <a href={`tel:${BUSINESS.phoneTel}`} className="text-green-600 font-bold hover:underline">
                {BUSINESS.phoneDisplay}
              </a>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-1">WhatsApp Us</h3>
              <p className="text-sm text-gray-500 mb-3">Fast responses</p>
              <a
                href={whatsAppUrl(
                  isBooking
                    ? `Hi, I just booked online${bookingCode ? ` (${bookingCode})` : ''}.`
                    : 'Hi, I just submitted a quote request on your website.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-bold hover:underline"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={backLink}
              className="w-full sm:w-auto px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200"
            >
              {backLabel}
            </Link>
            <Link
              to="/services/"
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
