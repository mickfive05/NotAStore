import { store } from './store.js?v=20260922c';
import { currentLocale, getLanguage, languageOptions } from './i18n.js?v=20260925translate';
import { PRODUCTS, byId, eur, discountPct, deliveryDate, imgSrc } from './data.js?v=20260922c';

export { PRODUCTS, byId, eur, discountPct, deliveryDate, imgSrc };

export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------------- Icone ---------------- */
const svg = (d, size = 20) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

export const Ico = {
  search: (s) => svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>', s),
  user: (s) => svg('<circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.6 3.6-6 8-6s8 2.4 8 6"/>', s),
  box: (s) => svg('<path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5 12 12l9-4.5M12 12v9"/>', s),
  heart: (s, fill) => svg('<path d="M12 20s-7-4.3-7-9.2A4.1 4.1 0 0 1 12 7a4.1 4.1 0 0 1 7 3.8C19 15.7 12 20 12 20z"/>', s).replace('fill="none"', fill ? 'fill="currentColor"' : 'fill="none"'),
  cart: (s) => svg('<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h2.2l2.4 12.2h11.3L21 6.5H6"/>', s),
  pin: (s) => svg('<path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>', s),
  truck: (s) => svg('<path d="M2 6h11v10H2zM13 9h4l4 3.5V16h-8"/><circle cx="6.5" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/>', s),
  shield: (s) => svg('<path d="M12 3 5 6v6c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6z"/><path d="m9 12 2 2 4-4.5"/>', s),
  ret: (s) => svg('<path d="M4 9h11a4 4 0 0 1 0 8h-3"/><path d="m8 5-4 4 4 4"/>', s),
  lock: (s) => svg('<rect x="4.5" y="10" width="15" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>', s),
  check: (s) => svg('<path d="m4 12.5 5 5L20 6.5"/>', s),
  chevron: (s) => svg('<path d="m9 6 6 6-6 6"/>', s),
  close: (s) => svg('<path d="M6 6l12 12M18 6 6 18"/>', s),
  plus: (s) => svg('<path d="M12 5v14M5 12h14"/>', s),
  minus: (s) => svg('<path d="M5 12h14"/>', s),
  trash: (s) => svg('<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>', s),
  spark: (s) => svg('<path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/>', s),
  card: (s) => svg('<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6 15h4"/>', s),
  chart: (s) => svg('<path d="M4 20V4M4 20h16"/><path d="M8 17v-5M12 17V8M16 17v-8"/>', s),
  gear: (s) => svg('<circle cx="12" cy="12" r="3"/><path d="M12 2.5v2.6M12 18.9v2.6M4.2 4.2l1.9 1.9M17.9 17.9l1.9 1.9M2.5 12h2.6M18.9 12h2.6M4.2 19.8l1.9-1.9M17.9 6.1l1.9-1.9"/>', s),
  menu: (s) => svg('<path d="M3 6h18M3 12h18M3 18h18"/>', s),
};

export function activeCardVisual(level, extraClass = '') {
  const card = store.card || {};
  const cardLevel = level || store.levels.find((item) => item.level === Number(store.user?.level || 1)) || store.levels[0] || { level: 1, name: 'Postepay', tone: 'red' };
  const name = String(cardLevel.name || card.name || 'Postepay');
  const lowerName = name.toLowerCase();
  const amex = lowerName.includes('american express');
  const network = amex ? 'amex' : lowerName.includes('mastercard') ? 'mastercard' : lowerName.includes('visa') ? 'visa' : 'postepay';
  const networkLabel = network === 'amex' ? 'American Express' : network === 'postepay' ? 'Postepay' : network === 'visa' ? 'Visa' : 'Mastercard';
  const chip = '<svg class="card-chip" viewBox="0 0 52 40" aria-hidden="true"><rect x="1" y="1" width="50" height="38" rx="7" fill="currentColor"/><path d="M18 1v11l-7 7H1m50 0H41l-7-7V1M18 39V28l-7-7H1m50 0H41l-7 7v11M18 12h16v16H18zM1 10h17m16 0h17M1 30h17m16 0h17" fill="none" stroke="#695e42" stroke-width=".8"/><rect x="1" y="1" width="50" height="38" rx="7" fill="none" stroke="#fff" stroke-opacity=".45"/></svg>';
  const contactless = '<svg class="contactless" viewBox="0 0 24 30" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 11a8 8 0 0 1 0 8M8 7a14 14 0 0 1 0 16M12 3a20 20 0 0 1 0 24M16 0a26 26 0 0 1 0 30"/></g></svg>';
  return `<div class="wallet-card finish-${cardLevel.level} ${esc(cardLevel.tone || '')} active ${extraClass}"><div class="card-name"><strong data-no-translate>${esc(name)}</strong><span class="badge">L${cardLevel.level}</span></div><span class="card-engraving" aria-hidden="true"></span>${amex ? '<span class="card-portrait" aria-hidden="true"></span>' : ''}<div class="card-top">${chip}${contactless}<img class="network network-${network}" src="images/cards/${network}.svg" alt="${networkLabel}"></div><div class="number">•••• •••• •••• ${esc(card.last4 || '••••')}</div><div class="card-bottom"><div><small>Intestatario</small><strong>${esc(card.holder || store.user?.name || 'NOTASTORE MEMBER')}</strong></div><div><small>Livello</small><strong>${cardLevel.level}</strong></div></div></div>`;
}

