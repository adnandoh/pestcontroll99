import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Simple Pest Control Quote | Quick Estimate | PestControl99",
  description: "Get a quick pest control quote in seconds. Simple form for instant pricing on all pest control services in Mumbai, Pune & Navi Mumbai.",
  keywords: "simple pest control quote, quick pest quote, pest control estimate, fast pest control pricing",
  openGraph: {
    title: "Simple Pest Control Quote | PestControl99",
    description: "Get a quick pest control quote in seconds with our simple form.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.pestcontrol99.com/quote-simple",
  },
};

export default function QuoteSimpleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}