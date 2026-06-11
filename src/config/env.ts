const isDev = import.meta.env.DEV;

const PRODUCTION_API_BASE = 'https://api.vacationbna.site';

function normalizeApiBase(url: string): string {
  return url.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');
}

export function getApiBase(): string {
  const envUrl =
    import.meta.env.VITE_CRM_API_URL ||
    import.meta.env.NEXT_PUBLIC_CRM_API_URL ||
    import.meta.env.VITE_API_URL ||
    import.meta.env.NEXT_PUBLIC_API_URL;
  if (envUrl) {
    return normalizeApiBase(envUrl);
  }
  if (isDev) {
    return '';
  }
  return PRODUCTION_API_BASE;
}

/** Bases to try for CRM POST (dev: local proxy first, then production). */
export function getCrmSubmitBases(): string[] {
  const primary = getApiBase();
  const bases = primary ? [primary] : [''];
  if (isDev && !bases.includes(PRODUCTION_API_BASE)) {
    bases.push(PRODUCTION_API_BASE);
  }
  return bases;
}

export function getGoogleMapsApiKey(): string | undefined {
  const key =
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
    import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const trimmed = typeof key === 'string' ? key.trim() : '';
  return trimmed.length > 0 ? trimmed : undefined;
}

export function isGoogleMapsReady(): boolean {
  return typeof window !== 'undefined' && Boolean(window.google?.maps?.places);
}
