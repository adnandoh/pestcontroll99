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

export const viewport = {
  themeColor: '#0C9500',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W4MX9PKB');`
          }}
        />
        {/* End Google Tag Manager */}
        
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
        {/* Google Maps JavaScript API (Places library) */}
        {googleMapsApiKey && (
          <>
            <Script
              id="google-maps"
              src={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places&loading=async`}
              strategy="beforeInteractive"
            />
            <Script id="gmaps-ready-poll" strategy="afterInteractive">{
              `
                (function(){
                  var tries = 0;
                  var maxTries = 300; // ~30s
                  var timer = setInterval(function(){
                    if (window.google && window.google.maps && window.google.maps.places) {
                      window.dispatchEvent(new Event('gmaps:ready'));
                      clearInterval(timer);
                    } else if (++tries >= maxTries) {
                      clearInterval(timer);
                    }
                  }, 100);
                })();
              `
            }</Script>
          </>
        )}
      </head>
      <body
        className="font-sans antialiased min-h-screen flex flex-col"
        suppressHydrationWarning={true}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-W4MX9PKB"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        

        
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
