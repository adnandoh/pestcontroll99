import { Link } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import AppImage from '@/components/AppImage';
import PageMeta from '@/components/PageMeta';
import OptimizedImage from '@/components/OptimizedImage';
import HomeQuoteForm from '@/components/HomeQuoteForm';
import ClientOnly from '@/components/ClientOnly';
import BusinessIdentityBanner from '@/components/BusinessIdentityBanner';
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
            src="/images/hero-home.png"
            alt={config.hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-8 md:left-8 md:max-w-xl z-10 pointer-events-none">
            <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-md">
              {config.hero.title}
            </p>
            <p className="text-white/90 text-sm sm:text-base mt-1 drop-shadow">{config.hero.subtitle}</p>
          </div>
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

      <section className="container mx-auto px-4 sm:px-6 -mt-2 sm:mt-0 pb-4">
        <BusinessIdentityBanner />
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {config.services.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">{config.services.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              { href: '/services/rodent-pest-control/', img: '/images/Rat.webp', alt: 'Rodent control services', label: 'Rodent Control' },
              { href: '/services/cockroach-pest-control/', img: '/images/Cockroach.webp', alt: 'Cockroach pest control', label: 'Cockroach Control' },
              { href: '/services/', img: '/images/BedBug.webp', alt: 'Bed bug control', label: 'BedBug Control' },
              { href: '/services/mosquito-pest-control/', img: '/images/Mosquito.webp', alt: 'Mosquito control', label: 'Mosquito Control' },
              { href: '/services/termite-pest-control/', img: '/images/Termite.webp', alt: 'Termite treatment', label: 'Termite Control' },
              { href: '/services/wood-borer-control/', img: '/images/Wood Borer.webp', alt: 'Wood borer control', label: 'Wood Borer Control' },
              { href: '/services/honey-bee-pest-control/', img: '/images/Honey Bee.webp', alt: 'Honey bee removal', label: 'Honey Bee Removal' },
            ].map((item) => (
              <Link
                key={item.href + item.label}
                to={item.href}
                className="text-center bg-white rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow duration-300 block"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full overflow-hidden">
                  <OptimizedImage
                    src={item.img}
                    alt={item.alt}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 640px) 96px, 128px"
                  />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">{item.label}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

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

      <section className="py-10 sm:py-12 md:py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{config.credibility.title}</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">{config.credibility.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto text-center">
            {[
              { value: '365', label: 'Day Warranty' },
              { value: '100%', label: 'Herbal Options' },
              { value: 'Same', label: 'Day Response' },
              { value: '₹0', label: 'Hidden Charges' },
            ].map((item) => (
              <div key={item.label} className="bg-gray-800 p-4 rounded-lg">
                <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1 sm:mb-2">{item.value}</div>
                <p className="text-xs sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustSection />

      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-green-400 to-green-500 text-white">
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
