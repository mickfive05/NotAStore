import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { CATALOG } from '../js/data.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const base = 'https://notastore.shop';
const today = new Date().toISOString().slice(0, 10);
const staticPages = [
  ['/', '1.0', 'daily'],
  ['/prodotti', '0.9', 'daily'],
  ['/offerte', '0.8', 'daily'],
  ['/come-funziona', '0.8', 'monthly'],
  ['/chi-siamo', '0.7', 'monthly'],
  ['/privacy', '0.4', 'yearly'],
  ['/termini', '0.4', 'yearly'],
];
const pages = [
  ...staticPages,
  ...CATALOG.map((product) => [`/prodotto/${encodeURIComponent(product.id)}`, '0.7', 'weekly']),
];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([path, priority, changefreq]) => `  <url><loc>${base}${path}</loc><lastmod>${today}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`).join('\n')}
</urlset>
`;
await writeFile(join(root, 'sitemap.xml'), xml, 'utf8');
console.log(`Sitemap generata: ${pages.length} URL`);
