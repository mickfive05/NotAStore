import { cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
import { CATALOG, CATEGORIES } from '../js/data.js';

const output = new URL('../dist/', import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const publicHtml = (await readFile(new URL('../index.html', import.meta.url), 'utf8')).replace('<head>', '<head>\n<base href="/">').replaceAll('https://notastore.shop', 'https://www.notastore.shop');
await writeFile(new URL('index.html', output), publicHtml);

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[character]);
const seoPages = [
  { path: '/', title: 'NotAStore — Shopping Simulator online gratuito', description: 'Simulatore di shopping online gratuito: esplora prodotti, crea il carrello e completa acquisti virtuali senza spendere denaro reale.', heading: 'Shopping simulator online, senza acquisti reali', copy: 'NotAStore ricrea l’esperienza di un e-commerce usando esclusivamente saldo, carte e ordini virtuali. Esplora il catalogo oppure scopri come il simulatore aiuta a mettere una pausa tra desiderio e acquisto.' },
  { path: '/simulatore-di-shopping', title: 'Simulatore di shopping: come funziona NotAStore', description: 'Cos’è un simulatore di shopping? Scopri come provare prodotti, carrello e ordini virtuali senza effettuare pagamenti o acquisti reali.', heading: 'Simulatore di shopping: desiderare senza comprare', copy: 'NotAStore è uno shopping simulator gratuito che riproduce catalogo, configurazioni, carrello, saldo e ordini. Nessun prodotto viene venduto e nessun pagamento reale viene elaborato. È uno strumento digitale pensato per rallentare gli acquisti impulsivi e osservare le proprie scelte.' },
  { path: '/prodotti', title: 'Catalogo del simulatore di shopping — NotAStore', description: 'Esplora il catalogo virtuale di NotAStore e configura tecnologia, moda e casa nel simulatore di shopping senza pagamenti reali.', heading: 'Catalogo virtuale NotAStore', copy: 'Scopri prodotti e configurazioni nel catalogo del simulatore. Prezzi, saldo, ordini e consegne appartengono esclusivamente alla simulazione.' },
  { path: '/offerte', title: 'Offerte virtuali del simulatore — NotAStore', description: 'Scopri le offerte virtuali di NotAStore e simula lo shopping online senza acquistare prodotti o spendere denaro reale.', heading: 'Offerte virtuali', copy: 'Prova l’esperienza delle offerte online nel simulatore NotAStore. Gli sconti e gli ordini mostrati non hanno valore economico reale.' },
  { path: '/community', title: 'Spesa virtuale della community — NotAStore', description: 'Segui il contatore pubblico degli acquisti simulati dalla community NotAStore. Tutti gli importi sono virtuali.', heading: 'La spesa virtuale della community', copy: 'Ogni ordine simulato contribuisce al contatore collettivo di NotAStore. Nessun importo corrisponde a denaro realmente speso.' },
  { path: '/chi-siamo', title: 'Chi siamo — il progetto NotAStore', description: 'La storia di NotAStore, il simulatore di shopping italiano nato per creare una pausa tra impulso e acquisto.', heading: 'Il progetto NotAStore', copy: 'NotAStore nasce da Michael, nelle Marche, ispirandosi a un’idea diventata virale in Asia: vivere il percorso dello shopping senza arrivare a una spesa reale.' },
];

for (const category of CATEGORIES) seoPages.push({
  path: `/categoria/${category.slug}`,
  title: `${category.name} nel simulatore di shopping — NotAStore`,
  description: `Esplora ${category.name.toLowerCase()} nel catalogo virtuale NotAStore. Configura e simula gli ordini senza pagamenti reali.`,
  heading: `${category.name}: catalogo virtuale`,
  copy: `Scopri la selezione ${category.name.toLowerCase()} di NotAStore. Tutti i prodotti, i prezzi e gli ordini fanno parte del simulatore di shopping.`,
});

for (const product of CATALOG) seoPages.push({
  path: `/prodotto/${encodeURIComponent(product.id)}`,
  title: `${product.name} — simulatore NotAStore`,
  description: `${product.desc || `Configura ${product.name} nel simulatore di shopping NotAStore.`} Nessun acquisto o pagamento reale.`,
  heading: product.name,
  copy: `${product.desc || ''} Configura le varianti e aggiungi il prodotto a un ordine esclusivamente virtuale.`,
});

function prerender(page) {
  const canonical = `https://www.notastore.shop${page.path}`;
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description).slice(0, 300);
  const content = `<article class="seo-prerender wrap"><p>NOTASTORE · SHOPPING SIMULATOR</p><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.copy)}</p><nav aria-label="Approfondimenti"><a href="/simulatore-di-shopping">Come funziona il simulatore di shopping</a> · <a href="/prodotti">Esplora il catalogo virtuale</a> · <a href="/chi-siamo">Scopri il progetto</a></nav></article>`;
  const structured = JSON.stringify({ '@context':'https://schema.org', '@type':'WebPage', name:page.title, description:page.description, url:canonical, isPartOf:{ '@type':'WebSite', name:'NotAStore', url:'https://www.notastore.shop/' }, inLanguage:'it-IT' }).replace(/</g, '\\u003c');
  return publicHtml
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${description}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonical}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${title}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${description}">`)
    .replace('</head>', `<script type="application/ld+json">${structured}</script>\n</head>`)
    .replace('<main id="app"></main>', `<main id="app">${content}</main>`);
}

for (const page of seoPages) {
  if (page.path === '/') { await writeFile(new URL('index.html', output), prerender(page)); continue; }
  const directory = new URL(`.${page.path}/`, output);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), prerender(page));
}
for (const directory of ['css', 'images', 'js']) {
  await cp(new URL(`../${directory}/`, import.meta.url), new URL(`${directory}/`, output), { recursive: true });
}
for (const file of ['manifest.webmanifest', 'robots.txt', 'sitemap.xml', '_redirects']) {
  await cp(new URL(`../${file}`, import.meta.url), new URL(file, output));
}
await mkdir(new URL('css/', output), { recursive: true });
await mkdir(new URL('images/', output), { recursive: true });
await cp(new URL('../css/coming-soon.css', import.meta.url), new URL('css/coming-soon.css', output));
await cp(new URL('../images/notastore-logo.png', import.meta.url), new URL('images/notastore-logo.png', output));
await cp(new URL('../images/notastore-mark.svg', import.meta.url), new URL('images/notastore-mark.svg', output));

await cp(new URL('../accesso.html', import.meta.url), new URL('accesso.html', output));
await mkdir(new URL('admin/', output), { recursive: true });
await cp(new URL('../admin-gateway.html', import.meta.url), new URL('admin/index.html', output));
await mkdir(new URL('amministrazione/', output), { recursive: true });
await cp(new URL('../admin-console.html', import.meta.url), new URL('amministrazione/index.html', output));

const preview = new URL('preview/', output);
await mkdir(preview, { recursive: true });
await cp(new URL('../index.html', import.meta.url), new URL('index.html', preview));
for (const directory of ['css', 'images', 'js']) {
  await cp(new URL(`../${directory}/`, import.meta.url), new URL(`${directory}/`, preview), { recursive: true });
}
for (const file of ['manifest.webmanifest', 'robots.txt', 'sitemap.xml', '_redirects']) {
  await cp(new URL(`../${file}`, import.meta.url), new URL(file, preview));
}

console.log('Build Cloudflare Pages pronto in dist/');
