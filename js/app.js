import { header as headerHTML, footer as footerHTML, toast, card, esc, Ico, imgSrc, activeCardVisual } from './ui.js?v=20260926searchwide';
import { store } from './store.js?v=20260922c';
import { CATALOG as PRODUCTS, CARDS, byId, defaultVariants, variantPrice, variantListPrice, variantTitle, variantImage, variantSpecs, eur } from './data.js?v=20260922c';
import * as V from './views.js?v=20260925cardnames';
import { currentLocale, localizeDocument, setLanguage, startLocalizationObserver, translateText } from './i18n.js?v=20260925translate';

const app = document.getElementById('app');
const appHeader = document.getElementById('appHeader');
const appFooter = document.getElementById('appFooter');
const toasts = document.getElementById('toasts');

let suppressRerender = false;
let currentRoute = { path: '/', parts: [] };

/* ---------------- Router ---------------- */
function parseHash() {
  let h = location.hash.replace(/^#/, '') || location.pathname || '/';
  let query = '';
  const qi = h.indexOf('?');
  if (qi >= 0) { query = h.slice(qi + 1); h = h.slice(0, qi); }
  const parts = h.split('/').filter(Boolean);
  return { path: h, parts, params: new URLSearchParams(query) };
}

function resolve() {
  const { parts, params } = currentRoute;
  if (parts.length === 0) return V.home();
  const [a, b] = parts;

  if (a === 'categoria') return V.catalog('category', b || '', '');
  if (a === 'cerca') return V.catalog('search', '', params.get('q') || '');
  if (a === 'offerte') return V.catalog('deals', '', '');
  if (a === 'prodotti') return V.catalog('all', '', '');
  if (a === 'prodotto') return V.product(b);
  if (a === 'wishlist') return V.wishlist();
  if (a === 'carrello') return V.cart();
  if (a === 'checkout') return store.user ? V.checkout() : V.auth('login');
  if (a === 'conferma') return V.confirmation(b);
  if (a === 'ordini') return store.user ? V.orders() : V.auth('login');
  if (a === 'login') return V.auth('login');
  if (a === 'registrazione') return V.auth('register');
  if (a === 'invito') return V.auth('register', b || '');
  if (a === 'leaderboard') return V.leaderboard();
  if (a === 'community') return V.community();
  if (a === 'chi-siamo') return V.about();
  if (a === 'come-funziona') return V.howItWorks();
  if (a === 'privacy') return V.privacyPolicy();
  if (a === 'termini') return V.terms();
  if (a === 'accredito') return V.creditResult(params);
  if (a === 'account' && !store.user) return V.auth('login');
  if (a === 'account' && b === 'pagamenti') return V.cards();
  if (a === 'account' && b === 'carte') return V.cards();
  if (a === 'account' && b === 'movimenti') return V.movements();
  if (a === 'account' && b === 'email') return store.user?.isDemo ? V.inbox() : V.notFound();
  if (a === 'account' && b === 'dashboard') return V.walletDashboard();
  if (a === 'account' && b === 'ricompense') return V.rewardCenter();
  if (a === 'account') return V.accountHub();
  if (a === 'admin') return store.user?.role === 'admin' ? V.adminConsole() : V.notFound();
  return V.notFound();
}

function render() {
  const page = resolve();
  appHeader.innerHTML = headerHTML();
  app.innerHTML = page.html;
  appFooter.innerHTML = footerHTML();
  document.title = page.title ? `${translateText(page.title)} · NotAStore` : 'NotAStore — Shopping Simulator';
  updatePageMetadata(page);
  if (page.mount) page.mount();
  localizeDocument(document);
  if (!currentRoute.parts.length) { /* home */ }
}

function updatePageMetadata(page) {
  const publicPath = currentRoute.path === '/' ? '/' : currentRoute.path.replace(/\/$/, '');
  const canonicalUrl = `https://www.notastore.shop${publicPath}`;
  const title = document.title;
  const description = page.description || 'NotAStore è uno shopping simulator digitale: esplora prodotti e completa ordini usando esclusivamente valuta virtuale.';
  const set = (selector, attribute, value) => {
    const element = document.querySelector(selector);
    if (element) element.setAttribute(attribute, value);
  };
  set('link[rel="canonical"]', 'href', canonicalUrl);
  set('meta[name="description"]', 'content', description);
  set('meta[property="og:title"]', 'content', title);
  set('meta[property="og:description"]', 'content', description);
  set('meta[property="og:url"]', 'content', canonicalUrl);
  set('meta[name="twitter:title"]', 'content', title);
  set('meta[name="twitter:description"]', 'content', description);
}

function go(hash) {
  if (location.hash === hash) { render(); }
  else location.hash = hash;
}

window.addEventListener('hashchange', () => {
  currentRoute = parseHash();
  window.scrollTo({ top: 0, behavior: 'instant' });
  render();
});

store.on(() => { if (!suppressRerender) { updateBadges(); } });

/* aggiorna solo i contatori dell'header, senza ridisegnare la pagina */
function updateBadges() {
  const acts = document.querySelector('.hdr-actions');
  if (!acts) return;
  const c = store.count();
  const w = store.wishlist.length;
  const wishlist = acts.querySelector('[data-header-wishlist]');
  const cartLink = acts.querySelector('[data-header-cart]');
  if (wishlist) wishlist.innerHTML = `${Ico.heart(22)}<span class="desk-only"><small>Lista</small><strong>Preferiti</strong></span>${w ? `<span class="cart-count">${w}</span>` : ''}`;
  if (cartLink) cartLink.innerHTML = `${Ico.cart(23)}<span class="desk-only"><small>Il mio</small><strong>Carrello</strong></span>${c ? `<span class="cart-count">${c}</span>` : ''}`;
  localizeDocument(acts);
}

/* ---------------- Ricerca ---------------- */
let searchTimer = null;
function onSearchInput(e) {
  const q = e.target.value.trim();
  const panel = document.getElementById('searchPanel');
  if (!panel) return;
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    if (q.length < 2) { panel.classList.add('page-hidden'); panel.innerHTML = ''; return; }
    const res = PRODUCTS.filter((p) => `${p.name} ${p.brand} ${p.category} ${p.subcategory || ''} ${(p.keywords || []).join(' ')}`.toLowerCase().includes(q.toLowerCase())).slice(0, 6);
    if (!res.length) { panel.classList.add('page-hidden'); panel.innerHTML = ''; return; }
    panel.innerHTML = '<div class="tag">Suggerimenti</div>' + res.map((p) => `<a class="row" href="#/prodotto/${p.id}">
      <div style="width:34px;height:34px;border-radius:6px;overflow:hidden;flex:none"><div class="pimg art"><img src="${imgSrc(p.id)}" alt=""></div></div>
      <div style="min-width:0"><div style="font-size:13.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(p.name)}</div>
      <div style="font-size:12px;color:var(--ink-3)">${p.brand}</div></div></a>`).join('')
      + `<a class="row" style="border-top:1px solid var(--line);font-weight:650;color:var(--brand)" href="#/cerca?q=${encodeURIComponent(q)}">Vedi tutti i risultati per “${esc(q)}”</a>`;
    panel.classList.remove('page-hidden');
  }, 140);
}

