import { updateCatalog } from './catalog-updates.js?v=20260922c';
import { EXTRA_PRODUCTS } from './catalog-expansion.js';
import { currentLocale } from './i18n.js?v=20260925i18n2';

export const CATEGORIES = [
  { slug: 'smartphone', name: 'Smartphone', group: 'Elettronica', icon: '📱' },
  { slug: 'computer', name: 'Computer & Notebook', group: 'Elettronica', icon: '💻' },
  { slug: 'audio', name: 'Cuffie & Audio', group: 'Elettronica', icon: '🎧' },
  { slug: 'smartwatch', name: 'Smartwatch', group: 'Elettronica', icon: '⌚' },
  { slug: 'tv', name: 'TV & Home Cinema', group: 'Elettronica', icon: '📺' },
  { slug: 'console', name: 'Console', group: 'Gaming', icon: '🎮' },
  { slug: 'videogiochi', name: 'Videogiochi', group: 'Gaming', icon: '🕹️' },
  { slug: 'scarpe', name: 'Sneakers & Scarpe', group: 'Moda', icon: '👟' },
  { slug: 'abbigliamento', name: 'Abbigliamento', group: 'Moda', icon: '🧥' },
  { slug: 'occhiali', name: 'Occhiali & Sole', group: 'Moda', icon: '🕶️' },
  { slug: 'profumi', name: 'Profumi', group: 'Beauty', icon: '🧴' },
  { slug: 'skincare', name: 'Skincare', group: 'Beauty', icon: '✨' },
  { slug: 'elettrodomestici', name: 'Piccoli Elettrodomestici', group: 'Casa', icon: '🍳' },
  { slug: 'arredamento', name: 'Arredamento & Design', group: 'Casa', icon: '🛋️' },
  { slug: 'auto', name: 'Auto & Moto Accessori', group: 'Auto', icon: '🚗' },
  { slug: 'sport', name: 'Sport & Fitness', group: 'Sport', icon: '🏋️' },
];