/* ---------------- Immagine prodotto ---------------- */
export function imgTag(p, sourceOverride = '') {
  const source = sourceOverride || imgSrc(p.id);
  const photoClass = /^https?:\/\//.test(source) ? 'real' : 'art';
  const scale = Number(p.imageScale) > 1 ? ` style="--product-scale:${Number(p.imageScale)}"` : '';
  return `<div data-photo="${esc(source)}" class="pimg ${photoClass} ${p.imageStyle === 'packshot' ? 'packshot' : ''}"${scale}><img src="${source}" alt="${esc(p.name)}" loading="lazy"></div>`;
}

/* ---------------- Card prodotto ---------------- */
export function card(p, compact = false) {
  const off = discountPct(p);
  const wished = store.wishlist.includes(p.id);
  const out = p.stock === 0;
  return `<article class="pcard">
    <a class="thumb" href="#/prodotto/${p.id}">
      <div class="badges">
        ${off > 0 && !out ? `<span class="badge badge-deal">-${off}%</span>` : ''}
        ${p.badge ? `<span class="badge ${p.badge === 'Novità' ? 'badge-new' : 'badge-soft'}">${p.badge}</span>` : ''}
        ${out ? '<span class="badge badge-soft">Esaurito</span>' : ''}
      </div>
      ${imgTag(p)}
    </a>
    <button class="wish-btn ${wished ? 'on' : ''}" data-act="wish" data-id="${p.id}" aria-label="Aggiungi ai preferiti">${Ico.heart(18, wished)}</button>
    <div class="body">
      <span class="brand">${p.brand}</span>
      <a class="name" href="#/prodotto/${p.id}">${p.catalogName || p.name}</a>
      <div class="meta">${p.reviews ? `<span class="stars">★</span><span style="color:var(--ink-2);font-weight:650">${p.rating}</span><span>(${p.reviews.toLocaleString(currentLocale())})</span>` : '<span>Nuovo nel catalogo</span>'}</div>
      <div class="price"><span class="now">${p.catalogName ? 'Da ' : ''}${eur(p.price)}</span>${p.listPrice && p.listPrice > p.price ? `<span class="was">${eur(p.listPrice)}</span>` : ''}</div>
      ${compact ? '' : `<div style="font-size:12px;color:var(--ink-3);display:flex;align-items:center;gap:6px">${Ico.truck(14)} consegna ${deliveryDate(p.fast ? 2 : 4)}</div>`}
      <div class="foot"><button class="btn btn-dark btn-block" data-act="add" data-id="${p.id}" ${out ? 'disabled' : ''} style="padding:10px 14px;font-size:13.5px">${Ico.cart(16)} ${out ? 'Non disponibile' : 'Aggiungi'}</button></div>
    </div>
  </article>`;
}

export const skeleton = () => `<div class="pcard"><div class="thumb sk" style="border-radius:0"></div><div class="body">
  <div class="sk" style="height:10px;width:40%"></div><div class="sk" style="height:13px;width:92%"></div>
  <div class="sk" style="height:13px;width:70%"></div><div class="sk" style="height:18px;width:50%;margin-top:8px"></div>
  <div class="sk" style="height:36px;margin-top:8px;border-radius:999px"></div></div></div>`;

