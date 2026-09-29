const STORAGE_KEY = 'notastore_language';
const AUTO_CACHE_KEY = 'notastore_auto_translations_v3';

export const LANGUAGES = [
  { code: 'it', label: 'Italiano', short: 'IT' },
  { code: 'en', label: 'English', short: 'EN' },
];

const EN = {
  'Consegna a': 'Deliver to', 'Aggiungi indirizzo': 'Add address', 'Cerca prodotti': 'Search products',
  'Cerca su NotAStore — prodotti, marchi, categorie…': 'Search NotAStore — products, brands, categories…',
  'Classifica': 'Ranking', 'Accedi o': 'Sign in or', 'Registrati': 'Register', 'Lista': 'List',
  'Preferiti': 'Wishlist', 'Il mio': 'My', 'Carrello': 'Cart', 'Offerte del giorno': 'Today’s deals',
  'Cuffie & Audio': 'Headphones & Audio', 'Videogiochi': 'Video games', 'Sneakers & Scarpe': 'Sneakers & Shoes',
  'Abbigliamento': 'Clothing', 'Occhiali & Sole': 'Eyewear & Sunglasses', 'Piccoli Elettrodomestici': 'Small appliances',
  'Arredamento & Design': 'Furniture & Design', 'Auto & Moto Accessori': 'Car & Motorcycle Accessories', 'Sport & Fitness': 'Sports & Fitness',
  'Aggiungi': 'Add', 'Non disponibile': 'Unavailable', 'Aggiungi ai preferiti': 'Add to wishlist',
  'Shopping simulator digitale per tecnologia, moda e casa. Tutti i saldi, gli ordini e le carte sono esclusivamente virtuali.': 'A digital shopping simulator for technology, fashion and home. All balances, orders and cards are entirely virtual.',
  'Acquisti': 'Shopping', 'Tutti i prodotti': 'All products', 'Offerte': 'Deals', 'Il mio account': 'My account',
  'I miei ordini': 'My orders', 'Le mie carte': 'My cards', 'Wallet e statistiche': 'Wallet & statistics',
  'Assistenza': 'Support', 'Centro assistenza': 'Help center', 'Spedizioni e consegne': 'Shipping & delivery',
  'Resi e rimborsi': 'Returns & refunds', 'Traccia il tuo ordine': 'Track your order', 'Contattaci': 'Contact us',
  'Chi siamo': 'About us', 'Il progetto NotAStore': 'The NotAStore project', 'La nostra storia': 'Our story',
  'Come funziona': 'How it works', 'Termini e condizioni': 'Terms & conditions',
  'Marketplace simulato · Nessun acquisto o pagamento reale': 'Simulated marketplace · No real purchases or payments',
  'Questo sito è una simulazione di shopping.': 'This website is a shopping simulation.',
  'Nessun prodotto viene venduto, nessun ordine viene realmente effettuato e nessun pagamento viene elaborato. Non inserire dati bancari reali.': 'No product is sold, no order is actually placed and no payment is processed. Do not enter real banking details.',
  '© 2026 NotAStore — Progetto dimostrativo ideato e sviluppato da Michael. Tutti i marchi citati appartengono ai rispettivi proprietari e sono utilizzati a scopo puramente illustrativo. Prezzi e configurazioni sono basati su listini pubblici verificati; disponibilità e recensioni sono simulate.': '© 2026 NotAStore — Demonstration project conceived and developed by Michael. All trademarks belong to their respective owners and are used for illustrative purposes only. Prices and configurations are based on verified public price lists; availability and reviews are simulated.',
  'Scopri il prossimo desiderio': 'Discover your next desire', 'IN PRIMO PIANO / APPLE': 'FEATURED / APPLE',
  'Il tuo prossimo grande desiderio.': 'Your next big desire.', 'Scopri ogni dettaglio. Scegli il colore e la configurazione che senti tuoi.': 'Explore every detail. Choose the color and configuration that feel right for you.',
  'Scopri iPhone 18 Pro Max': 'Discover iPhone 18 Pro Max', 'Tutti gli smartphone': 'All smartphones',
  'Configura il tuo modello': 'Configure your model', 'Trova la tua prossima scoperta': 'Find your next discovery',
  'Tutto il catalogo': 'Full catalog', 'Fuori dall’ordinario.': 'Beyond ordinary.', 'La selezione NotAStore': 'The NotAStore selection',
  'Esplora': 'Explore', 'Un altro modo di ascoltare': 'A new way to listen', 'Meno rumore. Più spazio per te.': 'Less noise. More space for you.',
  'Scopri il prodotto': 'Discover the product', 'I più desiderati.': 'Most wanted.', 'Esplora i più popolari': 'Explore the most popular',
  'Non fermarti alla prima scoperta': 'Go beyond your first discovery', 'C’è un mondo da esplorare.': 'There’s a world to explore.',
  'Esplora il catalogo': 'Explore the catalog', 'Scopri le offerte': 'Discover deals', 'Catalogo completo': 'Full catalog',
  'Tutti i prodotti': 'All products', 'Filtri': 'Filters', 'Ordina per': 'Sort by', 'Rilevanza': 'Relevance',
  'Prezzo crescente': 'Price: low to high', 'Prezzo decrescente': 'Price: high to low', 'Più popolari': 'Most popular',
  'Brand': 'Brand', 'Categorie': 'Categories', 'Prezzo': 'Price', 'Solo offerte': 'Deals only', 'Reimposta filtri': 'Reset filters',
  'Descrizione': 'Description', 'Specifiche': 'Specifications', 'Recensioni': 'Reviews', 'Colore': 'Color', 'Memoria': 'Storage',
  'Quantità': 'Quantity', 'Aggiungi al carrello': 'Add to cart', 'Acquista ora': 'Buy now', 'Disponibile': 'In stock',
  'Consegna gratuita': 'Free delivery', 'Venduto e spedito da NotAStore': 'Sold and shipped by NotAStore',
  'Il tuo carrello': 'Your cart', 'Riepilogo ordine': 'Order summary', 'Subtotale': 'Subtotal', 'Consegna': 'Delivery',
  'Totale': 'Total', 'Vai al checkout': 'Proceed to checkout', 'Svuota carrello': 'Empty cart', 'Continua lo shopping': 'Continue shopping',
  'Checkout': 'Checkout', 'Indirizzo di consegna': 'Delivery address', 'Metodo di consegna': 'Delivery method',
  'Metodo di pagamento': 'Payment method', 'Conferma ordine': 'Place order', 'Ordine confermato': 'Order confirmed',
  'Articoli dell’ordine': 'Order items', 'I tuoi ordini': 'Your orders', 'Dettagli ordine': 'Order details',
  'Accedi': 'Sign in', 'Crea un account': 'Create an account', 'Email': 'Email', 'Password': 'Password',
  'Nome e cognome': 'Full name', 'Username': 'Username', 'Esci': 'Sign out', 'Salva': 'Save', 'Annulla': 'Cancel',
  'Dashboard': 'Dashboard', 'Movimenti': 'Transactions', 'Pagamenti': 'Payments', 'Indirizzi': 'Addresses',
  'Totale speso': 'Total spent', 'Saldo disponibile': 'Available balance', 'Ultimi movimenti': 'Latest transactions',
  'Ultimi ordini': 'Recent orders', 'Le tue spese': 'Your spending', 'Ultimi 7 giorni': 'Last 7 days',
  'Ultimi 30 giorni': 'Last 30 days', 'Quest’anno': 'This year', 'Personalizzato': 'Custom',
  'Nessun risultato': 'No results', 'Pagina non trovata': 'Page not found', 'Torna alla home': 'Back to home',
  'Suggerimenti': 'Suggestions', 'Rimosso dal carrello': 'Removed from cart', 'Carrello svuotato': 'Cart emptied',
  'Aggiunto al carrello': 'Added to cart', 'Scegli le varianti': 'Choose options', 'Seleziona tutte le varianti': 'Select all options',
  'Completa le opzioni richieste': 'Complete the required options', 'Indirizzo salvato': 'Address saved',
  'Privacy, spiegata bene.': 'Privacy, explained clearly.', 'TRASPARENZA, SENZA BUROCRATESE': 'TRANSPARENCY, WITHOUT LEGALESE',
  'Qui trovi quali dati usa davvero NotAStore, perché servono e quali scelte hai. La regola di fondo è semplice: raccogliere soltanto ciò che fa funzionare la simulazione.': 'Here you can see which data NotAStore actually uses, why it is needed and what choices you have. The principle is simple: collect only what makes the simulation work.',
  'Ultimo aggiornamento': 'Last updated', 'In breve': 'In short', 'Leggi anche i Termini': 'Read the Terms too',
  'Termini chiari. Niente sorprese.': 'Clear terms. No surprises.', 'LE REGOLE DELLA SIMULAZIONE': 'THE RULES OF THE SIMULATION',
  'Il punto essenziale': 'The essential point', 'Leggi la Privacy Policy': 'Read the Privacy Policy',
  'Che cos’è NotAStore': 'What NotAStore is', 'Nessuna vendita reale': 'No real sales', 'Account e dati inseriti': 'Accounts and entered data',
  'Saldo, carte e progressione': 'Balance, cards and progression', 'Catalogo, prezzi e contenuti': 'Catalog, prices and content',
  'Uso corretto': 'Acceptable use', 'Un aiuto, non una terapia': 'A tool, not therapy', 'Disponibilità e modifiche': 'Availability and changes',
  'Responsabilità': 'Liability', 'Aggiornamenti dei termini': 'Updates to these terms',
  'Comprare, senza comprare.': 'Shop, without buying.', 'IL PROGETTO NOTASTORE': 'THE NOTASTORE PROJECT',
  'Da dove arriva l\'idea': 'Where the idea came from', 'Piacere, Michael': 'Meet Michael',
  'Il desiderio resta. La spesa no.': 'Keep the desire. Skip the expense.', 'Prova NotAStore': 'Try NotAStore',
};