export const PRODUCTS = [
  // ---------- SMARTPHONE ----------
  { id: 'sp-01', brand: 'Apple', name: 'iPhone 17 Pro Max 512 GB Titanio Nero', category: 'smartphone', price: 1699, listPrice: 1849, rating: 4.9, reviews: 2841, stock: 12, sold: 1830, badge: 'Novità', desc: 'Chip A19 Pro, display ProMotion 6,9", sistema di fotocamere a 48 MP con teleobiettivo 5x e registrazione ProRes. Scocca in titanio di grado aerospaziale.', fast: true },
  { id: 'sp-02', brand: 'Samsung', name: 'Galaxy S26 Ultra 5G 256 GB Cobalt Violet', category: 'smartphone', price: 1399, listPrice: 1499, rating: 4.8, reviews: 1976, stock: 23, sold: 1420, badge: 'Best seller', desc: 'Display Dynamic AMOLED 2X da 6,9", S Pen integrata, fotocamera da 200 MP e Privacy Display. Configurazioni ufficiali con 12 o 16 GB di RAM.', fast: true, images:['images/products/variant-sp-02-cobalt-violet.jpg'], variants:{ Memoria:['256 GB','512 GB','1 TB'], Colore:['Cobalt Violet','Sky Blue','Nero','Bianco','Silver Shadow','Pink Gold'] }, variantImages:{'Cobalt Violet':'images/products/variant-sp-02-cobalt-violet.jpg','Sky Blue':'images/products/variant-sp-02-sky-blue.jpg','Nero':'images/products/variant-sp-02-black.jpg','Bianco':'images/products/variant-sp-02-white.jpg','Silver Shadow':'images/products/variant-sp-02-silver-shadow.jpg','Pink Gold':'images/products/variant-sp-02-pink-gold.jpg'}, variantPrices:{Memoria:{'256 GB':1399,'512 GB':1499,'1 TB':1699}}, specs:{Display:'6,9” Dynamic AMOLED 2X, QHD+, 120 Hz',Processore:'Snapdragon di fascia flagship per Galaxy',Memoria:'256 GB',RAM:'12 GB (16 GB sulla versione 1 TB)',Fotocamera:'200 MP, zoom ottico 5x',Batteria:'Ricarica cablata 45 W',Connettività:'5G, Wi‑Fi 7, Bluetooth', 'Sistema operativo':'Android con One UI'} },
  { id: 'sp-03', brand: 'Google', name: 'Pixel 11 Pro 128 GB Obsidian', category: 'smartphone', price: 899, listPrice: 1099, rating: 4.7, reviews: 812, stock: 31, sold: 640, desc: 'Tensor G6, camera computazionale Gemini e 7 anni di aggiornamenti garantiti. Display LTPO 6,3" a 120 Hz.', fast: false, imageScale: 1.24 },
  { id: 'sp-04', brand: 'Xiaomi', name: 'Xiaomi 16 Ultra 512 GB Ceramic White', category: 'smartphone', price: 999, listPrice: 1199, rating: 4.6, reviews: 604, stock: 18, sold: 415, desc: 'Ottiche Leica Summilux, sensore da 1 pollice, ricarica HyperCharge 120W e display 2K AMOLED.', fast: true },
  { id: 'sp-05', brand: 'Apple', name: 'iPhone 17 256 GB Azzurro nebbia', category: 'smartphone', price: 1049, listPrice: 1149, rating: 4.8, reviews: 1503, stock: 40, sold: 1290, desc: 'Display Super Retina XDR da 6,3", chip A19 e sistema Dual Fusion da 48 MP. Immagini e finiture corrispondono alle opzioni ufficiali.', fast: true, images:['images/products/variant-sp-05-mistblue.png'], variants:{Memoria:['256 GB','512 GB'],Colore:['Azzurro nebbia','Lavanda','Salvia','Bianco','Nero']}, variantImages:{'Azzurro nebbia':'images/products/variant-sp-05-mistblue.png',Lavanda:'images/products/variant-sp-05-lavender.png',Salvia:'images/products/variant-sp-05-sage.png',Bianco:'images/products/variant-sp-05-white.png',Nero:'images/products/variant-sp-05-black.png'}, variantPrices:{Memoria:{'256 GB':1049,'512 GB':1299}}, specs:{Display:'6,3” Super Retina XDR con ProMotion',Processore:'Apple A19',Memoria:'256 GB',Fotocamera:'Dual Fusion 48 MP',Batteria:'Riproduzione video fino a 30 ore',Connettività:'5G, Wi‑Fi 7, Bluetooth 6', 'Sistema operativo':'iOS 26'} },
  { id: 'sp-air', brand: 'Apple', name: 'iPhone Air 256 GB Celeste', category: 'smartphone', price: 1339, listPrice: 1339, rating: 4.8, reviews: 684, stock: 32, sold: 590, badge: 'Novità', niche: true, fast: true, desc: 'iPhone ultrasottile con display Super Retina XDR da 6,5", chip A19 Pro e autonomia fino a 27 ore di riproduzione video.', images:['images/products/variant-sp-air-skyblue.png'], variants:{Memoria:['256 GB','512 GB','1 TB'],Colore:['Celeste','Oro chiaro','Bianco nuvola','Nero siderale']}, variantImages:{Celeste:'images/products/variant-sp-air-skyblue.png','Oro chiaro':'images/products/variant-sp-air-lightgold.png','Bianco nuvola':'images/products/variant-sp-air-cloudwhite.png','Nero siderale':'images/products/variant-sp-air-spaceblack.png'}, variantPrices:{Memoria:{'256 GB':1339,'512 GB':1589,'1 TB':1839}}, specs:{Display:'6,5” Super Retina XDR con ProMotion',Processore:'Apple A19 Pro',Memoria:'256 GB',Fotocamera:'Fusion 48 MP',Batteria:'Riproduzione video fino a 27 ore',Connettività:'5G, Wi‑Fi 7, Bluetooth 6','Sistema operativo':'iOS 26'} },
  { id: 'sp-18p', brand: 'Apple', name: 'iPhone 18 Pro 256 GB Borgogna', category: 'smartphone', price: 1489, listPrice: 1489, rating: 4.9, reviews: 218, stock: 34, sold: 180, badge: 'Appena uscito', fast: true, desc: 'Display Super Retina XDR da 6,3 pollici, chip di nuova generazione e sistema Pro Fusion con fotocamera principale da 48 MP ad apertura variabile.', images: ['images/products/variant-sp-18pro-burgundy.png'], variants: { Memoria: ['256 GB','512 GB','1 TB','2 TB'], Colore: ['Borgogna','Ghiacciaio','Argento','Nero'] }, variantImages: { Borgogna:'images/products/variant-sp-18pro-burgundy.png', Ghiacciaio:'images/products/variant-sp-18pro-glacier.png', Argento:'images/products/variant-sp-18pro-silver.png', Nero:'images/products/variant-sp-18pro-black.png' } },
  { id: 'sp-18pm', brand: 'Apple', name: 'iPhone 18 Pro Max 256 GB Borgogna', category: 'smartphone', price: 1639, listPrice: 1639, rating: 4.9, reviews: 304, stock: 28, sold: 240, badge: 'Appena uscito', fast: true, desc: 'Display Super Retina XDR da 6,9 pollici, autonomia fino a 43 ore e sistema Pro Fusion da 48 MP con zoom di qualità ottica fino a 8x.', images: ['images/products/variant-sp-18promax-burgundy.png'], variants: { Memoria: ['256 GB','512 GB','1 TB','2 TB'], Colore: ['Borgogna','Ghiacciaio','Argento','Nero'] }, variantImages: { Borgogna:'images/products/variant-sp-18promax-burgundy.png', Ghiacciaio:'images/products/variant-sp-18promax-glacier.png', Argento:'images/products/variant-sp-18promax-silver.png', Nero:'images/products/variant-sp-18promax-black.png' } },
  { id: 'sp-duo', brand: 'Apple', name: 'iPhone Duo 256 GB Bianco stellare', category: 'smartphone', price: 2369, listPrice: 2369, rating: 4.9, reviews: 86, stock: 0, sold: 0, badge: 'Preordine · 23 ottobre', fast: false, releaseDate: '2026-10-23', desc: 'Il primo iPhone pieghevole: display interno Super Retina XDR da 7,6 pollici, display esterno da 5,4 pollici, chip A20 Pro e doppia fotocamera Fusion da 48 MP.', images: ['images/products/variant-sp-duo-white.png'], variants: { Memoria: ['256 GB','512 GB','1 TB','2 TB'], Colore: ['Bianco stellare','Cielo notturno'] }, variantImages: { 'Bianco stellare':'images/products/variant-sp-duo-white.png', 'Cielo notturno':'images/products/variant-sp-duo-night.png' } },

  // ---------- COMPUTER ----------
  { id: 'pc-01', brand: 'Apple', name: 'MacBook Pro 16" M5 Pro 24 GB 1 TB Nero siderale', category: 'computer', price: 2999, listPrice: 3249, rating: 4.9, reviews: 1244, stock: 8, sold: 520, badge: 'Novità', desc: 'Chip M5 Pro con CPU 14 core e GPU 20 core, Liquid Retina XDR 16", fino a 24 ore di autonomia e tre porte Thunderbolt 5.', fast: true, images:['images/products/variant-pc-pro-spaceblack.jpg'], variants:{Configurazione:['24 GB / 1 TB','48 GB / 1 TB','48 GB / 2 TB'],Colore:['Nero siderale','Argento']}, variantImages:{'Nero siderale':'images/products/variant-pc-pro-spaceblack.jpg',Argento:'images/products/variant-pc-pro-silver.jpg'}, variantPrices:{Configurazione:{'24 GB / 1 TB':2999,'48 GB / 1 TB':3449,'48 GB / 2 TB':3899}}, specs:{CPU:'Apple M5 Pro, CPU 14-core',GPU:'GPU 20-core',RAM:'24 GB',SSD:'1 TB',Display:'16,2” Liquid Retina XDR',Porte:'Thunderbolt 5, HDMI, MagSafe 3, SDXC',Connettività:'Wi‑Fi 7 e Bluetooth',Peso:'2,14 kg'} },
  { id: 'pc-02', brand: 'Dell', name: 'XPS 15 Ultra 7 OLED 32 GB RTX 4060', category: 'computer', price: 2299, listPrice: 2699, rating: 4.7, reviews: 388, stock: 11, sold: 230, desc: 'Notebook professionale con display OLED 3.5K, tastiera retroilluminata e chassis in alluminio CNC.', fast: false },
  { id: 'pc-03', brand: 'Lenovo', name: 'ThinkPad X1 Carbon Gen 13 i7 16 GB', category: 'computer', price: 1899, listPrice: 2199, rating: 4.8, reviews: 291, stock: 14, sold: 180, desc: 'Ultrabook business da 1,09 kg, certificazione MIL-STD, tastiera leggendaria e sicurezza ThinkShield.', fast: true },
  { id: 'pc-04', brand: 'Asus', name: 'ROG Zephyrus G16 RTX 5080 240 Hz', category: 'computer', price: 2799, listPrice: 3099, rating: 4.6, reviews: 176, stock: 7, sold: 120, badge: 'Gaming', desc: 'Laptop gaming con display mini-LED 240 Hz, vapor chamber e GPU RTX 5080 da 175W.', fast: false },
  { id: 'pc-05', brand: 'Apple', name: 'MacBook Air 13" M5 16 GB 512 GB Mezzanotte', category: 'computer', price: 1549, listPrice: 1649, rating: 4.9, reviews: 2110, stock: 26, sold: 1610, desc: 'Il notebook più venduto: chip M5, display Liquid Retina 13,6", telaio unibody fanless.', fast: true, images:['images/products/variant-pc-air-midnight.jpg'], variants:{Configurazione:['16 GB / 512 GB','24 GB / 512 GB','32 GB / 1 TB'],Colore:['Mezzanotte','Celeste','Argento','Galassia']}, variantImages:{Mezzanotte:'images/products/variant-pc-air-midnight.jpg',Celeste:'images/products/variant-pc-air-skyblue.jpg',Argento:'images/products/variant-pc-air-silver.jpg',Galassia:'images/products/variant-pc-air-starlight.jpg'}, variantPrices:{Configurazione:{'16 GB / 512 GB':1549,'24 GB / 512 GB':1779,'32 GB / 1 TB':2229}}, specs:{CPU:'Apple M5',GPU:'GPU integrata Apple',RAM:'16 GB',SSD:'512 GB',Display:'13,6” Liquid Retina',Porte:'2× Thunderbolt 4, MagSafe 3',Connettività:'Wi‑Fi 7 e Bluetooth',Peso:'1,24 kg'} },
  { id: 'pc-06', brand: 'Apple', name: 'MacBook Neo 13" A18 Pro 8 GB 256 GB Argento', category: 'computer', price: 699, listPrice: 699, rating: 4.7, reviews: 126, stock: 38, sold: 210, badge: 'Novità', niche: true, fast: true, desc: 'Il Mac più accessibile: chip A18 Pro, display Liquid Retina da 13 pollici e design leggero in quattro colori.', images:['images/products/variant-pc-neo-silver.jpg'], variants:{Configurazione:['8 GB / 256 GB','8 GB / 512 GB'],Colore:['Argento','Rosa pastello','Giallo agrume','Indaco']}, variantImages:{Argento:'images/products/variant-pc-neo-silver.jpg','Rosa pastello':'images/products/variant-pc-neo-blush.jpg','Giallo agrume':'images/products/variant-pc-neo-citrus.jpg',Indaco:'images/products/variant-pc-neo-indigo.jpg'}, variantPrices:{Configurazione:{'8 GB / 256 GB':699,'8 GB / 512 GB':949}}, specs:{CPU:'Apple A18 Pro',GPU:'GPU integrata Apple',RAM:'8 GB',SSD:'256 GB',Display:'13” Liquid Retina',Porte:'USB‑C e jack cuffie',Connettività:'Wi‑Fi 6E e Bluetooth',Peso:'1,23 kg'} },

  // ---------- AUDIO ----------
  { id: 'au-01', brand: 'Sony', name: 'WH-1000XM6 Cuffie Noise Cancelling', category: 'audio', price: 379, listPrice: 449, rating: 4.9, reviews: 3410, stock: 45, sold: 2980, badge: 'Top recensioni', desc: 'Cancellazione del rumore leader di categoria, 30 ore di autonomia, audio Hi-Res e ricarica rapida 3 minuti.', fast: true },
  { id: 'au-02', brand: 'Apple', name: 'AirPods Pro 3 con custodia MagSafe USB-C', category: 'audio', price: 249, listPrice: 279, rating: 4.8, reviews: 5210, stock: 60, sold: 4300, fast: true, images:['images/products/p-au-pro3.jpg'], desc: 'Audio spaziale personalizzato, cancellazione attiva adattiva e custodia con ricarica MagSafe.', specs:{Tipologia:'Auricolari in-ear',Connettività:'Bluetooth e USB-C',Autonomia:'Fino a 8 ore con ANC', 'Cancellazione rumore':'Cancellazione attiva adattiva'} },
  { id: 'au-03', brand: 'Bose', name: 'QuietComfort Ultra Earbuds Nero', category: 'audio', price: 299, listPrice: 349, rating: 4.7, reviews: 1188, stock: 33, sold: 720, desc: 'Immersive Audio Bose, cancellazione del rumore CustomTune e vestibilità stabile anche in allenamento.', fast: true },
  { id: 'au-04', brand: 'Sonos', name: 'Era 300 Diffusore stereo Wi-Fi', category: 'audio', price: 499, listPrice: 549, rating: 4.6, reviews: 402, stock: 20, sold: 260, desc: 'Audio spaziale a tre vie con sei driver, Wi-Fi 6 e integrazione multiroom con tutta la gamma Sonos.', fast: false },
  { id: 'au-05', brand: 'Sennheiser', name: 'Momentum 4 Wireless Grafite', category: 'audio', price: 329, listPrice: 379, rating: 4.7, reviews: 967, stock: 24, sold: 510, fast: false, desc: '60 ore di riproduzione, driver da 42 mm ad alta fedeltà e equalizzatore personalizzabile.' },
  { id: 'au-06', brand: 'Apple', name: 'AirPods 5 con custodia USB-C', category: 'audio', price: 149, listPrice: 149, rating: 4.7, reviews: 1480, stock: 75, sold: 920, badge: 'Novità', fast: true, images:['images/products/p-au-airpods5.jpg'], desc: 'AirPods di quinta generazione con audio spaziale personalizzato, comandi touch e custodia USB-C.', specs:{Tipologia:'Auricolari open-fit',Connettività:'Bluetooth e USB-C',Autonomia:'Fino a 6 ore', 'Cancellazione rumore':'Riduzione passiva'} },
  { id: 'au-07', brand: 'Apple', name: 'AirPods 5 con custodia di ricarica wireless', category: 'audio', price: 168.99, listPrice: 169, rating: 4.8, reviews: 960, stock: 61, sold: 610, fast: true, images:['images/products/p-au-airpods5-wireless.jpg'], desc: 'AirPods di quinta generazione con custodia compatibile con la ricarica wireless e USB-C.', specs:{Tipologia:'Auricolari open-fit',Connettività:'Bluetooth, USB-C e ricarica wireless',Autonomia:'Fino a 6 ore', 'Cancellazione rumore':'Riduzione passiva'} },
  { id: 'au-08', brand: 'Apple', name: 'AirPods Max 2 Mezzanotte', category: 'audio', price: 579, listPrice: 579, rating: 4.8, reviews: 782, stock: 24, sold: 370, badge: 'Novità', niche: true, fast: true, images:['images/products/variant-au-max2-midnight.jpg'], variants:{Colore:['Mezzanotte','Galassia','Blu','Viola','Arancione']}, variantImages:{Mezzanotte:'images/products/variant-au-max2-midnight.jpg',Galassia:'images/products/variant-au-max2-starlight.jpg',Blu:'images/products/variant-au-max2-blue.jpg',Viola:'images/products/variant-au-max2-purple.jpg',Arancione:'images/products/variant-au-max2-orange.jpg'}, desc: 'Cuffie over-ear Apple con audio ad alta fedeltà, cancellazione attiva del rumore e audio spaziale personalizzato.', specs:{Tipologia:'Cuffie over-ear',Connettività:'Bluetooth e USB-C',Autonomia:'Fino a 20 ore','Cancellazione rumore':'Cancellazione attiva professionale'} },

  // ---------- SMARTWATCH ----------
  { id: 'sw-01', brand: 'Apple', name: 'Apple Watch Ultra 3 Titano 49 mm', category: 'smartwatch', price: 899, listPrice: 949, rating: 4.9, reviews: 1622, stock: 19, sold: 1030, badge: 'Novità', fast: true, desc: 'Cassa in titanio, display più luminoso, funzione subacquea 100 m, LTE integrato e autonomia multi-giorno.' },
  { id: 'sw-02', brand: 'Garmin', name: 'Fenix 8 Pro Sapphire GPS Multisport', category: 'smartwatch', price: 1049, listPrice: 1149, rating: 4.8, reviews: 508, stock: 12, sold: 300, desc: 'Vetro zaffiro, mappe topografiche precaricate, torcia LED e fino a 21 giorni di autonomia.', fast: false },
  { id: 'sw-03', brand: 'Samsung', name: 'Galaxy Watch 8 Classic 46 mm', category: 'smartwatch', price: 449, listPrice: 529, rating: 4.6, reviews: 733, stock: 27, sold: 490, fast: true, desc: 'Ghiera fisica rotante, sensore bioattivo avanzato e analisi completa del sonno.' },
  { id: 'sw-04', brand: 'Apple', name: 'Apple Watch Series 11 45 mm GPS', category: 'smartwatch', price: 479, listPrice: 529, rating: 4.8, reviews: 2450, stock: 38, sold: 1870, fast: true, desc: 'Rilevamento ipertensione, ECG, temperature e monitoraggio allenamenti avanzato.' },

  // ---------- TV ----------
  { id: 'tv-01', brand: 'LG', name: 'OLED evo G5 65" 4K 144 Hz Gallery', category: 'tv', price: 2299, listPrice: 2799, rating: 4.9, reviews: 691, stock: 9, sold: 340, badge: 'Premium', desc: 'Pannello OLED evo con luminosità Brightness Booster Max, processore Alpha 11 e 144 Hz per gaming.', fast: false },
  { id: 'tv-02', brand: 'Samsung', name: 'Neo QLED 8K QN900F 75"', category: 'tv', price: 3999, listPrice: 4799, rating: 4.8, reviews: 214, stock: 5, sold: 90, desc: 'Risoluzione 8K reale, Quantum Mini LED, audio OTS Pro e design Infinity.', fast: false },
  { id: 'tv-03', brand: 'Sony', name: 'Bravia 9 Mini LED 75" XR Backlight', category: 'tv', price: 3199, listPrice: 3699, rating: 4.7, reviews: 188, stock: 6, sold: 75, desc: 'Controllo della retroilluminazione XR, calibrazione Netflix e audio Acoustic Multi-Audio.', fast: false },
  { id: 'tv-04', brand: 'Hisense', name: 'Smart TV 55" Mini LED 4K 120 Hz', category: 'tv', price: 699, listPrice: 999, rating: 4.5, reviews: 1204, stock: 30, sold: 880, badge: '-30%', fast: true, desc: 'Rapporto qualità-prezzo eccellente: Mini LED, Dolby Vision IQ e modalità Game 120 Hz.' },

  // ---------- CONSOLE ----------
  { id: 'co-01', brand: 'PlayStation', name: 'PlayStation 5 Pro 2 TB', category: 'console', price: 799, listPrice: 849, rating: 4.8, reviews: 2210, stock: 15, sold: 1420, badge: 'Best seller', fast: true, desc: 'GPU potenziata per il ray tracing avanzato, upscaling PSSR e SSD da 2 TB.' },
  { id: 'co-02', brand: 'Nintendo', name: 'Nintendo Switch 2 + Bundle Mario Kart World', category: 'console', price: 449, listPrice: 499, rating: 4.9, reviews: 3410, stock: 22, sold: 2600, fast: true, desc: 'Console ibrida di nuova generazione con display 1080p, 4K in dock e Joy-Con magnetici.' },
  { id: 'co-03', brand: 'Microsoft', name: 'Xbox Series X 2 TB Galaxy Black', category: 'console', price: 649, listPrice: 699, rating: 4.7, reviews: 1310, stock: 17, sold: 810, fast: true, desc: 'La console Xbox più potente, con lettore Blu-ray 4K UHD e Quick Resume.' },
  { id: 'co-04', brand: 'Valve', name: 'Steam Deck OLED 1 TB', category: 'console', price: 679, listPrice: 719, rating: 4.8, reviews: 890, stock: 13, sold: 520, desc: 'PC gaming portatile con display HDR OLED 90 Hz e autonomia migliorata.' },

  // ---------- VIDEOGIOCHI ----------
  { id: 'vg-01', brand: 'Sony', name: 'Marvel\u2019s Spider-Man 3 — PS5', category: 'videogiochi', price: 79, listPrice: 89, rating: 4.9, reviews: 1870, stock: 80, sold: 3100, fast: true, desc: 'La conclusione della trilogia open world di Insomniac Games, con ray tracing completo.' },
  { id: 'vg-02', brand: 'Nintendo', name: 'The Legend of Zelda: Echi del Regno', category: 'videogiochi', price: 69, listPrice: 79, rating: 4.9, reviews: 2410, stock: 65, sold: 2400, fast: true, desc: 'Avventura open air per Switch 2 con nuove meccaniche di manipolazione del tempo.' },
  { id: 'vg-03', brand: 'Electronic Arts', name: 'EA SPORTS FC 27 Ultimate Edition', category: 'videogiochi', price: 99, listPrice: 109, rating: 4.4, reviews: 980, stock: 120, sold: 1900, desc: 'Include 4600 FC Points, accesso anticipato e contenuti Ultimate Team esclusivi.' },
  { id: 'vg-04', brand: 'Rockstar', name: 'Grand Theft Auto VI — PS5', category: 'videogiochi', price: 89, listPrice: 99, rating: 4.9, reviews: 3200, stock: 0, sold: 5400, badge: 'Esaurito', desc: 'Il ritorno di Vice City in un open world senza precedenti. Disponibile su prenotazione.' },

  // ---------- SCARPE ----------
  { id: 'sc-01', brand: 'Nike', name: 'Air Jordan 1 Retro High OG Chicago', category: 'scarpe', price: 189, listPrice: 210, rating: 4.8, reviews: 1420, stock: 26, sold: 980, badge: 'Icona', fast: true, desc: 'Pelle premium, profilo alto e suola Air-Sole. Un classico senza tempo in colorazione Chicago.' },
  { id: 'sc-02', brand: 'Adidas', name: 'Samba OG Pelle Bianco Nero', category: 'scarpe', price: 120, listPrice: 130, rating: 4.7, reviews: 2980, stock: 48, sold: 2100, fast: true, desc: 'Tomba in pelle, punta in suede e suola in gomma gum. Il modello più indossato del momento.' },
  { id: 'sc-03', brand: 'New Balance', name: '990v6 Made in USA Grigio', category: 'scarpe', price: 220, listPrice: 240, rating: 4.8, reviews: 640, stock: 18, sold: 320, desc: 'Produzione americana, intersuola FuelCell e tomaia in mesh con inserti in pelle scamosciata.' },
  { id: 'sc-04', brand: 'Nike', name: 'Vaporfly 4 Running Elite', category: 'scarpe', price: 289, listPrice: 319, rating: 4.7, reviews: 302, stock: 16, sold: 190, fast: false, desc: 'Piastra in carbonio FlyPlate, schiuma ZoomX e tomaia ultraleggera da 198 g.' },
  { id: 'sc-05', brand: 'Adidas', name: 'Campus 00s Suede Verde Militare', category: 'scarpe', price: 110, listPrice: 125, rating: 4.5, reviews: 870, stock: 34, sold: 640, fast: true, desc: 'Suede morbido, silhouette bassa anni 2000 e tre strisce laterali.' },

  // ---------- ABBIGLIAMENTO ----------
  { id: 'ab-01', brand: 'Moncler', name: 'Giubbotto Maya Down Nero', category: 'abbigliamento', price: 1550, listPrice: 1690, rating: 4.9, reviews: 210, stock: 8, sold: 74, badge: 'Lusso', desc: 'Piumino iconico con imbottitura 90/10, cappuccio staccabile e logo in feltro sul petto.' },
  { id: 'ab-02', brand: 'Stone Island', name: 'Felpa Crewneck Cotone Blu Navy', category: 'abbigliamento', price: 310, listPrice: 340, rating: 4.7, reviews: 340, stock: 22, sold: 210, desc: 'Cotone garzato pesante, cuciture rinforzate e badge rimovibile sul braccio sinistro.' },
  { id: 'ab-03', brand: 'Ralph Lauren', name: 'Camicia Oxford Slim Blu', category: 'abbigliamento', price: 119, listPrice: 139, rating: 4.6, reviews: 1210, stock: 55, sold: 940, fast: true, desc: 'Cotone Oxford pettinato, vestibilità slim e ricamo del pony iconico.' },
  { id: 'ab-04', brand: 'Brunello Cucinelli', name: 'Maglione Cashmere Girocollo Grigio', category: 'abbigliamento', price: 890, listPrice: 990, rating: 4.9, reviews: 96, stock: 6, sold: 28, desc: 'Cashmere monorigine a due capi, tintura a filo e finiture fatte a mano in Italia.' },

  // ---------- OCCHIALI ----------
  { id: 'oc-01', brand: 'Ray-Ban', name: 'Aviator Classic Lenti Gradient Oro', category: 'occhiali', price: 189, listPrice: 215, rating: 4.8, reviews: 3200, stock: 40, sold: 2400, fast: true, desc: 'Montatura in metallo leggero, lenti G-15 con protezione UV400 e astine regolabili.' },
  { id: 'oc-02', brand: 'Persol', name: 'PO0714 Folding Havana 54', category: 'occhiali', price: 329, listPrice: 369, rating: 4.7, reviews: 480, stock: 14, sold: 160, desc: 'Iconico modello pieghevole con lente cristallo e freccia Persol in argento.' },
  { id: 'oc-03', brand: 'Ray-Ban', name: 'Meta Wayfarer Smart Glasses Matte Black', category: 'occhiali', price: 399, listPrice: 429, rating: 4.5, reviews: 610, stock: 20, sold: 420, badge: 'Novità', fast: true, desc: 'Occhiali smart con fotocamera 12 MP, audio open-ear e assistente AI integrato.' },
  { id: 'oc-04', brand: 'Tom Ford', name: 'Whitman FT0833 Occhiale da Sole', category: 'occhiali', price: 420, listPrice: 460, rating: 4.6, reviews: 122, stock: 9, sold: 60, desc: 'Acetato italiano, lenti polarizzate e dettaglio metallico a T sulla cerniera.' },

  // ---------- PROFUMI ----------
  { id: 'pr-01', brand: 'Dior', name: 'Sauvage Eau de Parfum 100 ml', category: 'profumi', price: 155, listPrice: 179, rating: 4.9, reviews: 4120, stock: 60, sold: 3800, badge: 'Best seller', fast: true, desc: 'Bergamotto di Reggio Calabria e ambroxan: una freschezza speziata dal carattere magnetico.' },
  { id: 'pr-02', brand: 'Chanel', name: 'Bleu de Chanel Parfum 100 ml', category: 'profumi', price: 169, listPrice: 189, rating: 4.8, reviews: 2180, stock: 44, sold: 2100, fast: true, desc: 'Legnoso aromatico con note di sandalo e cedro, in flacone in vetro nero profondo.' },
  { id: 'pr-03', brand: 'Tom Ford', name: 'Oud Wood Eau de Parfum 50 ml', category: 'profumi', price: 320, listPrice: 350, rating: 4.9, reviews: 690, stock: 12, sold: 340, badge: 'Lusso', desc: 'Oud raro, sandalo e vaniglia: una firma orientale raffinatissima dal sillage avvolgente.' },
  { id: 'pr-04', brand: 'Acqua di Parma', name: 'Colonia Essenza 100 ml', category: 'profumi', price: 145, listPrice: 165, rating: 4.7, reviews: 540, stock: 28, sold: 380, desc: 'Eau de cologne italiana con agrumi di Sicilia, lavanda e note legnose.' },
  { id: 'pr-05', brand: 'Le Labo', name: 'Santal 33 Eau de Parfum 50 ml', category: 'profumi', price: 205, listPrice: 225, rating: 4.8, reviews: 810, stock: 19, sold: 460, fast: false, desc: 'Sandalo, cardamomo e cuoio, miscelati a mano e personalizzati con etichetta.' },

  // ---------- SKINCARE ----------
  { id: 'sk-01', brand: 'La Mer', name: 'Crème de la Mer Idratante 60 ml', category: 'skincare', price: 380, listPrice: 420, rating: 4.8, reviews: 920, stock: 15, sold: 400, badge: 'Lusso', desc: 'Formula Miracle Broth™ con alghe fermentate per una pelle visibilmente più compatta.' },
  { id: 'sk-02', brand: 'La Roche-Posay', name: 'Hyalu B5 Siero Acido Ialuronico 30 ml', category: 'skincare', price: 42, listPrice: 49, rating: 4.7, reviews: 5310, stock: 140, sold: 6200, fast: true, badge: 'Best seller', desc: 'Due pesi molecolari di acido ialuronico, vitamina B5 e madecassoside riparatore.' },
  { id: 'sk-03', brand: 'SkinCeuticals', name: 'C E Ferulic Siero Antiossidante 30 ml', category: 'skincare', price: 165, listPrice: 185, rating: 4.8, reviews: 1180, stock: 26, sold: 720, desc: '15% vitamina C, 1% vitamina E e 0,5% acido ferulico: lo standard di riferimento clinico.' },
  { id: 'sk-04', brand: 'Estée Lauder', name: 'Advanced Night Repair Siero 50 ml', category: 'skincare', price: 118, listPrice: 135, rating: 4.8, reviews: 3640, stock: 70, sold: 4100, fast: true, desc: 'Tecnologia Chronolux™ che sincronizza il ritmo di rigenerazione notturna della pelle.' },
  { id: 'sk-05', brand: 'The Ordinary', name: 'Retinolo 0,5% in Squalano 30 ml', category: 'skincare', price: 14, listPrice: 19, rating: 4.5, reviews: 2900, stock: 200, sold: 5400, fast: true, desc: 'Retinolo a rilascio progressivo in squalano emolliente, per una texture più levigata.' },

  // ---------- ELETTRODOMESTICI ----------
  { id: 'el-01', brand: 'Dyson', name: 'Airwrap i.d. Multistyler Ferro/Blu', category: 'elettrodomestici', price: 599, listPrice: 649, rating: 4.7, reviews: 1440, stock: 25, sold: 890, badge: 'Trend', fast: true, desc: 'Styler multi-funzione con tecnologia Coanda, sei accessori e profilo personalizzabile via app.' },
  { id: 'el-02', brand: 'Dyson', name: 'V16 Piston Animal Scopa Senza Fili', category: 'elettrodomestici', price: 849, listPrice: 899, rating: 4.8, reviews: 620, stock: 18, sold: 340, fast: true, desc: 'Aspiratore a doppia ciclonica con motore Hyperdymium e autonomia fino a 70 minuti.' },
  { id: 'el-03', brand: 'De Longhi', name: 'Macchina Caffè Eletta Explore Macchiato', category: 'elettrodomestici', price: 1249, listPrice: 1399, rating: 4.7, reviews: 480, stock: 14, sold: 210, desc: 'Macchina automatica bean-to-cup con Cold Extraction e 50 ricette direttamente dal display.' },
  { id: 'el-04', brand: 'KitchenAid', name: 'Robot da Cucina Artisan 4,8 L Crema', category: 'elettrodomestici', price: 549, listPrice: 599, rating: 4.9, reviews: 2100, stock: 22, sold: 1180, fast: true, desc: 'Planetaria iconica con motore silenzioso, gancio impastatore e ciotola in acciaio inox.' },
  { id: 'el-05', brand: 'Sage', name: 'Friggitrice ad Aria Smart Oven Air 11 L', category: 'elettrodomestici', price: 399, listPrice: 449, rating: 4.6, reviews: 730, stock: 28, sold: 520, fast: true, desc: 'Forno ad aria con 13 funzioni smart, sonda di temperatura e ricette guidate.' },

  // ---------- ARREDAMENTO ----------
  { id: 'ar-01', brand: 'Kartell', name: 'Divano modulare in tecnopolimero riciclato', category: 'arredamento', price: 2450, listPrice: 2690, rating: 4.8, reviews: 88, stock: 5, sold: 24, badge: 'Design', desc: 'Made in Italy, configurabile in tre moduli, adatto a interni ed esterni. Progettato da designer di fama internazionale.' },
  { id: 'ar-02', brand: 'Poltrona Frau', name: 'Poltrona in pelle Frau Proportions', category: 'arredamento', price: 3890, listPrice: 4190, rating: 4.9, reviews: 41, stock: 3, sold: 11, desc: 'Pelle Pelle Frau® con cuciture a contrasto e struttura in faggio massello. Lavorazione artigianale italiana.' },
  { id: 'ar-03', brand: 'Artemide', name: 'Lampada da terra Tolomeo Mega LED', category: 'arredamento', price: 690, listPrice: 750, rating: 4.9, reviews: 320, stock: 16, sold: 190, fast: false, desc: 'L\u2019icona del design italiano: bracci in alluminio lucido, molle bilanciate e diffusore orientabile.' },
  { id: 'ar-04', brand: 'IKEA', name: 'Libreria modulare in rovere 240 cm', category: 'arredamento', price: 549, listPrice: 629, rating: 4.5, reviews: 640, stock: 30, sold: 420, fast: true, desc: 'Rovere impiallacciato con montanti in metallo, personalizzabile con mensole e cassetti.' },
  { id: 'ar-05', brand: 'Riva 1920', name: 'Tavolo massello di noce 220 cm', category: 'arredamento', price: 4290, listPrice: 4690, rating: 4.9, reviews: 27, stock: 2, sold: 8, desc: 'Legno di noce canaletto massello con finitura a olio naturale, pezzo unico certificato.' },

  // ---------- AUTO ----------
  { id: 'at-01', brand: 'Tesla', name: 'Wall Connector Stazione di ricarica 22 kW', category: 'auto', price: 480, listPrice: 520, rating: 4.8, reviews: 410, stock: 24, sold: 280, fast: true, desc: 'Ricarica fino a 22 kW, gestione dinamica del carico e installazione indoor/outdoor.' },
  { id: 'at-02', brand: 'Michelin', name: 'Pilot Sport 5 — 245/40 R18 97Y', category: 'auto', price: 189, listPrice: 215, rating: 4.7, reviews: 890, stock: 60, sold: 720, fast: true, desc: 'Pneumatico sportivo con mescola ibrida, ottima tenuta sul bagnato e durata chilometrica.' },
  { id: 'at-03', brand: 'Garmin', name: 'Dash Cam 67W 1440p con GPS', category: 'auto', price: 249, listPrice: 279, rating: 4.6, reviews: 520, stock: 32, sold: 380, fast: true, desc: 'Registrazione 1440p, campo visivo 180°, avvisi di collisione e parcheggio sorvegliato.' },
  { id: 'at-04', brand: 'Anker', name: 'Caricatore Solare Portatile 250W', category: 'auto', price: 399, listPrice: 449, rating: 4.5, reviews: 230, stock: 26, sold: 140, desc: 'Stazione di ricarica portatile per veicoli elettrici e camper, con celle pieghevoli ad alta efficienza.' },
  { id: 'at-05', brand: 'Thule', name: 'Box da tetto Motion 3 XL 500 L', category: 'auto', price: 799, listPrice: 859, rating: 4.8, reviews: 340, stock: 12, sold: 190, desc: 'Box aerodinamico con apertura laterale, serratura centralizzata e capacità 500 litri.' },

  // ---------- SPORT ----------
  { id: 'so-01', brand: 'Technogym', name: 'Tapis Roulant Run Personal', category: 'sport', price: 4990, listPrice: 5490, rating: 4.9, reviews: 96, stock: 4, sold: 22, badge: 'Premium', desc: 'Tapis roulant di alta gamma con sistema di ammortizzazione, schermo 21,5" e trainer on-demand.' },
  { id: 'so-02', brand: 'Peloton', name: 'Bike+ Cyclette Connected', category: 'sport', price: 2790, listPrice: 2990, rating: 4.7, reviews: 410, stock: 8, sold: 90, desc: 'Cyclette connected con schermo touch 24", lezioni live e sistema di resistenza automatico.' },
  { id: 'so-03', brand: 'Garmin', name: 'Edge 1050 Computer da Ciclismo GPS', category: 'sport', price: 749, listPrice: 799, rating: 4.8, reviews: 180, stock: 16, sold: 110, fast: true, desc: 'Schermo touch 3,5", mappe dettagliate, avvisi di traffico e fino a 20 ore di autonomia.' },
  { id: 'so-04', brand: 'Adidas', name: 'Set Manubri Regolabili 32 kg', category: 'sport', price: 449, listPrice: 499, rating: 4.6, reviews: 640, stock: 34, sold: 480, fast: true, desc: 'Coppia di manubri regolabili da 2,5 a 32 kg con ghiera rapida e panca compatibile.' },
  { id: 'so-05', brand: 'Decathlon', name: 'Tavola da Paddle Gonfiabile 11"', category: 'sport', price: 349, listPrice: 399, rating: 4.5, reviews: 1120, stock: 40, sold: 860, fast: true, desc: 'SUP gonfiabile completo di pagaia, pompa, leash e sacca da trasporto.' },
];