/* ---------------- Filtri catalogo ---------------- */
function onFilterChange(e) {
  const el = e.target;
  const kind = el.dataset.filter;
  if (!kind) return;
  const s = V.state.catalog;
  if (kind === 'brand') {
    if (el.checked) s.brands.push(el.value); else s.brands = s.brands.filter((b) => b !== el.value);
  } else if (kind === 'cat') {
    if (el.checked) s.cats.push(el.value); else s.cats = s.cats.filter((c) => c !== el.value);
  } else if (kind === 'onlyDeals') {
    s.onlyDeals = el.checked;
  } else if (kind === 'min') { s.min = el.value; }
  else if (kind === 'max') { s.max = el.value; }
  else if (kind === 'sort') { s.sort = el.value; }
  V.renderResults(currentRoute.parts[1] || '', currentRoute.parts[0] === 'categoria' ? currentRoute.parts[1] : '', currentRoute.params.get('q') || '');
}

function resetFilters() {
  const s = V.state.catalog;
  s.brands = []; s.min = ''; s.max = ''; s.sort = 'rilevanza'; s.onlyDeals = false;
  if (currentRoute.parts[0] === 'category') s.cats = [];
  render();
}

/* ---------------- Categorie drawer (mobile) ---------------- */
function openMenu() {
  const d = document.getElementById('drawer');
  if (!d) return;
  const cats = [
    ['smartphone', 'Smartphone'], ['computer', 'Computer & Notebook'], ['audio', 'Cuffie & Audio'],
    ['smartwatch', 'Smartwatch'], ['tv', 'TV & Home Cinema'], ['console', 'Console'], ['videogiochi', 'Videogiochi'],
    ['scarpe', 'Sneakers & Scarpe'], ['abbigliamento', 'Abbigliamento'], ['occhiali', 'Occhiali & Sole'],
    ['profumi', 'Profumi'], ['skincare', 'Skincare'], ['elettrodomestici', 'Piccoli Elettrodomestici'],
    ['arredamento', 'Arredamento & Design'], ['auto', 'Auto & Moto Accessori'], ['sport', 'Sport & Fitness'],
  ];
  d.className = '';
  d.innerHTML = `<div class="drawer-backdrop" data-act="close-menu"></div>
    <div class="drawer-left">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <span style="font-weight:800;font-size:19px">Categorie</span>
        <button class="btn btn-soft btn-icon" data-act="close-menu" aria-label="Chiudi menu">${Ico.close(18)}</button></div>
      <a href="#/account" data-act="close-menu">${Ico.user(20)} Il mio account</a>
      <a href="#/ordini" data-act="close-menu">${Ico.box(20)} I miei ordini</a>
      <a href="#/wishlist" data-act="close-menu">${Ico.heart(20)} I miei preferiti</a>
      <a href="#/prodotti" data-act="close-menu">Tutti i prodotti</a>
      <a href="#/chi-siamo" data-act="close-menu">${Ico.spark(20)} Il progetto NotAStore</a>
      <a href="#/come-funziona" data-act="close-menu">${Ico.shield(20)} Come funziona</a>
      ${cats.map(([s, n]) => `<a href="#/categoria/${s}" data-act="close-menu" style="display:flex;width:100%;gap:12px;align-items:center;padding:12px 10px;border-radius:10px;font-size:15px;font-weight:600">${n}</a>`).join('')}
    </div>`;
  d.querySelector('button[data-act="close-menu"]')?.focus();
}

