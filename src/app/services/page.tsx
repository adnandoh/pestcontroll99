import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: "Professional Pest Control Services | Termite, Cockroach, Rodent Control | PestControl99",
  description: "Comprehensive pest control services in Mumbai, Pune & Navi Mumbai. Expert termite, cockroach, bed bug, mosquito & rodent control. ISO-certified, same-day service.",
  keywords: "pest control services, termite control, cockroach control, bed bug control, mosquito control, rodent control, professional pest control, Mumbai pest control, Pune pest control",
  openGraph: {
    title: "Professional Pest Control Services | PestControl99",
    description: "Comprehensive pest control services with same-day response. ISO-certified experts for all pest problems.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.pestcontrol99.com/services",
  },
};

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

function ServiceCard({ title, description, image, href }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="w-1 h-6 bg-green-500 mr-3"></div>
          <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          {description}
        </p>
        <Link 
          href={href}
          className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-3 text-sm font-semibold rounded-full hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg group"
        >
          GET QUOTE NOW
          <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const services = [
    {
      title: "COCKROACH PEST CONTROL",
      description: "Say goodbye to cockroaches with our reliable and long-lasting treatments. Odourless gel treatment with 365-day warranty.",
      image: "/images/Cockroach.webp",
      href: "/services/cockroach-pest-control"
    },
    {
      title: "MOSQUITO PEST CONTROL",
      description: "Protect your family from mosquito-borne diseases with our effective control solutions. Low-odour mist plus larvae control.",
      image: "/images/Mosquito.webp",
      href: "/services/mosquito-pest-control"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Services' }]} />
      
      {/* Header Section */}
      <section className="py-6 sm:py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Our Services
            </h1>
            <div className="w-16 sm:w-20 h-1 bg-gray-300 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  href={service.href}
                />
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90">
            Contact us today for a free consultation and customized pest control solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/quote" 
              className="bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded font-semibold hover:bg-green-600 transition-colors text-base sm:text-lg"
            >
              Get Free Quote
            </Link>
            <a 
              href="tel:+917710032627" 
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded font-semibold hover:bg-white hover:text-slate-800 transition-colors text-base sm:text-lg"
            >
              Call Now: +91 77100 32627
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}