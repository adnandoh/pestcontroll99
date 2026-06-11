import { Link } from 'react-router-dom';
import AppImage from '@/components/AppImage';
import { useState, useEffect, useRef } from 'react';
import { HEADER_CITIES } from '@/config/headerCities';

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
        fill="#00C950"
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
    <header
      className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 shadow-sm sticky top-0 z-50 border-b border-gray-100"
      ref={menuRef}
      role="navigation"
      aria-label="Main"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2 md:py-3">
          <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
            <div className="flex items-center space-x-3">
              <div className="flex items-center" style={{ height: 48 }}>
                <AppImage
                  src="/images/logo.svg"
                  alt="Pest Control 99 Logo"
                  width={140}
                  height={40}
                  className="h-full w-auto"
                  priority
                />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 font-medium hover:text-green-600 transition-colors py-2 px-3 rounded-md hover:bg-green-50">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 font-medium hover:text-green-600 transition-colors py-2 px-3 rounded-md hover:bg-green-50">
              About Us
            </Link>

            {/* City Dropdown */}
            <div className="relative" ref={cityDropdownRef}>
              <button
                type="button"
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                onMouseEnter={() => setIsCityDropdownOpen(true)}
                className="text-gray-700 font-medium hover:text-green-600 transition-colors py-2 px-3 rounded-md hover:bg-green-50 flex items-center gap-1 uppercase tracking-wide text-sm"
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
                className="text-gray-700 font-medium hover:text-green-600 transition-colors py-2 px-3 rounded-md hover:bg-green-50 flex items-center gap-1"
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

            <Link to="/blog" className="text-gray-700 font-medium hover:text-green-600 transition-colors py-2 px-3 rounded-md hover:bg-green-50">
              Blog
            </Link>
            <Link to="/contact" className="bg-green-500 text-white font-medium px-5 py-2 rounded-full hover:bg-green-600 transition-colors text-sm">
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
            aria-controls="primary-mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                  className="animate-in spin-in-180 duration-300"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                  className="animate-in fade-in duration-300"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`md:hidden border-t border-gray-200 bg-white overflow-hidden transition-all duration-150 ${
            isMenuOpen ? 'max-h-[32rem] opacity-100 pb-3' : 'max-h-0 opacity-0 pb-0'
          }`}
          id="primary-mobile-menu"
          aria-hidden={!isMenuOpen}
        >
          <div className="flex flex-col space-y-1 pt-3">
            <Link
              to="/"
              className="mobile-menu-item text-gray-700 font-medium hover:text-green-600 py-2 px-2 rounded-md hover:bg-green-50 transition-all duration-200"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="mobile-menu-item text-gray-700 font-medium hover:text-green-600 py-2 px-2 rounded-md hover:bg-green-50 transition-all duration-200"
              onClick={closeMobileMenu}
            >
              About Us
            </Link>

            {/* Mobile City Dropdown */}
            <div className="mobile-menu-item">
              <button
                type="button"
                onClick={() => setIsMobileCityOpen(!isMobileCityOpen)}
                className="w-full text-left text-gray-700 font-medium hover:text-green-600 py-2 px-2 rounded-md hover:bg-green-50 transition-all duration-200 flex items-center justify-between uppercase tracking-wide text-sm"
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
                className="w-full text-left text-gray-700 font-medium hover:text-green-600 py-2 px-2 rounded-md hover:bg-green-50 transition-all duration-200 flex items-center justify-between"
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
              className="mobile-menu-item text-gray-700 font-medium hover:text-green-600 py-2 px-2 rounded-md hover:bg-green-50 transition-all duration-200"
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="mobile-menu-item bg-green-500 text-white font-medium px-4 py-2 rounded-full hover:bg-green-600 transition-all duration-200 mx-2 text-center text-sm hover:shadow-lg"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