export function rail(title, eyebrow, more, href, items) {
  return `<section class="section"><div class="wrap">
    <div class="sec-head"><div>${eyebrow ? `<div class="eyebrow">${eyebrow}</div>` : ''}<h2>${title}</h2></div>
    ${more ? `<a class="more" href="#${href}">${more} →</a>` : ''}</div>
    <div class="rail">${items}</div></div></section>`;
}

/* ---------------- Header / Footer ---------------- */
export function header() {
  const c = store.count();
  const w = store.wishlist.length;
  const cats = [
    ['smartphone', 'Smartphone'], ['computer', 'Computer & Notebook'], ['audio', 'Cuffie & Audio'],
    ['smartwatch', 'Smartwatch'], ['tv', 'TV & Home Cinema'], ['console', 'Console'], ['videogiochi', 'Videogiochi'],
    ['scarpe', 'Sneakers & Scarpe'], ['abbigliamento', 'Abbigliamento'], ['occhiali', 'Occhiali & Sole'],
    ['profumi', 'Profumi'], ['skincare', 'Skincare'], ['elettrodomestici', 'Piccoli Elettrodomestici'],
    ['arredamento', 'Arredamento & Design'], ['auto', 'Auto & Moto Accessori'], ['sport', 'Sport & Fitness'],
  ];
  const currentLevel = store.user ? (store.levels.find((item) => item.level === Number(store.user.level)) || store.levels[0]) : null;
  return `<header class="hdr">
    <div class="wrap hdr-top">
      <button class="btn btn-icon mobile-only" style="color:#fff" data-act="menu" aria-label="Menu">${Ico.menu(22)}</button>
      <a class="hdr-brand" href="#/"><img class="brand-logo" src="images/notastore-logo.png" alt="NotAStore"></a>
      <form class="hdr-search" id="searchForm" role="search">
        <span class="si">${Ico.search(19)}</span>
        <input id="searchInput" placeholder="Cerca su NotAStore — prodotti, marchi, categorie…" aria-label="Cerca prodotti" autocomplete="off">
        <div class="search-panel page-hidden" id="searchPanel"></div>
      </form>
      <div class="hdr-actions">
        ${store.user && currentLevel ? `<button class="header-current-card" data-act="current-card" aria-haspopup="dialog" aria-label="Apri carta attiva, livello ${currentLevel.level}">${activeCardVisual(currentLevel, 'header-card-mini')}<span class="header-card-copy"><small>Carta attiva · Livello ${currentLevel.level}</small><strong data-no-translate>${esc(currentLevel.name)}</strong></span></button>` : ''}
        <label class="language-picker" aria-label="Lingua del sito"><span class="language-flag flag-${getLanguage()}" aria-hidden="true"></span><select id="languageSelect" title="Lingua del sito">${languageOptions()}</select></label>
        <a class="hdr-act desk-only" href="#/leaderboard">${Ico.chart(22)}<span><small>Classifica</small><strong>Leaderboard</strong></span></a>
        <a class="hdr-act desk-only" href="${store.user ? '#/account' : '#/login'}">${Ico.user(22)}<span><small>${store.user ? `Ciao, ${esc(store.user.name.split(' ')[0])}` : 'Accedi o'}</small><strong>${store.user ? 'Account' : 'Registrati'}</strong></span></a>
        <a class="hdr-act" data-header-wishlist href="#/wishlist" aria-label="Preferiti${w ? `, ${w} prodotti` : ''}">${Ico.heart(22)}<span class="desk-only"><small>Lista</small><strong>Preferiti</strong></span>${w ? `<span class="cart-count">${w}</span>` : ''}</a>
        <a class="hdr-act" data-header-cart href="#/carrello" aria-label="Carrello${c ? `, ${c} prodotti` : ''}">${Ico.cart(23)}<span class="desk-only"><small>Il mio</small><strong>Carrello</strong></span>${c ? `<span class="cart-count">${c}</span>` : ''}</a>
      </div>
    </div>
    <nav class="hdr-sub"><div class="wrap">
      <a class="hot" href="#/offerte">⚡ Offerte del giorno</a>
      ${cats.map(([s, n]) => `<a href="#/categoria/${s}">${n}</a>`).join('')}
    </div></nav>
  </header>
  <aside id="drawer" class="page-hidden"></aside>`;
}

