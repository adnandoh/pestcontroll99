'use client';

import { useState } from 'react';
import Head from 'next/head';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

interface FAQCategory {
  id: string;
  name: string;
  items: FAQItem[];
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const categories: FAQCategory[] = [
    {
      id: 'general',
      name: 'General',
      items: [
        {
          id: 'safe-treatment',
          question: 'Are your treatments safe for kids and pets?',
          answer: 'Yes, we offer 100% herbal treatment options that are completely safe for children and pets. Our odourless gels and WHO-approved treatments clear within 3 hours with zero wall stains.',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        {
          id: 'same-day',
          question: 'Do you provide same-day service?',
          answer: 'Yes, we provide same-day pest control service with our police-verified, ISO 9001-certified technicians. Most treatments are completed in a single visit with immediate results.',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        {
          id: 'warranty',
          question: 'What\'s included in your 365-day warranty?',
          answer: 'Our 365-day warranty covers free re-service if pests return within a year. We also provide FSSAI-ready reports for commercial clients and maintain detailed service records.',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          )
        },
        {
          id: 'treatment-speed',
          question: 'How quickly do treatments work?',
          answer: 'Most treatments show immediate results. Cockroach gel eliminates nests within 4 hours, mosquito misting provides instant relief, and rodent trapping typically resolves issues within 24-48 hours.',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'pricing',
      name: 'Pricing',
      items: [
        {
          id: 'cost',
          question: 'How much does pest control cost?',
          answer: 'Pricing starts from ₹799 for 1BHK flats, ₹1,999 for 3BHK homes, and ₹5/sq ft for commercial spaces. All treatments include our 365-day warranty and are customized based on your specific pest problem and property size.',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          )
        },
        {
          id: 'hidden-fees',
          question: 'Are there any hidden charges?',
          answer: 'No, we believe in transparent pricing with no hidden fees. The quote we provide includes all materials, labor, and our 365-day warranty. You pay exactly what we quote.',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )
        },
        {
          id: 'payment',
          question: 'What payment methods do you accept?',
          answer: 'We accept cash, UPI, credit/debit cards, and bank transfers. Payment is due after successful completion of the treatment, not in advance.',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'service',
      name: 'Service',
      items: [
        {
          id: 'commercial',
          question: 'Do you service commercial properties?',
          answer: 'Yes, we specialize in commercial pest control for restaurants, offices, hotels, and industrial facilities. We provide FSSAI-compliant reports and maintain discretion for business operations.',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          )
        },
        {
          id: 'emergency',
          question: 'Do you provide emergency services?',
          answer: 'Yes, we offer 24/7 emergency pest control services for urgent situations like wasp nests, severe infestations, or health hazards. Emergency response typically within 2-4 hours.',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )
        },
        {
          id: 'follow-up',
          question: 'Do you provide follow-up services?',
          answer: 'Yes, we provide free follow-up inspections within our warranty period. We also offer maintenance contracts for ongoing pest prevention and monitoring.',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'treatment',
      name: 'Treatment',
      items: [
        {
          id: 'chemicals',
          question: 'What chemicals do you use?',
          answer: 'We use WHO-approved, eco-friendly chemicals and offer 100% herbal treatment options. All our treatments are odourless and leave no stains on walls or furniture.',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          )
        },
        {
          id: 'preparation',
          question: 'Do I need to prepare my home before treatment?',
          answer: 'Minimal preparation is required. We recommend covering food items, removing pets temporarily, and providing access to affected areas. Our team will guide you through specific requirements.',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
            </svg>
          )
        }
      ]
    }
  ];

  const currentCategory = categories.find(cat => cat.id === activeCategory);

  // Generate structured data for FAQ
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": categories.flatMap(category => 
      category.items.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    )
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These are the most commonly asked questions about our pest control services. 
            Can't find what you're looking for? <a href="/contact" className="text-green-600 hover:text-green-700 underline">Chat to our friendly team!</a>
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
              }`}
              style={activeCategory === category.id ? { backgroundColor: '#0C9500' } : {}}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {currentCategory?.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                      openItems.includes(item.id) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {openItems.includes(item.id) && (
                <div className="px-6 pb-6">
                  <div className="ml-16 text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}