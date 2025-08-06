import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pest Control Blog | Expert Tips & Guides | PestControl99",
  description: "Expert pest control tips, prevention guides, and latest insights from PestControl99 professionals. Learn about termite prevention, cockroach control & more.",
  keywords: "pest control blog, pest control tips, termite prevention, cockroach control tips, pest control guides, pest control advice, pest prevention tips",
  openGraph: {
    title: "Pest Control Blog | Expert Tips & Guides",
    description: "Expert pest control tips and prevention guides from certified professionals.",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}