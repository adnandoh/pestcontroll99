import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Mosquito Pest Control Mumbai — Safe. Same-Day Relief | PestControl99',
  description: 'Professional mosquito pest control services in Mumbai. Low-odour mist plus larvae control. Kid & pet-safe. Same-day appointments available. Get instant quote.',
  keywords: 'mosquito pest control, mosquito pest control mumbai, mosquito pest control near me, mosquito control during monsoon, pest control prices, residential pest control services, commercial pest control services, mosquito pest control cost, mosquito pest control spray, mosquito pest control services',
  openGraph: {
    title: 'Mosquito Pest Control Mumbai — Safe. Same-Day Relief',
    description: 'Professional mosquito pest control services in Mumbai. Low-odour mist plus larvae control. Kid & pet-safe.',
    type: 'website',
    images: ['/images/mosquito-control-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.pestcontrol99.com/services/mosquito-pest-control-mumbai',
  },
};

export default function MosquitoPestControlPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Mosquito Pest Control Mumbai — <span className="text-green-600">Safe. Same-Day Relief.</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Bites, buzz, no sleep? We can help today. Local, trained team for mosquito pest control services. Low-odour mist plus larvae control. No stains. Kid- and pet-safe when dry.
                </p>
                <p className="text-sm text-gray-500 italic">
                  *Every home is different. Results can vary.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Instant Quote →
                </Link>
                <a
                  href="https://wa.me/9594966921"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full border-2 border-green-600 hover:bg-green-50 transition-colors duration-300"
                >
                  💬 WhatsApp 24×7: +91 95949 66921
                </a>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/images/heroimage.png"
                alt="Professional mosquito pest control service in Mumbai"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Mosquitoes Keep Coming Back */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Why Mosquitoes Keep Coming Back (Even After You Spray)
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              You spray at night. They return by morning. Mosquitoes need still water, shade, and warm air. Mumbai has all three. Coils hit adults you see; eggs and larvae stay. They hatch again, and the bites come back.
            </p>
          </div>
        </div>
      </section>

      {/* What's Happening Around Your Home */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              What&apos;s Happening Around Your Home
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-green-600 mb-4">Breeding spots:</h3>
                <p className="text-gray-700 leading-relaxed">
                  They use plant trays, AC drip pans, terrace puddles, gutters, and buckets. A few spoonfuls of water are enough for eggs to grow.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-green-600 mb-4">Rest spots:</h3>
                <p className="text-gray-700 leading-relaxed">
                  They sit on dark walls, behind curtains, under beds, and in storerooms. These quiet places let adults wait and bite later.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-green-600 mb-4">Monsoon speed:</h3>
                <p className="text-gray-700 leading-relaxed">
                  Warm, wet air helps eggs turn into biters fast. In the monsoon, numbers rise quickly in just a few days.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-green-600 mb-4">Why sprays feel short-lived:</h3>
                <p className="text-gray-700 leading-relaxed">
                  A mosquito pest control spray knocks down adults in the room. Untreated water keeps sending new swarms later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Treatment */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Our Treatment — Simple, Low-Odour, Effective
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We knock down adults with a low-odour wall mist, then stop the source with mosquito control during monsoon: treat small water, set water-trap barriers, and guide easy fixes. Many homes feel relief the same day; results may vary by site.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Book Mosquito Relief →
            </Link>
          </div>
        </div>
      </section>

      {/* How the visit works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              How the visit works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Inspect</h3>
                <p className="text-gray-700 leading-relaxed">
                  We check balconies, plant trays, AC pans, bathrooms, drains, terraces, and nearby puddles. We map resting walls and list all water risks.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Treat</h3>
                <p className="text-gray-700 leading-relaxed">
                  We apply a low-odour mist to walls and dark corners where adults rest. It dries fast, leaves no stains, and rooms can be used once dry.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Block breeding</h3>
                <p className="text-gray-700 leading-relaxed">
                  We treat or empty small water collections, place a water-trap barrier if needed, and show quick steps to keep water from standing. We use quality mosquito pest control spray to stop mosquitoes breeding.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow-up</h3>
                <p className="text-gray-700 leading-relaxed">
                  We send an SMS in 14 days to review results and answer questions. If mosquitoes return within the plan window, we re-treat as covered.
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
              Why choose us
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Source + spray approach</h3>
                <p className="text-gray-700 leading-relaxed">
                  We treat adults and block larvae at their water source. This two-step plan helps relief last longer between visits.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Low-odour, family-friendly</h3>
                <p className="text-gray-700 leading-relaxed">
                  We use low-odour products and clear room re-entry times. Rooms reopen after drying, with simple steps for babies and pets.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Transparent pest control prices</h3>
                <p className="text-gray-700 leading-relaxed">
                  You see one clear price before work starts. There are no surprise add-ons at the door or in the final bill.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Same-day slots across Mumbai</h3>
                <p className="text-gray-700 leading-relaxed">
                  Fast appointments are available in most areas most days. Quick help means better sleep and fewer bites sooner.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Trained local technicians</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our local team follows neat, simple steps every time. They explain what they do and keep your home tidy.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Minimal prep, no mess</h3>
                <p className="text-gray-700 leading-relaxed">
                  You do not need to move out or cover every room. The mist dries quickly and leaves no stains on walls.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Reports that help</h3>
                <p className="text-gray-700 leading-relaxed">
                  We email a proper GST invoice and service report. Good records help homes, cafés, and audits stay smooth.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Built-in follow-up</h3>
                <p className="text-gray-700 leading-relaxed">
                  We send an SMS check to confirm results after service. If needed, touch-ups are covered within your plan window.
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
              Need mosquito pest control near me? We serve Bandra, Andheri, Thane, Navi Mumbai and more—both residential pest control services for flats and bungalows and commercial pest control services for cafés, offices, and hostels.
            </p>
          </div>
        </div>
      </section>

      {/* What customers say */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
              What customers say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">&ldquo;Excellent service! No more mosquito bites at night.&rdquo;</p>
                <p className="text-sm text-gray-500">- Priya S., Bandra</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">&ldquo;Safe for kids and very effective treatment.&rdquo;</p>
                <p className="text-sm text-gray-500">- Rahul M., Andheri</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">&ldquo;Quick response and professional service.&rdquo;</p>
                <p className="text-sm text-gray-500">- Sneha K., Thane</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Pricing (simple and clear)
            </h2>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <p className="text-lg text-gray-700 mb-6">
                We will send you the mosquito pest control cost (quotation) within hours
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
              Quick tips until we arrive
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Empty plant trays, buckets, and AC pans today; wipe them dry.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Fix small drips and keep bathroom floors dry after use.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Run fans at night; moving air makes it harder for mosquitoes to land.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Fit window mesh where possible, especially in bedrooms.</p>
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
              Ready to stop the buzzing?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Fill the 60-second form to book a same-day slot. Pay after service is complete; your plan covers any returns within the window.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Schedule My Treatment →
              </Link>
              <a
                href="https://wa.me/9594966921"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-green-600 transition-colors duration-300"
              >
                💬 WhatsApp 24×7: +91 95949 66921
              </a>
            </div>
            <p className="text-sm mt-6 opacity-75">
              No hidden fees • Low-odour mist • No stains • GST invoice
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}