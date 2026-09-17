import { Link } from 'react-router-dom';
import AppImage from '@/components/AppImage';
import Breadcrumb from '@/components/Breadcrumb';
import PageMeta from '@/components/PageMeta';
import ServiceAreaLinks from '@/components/ServiceAreaLinks';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
}

function ServiceCard({ title, description, image, alt, href }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <AppImage
          src={image}
          alt={alt}
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
          to={href}
          className="btn btn-cta btn-quote text-sm !px-6 !py-3 group"
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
      description: "Cockroaches are night-active insects that spread quickly through kitchens, drains and storage areas. We target American, Oriental, German and Brown-banded species with odourless gel treatment and a 365-day warranty.",
      image: "/images/cockroaches.webp",
      alt: "Cockroach pest control services in Mumbai — odourless herbal gel treatment safe for kitchens",
      href: "/services/cockroach-pest-control"
    },
    {
      title: "MOSQUITO PEST CONTROL",
      description: "Even a single mosquito bite can cause significant discomfort. Our professional mosquito control reduces breeding sites and protects against dengue, chikungunya and malaria with low-odour mist plus larvae control.",
      image: "/images/mosquitoes.webp",
      alt: "Mosquito pest control Mumbai — low-odour mist and larvae control treatment",
      href: "/services/mosquito-pest-control"
    },
    {
      title: "TERMITE PEST CONTROL",
      description: "Protect your wood with comprehensive termite control. Low-odour borate treatment with advanced inspection, crack sealing and up to 5-year warranty on eligible treatments.",
      image: "/images/termites.webp",
      alt: "Anti-termite treatment Mumbai — drill and seal method with 5-year warranty",
      href: "/services/termite-pest-control"
    },
    {
      title: "RODENT PEST CONTROL",
      description: "Rodents spread disease and damage your home's structure. Our systematic control eliminates current infestations, seals entry points, and restores your peace of mind with a 90-day warranty.",
      image: "/images/rodents.webp",
      alt: "Rat control Mumbai — rodent removal and entry-point sealing services",
      href: "/services/rodent-pest-control"
    },
    {
      title: "BED BUG PEST CONTROL",
      description: "Bed bugs cause itching, redness, and disturbed sleep and spread rapidly as infestations grow. Our service uses chemical and non-chemical methods to target all life stages with follow-up visits as needed.",
      image: "/images/BedBug.webp",
      alt: "Bed bug pest control Mumbai — spray, foam and dusting treatment with follow-up",
      href: "/quote"
    },
    {
      title: "HONEY BEE PEST CONTROL",
      description: "Safe and eco-friendly honey bee removal services. Same-day hive removal, professional technicians, warranty-backed service.",
      image: "/images/Honey Bee.webp",
      alt: "Honey bee hive removal services Mumbai — eco-friendly same-day treatment",
      href: "/services/honey-bee-pest-control"
    },
    {
      title: "WOOD BORER CONTROL",
      description: "Professional wood borer control services. Same-day inspection, low-odour treatment, neat drill & seal, warranty-backed service.",
      image: "/images/Wood Borer.webp",
      alt: "Wood borer pest control Mumbai — professional low-odour treatment",
      href: "/services/wood-borer-control"
    }
  ];

  const whatsIncluded = [
    'Advanced pest inspection & detection',
    'Comprehensive pest elimination',
    'Safe, eco-friendly, child- and pet-safe chemicals',
    'Specialized treatments for various pest types',
    'Crack sealing & preventive solutions',
    'Post-service cleaning & hygiene',
    'Warranty-backed pest control services',
  ];

  const treatmentSteps = [
    { step: '1', title: 'Inspection & detection', desc: 'Identify pest infestation areas' },
    { step: '2', title: 'Customized treatment plan', desc: 'Based on pest type and property' },
    { step: '3', title: 'Pest removal', desc: 'Safe chemical and advanced solutions' },
    { step: '4', title: 'Sealing & prevention', desc: 'Block entry points' },
    { step: '5', title: 'Cleaning & final check', desc: 'Ensure hygiene and safety' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageMeta
        title="Pest Control Services in Mumbai | Pest Control 99"
        description="Protect your home from cockroaches, termites, rodents, bed bugs and mosquitoes. Affordable, eco-friendly, warranty-backed pest control in Mumbai, Thane & Navi Mumbai. Free quote."
        keywords="pest control services mumbai, pest control mumbai, cockroach termite rodent control, eco-friendly pest control"
        canonical="https://www.pestcontrol99.com/services/"
        ogUrl="https://www.pestcontrol99.com/services/"
      />
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Services' }]} />
      
      {/* Header Section */}
      <section className="py-6 sm:py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Professional Pest Control Services Mumbai
            </h1>
            <div className="w-16 sm:w-20 h-1 bg-gray-300 mx-auto mb-5 sm:mb-6"></div>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4">
              Protect your home and workplace from unwanted pests. Cockroaches, termites, rodents, bed bugs, and mosquitoes can damage property and create health risks. Our professional pest control services provide thorough removal using safe, eco-friendly methods.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We offer affordable and effective pest control services, including mosquito control, termite treatment, and rodent removal, tailored to your needs. Our expert technicians use advanced equipment and warranty-backed treatments to help you maintain a clean, healthy, and pest-free home.
            </p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-8 sm:py-10 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">What&apos;s Included</h2>
              <ul className="space-y-2.5">
                {whatsIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-700">
                    <span className="mt-1 text-green-600 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Treatment Process</h2>
              <ol className="space-y-3">
                {treatmentSteps.map((item) => (
                  <li key={item.step} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-600 text-white text-sm font-bold">
                      {item.step}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 max-w-9xl mx-auto">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  alt={service.alt}
                  href={service.href}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServiceAreaLinks />

      {/* CTA Section */}
      <section className="section-cta-dark py-12 sm:py-16 md:py-20 bg-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90">
            Contact us today for a free consultation and customized pest control solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote"
              className="btn btn-cta btn-quote-lg w-full sm:w-auto rounded-lg"
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
