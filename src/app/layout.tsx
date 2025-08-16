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
        {/* Structured Data - Organization & Services */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.pestcontrol99.com/#org",
                  "name": "PestControl99",
                  "url": "https://www.pestcontrol99.com/",
                  "logo": "https://www.pestcontrol99.com/images/logo.svg",
                  "description": "Same-day, kid- and pet-safe pest control services in Mumbai. Treatments for cockroaches, termites, rodents, mosquitoes, bed bugs, wood borers, and honey bees.",
                  "contactPoint": [
                    {
                      "@type": "ContactPoint",
                      "telephone": "+91 95949 66921",
                      "contactType": "customer service",
                      "areaServed": ["Mumbai", "Thane", "Navi Mumbai", "Pune", "IN"],
                      "availableLanguage": ["en", "hi", "ur", "mr"]
                    }
                  ],
                  "sameAs": [
                    "https://www.facebook.com/profile.php?id=61579196252758&mibextid=ZbWKwL",
                    "https://www.instagram.com/pestcontrol_99"
                  ]
                },
                {
                  "@type": "PestControlService",
                  "@id": "https://www.pestcontrol99.com/#localbusiness",
                  "name": "PestControl99",
                  "image": "https://www.pestcontrol99.com/images/logo.svg",
                  "url": "https://www.pestcontrol99.com/",
                  "telephone": "+91 95949 66921",
                  "description": "Professional pest control services with same-day response. Low-odour, stain-free treatments for homes and businesses.",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "9/B Arasa shopping center, S.V Road, Next to Paneri Shop, Andheri West",
                    "addressLocality": "Mumbai",
                    "addressRegion": "Maharashtra",
                    "postalCode": "400058",
                    "addressCountry": "IN"
                  },
                  "email": "info@pestcontrol99.com",
                  "priceRange": "₹₹",
                  "areaServed": ["Mumbai", "Thane", "Navi Mumbai", "Pune", "IN"],
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                      "opens": "00:00",
                      "closes": "23:59"
                    }
                  ],
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 19.120886,
                    "longitude": 72.845466
                  },
                  "hasMap": "https://www.google.com/maps/search/?api=1&query=19.120886,72.845466",
                  "sameAs": [
                    "https://www.facebook.com/profile.php?id=61579196252758&mibextid=ZbWKwL",
                    "https://www.instagram.com/pestcontrol_99"
                  ]
                },
                {
                  "@type": "Service",
                  "@id": "https://www.pestcontrol99.com/#services",
                  "name": "Pest control services",
                  "provider": { "@id": "https://www.pestcontrol99.com/#localbusiness" },
                  "areaServed": ["Mumbai", "Thane", "Navi Mumbai", "Pune", "IN"],
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "PestControl99 Services",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Cockroach Pest Control",
                          "url": "https://www.pestcontrol99.com/services/cockroach-pest-control-mumbai/"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Mosquito Control",
                          "url": "https://www.pestcontrol99.com/services/mosquito-pest-control-mumbai/"
                        }
                      }
                    ]
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.pestcontrol99.com/#website",
                  "url": "https://www.pestcontrol99.com/",
                  "name": "PestControl99",
                  "inLanguage": "en"
                }
              ]
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
        
        {/* Google Maps API */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=Function.prototype`}
          strategy="afterInteractive"
        />
        
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