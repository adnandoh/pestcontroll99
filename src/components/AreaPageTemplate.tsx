import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import PageMeta from '@/components/PageMeta';
import Breadcrumb from '@/components/Breadcrumb';
import AreaPageFAQ from '@/components/AreaPageFAQ';
import AreaQuoteFormSection from '@/components/AreaQuoteFormSection';
import OptimizedImage from '@/components/OptimizedImage';
import AppImage from '@/components/AppImage';
import {
  AREA_PAGE_SERVICES,
  getAreaBySlug,
  getAreaCanonical,
  getAreaFaqItems,
  getAreaLocalBusinessSchema,
  getAreaMetaDescription,
  getAreaPageTitle,
  getAreaPath,
  type ServiceArea,
} from '@/config/areasWeServe';
import { getAreaRichContent } from '@/config/areaPageContent';
import { BUSINESS, whatsAppUrl } from '@/config/business';

type AreaPageTemplateProps = {
  area: ServiceArea;
};

const DEFAULT_HERO = '/images/heroimage.webp';

/* ---------- Small inline icons (no external icon dependency) ---------- */
function Icon({ path, className = 'w-6 h-6' }: { path: ReactNode; className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
      {path}
    </svg>
  );
}

const CheckIcon = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z"
      clipRule="evenodd"
    />
  </svg>
);

/* ---------- Service → real photo + link mapping ---------- */
type ServiceCard = { label: string; image: string; href: string; blurb: string };

function getServiceCard(label: string): ServiceCard {
  const l = label.toLowerCase();
  if (l.includes('cockroach'))
    return { label, image: '/images/Cockroach.webp', href: '/services/cockroach-pest-control/', blurb: 'Odourless gel treatment, 365-day warranty.' };
  if (l.includes('mosquito'))
    return { label, image: '/images/Mosquito.webp', href: '/services/mosquito-pest-control/', blurb: 'Fogging & larvicide to cut dengue risk.' };
  if (l.includes('termite'))
    return { label, image: '/images/Termite.webp', href: '/services/termite-pest-control/', blurb: 'Anti-termite barrier, up to 5-yr warranty.' };
  if (l.includes('rodent') || l.includes('rat'))
    return { label, image: '/images/Rat.webp', href: '/services/rodent-pest-control/', blurb: 'Trapping & entry-point sealing.' };
  if (l.includes('wood borer'))
    return { label, image: '/images/Wood Borer.webp', href: '/services/wood-borer-control/', blurb: 'Protect furniture from powder-post beetles.' };
  if (l.includes('honey') || l.includes('bee'))
    return { label, image: '/images/Honey Bee.webp', href: '/services/honey-bee-pest-control/', blurb: 'Safe hive removal by trained technicians.' };
  if (l.includes('bed bug'))
    return { label, image: '/images/BedBug.webp', href: '/services/', blurb: 'Thorough bed bug treatment & follow-up.' };
  if (l.includes('fly'))
    return { label, image: '/images/House Fly.webp', href: '/services/', blurb: 'Fly control for kitchens & eateries.' };
  if (l.includes('ant'))
    return { label, image: '/images/Cockroach.webp', href: '/services/cockroach-pest-control/', blurb: 'Targeted ant gel & barrier treatment.' };
  return { label, image: '/images/Residential Pest Control.webp', href: '/services/', blurb: 'Safe, warranty-backed pest management.' };
}

/* ---------- Static content blocks ---------- */
const WHY_CHOOSE: { title: string; desc: string; icon: ReactNode }[] = [
  {
    title: 'Same-Day Service',
    desc: 'Book before noon and our local team reaches you the same day.',
    icon: <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />} />,
  },
  {
    title: 'CIB&RC-Approved Products',
    desc: 'Government-approved, low-odour treatments safe for kids & pets.',
    icon: <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V7l7-4z" />} />,
  },
  {
    title: 'Written Warranty',
    desc: 'Every treatment is backed by a written service warranty.',
    icon: <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />} />,
  },
  {
    title: 'Licensed Technicians',
    desc: 'Trained, background-verified, uniformed pest control experts.',
    icon: <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />} />,
  },
  {
    title: 'Transparent Pricing',
    desc: 'Upfront, all-inclusive quotes with zero hidden charges.',
    icon: <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6M9 12h6m-6 4h3m-7 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />} />,
  },
  {
    title: '24/7 Emergency Support',
    desc: "Urgent pest problem? We're available round the clock.",
    icon: <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.5a1 1 0 011 .76l1 4a1 1 0 01-.5 1.1L8 10a11 11 0 006 6l1.14-2a1 1 0 011.1-.5l4 1a1 1 0 01.76 1V19a2 2 0 01-2 2A16 16 0 013 5z" />} />,
  },
];

