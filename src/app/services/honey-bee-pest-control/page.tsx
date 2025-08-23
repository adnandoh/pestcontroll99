import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Honey Bee Pest Control Mumbai | Safe & Fast Hive Removal',
  description: 'Get safe honey bee pest control in Mumbai today. Same-day hive removal, eco-friendly methods, neat cleanup, GST billing & warranty-backed service',
  keywords: 'honey bee pest control, honey bee removal, bee hive removal, bee nest removal, pest control for honey bees, eco-friendly bee removal, how to get rid of honey bees, bee swarm removal, cost of bee removal, local pest control experts, safe for family and pets, bees in walls ceiling roof, beehive near home, bee exterminator near me, protecting environment while removing bees',
  openGraph: {
    title: 'Honey Bee Pest Control Mumbai | Safe & Fast Hive Removal',
    description: 'Get safe honey bee pest control in Mumbai today. Same-day hive removal, eco-friendly methods, neat cleanup, GST billing & warranty-backed service',
    type: 'website',
    images: ['/images/Honey Bee.webp'],
  },
  alternates: {
    canonical: 'https://www.pestcontrol99.com/services/honey-bee-pest-control',
  },
};

export default function HoneyBeePestControlPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Services', href: '/services' },
        { label: 'Honey Bee Pest Control' }
      ]} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Honey Bee Pest Control Mumbai — <span className="text-green-600">Remove Hives Safely Today</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-4">
                  Tired of bees buzzing around your home or office? Our expert team in Mumbai provides safe, eco-friendly honey bee pest control that removes hives quickly and keeps your space peaceful again.
                </p>
                <p className="text-lg text-gray-700 font-medium">
                  Most properties see relief within hours.*
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
                  href="https://wa.me/7710032627?text=Hello%20PestControl99,%20can%20you%20share%20details%20and%20pricing%20for%20your%20honey%20bee%20pest%20control%20services?"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full border-2 border-green-600 hover:bg-green-50 transition-colors duration-300"
                >
                  💬 WhatsApp 24 × 7: 98 XXX XX 990
                </a>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/images/Honey Bee.webp"
                alt="Professional honey bee pest control service in Mumbai"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Honey Bees Keep Coming Back */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              Why Honey Bees Keep Coming Back
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Simply chasing away or killing a few bees never solves the problem. Honey bees don&apos;t just hover around the surface — they build entire hives deep inside walls, ceilings, and tree cavities. Unless the hive and queen are safely removed, the colony keeps growing. That&apos;s why Honey Bee nest removal is necessary.
              </p>
              <p>
                In Mumbai&apos;s warm and humid climate, hives expand quickly, leading to honey leakage, foul odour, sticky residue, and even structural damage if ignored.
              </p>
              <p className="text-center font-semibold text-red-600 bg-red-50 p-4 rounded-lg">
                That&apos;s why professional bee control focuses on removing the hive completely and cleaning the area thoroughly — not on temporary fixes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Happening Inside a Hive */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              What&apos;s Happening Inside a Hive
            </h2>
            
            <div className="space-y-6 text-lg text-gray-700">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <p><strong>Hidden hive:</strong> Bees often settle in walls, balconies, lofts, or tree hollows, and colonies can grow to thousands within weeks.</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <p><strong>Early clues:</strong> Signs include buzzing near one spot, bees using a small entry crack, sticky honey stains, or bits of wax.</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <p><strong>Mumbai boost:</strong> The city&apos;s warm, humid climate accelerates hive growth and attracts ants or other pests to the honey.</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <p><strong>Why DIY fails:</strong> Smoke or quick fixes only move surface bees; true honey bee pest control removes the hive and queen fully.</p>
              </div>
            </div>
            
            <div className="mt-12 bg-green-50 p-8 rounded-2xl border border-green-200 text-center">
              <p className="text-lg text-gray-700 font-medium">
                Surface removal only scatters bees; our complete hive removal stops the colony permanently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Treatment */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Our Treatment — Safe, Eco-Friendly, Effective
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We remove hives using protective gear and eco-friendly methods, ensure safety for residents, and seal the area to stop bees from returning. No toxic chemicals, no damage, and a tidy cleanup after. Many homes and businesses feel safer the same day; results may vary.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Book My Bee Hive Removal →
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
                  We trace hive activity, check entry points, and assess hive size and risk. A quick report shows exact locations and safety concerns.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Remove hive</h3>
                <p className="text-gray-700 leading-relaxed">
                  Using protective gear, we safely remove or relocate the hive depending on the situation. Bees are handled with care, reducing risk to people and pets. Yet when bee swarmed removal is not that simple and that&apos;s why someone will expertise needed to remove it with care.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Seal & clean</h3>
                <p className="text-gray-700 leading-relaxed">
                  We clean honey residue, wax, and stains, then seal entry points to stop re-infestation. Area is sanitized to prevent ants and odour.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow-up</h3>
                <p className="text-gray-700 leading-relaxed">
                  Thirty days later, we confirm the hive has not returned. Warranty covers free re-treatment if bees reappear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              Why Choose Us
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Same-day inspections</h3>
                <p className="text-gray-700 leading-relaxed">
                  Booking is open 24/7, and a licensed inspector can reach most Mumbai suburbs the very same day. Before arriving, we always call in advance so you&apos;re prepared and avoid any inconvenience.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Transparent pest control prices</h3>
                <p className="text-gray-700 leading-relaxed">
                  After inspection, you receive one all-inclusive quote covering hive removal, labour, cleanup, and follow-ups. The price you sign is the price you pay—no doorstep add-ons.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Trained local technicians</h3>
                <p className="text-gray-700 leading-relaxed">
                  Each crew member logs 300+ hours on bee control, hive removal, and safe sealing. They explain each step, work neatly, and leave your property spotless.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Eco-friendly, family-safe removal</h3>
                <p className="text-gray-700 leading-relaxed">
                  We use safe methods with no harsh chemicals. Kids, pets, and elders remain safe; rooms/ locations are usable quickly after service.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Minimal disruption</h3>
                <p className="text-gray-700 leading-relaxed">
                  No need to vacate your house or office. Our team works quickly, removes the hive safely, and cleans all residues.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">GST invoice & service report</h3>
                <p className="text-gray-700 leading-relaxed">
                  You receive a digital GST bill plus a service report. Perfect for property files, offices, and rentals.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Built-in follow-up support</h3>
                <p className="text-gray-700 leading-relaxed">
                  You get an SMS to confirm results or request a recheck thirty days later. Warranty visits are scheduled promptly for peace of mind.
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
            <p className="text-lg text-gray-700 leading-relaxed">
              Need honey bee control in Mumbai suburbs near you? We serve Bandra, Andheri, Thane, Navi Mumbai and more—covering residential flats, bungalows, commercial shops, cafés, and offices.
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
                <p className="text-gray-700 mb-4">&ldquo;They safely removed the hive from my balcony without any mess.&rdquo;</p>
                <p className="text-sm text-gray-500">- Priya M., Bandra</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">&ldquo;Professional service, no damage to our office building.&rdquo;</p>
                <p className="text-sm text-gray-500">- Rajesh K., Andheri</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">&ldquo;Eco-friendly approach, safe for our children and pets.&rdquo;</p>
                <p className="text-sm text-gray-500">- Sunita R., Thane</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg font-semibold text-green-600">2,847 Mumbai properties protected</p>
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
                Your honey bee removal cost depends on hive size and location: residential or commercial. We send a same-day, all-inclusive quote with no doorstep add-ons.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Get Your Quote Now
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
                <p className="text-gray-700">Avoid disturbing or poking the hive—it triggers swarming</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Keep children and pets indoors, away from hive areas</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Do not block bee entry points—this may force them inside</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Avoid spraying chemicals—they only kill a few bees and can make colonies aggressive</p>
              </div>
            </div>
            <div className="mt-8 bg-blue-50 p-6 rounded-2xl border border-blue-200 text-center">
              <p className="text-lg text-gray-700 font-medium">
                Seeing bees swarming near your property? It&apos;s a bee hive home. Book a pest control for honey bee removal before the problem worsens.
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
              Ready to Remove the Hive?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book a same-day inspection. Pay after service is complete; warranty covers any hive return.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Schedule My Inspection →
              </Link>
              <a
                href="https://wa.me/7710032627?text=Hello%20PestControl99,%20can%20you%20share%20details%20and%20pricing%20for%20your%20honey%20bee%20pest%20control%20services?"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-green-600 transition-colors duration-300"
              >
                💬 WhatsApp 24 × 7: 98 XXX XX 990
              </a>
            </div>
            <p className="text-sm mt-6 opacity-75">
              No hidden fees • Eco-friendly treatment • Neat removal & cleanup • Warranty-backed
            </p>
          </div>
        </div>
      </section>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Honey Bee Pest Control Mumbai",
            "description": "Safe and eco-friendly honey bee removal services in Mumbai. Same-day hive removal with professional technicians.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "PestControl99",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Mumbai",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              },
              "telephone": "+91-7710032627"
            },
            "areaServed": {
              "@type": "City",
              "name": "Mumbai"
            },
            "serviceType": "Honey Bee Pest Control",
            "offers": {
              "@type": "Offer",
              "description": "Professional honey bee removal with warranty",
              "priceCurrency": "INR"
            }
          })
        }}
      />
    </div>
  );
}