const slugify = (value) => String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

updateCatalog(PRODUCTS);
PRODUCTS.push(...EXTRA_PRODUCTS);
// Official BRAVIA 9 packshot replaces the promotional image with overlaid text.
Object.assign(PRODUCTS.find(p => p.id === 'tv-03'), {
  images: ['images/products/official-tv-03-clean.png'],
  imageStyle: 'packshot',
  imageSource: 'https://www.sony.it/bravia/products/bravia-9',
});

const categoryDetails = {
  smartphone: { subcategory: 'Smartphone', specs: ['Display', 'Processore', 'Memoria', 'Fotocamera', 'Batteria', 'Connettività', 'Sistema operativo'] },
  computer: { subcategory: 'Notebook', specs: ['CPU', 'GPU', 'RAM', 'SSD', 'Display', 'Porte', 'Connettività', 'Peso'] },
  audio: { subcategory: 'Cuffie e audio', specs: ['Tipologia', 'Connettività', 'Autonomia', 'Cancellazione rumore'] },
  smartwatch: { subcategory: 'Smartwatch', specs: ['Display', 'Cassa', 'Connettività', 'Autonomia', 'Sensori'] },
  tv: { subcategory: 'TV', specs: ['Dimensione', 'Tecnologia pannello', 'Risoluzione', 'Refresh rate', 'HDR', 'Sistema operativo'] },
  console: { subcategory: 'Console', specs: ['Versione', 'Storage', 'Lettore', 'Bundle'] },
  videogiochi: { subcategory: 'Videogiochi', specs: ['Piattaforma', 'Edizione', 'Formato', 'Disponibilità'] },
  scarpe: { subcategory: 'Sneakers', specs: ['Modello', 'Materiale', 'Colore', 'Numeri disponibili'] },
  abbigliamento: { subcategory: 'Abbigliamento', specs: ['Materiale', 'Colore', 'Fit', 'Taglie'] },
  occhiali: { subcategory: 'Accessori', specs: ['Modello', 'Materiale', 'Colore', 'Protezione'] },
  profumi: { subcategory: 'Profumi', specs: ['Brand', 'Linea', 'Concentrazione', 'Formato', 'Famiglia olfattiva'] },
  skincare: { subcategory: 'Skincare', specs: ['Tipologia', 'Formato', 'Principi attivi', 'Utilizzo'] },
  elettrodomestici: { subcategory: 'Elettrodomestici', specs: ['Tipologia', 'Potenza', 'Capacità', 'Funzioni'] },
  arredamento: { subcategory: 'Casa e design', specs: ['Tipologia', 'Materiale', 'Colore', 'Dimensioni'] },
  auto: { subcategory: 'Auto e accessori', specs: ['Tipologia', 'Compatibilità', 'Connettività', 'Alimentazione'] },
  sport: { subcategory: 'Sport e fitness', specs: ['Disciplina', 'Materiale', 'Dimensioni', 'Peso'] },
};

