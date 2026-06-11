import { Suspense } from 'react';
import ClientOnly from '@/components/ClientOnly';
import HomeQuoteForm from '@/components/HomeQuoteForm';

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
  className = 'py-10 sm:py-12 bg-gradient-to-br from-gray-50 to-gray-100',
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
          <HomeQuoteForm
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
