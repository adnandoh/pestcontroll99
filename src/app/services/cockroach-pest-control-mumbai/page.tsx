import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Cockroach Pest Control Mumbai — Safe. Fast. No Smell | PestControl99',
  description: 'Professional cockroach pest control services in Mumbai. Odourless gel treatment. 365-day warranty. Kid & pet-safe. Same-day appointments available.',
  keywords: 'cockroach pest control, cockroach pest control mumbai, cockroach pest control services, pest control for cockroaches near me, odourless pest control, pest control prices, commercial pest control services, residential pest control services, cockroach pest control gel, pest control chemicals for cockroaches, cockroach pest control spray, best pest control for cockroaches',
  openGraph: {
    title: 'Cockroach Pest Control Mumbai — Safe. Fast. No Smell',
    description: 'Professional cockroach pest control services in Mumbai. Odourless gel treatment. 365-day warranty.',
    type: 'website',
    images: ['/images/cockroach-control-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.pestcontrol99.com/services/cockroach-pest-control-mumbai',
  },
};

export default function CockroachPestControlPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Cockroach Pest Control Mumbai — <span className="text-green-600">Safe. Fast. No Smell.</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-4">
                  Stop midnight roaches tonight—child-safe gel treatment, results in 4 hours.
                </p>
                
                <p className="text-lg text-gray-700 font-medium">
                  Most homes see fewer roaches in hours.*
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
                  href="https://wa.me/9898989990"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full border-2 border-green-600 hover:bg-green-50 transition-colors duration-300"
                >
                  💬 WhatsApp 24×7: 98 XXX XX 990
                </a>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/images/heroimage.png"
                alt="Professional cockroach pest control service in Mumbai"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Everyday Problem */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              The Everyday Problem
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                We&apos;ve all switched on the kitchen light at 2 a.m. and watched roaches scatter under the toaster. Besides the shudder factor, cockroaches carry salmonella and trigger asthma—especially in humid Mumbai flats.
              </p>
              <p className="text-center font-semibold text-red-600 bg-red-50 p-4 rounded-lg">
                One female can lay 300 eggs a month; if you see one, a colony is already thriving behind your tiles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Really Happening Behind the Walls */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              What&apos;s Really Happening Behind the Walls
            </h2>
            
            <div className="space-y-6 text-lg text-gray-700">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <p><strong>Egg casings:</strong> Hidden in cracks and crevices, each case contains 30-40 eggs that hatch in warm conditions.</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <p><strong>Pheromone trails:</strong> Roaches leave invisible chemical trails that guide others to food and shelter.</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <p><strong>Pesticide resistance:</strong> Many roaches have developed immunity to common sprays and baits.</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <p><strong>Rapid reproduction:</strong> A single pair can produce over 400,000 offspring in one year.</p>
              </div>
            </div>
            
            <div className="mt-12 bg-green-50 p-8 rounded-2xl border border-green-200 text-center">
              <p className="text-lg text-gray-700 font-medium">
                Surface spray kills what you see; our science-backed domino gel wipes out the nest you don&apos;t.
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
              How Our Cockroach Pest Control Works
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Our odourless, herbal gel reaches deep crevices and domino-kills the entire colony within four hours—no emptying cupboards, no stains, safe for kids and pets.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Book Cockroach Blitz
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
                  We check cracks, drains, and cupboard hinges across your kitchen. We map trails, find egg cases and damp spots, and note every entry point.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Treat</h3>
                <p className="text-gray-700 leading-relaxed">
                  We place tiny, odourless gel dots and bait inside those hidden gaps. There are no stains and no need to empty cupboards; it&apos;s safe for kids and pets.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Clean</h3>
                <p className="text-gray-700 leading-relaxed">
                  We wipe switches, slabs, and handles, then clear crumbs around food zones. Your kitchen stays tidy and usable the same day; the light smell fades in about 3 hours.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow-up</h3>
                <p className="text-gray-700 leading-relaxed">
                  We send an SMS after 60 days to check results and answer questions. If roaches return within the warranty period, we re-treat at no extra cost.
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">365-day warranty</h3>
                <p className="text-gray-700 leading-relaxed">
                  You get a 365-day warranty on this service. If roaches return within that time, we re-treat fast at no extra cost.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Low-odour, kid-safe treatment</h3>
                <p className="text-gray-700 leading-relaxed">
                  We use low-odour, kid-safe herbal gel inside small cracks and hinges. The light smell fades in about three hours, and cooking can continue.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Transparent pest control prices</h3>
                <p className="text-gray-700 leading-relaxed">
                  You see one clear pest control price before we start work today. There are no surprise add-ons at the door, ever; you pay one fair amount.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Same-day slots across Mumbai</h3>
                <p className="text-gray-700 leading-relaxed">
                  Same-day slots are available across Mumbai on most days. Quick help cuts stress and gets your kitchen back to normal sooner - cockroaches free.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Trained local technicians</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our local technicians have over three years of field work and steady hands. They follow clean, simple steps and speak clearly about what they do.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Minimal prep, no mess</h3>
                <p className="text-gray-700 leading-relaxed">
                  You do not need to empty cupboards or leave the home for treatment. Tiny gel dots target nests without stains, mess, or sticky floors.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">GST invoice</h3>
                <p className="text-gray-700 leading-relaxed">
                  We email a GST invoice after the job done. These GST invoice are being used in tax filling and all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What customers say */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
              What customers say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">&ldquo;They cleared my Bandra café&apos;s roaches in one visit.&rdquo;</p>
                <p className="text-sm text-gray-500">- Amit P., Bandra</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">&ldquo;No fumes; kids slept fine the same night in Andheri.&rdquo;</p>
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
              <p className="text-lg font-semibold text-green-600">10,432 Mumbai kitchens protected</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-3">Is the gel really odourless?</h3>
                <p className="text-gray-700">Yes, zero fumes. Our herbal gel treatment is completely odourless and safe for indoor use.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do I need to leave the house?</h3>
                <p className="text-gray-700">No; safe once applied. You can stay in your home during and after treatment.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How long does it take?</h3>
                <p className="text-gray-700">30 min treatment, 4 hr kill window. Most homes see results within hours.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What if roaches return?</h3>
                <p className="text-gray-700">Free re-service within 365 days. Our warranty covers any returns.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do you provide GST invoices?</h3>
                <p className="text-gray-700">Instant e-mail after job. Proper documentation for all services.</p>
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
                Contact us for transparent pricing with no hidden fees
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

      {/* DIY Until We Arrive */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              DIY Until We Arrive
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/blog" className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-green-600 mb-3">DIY checklist: seal gaps, clean drains</h3>
                <p className="text-gray-600 text-sm">5 min read</p>
              </Link>
              <Link href="/blog" className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-green-600 mb-3">How to keep groceries roach-free during monsoon</h3>
                <p className="text-gray-600 text-sm">Quick prevention tips</p>
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
                <p className="text-gray-700">Wipe crumbs and spills each night; clean the stove and table.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Keep the sink and floor dry; wring sponges and fix small drips.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Seal sugar, flour, and snacks in tight jars or boxes.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Empty the trash every night; tie bags tightly before tossing.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Clear food bits from drains; flush with hot water and a small brush.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-gray-700">Close tiny gaps around pipes with tape as a quick, temporary block.</p>
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
              Ready for a Roach-Free Kitchen? Pay Only After You See Results
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Fill our 60-second form, lock your same-day slot, and rest easy under our 365-day guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Schedule My Same-Day Treatment
              </Link>
              <a
                href="https://wa.me/9898989990"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-green-600 transition-colors duration-300"
              >
                💬 WhatsApp 24×7: 98 XXX XX 990
              </a>
            </div>
            <p className="text-sm mt-6 opacity-75">
              No hidden fees • Odour clears in 3 hrs • ISO-certified
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}