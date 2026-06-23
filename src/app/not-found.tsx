import { Link } from 'react-router-dom';
import PageMeta from '@/components/PageMeta';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <PageMeta
        title="Page Not Found | Pest Control 99"
        description="The page you requested could not be found. Browse our pest control services in Mumbai, Thane and Navi Mumbai."
        noindex
      />
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <svg
            className="h-24 w-24 text-gray-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-6xl font-bold text-gray-400 mb-2" aria-hidden="true">404</p>
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
          
          <Link to="/contact"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Us
          </Link>
        </div>
        
        <div className="mt-12">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Popular Services
          </h3>
          <div className="space-y-2">
            <Link to="/services" className="block text-green-600 hover:text-green-700 transition-colors">
              Pest Control Services
            </Link>
            <Link to="/quote" className="block text-green-600 hover:text-green-700 transition-colors">
              Get Free Quote
            </Link>
            <Link to="/blog" className="block text-green-600 hover:text-green-700 transition-colors">
              Pest Control Tips
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
