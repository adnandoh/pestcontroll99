import { Link } from 'react-router-dom';
import AppImage from '@/components/AppImage';
import { useState, useEffect, useRef } from 'react';
import { HEADER_CITIES } from '@/config/headerCities';
import { BUSINESS, SITE_LOGO, whatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '@/config/business';

function CityPinIcon() {
  return (
    <svg
      className="w-5 h-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill="var(--green-bright)"
      />
      <circle cx="12" cy="9" r="2.5" fill="#FEF08A" stroke="#166534" strokeWidth="0.5" />
    </svg>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileCityOpen, setIsMobileCityOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  const services = [
    { name: 'All Services', href: '/services' },
    { name: 'Cockroach Pest Control', href: '/services/cockroach-pest-control' },
    { name: 'Mosquito Pest Control', href: '/services/mosquito-pest-control' },
    { name: 'Termite Pest Control', href: '/services/termite-pest-control' },
    { name: 'Rodent Pest Control', href: '/services/rodent-pest-control' },
    { name: 'Honey Bee Pest Control', href: '/services/honey-bee-pest-control' },
    { name: 'Wood Borer Control', href: '/services/wood-borer-control' },
  ];

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
    setIsMobileCityOpen(false);
  };

  const closeDesktopDropdowns = () => {
    setIsCityDropdownOpen(false);
    setIsServicesDropdownOpen(false);
  };

  const openCityDropdown = () => {
    setIsCityDropdownOpen(true);
    setIsServicesDropdownOpen(false);
  };

  const openServicesDropdown = () => {
    setIsServicesDropdownOpen(true);
    setIsCityDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    };

    if (isMenuOpen || isServicesDropdownOpen || isCityDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isServicesDropdownOpen, isCityDropdownOpen]);

  return (
    <div className="sticky top-0 z-50">
      <header
        className="site-header bg-white border-b border-divider shadow-sm"
        ref={menuRef}
        role="navigation"
        aria-label="Main"
      >
      <div className="w-full max-w-none mx-auto px-4 sm:px-6">
        <div className="site-header-bar flex justify-between items-center min-h-[3.15rem] py-1.5 sm:min-h-[4.75rem] sm:py-3">
          <Link
            to="/"
            className="flex items-center shrink-0 min-w-0"
            onClick={closeMobileMenu}
          >
            <AppImage
              src={SITE_LOGO.src}
              alt={SITE_LOGO.alt}
              width={SITE_LOGO.width}
              height={SITE_LOGO.height}
              className="site-header-logo block h-9 sm:h-12 md:h-[3.25rem] w-auto max-w-[min(62vw,220px)] md:max-w-[200px] lg:max-w-[220px] object-contain object-left"
              priority
            />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile: Call + WhatsApp (matches booking design) */}
          <div className="header-mobile-actions md:hidden">
            <a
              href={`tel:${BUSINESS.phoneTel}`}
              className="header-icon-btn header-icon-btn-call"
              aria-label={`Call ${BUSINESS.phoneDisplay}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </a>
            <a
              href={whatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="header-icon-btn header-icon-btn-wa"
              aria-label="Chat on WhatsApp"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382" />
              </svg>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/"
              className="nav-link text-[15px] py-2 px-3 rounded-md hover:bg-green-50"
              onMouseEnter={closeDesktopDropdowns}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="nav-link text-[15px] py-2 px-3 rounded-md hover:bg-green-50"
              onMouseEnter={closeDesktopDropdowns}
            >
              About Us
            </Link>

            {/* City Dropdown */}
            <div
              className="relative"
              ref={cityDropdownRef}
              onMouseEnter={openCityDropdown}
              onMouseLeave={() => setIsCityDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => (isCityDropdownOpen ? setIsCityDropdownOpen(false) : openCityDropdown())}
                className="nav-link text-[15px] py-2 px-3 rounded-md hover:bg-green-50 flex items-center gap-1 uppercase tracking-wide"
                aria-expanded={isCityDropdownOpen}
                aria-haspopup="true"
              >
                City
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isCityDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isCityDropdownOpen && (
                <div className="absolute top-full left-0 pt-1 w-56 z-50">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {HEADER_CITIES.map((city) => (
                      <Link
                        key={city.name}
                        to={city.href}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-gray-800 hover:bg-green-50 hover:text-green-600 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                        onClick={() => setIsCityDropdownOpen(false)}
                      >
                        <CityPinIcon />
                        <span>{city.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div
              className="relative"
              ref={servicesDropdownRef}
              onMouseEnter={openServicesDropdown}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => (isServicesDropdownOpen ? setIsServicesDropdownOpen(false) : openServicesDropdown())}
                className="nav-link text-[15px] py-2 px-3 rounded-md hover:bg-green-50 flex items-center gap-1"
                aria-expanded={isServicesDropdownOpen}
                aria-haspopup="true"
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isServicesDropdownOpen && (
                <div className="absolute top-full left-0 pt-1 w-64 z-50">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {services.map((service, index) => (
                      <Link
                        key={service.href}
                        to={service.href}
                        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 hover:translate-x-1 ${
                          index === 0 ? 'font-semibold border-b border-gray-100 mb-1' : ''
                        }`}
                        onClick={() => setIsServicesDropdownOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/blog"
              className="nav-link text-[15px] py-2 px-3 rounded-md hover:bg-green-50"
              onMouseEnter={closeDesktopDropdowns}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="btn-cta nav-button font-semibold px-5 py-2.5 rounded-full text-[15px] whitespace-nowrap ml-1"
              onMouseEnter={closeDesktopDropdowns}
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button — hidden on md+ via CSS (.mobile-menu-toggle) */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isMenuOpen}
            aria-controls="primary-mobile-menu"
          >
            <span className={`mobile-menu-icon${isMenuOpen ? ' is-open' : ''}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`mobile-nav-panel border-t border-gray-200 bg-white${isMenuOpen ? ' is-open' : ''}`}
          id="primary-mobile-menu"
          aria-hidden={!isMenuOpen}
        >
          <div className="mobile-nav-panel-inner">
            <div className={`mobile-nav-panel-content${isMenuOpen ? ' is-open' : ''}`}>
            <Link
              to="/"
              className="mobile-menu-item nav-link text-sm font-medium py-1.5 px-2 rounded-md hover:bg-green-50 transition-all duration-200"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="mobile-menu-item nav-link text-sm font-medium py-1.5 px-2 rounded-md hover:bg-green-50 transition-all duration-200"
              onClick={closeMobileMenu}
            >
              About Us
            </Link>

            {/* Mobile City Dropdown */}
            <div className="mobile-menu-item">
              <button
                type="button"
                onClick={() => setIsMobileCityOpen(!isMobileCityOpen)}
                className="w-full text-left nav-link text-sm font-medium py-1.5 px-2 rounded-md hover:bg-green-50 transition-all duration-200 flex items-center justify-between uppercase tracking-wide"
              >
                City
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${isMobileCityOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`mobile-menu-subpanel ml-2 mt-0.5 space-y-0.5 transition-all duration-150 ${
                  isMobileCityOpen ? 'is-expanded' : ''
                }`}
              >
                {HEADER_CITIES.map((city, index) => (
                  <Link
                    key={city.name}
                    to={city.href}
                    className={`flex items-center gap-2 text-gray-700 hover:text-green-600 py-1.5 px-2 rounded-md hover:bg-green-50 transition-all duration-200 text-xs font-semibold uppercase tracking-wide transform ${
                      isMobileCityOpen ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 30}ms` }}
                    onClick={closeMobileMenu}
                  >
                    <CityPinIcon />
                    <span>{city.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Services Dropdown */}
            <div className="mobile-menu-item">
              <button
                type="button"
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="w-full text-left nav-link text-sm font-medium py-1.5 px-2 rounded-md hover:bg-green-50 transition-all duration-200 flex items-center justify-between"
              >
                Services
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`mobile-menu-subpanel ml-3 mt-0.5 space-y-0.5 transition-all duration-150 ${
                  isMobileServicesOpen ? 'is-expanded' : ''
                }`}
              >
                {services.map((service, index) => (
                  <Link
                    key={service.href}
                    to={service.href}
                    className={`block text-gray-600 hover:text-green-600 py-1.5 px-2 rounded-md hover:bg-green-50 transition-all duration-200 text-xs leading-snug transform ${
                      isMobileServicesOpen ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                    } ${index === 0 ? 'font-semibold text-gray-700' : ''}`}
                    style={{ transitionDelay: `${index * 30}ms` }}
                    onClick={closeMobileMenu}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/blog"
              className="mobile-menu-item nav-link text-sm font-medium py-1.5 px-2 rounded-md hover:bg-green-50 transition-all duration-200"
              onClick={closeMobileMenu}
            >
              Blog
            </Link>

            <div className="mobile-menu-item mobile-menu-cta-row">
              <a
                href={`tel:${BUSINESS.phoneTel}`}
                className="mobile-menu-cta-btn mobile-menu-cta-call"
                onClick={closeMobileMenu}
                aria-label={`Call ${BUSINESS.phoneDisplay}`}
              >
                Call Us
              </a>
              <Link
                to="/#get-quote"
                className="mobile-menu-cta-btn mobile-menu-cta-inspection"
                onClick={closeMobileMenu}
              >
                Free Inspection
              </Link>
            </div>
          </div>
          </div>
        </nav>
      </div>
    </header>
    </div>
  );
}
