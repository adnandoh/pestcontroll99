'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function StickyMobileCTA() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="flex">
        <a 
          href="tel:+919594966921"
          className="flex-1 bg-green-600 text-white py-2 px-3 text-center font-medium hover:bg-green-700 transition-colors flex items-center justify-center text-sm"
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
          </svg>
          Call Now
        </a>
        <Link 
          href="/quote"
          className="flex-1 bg-blue-600 text-white py-2 px-3 text-center font-medium hover:bg-blue-700 transition-colors flex items-center justify-center text-sm"
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
          </svg>
          Get Quote
        </Link>
      </div>
    </div>
  );
}