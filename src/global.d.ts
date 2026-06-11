export {};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    __gmapsInit?: () => void;
    google?: {
      maps?: {
        places?: unknown;
      };
    };
  }
}
