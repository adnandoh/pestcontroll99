import { useEffect } from 'react';

const SITE_NAME = 'Pest Control 99';
const DEFAULT_OG_IMAGE = 'https://www.pestcontrol99.com/images/hero-home.webp';

export type PageMetaProps = {
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  noindex?: boolean;
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export default function PageMeta({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  noindex = false,
}: PageMetaProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    if (description) upsertMeta('name', 'description', description);
    if (keywords) upsertMeta('name', 'keywords', keywords);
    if (canonical) upsertLink('canonical', canonical);

    // Open Graph
    const resolvedOgUrl = ogUrl || canonical;
    const resolvedOgImage = ogImage || DEFAULT_OG_IMAGE;
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', ogTitle || title);
    if (description) upsertMeta('property', 'og:description', ogDescription || description);
    if (resolvedOgUrl) upsertMeta('property', 'og:url', resolvedOgUrl);
    upsertMeta('property', 'og:image', resolvedOgImage);

    // Twitter Card
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', ogTitle || title);
    if (description) upsertMeta('name', 'twitter:description', ogDescription || description);
    upsertMeta('name', 'twitter:image', resolvedOgImage);
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogUrl, ogImage, noindex]);

  return null;
}