/* ---------------- Pagamento simulato ---------------- */
let paymentBusy = false;
async function placeOrder() {
  const btn = document.querySelector('[data-act="place"]');
  if (!btn || paymentBusy) return;
  paymentBusy = true;
  btn.disabled = true;
  const cardObj = store.card || { name: 'Carta virtuale', last4: '••••' };
  document.body.insertAdjacentHTML('beforeend', V.payOverlayHTML(Number(btn.dataset.total), cardObj));
  const overlay = document.getElementById('payOverlay');
  const dialog = overlay.querySelector('dialog');
  dialog.showModal();
  dialog.addEventListener('cancel', e => e.preventDefault());
  const icon = document.getElementById('payIcon');
  const title = document.getElementById('payTitle');
  const sub = document.getElementById('paySub');
  const addr = V.state.checkout.address;
  suppressRerender = true;
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const step = index => overlay.querySelectorAll('.payment-steps li').forEach((el, i) => {
    el.classList.toggle('complete', i < index);
    el.classList.toggle('active', i === index);
    if (i === index) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current');
  });
  const slow = setTimeout(() => { sub.textContent = 'La conferma richiede più tempo del previsto. Attendi l’esito senza ripetere l’acquisto.'; }, 8000);
  try {
    await wait(350);
    step(1);
    title.textContent = 'Elaborazione in corso';
    sub.textContent = 'Verifica del saldo virtuale e registrazione dell’ordine.';
    const result = await store.checkout(addr, V.state.checkout.ship);
    clearTimeout(slow);
    step(2);
    icon.className = 'pay-icon go'; icon.innerHTML = Ico.check(34);
    title.textContent = 'Pagamento confermato';
    sub.textContent = `${eur(result.order.total)} · Ordine ${result.order.id}`;
    dialog.setAttribute('aria-busy', 'false');
    await wait(1100);
    location.hash = '#/conferma/' + result.order.id;
  } catch (error) {
    clearTimeout(slow);
    dialog.setAttribute('aria-busy', 'false');
    icon.innerHTML = Ico.close(30);
    title.textContent = 'Pagamento non confermato';
    sub.textContent = error.status >= 400 && error.status < 500
      ? `${error.message} Nessun addebito virtuale effettuato.`
      : 'Non è stato possibile ricevere la conferma. Controlla i tuoi ordini prima di riprovare: la richiesta potrebbe essere stata registrata.';
    overlay.querySelector('.payment-steps .active').textContent = 'Non completato';
    const close = document.createElement('button');
    close.className = 'btn btn-primary'; close.textContent = 'Torna al riepilogo';
    dialog.append(close); close.focus();
    await new Promise(resolve => close.addEventListener('click', resolve, { once: true }));
  } finally {
    clearTimeout(slow);
    dialog.close(); overlay.remove();
    paymentBusy = false; suppressRerender = false; btn.disabled = false;
    if (btn.isConnected) btn.focus();
  }
}

