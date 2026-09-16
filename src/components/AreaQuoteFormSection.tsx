import { Suspense } from 'react';
import ClientOnly from '@/components/ClientOnly';
import HomeInquiryForm from '@/components/HomeInquiryForm';

type AreaQuoteFormSectionProps = {
  areaName: string;
  areaPath: string;
  sectionId?: string;
  className?: string;
};

export default function AreaQuoteFormSection({
  areaName,
  areaPath,
  sectionId = 'free-quote',
  className = 'py-6 sm:py-8 bg-gradient-to-br from-gray-50 to-gray-100',
}: AreaQuoteFormSectionProps) {
  return (
    <ClientOnly
      fallback={
        <section className={className}>
          <div className="container mx-auto px-4">
            <div className="animate-pulse max-w-2xl mx-auto h-64 bg-gray-200 rounded-2xl" />
          </div>
        </section>
      }
    >
      <section id={sectionId} className={className}>
        <Suspense fallback={null}>
          <HomeInquiryForm
            compact
            leadSource={`Area Page | ${areaPath} | Organic`}
            defaultCity={areaName}
            defaultState="Maharashtra"
            formTitle={`Get Your Free Quote in ${areaName}`}
            formSubtitle={`Tell us about your pest problem in ${areaName} — we respond the same day with an accurate quote.`}
          />
        </Suspense>
      </section>
    </ClientOnly>
  );
}
