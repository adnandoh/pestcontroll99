import { Link } from 'react-router-dom';
import PageMeta from '@/components/PageMeta';
import Breadcrumb from '@/components/Breadcrumb';
import AreaPageFAQ from '@/components/AreaPageFAQ';
import AreaQuoteFormSection from '@/components/AreaQuoteFormSection';
import OptimizedImage from '@/components/OptimizedImage';
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

export default function AreaPageTemplate({ area }: AreaPageTemplateProps) {
  const richContent = getAreaRichContent(area.slug);
  const faqItems = richContent?.faq ?? getAreaFaqItems(area.name);
  const nearbyAreas = area.nearbySlugs
    .map((slug) => getAreaBySlug(slug))
    .filter((a): a is ServiceArea => Boolean(a));

  const localBusinessSchema = getAreaLocalBusinessSchema(area);
  const areaPath = getAreaPath(area.slug);

  return (
    <div>
      <PageMeta
        title={richContent?.pageTitle ?? getAreaPageTitle(area.name)}
        description={richContent?.metaDescription ?? getAreaMetaDescription(area.name)}
        keywords={richContent?.keywords}
        canonical={getAreaCanonical(area.slug)}
        ogUrl={getAreaCanonical(area.slug)}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <Breadcrumb
        items={[
          { label: 'Areas We Serve', href: '/#areas-we-serve' },
          { label: area.name },
        ]}
      />

      {/* Hero */}
      <section className="py-10 sm:py-14 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {richContent?.heroTitle ?? `Pest Control Services in ${area.name}`}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            {richContent?.heroSubtitle ?? `${area.zone} · Maharashtra`}
          </p>
        </div>
      </section>

      {richContent ? (
        <>
          {/* Featured image + intro */}
          <section className="py-8 sm:py-12 bg-white">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-8 sm:mb-10">
                <OptimizedImage
                  src={richContent.heroImage}
                  alt={richContent.heroImageAlt}
                  width={1617}
                  height={972}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </div>
              <div className="space-y-5 text-gray-700 text-base sm:text-lg leading-relaxed">
                {richContent.introParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>

          {/* Services offered */}
          <section className="py-10 sm:py-12 bg-green-50" aria-labelledby="lonavala-services-offered">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
              <h2 id="lonavala-services-offered" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                Pest Control Services We Offer in {area.name}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
                {richContent.servicesOffered.map((service) => (
                  <li key={service} className="flex gap-3 text-gray-800 text-sm sm:text-base">
                    <span className="text-green-600 font-bold shrink-0">✓</span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Commitment + closing */}
          <section className="py-8 sm:py-12 bg-white">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-5 text-gray-700 text-base sm:text-lg leading-relaxed">
              <p>{richContent.commitmentParagraph}</p>
              <p>
                Pest Control 99 offers same-day service, 24/7 emergency support, and reliable customer assistance to
                keep your property hygienic, comfortable, and pest-free. Trusted by many customers, Pest Control 99
                focuses on quality service, customer satisfaction, and complete protection throughout the year.
              </p>
              <p>{richContent.closingParagraph}</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href={`tel:${BUSINESS.phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold text-sm sm:text-base shadow-md transition-colors"
                >
                  Call Now: {richContent.phoneCta}
                </a>
                <a
                  href={whatsAppUrl(`Hi, I need pest control in ${area.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-green-600 text-green-700 hover:bg-green-50 px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="py-8 sm:py-10 bg-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              [CONTENT PLACEHOLDER — 150 words about pest control in {area.name}. Content writer will fill
              later. Must be unique per page.]
            </p>
          </div>
        </section>
      )}

      {/* Services grid */}
      <section className="py-10 sm:py-14 bg-gray-50" aria-labelledby="area-services-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 id="area-services-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Pest Control Services in {area.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {AREA_PAGE_SERVICES.map((service) => (
              <Link
                key={service.label}
                to={service.href}
                className="bg-white rounded-xl p-4 sm:p-5 text-center border border-gray-200 hover:border-green-500 hover:shadow-md transition-all"
              >
                <span className="font-semibold text-gray-900 text-sm sm:text-base">{service.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Free quote form — single, centered */}
      <AreaQuoteFormSection
        areaName={area.name}
        areaPath={areaPath}
        sectionId="free-quote"
        className="py-12 sm:py-16 bg-gradient-to-br from-green-50 via-white to-blue-50 border-y border-gray-100"
      />

      <AreaPageFAQ areaName={area.name} items={faqItems} />

      {/* Nearby areas */}
      {nearbyAreas.length > 0 && (
        <section className="py-10 sm:py-14 bg-white border-t border-gray-100">
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
    </div>
  );
}
