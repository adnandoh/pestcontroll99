let API_BASE = process.env.NEXT_PUBLIC_CRM_API_URL || process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'https://api.vacationbna.site';

if (process.env.NODE_ENV === 'development') {
  API_BASE = 'http://localhost:8000';
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
  
  const fetchUrl = `${API_BASE}/api/public/blogs/${queryString}`;
  const res = await fetch(fetchUrl, {
    next: { revalidate: 300 }, // ISR: revalidate every 5 minutes
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch blogs from ${fetchUrl}. Status: ${res.status}. Body: ${errText}`);
  }
  return res.json();
}

export async function getBlog(slug: string) {
  const fetchUrl = `${API_BASE}/api/public/blogs/${slug}/`;
  const res = await fetch(fetchUrl, {
    next: { revalidate: 300 },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch blog from ${fetchUrl}. Status: ${res.status}. Body: ${errText}`);
  }
  return res.json();
}

export async function getRelatedBlogs(slug: string, limit = 4) {
  const fetchUrl = `${API_BASE}/api/public/related-blogs/?slug=${slug}&limit=${limit}`;
  const res = await fetch(fetchUrl, { next: { revalidate: 300 } });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch related blogs from ${fetchUrl}. Status: ${res.status}. Body: ${errText}`);
  }
  return res.json();
}

export async function getCategories() {
  const fetchUrl = `${API_BASE}/api/public/categories/`;
  const res = await fetch(fetchUrl, {
    next: { revalidate: 600 }, // 10 minutes
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch categories from ${fetchUrl}. Status: ${res.status}. Body: ${errText}`);
  }
  return res.json();
}

export async function getTags() {
  const fetchUrl = `${API_BASE}/api/public/tags/`;
  const res = await fetch(fetchUrl, {
    next: { revalidate: 600 },
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch tags from ${fetchUrl}. Status: ${res.status}. Body: ${errText}`);
  }
  return res.json();
}

export async function trackView(slug: string) {
  // Call from client-side useEffect only
  await fetch(`${API_BASE}/api/blogs/view/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug }),
  });
}
