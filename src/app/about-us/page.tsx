import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About PestControl99 | ISO-Certified Pest Control Experts | Mumbai, Pune & Navi Mumbai",
  description: "Learn about PestControl99 - your trusted pest control partner. ISO 9001 certified, police-verified technicians, eco-friendly treatments. Serving Mumbai, Pune & Navi Mumbai.",
  keywords: "about pestcontrol99, pest control company, ISO certified pest control, professional pest control, Mumbai pest control company, Pune pest control experts",
  openGraph: {
    title: "About PestControl99 | Trusted Pest Control Experts",
    description: "ISO 9001 certified pest control company with police-verified technicians and eco-friendly treatments.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section 
        className="relative h-80 flex items-center justify-center text-white"
        style={{
          backgroundImage: "linear-gradient(rgba(44, 62, 80, 0.3), rgba(44, 62, 80, 0.3)), url('/images/about')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            About Us
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Side - Image */}
              <div className="relative">
                <div className="bg-gray-100 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/heroimage.png"
                    alt="PestControl99 Professional Services"
                    width={500}
                    height={400}
                    className="w-full h-64 md:h-80 lg:h-96 object-cover"
                  />
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="space-y-6">
                <div>
                  <div className="text-green-500 text-sm font-semibold uppercase tracking-wide mb-3">
                    WHO WE ARE
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                    PestControl99 – Your Trusted Pest Control Partner
                  </h2>
                </div>

                <p className="text-gray-600 leading-relaxed text-lg">
                  At PestControl99, we are dedicated to providing comprehensive pest control solutions for homes and businesses across Mumbai, Navi Mumbai, and Thane. With years of experience in the industry, our team of certified professionals uses the latest eco-friendly techniques and advanced equipment to eliminate pests effectively while ensuring the safety of your family, pets, and environment. From cockroaches and termites to rodents and mosquitoes, we handle all types of pest infestations with precision and care.
                </p>

                <p className="text-gray-600 leading-relaxed text-lg">
                  Our commitment to excellence and customer satisfaction has made us a leading name in pest control services. We believe in providing transparent pricing, same-day service, and long-lasting solutions that give you peace of mind. Every treatment comes with our quality guarantee, ensuring that your property remains pest-free.
                </p>

                {/* Features List */}
                <div className="space-y-4 mt-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">ISO 9001 Certified & Police Verified Technicians</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">100% Safe & Odorless Treatments</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Same-Day Service & Transparent Pricing</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Comprehensive Coverage: Mumbai, Navi Mumbai & Thane</span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4 md:pt-6">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center bg-green-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-green-600 transition-colors shadow-md md:shadow-lg text-sm md:text-base"
                  >
                    Call Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Book Appointment Now!
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto">
            Your Safety is Our Priority — Every Step of the Way
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center bg-green-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-green-600 transition-colors shadow-md md:shadow-lg text-sm md:text-lg"
          >
            Book Now!
          </Link>
        </div>
      </section>
    </div>
  );
}