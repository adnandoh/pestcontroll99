import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '@/components/OptimizedImage';
import Breadcrumb from '@/components/Breadcrumb';
import TrustSection from '@/components/TrustSection';
import { BUSINESS, DEFAULT_WHATSAPP_MESSAGE, whatsAppUrl } from '@/config/business';
import { GOOGLE_RATING_SUMMARY } from '@/config/googleReviews';
import PageMeta from '@/components/PageMeta';

const ABOUT_WARRANTY = [
  {
    service: 'Cockroach Control',
    period: '1 Year',
    href: '/services/cockroach-pest-control/',
    description: 'Written warranty on cockroach treatments — free revisit if pests return within the warranty period.',
  },
  {
    service: 'Termite Treatment',
    period: '2 Years',
    href: '/services/termite-pest-control/',
    description: 'Long-term termite protection with up to 2 years of warranty-backed coverage on eligible treatments.',
  },
] as const;

const ABOUT_CITIES = [
  {
    name: 'Mumbai',
    href: '/pest-control-mumbai/',
    description: 'Same-day pest control across Mumbai — homes, offices, restaurants, and societies.',
  },
  {
    name: 'Navi Mumbai',
    href: '/pest-control-navi-mumbai/',
    description: 'Professional pest management in Vashi, Kharghar, Nerul, Belapur, and all Navi Mumbai nodes.',
  },
] as const;

const MORE_SERVICE_CITIES = [
  { name: 'Thane', href: '/pest-control-thane/' },
  { name: 'Pune', href: '/pest-control-pune/' },
  { name: 'Lonavala', href: '/pest-control-lonavala/' },
] as const;

function useAboutPageSchema() {
  useEffect(() => {
    const scriptId = 'about-page-jsonld';
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'AboutPage',
          '@id': 'https://www.pestcontrol99.com/about/#webpage',
          url: 'https://www.pestcontrol99.com/about/',
          name: `About ${BUSINESS.brandName}`,
          description:
            `${BUSINESS.brandName} by ${BUSINESS.legalName} — 2 lacs+ happy customers, Google-rated pest control with warranty-backed service in Mumbai and Navi Mumbai.`,
          isPartOf: { '@id': 'https://www.pestcontrol99.com/#website' },
          about: { '@id': 'https://www.pestcontrol99.com/#organization' },
        },
        {
          '@type': 'Organization',
          '@id': 'https://www.pestcontrol99.com/#organization',
          name: BUSINESS.brandName,
          legalName: BUSINESS.legalName,
          url: BUSINESS.website,
          email: BUSINESS.email,
          telephone: BUSINESS.phoneTel,
          description: BUSINESS.operatingStatement,
          areaServed: BUSINESS.serviceAreas.map((city) => ({
            '@type': 'City',
            name: city,
          })),
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: BUSINESS.aggregateRating.ratingValue,
            reviewCount: BUSINESS.aggregateRating.reviewCount,
            bestRating: '5',
            worstRating: '1',
          },
        },
      ],
    };

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, []);
}