/* ---------------- Eventi globali ---------------- */
document.addEventListener('submit', async (e) => {
  if (e.target.id === 'searchForm') {
    e.preventDefault();
    const q = document.getElementById('searchInput').value.trim();
    if (q) go('#/cerca?q=' + encodeURIComponent(q));
  }
  if (e.target.id === 'authForm') {
    e.preventDefault(); const form = new FormData(e.target); const payload = Object.fromEntries(form.entries()); const errorBox = document.getElementById('authError');
    try { if (e.target.dataset.mode === 'register') await store.register(payload); else await store.login(payload); go('#/account'); }
    catch (error) { if (errorBox) errorBox.textContent = error.message; }
  }
  if (e.target.id === 'addressForm') {
    e.preventDefault(); try { const address = await store.addAddress(Object.fromEntries(new FormData(e.target).entries())); V.state.checkout.address = address.id; render(); toast('Indirizzo salvato', '', 'ok'); } catch(error) { toast('Indirizzo non salvato', error.message, 'warn'); }
  }
});

document.addEventListener('input', (e) => {
  if (e.target.id === 'searchInput') onSearchInput(e);
});

document.addEventListener('change', (e) => {
  if (e.target.id === 'languageSelect') { setLanguage(e.target.value); return; }
  if (e.target.id === 'chartRange') {
    document.querySelectorAll('.custom-date').forEach((field) => field.classList.toggle('show', e.target.value === 'custom'));
    if (e.target.value !== 'custom') updateSpendChart();
    return;
  }
  if (e.target.matches('[data-cart-variant]')) {
    const index = Number(e.target.dataset.index); store.setVariantAt(index, e.target.dataset.name, e.target.value).then(() => updateCartLine(index));
    return;
  }
  if (e.target.dataset && e.target.dataset.filter) onFilterChange(e);
});

window.addEventListener('notastore:languagechange', render);
startLocalizationObserver();

