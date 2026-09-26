// Read public product metadata for catalog maintenance; no account or checkout calls.
const walk = (value, found = []) => {
  if (Array.isArray(value)) value.forEach((item) => walk(item, found));
  else if (value && typeof value === 'object') {
    if (String(value['@type']).includes('Product')) { found.push(value); if (value.hasVariant) walk(value.hasVariant, found); }
    else Object.values(value).forEach((item) => walk(item, found));
  }
  return found;
};
await Promise.all(process.argv.slice(2).map(async (url) => {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
    const html = await response.text(); const found = [];
    for (const match of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
      try { walk(JSON.parse(match[1]), found); } catch {}
    }
    console.log(JSON.stringify({ url, status: response.status, products: found.slice(0, 15).map((p) => ({ name: p.name, sku: p.sku, image: Array.isArray(p.image) ? p.image.slice(0, 2) : p.image, offers: [p.offers].flat().filter(Boolean).map(o => ({price:o.price, lowPrice:o.lowPrice, currency:o.priceCurrency, availability:o.availability})), description: p.description?.slice(0, 100) })), priceHints: [...html.matchAll(/.{0,30}(?:"price"|"fullPrice"|"priceValue"|product:price:amount).{0,110}/g)].slice(0, 5).map((m) => m[0]) }));
  } catch (error) { console.log(JSON.stringify({ url, error: error.message })); }
}));
