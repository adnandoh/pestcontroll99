import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import PageMeta from '@/components/PageMeta';

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
  metaDescription = 'Your pest control quote request was received. Our team will contact you shortly.',
  conversionSendTo = 'AW-17687478045/submit_lead',
  analyticsEventName,
  backLink = '/',
  backLabel = 'Back to Home',
  noindex = true,
}: ThankYouContentProps) {
  useEffect(() => {
    window.scrollTo(0, 0);

    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', {
        send_to: conversionSendTo,
        value: 1.0,
        currency: 'INR',
      });
      if (analyticsEventName) {
        gtag('event', analyticsEventName, {
          event_category: 'lead',
          event_label: conversionSendTo,
        });
      }
    }
  }, [conversionSendTo, analyticsEventName]);

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
            Thank You! <span className="text-green-600">Request Received.</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto">
            Our team will contact you shortly to provide your personalized quote and discuss the next steps.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-1">Call Us Now</h3>
              <p className="text-sm text-gray-500 mb-3">For emergency service</p>
              <a href="tel:+918080748282" className="text-green-600 font-bold hover:underline">
                +91 80807 48282
              </a>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-1">WhatsApp Us</h3>
              <p className="text-sm text-gray-500 mb-3">Fast responses</p>
              <a
                href="https://wa.me/918080748282?text=Hi%2C%20I%20just%20submitted%20a%20quote%20request%20on%20your%20website."
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