document.addEventListener('click', async (e) => {
  const el = e.target.closest('[data-act]');
  // chiude il pannello ricerca cliccando fuori
  if (!e.target.closest('.hdr-search')) {
    const p = document.getElementById('searchPanel');
    if (p) { p.classList.add('page-hidden'); p.innerHTML = ''; }
  }
  if (!el) return;
  const act = el.dataset.act;
  const id = el.dataset.id;

  if (el.tagName === 'A' && act !== 'close-menu') return; // lascia navigare i link

  switch (act) {
    case 'current-card': {
      e.preventDefault();
      const level = store.levels.find((item) => item.level === Number(store.user?.level || 1)) || store.levels[0];
      if (!level) break;
      const shell = document.createElement('div'); shell.className = 'current-card-shell';
      shell.innerHTML = `<dialog class="current-card-dialog" aria-labelledby="currentCardTitle"><button class="current-card-close" data-act="close-current-card" aria-label="Chiudi">${Ico.close(19)}</button><div class="eyebrow">LA TUA CARTA ATTIVA · LIVELLO ${level.level}</div><h2 id="currentCardTitle" data-no-translate>${esc(level.name)}</h2><div class="current-card-preview">${activeCardVisual(level, 'current-card-large')}</div><div class="current-card-stats"><div><span>Saldo attuale</span><strong>${eur(store.wallet)}</strong></div><div><span>Livello</span><strong>${level.level} di ${store.levels.length}</strong></div><div><span>Spesa simulata</span><strong>${eur(store.stats.totalSpent)}</strong></div></div><p class="current-card-disclaimer">Carta e saldo sono esclusivamente virtuali e non hanno valore monetario reale.</p><a class="btn btn-dark btn-block" href="#/account/carte">Vedi tutte le carte</a></dialog>`;
      document.body.append(shell); const dialog = shell.querySelector('dialog'); dialog.addEventListener('close', () => shell.remove(), { once:true }); dialog.querySelector('a[href="#/account/carte"]')?.addEventListener('click', () => dialog.close(), { once:true }); dialog.showModal(); dialog.querySelector('.current-card-close').focus(); localizeDocument(dialog);
      break;
    }
    case 'close-current-card': { e.preventDefault(); el.closest('dialog')?.close(); break; }
    case 'close-menu': {
      const d = document.getElementById('drawer');
      if (d) { d.className = 'page-hidden'; d.innerHTML = ''; }
      break;
    }
    case 'menu': e.preventDefault(); openMenu(); break;
    case 'add': {
      e.preventDefault();
      const qty = Number(el.dataset.qty || 1);
      const product = byId(id);
      if (product && Object.keys(product.variants || {}).length && currentRoute.parts[0] !== 'prodotto') { go('#/prodotto/' + id); toast('Scegli le varianti', 'Seleziona le opzioni prima di aggiungere il prodotto', 'warn'); break; }
      if (product && !store.variantsComplete(product, V.state.product.variants)) { toast('Seleziona tutte le varianti', 'Completa le opzioni richieste', 'warn'); break; }
      const p = await store.add(id, qty, currentRoute.parts[0] === 'prodotto' ? V.state.product.variants : {});
      toast('Aggiunto al carrello', p ? p.name : '', 'ok');
      break;
    }
    case 'add-bundle': {
      e.preventDefault();
      store.add(id, 1);
      (el.dataset.bundle || '').split(',').filter(Boolean).forEach((x) => store.add(x, 1));
      toast('Bundle aggiunto al carrello', 'Tutti gli articoli sono nel carrello', 'ok');
      break;
    }
    case 'wish': {
      e.preventDefault();
      const added = await store.toggleWish(id);
      toast(added ? 'Aggiunto ai preferiti' : 'Rimosso dai preferiti', byId(id) ? byId(id).name : '', added ? 'ok' : 'warn');
      render();
      break;
    }
    case 'qinc': { e.preventDefault(); onQty(id, 1, el.dataset.index); break; }
    case 'qdec': { e.preventDefault(); onQty(id, -1, el.dataset.index); break; }
    case 'cart-remove': { e.preventDefault(); await store.remove(id); toast('Rimosso dal carrello', '', 'warn'); render(); break; }
    case 'cart-clear': { e.preventDefault(); await store.clear(); toast('Carrello svuotato', '', 'warn'); render(); break; }
    case 'sel-address': { e.preventDefault(); V.state.checkout.address = id; refreshPicks(el); break; }
    case 'sel-ship': { e.preventDefault(); V.state.checkout.ship = id; refreshPicks(el); break; }
    case 'sel-card': { e.preventDefault(); V.state.checkout.card = id; refreshPicks(el); break; }
    case 'tab': {
      e.preventDefault(); V.state.product.tab = el.dataset.tab;
      document.querySelectorAll('[data-act="tab"]').forEach((button) => button.classList.toggle('active', button === el));
      const template = document.getElementById(`pdp-tab-${el.dataset.tab}`); const body = document.getElementById('pdpTabBody');
      if (template && body) body.innerHTML = template.innerHTML;
      applyProductVariantUI();
      break;
    }
    case 'product-model': {
      e.preventDefault();
      const previous = byId(V.state.product.id); const product = byId(id);
      if (!product || product.family !== previous?.family) break;
      const choices = { ...V.state.product.variants }; const qty = V.state.product.qty;
      V.state.product.id = id;
      V.state.product.variants = Object.fromEntries(Object.entries(product.variants).map(([key, values]) => [key, values.includes(choices[key]) ? choices[key] : defaultVariants(product)[key]]));
      V.state.product.qty = qty;
      history.replaceState(null, '', '#/prodotto/' + id); currentRoute = parseHash();
      const page = V.product(id); const template = document.createElement('template'); template.innerHTML = page.html;
      const pdp = document.querySelector('.pdp');
      pdp.innerHTML = template.content.querySelector('.pdp').innerHTML;
      pdp.querySelectorAll('.rise, .rise-2, .rise-3').forEach((node) => { node.style.animation = 'none'; });
      applyProductVariantUI(); store.visit(id);
      break;
    }
    case 'variant': {
      e.preventDefault(); V.state.product.variants[el.dataset.name] = el.dataset.value;
      el.closest('.variant-options')?.querySelectorAll('.variant-option').forEach((button) => button.classList.toggle('on', button === el));
      const product = byId(currentRoute.parts[1]);
      if (product) {
        const price = variantPrice(product, V.state.product.variants); const listPrice = variantListPrice(product, V.state.product.variants);
        document.querySelectorAll('[data-product-price]').forEach((node) => { node.textContent = eur(price); });
        document.querySelectorAll('[data-product-list-price]').forEach((node) => { node.textContent = eur(listPrice); });
        document.querySelectorAll('[data-product-saving]').forEach((node) => { node.textContent = eur(listPrice-price); });
      }
      applyProductVariantUI();
      break;
    }
    case 'chart-apply': { e.preventDefault(); updateSpendChart(); break; }
    case 'order-toggle': {
      e.preventDefault();
      const body = document.querySelector(`[data-order="${id}"]`);
      if (body) body.classList.toggle('page-hidden');
      break;
    }
    case 'open-filters': {
      e.preventDefault();
      const d = document.getElementById('filterDrawer');
      if (d) d.classList.remove('page-hidden');
      break;
    }
    case 'close-filters': { e.preventDefault(); const d = document.getElementById('filterDrawer'); if (d) d.classList.add('page-hidden'); break; }
    case 'reset-filters': { e.preventDefault(); resetFilters(); break; }
    case 'place': { e.preventDefault(); if (!store.user) { go('#/login'); break; } await placeOrder(); break; }
    case 'logout': { e.preventDefault(); await store.logout(); go('#/'); toast('Sessione terminata', '', 'ok'); break; }
    case 'privacy': { await store.setLeaderboardPrivacy(el.checked); toast('Preferenza aggiornata', '', 'ok'); break; }
    case 'random-reward': { e.preventDefault(); const r = await store.randomReward(); render(); toast('Accredito generato', r.message, 'ok'); break; }
    case 'reward-checkin': {
      e.preventDefault(); el.disabled = true;
      try { const result = await store.rewardCheckIn(); render(); toast(result.alreadyCheckedIn ? 'Check-in già completato' : 'Streak aggiornata', `${result.rewardCenter.streak} giorni consecutivi`, 'ok'); }
      catch (error) { el.disabled = false; toast('Check-in non riuscito', error.message, 'warn'); }
      break;
    }
    case 'claim-streak': {
      e.preventDefault(); el.disabled = true;
      try { const result = await store.claimStreak(Number(el.dataset.milestone)); render(); toast('Premio streak inviato', `${eur(result.amount)} · link valido 24 ore`, 'ok'); }
      catch (error) { el.disabled = false; toast('Premio non disponibile', error.message, 'warn'); }
      break;
    }
    case 'reward-share': {
      e.preventDefault(); el.disabled = true;
      const text = `Su NotAStore ho simulato ${eur(store.stats.totalSpent)} di acquisti senza spendere denaro reale. Livello ${store.user.level} · ${store.card.name}.`;
      try {
        if (navigator.share) await navigator.share({ title: 'Il mio risultato NotAStore', text, url: 'https://notastore.shop' });
        else { await navigator.clipboard.writeText(`${text} https://notastore.shop`); toast('Testo copiato', 'Ora puoi incollarlo su Instagram o TikTok', 'ok'); }
        const result = await store.rewardShare(); render(); toast('Condivisione premiata', `${eur(result.amount)} inviati via email`, 'ok');
      } catch (error) { el.disabled = false; if (error.name !== 'AbortError') toast('Condivisione non completata', error.message, 'warn'); }
      break;
    }
    case 'social-code': {
      e.preventDefault(); const input = document.getElementById('socialRewardCode'); el.disabled = true;
      try { const result = await store.redeemSocialCode(input?.value || ''); render(); toast('Codice accettato', `${eur(result.amount)} inviati via email`, 'ok'); }
      catch (error) { el.disabled = false; toast('Codice non accettato', error.message, 'warn'); }
      break;
    }
    case 'copy-invite': {
      e.preventDefault(); const input = document.getElementById('inviteUrl');
      try { await navigator.clipboard.writeText(input?.value || ''); toast('Link copiato', 'Invialo alla persona che vuoi invitare', 'ok'); }
      catch { input?.select(); document.execCommand('copy'); toast('Link copiato', '', 'ok'); }
      break;
    }
    case 'check-referrals': {
      e.preventDefault(); el.disabled = true;
      try { const result = await store.checkReferrals(); render(); toast(result.completed ? 'Inviti completati' : 'Controllo completato', result.completed ? `${result.completed} premi inviati` : 'Nessun nuovo invito pronto', 'ok'); }
      catch (error) { el.disabled = false; toast('Controllo non riuscito', error.message, 'warn'); }
      break;
    }
    case 'resend-verification': {
      e.preventDefault(); el.disabled = true;
      try { await store.resendVerification(); toast('Email inviata', 'Il link di verifica è valido per 24 ore', 'ok'); }
      catch (error) { el.disabled = false; toast('Invio non riuscito', error.message, 'warn'); }
      break;
    }
    case 'admin-credit': {
      e.preventDefault(); const row = el.closest('[data-admin-user]'); const amount = Number(row?.querySelector('[data-admin-amount]')?.value || 0);
      el.disabled = true;
      try { const result = await store.adminCredit(id, amount); toast('Accredito inviato', result.delivery === 'internal' ? 'Disponibile nella posta demo per 24 ore' : 'Email inviata: link valido per 24 ore', 'ok'); row.querySelector('[data-admin-amount]').value = ''; }
      catch (error) { toast('Invio non riuscito', error.message, 'warn'); }
      finally { el.disabled = false; }
      break;
    }
    case 'admin-direct-credit': {
      e.preventDefault(); const row = el.closest('[data-admin-user]'); const amount = Number(row?.querySelector('[data-admin-direct-amount]')?.value || 0);
      el.disabled = true;
      try { const result = await store.adminDirectCredit(id, amount); row.querySelector('[data-admin-wallet]').value = result.wallet; row.querySelector('[data-admin-direct-amount]').value = ''; toast('Accredito completato', `${eur(result.amount)} aggiunti subito al saldo`, 'ok'); }
      catch (error) { toast('Accredito non riuscito', error.message, 'warn'); }
      finally { el.disabled = false; }
      break;
    }
    case 'admin-level': {
      e.preventDefault(); const row = el.closest('[data-admin-user]'); const level = Number(row?.querySelector('[data-admin-level]')?.value);
      el.disabled = true;
      try { const result = await store.adminSetLevel(id, level); toast('Livello aggiornato', `${result.card} · Livello ${result.level}`, 'ok'); }
      catch (error) { toast('Modifica non riuscita', error.message, 'warn'); }
      finally { el.disabled = false; }
      break;
    }
    case 'admin-metrics': {
      e.preventDefault(); const row = el.closest('[data-admin-user]'); const wallet = Number(row?.querySelector('[data-admin-wallet]')?.value); const totalSpent = Number(row?.querySelector('[data-admin-spent]')?.value);
      el.disabled = true;
      try { await store.adminSetMetrics(id, wallet, totalSpent); toast('Valori aggiornati', 'Saldo e spesa complessiva sono stati salvati', 'ok'); }
      catch (error) { toast('Modifica non riuscita', error.message, 'warn'); }
      finally { el.disabled = false; }
      break;
    }
    case 'unlock-card': {
      e.preventDefault(); el.disabled = true;
      try { const result = await store.unlockCard(Number(el.dataset.level)); render(); toast('Carta sbloccata', `${result.card} è ora la carta attiva`, 'ok'); }
      catch (error) { toast('Sblocco non disponibile', error.message, 'warn'); el.disabled = false; }
      break;
    }
    case 'card-requirements': {
      e.preventDefault();
      const threshold = Number(el.dataset.threshold); const spent = Number(el.dataset.spent); const missing = Number(el.dataset.missing);
      const shell = document.createElement('div'); shell.className = 'requirements-shell';
      shell.innerHTML = `<dialog class="requirements-dialog" aria-labelledby="requirementsTitle"><button class="requirements-close" data-act="close-requirements" aria-label="Chiudi">${Ico.close(18)}</button><div class="eyebrow">CARTA BLOCCATA · LIVELLO ${el.dataset.level}</div><h2 id="requirementsTitle">${esc(el.dataset.name)}</h2><p>Per sbloccare questa carta devi raggiungere la soglia di spesa virtuale richiesta.</p><div class="requirements-numbers"><div><span>Spesa complessiva</span><strong>${eur(spent)}</strong></div><div><span>Soglia richiesta</span><strong>${eur(threshold)}</strong></div><div class="missing"><span>Quanto manca</span><strong>${eur(missing)}</strong></div></div><div class="progress-track"><span style="width:${threshold ? Math.min(100,spent/threshold*100) : 100}%"></span></div><div class="requirements-tips"><strong>Come avvicinarti allo sblocco</strong><ul><li>Completa ordini simulati dal catalogo.</li><li>Configura i prodotti che desideri e aggiungili al carrello.</li><li>Ogni acquisto virtuale aumenta la spesa complessiva.</li></ul></div><button class="btn btn-dark btn-block" data-act="close-requirements">Ho capito</button></dialog>`;
      document.body.append(shell); const dialog = shell.querySelector('dialog'); dialog.addEventListener('close', () => shell.remove(), { once:true }); dialog.showModal(); dialog.querySelector('.requirements-close').focus();
      break;
    }
    case 'close-requirements': { e.preventDefault(); const dialog = el.closest('dialog'); dialog?.close(); dialog?.parentElement?.remove(); break; }
    case 'noop': { e.preventDefault(); toast('Funzione non disponibile nella demo', 'Questa è una simulazione', 'warn'); break; }
    default: break;
  }
});

