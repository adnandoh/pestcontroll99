// import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import WebVitals from "@/components/WebVitals";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
//   display: 'swap',
// });

export const viewport = {
  themeColor: '#0C9500',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MWPXXQJH');`
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17687478045"
          strategy="afterInteractive"
        />
        <Script id="google-tag-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17687478045');
          `}
        </Script>
        
        {/* Structured Data - LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.pestcontrol99.com/#localbusiness",
              "name": "PestControl99",
              "alternateName": "Multi Pest Care LLP",
              "description": "Professional pest control services in Mumbai, Thane & Navi Mumbai. Licensed experts offering cockroach, termite, rodent, and mosquito control with same-day service and 365-day warranty.",
              "url": "https://www.pestcontrol99.com",
              "telephone": "+91-8080748282",
              "email": "accounts@pestcontrol99.com",
              "image": "https://www.pestcontrol99.com/images/heroimage.webp",
              "logo": "https://www.pestcontrol99.com/android-chrome-512x512.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Andheri West",
                "addressLocality": "Mumbai",
                "addressRegion": "Maharashtra",
                "postalCode": "400058",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "19.1136",
                "longitude": "72.8697"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                "opens": "00:00",
                "closes": "23:59"
              },
              "areaServed": [
                { "@type": "City", "name": "Mumbai" },
                { "@type": "City", "name": "Thane" },
                { "@type": "City", "name": "Navi Mumbai" }
              ],
              "serviceType": [
                "Cockroach Pest Control",
                "Termite Treatment",
                "Rodent Control",
                "Mosquito Control",
                "Honey Bee Removal",
                "Wood Borer Control"
              ],
              "priceRange": "$$",
              "hasMap": "https://maps.google.com/?q=Andheri+West+Mumbai",
              "sameAs": [
                "https://www.facebook.com/pestcontrol99",
                "https://www.instagram.com/pestcontrol99"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150",
                "bestRating": "5",
                "worstRating": "1"
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
            src="https://www.googletagmanager.com/ns.html?id=GTM-MWPXXQJH"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        

        
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingWidgets />
        <WebVitals />
      </body>
    </html>
  );
}
