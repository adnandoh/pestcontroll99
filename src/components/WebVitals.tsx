'use client';

import { useEffect } from 'react';

interface Metric {
  name: string;
  id: string;
  value: number;
}

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

export default function WebVitals() {
  useEffect(() => {
    const sendToAnalytics = (metric: Metric) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }
    };

    // Dynamically import web-vitals with error handling
    const loadWebVitals = async () => {
      try {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
        getCLS(sendToAnalytics);
        getFID(sendToAnalytics);
        getFCP(sendToAnalytics);
        getLCP(sendToAnalytics);
        getTTFB(sendToAnalytics);
      } catch (error) {
        // Silently fail if web-vitals can't be loaded
        console.warn('Web Vitals could not be loaded:', error);
      }
    };

    // Only load in production and if gtag is available
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      loadWebVitals();
    }
  }, []);

  return null;
}