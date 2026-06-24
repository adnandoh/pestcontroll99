/** Jump to top immediately — used on route changes (no smooth animation). */
export function scrollToTopInstant() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/** Smooth scroll for in-page anchor links only. */
export function scrollToElement(el: Element) {
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
