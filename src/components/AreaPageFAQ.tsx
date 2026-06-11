import { useState } from 'react';

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type AreaPageFAQProps = {
  areaName: string;
  items: FaqItem[];
};

export default function AreaPageFAQ({ areaName, items }: AreaPageFAQProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="py-12 sm:py-16 bg-gray-50" aria-labelledby="area-faq-heading">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <h2 id="area-faq-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions — {areaName}
          </h2>
          <div className="space-y-3">
            {items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">{item.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-gray-600 text-sm sm:text-base leading-relaxed">{item.answer}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