async function onQty(id, delta, index) {
  if (currentRoute.parts[0] === 'prodotto') {
    const p = byId(currentRoute.parts[1]);
    const max = p && p.stock ? p.stock : 10;
    V.state.product.qty = Math.max(1, Math.min(max, V.state.product.qty + delta));
    const qtyNode = document.querySelector('.buybox .qty span');
    const addButton = document.querySelector('.buybox [data-act="add"]');
    if (qtyNode) qtyNode.textContent = V.state.product.qty;
    if (addButton) addButton.dataset.qty = V.state.product.qty;
  } else {
    const lineIndex = Number(index); const l = store.cart[lineIndex];
    if (l) await store.setQtyAt(lineIndex, l.qty + delta);
    const row = document.querySelector(`[data-cart-index="${lineIndex}"]`);
    if (row && l) { row.querySelector('.qty span').textContent = l.qty; row.querySelector('.cart-line-total').textContent = eur(variantPrice(byId(l.id), l.variants)*l.qty); }
    const subtotal = store.subtotal(); const shipping = subtotal >= 49 ? 0 : 4.99;
    document.querySelector('[data-cart-count]')?.replaceChildren(document.createTextNode(`Articoli (${store.count()})`));
    if (document.querySelector('[data-cart-subtotal]')) document.querySelector('[data-cart-subtotal]').textContent = new Intl.NumberFormat(currentLocale(),{style:'currency',currency:'EUR'}).format(subtotal);
    if (document.querySelector('[data-cart-total]')) document.querySelector('[data-cart-total]').textContent = new Intl.NumberFormat(currentLocale(),{style:'currency',currency:'EUR'}).format(subtotal+shipping);
  }
}

