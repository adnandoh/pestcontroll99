import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Wood Borer Control Mumbai | Same-Day, Low-Odour',
  description: 'Wood borer control Mumbai made easy: same-day inspection, neat borate injection, low-odour service, transparent treatment cost',
  keywords: 'wood borer control, wood borer control mumbai, wood borer treatment, wood borer pest control, wood borer injection, furniture borer control, wood borer powder, wood borer holes, wood borer larvae, wood borer damage, wood borer inspection, wood borer removal, wood borer prevention, wood borer cost, wood borer service',
  openGraph: {
    title: 'Wood Borer Control Mumbai | Same-Day, Low-Odour',
    description: 'Wood borer control Mumbai made easy: same-day inspection, neat borate injection, low-odour service, transparent treatment cost',
    type: 'website',
    images: ['/images/Wood Borer.webp'],
  },
  alternates: {
    canonical: 'https://www.pestcontrol99.com/services/wood-borer-control',
  },
};

export default function WoodBorerControlPage() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb items={[
        { label: 'Services', href: '/services' },
        { label: 'Wood Borer Control' }
      ]} />

      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Wood Borer Control Mumbai — <span className="text-green-600">Save Your Furniture Today</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-4">
                  Powder in corners stops now. Local team for wood borer pest control. Low-odour borate treatment, neat drill-and-seal work. Rooms stay livable once dry.
                </p>
                <p className="text-lg text-gray-700 font-medium">
                  Most furniture sees protection within hours.*
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
                  href="https://wa.me/7710032627?text=Hello%20PestControl99,%20can%20you%20share%20details%20and%20pricing%20for%20your%20wood%20borer%20control%20services?"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full border-2 border-green-600 hover:bg-green-50 transition-colors duration-300"
                >
                  💬 WhatsApp 24 × 7: 98 XXX XX 990
                </a>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/images/Wood Borer.webp"
                alt="Professional wood borer control service in Mumbai"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              Why Wood Borers Keep Coming Back (Even After You Spray)
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Wood borers hatch inside timber, feed on starch, and leave fine powder holes. A surface spray hits only adults on the outside; the larvae inside keep tunneling. Warm, humid Mumbai flats speed up the damage, so furniture weakens fast. Proper wood borer treatment targets hidden larvae inside the wood, not just the visible powder.
              </p>
              <p className="text-center font-semibold text-red-600 bg-red-50 p-4 rounded-lg">
                Surface treatments only kill visible beetles; our deep injection reaches the larvae destroying your furniture from within.
              </p>
            </div>
          </div>
        </div>
      </section>

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
                <p><strong>Hidden larvae:</strong> Eggs hatch inside wood, and larvae tunnel through beams, wardrobes, and furniture for months before emerging.</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <p><strong>Early clues:</strong> Tiny exit holes, fine powder (frass) on the floor, and weak joints are subtle signs that borers are active inside.</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <p><strong>Mumbai boost:</strong> Humid air and damp walls create perfect conditions for fast breeding. Infested furniture can crumble in weeks.</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <p><strong>Why sprays fail:</strong> A surface spray kills only visible beetles. A proper wood borer injection reaches deep galleries where larvae feed.</p>
              </div>
            </div>
            
            <div className="mt-12 bg-green-50 p-8 rounded-2xl border border-green-200 text-center">
              <p className="text-lg text-gray-700 font-medium">
                Surface treatments miss the real problem; our deep injection targets the larvae destroying your furniture from within.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Our Treatment — Simple, Low-Odour, Effective
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We inject borate into infested wood, create a protective barrier, and apply surface protection where needed. No harsh smell, no stains; furniture usually stays in place. Many homes feel safer the same day; results may vary.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Book Wood Borer Shield →
            </Link>
          </div>
        </div>
      </section>

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
                  We probe wood, tap-test furniture, and trace powder trails across beams, cupboards, and flooring. A quick report lists each hollow zone and exit hole.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Treat wood</h3>
                <p className="text-gray-700 leading-relaxed">
                  Tiny borate shots go straight into larvae galleries and joints. We seal needle holes flush, keeping polish and paint intact.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Protect & clean</h3>
                <p className="text-gray-700 leading-relaxed">
                  We inject infested furniture, apply a protective layer where needed, and wipe all dust. Furniture stays put, and rooms remain tidy.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow-up</h3>
                <p className="text-gray-700 leading-relaxed">
                  Thirty days later, we text to confirm silence inside your wood. If borers reappear, the warranty covers a free re-treat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  Book before noon; a licensed inspector can reach most Mumbai suburbs the same day. Quick action saves your furniture from collapse.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Transparent pest control prices</h3>
                <p className="text-gray-700 leading-relaxed">
                  After inspection, you receive one all-inclusive quote covering chemicals, labour, plugs, and follow-ups. The price you sign is the price you pay—no doorstep add-ons.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Trained local technicians</h3>
                <p className="text-gray-700 leading-relaxed">
                  Each crew member logs 300+ hours on wood inspection, injection angles, and neat sealing. They work tidily, explain each step, and leave your home spotless.
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
                  We drill 6 mm holes, inject, and seal them flush with colour-matched plugs. Furniture stays in place, and dust is vacuumed before we leave.
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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Service Coverage
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Need a wood borer control Mumbai suburbs near you? We serve Bandra, Andheri, Thane, Navi Mumbai and more—offering residential pest control for flats and bungalows and commercial pest control for cafés, offices, and shops.
            </p>
          </div>
        </div>
      </section>

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
                <p className="text-gray-700 mb-4">&ldquo;They saved my antique furniture from wood borers. No damage to the finish.&rdquo;</p>
                <p className="text-sm text-gray-500">- Meera S., Bandra</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">&ldquo;Professional service, no mess, and my wardrobes are safe now.&rdquo;</p>
                <p className="text-sm text-gray-500">- Amit K., Andheri</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">&ldquo;Quick response, low odour, and effective treatment.&rdquo;</p>
                <p className="text-sm text-gray-500">- Priya R., Thane</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg font-semibold text-green-600">1,956 Mumbai homes protected</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Pricing
            </h2>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <p className="text-lg text-gray-700 mb-6">
                Your wood borer treatment cost depends on the type of property: commercial or residential. We send a same-day, all-inclusive quote with no doorstep add-ons.
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
                <p className="text-gray-700">Dust powder trails daily to monitor fresh activity</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Avoid oil polishing over exit holes—it traps larvae inside</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Keep wood dry; reduce leaks and humidity</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Skip store sprays—they only kill surface beetles</p>
              </div>
            </div>
            <div className="mt-8 bg-blue-50 p-6 rounded-2xl border border-blue-200 text-center">
              <p className="text-lg text-gray-700 font-medium">
                Seeing powder piles under furniture? Book an inspection before the damage spreads.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Ready to Save Your Wood?
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
                href="https://wa.me/7710032627?text=Hello%20PestControl99,%20can%20you%20share%20details%20and%20pricing%20for%20your%20wood%20borer%20control%20services?"
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Wood Borer Control Mumbai",
            "description": "Professional wood borer control services in Mumbai. Same-day inspection, low-odour treatment, and warranty-backed service.",
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
            "serviceType": "Wood Borer Control",
            "offers": {
              "@type": "Offer",
              "description": "Professional wood borer treatment with warranty",
              "priceCurrency": "INR"
            }
          })
        }}
      />
    </div>
  );
}