function variantsForProduct(p) {
  const n = p.name.toLowerCase();
  if (p.category === 'scarpe') return { Numero: ['38', '39', '40', '41', '42', '43', '44', '45', '46'], Colore: n.includes('chicago') ? ['Chicago', 'Black Toe', 'Royal Blue'] : n.includes('samba') ? ['Bianco/Nero', 'Nero/Bianco', 'Cream White'] : n.includes('verde') ? ['Verde militare', 'Nero', 'Beige'] : ['Come foto', 'Nero', 'Bianco'] };
  if (p.category === 'abbigliamento') return { Taglia: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], Colore: [n.includes('blu') ? 'Blu navy' : n.includes('grigio') ? 'Grigio' : 'Nero'] };
  if (p.category === 'profumi') return { Formato: n.includes('50 ml') ? ['50 ml'] : n.includes('100 ml') ? ['100 ml'] : ['30 ml', '50 ml', '100 ml'] };
  if (p.category === 'smartphone') {
    if (p.brand === 'Apple') return { Memoria: ['128 GB', '256 GB', '512 GB', '1 TB'], Colore: ['Nero', 'Bianco', 'Blu', 'Titanio naturale', 'Titanio deserto'] };
    if (p.brand === 'Samsung') return { Memoria: ['256 GB', '512 GB', '1 TB'], Colore: ['Titanium Gray', 'Titanium Black', 'Titanium Blue', 'Titanium Silver'] };
    if (p.brand === 'Google') return { Memoria: ['128 GB', '256 GB', '512 GB'], Colore: ['Obsidian', 'Porcelain', 'Hazel', 'Rose Quartz'] };
    return { Memoria: ['256 GB', '512 GB', '1 TB'], Colore: ['Nero', 'Bianco', 'Blu', 'Verde'] };
  }
  if (p.category === 'computer') {
    if (p.brand === 'Apple') return { Configurazione: ['16 GB / 512 GB', '24 GB / 1 TB', '32 GB / 1 TB', '48 GB / 2 TB'], Colore: ['Nero siderale', 'Argento'] };
    return { Configurazione: ['16 GB / 512 GB', '32 GB / 1 TB', '64 GB / 2 TB'], Colore: ['Nero', 'Argento'] };
  }
  return {};
}

