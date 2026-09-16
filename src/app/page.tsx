import PageMeta from '@/components/PageMeta';
import { Suspense } from 'react';
import HomeQuoteForm from '@/components/HomeQuoteForm';
import ClientOnly from '@/components/ClientOnly';
import HomeBookingHero from '@/components/HomeBookingHero';
import OurServicesSection from '@/components/OurServicesSection';
import TrustSection from '@/components/TrustSection';

function BookingFormFallback() {
  return (
    <div className="booking-form-card animate-pulse space-y-4 p-5">
      <div className="h-6 w-48 rounded bg-gray-200" />
      <div className="h-11 rounded bg-gray-200" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-11 rounded bg-gray-200" />
        <div className="h-11 rounded bg-gray-200" />
      </div>
      <div className="h-20 rounded bg-gray-200" />
      <div className="h-12 rounded bg-gray-200" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="home-page-with-sticky-cta">
      <PageMeta
        title="Pest Control in Mumbai | Safe, Same-Day & Certified Services"
        description="Trusted pest control in Mumbai, Navi Mumbai, Thane, Pune & Lonavala. 100% safe, herbal treatments for homes & offices. Same-day service, 365-day warranty. Book now!"
        keywords="pest control mumbai, professional pest control services, same-day pest control, pest control thane, pest control navi mumbai"
        canonical="https://www.pestcontrol99.com/"
        ogUrl="https://www.pestcontrol99.com/"
      />

      <div className="home-hero-block home-booking-viewport">
        <ClientOnly fallback={<HomeBookingHero form={<BookingFormFallback />} />}>
          <Suspense fallback={<HomeBookingHero form={<BookingFormFallback />} />}>
            <HomeBookingHero form={<HomeQuoteForm />} />
          </Suspense>
        </ClientOnly>
      </div>

      <OurServicesSection />

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
