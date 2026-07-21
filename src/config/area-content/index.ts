import type { AreaRichContent } from './types';
import indexedSlugs from './indexed-slugs.json';
import { ANDHERI_AREA_CONTENT } from './andheri';
import { LONAVALA_AREA_CONTENT } from './lonavala';
import { ULHASNAGAR_AREA_CONTENT } from './ulhasnagar';
import { KALYAN_AREA_CONTENT } from './kalyan';
import { THANE_AREA_CONTENT } from './thane';
import { DADAR_AREA_CONTENT } from './dadar';
import { BADLAPUR_AREA_CONTENT } from './badlapur';
import { BANDRA_AREA_CONTENT } from './bandra';
import { VASHI_AREA_CONTENT } from './vashi';
import { PUNE_AREA_CONTENT } from './pune';

const AREA_CONTENT_REGISTRY: Record<string, AreaRichContent> = {
  andheri: ANDHERI_AREA_CONTENT,
  lonavala: LONAVALA_AREA_CONTENT,
  ulhasnagar: ULHASNAGAR_AREA_CONTENT,
  kalyan: KALYAN_AREA_CONTENT,
  thane: THANE_AREA_CONTENT,
  dadar: DADAR_AREA_CONTENT,
  badlapur: BADLAPUR_AREA_CONTENT,
  bandra: BANDRA_AREA_CONTENT,
  vashi: VASHI_AREA_CONTENT,
  pune: PUNE_AREA_CONTENT,
};

/** Slugs that should appear in sitemap.xml (add slug in indexed-slugs.json when content goes live) */
export const INDEXED_AREA_SLUGS: string[] = indexedSlugs;

export function getAreaRichContent(slug: string): AreaRichContent | undefined {
  return AREA_CONTENT_REGISTRY[slug.toLowerCase()];
}

export function isAreaIndexed(slug: string): boolean {
  return INDEXED_AREA_SLUGS.includes(slug.toLowerCase());
}
