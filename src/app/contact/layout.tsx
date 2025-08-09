import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact PestControl99 | Get Free Quote | 24/7 Pest Control Services",
  description: "Contact PestControl99 for professional pest control services. Get free quotes, emergency service available 24/7. Call now for same-day service in Mumbai, Pune & Navi Mumbai.",
  keywords: "contact pest control, pest control quote, emergency pest control, 24/7 pest control, Mumbai pest control contact, Pune pest control contact",
  openGraph: {
    title: "Contact PestControl99 | Get Free Quote",
    description: "Contact us for professional pest control services with same-day response and 24/7 emergency service.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}