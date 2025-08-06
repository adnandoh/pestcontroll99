import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      {/* Hero Section - Completely Rebuilt */}
      <div className="hero-container relative w-full min-h-[80vh] md:min-h-[100vh] overflow-hidden">
        {/* Hero Background Image - Direct HTML approach */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/heroimage.png)' }}
          aria-hidden="true"
        ></div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-10 z-10"></div>

        {/* Content Container */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="max-w-2xl text-left text-white py-12 md:py-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              100% Safe, Same-Day<br className="hidden sm:block" />
              <span className="sm:inline"> Pest Control in Mumbai</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 max-w-lg opacity-90">
              Police-verified, ISO 9001-certified experts with 3+ years&apos; experience.
              Odour clears in 3 hrs—zero wall stains. Kid- and pet-safe herbal options.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Get Instant Quote
                <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="https://wa.me/9894966921"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <svg className="mr-2 w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                24×7 WhatsApp Help
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Service Selector Wizard */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Pest & Property—Get Quotation by the same day
            </h2>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg sm:shadow-xl">
            <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6" suppressHydrationWarning>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pest Type</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base">
                  <option value="cockroaches">Cockroaches</option>
                  <option value="rats">Rats</option>
                  <option value="termites">Termites</option>
                  <option value="mosquitoes">Mosquitoes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base">
                  <option value="1bhk">1BHK</option>
                  <option value="3bhk">3BHK</option>
                  <option value="restaurant">Restaurant</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base">
                  <option value="500">500 sq.ft</option>
                  <option value="1000">1000 sq.ft</option>
                  <option value="2000">2000+ sq.ft</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
                >
                  Get Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>



      {/* Our Services Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our Services
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Professional pest control solutions for every type of infestation
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Rodent Control Services */}
            <div className="text-center bg-white rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full overflow-hidden">
                <Image
                  src="/images/Rat.webp"
                  alt="Rodent Control Services"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Rodent Control Services</h3>
            </div>

            {/* Cockroach Control Services */}
            <div className="text-center bg-white rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full overflow-hidden">
                <Image
                  src="/images/Cockroach.webp"
                  alt="Cockroach Control Services"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Cockroach Control Services</h3>
            </div>

            {/* BedBug Control Services */}
            <div className="text-center bg-white rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full overflow-hidden">
                <Image
                  src="/images/BedBug.webp"
                  alt="BedBug Control Services"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">BedBug Control Services</h3>
            </div>

            {/* Mosquito Control Services */}
            <div className="text-center bg-white rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full overflow-hidden">
                <Image
                  src="/images/Mosquito.webp"
                  alt="Mosquito Control Services"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Mosquito Control Services</h3>
            </div>

            {/* House Fly Control Services */}
            <div className="text-center bg-white rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full overflow-hidden">
                <Image
                  src="/images/House Fly.webp"
                  alt="House Fly Control Services"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">HouseFly Control Services</h3>
            </div>

            {/* Termite Control Services */}
            <div className="text-center bg-white rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full overflow-hidden">
                <Image
                  src="/images/Termite.webp"
                  alt="Termite Control Services"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Termite Control Services</h3>
            </div>

            {/* Wood Borer Services */}
            <div className="text-center bg-white rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full overflow-hidden">
                <Image
                  src="/images/Wood Borer.webp"
                  alt="Wood Borer Services"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Wood Borer Services</h3>
            </div>

            {/* Honey Bee Removal */}
            <div className="text-center bg-white rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full overflow-hidden">
                <Image
                  src="/images/Honey Bee.webp"
                  alt="Honey Bee Removal"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Honey Bee Removal</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Strip */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Why Pests Explode During Mumbai&apos;s Monsoon—and How to Stop Them
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Here&apos;s how to protect your home this monsoon with expert tips from our certified pest control specialists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Card 1 - Mosquito Prevention */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="p-4 sm:p-5 flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-2xl">🦟</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  DIY checklist: eliminate standing water in 15 minutes
                </h3>
              </div>
              <div className="px-4 sm:px-5 pb-4">
                <p className="text-gray-700 text-sm mb-4">
                  Quick steps to prevent mosquito breeding in your home during monsoon season
                </p>
                <Link href="/blog/eliminate-standing-water" className="text-blue-600 font-medium text-sm flex items-center">
                  Learn How
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 2 - Termite Detection */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="p-4 sm:p-5 flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-2xl">🐜</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  5 warning signs of a hidden termite colony
                </h3>
              </div>
              <div className="px-4 sm:px-5 pb-4">
                <p className="text-gray-700 text-sm mb-4">
                  Early detection can save thousands in repair costs and protect your property
                </p>
                <Link href="/blog/termite-warning-signs" className="text-orange-600 font-medium text-sm flex items-center">
                  Read More
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 3 - Eco-friendly Solutions */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="p-4 sm:p-5 flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  Eco-friendly sprays that actually work
                </h3>
              </div>
              <div className="px-4 sm:px-5 pb-4">
                <p className="text-gray-700 text-sm mb-4">
                  Safe alternatives for families with children and pets that deliver real results
                </p>
                <Link href="/blog/eco-friendly-pest-sprays" className="text-green-600 font-medium text-sm flex items-center">
                  Explore Solutions
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Knockout */}
      <section className="py-10 sm:py-12 md:py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              How We Stack Up Against &ldquo;Big Brands&rdquo;
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              365-day warranty • Herbals & lab-tested chemicals • Same-day response • Up-front pricing — none of the big three match all four.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto text-center">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1 sm:mb-2">365</div>
              <p className="text-xs sm:text-sm">Day Warranty</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1 sm:mb-2">100%</div>
              <p className="text-xs sm:text-sm">Herbal Options</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1 sm:mb-2">Same</div>
              <p className="text-xs sm:text-sm">Day Response</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1 sm:mb-2">₹0</div>
              <p className="text-xs sm:text-sm">Hidden Charges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-green-400 to-green-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Still Seeing Pests? Get a Same-Day Quote—Pay Only After They&apos;re Gone.
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto opacity-90">
            Fill our 60-second form, lock a same-day slot, and relax under a 365-day no-return warranty.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 sm:mb-8">
            <Link
              href="/quote"
              className="bg-white text-green-600 px-5 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm hover:bg-gray-100 transition-all duration-300 shadow-md flex items-center justify-center"
            >
              Get My 60-Second Quote →
            </Link>
            <a
              href="https://wa.me/9594966921"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white px-5 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm hover:bg-white hover:text-green-600 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              Chat on WhatsApp: 9594966921
            </a>
          </div>

          <div className="text-xs sm:text-sm opacity-75 max-w-2xl mx-auto">
            • No hidden fees • Police-verified technicians • Odour clears in 3 hrs, zero wall stains
          </div>
        </div>
      </section>
    </div>
  );
}