function updateCartLine(index) {
  const line = store.lines()[index]; const row = document.querySelector(`[data-cart-index="${index}"]`); if (!line || !row) return;
  row.querySelector('.cart-line-total').textContent = eur(line.unitPrice * line.qty);
  const subtotal = store.subtotal(); const shipping = subtotal >= 49 ? 0 : 4.99;
  if (document.querySelector('[data-cart-subtotal]')) document.querySelector('[data-cart-subtotal]').textContent = eur(subtotal);
  if (document.querySelector('[data-cart-total]')) document.querySelector('[data-cart-total]').textContent = eur(subtotal + shipping);
}

function applyProductVariantUI() {
  const product = byId(currentRoute.parts[1]); if (!product) return;
  const title = variantTitle(product, V.state.product.variants); document.querySelectorAll('[data-product-title]').forEach((node)=>node.textContent=title);
  const source = variantImage(product, V.state.product.variants);
  document.querySelectorAll('.gallery img, .mobile-product-preview img').forEach((image)=>{ image.src=source; image.style.filter='none'; image.alt=title; const frame=image.closest('.pimg'); if(frame) frame.dataset.photo=source; });
  for (const [name,value] of Object.entries(variantSpecs(product, V.state.product.variants))) { const row=document.querySelector(`[data-spec="${CSS.escape(name)}"] td:last-child`); if(row) row.textContent=value; }
  document.title = `${title} · NotAStore`;
}