export default function AboutPage() {
  useAboutPageSchema();

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white font-sans text-gray-900 selection:bg-green-100 selection:text-green-900">
      <PageMeta
        title="About Pest Control 99 | 2 Lacs+ Happy Customers in Mumbai & Navi Mumbai"
        description="Why choose Pest Control 99? 2 lacs+ happy customers, top Google ratings, warranty-backed cockroach & termite service, 24/7 emergency help, and herbal 100% safe chemicals in Mumbai & Navi Mumbai."
        keywords="about pest control 99, pest control mumbai, pest control navi mumbai, warranty pest control, herbal pest control mumbai, 24/7 pest control"
        canonical="https://www.pestcontrol99.com/about/"
        ogUrl="https://www.pestcontrol99.com/about/"
      />
      <Breadcrumb items={[{ label: 'About Us' }]} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-12 lg:pb-32">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-green-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 min-w-0">
              <div className="inline-flex max-w-full items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs sm:text-sm font-semibold mb-5 sm:mb-8 shadow-sm">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="leading-snug">Serving Mumbai, Thane &amp; Navi Mumbai</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6 leading-[1.15]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">{BUSINESS.brandName}</span>
                <br className="hidden lg:block" />
                <span className="block sm:inline"> Mumbai&apos;s Trusted Local Pest Experts</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-5 sm:mb-6 leading-relaxed max-w-lg">
                Clear talk. Neat work. Real results. We keep it simple—same-day help, clear prices, and service notes you can actually understand.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/quote"
                  className="btn btn-cta btn-quote-rounded btn-quote-lg group w-full sm:w-auto"
                >
                  Get Free Quote
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href={whatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full sm:w-auto items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 text-base font-semibold text-gray-700 transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-green-600 hover:border-green-200 hover:shadow-lg hover:-translate-y-1"
                >
                  <svg className="w-5 h-5 mr-2 text-green-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative min-w-0 overflow-hidden">
              <div className="absolute inset-0 sm:-inset-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-[1.5rem] sm:rounded-[2rem] blur-2xl opacity-40 animate-pulse pointer-events-none"></div>
              <div className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl border-4 sm:border-8 border-white/50 backdrop-blur-sm">
                <OptimizedImage
                  src="/images/heroimage.webp"
                  alt="Licensed Pest Control 99 expert providing professional pest control service in a Mumbai home"
                  width={800}
                  height={600}
                  className="w-full h-auto aspect-[4/3] object-cover transform hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                />

                {/* Floating Stats Card */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-lg border border-white/20 grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wide">Customers</p>
                      <p className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">2 Lacs+ Happy</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 border-l border-gray-200 pl-2 sm:pl-0 sm:border-l-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.2 22 12 18.56 5.8 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wide">Google</p>
                      <p className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">{GOOGLE_RATING_SUMMARY.rating}★ Rated</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose — key trust points */}
      <section className="py-10 sm:py-12 bg-gray-50 border-y border-gray-100" aria-labelledby="why-choose-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
            <h2 id="why-choose-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Why Choose {BUSINESS.brandName}
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Trusted by families and businesses across Maharashtra — backed by real results, written warranties, and round-the-clock support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              {
                title: '2 Lacs+ Happy Customers',
                desc: 'Over two lakh satisfied homes and businesses served with professional, reliable pest management.',
                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
                color: 'text-green-600',
                bg: 'bg-green-50',
              },
              {
                title: 'Google Ratings',
                desc: `${GOOGLE_RATING_SUMMARY.rating}★ average rating from ${GOOGLE_RATING_SUMMARY.reviewCount}+ verified Google reviews — real feedback from real customers.`,
                icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
                color: 'text-yellow-600',
                bg: 'bg-yellow-50',
              },
              {
                title: 'Warranty-Backed Service',
                desc: 'Cockroach control with 1-year warranty and termite treatment with up to 2-year warranty — we stand behind every job.',
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                color: 'text-blue-600',
                bg: 'bg-blue-50',
              },
              {
                title: '24/7 Emergency Service',
                desc: 'Pest emergency at midnight or early morning? Call or WhatsApp us — we respond fast when you need help most.',
                icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                color: 'text-red-600',
                bg: 'bg-red-50',
              },
              {
                title: 'Herbal & 100% Safe Chemicals',
                desc: 'CIB&RC-approved herbal and lab-tested chemicals — safe for kids, pets, and food areas when applied as directed.',
                icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
              },
              {
                title: 'Licensed & Transparent',
                desc: `Operated by ${BUSINESS.legalName} with trained technicians, clear pricing, and digital service reports.`,
                icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
                color: 'text-purple-600',
                bg: 'bg-purple-50',
              },
            ].map((item, idx) => (
              <article key={idx} className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 sm:w-12 sm:h-12 ${item.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What We Believe Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">What We Believe</h2>
            <p className="text-base sm:text-lg text-gray-600">Core values that drive every service we provide to your home and business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Safety first",
                desc: "We use CIB&RC-approved products and give clear kid- and pet-safe guidance for every visit.",
                icon: (
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                color: "bg-green-50 border-green-100"
              },
              {
                title: "Clarity over jargon",
                desc: "We show what we'll do, why it works, and when you can use each room again—step by step.",
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                color: "bg-blue-50 border-blue-100"
              },
              {
                title: "Fix the root cause",
                desc: "We treat the source and seal entries, then back the work with a written assurance.",
                icon: (
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
                color: "bg-orange-50 border-orange-100"
              }
            ].map((item, idx) => (
              <div key={idx} className={`group p-5 sm:p-8 rounded-2xl border ${item.color} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white`}>
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-5">What We Do</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-900 font-semibold leading-snug mb-3 sm:mb-4 px-1">
              We don&apos;t spray and disappear.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto px-1">
              Our team inspects your space, treats pests at the source, seals entry points, and leaves you with a clear service report—whether it&apos;s a Bandra flat, a Thane shop, or an office in Navi Mumbai.
            </p>
            <div className="flex flex-wrap justify-center gap-2 px-1">
              {[
                'Cockroach control',
                'Termite protection',
                'Mosquito treatment',
                'Rodent proofing',
                'Bee removal',
                'Wood borer',
              ].map((service) => (
                <span
                  key={service}
                  className="inline-flex items-center rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs sm:text-sm font-medium text-green-800"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section - Timeline Style */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">How We Work</h2>
            <p className="text-base sm:text-lg text-gray-600">A simple, transparent process designed for your peace of mind.</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>

              {[
                { step: "1", title: "Inspect", desc: "We spot entry points, nests, and trails.", color: "bg-green-500" },
                { step: "2", title: "Treat", desc: "Targeted gels & mists where pests live.", color: "bg-blue-500" },
                { step: "3", title: "Proof", desc: "Seal gaps to block return paths.", color: "bg-orange-500" },
                { step: "4", title: "Report", desc: "Digital invoice & clear service notes.", color: "bg-purple-500" }
              ].map((item, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center group">
                  <div className={`${item.color} w-14 h-14 sm:w-16 sm:h-16 rounded-2xl text-white flex items-center justify-center text-xl sm:text-2xl font-bold shadow-lg mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10 border-4 border-gray-50`}>
                    {item.step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed px-2 sm:px-4">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Follow Up Box */}
            <div className="mt-10 sm:mt-16 text-center px-1">
              <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl p-5 sm:p-8 shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 flex flex-wrap items-center justify-center gap-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  The Follow Up
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  We check results after service. If pests return within warranty, we come back and fix it at no extra cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty-Backed Service */}
      <section className="py-12 sm:py-16 md:py-20 bg-white" aria-labelledby="warranty-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
            <h2 id="warranty-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Warranty-Backed Service
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              We don&apos;t just treat and leave — every service comes with a clear written warranty so you&apos;re protected long after we go.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {ABOUT_WARRANTY.map((item) => (
              <article key={item.service} className="rounded-2xl border border-green-100 bg-green-50/50 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-green-700 mb-2">Warranty</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{item.service}</h3>
                <p className="text-3xl sm:text-4xl font-bold text-green-600 mb-3">{item.period}</p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">{item.description}</p>
                <Link
                  to={item.href}
                  className="inline-flex items-center text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cities We Serve */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50" aria-labelledby="cities-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
            <h2 id="cities-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Cities We Serve
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Professional pest control across Mumbai, Navi Mumbai, and nearby cities — same-day slots available in most areas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto mb-6 sm:mb-8">
            {ABOUT_CITIES.map((city) => (
              <Link
                key={city.name}
                to={city.href}
                className="group rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-green-200 transition-all"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  Pest Control {city.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{city.description}</p>
                <span className="inline-flex items-center mt-4 text-sm font-semibold text-green-700">
                  View {city.name} services
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-3">Also serving</p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {MORE_SERVICE_CITIES.map((city) => (
                <Link
                  key={city.name}
                  to={city.href}
                  className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:border-green-300 hover:text-green-700 transition-colors"
                >
                  {city.name}
                </Link>
              ))}
            </div>
            <p className="mt-5 text-sm text-gray-600">
              <Link to="/contact/" className="font-semibold text-green-700 hover:text-green-800 underline-offset-2 hover:underline">
                Read more
              </Link>
              {' '}about all service areas or call {BUSINESS.phoneDisplay} for your locality.
            </p>
          </div>
        </div>
      </section>

      <TrustSection />

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Ready for a Pest-Free Space?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Get a free quote today — same-day inspection available across Mumbai and Navi Mumbai.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/quote/" className="btn btn-cta btn-quote-rounded btn-quote-lg w-full sm:w-auto">
              Get Free Quote
            </Link>
            <a
              href={whatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3.5 text-base font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-green-600 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
