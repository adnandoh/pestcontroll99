import { Link } from 'react-router-dom';
import AppImage from '@/components/AppImage';
import { BUSINESS, DEFAULT_WHATSAPP_MESSAGE, FOOTER_BRAND_LINES, whatsAppUrl } from '@/config/business';

export default function Footer() {
  return (
    <footer className="text-gray-400 overflow-hidden font-sans">
      <div className="bg-[#111111] pt-10 pb-8 sm:pt-16 sm:pb-12 border-t border-gray-800">
        <div className="container mx-auto px-6 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            <div className="space-y-6">
              <div className="flex items-center">
                <AppImage
                  src="/images/logo.svg"
                  alt={`${BUSINESS.brandName} logo`}
                  width={140}
                  height={45}
                  className="w-32 sm:w-36 h-auto brightness-0 invert opacity-90"
                />
              </div>
              <div>
                <p className="text-white font-bold text-lg">{FOOTER_BRAND_LINES.line1}</p>
                <p className="text-green-400 text-sm font-semibold mt-1">{FOOTER_BRAND_LINES.line2}</p>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                {BUSINESS.operatingStatement} Professional, safe, same-day pest control in{' '}
                {BUSINESS.serviceAreas.join(', ')}.
              </p>
              <div className="flex space-x-4">
                <a
                  href={whatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg text-green-500 hover:bg-green-600 hover:text-white transition-all transform hover:-translate-y-1"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6 border-b border-gray-800 pb-2 inline-block">
                Our Services
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <Link to="/services/cockroach-pest-control" className="hover:text-green-500 transition-colors">
                    Cockroach Control
                  </Link>
                </li>
                <li>
                  <Link to="/services/rodent-pest-control" className="hover:text-green-500 transition-colors">
                    Rodent Control
                  </Link>
                </li>
                <li>
                  <Link to="/services/mosquito-pest-control" className="hover:text-green-500 transition-colors">
                    Mosquito Control
                  </Link>
                </li>
                <li>
                  <Link to="/services/termite-pest-control" className="hover:text-green-500 transition-colors">
                    Termite Control
                  </Link>
                </li>
                <li>
                  <Link to="/services/wood-borer-control" className="hover:text-green-500 transition-colors">
                    Wood Borer Control
                  </Link>
                </li>
                <li>
                  <Link to="/services/honey-bee-pest-control" className="hover:text-green-500 transition-colors">
                    Honey Bee Removal
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6 border-b border-gray-800 pb-2 inline-block">
                Quick Links
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <Link to="/" className="hover:text-green-500 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-green-500 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-green-500 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/quote" className="hover:text-green-500 transition-colors">
                    Get Free Quote
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-green-500 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-green-500 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6 border-b border-gray-800 pb-2 inline-block">
                Contact Info
              </h4>
              <div className="space-y-5 text-gray-400 text-sm">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="leading-relaxed">{BUSINESS.address.full}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${BUSINESS.phoneTel}`} className="hover:text-white transition-colors">
                    {BUSINESS.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${BUSINESS.email}`} className="hover:text-white transition-colors text-xs lg:text-sm">
                    {BUSINESS.email}
                  </a>
                </div>
                <p className="text-xs text-gray-500 pt-1">{BUSINESS.websiteDisplay}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black text-white py-5 border-t border-white/5">
        <div className="container mx-auto px-6 sm:px-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-white font-bold text-base sm:text-lg">{FOOTER_BRAND_LINES.line1}</p>
            <p className="text-green-400 text-sm font-semibold">{FOOTER_BRAND_LINES.line2}</p>
            <p className="text-gray-500 text-xs sm:text-sm">{FOOTER_BRAND_LINES.copyright}</p>
            <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 text-gray-500 text-[10px] sm:text-xs mt-2">
              <Link to="/terms-and-conditions" className="hover:text-green-500 transition-colors">
                Terms & Conditions
              </Link>
              <span className="text-white/10">|</span>
              <Link to="/privacy-policy" className="hover:text-green-500 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-white/10">|</span>
              <Link to="/refund-policy" className="hover:text-green-500 transition-colors">
                Refund Policy
              </Link>
              <span className="text-white/10">|</span>
              <Link to="/contact" className="hover:text-green-500 transition-colors">
                Contact Us
              </Link>
              <span className="text-white/10">|</span>
              <Link to="/data-deletion" className="hover:text-green-500 transition-colors">
                Data Deletion
              </Link>
              <span className="text-white/10">|</span>
              <Link to="/delete-account" className="hover:text-green-500 transition-colors">
                Delete Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
