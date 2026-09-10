import AppImage from '@/components/AppImage';
import PageMeta from '@/components/PageMeta';
import { Suspense } from 'react';
import HomeQuoteForm from '@/components/HomeQuoteForm';
import ClientOnly from '@/components/ClientOnly';
import HomeHeroBanner from '@/components/HomeHeroBanner';
import HomeHeroQuoteSlot from '@/components/HomeHeroQuoteSlot';
import OurServicesSection from '@/components/OurServicesSection';
import TrustSection from '@/components/TrustSection';
import { BUSINESS } from '@/config/business';

export default function Home() {
  return (
    <div>
      <PageMeta
        title="Pest Control in Mumbai | Safe, Same-Day & Certified Services"
        description="Trusted pest control in Mumbai, Navi Mumbai, Thane, Pune & Lonavala. 100% safe, herbal treatments for homes & offices. Same-day service, 365-day warranty. Book now!"
        keywords="pest control mumbai, professional pest control services, same-day pest control, pest control thane, pest control navi mumbai"
        canonical="https://www.pestcontrol99.com/"
        ogUrl="https://www.pestcontrol99.com/"
      />
      {/* Hero + quote form — single panoramic banner (copy baked into artwork) */}
      <div className="home-hero-block">
        <div className="hero-container relative w-full shrink-0 bg-[#E8F5EC] pb-2 sm:pb-4 md:pb-6">
          {/* Natural-height banner: scales to viewport width so baked-in text/icons never crop on mobile */}
          <div className="relative z-0 w-full">
            <HomeHeroBanner />
          </div>
          <h1 className="sr-only">
            {BUSINESS.brandName} — Pest Control in Mumbai, Safe, Same-Day &amp; Certified Services
          </h1>
        </div>

        <ClientOnly fallback={
          <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Choose Your Pest & Property – Get Quotation the Same Day
                </h2>
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                </div>
              </div>
              <div className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg sm:shadow-xl">
                <div className="animate-pulse space-y-6">
                  <div className="h-12 bg-gray-300 rounded"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="h-12 bg-gray-300 rounded"></div>
                    <div className="h-12 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </section>
        }>
          <Suspense fallback={null}>
            <HomeHeroQuoteSlot
              image={
                <AppImage
                  src="/images/hero-quote-left.webp"
                  alt={`${BUSINESS.brandName} technician providing safe, eco-friendly pest control treatment at home`}
                  fill
                  sizes="(min-width: 1024px) 42vw"
                  className="object-cover object-center"
                />
              }
              form={<HomeQuoteForm compact />}
            />
          </Suspense>
        </ClientOnly>
      </div>

      <OurServicesSection />

      {/* Credibility Knockout */}
      <section className="section-dark py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              How We Stack Up Against &ldquo;Big Brands&rdquo;
            </h2>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
              365-day warranty • Herbals & lab-tested chemicals • Same-day response • Up-front pricing — none of the big three match all four.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto text-center">
            <div className="rounded-xl border border-white/15 bg-white/10 p-4 sm:p-5 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-green-bright mb-1 sm:mb-2">365</div>
              <p className="text-xs sm:text-sm font-medium">Day Warranty</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 p-4 sm:p-5 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-green-bright mb-1 sm:mb-2">100%</div>
              <p className="text-xs sm:text-sm font-medium">Herbal Options</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 p-4 sm:p-5 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-green-bright mb-1 sm:mb-2">Same</div>
              <p className="text-xs sm:text-sm font-medium">Day Response</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 p-4 sm:p-5 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-green-bright mb-1 sm:mb-2">₹0</div>
              <p className="text-xs sm:text-sm font-medium">Hidden Charges</p>
            </div>
          </div>
        </div>
      </section>

      <TrustSection />
    </div>
  );
}
