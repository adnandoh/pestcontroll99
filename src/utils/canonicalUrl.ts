/**
 * Utility function to generate canonical URLs for pages
 */

export function getCanonicalUrl(path: string): string {
  const baseUrl = 'https://www.pestcontrol99.com';
  // Remove trailing slash if present in path
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;
  
  // For homepage, return just the base URL
  if (normalizedPath === '') {
    return baseUrl;
  }
  
  // For all other pages, combine base URL with normalized path
  return `${baseUrl}${normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`}`;
}