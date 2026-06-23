import { Link } from 'react-router-dom';
import AppImage from '@/components/AppImage';
import { useState, useEffect, useRef } from 'react';
import { HEADER_CITIES } from '@/config/headerCities';
import { BUSINESS, SITE_LOGO } from '@/config/business';
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
      {/* Top promo bar */}
      <div className="bg-navy-dark text-white border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-2">
          <ul className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 sm:gap-x-8 gap-y-1 text-xs sm:text-sm font-medium">
            <li className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-sm bg-green-bright" aria-hidden="true" />
              Free Inspections &amp; Estimates
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-sm bg-green-bright" aria-hidden="true" />
              Same Day Service
            </li>
          </ul>
        </div>
      </div>

      <header
        className="site-header bg-white border-b border-divider shadow-sm"
        ref={menuRef}
        role="navigation"
        aria-label="Main"
      >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center min-h-[4.25rem] py-2.5 sm:min-h-[4.75rem] sm:py-3">
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
              className="block h-11 sm:h-12 md:h-[3.25rem] w-auto max-w-[min(68vw,240px)] md:max-w-[200px] lg:max-w-[220px] object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link to="/" className="nav-link text-[15px] py-2 px-3 rounded-md hover:bg-green-50">
              Home
            </Link>
            <Link to="/about" className="nav-link text-[15px] py-2 px-3 rounded-md hover:bg-green-50">
              About Us
            </Link>

            {/* City Dropdown */}
            <div className="relative" ref={cityDropdownRef}>
              <button
                type="button"
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                onMouseEnter={() => setIsCityDropdownOpen(true)}
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
                <div
                  className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                  onMouseLeave={() => setIsCityDropdownOpen(false)}
                >
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
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesDropdownRef}>
              <button
                type="button"
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
                className="nav-link text-[15px] py-2 px-3 rounded-md hover:bg-green-50 flex items-center gap-1"
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
                <div
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                >
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
              )}
            </div>

            <Link to="/blog" className="nav-link text-[15px] py-2 px-3 rounded-md hover:bg-green-50">
              Blog
            </Link>
            <Link to="/contact" className="btn-cta nav-button font-semibold px-5 py-2.5 rounded-full text-[15px] whitespace-nowrap ml-1">
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button — 44×44px minimum tap target (WCAG) */}
          <button
            type="button"
            className="mobile-menu-toggle md:hidden"
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

        {/* Mobile Navigation */}
        <nav
          className={`mobile-nav-panel md:hidden border-t border-gray-200 bg-white${isMenuOpen ? ' is-open' : ''}`}
          id="primary-mobile-menu"
          aria-hidden={!isMenuOpen}
        >
          <div className="mobile-nav-panel-inner">
            <div className={`mobile-nav-panel-content${isMenuOpen ? ' is-open' : ''}`}>
            <Link
              to="/"
              className="mobile-menu-item nav-link font-medium py-2 px-2 rounded-md hover:bg-green-50 transition-all duration-200"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="mobile-menu-item nav-link font-medium py-2 px-2 rounded-md hover:bg-green-50 transition-all duration-200"
              onClick={closeMobileMenu}
            >
              About Us
            </Link>

            {/* Mobile City Dropdown */}
            <div className="mobile-menu-item">
              <button
                type="button"
                onClick={() => setIsMobileCityOpen(!isMobileCityOpen)}
                className="w-full text-left nav-link font-medium py-2 px-2 rounded-md hover:bg-green-50 transition-all duration-200 flex items-center justify-between uppercase tracking-wide text-sm"
              >
                City
                <svg
                  className={`w-4 h-4 transition-transform duration-150 ${isMobileCityOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`ml-2 mt-1 space-y-1 overflow-hidden transition-all duration-150 ${
                  isMobileCityOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {HEADER_CITIES.map((city, index) => (
                  <Link
                    key={city.name}
                    to={city.href}
                    className={`flex items-center gap-2.5 text-gray-700 hover:text-green-600 py-2.5 px-2 rounded-md hover:bg-green-50 transition-all duration-200 text-sm font-semibold uppercase tracking-wide transform ${
                      isMobileCityOpen ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
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
                className="w-full text-left nav-link font-medium py-2 px-2 rounded-md hover:bg-green-50 transition-all duration-200 flex items-center justify-between"
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform duration-150 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`ml-4 mt-1 space-y-1 overflow-hidden transition-all duration-150 ${
                  isMobileServicesOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {services.map((service, index) => (
                  <Link
                    key={service.href}
                    to={service.href}
                    className={`block text-gray-600 hover:text-green-600 py-2 px-2 rounded-md hover:bg-green-50 transition-all duration-200 text-sm transform ${
                      isMobileServicesOpen ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                    } ${index === 0 ? 'font-semibold text-gray-700' : ''}`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                    onClick={closeMobileMenu}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/blog"
              className="mobile-menu-item nav-link font-medium py-2 px-2 rounded-md hover:bg-green-50 transition-all duration-200"
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
