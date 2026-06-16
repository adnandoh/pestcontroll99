import { Link } from 'react-router-dom';
import AppImage from '@/components/AppImage';
import Breadcrumb from '@/components/Breadcrumb';
import PageMeta from '@/components/PageMeta';

export default function RodentPestControlPage() {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Rodent Pest Control Mumbai",
    "description": "Professional rodent pest control services in Mumbai with humane trapping, entry-point sealing, pet-safe methods, and 90-day warranty.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Pest Control 99",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "503 Sai Rushabh CHS Ltd, Geeta Nagar Phase 1, Mira Road",
        "addressLocality": "Thane",
        "addressRegion": "Maharashtra",
        "postalCode": "401107",
        "addressCountry": "IN"
      },
      "telephone": "+918080748282"
    },
    "areaServed": [
      { "@type": "City", "name": "Mumbai" },
      { "@type": "City", "name": "Thane" },
      { "@type": "City", "name": "Navi Mumbai" }
    ],
    "serviceType": "Rodent Control",
    "offers": {
      "@type": "Offer",
      "description": "Same-day rodent inspection and treatment with up to 90-day warranty"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageMeta
        title="Rodent & Rat Control in Mumbai | Removal & Entry Sealing"
        description="Effective rat & rodent control in Mumbai, Thane & Navi Mumbai. Trapping, baiting & entry-point sealing with 90-day warranty. Same-day service — +91 80807 48282."
        keywords="rodent control mumbai, rat control mumbai, rat removal, rodent pest control"
        canonical="https://www.pestcontrol99.com/services/rodent-pest-control/"
        ogUrl="https://www.pestcontrol99.com/services/rodent-pest-control/"
      />
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Services', href: '/services' },
        { label: 'Rodent Pest Control' }
      ]} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Rodent Control Mumbai — <span className="text-green-600">Effective Rat Removal & Entry Point Sealing</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-4">
                  Hearing scrapes in the ceiling or finding droppings by the stove? Rats spread germs and chew wires, then return through the same gaps each night. Our local team delivers rodent pest control with same-day inspection, entry-point sealing, and smart, pet-safe traps—so the noise stops and your home stays usable while we work.
                </p>
                <p className="text-sm text-gray-500 italic">
                  *Every home is different. Results can vary.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/quote"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Get My Inspection Slot →
                </Link>
                <a
                  href="https://wa.me/918080748282?text=Hello%20Pest%20Control%2099,%20can%20you%20share%20details%20and%20pricing%20for%20your%20rodent%20pest%20control%20services?"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full border-2 border-green-600 hover:bg-green-50 transition-colors duration-300"
                >
                  💬 WhatsApp 24 × 7: +91 80807 48282
                </a>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>4.9★ reviews</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <AppImage
                src="/images/Rat.webp"
                alt="Professional rat removal and rodent control Mumbai — entry-point sealing with smart traps"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why rodents keep coming back */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              Why Rodents Keep Coming Back (Even After You Trap)
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Rats and mice follow food, water, and shelter through the same routes each night. One trap catches a few, but open gaps, cluttered stores, and drain lines let the colony return and grow. A rat infestation grows because open gaps and easy food sources remain. You know rats produce 25000 thousand droppings each year and they spread acute allergic diseases. Rats scratches cables, wires, wood, books, food items get wasted as they need food and their teeth and nails keep growing so rats scratches a lot. To stop this you need to rodent removal services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's happening behind your walls */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              What&apos;s Happening Behind Your Walls
            </h2>
            
            <div className="space-y-6 text-lg text-gray-700">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <p><strong>Tell-tale signs:</strong> night scuttles, droppings, gnaw marks, a sharp urine smell; dark rub marks on skirting.</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <p><strong>Hidden routes:</strong> door gaps, AC sleeves, pipe cut-outs, broken drain grates, loft/duct voids link rooms.</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <p><strong>Mumbai food & water:</strong> open bins, pet bowls, and slow leaks feed rodents fast in humid weather.</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <p><strong>Why traps feel short-lived:</strong> a few catches don&apos;t close the highway; without proofing, new rats replace them. Without sealing these routes, rat control stays short-lived as new rodents replace the trapped ones.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our treatment */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Our Treatment — Simple, Humane, Effective
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Our rodent treatment combines proofing, smart traps, and safe baiting to cut activity fast. We proof entries with steel mesh and door sweeps, place tamper-resistant stations, and use targeted, pet-safe methods. Many sites calm the same day; lasting results come from sealing and smart monitoring. It&apos;s professional rat pest control that focuses on sealing first, then monitoring.
            </p>
            <Link to="/quote"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Book Rat Guard →
            </Link>
          </div>
        </div>
      </section>

      {/* How the visit works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              How the Visit Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Inspect</h3>
                <p className="text-gray-700 leading-relaxed">
                  We check inside and outside to trace runs and nightly paths. We mark droppings, nests, and every entry or chew gap.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Proof & seal</h3>
                <p className="text-gray-700 leading-relaxed">
                  We fit steel mesh, pipe collars, and door sweeps to block routes. Gaps from 10–50 mm are closed neatly and sealed flush.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Trap & monitor</h3>
                <p className="text-gray-700 leading-relaxed">
                  We set tamper-resistant stations and smart traps at mapped hotspots. Each placement is labeled and logged to track activity over days.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow-up</h3>
                <p className="text-gray-700 leading-relaxed">
                  You get an SMS in 14 days to confirm results or issues. We re-set stations, touch up proofing under your warranty, and share waste, storage, and leak fixes to prevent fresh visits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              Why Choose Us
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Warranty-backed, written cover</h3>
                <p className="text-gray-700 leading-relaxed">
                  You get a clear warranty for up to 90 days after service, in writing. If activity returns, we re-visit quickly and fix it at no extra cost.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Same-day inspections citywide</h3>
                <p className="text-gray-700 leading-relaxed">
                  Book before noon and we can reach most Mumbai suburbs the same day. Early checks reduce spread, cut stress, and speed up long-term control.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Transparent, all-inclusive pricing</h3>
                <p className="text-gray-700 leading-relaxed">
                  We give one quote that covers proofing, traps, and checks—no doorstep surprises. Our pest control prices are final and fair from the start.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Trained, discreet local technicians</h3>
                <p className="text-gray-700 leading-relaxed">
                  Crews use neat drill-and-seal methods and work professionally. They explain each step in simple words and respect your home or café.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Pet- and child-safe methods</h3>
                <p className="text-gray-700 leading-relaxed">
                  We use tamper-resistant stations and clear re-entry guidance. Placements are planned to keep curious hands and paws safe around treatment areas.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Neat proofing & sealing</h3>
                <p className="text-gray-700 leading-relaxed">
                  We drill only where needed and seal every gap flush to the surface. Entry points are blocked neatly so your rooms stay usable after service.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">service invoice and service reports</h3>
                <p className="text-gray-700 leading-relaxed">
                  A digital bill and photo-tagged notes arrive the same day. These help with property records, rentals, and FSSAI or internal audits.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Built-in follow-up support</h3>
                <p className="text-gray-700 leading-relaxed">
                  You receive an SMS in 14 days to confirm results or flag issues. If needed, touch-ups are scheduled fast under your written warranty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Coverage */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Service Coverage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-green-600 mb-4">Residential pest control services</h3>
                <p className="text-gray-700 leading-relaxed">
                  Flats, bungalows, societies, storerooms
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-green-600 mb-4">Commercial pest control services</h3>
                <p className="text-gray-700 leading-relaxed">
                  Cafés, cloud kitchens, warehouses, offices
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-700 mt-8">
              Need a rodent removal service or a rat exterminator near me? We serve Bandra, Andheri, Thane, Navi Mumbai and more. We provide rodent control services, residential pest control services, and commercial pest control services for flats, societies, cafés, warehouses, and offices.
            </p>
          </div>
        </div>
      </section>

      {/* What customers say */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
              What Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">&ldquo;Store rat-free in 48 hrs.&rdquo;</p>
                <p className="text-sm text-gray-500">- Amit P., Bandra</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">&ldquo;No more night noises in Andheri.&rdquo;</p>
                <p className="text-sm text-gray-500">- Sunita R., Andheri</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">&ldquo;FSSAI audit passed thanks to their service.&rdquo;</p>
                <p className="text-sm text-gray-500">- Vikram S., Thane</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg font-semibold text-green-600">6,432 Mumbai homes protected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Pricing
            </h2>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <p className="text-lg text-gray-700 mb-6">
                Our pest and rodent control plans are site-based; share your layout to get a single fair quote. Packages quotation will be provided to you by today!
              </p>
              <Link to="/quote"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                See My Rodent Quote →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick tips until we arrive */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              Quick Tips Until We Arrive
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Seal snacks and pet food in tight bins.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Tie trash nightly; rinse cans and dry the sink.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Block door gaps with a rolled towel; close balcony drains.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Skip DIY poison—odor can linger if rats die inside walls.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Ready for a rat-free home or café?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book a same-day inspection. Pay after service is complete; warranty covers any return within the window.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Schedule My Inspection →
              </Link>
              <a
                href="https://wa.me/918080748282?text=Hello%20Pest%20Control%2099,%20can%20you%20share%20details%20and%20pricing%20for%20your%20rodent%20pest%20control%20services?"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-green-600 transition-colors duration-300"
              >
                💬 WhatsApp 24 × 7: +91 80807 48282
              </a>
            </div>
            <p className="text-sm mt-6 opacity-75">
              No hidden fees • Humane trapping • Entry-point sealing • Warranty-backed
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
