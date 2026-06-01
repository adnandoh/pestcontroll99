import { BUSINESS } from '@/config/business';

export default function TrustSection() {
  return (
    <section className="py-12 sm:py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Trusted Pest Control in {BUSINESS.serviceAreas.join(', ')}
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            {BUSINESS.legalOperatorLine} Verified business details for your peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Business address
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">{BUSINESS.address.full}</p>
            <p className="text-xs text-gray-500 mt-2">Legal entity: {BUSINESS.legalName}</p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Customer reviews
            </p>
            <p className="text-2xl font-bold text-green-700">
              {BUSINESS.aggregateRating.ratingValue}
              <span className="text-base font-medium text-gray-600"> / 5</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Based on {BUSINESS.aggregateRating.reviewCount}+ verified service reviews
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Certifications
            </p>
            <ul className="space-y-2">
              {BUSINESS.certifications.map((item) => (
                <li key={item} className="text-sm text-gray-800 flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {BUSINESS.serviceAreas.map((area) => (
            <span
              key={area}
              className="rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-800"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
