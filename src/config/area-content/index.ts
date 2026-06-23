import type { AreaRichContent } from './types';
import indexedSlugs from './indexed-slugs.json';
import { ANDHERI_AREA_CONTENT } from './andheri';
import { LONAVALA_AREA_CONTENT } from './lonavala';

const AREA_CONTENT_REGISTRY: Record<string, AreaRichContent> = {
  andheri: ANDHERI_AREA_CONTENT,
  lonavala: LONAVALA_AREA_CONTENT,
};

/** Slugs that should appear in sitemap.xml (add slug in indexed-slugs.json when content goes live) */
export const INDEXED_AREA_SLUGS: string[] = indexedSlugs;

export function getAreaRichContent(slug: string): AreaRichContent | undefined {
  return AREA_CONTENT_REGISTRY[slug.toLowerCase()];
}

export function isAreaIndexed(slug: string): boolean {
  return INDEXED_AREA_SLUGS.includes(slug.toLowerCase());
}
