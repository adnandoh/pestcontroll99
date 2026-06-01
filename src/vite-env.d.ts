/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CRM_API_URL?: string;
  readonly VITE_API_URL?: string;
  readonly VITE_GOOGLE_MAPS_API_KEY?: string;
  readonly VITE_GA_ID?: string;
  readonly VITE_ENABLE_ANALYTICS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
