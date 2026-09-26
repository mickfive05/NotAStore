// Italian VAT-inclusive prices: explicit configurations, never inferred upgrades.
export function updateCatalog(products) {
  const get = (id) => products.find((p) => p.id === id);
  const exactProduct = (id, details, source, kind = 'current') => {
    const product = get(id);
    Object.assign(product, details);
    product.priceSource = { url: source, checkedAt: '2026-09-22', kind };
    return product;
  };
  const setPrice = (p, prices, dimension, source, kind = 'current') => {
    p.variantPrices = { [dimension]: prices };
    p.variants[dimension] = Object.keys(prices);
    p.price = Object.values(prices)[0]; p.listPrice = p.price;
    p.priceSource = { url: source, checkedAt: '2026-09-22', kind };
  };
  const apple = 'https://www.apple.com/it/shop/';
  const colors17 = { 'Blu profondo': 'blue', 'Arancione cosmico': 'orange', Argento: 'silver' };
  const max = get('sp-01');
  Object.assign(max, {
    name: 'iPhone 17 Pro Max 256 GB Blu profondo', model: 'iPhone 17 Pro Max', family: 'iphone-17', catalogHidden: true,
    desc: 'Chip A19 Pro, display Super Retina XDR da 6,9” con ProMotion e tre fotocamere Fusion da 48 MP. Design unibody in alluminio, zoom di qualità ottica 8x e fotocamera frontale Center Stage da 18 MP.',
    variants: { Colore: Object.keys(colors17) }, variantImages: Object.fromEntries(Object.entries(colors17).map(([color, slug]) => [color, `images/products/iphone-17-promax-${slug}.png`])), images: ['images/products/iphone-17-promax-blue.png'],
    specs: { Display: '6,9” Super Retina XDR, ProMotion 120 Hz', Processore: 'Apple A19 Pro', Memoria: '256 GB', Fotocamera: '3 × Fusion 48 MP, zoom di qualità ottica 8x', Batteria: 'Fino a 37 ore di riproduzione video', Connettività: '5G, Wi-Fi 7, Bluetooth 6', 'Sistema operativo': 'iOS', Materiale: 'Alluminio unibody' },
  });
  const reference17 = 'https://www.apple.com/it/iphone/compare/?modelList=iphone-17-pro,iphone-17-pro-max';
  setPrice(max, { '256 GB': 1489, '512 GB': 1739, '1 TB': 1989, '2 TB': 2489 }, 'Memoria', reference17, 'last-official-list');
  const pro = { ...max, id: 'sp-17p', model: 'iPhone 17 Pro', name: 'iPhone 17 Pro 256 GB Blu profondo', variants: { Colore: Object.keys(colors17) }, variantImages: Object.fromEntries(Object.entries(colors17).map(([color, slug]) => [color, `images/products/iphone-17-pro-${slug}.png`])), images: ['images/products/iphone-17-pro-blue.png'], specs: { ...max.specs, Display: '6,3” Super Retina XDR, ProMotion 120 Hz', Batteria: 'Fino a 31 ore di riproduzione video' }, desc: max.desc.replace('6,9', '6,3') };
  setPrice(pro, { '256 GB': 1339, '512 GB': 1589, '1 TB': 1839 }, 'Memoria', reference17, 'last-official-list'); products.push(pro);
  Object.assign(get('sp-05'), { model: 'iPhone 17', family: 'iphone-17', catalogName: 'iPhone 17 · 17 Pro · 17 Pro Max' });
  setPrice(get('sp-05'), { '256 GB': 1129, '512 GB': 1379 }, 'Memoria', apple + 'buy-iphone/iphone-17');
  setPrice(get('sp-air'), { '256 GB': 1339, '512 GB': 1589, '1 TB': 2089 }, 'Memoria', apple + 'buy-iphone/iphone-air');
  Object.assign(get('sp-18p'), { model: 'iPhone 18 Pro', family: 'iphone-18', catalogName: 'iPhone 18 Pro · 18 Pro Max' });
  Object.assign(get('sp-18pm'), { model: 'iPhone 18 Pro Max', family: 'iphone-18', catalogHidden: true });
  setPrice(get('sp-18p'), { '256 GB': 1489, '512 GB': 1739, '1 TB': 2239, '2 TB': 2989 }, 'Memoria', apple + 'buy-iphone/iphone-18-pro');
  setPrice(get('sp-18pm'), { '256 GB': 1639, '512 GB': 1889, '1 TB': 2389, '2 TB': 3139 }, 'Memoria', apple + 'buy-iphone/iphone-18-pro');
  setPrice(get('sp-duo'), { '256 GB': 2369, '512 GB': 2619, '1 TB': 3119, '2 TB': 3869 }, 'Memoria', apple + 'buy-iphone/iphone-duo');
  setPrice(get('sp-02'), { '256 GB': 1499, '512 GB': 1699, '1 TB': 1999 }, 'Memoria', 'https://news.samsung.com/it/samsung-presenta-la-serie-galaxy-s26-lo-smartphone-galaxy-ai-piu-intuitivo-di-sempre', 'official-list');
  Object.assign(get('sp-03'), { name: 'Pixel 11 Pro 256 GB Nero ossidiana', variants: { Memoria: [] } });
  setPrice(get('sp-03'), { '256 GB': 1199, '512 GB': 1329, '1 TB': 1589 }, 'Memoria', 'https://store.google.com/it/config/pixel_11_pro?hl=it');
  for (const [id, price, page] of [['au-02', 249, 'airpods-pro-3'], ['au-06', 149, 'airpods-5'], ['au-07', 169, 'airpods-5'], ['au-08', 579, 'airpods-max']]) {
    Object.assign(get(id), { price, listPrice: price, priceSource: { url: apple + 'buy-airpods/' + page, checkedAt: '2026-09-21', kind: 'current' } });
  }
  get('au-06').specs['Cancellazione rumore'] = 'Cancellazione attiva, audio adattivo e modalità Trasparenza';
  get('au-07').specs['Cancellazione rumore'] = 'Cancellazione attiva, audio adattivo e modalità Trasparenza';
  get('au-06').specs.Autonomia = 'Fino a 4 ore con cancellazione attiva';
  get('au-07').specs.Autonomia = 'Fino a 5 ore con cancellazione attiva';
  for (const [id, model, colors, prices, defaultColor] of [
    ['pc-06', 'neo', { Argento: 'silver', 'Rosa pastello': 'blush', 'Giallo agrume': 'citrus', Indaco: 'indigo' }, { '8 GB / 256 GB': 799, '8 GB / 512 GB': 899 }, 'silver'],
    ['pc-05', 'air', { Mezzanotte: 'midnight', Celeste: 'skyblue', Argento: 'silver', Galassia: 'starlight' }, { '16 GB / 512 GB': 1449, '24 GB / 512 GB': 1669, '16 GB / 1 TB': 1779, '24 GB / 1 TB': 1999 }, 'midnight'],
    ['pc-01', 'pro', { 'Nero siderale': 'spaceblack', Argento: 'silver' }, { '24 GB / 1 TB': 3499, '48 GB / 1 TB': 4159 }, 'spaceblack'],
  ]) {
    const p = get(id);
    p.variantImages = Object.fromEntries(Object.entries(colors).map(([color, slug]) => [color, `images/products/macbook-${model}-${slug}-clean.png`]));
    p.images = [`images/products/macbook-${model}-${defaultColor}-clean.png`]; p.imageStyle = 'packshot';
    setPrice(p, prices, 'Configurazione', apple + `buy-mac/macbook-${model}`);
  }
  get('pc-01').specs.CPU = 'Apple M5 Pro, CPU 18-core';
  get('pc-01').desc = 'MacBook Pro 16” con chip M5 Pro, CPU 18-core, GPU 20-core e display Liquid Retina XDR. Finiture Nero siderale e Argento.';
  get('pc-06').specs.Tastiera = 'Magic Keyboard; Touch ID nella configurazione 512 GB';

  // Ambiguous catalogue entries are replaced with traceable, real retail models.
  exactProduct('pc-02', {
    name: 'Dell XPS 15 9530 i7 32 GB 1 TB RTX 4060 OLED', price: 1696, listPrice: 1696,
    variants: { Configurazione: ['32 GB / 1 TB'] }, variantPrices: { Configurazione: { '32 GB / 1 TB': 1696 } },
    desc: 'Dell XPS 15 9530 con Intel Core i7-13700H, 32 GB di RAM, SSD da 1 TB, GeForce RTX 4060 e display OLED 3,5K da 15,6 pollici.',
    specs: { CPU: 'Intel Core i7-13700H', GPU: 'NVIDIA GeForce RTX 4060 8 GB', RAM: '32 GB', SSD: '1 TB', Display: '15,6” OLED 3,5K touch', Porte: '2× Thunderbolt 4, USB-C, SD', Peso: '1,92 kg' },
  }, 'https://www.dell.com/it-it/shop/notebook-dell/notebook-xps-15/spd/xps-15-9530-laptop', 'retail-reference');
  exactProduct('pc-03', {
    name: 'Lenovo ThinkPad X1 Carbon Gen 13 Ultra 7 16 GB 512 GB', price: 1988.91, listPrice: 1988.91,
    variants: { Configurazione: ['16 GB / 512 GB'] }, variantPrices: { Configurazione: { '16 GB / 512 GB': 1988.91 } },
    desc: 'ThinkPad X1 Carbon Gen 13 con Intel Core Ultra 7 255U, 16 GB di RAM, SSD da 512 GB e display da 14 pollici in uno chassis da circa un chilogrammo.',
    specs: { CPU: 'Intel Core Ultra 7 255U', GPU: 'Intel Graphics', RAM: '16 GB', SSD: '512 GB', Display: '14” WUXGA', Connettività: 'Wi-Fi 7 e Bluetooth', Peso: 'Da 0,99 kg' },
  }, 'https://www.epto.it/lenovo-thinkpad-x1-carbon-gen-13-intel-core-ultra-255u-14-wuxga-16gb-512gb-p-21NX00AJIX.html');
  exactProduct('pc-04', {
    name: 'ASUS ROG Zephyrus G16 GU605CW RTX 5080 32 GB 1 TB', price: 3529, listPrice: 4199,
    variants: { Configurazione: ['32 GB / 1 TB'] }, variantPrices: { Configurazione: { '32 GB / 1 TB': 3529 } },
    desc: 'ROG Zephyrus G16 GU605CW con display OLED 2,5K a 240 Hz, 32 GB di RAM, SSD da 1 TB e GeForce RTX 5080 Laptop GPU.',
    specs: { CPU: 'Intel Core Ultra 9', GPU: 'NVIDIA GeForce RTX 5080 Laptop', RAM: '32 GB', SSD: '1 TB', Display: '16” OLED 2,5K 240 Hz', Modello: 'GU605CW-QR101W' },
  }, 'https://www.mediaworld.it/it/product/_asus-rog-zephyrus-g16-gu605cw-qr101w-16-pollici-processore-intel-core-ultra-9-32-gb-1000-gb-ssd-nero-145397966.html');

  const xiaomi = exactProduct('sp-04', {
    name: 'Xiaomi 17 Ultra 16 GB 512 GB Nero', price: 1499.90, listPrice: 1499.90,
    variants: { Memoria: ['512 GB', '1 TB'] },
    desc: 'Xiaomi 17 Ultra con Snapdragon 8 Elite Gen 5, display OLED HyperRGB da 6,9 pollici e sistema fotografico Leica con teleobiettivo da 200 MP.',
    specs: { Display: '6,9” OLED HyperRGB 1–120 Hz', Processore: 'Snapdragon 8 Elite Gen 5', RAM: '16 GB', Memoria: '512 GB', Fotocamera: 'Leica: 50 MP principale, 200 MP tele, 50 MP ultra-grandangolare', Batteria: '6000 mAh', 'Sistema operativo': 'Xiaomi HyperOS 3' },
  }, 'https://www.mi.com/it/product/xiaomi-17-ultra/specs/', 'official-list');
  setPrice(xiaomi, { '512 GB': 1499.90, '1 TB': 1699.90 }, 'Memoria', 'https://www.mi.com/it/product/xiaomi-17-ultra/buy/', 'official-list');

  exactProduct('vg-01', {
    name: 'Marvel’s Spider-Man 2 — PS5', price: 79.99, listPrice: 79.99,
    desc: 'Avventura per PS5 con Peter Parker e Miles Morales, New York ampliata e supporto alle funzioni di PS5 Pro.',
  }, 'https://store.playstation.com/it-it/concept/10002456', 'official-list');
  exactProduct('vg-02', {
    name: 'The Legend of Zelda: Tears of the Kingdom — Switch 2 Edition', price: 79.99, listPrice: 79.99,
    desc: 'Edizione Nintendo Switch 2 con risoluzione e frame rate migliorati, HDR e supporto a ZELDA NOTES.',
  }, 'https://www.nintendo.com/it-it/Giochi/Nintendo-Switch-2-Edition/The-Legend-of-Zelda-Tears-of-the-Kingdom-Nintendo-Switch-2-Edition-2787249.html', 'official-list');

  for (const [id, price, listPrice, source] of [
    ['au-05', 249.90, 249.90, 'https://www.sennheiser-hearing.com/it-IT/p/momentum-4-wireless/'],
    ['sc-03', 250, 250, 'https://www.newbalance.it/it/pd/made-in-usa-990v6/U990V6-43045.html'],
    ['pr-02', 176, 176, 'https://www.chanel.com/it/profumi/p/107180/bleu-de-chanel-parfum-spray/'],
    ['sk-03', 195, 195, 'https://www.skinceuticals.it/ce-ferulic-siero-antiossidante-vitamina-c/635494363206.html'],
    ['el-01', 549, 549, 'https://www.dyson.it/cura-dei-capelli/multistyler/airwrap-id'],
    ['el-03', 949.90, 1149.90, 'https://www.delonghi.com/it-it/eletta-explore-macchina-automatica-per-caffe-in-chicchi-ecam450-86-t/p/ECAM450.86.T'],
  ]) exactProduct(id, { price, listPrice }, source);
  exactProduct('ar-01', {
    name: 'Kartell Plastics Duo Divano 2 posti Orsetto Blu', price: 2994, listPrice: 2994,
    desc: 'Divano a due posti della collezione Plastics Duo di Kartell, rivestito in tessuto Orsetto e composto da moduli imbottiti dalle linee essenziali.',
    specs: { Collezione: 'Plastics Duo', Tipologia: 'Divano 2 posti', Rivestimento: 'Tessuto Orsetto', Colore: 'Blu', Designer: 'Piero Lissoni' },
  }, 'https://www.kartell.com/it/it/ktit/shop/product/plastics-duo/');
  exactProduct('ar-04', {
    name: 'IKEA BILLY Libreria 240×28×106 cm effetto rovere', price: 135, listPrice: 135,
    desc: 'Combinazione BILLY larga 240 cm con tre moduli effetto rovere, ripiani regolabili e profondità di 28 cm.',
    specs: { Serie: 'BILLY', Larghezza: '240 cm', Profondità: '28 cm', Altezza: '106 cm', Finitura: 'Effetto rovere' },
  }, 'https://www.ikea.com/it/it/cat/librerie-billy-58288/');
}
