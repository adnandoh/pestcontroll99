import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Get Free Pest Control Quote | Instant Online Quote | PestControl99",
  description: "Get your free pest control quote online. Instant pricing for termite, cockroach, rodent & all pest control services. Same-day service in Mumbai, Pune & Navi Mumbai.",
  keywords: "free pest control quote, pest control pricing, online pest control quote, instant quote, pest control cost, Mumbai pest control quote, Pune pest control pricing",
  openGraph: {
    title: "Get Free Pest Control Quote | PestControl99",
    description: "Get instant online quotes for all pest control services with transparent pricing and same-day service.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.pestcontrol99.com/quote",
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}