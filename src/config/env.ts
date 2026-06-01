const isDev = import.meta.env.DEV;

export function getApiBase(): string {
  const envUrl = import.meta.env.VITE_CRM_API_URL || import.meta.env.VITE_API_URL;
  if (envUrl) {
    return envUrl.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');
  }
  if (isDev) {
    return '';
  }
  return 'https://api.vacationbna.site';
}

export function getGoogleMapsApiKey(): string | undefined {
  return import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
}
