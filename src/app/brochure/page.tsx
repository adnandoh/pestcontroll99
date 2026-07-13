import { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumb';
import PageMeta from '@/components/PageMeta';
import {
  BROCHURE_HIGHLIGHTS,
  BROCHURE_REGIONS,
  BROCHURE_SERVICES,
  getBrochureSections,
  type BrochureRegion,
  type BrochureRateSection,
} from '@/config/brochureRates';
import { BUSINESS, DEFAULT_WHATSAPP_MESSAGE, whatsAppUrl } from '@/config/business';

function RateTable({ section }: { section: BrochureRateSection }) {
  return (
    <article className="brochure-rate-card overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-gradient-to-r from-slate-50 to-green-50/60 px-5 py-4 sm:px-6">
        <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
        {section.subtitle && <p className="mt-1 text-sm text-gray-600">{section.subtitle}</p>}
        {section.warranty && (
          <span className="mt-2 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
            {section.warranty}
          </span>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[280px] text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/80">
              {section.columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-5 py-3 font-semibold text-gray-700 ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, idx) => (
              <tr
                key={`${section.id}-${idx}`}
                className="border-b border-gray-50 last:border-0 even:bg-gray-50/40"
              >
                {section.columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-5 py-3 text-gray-800 ${col.align === 'right' ? 'text-right font-semibold text-green-800 whitespace-nowrap' : 'font-medium'}`}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-dark text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(34,197,94,0.15),_transparent_55%)]" />
        <div className="container relative mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-green-300">
              Official Rate Card 2026
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {BUSINESS.brandName} Service Brochure
            </h1>
            <p className="mt-4 text-base text-slate-300 sm:text-lg leading-relaxed">
              Transparent pricing for homes, villas, resorts & commercial properties across{' '}
              {BUSINESS.serviceAreas.join(', ')}. All rates include professional inspection, safe
              treatment & warranty-backed service.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/quote/" className="btn btn-cta btn-quote-rounded btn-quote-lg w-full sm:w-auto">
                Get Free Quote
              </Link>
              <a
                href={whatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition-colors"
              >
                WhatsApp {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-b border-gray-200 bg-white py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BROCHURE_HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border border-gray-100 bg-slate-50/80 p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-600 text-white text-lg font-bold">
                  ✓
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">{item.title}</h2>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Region + Rates */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Rate Card</h2>
            <p className="mt-2 text-gray-600">Select your service region to view applicable rates.</p>
          </div>

          {/* Region tabs */}
          <div className="mx-auto mb-8 flex max-w-lg flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm sm:flex-row">
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

          <p className="mb-6 text-center text-sm font-medium text-green-700">
            Showing rates for: <span className="font-bold">{activeRegion.label}</span>
          </p>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {sections.map((section) => (
              <RateTable key={section.id} section={section} />
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
            * Commercial, society & large-property rates are provided after a free site inspection.
            Honey bee removal and wood borer treatment quoted on request. GST applicable where required.
            Rates subject to change; confirmed quote applies at booking.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="border-t border-gray-200 bg-white py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl mb-6 text-center">
              Services We Offer
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BROCHURE_SERVICES.map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-3 rounded-lg border border-gray-100 bg-slate-50 px-4 py-3 text-sm font-medium text-gray-800"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-green-600" />
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-dark py-12 sm:py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl mb-3">Ready to Book?</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Call {BUSINESS.phoneDisplay} for same-day service or request a free inspection online.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${BUSINESS.phoneTel}`}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-navy-dark hover:bg-gray-100 transition-colors"
            >
              Call Now
            </a>
            <Link
              to="/quote/"
              className="btn btn-cta btn-quote-rounded btn-quote-lg w-full sm:w-auto"
            >
              Get Free Quote
            </Link>
          </div>
          <p className="mt-6 text-xs text-slate-400">
            {BUSINESS.legalName} · {BUSINESS.websiteDisplay}
          </p>
        </div>
      </section>
    </div>
  );
}
