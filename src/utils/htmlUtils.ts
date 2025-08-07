/**
 * Utility functions for handling HTML content and entities
 */

/**
 * Decodes HTML entities in a string
 * @param html - The HTML string containing entities
 * @returns Decoded string
 */
export function decodeHtmlEntities(html: string): string {
  if (typeof window !== 'undefined') {
    // Client-side: use DOM parser
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  } else {
    // Server-side: manual replacement of common entities
    return html
      .replace(/&#8217;/g, "'")
      .replace(/&#8216;/g, "'")
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/&#8211;/g, '–')
      .replace(/&#8212;/g, '—')
      .replace(/&#8230;/g, '…')
      .replace(/&#038;/g, '&')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&nbsp;/g, ' ');
  }
}

/**
 * Cleans and decodes HTML content for display
 * @param html - Raw HTML content
 * @returns Cleaned and decoded HTML
 */
export function cleanHtmlContent(html: string): string {
  return decodeHtmlEntities(html);
}

/**
 * Strips HTML tags and decodes entities for plain text
 * @param html - HTML string
 * @returns Plain text string
 */
export function stripHtmlAndDecode(html: string): string {
  const withoutTags = html.replace(/<[^>]*>/g, '');
  return decodeHtmlEntities(withoutTags);
}