import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';
import WebVitals from '@/components/WebVitals';
import { getGoogleMapsApiKey } from '@/config/env';
import { getStructuredDataGraph } from '@/utils/structuredData';

function loadScript(id: string, src: string, async = true) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.src = src;
  script.async = async;
  document.head.appendChild(script);
}

export default function RootLayout() {
  const googleMapsApiKey = getGoogleMapsApiKey();

  useEffect(() => {
    loadScript(
      'gtm-script',
      'https://www.googletagmanager.com/gtm.js?id=GTM-MWPXXQJH',
    );
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

    loadScript('gtag-js', 'https://www.googletagmanager.com/gtag/js?id=AW-17687478045');
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'AW-17687478045');

    if (googleMapsApiKey) {
      loadScript(
        'google-maps',
        `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places&loading=async`,
        true,
      );
      let tries = 0;
      const timer = window.setInterval(() => {
        if (window.google?.maps?.places) {
          window.dispatchEvent(new Event('gmaps:ready'));
          window.clearInterval(timer);
        } else if (++tries >= 300) {
          window.clearInterval(timer);
        }
      }, 100);
      return () => window.clearInterval(timer);
    }
  }, [googleMapsApiKey]);

  return (
    <>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MWPXXQJH"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="gtm"
        />
      </noscript>
      {getStructuredDataGraph().map((schema) => (
        <script
          key={schema['@id'] as string}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingWidgets />
      <WebVitals />
    </>
  );
}
