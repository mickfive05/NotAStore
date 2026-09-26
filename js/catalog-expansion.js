// Packshot e prezzi delle schede italiane dei produttori, verificati il 24/09/2026.
const ikea = (id, name, price, category, slug, image, specs) => ({
  id, name, brand: 'IKEA', price, category, specs, variants: {},
  images: [`https://www.ikea.com/it/it/images/products/${image}_s5.jpg`],
  priceSource: { url: `https://www.ikea.com/it/it/p/${slug}/`, checkedAt: '2026-09-24', kind: 'official' },
});
const sonos = (id, name, price, slug, photos, specs) => {
  const variantImages = Object.fromEntries(Object.entries(photos).map(([color, file]) => [color, `https://media.sonos.com/images/znqtjj88/production/${file}.png`]));
  return { id, name: `${name} Nero`, brand: 'Sonos', price, category: 'audio', specs,
    variants: { Colore: Object.keys(photos) }, variantImages, images: [variantImages.Nero],
    priceSource: { url: `https://www.sonos.com/it-it/shop/${slug}`, checkedAt: '2026-09-24', kind: 'official' } };
};
export const EXTRA_PRODUCTS = [
  ikea('ar-06', 'FADO lampada da tavolo bianco 25 cm', 19.95, 'arredamento', 'fado-lampada-da-tavolo-bianco-80096372', 'fado-lampada-da-tavolo-bianco__0606976_pe682645', { Modello: 'FADO', Diametro: '25 cm', Colore: 'Bianco' }),
  ikea('ar-07', 'RÅSKOG carrello bianco 35×45×77 cm', 39.95, 'arredamento', 'raskog-carrello-bianco-30586783', 'raskog-carrello-bianco__1366882_pe957173', { Modello: 'RÅSKOG', Dimensioni: '35×45×77 cm', Colore: 'Bianco' }),
  ikea('ar-08', 'LACK tavolino bianco 55×55 cm', 9.95, 'arredamento', 'lack-tavolino-bianco-30449908', 'lack-tavolino-bianco__0702210_pe724345', { Modello: 'LACK', Dimensioni: '55×55 cm', Colore: 'Bianco' }),
  ikea('au-09', 'VAPPEBY speaker Bluetooth nero Gen 3', 55, 'audio', 'vappeby-cassa-bluetooth-r-nero-gen-3-30517365', 'vappeby-cassa-bluetooth-r-nero-gen-3__1218129_pe913141', { Modello: 'VAPPEBY Gen 3', Dimensioni: '20×20 cm', Connessione: 'Bluetooth', Colore: 'Nero' }),
  ikea('el-06', 'FÖRNUFTIG purificatore d’aria bianco', 59.95, 'elettrodomestici', 'foernuftig-purificatore-daria-bianco-50461937', 'foernuftig-purificatore-daria-bianco__0832294_pe777645', { Modello: 'FÖRNUFTIG', Dimensioni: '31×45 cm', Colore: 'Bianco' }),
  sonos('au-10', 'Era 100', 229, 'era-100', { Nero: 'c730c924a2d9fe4d3a3b9b9cb7432b7afd0ab392-2000x2000', Bianco: '03b89d4e259ddfe3388083e943059f0436468258-2000x2000' }, { Modello: 'Era 100', Tipologia: 'Speaker stereo' }),
  sonos('au-11', 'Roam 2', 199, 'roam-2', { Nero: '110a711ffb1d9ec82743734ef7477a7d400c8d11-2400x2400', Bianco: '242fd959439d1f77bb579464d83d902a315c4b05-2400x2400', Rosso: '69f7ec0374ba9ec347117aab601e79858d92e47d-2400x2400', Blu: '80940def711d17d1cdf1bfbb982456a092e9efd2-2400x2400', Verde: '7ca68ecc13421e462066bdfa19d6bf8ae64979ab-2400x2400' }, { Modello: 'Roam 2', Tipologia: 'Speaker portatile' }),
  sonos('au-12', 'Move 2', 499, 'move-2', { Nero: '87e816c0a480d8a27c1d379e02e84d84f6db5041-1280x1280', Bianco: '416da7c70b53d5c7c8a2c1ff310aa422957bf792-1280x1280', Verde: '3173798d7f8e3368ff816234c17f041e6bb263bf-1280x1280' }, { Modello: 'Move 2', Tipologia: 'Speaker portatile stereo' }),
  sonos('au-13', 'Beam (Gen 2)', 499, 'beam', { Nero: 'e12ba440b45fc67e970049734783d6fb0b6b20d1-2480x2480', Bianco: '2a3d37a3f4f5fc46621daef644d97c5a13e27940-2480x2480' }, { Modello: 'Beam', Generazione: '2', Tipologia: 'Soundbar' }),
  sonos('au-14', 'Ray', 229, 'ray', { Nero: '66e3cfe30d0b259876278d17a526295d43f044e5-2480x2480', Bianco: 'ad60e597f8b789b7b9cfbc4976f7a3dca659cc26-2480x2480' }, { Modello: 'Ray', Tipologia: 'Soundbar' }),
  sonos('au-15', 'Sub Mini', 499, 'sub-mini', { Nero: '172f10868dcaeef227f3e634fbdc75aa62e382f2-1671x1672', Bianco: 'b6683979d6b07e5e42d212a60bb7d3f8a2cf2ca6-1671x1671' }, { Modello: 'Sub Mini', Tipologia: 'Subwoofer', Compatibilità: 'Sistema Sonos' }),
].map(p => {
  const officialImages = p.variantImages ? Object.values(p.variantImages) : p.images;
  const images = officialImages.map((url, i) => `images/products/official-${p.id}-${i}.${url.includes('.jpg') ? 'jpg' : 'png'}`);
  const variantImages = p.variantImages ? Object.fromEntries(Object.keys(p.variantImages).map((color, i) => [color, images[i]])) : undefined;
  return { ...p, officialImages, images, variantImages, listPrice: p.price, rating: 0, reviews: 0, sold: 0, stock: 20, badge: 'Novità', prime: false, imageStyle: 'packshot', desc: `${p.brand} ${p.name}. ${Object.entries(p.specs).map(([k,v]) => `${k}: ${v}`).join('. ')}.` };
});
