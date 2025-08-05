import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-69K3FRS21R"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-69K3FRS21R');
            `,
          }}
        />
      </head>
      <body
        className={`${lexend.variable} font-lexend antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
