import Link from 'next/link';
import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

function ServiceCard({ title, description, image, href }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex items-center mb-2 sm:mb-3">
          <div className="w-1 h-6 bg-green-500 mr-2 sm:mr-3"></div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 uppercase tracking-wide">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
          {description}
        </p>
        <Link 
          href={href}
          className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide hover:bg-blue-700 transition-colors duration-300"
        >
          CALL NOW
        </Link>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const services = [
    {
      title: "ANTI TERMITE PEST CONTROL",
      description: "Protect your property from termites with our specialized termite control services.",
      image: "/images/termite-control-service.jpg",
      href: "/services/termite-control"
    },
    {
      title: "BED BUGS PEST CONTROL",
      description: "Effective solutions to eradicate bed bugs from your home or commercial space.",
      image: "/images/bed-bugs-control.jpg",
      href: "/services/bed-bugs-control"
    },
    {
      title: "HOUSEHOLD PEST CONTROL",
      description: "Comprehensive household pest control to protect your home from various pests.",
      image: "/images/household-pest-control.jpg",
      href: "/services/household-pest-control"
    },
    {
      title: "COCKROACH PEST CONTROL",
      description: "Say goodbye to cockroaches with our reliable and long-lasting treatments.",
      image: "/images/cockroach-control.jpg",
      href: "/services/cockroach-control"
    },
    {
      title: "FUMIGATION PEST CONTROL",
      description: "Safe fumigation services for residential and commercial properties.",
      image: "/images/fumigation-service.jpg",
      href: "/services/fumigation-control"
    },
    {
      title: "GARDEN PEST CONTROL",
      description: "Keep your garden free from harmful pests with our tailored garden pest control solutions.",
      image: "/images/garden-pest-control.jpg",
      href: "/services/garden-pest-control"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
              Our Services
            </h1>
            <div className="w-16 sm:w-24 h-1 bg-gray-300 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
              href="tel:+919812345678" 
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded font-semibold hover:bg-white hover:text-slate-800 transition-colors text-base sm:text-lg"
            >
              Call Now: +91 98123 45678
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}