const TECH_VARIANTS = {
  'pc-01': { Configurazione: ['24 GB / 1 TB', '48 GB / 1 TB', '48 GB / 2 TB'] },
  'pc-02': { Configurazione: ['16 GB / 512 GB', '32 GB / 1 TB', '64 GB / 2 TB'] },
  'pc-03': { Configurazione: ['16 GB / 512 GB', '32 GB / 1 TB'] },
  'pc-04': { Configurazione: ['32 GB / 1 TB', '64 GB / 2 TB'] },
  'pc-05': { Configurazione: ['16 GB / 512 GB', '24 GB / 512 GB', '32 GB / 1 TB'] },
  'sw-01': { Cassa: ['49 mm'] },
  'sw-02': { Cassa: ['47 mm', '51 mm'] },
  'sw-03': { Cassa: ['42 mm', '46 mm'] },
  'sw-04': { Cassa: ['41 mm', '45 mm'] },
  'tv-01': { Dimensione: ['55"', '65"', '77"', '83"'] },
  'tv-02': { Dimensione: ['65"', '75"', '85"'] },
  'tv-03': { Dimensione: ['65"', '75"', '85"'] },
  'tv-04': { Dimensione: ['55"', '65"', '75"'] },
  'co-01': { Storage: ['2 TB'] },
  'co-02': { Bundle: ['Mario Kart World', 'Console'] },
  'co-03': { Storage: ['1 TB', '2 TB'] },
  'co-04': { Storage: ['512 GB', '1 TB'] },
};

