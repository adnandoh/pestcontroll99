import { Link } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import AppImage from '@/components/AppImage';
import PageMeta from '@/components/PageMeta';
import HomeQuoteForm from '@/components/HomeQuoteForm';
import ClientOnly from '@/components/ClientOnly';
import OurServicesSection from '@/components/OurServicesSection';
import TrustSection from '@/components/TrustSection';
import type { LandingPageConfig } from '@/config/landingPages';
import { BUSINESS, DEFAULT_WHATSAPP_MESSAGE, whatsAppUrl } from '@/config/business';

type HomeLandingTemplateProps = {
  config: LandingPageConfig;
};

export default function HomeLandingTemplate({ config }: HomeLandingTemplateProps) {
  useEffect(() => {
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === 'function' && config.seo.canonical?.includes('lonavala')) {
      gtag('event', 'lonavala_landing_view', {
        page_path: '/pest-control-in-lonavala/',
        page_location: config.seo.canonical,
      });
    }
  }, [config.seo.canonical]);

  return (
    <div>
      <PageMeta {...config.seo} />

      <div className="hero-container relative w-full shrink-0 overflow-hidden pb-3 sm:pb-4 md:pb-6">
        <div className="relative z-0 w-full min-h-[196px] h-[30dvh] sm:min-h-[238px] sm:h-[34dvh] md:min-h-[294px] md:h-[min(60vh,630px)]">
          <AppImage
            src="/images/hero-home.webp"
            alt={config.hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none" />
        </div>
        <h1 className="sr-only">{config.hero.srOnlyH1}</h1>
      </div>

      <ClientOnly
        fallback={
          <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="animate-pulse max-w-2xl mx-auto h-64 bg-gray-200 rounded-2xl" />
            </div>
          </section>
        }
      >
        <Suspense fallback={null}>
          <div className="relative z-30 mt-4 sm:mt-6 scroll-mt-20 md:-mt-8 lg:-mt-10 xl:-mt-12">
            <HomeQuoteForm
              compact
              leadSource={config.leadSource}
              thankYouPath={config.thankYouPath}
              defaultCity={config.defaultCity}
              defaultState={config.defaultState}
              formTitle={config.form.title}
              formSubtitle={config.form.subtitle}
            />
          </div>
        </Suspense>
      </ClientOnly>

      <OurServicesSection />

      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {config.localSection.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-700">{config.localSection.subtitle}</p>
          </div>
          <ul className="space-y-4 bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
            {config.localSection.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-gray-700 text-sm sm:text-base">
                <span className="text-green-600 font-bold shrink-0">✓</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-dark py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{config.credibility.title}</h2>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto">{config.credibility.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto text-center">
            {[
              { value: '365', label: 'Day Warranty' },
              { value: '100%', label: 'Herbal Options' },
              { value: 'Same', label: 'Day Response' },
              { value: '₹0', label: 'Hidden Charges' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/15 bg-white/10 p-4 sm:p-5 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-green-bright mb-1 sm:mb-2">{item.value}</div>
                <p className="text-xs sm:text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustSection />

      <section className="section-cta-green py-12 sm:py-16 md:py-20 bg-gradient-to-br from-green-400 to-green-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">{config.finalCta.title}</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto opacity-90">{config.finalCta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#root"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white text-green-600 px-5 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm hover:bg-gray-100 transition-all duration-300 shadow-md"
            >
              Get My Free Quote ↑
            </a>
            <a
              href={whatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white px-5 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm hover:bg-white hover:text-green-600 transition-all duration-300 shadow-md"
            >
              WhatsApp: {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
