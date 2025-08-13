import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import WebVitals from "@/components/WebVitals";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
//   display: 'swap',
// });

export const metadata: Metadata = {
  title: "Same-Day Pest Control Services in Mumbai, Pune & Navi Mumbai | Eco-Safe & Certified",
  description: "Professional pest control for homes and offices. Safe, odourless treatment with ISO-certified experts. Get a same-day quote now — satisfaction guaranteed.",
  keywords: "pest control mumbai, pest control pune, pest control navi mumbai, termite control, cockroach control, residential pest control, commercial pest control, same day service, eco-friendly pest control",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#0C9500',
  other: {
    'msapplication-TileColor': '#0C9500',
  },
  openGraph: {
    title: "Same-Day Pest Control Services in Mumbai, Pune & Navi Mumbai",
    description: "Professional pest control for homes and offices. Safe, odourless treatment with ISO-certified experts.",
    type: "website",
    url: "https://www.pestcontrol99.com",
    siteName: "PestControl99",
  },
  alternates: {
    canonical: "https://www.pestcontrol99.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Structured Data - LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "PestControl99",
              "description": "Professional pest control services in Mumbai, Pune & Navi Mumbai",
              "url": "https://www.pestcontrol99.com",
              "telephone": "+91-9594966921",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "9/B Arasa shopping center, S.V road, Next to Paneri Shop",
                "addressLocality": "Andheri West",
                "addressRegion": "Mumbai, Maharashtra",
                "postalCode": "400058",
                "addressCountry": "IN"
              },
              "openingHours": "Mo-Su 00:00-23:59",
              "serviceArea": ["Mumbai", "Pune", "Navi Mumbai"],
              "priceRange": "$$",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              }
            })
          }}
        />
      </head>
      <body
        className="font-sans antialiased min-h-screen flex flex-col"
        suppressHydrationWarning={true}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-69K3FRS21R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-69K3FRS21R');
          `}
        </Script>
        
        <Header />
        <main className="flex-grow pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <StickyMobileCTA />
        <WebVitals />
      </body>
    </html>
  );
}
