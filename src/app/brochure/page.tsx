import { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumb';
import PageMeta from '@/components/PageMeta';
import AppImage from '@/components/AppImage';
import {
  BROCHURE_HIGHLIGHTS,
  BROCHURE_REGIONS,
  BROCHURE_SERVICES,
  getBrochureSections,
  getSectionMeta,
  type BrochureRegion,
  type BrochureRateSection,
} from '@/config/brochureRates';
import { BUSINESS, DEFAULT_WHATSAPP_MESSAGE, whatsAppUrl } from '@/config/business';

const POPULAR_PROPERTY = '2 BHK';

/* Pastel palettes rotated across the six trust badges */
const BADGE_STYLES = [
  { bg: 'bg-green-50', ring: 'bg-green-600', border: 'border-green-100' },
  { bg: 'bg-sky-50', ring: 'bg-sky-600', border: 'border-sky-100' },
  { bg: 'bg-amber-50', ring: 'bg-amber-500', border: 'border-amber-100' },
  { bg: 'bg-emerald-50', ring: 'bg-emerald-600', border: 'border-emerald-100' },
  { bg: 'bg-indigo-50', ring: 'bg-indigo-600', border: 'border-indigo-100' },
  { bg: 'bg-rose-50', ring: 'bg-rose-500', border: 'border-rose-100' },
] as const;

const PHOTO_STRIP = [
  {
    src: '/images/pest-control-technician-hero.webp',
    alt: 'Licensed Pest Control 99 technician in uniform treating a Mumbai home',
    label: 'Licensed technicians',
  },
  {
    src: '/images/heroimage.webp',
    alt: 'Professional pest control treatment in progress at a residential kitchen',
    label: 'Safe home treatment',
  },
  {
    src: '/images/sliderpest.webp',
    alt: 'Pest Control 99 equipment and safety gear used during service',
    label: 'Professional equipment',
  },
  {
    src: '/images/aboutus.webp',
    alt: 'Pest Control 99 team ready for same-day pest control service',
    label: 'Same-day service team',
  },
] as const;

function PhoneIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h2.5a1 1 0 011 .76l1 4a1 1 0 01-.5 1.1L8 10a11 11 0 006 6l1.14-2a1 1 0 011.1-.5l4 1a1 1 0 01.76 1V19a2 2 0 01-2 2A16 16 0 013 5z"
      />
    </svg>
  );
}

function QuoteIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function RateCard({ section }: { section: BrochureRateSection }) {
  const meta = getSectionMeta(section.id);
  const priceColumns = section.columns.slice(1);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(17,28,78,0.08)] transition-shadow hover:shadow-[0_8px_32px_rgba(17,28,78,0.14)]">
      {/* Card header with pest icon */}
      <div className="bg-gradient-to-br from-green-pale/70 via-white to-white px-5 pt-6 pb-4 sm:px-6">
        <div className="flex items-start gap-4">
          {meta && (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-green-100 bg-[#F4F7EF] shadow-sm">
              <AppImage src={meta.icon} alt="" width={56} height={56} className="h-12 w-12 object-contain" />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-gray-900 leading-snug">{section.title}</h3>
            {section.subtitle && <p className="mt-0.5 text-sm text-gray-500">{section.subtitle}</p>}
            {meta && <p className="mt-1.5 text-xs text-gray-600 italic leading-relaxed">{meta.tagline}</p>}
          </div>
        </div>
        {section.warranty && (
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                clipRule="evenodd"
              />
            </svg>
            {section.warranty}
          </span>
        )}
      </div>

      {/* Price rows */}
      <div className="flex-1 space-y-2 px-4 pb-5 pt-2 sm:px-5">
        {section.rows.map((row, idx) => {
          const property = String(row[section.columns[0].key]);
          const isPopular = property === POPULAR_PROPERTY;
          return (
            <div
              key={`${section.id}-${idx}`}
              className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                isPopular
                  ? 'border-2 border-green-500 bg-green-50/70'
                  : idx % 2 === 0
                    ? 'bg-slate-50/80'
                    : 'bg-white border border-gray-100'
              }`}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-bold ${
                    isPopular ? 'bg-green-600 text-white' : 'bg-navy-pale text-navy-base'
                  }`}
                >
                  {property}
                </span>
                {isPopular && (
                  <span className="inline-flex shrink-0 items-center rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-950">
                    Popular
                  </span>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-4 text-right">
                {priceColumns.map((col) => (
                  <div key={col.key} className="min-w-0">
                    {priceColumns.length > 1 && (
                      <span className="block text-[10px] font-medium uppercase tracking-wide text-gray-400">
                        {col.label}
                      </span>
                    )}
                    <span className="block text-base font-bold text-green-700 whitespace-nowrap sm:text-lg">
                      {row[col.key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {section.note && (
        <p className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500 sm:px-6">{section.note}</p>
      )}
    </article>
  );
}

export default function BrochurePage() {
  const [region, setRegion] = useState<BrochureRegion>('mumbai');
  const sections = getBrochureSections(region);
  const activeRegion = BROCHURE_REGIONS.find((r) => r.id === region)!;

  return (
    <div className="min-h-screen bg-slate-50">
      <PageMeta
        title="Service Brochure & Rate Card | Pest Control 99"
        description="Official Pest Control 99 brochure — transparent rates for Mumbai, Thane, Navi Mumbai & Lonavala. Cockroach, termite, bed bug, mosquito & rodent pricing with warranty."
        keywords="pest control rate card, pest control prices mumbai, lonavala pest control rates, pest control 99 brochure"
        canonical="https://www.pestcontrol99.com/brochure/"
        ogUrl="https://www.pestcontrol99.com/brochure/"
      />
      <Breadcrumb items={[{ label: 'Brochure & Rates' }]} />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden text-white">
        {/* Background photo with dark overlay */}
        <div className="absolute inset-0">
          <AppImage
            src="/images/pest-control-technician-hero.webp"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F44]/90 via-[#0A1F44]/80 to-[#133A6B]/75" />
        </div>

        <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            {/* Ribbon badge */}
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-amber-400/15 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300 backdrop-blur-sm">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10 2l2.09 4.26L17 7l-3.45 3.03L14.18 15 10 12.77 5.82 15l.63-4.97L3 7l4.91-.74L10 2z" />
              </svg>
              Official Rate Card 2026
            </span>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {BUSINESS.brandName} Service Brochure
            </h1>
            <p className="mt-5 text-base text-slate-200 sm:text-lg leading-relaxed">
              Transparent pricing for homes, villas, resorts & commercial properties across{' '}
              {BUSINESS.serviceAreas.join(', ')}. All rates include professional inspection, safe
              treatment & warranty-backed service.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/quote/" className="btn btn-cta btn-quote-rounded btn-quote-lg w-full sm:w-auto">
                Get Free Quote
              </Link>
              <a
                href={whatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition-colors"
              >
                WhatsApp {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST BADGES ============ */}
      <section className="border-b border-gray-200 bg-white py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BROCHURE_HIGHLIGHTS.map((item, idx) => {
              const style = BADGE_STYLES[idx % BADGE_STYLES.length];
              return (
                <div
                  key={item.title}
                  className={`flex gap-4 rounded-2xl border ${style.border} ${style.bg} p-6 transition-transform duration-200 hover:-translate-y-1`}
                >
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${style.ring} text-white shadow-md`}
                  >
                    <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">{item.title}</h2>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ RATE CARD ============ */}
      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Rate Card</h2>
            <p className="mt-3 text-gray-600">Select your service region to view applicable rates.</p>
          </div>

          {/* Region tabs */}
          <div className="mx-auto mb-10 flex max-w-lg flex-col gap-2 rounded-2xl bg-white p-1.5 shadow-[0_4px_20px_rgba(17,28,78,0.08)] sm:flex-row">
            {BROCHURE_REGIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRegion(r.id)}
                className={`flex-1 rounded-xl px-4 py-3 text-left transition-all ${
                  region === r.id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="block text-sm font-bold">{r.label}</span>
                <span className={`block text-xs mt-0.5 ${region === r.id ? 'text-green-100' : 'text-gray-500'}`}>
                  {r.description}
                </span>
              </button>
            ))}
          </div>

          <p className="mb-8 text-center text-sm font-medium text-green-700">
            Showing rates for: <span className="font-bold">{activeRegion.label}</span>
          </p>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
            {sections.map((section) => (
              <RateCard key={section.id} section={section} />
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-gray-500">
            * Commercial, society & large-property rates are provided after a free site inspection.
            Honey bee removal and wood borer treatment quoted on request. GST applicable where required.
            Rates subject to change; confirmed quote applies at booking.
          </p>
        </div>
      </section>

      {/* ============ PHOTO STRIP ============ */}
      <section className="border-t border-gray-200 bg-white py-14 sm:py-16" aria-label="Our team at work">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Our Team at Work</h2>
            <p className="mt-3 text-gray-600">
              Trained, uniformed technicians with professional equipment — on time, every time.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {PHOTO_STRIP.map((photo) => (
              <figure
                key={photo.src}
                className="group relative overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(17,28,78,0.1)]"
              >
                <AppImage
                  src={photo.src}
                  alt={photo.alt}
                  width={480}
                  height={360}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-8 text-sm font-semibold text-white">
                  {photo.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES LIST ============ */}
      <section className="border-t border-gray-200 bg-slate-50 py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-xl font-bold text-gray-900 sm:text-2xl">
              Services We Offer
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {BROCHURE_SERVICES.map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3.5 text-sm font-medium text-gray-800 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden bg-navy-dark py-16 text-white sm:py-20">
        {/* Dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1.2px, transparent 1.2px)',
            backgroundSize: '26px 26px',
          }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-green-500/15 blur-3xl" aria-hidden="true" />

        <div className="container relative mx-auto px-4 text-center sm:px-6">
          <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">Ready to Book?</h2>
          <p className="mx-auto mb-10 max-w-xl text-slate-300">
            Call {BUSINESS.phoneDisplay} for same-day service or request a free inspection online.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={`tel:${BUSINESS.phoneTel}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-9 py-4 text-base font-bold text-navy-dark shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
            >
              <PhoneIcon />
              Call Now
            </a>
            <Link
              to="/quote/"
              className="btn btn-cta btn-quote-rounded btn-quote-lg inline-flex w-full items-center justify-center gap-2.5 sm:w-auto"
            >
              <QuoteIcon />
              Get Free Quote
            </Link>
          </div>
          <p className="mt-8 text-xs text-slate-400">
            {BUSINESS.legalName} · {BUSINESS.websiteDisplay}
          </p>
        </div>
      </section>
    </div>
  );
}
