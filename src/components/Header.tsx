'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Function to close mobile menu when link is clicked
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200" ref={menuRef}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2 md:py-3">
          <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
            <div className="flex items-center space-x-3">
              <Image 
                src="/images/logo.svg" 
                alt="PestControl99 Logo" 
                width={120} 
                height={40} 
                className="h-auto" 
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-700 font-medium hover:text-green-600 transition-colors py-2 px-3 rounded-md hover:bg-green-50">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 font-medium hover:text-green-600 transition-colors py-2 px-3 rounded-md hover:bg-green-50">
              About Us
            </Link>
            <Link href="/services" className="text-gray-700 font-medium hover:text-green-600 transition-colors py-2 px-3 rounded-md hover:bg-green-50">
              Services
            </Link>
            <Link href="/blog" className="text-gray-700 font-medium hover:text-green-600 transition-colors py-2 px-3 rounded-md hover:bg-green-50">
              Blog
            </Link>
            <Link href="/contact" className="bg-green-500 text-white font-medium px-5 py-2 rounded-full hover:bg-green-600 transition-colors text-sm">
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-3 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-1 pt-3">
              <Link 
                href="/" 
                className="text-gray-700 font-medium hover:text-green-600 py-2 px-2 rounded-md hover:bg-green-50 transition-colors"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 font-medium hover:text-green-600 py-2 px-2 rounded-md hover:bg-green-50 transition-colors"
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
              <Link 
                href="/services" 
                className="text-gray-700 font-medium hover:text-green-600 py-2 px-2 rounded-md hover:bg-green-50 transition-colors"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-700 font-medium hover:text-green-600 py-2 px-2 rounded-md hover:bg-green-50 transition-colors"
                onClick={closeMobileMenu}
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className="bg-green-500 text-white font-medium px-4 py-2 rounded-full hover:bg-green-600 transition-colors mx-2 text-center text-sm"
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}