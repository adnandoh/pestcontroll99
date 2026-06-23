import { Suspense } from 'react';
import HomeQuoteForm from '@/components/HomeQuoteForm';
import Breadcrumb from '@/components/Breadcrumb';
import PageMeta from '@/components/PageMeta';

function QuotePageContent() {
  return (
    <main className="bg-white min-h-screen">
      <PageMeta
        title="Get a Free Pest Control Quote | Instant Price Estimate"
        description="Get an instant pest control price estimate for your home or office in Mumbai, Thane & Navi Mumbai. Same-day service, no hidden charges. Book your free quote now."
        canonical="https://www.pestcontrol99.com/quote/"
        ogUrl="https://www.pestcontrol99.com/quote/"
      />
      <Breadcrumb items={[{ label: 'Get Quote' }]} />
      <h1 className="sr-only">Get a Free Pest Control Quote</h1>
      <div className="-mt-8 md:-mt-12">
        <HomeQuoteForm />
      </div>
      
      {/* Additional Quote Page Content if needed */}
      <div className="container mx-auto px-4 pb-16 -mt-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Our experts will analyze your requirements and provide the most competitive pricing in the industry.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="py-20 bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    }>
      <QuotePageContent />
    </Suspense>
  );
}