PRODUCTS.forEach((p, index) => {
  const details = categoryDetails[p.category] || { subcategory: p.category, specs: ['Dettagli', 'Materiali', 'Compatibilità'] };
  p.sku ||= `NAS-${p.category.slice(0, 3).toUpperCase()}-${String(index + 1).padStart(4, '0')}`;
  p.slug ||= slugify(`${p.brand}-${p.name}`);
  p.subcategory ||= details.subcategory;
  p.images ||= [`images/products/p-${p.id}.png`];
  p.variants ||= TECH_VARIANTS[p.id] || variantsForProduct(p);
  // A colour is selectable only when it has its own real packshot.
  if (p.variants?.Colore && !p.variantImages) delete p.variants.Colore;
  if (p.variantImages) p.variants.Colore = Object.keys(p.variantImages);
  p.keywords ||= [...new Set([p.brand, p.name, p.category, p.subcategory, ...p.name.split(/\s+/)])];
  const specValues = {
    smartphone: ['6,7” OLED 120 Hz', 'Processore flagship di ultima generazione', p.name.match(/(?:128|256|512) GB|1 TB/i)?.[0] || '256 GB', 'Sistema multi-camera con stabilizzazione ottica', 'Autonomia fino a 29 ore', '5G, Wi‑Fi 7, Bluetooth 5.4', p.brand === 'Apple' ? 'iOS' : 'Android'],
    computer: ['CPU ad alte prestazioni', 'Grafica integrata o dedicata secondo configurazione', p.name.match(/\d+ GB/i)?.[0] || '16 GB', p.name.match(/\d+ TB|\d+ GB/i)?.[0] || '512 GB', 'Display ad alta risoluzione', 'USB‑C / Thunderbolt / HDMI', 'Wi‑Fi 7 e Bluetooth 5.4', 'Da 1,2 kg'],
    scarpe: ['Modello originale del produttore', 'Pelle, tessuto tecnico e gomma', p.name.match(/Nero|Bianco|Grigio|Verde|Chicago/i)?.[0] || 'Come foto', '38–46'],
    abbigliamento: ['Materiali premium secondo modello', p.name.match(/Nero|Blu|Grigio/i)?.[0] || 'Come foto', 'Vestibilità regolare', 'XS–XXL'],
  };
  p.specs ||= Object.fromEntries(details.specs.map((key, i) => [key, specValues[p.category]?.[i] || `${key} verificata per ${p.brand}`]));
});

