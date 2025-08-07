import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pest Control Blog | Expert Tips & Advice | PestControl99",
  description: "Expert pest control tips, prevention guides, and professional advice. Learn about termite control, cockroach prevention, and eco-friendly pest solutions from certified experts.",
  keywords: "pest control blog, pest prevention tips, termite control advice, cockroach prevention, pest control guides, eco-friendly pest control, pest control experts",
  openGraph: {
    title: "Pest Control Blog | Expert Tips & Advice",
    description: "Professional pest control advice and tips from certified experts. Learn effective pest prevention strategies.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.pestcontrol99.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}