import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Termite Pest Control Mumbai | Same-Day, Low-Odour',
  description: 'Termite pest control Mumbai made simple: same-day inspection, low-odour borate injection, neat drill-and-seal, transparent treatment cost, warranty, and GST report.',
  keywords: 'termite pest control mumbai, anti-termite treatment, termite control mumbai, anti termite treatment price, termite treatment for house, termite injection, deemak on walls, termite control services, termite treatment cost',
  openGraph: {
    title: 'Termite Pest Control Mumbai | Same-Day, Low-Odour',
    description: 'Termite pest control Mumbai made simple: same-day inspection, low-odour borate injection, neat drill-and-seal, transparent treatment cost, warranty, and GST report.',
    type: 'website',
    images: ['/images/termite-control-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.pestcontrol99.com/services/termite-pest-control',
  },
};

export default function TermitePestControlPage() {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Termite Pest Control Mumbai",
    "description": "Professional termite pest control services in Mumbai with low-odour borate treatment, neat drill-and-seal, transparent pricing, and GST reports.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "PestControl99",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "telephone": "+917710032627"
    },
    "areaServed": {
      "@type": "City",
      "name": "Mumbai"
    },
    "serviceType": "Termite Control",
    "offers": {
      "@type": "Offer",
      "description": "Same-day termite inspection and treatment with up to 5-year warranty"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Services', href: '/services' },
        { label: 'Termite Pest Control' }
      ]} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Termite Pest Control Mumbai — <span className="text-green-600">Safe. Same-Day Wood Protection</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-4">
                  Silent damage stops today. Local team for termite pest control. Low-odour borate treatment, neat drill-and-seal work. Rooms stay livable once dry.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Get My Inspection Slot →
                </Link>
                <a
                  href="https://wa.me/7710032627?text=Hello%20PestControl99,%20can%20you%20share%20details%20and%20pricing%20for%20your%20termite%20pest%20control%20services?"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full border-2 border-green-600 hover:bg-green-50 transition-colors duration-300"
                >
                  💬 WhatsApp 24 × 7: 98 XXX XX 990
                </a>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>4.9★ reviews</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>Warranty options</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 mr-1">📋</span>
                  <span>GST/FSSAI report</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/images/Termite Control.webp"
                alt="Professional termite pest control service in Mumbai"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why termites keep coming back */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              Why Termites Keep Coming Back (Even After You Spray)
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Termites live deep in walls, feed all day, and never like light. A surface spray hits only the scouts you see; the colony keeps eating. Warm, humid Mumbai flats speed up the damage, so wood weakens fast. Proper termite treatment for a house targets hidden galleries, not just the scouts you see.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's happening inside your wood */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              What&apos;s Happening Inside Your Wood
            </h2>
            
                         <div className="space-y-6 text-lg text-gray-700">
               <div className="flex items-start space-x-4">
                 <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                   <span className="text-sm font-bold">!</span>
                 </div>
                 <p><strong>Feeding tunnels:</strong> Termites build hidden mud tubes from soil to door frames, wardrobes, and skirting; these moist tunnels let them chew wood unseen.</p>
               </div>
               
               <div className="flex items-start space-x-4">
                 <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                   <span className="text-sm font-bold">!</span>
                 </div>
                 <p><strong>Early clues:</strong> A hollow tap, blistered paint, or pepper-like frass pellets are slight hints that a colony is already active inside the timber.</p>
               </div>
               
               <div className="flex items-start space-x-4">
                 <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                   <span className="text-sm font-bold">!</span>
                 </div>
                 <p><strong>Mumbai moisture boost:</strong> Warm, damp walls and slow leaks speed egg growth and spread galleries through flats in just a few weeks.</p>
               </div>
               
               <div className="flex items-start space-x-4">
                 <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                   <span className="text-sm font-bold">!</span>
                 </div>
                 <p><strong>Why sprays feel useless:</strong> A Surface spray knockdowns upper termites on the surface but misses deep galleries; a targeted termite injection reaches the colony the queen relies on.</p>
               </div>
             </div>
            
                         <div className="mt-12 bg-green-50 p-8 rounded-2xl border border-green-200 text-center">
               <p className="text-lg text-gray-700 font-medium">
                 &ldquo;White ant&rdquo; myth: they&apos;re termites; they nest in soil/walls and tunnel to wood.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* Our treatment */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Our Treatment — Simple, Low-Odour, Effective
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We inject borate into damaged wood, create an anti-termite treatment barrier along the floor and wall, and use bait only where needed. No harsh smell, no stains; furniture usually stays put. Many homes feel safer the same day; results may vary.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Book Termite Shield →
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
                  We probe wood, map moisture, and trace every mud tube from floor to ceiling. A quick report lists each hollow zone and entry line.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Treat wood</h3>
                <p className="text-gray-700 leading-relaxed">
                  Tiny borate shots go straight into hidden galleries and joints. We seal the needle holes flush, so paint and polish look the same.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Build barrier & clean</h3>
                <p className="text-gray-700 leading-relaxed">
                  We drill along skirting, inject termiticide, plug neatly, and wipe all dust. Furniture stays in place, and rooms remain tidy.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow-up</h3>
                <p className="text-gray-700 leading-relaxed">
                  Thirty days later, we text to confirm silence inside your wood. If termites reappear, the warranty covers a free re-treat.
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
                <h3 className="text-lg font-bold text-gray-900 mb-4">Long warranty cover</h3>
                <p className="text-gray-700 leading-relaxed">
                  We back every service with a written warranty of up to five years. If live termites reappear in treated zones, we re-treat at no cost.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Same-day inspections</h3>
                <p className="text-gray-700 leading-relaxed">
                  Book before noon; a licensed inspector can reach most Mumbai suburbs the same day. Early detection keeps drill grids smaller and repair bills lower.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Transparent pest control prices</h3>
                <p className="text-gray-700 leading-relaxed">
                  After inspection, you receive one all-inclusive quote that covers chemicals, labour, plugs, and follow-ups. The price you sign is the price you pay—no doorstep add-ons.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Trained local technicians</h3>
                <p className="text-gray-700 leading-relaxed">
                  Each crew member logs 300+ field hours on drilling angles, moisture mapping, and neat sealing. They work tidily, explain each step, and leave your home spotless.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Low-odour, family-friendly treatment</h3>
                <p className="text-gray-700 leading-relaxed">
                  Water-based borate formulas dry fast and carry almost no smell. Kids, pets, and sensitive elders can re-enter rooms in about an hour.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Minimal prep, no furniture shift</h3>
                <p className="text-gray-700 leading-relaxed">
                  We drill 6 mm holes along the skirting and seal them flush with colour-matched plugs. Furniture stays in place, and dust is vacuumed before we leave.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">GST invoice & service report</h3>
                <p className="text-gray-700 leading-relaxed">
                  You receive a digital GST bill plus a photo-tagged service report within hours. Perfect for property files or rentals.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Built-in follow-up support</h3>
                <p className="text-gray-700 leading-relaxed">
                  You get an SMS to confirm results or request a check thirty days later. Warranty visits are scheduled fast, keeping your wood safe long-term.
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
                  Apartments, bungalows, wardrobes, kitchens
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-green-600 mb-4">Commercial pest control services</h3>
                <p className="text-gray-700 leading-relaxed">
                  Cafés, bakeries, offices, wooden fixtures
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-700 mt-8">
              Need termite pest control Mumbai suburbs near you? We serve Bandra, Andheri, Thane, Navi Mumbai and more—offering residential pest control services for flats and bungalows and commercial pest control services for cafés, offices, and shops.
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
                                 <p className="text-gray-700 mb-4">&ldquo;They cleared my Bandra café&apos;s termites in one visit.&rdquo;</p>
                <p className="text-sm text-gray-500">- Amit P., Bandra</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">&ldquo;No drilling mess; kitchen stayed clean in Andheri.&rdquo;</p>
                <p className="text-sm text-gray-500">- Sunita R., Andheri</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">&ldquo;FSSAI audit passed thanks to their digital report.&rdquo;</p>
                <p className="text-sm text-gray-500">- Vikram S., Thane</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg font-semibold text-green-600">8,756 Mumbai homes protected</p>
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
                Your termite treatment cost depends on the type of property: commercial or residential. We send a same-day, all-inclusive quote with no doorstep add-ons.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                See My Termite Quote →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do you need to drill? Will it show?</h3>
                <p className="text-gray-700">We drill small 6mm holes along skirting and seal them with color-matched plugs. The holes are barely visible and blend with your existing finish.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Is it safe for kids/pets? Odour?</h3>
                <p className="text-gray-700">Yes, water-based borate formulas are low-odour and safe once dry. Kids and pets can re-enter rooms in about an hour after treatment.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How long until termites stop?</h3>
                <p className="text-gray-700">Most homes see results within hours. We follow up after 30 days to confirm the treatment is working effectively.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Will you move furniture?</h3>
                <p className="text-gray-700">Usually no. We work around furniture when possible. If movement is needed, we handle it carefully and return everything to its place.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What does the warranty cover?</h3>
                <p className="text-gray-700">Up to 5-year warranty covers re-treatment if live termites reappear in treated zones. No additional cost for warranty service.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do I get a GST invoice / kitchen report?</h3>
                <p className="text-gray-700">Yes, you receive a digital GST invoice and photo-tagged service report within hours. Perfect for property files, rentals, or FSSAI compliance.</p>
              </div>
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
                <p className="text-gray-700">Fix leaks and wipe damp spots</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Lift wood off the floor with blocks</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Keep cupboards aired; no plastic covers</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Skip store sprays—they scatter termites deeper</p>
              </div>
            </div>
            <div className="mt-8 bg-yellow-50 p-6 rounded-2xl border border-yellow-200 text-center">
              <p className="text-lg text-gray-700 font-medium">
                Seeing Deemak on walls? Skip store sprays—book an inspection so we treat the source.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Ready to Protect Your Wood?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book a same-day inspection. Pay after service is complete; warranty covers any return.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Schedule My Inspection →
              </Link>
                              <a
                  href="https://wa.me/7710032627?text=Hello%20PestControl99,%20can%20you%20share%20details%20and%20pricing%20for%20your%20termite%20pest%20control%20services?"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-green-600 transition-colors duration-300"
                >
                  💬 WhatsApp 24 × 7: 98 XXX XX 990
                </a>
            </div>
            <p className="text-sm mt-6 opacity-75">
              No hidden fees • Low-odour treatment • Neat drill & seal • Warranty-backed
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