const gta = PRODUCTS.find((p) => p.id === 'vg-04');
if (gta) {
  gta.releaseDate = '2026-11-19';
  gta.stock = 0;
  gta.badge = 'In uscita il 19 novembre 2026';
  gta.specs = { Piattaforma: 'PlayStation 5', Edizione: 'Standard', Formato: 'Fisico', 'Data di uscita': '19 novembre 2026' };
}

export const byId = (id) => PRODUCTS.find((p) => p.id === id);
export const CATALOG = PRODUCTS.filter((p) => !p.catalogHidden);
export const familyModels = (product) => product.family ? PRODUCTS.filter((p) => p.family === product.family).sort((a, b) => a.price - b.price) : [];
export const defaultVariants = (product) => Object.fromEntries(Object.entries(product.variants || {}).map(([name, values]) => {
  const compact = product.name.toLowerCase().replace(/\s+/g, '');
  let found = values.find((value) => compact.includes(String(value).toLowerCase().replace(/\s+/g, '')));
  if (!found && name === 'Configurazione') {
    const ram = product.name.match(/(?:8|16|24|32|48|64) GB/i)?.[0]; const storage = product.name.match(/(?:256 GB|512 GB|1 TB|2 TB)/i)?.[0];
    found = values.find((value) => (!ram || value.includes(ram.toUpperCase())) && (!storage || value.includes(storage.toUpperCase())));
  }
  return [name, found || values[0]];
}));
export const variantTitle = (product, selected = {}) => {
  let title = product.name;
  for (const [name, values] of Object.entries(product.variants || {})) {
    const chosen = selected[name]; if (!chosen) continue;
    const current = values.find((value) => title.toLowerCase().includes(String(value).toLowerCase()));
    if (current) title = title.replace(current, chosen);
    else if (name === 'Configurazione') {
      const [ram, storage] = chosen.split('/').map((part) => part.trim());
      if (/(?:8|16|24|32|48|64) GB/i.test(title)) title = title.replace(/(?:8|16|24|32|48|64) GB/i, ram);
      else title += ` ${ram}`;
      if (/(?:256 GB|512 GB|1 TB|2 TB)/i.test(title)) title = title.replace(/(?:256 GB|512 GB|1 TB|2 TB)/i, storage);
      else title += ` ${storage}`;
    }
  }
  return title;
};
export const variantImage = (product, selected = {}) => product.variantImages?.[selected.Colore] || product.images?.[0] || `images/products/p-${product.id}.png`;
export const variantPrice = (product, selected = {}) => {
  for (const [variantName, prices] of Object.entries(product.variantPrices || {})) {
    if (selected[variantName] && Number.isFinite(prices[selected[variantName]])) return prices[selected[variantName]];
  }
  const memorySteps = { '128 GB': 0, '256 GB': 120, '512 GB': 370, '1 TB': 870, '2 TB': 1620 };
  const baseMemory = /2 TB/i.test(product.name) ? '2 TB' : /1 TB/i.test(product.name) ? '1 TB' : /512 GB/i.test(product.name) ? '512 GB' : /256 GB/i.test(product.name) ? '256 GB' : '128 GB';
  const memoryDelta = selected.Memoria ? memorySteps[selected.Memoria] - memorySteps[baseMemory] : 0;
  const configSteps = { '16 GB / 512 GB': 0, '24 GB / 512 GB': 200, '24 GB / 1 TB': 350, '32 GB / 512 GB': 400, '32 GB / 1 TB': 520, '48 GB / 1 TB': 800, '48 GB / 2 TB': 1050, '64 GB / 2 TB': 1250 };
  let baseConfig = '16 GB / 512 GB';
  if (/64 GB/i.test(product.name)) baseConfig = '64 GB / 2 TB';
  else if (/32 GB/i.test(product.name) || /RTX 5080/i.test(product.name)) baseConfig = '32 GB / 1 TB';
  else if (/1 TB/i.test(product.name)) baseConfig = '24 GB / 1 TB';
  const configDelta = selected.Configurazione ? configSteps[selected.Configurazione] - configSteps[baseConfig] : 0;
  const selectedSize = Number.parseInt(selected.Dimensione || selected.Cassa || '', 10);
  const baseSize = Number.parseInt(product.name.match(/\d+(?=\s*(?:mm|"))/)?.[0] || selectedSize || 0, 10);
  const sizeDelta = selected.Dimensione ? (selectedSize - baseSize) * 50 : selected.Cassa ? (selectedSize - baseSize) * 15 : 0;
  const storageDelta = selected.Storage ? (memorySteps[selected.Storage] || 0) - (memorySteps[product.name.match(/(?:512 GB|1 TB|2 TB)/i)?.[0]?.toUpperCase()] || 0) : 0;
  const bundleDelta = selected.Bundle && !product.name.toLowerCase().includes(selected.Bundle.toLowerCase()) ? 50 : 0;
  return Math.max(1, Math.round((product.price + memoryDelta + configDelta + sizeDelta + storageDelta + bundleDelta) * 100) / 100);
};
export const variantListPrice = (product, selected = {}) => Math.max(variantPrice(product, selected), Math.round(((product.listPrice || product.price) + variantPrice(product, selected) - product.price) * 100) / 100);

export const variantSpecs = (product, selected = {}) => {
  const specs = { ...(product.specs || {}) };
  if (selected.Memoria) specs.Memoria = selected.Memoria;
  if (selected.Colore) specs.Colore = selected.Colore;
  if (selected.Configurazione) {
    const [ram, storage] = selected.Configurazione.split('/').map((part) => part.trim());
    specs.RAM = ram;
    specs.SSD = storage;
    specs.Configurazione = selected.Configurazione;
  }
  if (selected.Dimensione) specs.Dimensione = selected.Dimensione;
  if (selected.Cassa) specs.Cassa = selected.Cassa;
  if (selected.Storage) specs.Storage = selected.Storage;
  if (product.id === 'pc-06') specs.Tastiera = selected.Configurazione?.includes('512 GB') ? 'Magic Keyboard con Touch ID' : 'Magic Keyboard';
  if (product.id === 'pc-05') specs.GPU = selected.Configurazione === '16 GB / 512 GB' ? 'GPU Apple 8-core' : 'GPU Apple 10-core';
  if (product.id === 'sp-02') specs.RAM = selected.Memoria === '1 TB' ? '16 GB' : '12 GB';
  if (product.id === 'sp-03') specs.RAM = selected.Memoria === '256 GB' ? '12 GB' : '16 GB';
  return specs;
};

/* Packshot locali: una fotografia coerente per ciascun prodotto. */
export const imgSrc = (id) => {
  const override = typeof window !== 'undefined' && window.__MERCA_IMG__ && window.__MERCA_IMG__[id];
  if (override) return override;
  return byId(id)?.images?.[0] || `images/products/p-${id}.png`;
};
export const discountPct = (p) => (p.listPrice ? Math.round(((p.listPrice - p.price) / p.listPrice) * 100) : 0);
export const catName = (slug) => CATEGORIES.find((c) => c.slug === slug)?.name || slug;
export const brands = [...new Set(PRODUCTS.map((p) => p.brand))].sort();

export const eur = (n) => new Intl.NumberFormat(currentLocale(), { style: 'currency', currency: 'EUR' }).format(Number(n) || 0);

export const deliveryDate = (bizDays = 2) => {
  const d = new Date();
  let added = 0;
  while (added < bizDays) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) added++;
  }
  return d.toLocaleDateString(currentLocale(), { day: 'numeric', month: 'long' });
};

export const REVIEWS = [
  { author: 'Marco B.', stars: 5, title: 'Qualità superiore', date: '12 settembre 2026', text: 'Prodotto impeccabile, imballaggio curato e consegna puntualissima. Lo riacquisterei senza esitazioni.', verified: true },
  { author: 'Giulia R.', stars: 5, title: 'Vale ogni euro', date: '8 settembre 2026', text: 'Materiali di livello altissimo e resa migliore di quanto mi aspettassi dalle foto. Servizio clienti rapidissimo.', verified: true },
  { author: 'Alessandro T.', stars: 4, title: 'Ottimo, con qualche dettaglio', date: '3 settembre 2026', text: 'Molto soddisfatto dell\u2019acquisto. Unico neo: la confezione è arrivata con un angolo leggermente ammaccato.', verified: true },
  { author: 'Francesca M.', stars: 5, title: 'Consigliatissimo', date: '28 agosto 2026', text: 'Design elegante e funzionalità perfette. Consegna premium, arrivato in giornata.', verified: false },
];


/* ------------------------------------------------------------------ */
/* Dati account demo (nessun dato reale, sole ultime 4 cifre inventate) */
/* ------------------------------------------------------------------ */

export const ADDRESSES = [
  { id: 'casa', label: 'Casa', name: 'Marco Riccardi', line1: 'Via Alessandro Manzoni 24', cap: '20121', city: 'Milano', prov: 'MI', country: 'Italia', default: true },
  { id: 'ufficio', label: 'Ufficio', name: 'Marco Riccardi', line1: 'Piazza della Repubblica 18', cap: '20124', city: 'Milano', prov: 'MI', country: 'Italia' },
  { id: 'villa', label: 'Villa', name: 'Marco Riccardi', line1: 'Via dei Giardini 7', cap: '22021', city: 'Bellagio', prov: 'CO', country: 'Italia' },
];

export const CARDS = [
  { id: 'c1', type: 'Visa Infinite', last4: '4821', exp: '05/29', holder: 'MARCO RICCARDI', tone: 'black', net: 'VISA', default: true },
  { id: 'c2', type: 'Mastercard World Elite', last4: '7714', exp: '11/28', holder: 'MARCO RICCARDI', tone: 'platinum', net: 'mastercard' },
  { id: 'c3', type: 'American Express Platinum', last4: '3107', exp: '02/30', holder: 'MARCO RICCARDI', tone: 'graphite', net: 'AMEX' },
  { id: 'c4', type: 'Visa Signature', last4: '9284', exp: '07/27', holder: 'MARCO RICCARDI', tone: 'navy', net: 'VISA' },
  { id: 'c5', type: 'Carta aziendale', last4: '6402', exp: '09/28', holder: 'RICCARDI HOLDING SRL', tone: 'steel', net: 'AZIENDA' },
];

export const SHIPPING = [
  { id: 'std', name: 'Consegna standard', desc: '2-3 giorni lavorativi', price: 0, eta: 'Gratuita' },
  { id: 'pri', name: 'Consegna prioritaria', desc: 'Consegna domani', price: 7.99, eta: '' },
  { id: 'prem', name: 'Consegna Premium', desc: 'Domani entro le 12:00', price: 0, eta: 'Inclusa con account Premium' },
];

export const CARD_LABEL = {
  c1: 'Visa Infinite \u2022\u2022\u2022\u2022 4821',
  c2: 'Mastercard World Elite \u2022\u2022\u2022\u2022 7714',
  c3: 'Amex Platinum \u2022\u2022\u2022\u2022 3107',
  c4: 'Visa Signature \u2022\u2022\u2022\u2022 9284',
  c5: 'Carta aziendale \u2022\u2022\u2022\u2022 6402',
};

export const SEED_ORDERS = [
  { id: 'IT-89421753', date: '2026-09-18', items: [{ id: 'pc-01', qty: 1 }, { id: 'au-01', qty: 1 }], subtotal: 3378, shipping: 0, discount: 530.1, total: 2847.9, cardId: 'c1', addressId: 'casa', status: 'Simulato', step: 1 },
  { id: 'IT-89388112', date: '2026-09-18', items: [{ id: 'pc-05', qty: 1 }, { id: 'au-02', qty: 2 }], subtotal: 2107, shipping: 0, discount: 0, total: 2107, cardId: 'c2', addressId: 'ufficio', status: 'Simulato', step: 2 },
  { id: 'IT-89330477', date: '2026-09-17', items: [{ id: 'sc-01', qty: 1 }], subtotal: 189, shipping: 0, discount: 0, total: 189, cardId: 'c3', addressId: 'casa', status: 'Simulato', step: 4 },
  { id: 'IT-89290155', date: '2026-09-16', items: [{ id: 'pr-01', qty: 1 }], subtotal: 155, shipping: 0, discount: 10, total: 145, cardId: 'c2', addressId: 'villa', status: 'Simulato', step: 5 },
  { id: 'IT-89244890', date: '2026-09-15', items: [{ id: 'el-01', qty: 1 }, { id: 'sk-02', qty: 3 }], subtotal: 725, shipping: 0, discount: 0, total: 725, cardId: 'c1', addressId: 'casa', status: 'Simulato', step: 5 },
  { id: 'IT-89199023', date: '2026-09-14', items: [{ id: 'oc-03', qty: 1 }], subtotal: 399, shipping: 0, discount: 0, total: 399, cardId: 'c4', addressId: 'ufficio', status: 'Simulato', step: 5 },
  { id: 'IT-89156410', date: '2026-09-12', items: [{ id: 'co-01', qty: 1 }, { id: 'vg-01', qty: 2 }], subtotal: 957, shipping: 0, discount: 57, total: 900, cardId: 'c1', addressId: 'casa', status: 'Simulato', step: 5 },
  { id: 'IT-89102338', date: '2026-09-10', items: [{ id: 'sc-03', qty: 1 }], subtotal: 220, shipping: 7.99, discount: 0, total: 227.99, cardId: 'c5', addressId: 'ufficio', status: 'Simulato', step: 5 },
];

