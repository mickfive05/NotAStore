import { EXTRA_PRODUCTS } from '../js/catalog-expansion.js';
import { writeFile, access } from 'node:fs/promises';
// Download unmodified official assets only; never overwrite an existing image.
for (const p of EXTRA_PRODUCTS) {
  const sources = p.officialImages || p.images;
  for (const [i, url] of sources.entries()) {
    const target = `images/products/official-${p.id}-${i}.${url.includes('.jpg') ? 'jpg' : 'png'}`;
    try { await access(target); continue; } catch {}
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`Image download failed: ${url}`);
    await writeFile(target, Buffer.from(await response.arrayBuffer()), { flag: 'wx' });
    console.log(target);
  }
}
