import { useEffect } from 'react';

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

    upsertMeta('property', 'og:title', ogTitle || title);
    if (description) upsertMeta('property', 'og:description', ogDescription || description);
    if (ogUrl) upsertMeta('property', 'og:url', ogUrl);
    if (ogImage) upsertMeta('property', 'og:image', ogImage);
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogUrl, ogImage, noindex]);

  return null;
}