function updateSpendChart() {
  const host = document.getElementById('spendChartData'); if (!host) return;
  const orders = JSON.parse(host.dataset.orders || '[]'); const range = document.getElementById('chartRange')?.value || 'all'; const now = new Date();
  let from = range === 'all' ? new Date(0) : new Date(now.getTime() - Number(range || 0) * 864e5); let to = now;
  if (range === 'custom') { from = new Date(document.getElementById('chartFrom').value || 0); to = new Date(document.getElementById('chartTo').value || now); to.setHours(23,59,59,999); }
  const filtered = orders.filter((o) => { const date = new Date(o.date); return date >= from && date <= to; });
  const monthly = !['7','custom'].includes(range); const grouped = new Map();
  filtered.forEach((order) => { const date = new Date(order.date); const key = monthly ? `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}` : date.toISOString().slice(0,10); grouped.set(key,(grouped.get(key)||0)+order.total); });
  const points = [...grouped.entries()].sort(([a],[b])=>a.localeCompare(b)).slice(-12).map(([date,total])=>({date,total})); const max = Math.max(...points.map(o=>o.total),1);
  document.querySelector('.spend-total').textContent = eur(filtered.reduce((sum,o)=>sum+o.total,0));
  host.innerHTML = points.length ? `<div class="spend-chart"><div class="y-axis"><span>${eur(max)}</span><span>${eur(max/2)}</span><span>€0</span></div><div class="plot">${points.map(o=>`<div class="bar-col"><strong>${eur(o.total)}</strong><div class="bar" style="height:${Math.max(8,o.total/max*100)}%"></div><span>${monthly?new Date(o.date+'-01').toLocaleDateString(currentLocale(),{month:'short',year:'2-digit'}):new Date(o.date).toLocaleDateString(currentLocale(),{day:'2-digit',month:'2-digit'})}</span></div>`).join('')}</div></div>` : '<div class="chart-empty">Nessuna spesa nel periodo selezionato.</div>';
}

function refreshPicks(el) {
  const group = el.parentElement;
  if (!group) return;
  Array.from(group.querySelectorAll('.pick')).forEach((p) => p.classList.remove('on'));
  el.classList.add('on');
  // aggiorna riepilogo (totale, spedizione, carta)
  const side = document.querySelector('.summary-side');
  if (side) { const scrollY = window.scrollY; render(); window.scrollTo(0, scrollY); }
}

/* ---------------- Avvio ---------------- */
await store.init();
currentRoute = parseHash();
if (!location.hash && ['/', '/preview', '/preview/'].includes(location.pathname)) location.hash = '#/';
render();

