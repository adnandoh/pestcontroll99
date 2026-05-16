export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractToc(html: string): TocItem[] {
  if (typeof window === "undefined") {
    // Server-side: use regex
    const matches = [...html.matchAll(/<h([2-4])[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h\d>/gi)];
    return matches.map(([, level, id, text]) => ({
      id,
      text: text.replace(/<[^>]+>/g, ""),
      level: parseInt(level),
    }));
  }
  // Client-side: use DOM
  const div = document.createElement("div");
  div.innerHTML = html;
  return Array.from(div.querySelectorAll("h2, h3, h4")).map((el) => ({
    id: el.id || el.textContent!.toLowerCase().replace(/\s+/g, "-"),
    text: el.textContent || "",
    level: parseInt(el.tagName[1] || '2'),
  }));
}
