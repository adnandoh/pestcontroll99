import { getApiBase } from '@/config/env';

const API_BASE = getApiBase();

function apiUrl(path: string): string {
  if (!API_BASE) {
    return path;
  }
  return `${API_BASE}${path}`;
}

export async function getBlogs(params?: {
  page?: number;
  page_size?: number;
  category?: string;
  tag?: string;
  q?: string;
}) {
  const queryParams: Record<string, string> = {};
  if (params?.page) queryParams.page = params.page.toString();
  if (params?.page_size) queryParams.page_size = params.page_size.toString();
  if (params?.category) queryParams.category = params.category;
  if (params?.tag) queryParams.tag = params.tag;
  if (params?.q) queryParams.q = params.q;
  const query = new URLSearchParams(queryParams);
  const queryString = query.toString() ? `?${query.toString()}` : '';

  const fetchUrl = apiUrl(`/api/public/blogs/${queryString}`);
  const res = await fetch(fetchUrl);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch blogs from ${fetchUrl}. Status: ${res.status}. Body: ${errText}`);
  }
  return res.json();
}

export async function getBlog(slug: string) {
  const fetchUrl = apiUrl(`/api/public/blogs/${slug}/`);
  const res = await fetch(fetchUrl);
  if (res.status === 404) return null;
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch blog from ${fetchUrl}. Status: ${res.status}. Body: ${errText}`);
  }
  return res.json();
}

export async function getRelatedBlogs(slug: string, limit = 4) {
  const fetchUrl = apiUrl(`/api/public/related-blogs/?slug=${slug}&limit=${limit}`);
  const res = await fetch(fetchUrl);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch related blogs from ${fetchUrl}. Status: ${res.status}. Body: ${errText}`);
  }
  return res.json();
}

export async function getCategories() {
  const fetchUrl = apiUrl('/api/public/categories/');
  const res = await fetch(fetchUrl);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch categories from ${fetchUrl}. Status: ${res.status}. Body: ${errText}`);
  }
  return res.json();
}

export async function getTags() {
  const fetchUrl = apiUrl('/api/public/tags/');
  const res = await fetch(fetchUrl);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch tags from ${fetchUrl}. Status: ${res.status}. Body: ${errText}`);
  }
  return res.json();
}

export async function trackView(slug: string) {
  await fetch(apiUrl('/api/blogs/view/'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug }),
  });
}