export function footer() {
  return `<footer class="ftr"><div class="wrap">
    <div class="ftr-cols">
      <div>
        <div class="brandrow"><span class="logo-mark">N</span> NotAStore</div>
        <p class="note">Shopping simulator digitale per tecnologia, moda e casa. Tutti i saldi, gli ordini e le carte sono esclusivamente virtuali.</p>
        <div class="payrow"><span>POSTEPAY</span><span>VISA</span><span>MASTERCARD</span><span>AMEX</span><span>SIMULATED</span></div>
      </div>
      <div><h4>Acquisti</h4>
        <a href="#/prodotti">Tutti i prodotti</a><a href="#/offerte">Offerte</a>
        <a href="#/categoria/smartphone">Smartphone</a><a href="#/categoria/computer">Computer</a><a href="#/categoria/profumi">Beauty</a></div>
      <div><h4>Il mio account</h4>
        <a href="#/account">Il mio account</a><a href="#/ordini">I miei ordini</a><a href="#/wishlist">Wishlist</a>
        <a href="#/account/pagamenti">Le mie carte</a><a href="#/account/ricompense">Ricompense</a><a href="#/account/dashboard">Wallet e statistiche</a><a href="#/leaderboard">Leaderboard</a></div>
      <div><h4>Assistenza</h4>
        <a href="#/">Centro assistenza</a><a href="#/">Spedizioni e consegne</a><a href="#/">Resi e rimborsi</a>
        <a href="#/ordini">Traccia il tuo ordine</a><a href="mailto:info@notastore.shop">Contattaci</a></div>
      <div><h4>Chi siamo</h4>
        <a href="#/chi-siamo">Il progetto NotAStore</a><a href="#/chi-siamo">La nostra storia</a><a href="#/come-funziona">Come funziona</a>
        <a href="#/privacy">Privacy Policy</a><a href="#/termini">Termini e condizioni</a></div>
    </div>
    <div class="ftr-disclaimer">
      <div class="sim-note" style="margin-bottom:14px">${Ico.shield(15)} Marketplace simulato · Nessun acquisto o pagamento reale</div>
      <p><strong>Questo sito è una simulazione di shopping.</strong> Nessun prodotto viene venduto, nessun ordine viene realmente effettuato e nessun pagamento viene elaborato. Non inserire dati bancari reali.</p>
      <p style="margin-top:10px">© 2026 NotAStore — Progetto dimostrativo ideato e sviluppato da Michael. Tutti i marchi citati appartengono ai rispettivi proprietari e sono utilizzati a scopo puramente illustrativo. Prezzi e configurazioni sono basati su listini pubblici verificati; disponibilità e recensioni sono simulate.</p>
    </div>
  </div></footer>`;
}

/* ---------------- Toast ---------------- */
let toastTimer = null;
export function toast(msg, sub = '', kind = 'ok') {
  const wrap = document.getElementById('toasts');
  if (!wrap) return;
  const t = document.createElement('div');
  t.className = `toast ${kind}`;
  t.innerHTML = `<span class="tic">${kind === 'ok' ? Ico.check(16) : Ico.close(16)}</span><div><strong>${esc(msg)}</strong>${sub ? `<small>${esc(sub)}</small>` : ''}</div>`;
  wrap.appendChild(t);
  clearTimeout(toastTimer);
  setTimeout(() => t.remove(), 3200);
}

export const crumbs = (label, extra = '') =>
  `<nav class="crumbs"><a href="#/">Home</a> <span>/</span>${extra ? ` ${extra} <span>/</span>` : ''} <span style="color:var(--ink)">${label}</span></nav>`;

export const pageHead = (eyebrow, title, sub = '') =>
  `<div style="padding:18px 0 6px"><div class="eyebrow">${eyebrow}</div><h1 style="font-size:clamp(24px,3.2vw,34px);margin-top:6px">${title}</h1>${sub ? `<p style="color:var(--ink-3);margin-top:8px">${sub}</p>` : ''}</div>`;


