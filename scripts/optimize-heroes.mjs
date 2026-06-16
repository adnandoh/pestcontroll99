/**
 * One-off: compress the heavy hero PNGs into WebP (and AVIF) so the homepage
 * LCP image drops from ~1.9 MB to <100 KB. Run with: node scripts/optimize-heroes.mjs
 */
import sharp from 'sharp';
import { statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = resolve(__dirname, '..', 'public', 'images');

const heroes = ['hero-home.png', 'heroimage.png', 'pest-control-lonavala.png'];
const kb = (p) => `${(statSync(p).size / 1024).toFixed(0)} KB`;

for (const file of heroes) {
  const input = resolve(dir, file);
  const base = file.replace(/\.png$/i, '');
  try {
    const webpOut = resolve(dir, `${base}.webp`);
    const avifOut = resolve(dir, `${base}.avif`);
    // Cap width at 1920 — heroes are never displayed larger.
    const pipeline = sharp(input).resize({ width: 1920, withoutEnlargement: true });
    await pipeline.clone().webp({ quality: 78, effort: 6 }).toFile(webpOut);
    await pipeline.clone().avif({ quality: 55, effort: 5 }).toFile(avifOut);
    console.log(`✓ ${file} (${kb(input)}) → ${base}.webp (${kb(webpOut)}), ${base}.avif (${kb(avifOut)})`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
    process.exitCode = 1;
  }
}