function detectedLanguage() {
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  if (LANGUAGES.some((language) => language.code === saved)) return saved;
  const locale = (typeof navigator !== 'undefined' ? (navigator.languages?.[0] || navigator.language) : 'it').toLowerCase();
  return locale.startsWith('it') ? 'it' : 'en';
}

let language = detectedLanguage();

export function getLanguage() { return language; }
export function languageOptions() {
  return LANGUAGES.map((item) => `<option value="${item.code}" ${item.code === language ? 'selected' : ''}>${item.code === 'en' ? 'EN' : 'IT'}</option>`).join('');
}
export function setLanguage(next) {
  if (!LANGUAGES.some((item) => item.code === next)) return;
  language = next;
  if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, next);
  if (typeof document !== 'undefined') document.documentElement.lang = next;
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('notastore:languagechange'));
}

function translated(value) {
  if (language === 'it' || !value) return value;
  const clean = value.replace(/\s+/g, ' ').trim();
  if (EN[clean]) return EN[clean];
  const seeAll = clean.match(/^Vedi tutti i risultati per “(.+)”$/);
  if (seeAll) return `See all results for “${seeAll[1]}”`;
  const hello = clean.match(/^Ciao, (.+)$/);
  if (hello) return `Hi, ${hello[1]}`;
  const from = clean.match(/^Da (.+)$/);
  if (from) return `From ${from[1]}`;
  const simulatedSpend = clean.match(/^Da (.+) di spesa simulata$/);
  if (simulatedSpend) return `From ${simulatedSpend[1]} in simulated spending`;
  const sources = Object.keys(EN).filter((source) => value.includes(source)).sort((a, b) => b.length - a.length);
  if (!sources.length) return value;
  const pattern = new RegExp(sources.map((source) => source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
  return value.replace(pattern, (source) => EN[source]);
}

const localizedTextNodes = new WeakSet();
const localizedAttrElements = new WeakSet();
let autoCache = {};
try { autoCache = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem(AUTO_CACHE_KEY) || '{}') : {}; } catch { autoCache = {}; }
const pendingAutomatic = new Map();
let automaticTimer;

function shouldAutoTranslate(value) {
  const clean = String(value || '').replace(/\s+/g, ' ').trim();
  if (clean.length < 3 || clean.length > 480 || /^(?:https?:\/\/|www\.|[^\s]+@[^\s]+$)/i.test(clean)) return false;
  if (!/[a-zàèéìòù]/i.test(clean) || /^[\d\s€$£%.,:+/·—–-]+$/.test(clean)) return false;
  const words = clean.match(/[a-zàèéìòù]+/gi) || [];
  if (words.length < 2 && !/[àèéìòù]/i.test(clean) && !likelyItalian(clean)) return false;
  return true;
}

function likelyItalian(value) {
  return /[àèéìòù]|\b(?:il|lo|la|gli|le|un|uno|una|di|del|della|dei|delle|che|per|con|senza|non|sono|sei|è|come|cosa|quando|quanto|puoi|posso|tuo|tua|mio|mia|ordine|carrello|prodotto|carta|saldo|spesa|acquisto|scegli|scopri|esplora|simulato|reale)\b/i.test(value);
}

function scheduleAutomaticTranslation(node, original, attribute = '') {
  if (language !== 'en' || !shouldAutoTranslate(original)) return;
  if (node.parentElement?.closest('.who,#indirizzi,.mail-item,[data-no-auto-translate]')) return;
  if (autoCache[original]) {
    if (attribute) node.setAttribute(attribute, autoCache[original]); else node.textContent = autoCache[original];
    return;
  }
  pendingAutomatic.set({ node, attribute }, original);
  clearTimeout(automaticTimer);
  automaticTimer = setTimeout(flushAutomaticTranslations, 90);
}

async function flushAutomaticTranslations() {
  const entries = [...pendingAutomatic.entries()].slice(0, 40);
  entries.forEach(([target]) => pendingAutomatic.delete(target));
  if (!entries.length || language !== 'en') return;
  const unique = [...new Set(entries.map(([, original]) => original))];
  try {
    const response = await fetch('/api/translate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ texts: unique, target: 'en' }) });
    if (!response.ok) return;
    const payload = await response.json();
    unique.forEach((source, index) => { const result = payload.translations?.[index]; if (result && result !== source) autoCache[source] = result; });
    entries.forEach(([target, source]) => {
      if (!target.node.isConnected || !autoCache[source]) return;
      if (target.attribute) target.node.setAttribute(target.attribute, autoCache[source]); else target.node.textContent = autoCache[source];
    });
    const limited = Object.fromEntries(Object.entries(autoCache).slice(-800));
    if (typeof localStorage !== 'undefined') localStorage.setItem(AUTO_CACHE_KEY, JSON.stringify(limited));
  } catch { /* Il dizionario curato resta il fallback offline. */ }
  if (pendingAutomatic.size) automaticTimer = setTimeout(flushAutomaticTranslations, 120);
}

function translateTextNode(node) {
  if (localizedTextNodes.has(node)) return;
  const original = node.textContent;
  const leading = original.match(/^\s*/)?.[0] || '';
  const trailing = original.match(/\s*$/)?.[0] || '';
  const result = translated(original);
  if (result !== original) node.textContent = leading + result.trim() + trailing;
  if (result === original || likelyItalian(result)) scheduleAutomaticTranslation(node, original.trim());
  localizedTextNodes.add(node);
}

export function localizeDocument(root = document) {
  document.documentElement.lang = language;
  if (language === 'it') return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.parentElement?.closest('script,style,code,[data-no-translate]') || !node.textContent.trim()
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(translateTextNode);
  root.querySelectorAll?.('[placeholder],[aria-label],[title]').forEach((element) => {
    if (localizedAttrElements.has(element)) return;
    ['placeholder', 'aria-label', 'title'].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      const original = element.getAttribute(attribute);
      const result = translated(original);
      element.setAttribute(attribute, result);
      if (result === original || likelyItalian(result)) scheduleAutomaticTranslation(element, original, attribute);
    });
    localizedAttrElements.add(element);
  });
}

