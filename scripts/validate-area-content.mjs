/**
 * Validates area content files before deploy.
 * Usage: npm run validate-area-content
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const AREA_DIR = resolve(ROOT, 'src/config/area-content');
const INDEXED = JSON.parse(readFileSync(resolve(AREA_DIR, 'indexed-slugs.json'), 'utf8'));
const AREAS_TS = readFileSync(resolve(ROOT, 'src/config/areasWeServe.ts'), 'utf8');
const VALID_SLUGS = [...AREAS_TS.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);

let errors = 0;

for (const slug of INDEXED) {
  if (!VALID_SLUGS.includes(slug)) {
    console.error(`[error] indexed-slugs.json: "${slug}" is not a valid area slug`);
    errors++;
  }
  const file = resolve(AREA_DIR, `${slug}.ts`);
  if (!existsSync(file)) {
    console.error(`[error] Missing content file for indexed slug: ${slug}.ts`);
    errors++;
  }
}

const contentFiles = readdirSync(AREA_DIR).filter((f) => f.endsWith('.ts') && !f.startsWith('_') && f !== 'types.ts' && f !== 'index.ts');
for (const file of contentFiles) {
  const slug = file.replace('.ts', '');
  const text = readFileSync(resolve(AREA_DIR, file), 'utf8');
  const title = text.match(/pageTitle:\s*'([^']+)'/)?.[1] || text.match(/pageTitle:\s*\n\s*'([^']+)'/)?.[1];
  const desc = text.match(/metaDescription:\s*\n\s*'([^']+)'/)?.[1] || text.match(/metaDescription:\s*'([^']+)'/)?.[1];
  const faqCount = (text.match(/question:/g) || []).length;

  if (title && title.length > 65) {
    console.warn(`[warn] ${file}: pageTitle is ${title.length} chars (aim ≤60)`);
  }
  if (desc && (desc.length < 120 || desc.length > 165)) {
    console.warn(`[warn] ${file}: metaDescription is ${desc.length} chars (aim 140–160)`);
  }
  if (faqCount < 3) {
    console.warn(`[warn] ${file}: only ${faqCount} FAQs (aim 4–5)`);
  }
  if (!INDEXED.includes(slug) && slug !== 'lonavala') {
    console.log(`[info] ${file} exists but slug "${slug}" is not in indexed-slugs.json (page stays noindex)`);
  }
}

if (errors > 0) {
  console.error(`\nValidation failed with ${errors} error(s).`);
  process.exit(1);
}
console.log('Area content validation passed.');