const PROCESS: { step: string; title: string; desc: string }[] = [
  { step: '1', title: 'Inspect', desc: 'We inspect your property and pinpoint the source of the infestation.' },
  { step: '2', title: 'Treat', desc: 'Targeted, safe treatment using professional-grade, approved products.' },
  { step: '3', title: 'Protect', desc: 'Entry points sealed and preventive barriers applied around your space.' },
  { step: '4', title: 'Follow-Up', desc: 'We check back and re-treat free under warranty if pests return.' },
];

export default function AreaPageTemplate({ area }: AreaPageTemplateProps) {
  const richContent = getAreaRichContent(area.slug);
  const faqItems = richContent?.faq ?? getAreaFaqItems(area.name);
  const nearbyAreas = area.nearbySlugs
    .map((slug) => getAreaBySlug(slug))
    .filter((a): a is ServiceArea => Boolean(a));

  const localBusinessSchema = getAreaLocalBusinessSchema(area);
  const areaPath = getAreaPath(area.slug);

  const heroImage = richContent?.heroImage ?? DEFAULT_HERO;
  const heroImageAlt = richContent?.heroImageAlt ?? `Professional pest control services in ${area.name} by Pest Control 99`;
  const heroTitle = richContent?.heroTitle ?? `Pest Control Services in ${area.name}`;
  const heroSubtitle =
    richContent?.heroSubtitle ??
    `Same-day, warranty-backed pest control across ${area.name} and ${area.zone}.`;
  const phoneCta = richContent?.phoneCta ?? BUSINESS.phoneDisplay;
  const { ratingValue, reviewCount } = BUSINESS.aggregateRating;

  const serviceCards = (richContent?.servicesOffered ?? AREA_PAGE_SERVICES.map((s) => s.label)).map(getServiceCard);

  const trustBadges = ['Same-Day Service', '365-Day Warranty', 'CIB&RC-Approved', `${ratingValue}★ (${reviewCount}+ reviews)`];

  // Lonavala has a dedicated Ads landing at /pest-control-in-lonavala/ — avoid duplicate indexing.
  const lonavalaLandingCanonical = 'https://www.pestcontrol99.com/pest-control-in-lonavala/';
  const isLonavalaAreaPage = area.slug === 'lonavala';
  const pageCanonical = isLonavalaAreaPage ? lonavalaLandingCanonical : getAreaCanonical(area.slug);

  return (
    <div className="bg-white">
      <PageMeta
        title={richContent?.pageTitle ?? getAreaPageTitle(area.name)}
        description={richContent?.metaDescription ?? getAreaMetaDescription(area.name)}
        keywords={richContent?.keywords}
        canonical={pageCanonical}
        ogUrl={pageCanonical}
        ogImage={`https://www.pestcontrol99.com${heroImage}`}
        noindex={!richContent || isLonavalaAreaPage}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <Breadcrumb
        items={[
          { label: 'Areas We Serve', href: '/#areas-we-serve' },
          { label: area.name },
        ]}
      />

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-20 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Copy */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-green-100 text-green-800 px-4 py-1.5 text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Pest Control in {area.name}
              </span>

              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                {heroTitle}
              </h1>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-xl">{heroSubtitle}</p>

              {/* Trust badges */}
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {trustBadges.map((badge) => (
                  <li
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white border border-gray-200 px-3.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm"
                  >
                    <span className="text-green-600">{CheckIcon}</span>
                    {badge}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#free-quote"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-7 py-3.5 rounded-full font-semibold shadow-lg shadow-green-600/20 transition-colors"
                >
                  Get a Free Quote →
                </a>
                <a
                  href={`tel:${BUSINESS.phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 px-7 py-3.5 rounded-full font-semibold transition-colors"
                >
                  📞 Call {phoneCta}
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <OptimizedImage
                  src={heroImage}
                  alt={heroImageAlt}
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-full"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
              <div className="absolute -bottom-5 left-5 sm:left-8 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold text-green-600 leading-none">{ratingValue}★</span>
                  <span className="text-xs text-gray-500">{reviewCount}+ reviews</span>
                </div>
                <div className="w-px h-9 bg-gray-200" />
                <div className="text-sm font-semibold text-gray-800 leading-tight">
                  Same-day
                  <br />
                  service
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== INTRO ===================== */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Trusted Pest Control in {area.name}
          </h2>
          <div className="space-y-5 text-gray-700 text-base sm:text-lg leading-relaxed">
            {richContent ? (
              richContent.introParagraphs.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)
            ) : (
              <>
                <p>
                  Looking for reliable pest control in {area.name}? Pest Control 99 provides same-day cockroach,
                  termite, mosquito, rodent, honey bee and wood borer treatment across {area.zone} and the wider
                  Mumbai metropolitan region. Our licensed technicians use CIB&amp;RC-approved, family-safe products
                  backed by a written warranty and fully transparent pricing.
                </p>
                <p>
                  Whether it&apos;s a recurring cockroach problem in the kitchen, termites damaging your woodwork, or
                  mosquitoes making evenings unbearable, our {area.name} team inspects the source, treats it at the
                  root, and follows up to make sure the pests stay gone.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ===================== SERVICES ===================== */}
      <section className="py-12 sm:py-16 bg-gray-50" aria-labelledby="area-services-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 id="area-services-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
              Pest Control Services in {area.name}
            </h2>
            <p className="mt-3 text-gray-600">
              Complete protection for homes, offices and commercial spaces — all backed by warranty.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {serviceCards.map((service) => (
              <Link
                key={service.label}
                to={service.href}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-300 hover:-translate-y-1 transition-all"
              >
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <AppImage
                    src={service.image}
                    alt={`${service.label} in ${area.name} — Pest Control 99`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 right-4 text-white text-lg font-bold drop-shadow">
                    {service.label}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-600 leading-relaxed">{service.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-green-700 font-semibold text-sm group-hover:gap-2 transition-all">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHY CHOOSE US ===================== */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Choose Pest Control 99 in {area.name}</h2>
            <p className="mt-3 text-gray-600">A local team you can trust, backed by warranty and safe, approved treatments.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {WHY_CHOOSE.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-green-600/10 text-green-700 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PROCESS ===================== */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">How Our Service Works</h2>
            <p className="mt-3 text-gray-600">A simple, proven 4-step process from booking to lasting protection.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {PROCESS.map((p) => (
              <div key={p.step} className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold mb-4">
                  {p.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{p.title}</h3>
                <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== RICH COMMITMENT (rich pages only) ===================== */}
      {richContent && (
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl space-y-5 text-gray-700 text-base sm:text-lg leading-relaxed">
            <p>{richContent.commitmentParagraph}</p>
            <p>{richContent.closingParagraph}</p>
          </div>
        </section>
      )}

      {/* ===================== QUOTE FORM ===================== */}
      <AreaQuoteFormSection
        areaName={area.name}
        areaPath={areaPath}
        sectionId="free-quote"
        className="py-14 sm:py-20 bg-gray-50 border-y border-gray-100"
      />

      {/* ===================== FAQ ===================== */}
      <AreaPageFAQ areaName={area.name} items={faqItems} />

      {/* ===================== NEARBY AREAS ===================== */}
      {nearbyAreas.length > 0 && (
        <section className="py-12 sm:py-16 border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Also Serving Nearby Areas</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {nearbyAreas.map((nearby) => (
                <Link
                  key={nearby.slug}
                  to={getAreaPath(nearby.slug)}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 text-green-800 border border-green-200 text-sm font-medium hover:bg-green-100 transition-colors"
                >
                  Pest Control {nearby.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== FINAL CTA ===================== */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 py-14 sm:py-16 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">Get Rid of Pests in {area.name} Today</h2>
          <p className="mt-4 text-lg text-green-50/90">
            Same-day service, safe treatments and warranty-backed results. Book your free inspection now.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#free-quote"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-7 py-3.5 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition-colors"
            >
              Get a Free Quote →
            </a>
            <a
              href={`tel:${BUSINESS.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white hover:text-green-700 transition-colors"
            >
              📞 Call {phoneCta}
            </a>
            <a
              href={whatsAppUrl(`Hi, I need pest control in ${area.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-7 py-3.5 rounded-full font-semibold hover:brightness-105 transition-all"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