let observer;
export function startLocalizationObserver() {
  if (observer) return;
  let scheduled = false;
  observer = new MutationObserver((mutations) => {
    if (language === 'it' || scheduled) return;
    const roots = mutations.map((mutation) => mutation.target.nodeType === Node.TEXT_NODE ? mutation.target.parentElement : mutation.target).filter(Boolean);
    scheduled = true;
    queueMicrotask(() => {
      observer.disconnect();
      [...new Set(roots)].forEach((root) => localizeDocument(root));
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
      scheduled = false;
    });
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
}

export function currentLocale() { return language === 'it' ? 'it-IT' : 'en-GB'; }
export function translateText(value) { return translated(value); }

Object.assign(EN, {
  'Più rilevanti':'Most relevant','Valutazione':'Rating','Più recensiti':'Most reviewed','Sconto maggiore':'Biggest discount','Azzera':'Clear',
  'Categoria':'Category','Marchio':'Brand','Solo in offerta':'Deals only','Mostra i risultati':'Show results','Risultati per':'Results for',
  'Sconti sensazionali':'Amazing savings','Le migliori occasioni selezionate, aggiornate ogni giorno.':'The best selected deals, updated every day.',
  'Nessun prodotto trovato':'No products found','Prova a modificare i filtri o a cercare un termine diverso.':'Try changing the filters or searching for a different term.',
  'Azzera i filtri':'Clear filters','Hai visto':'You have viewed','prodotti':'products','risultati':'results','filtri attivi':'active filters',
  'Prodotto non trovato':'Product not found','Il prodotto che stai cercando non è disponibile.':'The product you are looking for is not available.','Torna al catalogo':'Back to catalog',
  'Prodotto coerente con la scheda e le varianti selezionate':'Product matching the selected details and options','Ordine e consegna interamente simulati':'Order and delivery are entirely simulated',
  'Disponibilità immediata':'Immediate availability','Disponibilità standard':'Standard availability','Pagamento esclusivamente con saldo virtuale':'Payment exclusively with virtual balance',
  'Spedizioni':'Shipping','Marca':'Brand','Sottocategoria':'Subcategory','Disponibilità':'Availability','Esaurito':'Sold out','pezzi disponibili':'items available',
  'Standard — gratuito, consegna in 2-3 giorni lavorativi.':'Standard — free, delivered within 2–3 business days.','Prioritaria — €7,99, consegna il giorno successivo.':'Priority — €7.99, delivered the next day.',
  'Premium — inclusa con account Premium, consegna entro le 12:00.':'Premium — included with a Premium account, delivered by 12:00.','Resi — gratuiti entro 30 giorni, rimborso entro 5 giorni lavorativi.':'Returns — free within 30 days, refund within 5 business days.',
  'Nuovo nel catalogo':'New to the catalog','recensioni':'reviews','venduti':'sold','Prezzo IVA inclusa. Spedizione calcolata al checkout.':'Price includes VAT. Shipping calculated at checkout.',
  'Consegna prevista il':'Expected delivery on','se ordini entro le 16:00 di oggi.':'if you order by 4:00 pm today.','Risparmi':'You save','Solo':'Only','pezzi rimasti':'items left',
  'Spedizione':'Shipping','Gratuita':'Free','Venduto da':'Sold by','Modello':'Model','Diminuisci quantità':'Decrease quantity','Aumenta quantità':'Increase quantity',
  'Nei preferiti':'In wishlist','Transazione crittografata':'Encrypted transaction','Reso gratuito entro 30 giorni':'Free returns within 30 days','Garanzia ufficiale 24 mesi':'Official 24-month warranty',
  'Comprati spesso insieme':'Frequently bought together','Prezzo bundle':'Bundle price','Aggiungi i':'Add all','articoli':'items','Opinioni dei clienti':'Customer reviews',
  'recensioni verificate':'verified reviews','Acquisto verificato':'Verified purchase','Prodotti simili':'Similar products','Potrebbe piacerti anche':'You may also like',
  'La tua wishlist':'Your wishlist','I prodotti che salvi appariranno qui.':'Products you save will appear here.','Scopri i prodotti':'Discover products',
  'Il carrello è vuoto':'Your cart is empty','Aggiungi qualche prodotto per iniziare la tua simulazione.':'Add some products to begin your simulation.',
  'Rimuovi':'Remove','Configurazione':'Configuration','Aggiorna':'Update','Totale articoli':'Items total','Spedizione gratuita':'Free shipping',
  'Pagamento sicuro simulato':'Secure simulated payment','Nessun dato bancario reale richiesto.':'No real banking details required.',
  'I tuoi dati':'Your details','Nuovo indirizzo':'New address','Salva indirizzo':'Save address','Consegna standard':'Standard delivery','Consegna prioritaria':'Priority delivery',
  'Consegna premium':'Premium delivery','Carta virtuale':'Virtual card','Procedi al pagamento':'Proceed to payment','Confermando accetti i Termini. Nessun pagamento reale verrà elaborato.':'By confirming, you accept the Terms. No real payment will be processed.',
  'Elaborazione del pagamento':'Processing payment','Verifica del saldo virtuale':'Checking virtual balance','Autorizzazione della carta simulata':'Authorizing simulated card','Conferma dell’ordine':'Confirming order',
  'Pagamento autorizzato':'Payment authorized','Operazione non riuscita':'Operation failed','Riprova':'Try again','Ordine completato':'Order complete',
  'Grazie per il tuo ordine':'Thank you for your order','Il tuo ordine simulato è stato confermato.':'Your simulated order has been confirmed.','Numero ordine':'Order number',
  'Consegna stimata':'Estimated delivery','Torna agli ordini':'Back to orders','Dettagli':'Details','Stato ordine':'Order status','In elaborazione':'Processing','Consegnato':'Delivered',
  'Bentornato':'Welcome back','Crea il tuo account':'Create your account','Riceverai Postepay Livello 1 e 1.000 € di saldo virtuale.':'You will receive a Level 1 Postepay and €1,000 in virtual balance.',
  'Accedi al wallet, agli ordini e alla tua progressione.':'Sign in to your wallet, orders and progression.','Nome':'Name','Username pubblico':'Public username','Crea account':'Create account',
  'Hai già un account?':'Already have an account?','Non hai un account?':'Don’t have an account?','Benvenuto':'Welcome','Saldo virtuale':'Virtual balance',
  'Totale speso realmente nel simulatore':'Total actually spent in the simulator','Ordini':'Orders','Livello':'Level','Prossima carta':'Next card','Ti mancano':'You need',
  'di acquisti virtuali.':'in virtual purchases.','Hai raggiunto il livello massimo.':'You have reached the highest level.','Privacy classifica':'Leaderboard privacy',
  'Viene mostrato soltanto lo username pubblico.':'Only your public username is displayed.','Mostrami nella classifica pubblica':'Show me in the public leaderboard',
  'Progressione':'Progression','Saldo virtuale · Nessun valore monetario reale':'Virtual balance · No real monetary value','ATTIVA':'ACTIVE','SBLOCCATA':'UNLOCKED','BLOCCATA':'LOCKED','Sblocco':'Unlock at',
  'Il tuo andamento':'Your activity','Dashboard personale':'Personal dashboard','Dati calcolati dagli ordini virtuali persistenti del tuo account.':'Data calculated from the virtual orders saved in your account.',
  'Media per ordine':'Average per order','Categoria preferita':'Favourite category','Importi degli ordini nel periodo selezionato':'Order amounts for the selected period','Ultimi 3 mesi':'Last 3 months',
  'Ultimi 6 mesi':'Last 6 months','Ultimo anno':'Last year','Tutto':'All time','Periodo personalizzato':'Custom period','Dal':'From','Al':'To','Applica':'Apply',
  'Completa il primo acquisto per visualizzare il grafico.':'Complete your first purchase to view the chart.','Nessuna spesa nel periodo selezionato.':'No spending in the selected period.',
  'Gli accrediti pending non fanno parte del saldo disponibile.':'Pending credits are not included in the available balance.','Data':'Date','Tipo':'Type','Carta utilizzata':'Card used',
  'Importo':'Amount','Saldo precedente':'Previous balance','Saldo successivo':'New balance','Saldo iniziale':'Initial balance','Acquisto virtuale':'Virtual purchase','Accredito virtuale':'Virtual credit','Bonus nuova carta':'New card bonus',
  'Posta simulata':'Simulated inbox','Anteprima locale delle email transazionali. In produzione può essere collegata a un provider SMTP.':'Local preview of transactional emails. In production it can be connected to an SMTP provider.',
  'Nessuna email':'No email','Le comunicazioni NotAStore appariranno qui.':'NotAStore messages will appear here.','Torna all’account':'Back to account','Simula accredito casuale':'Simulate random credit',
  'Classifica globale':'Global ranking','Basata esclusivamente sulla valuta virtuale effettivamente spesa.':'Based exclusively on virtual currency actually spent.','Oggi':'Today','Settimana':'Week','Mese':'Month','Sempre':'All time',
  'La classifica è ancora vuota.':'The leaderboard is still empty.','Accredito ricevuto':'Credit received','Accredito già ricevuto':'Credit already received','Accredito non valido':'Invalid credit',
  'Il saldo virtuale è stato aggiornato.':'Your virtual balance has been updated.','Questo accredito era già stato aggiunto al saldo.':'This credit had already been added to the balance.',
  'Il collegamento non è valido o non è più disponibile.':'The link is invalid or no longer available.','Inizia a spendere':'Start shopping','Vai al wallet':'Go to wallet',
  'La pagina che cerchi non esiste o è stata spostata.':'The page you are looking for does not exist or has been moved.',
  'Intestatario':'Cardholder','Titolare':'Cardholder','Scadenza':'Expiry','Predefinita':'Default','Salvata':'Saved','Ultime 4':'Last 4','Aggiungi metodo':'Add payment method','Disabilitato nella demo':'Disabled in the demo',
  'Demo — non inserire dati reali':'Demo — do not enter real data','Metodi di pagamento':'Payment methods','carte salvate · gestite in modo sicuro, solo ultime quattro cifre visibili.':'saved cards · securely managed, only the last four digits are visible.',
  'Smartphone':'Smartphones','Computer & Notebook':'Computers & Laptops','Smartwatch':'Smartwatches','TV & Home Cinema':'TV & Home Cinema','Console':'Consoles','Profumi':'Fragrances','Skincare':'Skincare',
  'Scarpe':'Shoes','Bianco':'White','Nero':'Black','Argento':'Silver','Blu':'Blue','Viola':'Purple','Arancione':'Orange','Borgogna':'Burgundy','Ghiacciaio':'Glacier','Mezzanotte':'Midnight','Celeste':'Sky Blue','Galassia':'Starlight',
  'Il tuo prossimo':'Your next','grande desiderio.':'big desire.','Più spazio per te.':'More space for you.','consegna':'delivery','IN USCITA IL':'RELEASING ON',
  'Consigliati per te':'Recommended for you','CONSIGLIATI PER TE':'RECOMMENDED FOR YOU','Chi ha visto questo articolo ha visto anche':'Customers who viewed this item also viewed',
  'Qualità superiore':'Outstanding quality','Vale ogni euro':'Worth every euro','Ottimo, con qualche dettaglio':'Great, with one small caveat',
  'Prodotto impeccabile, imballaggio curato e consegna puntualissima. Lo riacquisterei senza esitazioni.':'Flawless product, carefully packaged and delivered right on time. I would buy it again without hesitation.',
  'Materiali di livello altissimo e resa migliore di quanto mi aspettassi dalle foto. Servizio clienti rapidissimo.':'Excellent materials and even better than I expected from the photos. Very fast customer service.',
  'Molto soddisfatto dell’acquisto. Unico neo: la confezione è arrivata con un angolo leggermente ammaccato.':'Very happy with the purchase. The only issue was a slightly dented corner on the packaging.',
  'Nessun pagamento reale, nessun dato bancario, nessuna pubblicità profilata.':'No real payments, no banking details, no targeted advertising.',
  'Una nota importante prima della pubblicazione':'An important note before publishing',
  'Questa informativa descrive l’attuale demo locale. Prima di mettere NotAStore online dovranno essere aggiunti un recapito privacy operativo e i dati completi del titolare, oltre ai dettagli dell’hosting effettivamente scelto.':'This notice describes the current local demo. Before NotAStore is published online, an active privacy contact, the controller’s full details and information about the chosen hosting provider must be added.',
  'Chi gestisce i dati':'Who manages the data','Il progetto è ideato e sviluppato da Michael, sviluppatore indipendente nelle Marche, che gestisce i dati trattati dalla demo NotAStore.':'The project was conceived and developed by Michael, an independent developer based in the Marche region, who manages the data processed by the NotAStore demo.',
  'Contatto privacy: da completare prima della pubblicazione online. Finché la demo resta locale, le richieste possono essere rivolte direttamente al gestore dell’istanza.':'Privacy contact: to be completed before online publication. While the demo remains local, requests can be addressed directly to the person managing the instance.',
  'Quali dati utilizziamo':'What data we use','Quando crei e usi un account, NotAStore può conservare:':'When you create and use an account, NotAStore may store:',
  'nome, username, email e password protetta tramite hash;':'name, username, email and a hashed password;','avatar, indirizzi inseriti e preferenze dell’account;':'avatar, entered addresses and account preferences;',
  'carrello, wishlist, prodotti visualizzati e configurazioni scelte;':'cart, wishlist, viewed products and selected configurations;','ordini, movimenti, saldo, livello e carte interamente virtuali;':'orders, transactions, balance, level and entirely virtual cards;',
  'stato di accesso e dati tecnici essenziali alla sicurezza del servizio.':'login status and technical data essential to service security.',
  'Non vengono richiesti né elaborati numeri di carte bancarie reali. Gli ultimi numeri mostrati sulle carte sono fittizi e non hanno valore finanziario.':'No real bank card numbers are requested or processed. The last digits shown on the cards are fictional and have no financial value.',
  'Perché servono':'Why they are needed','I dati sono usati per creare l’account, mantenere la sessione, salvare le scelte, simulare ordini e progressione, mostrare statistiche personali e proteggere la demo da usi impropri.':'The data is used to create your account, maintain your session, save choices, simulate orders and progression, display personal statistics and protect the demo from misuse.',
  'Le basi giuridiche applicabili sono l’esecuzione del servizio richiesto dall’utente e, per sicurezza e prevenzione degli abusi, il legittimo interesse del gestore. NotAStore non usa questi dati per marketing o profilazione pubblicitaria.':'The applicable legal bases are performance of the service requested by the user and, for security and abuse prevention, the operator’s legitimate interest. NotAStore does not use this data for marketing or advertising profiling.',
  'Cosa può essere visibile':'What may be visible','Se abiliti la leaderboard pubblica, username, livello, carta virtuale e totale simulato possono comparire nella classifica. Puoi disattivarla dalle impostazioni privacy dell’account.':'If you enable the public leaderboard, your username, level, virtual card and simulated total may appear in the ranking. You can disable it in your account privacy settings.',
  'Gli altri dati dell’account non vengono mostrati pubblicamente dalla demo.':'Other account data is not displayed publicly by the demo.','Dove e per quanto tempo':'Where and for how long',
  'Nell’attuale versione locale, i dati dell’account sono salvati nel database dell’istanza e restano disponibili fino alla cancellazione richiesta al gestore o al ripristino della demo. La sessione di accesso smette di essere valida dopo 30 giorni; il carrello ospite resta nel browser finché non vengono cancellati i dati del sito.':'In the current local version, account data is stored in the instance database and remains available until deletion is requested or the demo is reset. Login sessions expire after 30 days; the guest cart remains in the browser until site data is cleared.',
  'Se NotAStore verrà pubblicato online, tempi di conservazione, hosting e possibili backup saranno indicati qui prima del lancio.':'If NotAStore is published online, retention periods, hosting and any backups will be documented here before launch.',
  'Cookie e servizi esterni':'Cookies and external services','Cookie tecnico per mantenere l’accesso':'Technical cookie used to keep you signed in','Fino a 30 giorni':'Up to 30 days','Memoria locale per carrello e wishlist ospite':'Local storage for the guest cart and wishlist','Fino alla cancellazione dal browser':'Until cleared from the browser',
  'Non sono presenti cookie pubblicitari o analytics. Il browser può collegarsi a Google Fonts per caricare i caratteri grafici, trasmettendo i normali dati tecnici di connessione al relativo fornitore.':'No advertising or analytics cookies are used. The browser may connect to Google Fonts to load typefaces, transmitting standard connection data to that provider.',
  'Statistiche aggregate sull’utilizzo del sito, previo consenso':'Aggregate site usage statistics, subject to consent','Secondo le preferenze espresse nel banner CookieYes':'According to the preferences selected in the CookieYes banner',
  'Google Analytics 4 è gestito tramite CookieYes e Google Consent Mode. I cookie analitici vengono utilizzati solo dopo il consenso; senza consenso Google può ricevere segnali tecnici senza cookie, secondo il funzionamento del Consent Mode.':'Google Analytics 4 is managed through CookieYes and Google Consent Mode. Analytics cookies are used only after consent; without consent, Google may receive cookieless technical signals as part of Consent Mode.',
  'I tuoi diritti':'Your rights','Puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità quando applicabile e opposizione al trattamento. Puoi inoltre presentare reclamo al Garante per la protezione dei dati personali.':'You may request access, correction, deletion, restriction, portability where applicable and object to processing. You may also lodge a complaint with the Italian Data Protection Authority.',
  'Per l’attuale demo locale la richiesta va rivolta al gestore dell’istanza; prima della pubblicazione sarà indicato qui un canale dedicato e operativo.':'For the current local demo, requests should be addressed to the instance operator; a dedicated working channel will be listed here before publication.',
  'Sicurezza e buon senso':'Security and common sense','Le password non sono memorizzate in chiaro. La demo usa sessioni tecniche e limita l’accesso ai dati personali all’account interessato. Nessun sistema è però infallibile: non inserire dati bancari, documenti o informazioni sensibili nei campi liberi.':'Passwords are not stored in plain text. The demo uses technical sessions and restricts personal data access to the relevant account. No system is infallible: do not enter banking details, documents or sensitive information in free-text fields.',
  'Riferimenti':'References','Questa pagina è stata impostata seguendo i principi del':'This page was prepared following the principles of the','Regolamento generale sulla protezione dei dati (GDPR)':'General Data Protection Regulation (GDPR)','indicazioni del Garante sui cookie':'Italian Data Protection Authority’s cookie guidance','Non sostituisce una verifica legale professionale prima della pubblicazione.':'It does not replace professional legal review before publication.',
  'NotAStore ha l’aspetto di un e-commerce, ma non è un negozio. Questi termini spiegano cosa succede — e soprattutto cosa non succede — quando lo utilizzi.':'NotAStore looks like an online shop, but it is not a store. These terms explain what happens — and, more importantly, what does not happen — when you use it.',
  'Ogni acquisto, pagamento, consegna e rimborso è soltanto una simulazione.':'Every purchase, payment, delivery and refund is only a simulation.','Not a store. Davvero.':'Not a store. Really.',
  'Usando la demo riconosci che NotAStore non vende prodotti e che saldo, carte, ordini e movimenti non hanno alcun valore economico.':'By using the demo, you acknowledge that NotAStore does not sell products and that balances, cards, orders and transactions have no financial value.',
  'NotAStore è uno shopping simulator nato per offrire una pausa dall’acquisto impulsivo: permette di esplorare, configurare, aggiungere al carrello e completare ordini fittizi senza spendere denaro.':'NotAStore is a shopping simulator designed to offer a pause from impulse buying. You can explore, configure, add items to your cart and complete fictional orders without spending money.',
  'Non è una piattaforma di commercio elettronico, un intermediario, un servizio finanziario o uno strumento terapeutico.':'It is not an ecommerce platform, intermediary, financial service or therapeutic tool.',
  'La conferma di un ordine non crea un contratto di vendita. Nessun prodotto viene spedito, nessun pagamento viene riscosso e non esistono resi o rimborsi reali. Le schermate di consegna e processazione del pagamento sono parte dell’esperienza simulata.':'Confirming an order does not create a sales contract. No product is shipped, no payment is collected and there are no real returns or refunds. Delivery and payment-processing screens are part of the simulated experience.',
  'Se crei un account, sei responsabile della riservatezza delle credenziali e delle attività effettuate nella tua sessione. Usa informazioni appropriate alla demo e non inserire dati bancari, documenti, codici reali o contenuti di terzi.':'If you create an account, you are responsible for keeping your credentials confidential and for activity within your session. Use information appropriate for the demo and do not enter banking details, documents, real codes or third-party content.',
  'Il gestore può sospendere o rimuovere account usati per compromettere il servizio, accedere a dati altrui o interferire con la demo.':'The operator may suspend or remove accounts used to compromise the service, access other users’ data or interfere with the demo.',
  'Wallet, accrediti, cashback, livelli, ricompense e carte sono interamente virtuali. Non costituiscono moneta elettronica, credito, premio convertibile o promessa di pagamento e non possono essere prelevati, trasferiti o scambiati con denaro o beni.':'Wallets, credits, cashback, levels, rewards and cards are entirely virtual. They are not electronic money, credit, a convertible prize or a promise of payment, and cannot be withdrawn, transferred or exchanged for money or goods.',
  'Immagini, nomi, marchi e specifiche sono usati a scopo descrittivo e illustrativo. I marchi appartengono ai rispettivi titolari. Prezzi e configurazioni possono ispirarsi a informazioni pubbliche, ma disponibilità, recensioni, promozioni, tempi di consegna e stati d’ordine sono simulati e possono contenere inesattezze.':'Images, names, trademarks and specifications are used for descriptive and illustrative purposes. Trademarks belong to their respective owners. Prices and configurations may be based on public information, but availability, reviews, promotions, delivery times and order statuses are simulated and may be inaccurate.',
  'NotAStore non è affiliato, sponsorizzato o approvato dai produttori mostrati, salvo indicazione espressa.':'NotAStore is not affiliated with, sponsored or endorsed by the manufacturers shown unless expressly stated.',
  'Puoi usare NotAStore per finalità personali e dimostrative. Non puoi tentare accessi non autorizzati, alterare dati di altri utenti, sovraccaricare il servizio, automatizzare abusi o riutilizzare il progetto in modo da far credere che venda davvero i prodotti mostrati.':'You may use NotAStore for personal and demonstration purposes. You may not attempt unauthorized access, alter other users’ data, overload the service, automate abuse or reuse the project in a way that suggests it actually sells the products shown.',
  'Il progetto invita a rallentare il gesto d’acquisto, ma non offre diagnosi, consulenza psicologica o trattamento medico. Se lo shopping causa sofferenza, debiti o difficoltà nella vita quotidiana, è importante rivolgersi a una persona o a un professionista qualificato.':'The project encourages users to slow down the act of buying, but does not provide diagnosis, psychological advice or medical treatment. If shopping causes distress, debt or difficulty in everyday life, seek help from a trusted person or qualified professional.',
  'La demo può essere aggiornata, sospesa, ripristinata o modificata in qualunque momento, anche con perdita di dati virtuali. Le funzioni vengono offerte nello stato in cui si trovano, senza garanzia di continuità o assenza di errori.':'The demo may be updated, suspended, reset or modified at any time, including with loss of virtual data. Features are provided as they are, without guarantees of continuity or error-free operation.',
  'Nei limiti consentiti dalla legge, il gestore non risponde di decisioni di acquisto prese altrove, affidamento su prezzi o caratteristiche simulate, perdita di progressi virtuali o indisponibilità temporanea della demo. Restano sempre fermi i diritti che non possono essere esclusi per legge.':'To the extent permitted by law, the operator is not liable for purchasing decisions made elsewhere, reliance on simulated prices or features, loss of virtual progress or temporary unavailability of the demo. Rights that cannot legally be excluded remain unaffected.',
  'Questi termini possono cambiare insieme al progetto. La data in alto indica l’ultima revisione. In caso di modifiche importanti, la nuova versione sarà resa visibile all’interno del sito.':'These terms may change as the project evolves. The date above shows the latest revision. Important changes will be made visible within the website.',
  'In uscita il':'Releasing on','NotAStore sembra un e-commerce vero, ma non vende niente. È uno spazio in cui puoi vivere il gesto dello shopping, scegliere, configurare e ordinare, senza spendere denaro reale.':'NotAStore looks like a real ecommerce site, but it sells nothing. It is a space where you can experience shopping, choose, configure and order, without spending real money.',
  'Un negozio che non vuole venderti nulla.':'A store that does not want to sell you anything.','DA DOVE ARRIVA L’IDEA':'WHERE THE IDEA CAME FROM','Tutto è partito da un’idea diventata virale in Asia.':'It all started with an idea that went viral in Asia.',
  'L’idea era semplice: ricreare la soddisfazione del percorso d’acquisto senza arrivare a una spesa reale. Un modo per interrompere il gesto ripetuto dello shopping ossessivo-compulsivo, far passare l’impulso e capire se quell’oggetto lo si desidera davvero oppure se era solo il brivido del momento.':'The idea was simple: recreate the satisfaction of the shopping journey without making a real purchase. A way to interrupt compulsive shopping, let the impulse pass and understand whether you truly want the item or only the momentary thrill.',
  'Da lì è nato NotAStore: un finto marketplace costruito con la cura di uno vero. Ci sono prodotti, configurazioni, carrello, saldo, ordini e carte virtuali. Manca soltanto la parte in cui perdi soldi — ed è esattamente il punto.':'That is how NotAStore was born: a fictional marketplace built with the care of a real one. It has products, configurations, a cart, balance, orders and virtual cards. The only thing missing is the part where you lose money — and that is exactly the point.',
  'Un ragazzo delle Marche, un’idea un po’ fuori dagli schemi.':'A young developer from Marche with an unconventional idea.','Mi chiamo Michael, ho 21 anni e vivo in un piccolo paese delle Marche. Ho sviluppato NotAStore perché quell’idea arrivata dall’altra parte del mondo mi è sembrata troppo interessante per restare soltanto un trend.':'My name is Michael, I am 21 and live in a small town in the Marche region. I developed NotAStore because an idea from the other side of the world felt too interesting to remain just a trend.',
  'Volevo trasformarla in qualcosa di concreto, fatto bene e anche divertente da usare. Non una pagina che ti fa la morale, ma un posto che assomiglia allo shopping online e allo stesso tempo ti aiuta a prenderlo un po’ meno sul serio.':'I wanted to turn it into something tangible, carefully made and enjoyable to use. Not a page that lectures you, but a place that feels like online shopping while helping you take it a little less seriously.',
  '“Se alla fine chiudi il sito soddisfatto senza aver speso un euro, NotAStore ha fatto il suo lavoro.”':'“If you close the site feeling satisfied without spending a euro, NotAStore has done its job.”',
  'Il desiderio resta.':'Keep the desire.','La spesa no.':'Skip the expense.','Nessun pagamento reale, nessuna carta bancaria da inserire e nessun pacco che verrà spedito.':'No real payment, no bank card to enter and no parcel will be shipped.',
  'Sfoglia prodotti e novità come in un vero marketplace.':'Browse products and new releases just like in a real marketplace.','Scegli':'Choose','Configura colore, memoria, taglia e tutte le varianti.':'Configure the colour, storage, size and every available option.',
  'Simula':'Simulate','Completa l’ordine usando soltanto il saldo virtuale.':'Complete the order using only your virtual balance.','Fai una pausa':'Take a pause','Hai vissuto l’esperienza. Ora puoi capire se volevi davvero comprare.':'You have experienced the journey. Now you can decide whether you truly wanted to buy.',
  'Non è terapia. È un piccolo strumento digitale.':'It is not therapy. It is a small digital tool.','Più consapevolezza.':'More awareness.','Meno acquisti d’impulso.':'Fewer impulse purchases.',
  'NotAStore non sostituisce un aiuto professionale per chi vive un rapporto problematico con lo shopping. Vuole semplicemente offrire una pausa, rendere visibile il meccanismo dell’impulso e ricordare che si può desiderare qualcosa senza doverla possedere subito.':'NotAStore does not replace professional help for anyone with a problematic relationship with shopping. It simply offers a pause, makes the impulse mechanism visible and reminds us that we can want something without having to own it immediately.',
  'Il progetto è ideato e sviluppato da ':'The project was conceived and developed by ',', sviluppatore indipendente nelle Marche, che gestisce i dati trattati dalla demo NotAStore.':', an independent developer based in the Marche region, who manages the data processed by the NotAStore demo.',
  'Contatto privacy:':'Privacy contact:',' da completare prima della pubblicazione online. Finché la demo resta locale, le richieste possono essere rivolte direttamente al gestore dell’istanza.':' to be completed before online publication. While the demo remains local, requests can be addressed directly to the instance operator.',
  'Se abiliti la ':'If you enable the ',' pubblica, username, livello, carta virtuale e totale simulato possono comparire nella classifica. Puoi disattivarla dalle impostazioni privacy dell’account.':' public leaderboard, your username, level, virtual card and simulated total may appear in the ranking. You can disable it from your account privacy settings.',
  'leaderboard pubblica':'public leaderboard',', username, livello, carta virtuale e totale simulato possono comparire nella classifica. Puoi disattivarla dalle impostazioni privacy dell’account.':', your username, level, virtual card and simulated total may appear in the ranking. You can disable it from your account privacy settings.',
  "Non hai ancora aggiunto articoli. Dai un'occhiata alle offerte del giorno.":"You haven’t added any items yet. Take a look at today’s deals.",'Non ci sono articoli da pagare':'There are no items to pay for',
  'ordini simulati · tracciamento incluso per ogni spedizione.':'simulated orders · tracking included for every shipment.','ORDINE':'ORDER','Tutti gli ordini sono simulati: nessuna spedizione reale avverrà.':'All orders are simulated: no real shipment will take place.','Continua gli acquisti':'Continue shopping',
  'Credito virtuale NotAStore · Nessun valore monetario reale':'NotAStore virtual credit · No real monetary value',
  'Tutti gli smartphone':'All smartphones','In primo piano / Apple':'Featured / Apple',
  'Il tuo carrello è vuoto':'Your cart is empty','Nero siderale':'Space Black','Black siderale':'Space Black',
  'POTREBBERO INTERESSARTI':'YOU MAY ALSO LIKE','Appena uscito':'Just released','APPENA USCITO':'JUST RELEASED','Preordine':'Pre-order','PREORDINE':'PRE-ORDER','Bianco stellare':'Starlight White','White stellare':'Starlight White','Cuffie Noise Cancelling':'Noise-Cancelling Headphones','Titano':'Titanium','ottobre':'October',
  'Questa pagina è stata impostata seguendo i principi del ':'This page was prepared following the principles of the ',' e le ':' and the ','. Non sostituisce una verifica legale professionale prima della pubblicazione.':'. It does not replace professional legal review before publication.',
});

Object.assign(EN, {
  'COME FUNZIONA NOTASTORE':'HOW NOTASTORE WORKS','Inizia a esplorare':'Start exploring','Scopri la storia del progetto':'Discover the project story','Nessuna spesa reale':'No real spending',
  'IL TUO ORDINE':'YOUR ORDER','Esperienza':'Experience','Completa':'Complete','Denaro reale':'Real money','Nessun addebito. Nessun pacco.':'No charge. No parcel.','Solo una pausa fatta bene.':'Just a meaningful pause.','SIMULATO':'SIMULATED','REALE':'REAL',
  '01 / L’OBIETTIVO':'01 / THE GOAL','Mettere una pausa tra':'Put a pause between','l’impulso e l’acquisto.':'impulse and purchase.','A volte non vogliamo davvero un oggetto: vogliamo il percorso che porta a comprarlo. NotAStore ti lascia vivere quel percorso senza conseguenze economiche, così puoi capire se il desiderio rimane anche quando l’impulso è passato.':'Sometimes we do not truly want an object; we want the journey that leads to buying it. NotAStore lets you experience that journey without financial consequences, so you can see whether the desire remains after the impulse has passed.',
  '02 / IL PERCORSO':'02 / THE JOURNEY','Proprio come uno store.':'Just like a store.','Fino al punto giusto.':'Up to the right point.','Configura':'Configure','Simula l’ordine':'Simulate the order','Fermati un momento':'Pause for a moment',
  '03 / SENZA AMBIGUITÀ':'03 / NO AMBIGUITY','Cosa è reale.':'What is real.','Cosa non lo è.':'What is not.','La tua esperienza':'Your experience','Scelte e configurazioni':'Choices and configurations','Wishlist e cronologia':'Wishlist and history','Tempo dedicato a riflettere':'Time spent reflecting','Statistiche personali':'Personal statistics','Tutto il resto':'Everything else','Saldo e carte':'Balance and cards','Pagamenti e cashback':'Payments and cashback','Ordini e consegne':'Orders and deliveries','Prodotti ricevuti':'Products received',
  '04 / SALDO E ACCREDITI':'04 / BALANCE AND CREDITS','Soldi virtuali.':'Virtual money.','Regole chiare.':'Clear rules.','Un saldo per simulare':'A balance for the simulation','Accrediti protetti':'Protected credits',
  '05 / LIVELLI E CARTE':'05 / LEVELS AND CARDS','La progressione,':'Progression,','passo dopo passo.':'step by step.','Sblocca':'Unlock','Il punto di partenza':'The starting point','Inclusa':'Included','Una regola semplice:':'One simple rule:',
  '06 / IL TUO ACCOUNT':'06 / YOUR ACCOUNT','Apri la dashboard':'Open the dashboard','Le tue spese simulate':'Your simulated spending',
  '07 / PRIMA DI CHIUDERE':'07 / BEFORE YOU LEAVE','Tre domande valgono':'Three questions are worth','più di un altro acquisto.':'more than another purchase.','DOMANDE FREQUENTI':'FREQUENTLY ASKED QUESTIONS','Tutto quello che':'Everything you','serve sapere.':'need to know.','Mi verrà addebitato qualcosa?':'Will I be charged anything?','Posso usare NotAStore senza un account?':'Can I use NotAStore without an account?','Hai capito il meccanismo.':'You know how it works.','Ora prova a desiderare':'Now try wanting something','senza dover comprare.':'without having to buy it.'
  ,'L’esperienza è completa. Ora chiediti se vuoi ancora quell’oggetto o se l’impulso è già passato.':'The experience is complete. Now ask yourself whether you still want that item or whether the impulse has already passed.'
  ,'La dashboard raccoglie totale speso, grafici per periodo, movimenti e carta utilizzata. È la parte che trasforma una finta spesa in un’informazione utile sulle tue scelte.':'The dashboard brings together total spending, charts by period, transactions and the card used. It turns simulated spending into useful insight into your choices.'
  ,'Lo comprerei ancora tra 48 ore?':'Would I still buy it in 48 hours?','Mi serve davvero o voglio soltanto la sensazione di comprarlo?':'Do I truly need it, or do I only want the feeling of buying it?','Come mi sentirei vedendo la stessa cifra uscire dal conto reale?':'How would I feel seeing the same amount leave my real bank account?'
  ,'Riceverò i prodotti ordinati?':'Will I receive the products I order?','Il saldo virtuale può essere convertito?':'Can the virtual balance be converted?','NotAStore sostituisce un aiuto professionale?':'Does NotAStore replace professional support?'
});
