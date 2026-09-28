import { mountCardFinish } from './card-finish.js';
import {
  CATALOG as PRODUCTS, CATEGORIES, brands, byId, eur, discountPct, catName, deliveryDate, REVIEWS, familyModels,
  CARDS, ADDRESSES, SHIPPING, CARD_LABEL, variantPrice, variantListPrice, defaultVariants, variantTitle, variantImage,
} from './data.js?v=20260922c';
import { store } from './store.js?v=20260922c';
import { card, rail, crumbs, pageHead, imgTag, Ico, esc, skeleton } from './ui.js?v=20260922c';
import { currentLocale } from './i18n.js?v=20260925translate';

/* ---------------- stato locale delle pagine ---------------- */
export const state = {
  catalog: { brands: [], cats: [], min: '', max: '', sort: 'rilevanza', onlyDeals: false },
  checkout: { address: null, ship: 'std', card: null },
  product: { qty: 1, gi: 0, tab: 'descrizione', id: null, variants: {} },
};

function emptyBox(icon, title, text, btnLabel, btnHref) {
  return `<div class="empty panel"><div class="ic">${icon}</div><h3>${title}</h3><p>${text}</p>
    <a class="btn btn-primary btn-lg" href="#${btnHref}">${btnLabel}</a></div>`;
}

const CATEGORY_LIST = [
  ['smartphone', 'Smartphone'], ['computer', 'Computer & Notebook'], ['audio', 'Cuffie & Audio'],
  ['smartwatch', 'Smartwatch'], ['tv', 'TV & Home Cinema'], ['console', 'Console'], ['videogiochi', 'Videogiochi'],
  ['scarpe', 'Sneakers & Scarpe'], ['abbigliamento', 'Abbigliamento'], ['occhiali', 'Occhiali & Sole'],
  ['profumi', 'Profumi'], ['skincare', 'Skincare'], ['elettrodomestici', 'Piccoli Elettrodomestici'],
  ['arredamento', 'Arredamento & Design'], ['auto', 'Auto & Moto Accessori'], ['sport', 'Sport & Fitness'],
];

/* ================= HOME ================= */
export function home() {
  const hero = byId('sp-18pm');
  const selected = ['pc-06', 'au-08', 'sp-air', 'oc-03'].map(byId).filter(Boolean);
  const popular = [...PRODUCTS].sort((a,b) => b.sold-a.sold).slice(0,4);
  const audio = byId('au-08');
  const sections = (title, label, items, href = '/prodotti') => `<section class="edit-section wrap"><div class="edit-heading"><div><p class="edit-label">${label}</p><h2>${title}</h2></div><a class="edit-link" href="#${href}">Esplora ${Ico.chevron(16)}</a></div><div class="edit-products">${items.map(p=>card(p)).join('')}</div></section>`;
  return { title: 'NotAStore — Scopri il prossimo desiderio', html: `
    <div class="editorial-home">
      <section class="launch-hero wrap">
        <div class="launch-copy">
          <p class="edit-label"><span class="launch-dot"></span> In primo piano / Apple</p>
          <h1>Il tuo prossimo<br>grande desiderio.</h1>
          <p class="launch-model">iPhone 18 Pro Max.</p>
          <p class="launch-description">Scopri ogni dettaglio. Scegli il colore e la configurazione che senti tuoi.</p>
          <div class="launch-actions"><a class="btn btn-dark btn-lg" href="#/prodotto/${hero.id}">Scopri iPhone 18 Pro Max ${Ico.chevron(18)}</a><a class="edit-link" href="#/categoria/smartphone">Tutti gli smartphone</a></div>
          <div class="launch-price"><span>Da ${eur(hero.price)}</span><small>Configura il tuo modello</small></div>
        </div>
        <a class="launch-visual" href="#/prodotto/${hero.id}" aria-label="Scopri iPhone 18 Pro Max">
          <span class="launch-word" aria-hidden="true">Pro Max.</span>
          ${imgTag(hero).replace('loading="lazy"', 'loading="eager" fetchpriority="high"')}
          <span class="launch-caption">iPhone 18 Pro Max <span>Borgogna / 256 GB ${Ico.chevron(16)}</span></span>
        </a>
      </section>
      <nav class="department-line wrap" aria-label="Reparti">
        <span>Trova la tua prossima scoperta</span>
        <div>${[['smartphone','Smartphone'],['computer','Computer'],['audio','Audio'],['scarpe','Sneakers'],['profumi','Beauty'],['arredamento','Design']].map(([slug,name])=>`<a href="#/categoria/${slug}">${name} ${Ico.chevron(14)}</a>`).join('')}<a href="#/prodotti">Tutto il catalogo ${Ico.plus(14)}</a></div>
      </nav>
      ${sections('Fuori dall’ordinario.', 'La selezione NotAStore', selected)}
      <section class="audio-editorial wrap">
        <a class="audio-visual" href="#/prodotto/${audio.id}" aria-label="Scopri ${esc(audio.name)}">${imgTag(audio)}</a>
        <div class="audio-copy"><p class="edit-label">Un altro modo di ascoltare</p><h2>Meno rumore.<br>Più spazio per te.</h2><p>${esc(audio.name)}</p><a class="edit-link" href="#/prodotto/${audio.id}">Scopri il prodotto ${Ico.chevron(18)}</a></div>
      </section>
      ${sections('I più desiderati.', 'Esplora i più popolari', popular)}
      <section class="discover-end wrap"><p class="edit-label">Non fermarti alla prima scoperta</p><h2>C’è un mondo<br>da esplorare.</h2><a class="btn btn-dark btn-lg" href="#/prodotti">Esplora il catalogo ${Ico.chevron(18)}</a><a class="edit-link" href="#/offerte">Scopri le offerte</a></section>
    </div>` };
}

/* ================= CHI SIAMO ================= */
export function about() {
  const html = `<div class="about-page">
    <section class="about-hero wrap">
      <div class="about-kicker"><span></span> IL PROGETTO NOTASTORE</div>
      <div class="about-hero-grid">
        <div>
          <h1>Comprare,<br>senza comprare.</h1>
          <p class="about-lead">NotAStore sembra un e-commerce vero, ma non vende niente. È uno spazio in cui puoi vivere il gesto dello shopping, scegliere, configurare e ordinare, senza spendere denaro reale.</p>
          <a class="btn btn-dark btn-lg" href="#/prodotti">Entra nel catalogo ${Ico.chevron(18)}</a>
        </div>
        <div class="about-manifesto" aria-label="Il concetto di NotAStore">
          <div class="about-orbit about-orbit-one"></div><div class="about-orbit about-orbit-two"></div>
          <span class="about-not">NOT</span><span class="about-a">A</span><span class="about-store">STORE</span>
          <p>Un negozio che non vuole venderti nulla.</p>
        </div>
      </div>
    </section>

    <section class="about-origin" id="storia">
      <div class="wrap about-origin-grid">
        <div><div class="about-index">01</div><p class="about-label">Da dove arriva l'idea</p></div>
        <div>
          <h2>Tutto è partito da un’idea diventata virale in Asia.</h2>
          <div class="about-copy-cols">
            <p>L’idea era semplice: ricreare la soddisfazione del percorso d’acquisto senza arrivare a una spesa reale. Un modo per interrompere il gesto ripetuto dello shopping ossessivo-compulsivo, far passare l’impulso e capire se quell’oggetto lo si desidera davvero oppure se era solo il brivido del momento.</p>
            <p>Da lì è nato NotAStore: un finto marketplace costruito con la cura di uno vero. Ci sono prodotti, configurazioni, carrello, saldo, ordini e carte virtuali. Manca soltanto la parte in cui perdi soldi — ed è esattamente il punto.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="about-founder wrap">
      <div class="founder-mark" aria-hidden="true"><span>M</span><small>21</small></div>
      <div class="founder-copy">
        <div class="about-label">Piacere, Michael</div>
        <h2>Un ragazzo delle Marche, un’idea un po’ fuori dagli schemi.</h2>
        <p>Mi chiamo Michael, ho 21 anni e vivo in un piccolo paese delle Marche. Ho sviluppato NotAStore perché quell’idea arrivata dall’altra parte del mondo mi è sembrata troppo interessante per restare soltanto un trend.</p>
        <p>Volevo trasformarla in qualcosa di concreto, fatto bene e anche divertente da usare. Non una pagina che ti fa la morale, ma un posto che assomiglia allo shopping online e allo stesso tempo ti aiuta a prenderlo un po’ meno sul serio.</p>
        <blockquote>“Se alla fine chiudi il sito soddisfatto senza aver speso un euro, NotAStore ha fatto il suo lavoro.”</blockquote>
      </div>
    </section>

    <section class="about-how wrap" id="come-funziona">
      <div class="about-heading-row"><div><div class="about-label">Come funziona</div><h2>Il desiderio resta.<br>La spesa no.</h2></div><p>Nessun pagamento reale, nessuna carta bancaria da inserire e nessun pacco che verrà spedito.</p></div>
      <div class="about-steps">
        <article><span>01</span><h3>Esplora</h3><p>Sfoglia prodotti e novità come in un vero marketplace.</p></article>
        <article><span>02</span><h3>Scegli</h3><p>Configura colore, memoria, taglia e tutte le varianti.</p></article>
        <article><span>03</span><h3>Simula</h3><p>Completa l’ordine usando soltanto il saldo virtuale.</p></article>
        <article><span>04</span><h3>Fai una pausa</h3><p>Hai vissuto l’esperienza. Ora puoi capire se volevi davvero comprare.</p></article>
      </div>
    </section>

    <section class="about-purpose">
      <div class="wrap about-purpose-inner">
        <p>Non è terapia. È un piccolo strumento digitale.</p>
        <h2>Più consapevolezza.<br>Meno acquisti d’impulso.</h2>
        <p class="about-purpose-note">NotAStore non sostituisce un aiuto professionale per chi vive un rapporto problematico con lo shopping. Vuole semplicemente offrire una pausa, rendere visibile il meccanismo dell’impulso e ricordare che si può desiderare qualcosa senza doverla possedere subito.</p>
        <div class="about-purpose-actions"><a class="btn btn-primary btn-lg" href="#/prodotti">Prova NotAStore</a><a class="about-text-link" href="#/">Torna alla home ${Ico.chevron(17)}</a></div>
      </div>
    </section>
  </div>`;
  return { html, title: 'Chi siamo' };
}

/* ================= COME FUNZIONA ================= */
export function howItWorks() {
  const levels = (store.levels || []).map((level) => `
    <li class="guide-level guide-level-${esc(level.tone || 'dark')}">
      <span class="guide-level-number">${String(level.level).padStart(2, '0')}</span>
      <div><strong data-no-translate>${esc(level.name)}</strong><small>${level.threshold ? `Da ${eur(level.threshold)} di spesa simulata` : 'Il punto di partenza'}</small></div>
      <span class="guide-level-threshold">${level.threshold ? eur(level.threshold) : 'Inclusa'}</span>
    </li>`).join('');

  const html = `<div class="guide-page">
    <section class="guide-hero">
      <div class="wrap guide-hero-grid">
        <div class="guide-hero-copy">
          <p class="guide-kicker"><span></span> COME FUNZIONA NOTASTORE</p>
          <h1>Il desiderio resta.<br><em>La spesa no.</em></h1>
          <p>NotAStore ricrea l’esperienza di un grande e-commerce per aiutarti a rallentare l’acquisto d’impulso. Esplori, scegli e ordini davvero — ma il denaro, le carte e la consegna sono soltanto una simulazione.</p>
          <div class="guide-actions"><a class="btn btn-primary btn-lg" href="#/prodotti">Inizia a esplorare ${Ico.chevron(18)}</a><a href="#/chi-siamo">Scopri la storia del progetto</a></div>
        </div>
        <div class="guide-hero-object" aria-label="Nessuna spesa reale">
          <div class="guide-receipt">
            <span class="guide-receipt-mark">N</span>
            <small>IL TUO ORDINE</small>
            <div><span>Esperienza</span><strong>Completa</strong></div>
            <div><span>Denaro reale</span><strong>€ 0,00</strong></div>
            <p>Nessun addebito. Nessun pacco.<br>Solo una pausa fatta bene.</p>
          </div>
          <span class="guide-stamp">100%<br>SIMULATO</span>
        </div>
      </div>
    </section>

    <section class="guide-intro wrap">
      <p class="guide-section-index">01 / L’OBIETTIVO</p>
      <div><h2>Mettere una pausa tra<br>l’impulso e l’acquisto.</h2><p class="guide-big-copy">A volte non vogliamo davvero un oggetto: vogliamo il percorso che porta a comprarlo. NotAStore ti lascia vivere quel percorso senza conseguenze economiche, così puoi capire se il desiderio rimane anche quando l’impulso è passato.</p></div>
    </section>

    <section class="guide-flow">
      <div class="wrap">
        <div class="guide-section-head"><p class="guide-section-index">02 / IL PERCORSO</p><h2>Proprio come uno store.<br>Fino al punto giusto.</h2></div>
        <div class="guide-flow-grid">
          <article><span>01</span>${Ico.search(25)}<h3>Esplora</h3><p>Sfoglia prodotti, offerte e categorie. Salva ciò che ti piace e confronta le alternative.</p></article>
          <article><span>02</span>${Ico.gear(25)}<h3>Configura</h3><p>Scegli modello, colore, memoria, taglia e quantità proprio come in un e-commerce reale.</p></article>
          <article><span>03</span>${Ico.cart(25)}<h3>Simula l’ordine</h3><p>Usa il saldo e la carta virtuale. Il pagamento viene processato, ma nessun euro viene addebitato.</p></article>
          <article><span>04</span>${Ico.check(25)}<h3>Fermati un momento</h3><p>L’esperienza è completa. Ora chiediti se vuoi ancora quell’oggetto o se l’impulso è già passato.</p></article>
        </div>
      </div>
    </section>

    <section class="guide-truth wrap">
      <div class="guide-truth-copy"><p class="guide-section-index">03 / SENZA AMBIGUITÀ</p><h2>Cosa è reale.<br>Cosa non lo è.</h2><p>Il catalogo è costruito per sembrare credibile. Il risultato economico, invece, non lascia spazio a dubbi.</p></div>
      <div class="guide-truth-board">
        <article class="guide-real"><span>REALE</span><h3>La tua esperienza</h3><ul><li>${Ico.check(17)} Scelte e configurazioni</li><li>${Ico.check(17)} Wishlist e cronologia</li><li>${Ico.check(17)} Tempo dedicato a riflettere</li><li>${Ico.check(17)} Statistiche personali</li></ul></article>
        <article class="guide-simulated"><span>SIMULATO</span><h3>Tutto il resto</h3><ul><li>${Ico.close(17)} Saldo e carte</li><li>${Ico.close(17)} Pagamenti e cashback</li><li>${Ico.close(17)} Ordini e consegne</li><li>${Ico.close(17)} Prodotti ricevuti</li></ul></article>
      </div>
    </section>

    <section class="guide-wallet">
      <div class="wrap guide-wallet-grid">
        <div><p class="guide-section-index">04 / SALDO E ACCREDITI</p><h2>Soldi virtuali.<br>Regole chiare.</h2><p>Il wallet serve soltanto a rendere credibile la simulazione. Non è denaro elettronico, non si può prelevare e non può essere convertito in beni reali.</p></div>
        <div class="guide-wallet-list">
          <article><span>${Ico.card(22)}</span><div><h3>Un saldo per simulare</h3><p>Ogni ordine scala il totale dal wallet e compare nei movimenti con la carta utilizzata.</p></div></article>
          <article><span>${Ico.shield(22)}</span><div><h3>Accrediti protetti</h3><p>Per gli account normali il link arriva nell’email reale, è personale, utilizzabile una sola volta e scade dopo 24 ore.</p></div></article>
        </div>
      </div>
    </section>

    <section class="guide-levels wrap">
      <div class="guide-levels-head"><div><p class="guide-section-index">05 / LIVELLI E CARTE</p><h2>La progressione,<br>passo dopo passo.</h2></div><p>La spesa complessiva nel simulatore apre il livello successivo. Quando raggiungi la soglia compare <strong>Sblocca</strong>: le carte vanno ottenute in ordine, una alla volta.</p></div>
      <ol class="guide-level-list">${levels || '<li class="guide-level"><div><strong>I livelli saranno visibili dopo il caricamento.</strong></div></li>'}</ol>
      <div class="guide-level-note"><span>${Ico.lock(20)}</span><p><strong>Una regola semplice:</strong> se il livello viene ridotto, le carte superiori tornano bloccate. Se non hai ancora i requisiti, NotAStore ti mostra la soglia, quanto manca e alcuni consigli — senza scorciatoie nascoste.</p></div>
    </section>

    <section class="guide-account">
      <div class="wrap guide-account-grid">
        <div class="guide-account-visual" aria-hidden="true"><div class="guide-chart"><i style="--h:28%"></i><i style="--h:52%"></i><i style="--h:38%"></i><i style="--h:78%"></i><i style="--h:61%"></i><i style="--h:92%"></i></div><span>Le tue spese simulate</span></div>
        <div><p class="guide-section-index">06 / IL TUO ACCOUNT</p><h2>Guarda le tue abitudini, non soltanto gli ordini.</h2><p>La dashboard raccoglie totale speso, grafici per periodo, movimenti e carta utilizzata. È la parte che trasforma una finta spesa in un’informazione utile sulle tue scelte.</p><a class="guide-text-link" href="#/account/dashboard">Apri la dashboard ${Ico.chevron(17)}</a></div>
      </div>
    </section>

    <section class="guide-pause wrap">
      <p class="guide-section-index">07 / PRIMA DI CHIUDERE</p><h2>Tre domande valgono<br>più di un altro acquisto.</h2>
      <div class="guide-questions"><article><span>01</span><p>Lo comprerei ancora tra 48 ore?</p></article><article><span>02</span><p>Mi serve davvero o voglio soltanto la sensazione di comprarlo?</p></article><article><span>03</span><p>Come mi sentirei vedendo la stessa cifra uscire dal conto reale?</p></article></div>
    </section>

    <section class="guide-faq wrap">
      <div><p class="guide-section-index">DOMANDE FREQUENTI</p><h2>Tutto quello che<br>serve sapere.</h2></div>
      <div class="guide-faq-list">
        <details><summary>Mi verrà addebitato qualcosa? <span>${Ico.plus(18)}</span></summary><p>No. NotAStore non chiede dati bancari e non elabora pagamenti reali.</p></details>
        <details><summary>Riceverò i prodotti ordinati? <span>${Ico.plus(18)}</span></summary><p>No. Ordini, spedizioni e date di consegna fanno parte della simulazione.</p></details>
        <details><summary>Il saldo virtuale può essere convertito? <span>${Ico.plus(18)}</span></summary><p>No. Non ha valore economico, non può essere trasferito, prelevato o convertito.</p></details>
        <details><summary>NotAStore sostituisce un aiuto professionale? <span>${Ico.plus(18)}</span></summary><p>No. È uno strumento di consapevolezza, non una terapia. Se lo shopping causa sofferenza o debiti, parlane con una persona fidata o un professionista qualificato.</p></details>
        <details><summary>Posso usare NotAStore senza un account? <span>${Ico.plus(18)}</span></summary><p>Sì. Puoi esplorare il catalogo e preparare il carrello liberamente. L’account serve per completare gli ordini simulati e conservare progressi, carte e statistiche.</p></details>
      </div>
    </section>

    <section class="guide-cta"><div class="wrap"><p>Hai capito il meccanismo.</p><h2>Ora prova a desiderare<br>senza dover comprare.</h2><div><a class="btn btn-primary btn-lg" href="#/prodotti">Esplora il catalogo ${Ico.chevron(18)}</a><a href="#/registrazione">Crea un account</a></div><small>NotAStore non è un servizio medico o terapeutico. Nessun prodotto viene venduto.</small></div></section>
  </div>`;
  return { html, title: 'Come funziona' };
}

/* ================= INFORMAZIONI LEGALI ================= */
function legalHero(kicker, title, intro, active) {
  return `<section class="legal-hero"><div class="wrap legal-hero-inner">
    <div><p class="legal-kicker">${kicker}</p><h1>${title}</h1><p>${intro}</p></div>
    <nav class="legal-switch" aria-label="Pagine legali">
      <a class="${active === 'privacy' ? 'active' : ''}" href="#/privacy">Privacy Policy</a>
      <a class="${active === 'termini' ? 'active' : ''}" href="#/termini">Termini e condizioni</a>
    </nav>
  </div></section>`;
}

function legalSection(index, id, title, content) {
  return `<section class="legal-section" id="${id}"><span class="legal-index">${index}</span><div><h2>${title}</h2>${content}</div></section>`;
}

export function privacyPolicy() {
  const html = `<div class="legal-page">
    ${legalHero('TRASPARENZA, SENZA BUROCRATESE', 'Privacy, spiegata bene.', 'Qui trovi quali dati usa davvero NotAStore, perché servono e quali scelte hai. La regola di fondo è semplice: raccogliere soltanto ciò che fa funzionare la simulazione.', 'privacy')}
    <div class="wrap legal-layout">
      <aside class="legal-aside">
        <p class="legal-date">Ultimo aggiornamento<br><strong>26 settembre 2026</strong></p>
        <div class="legal-summary"><strong>In breve</strong><p>Nessun pagamento reale, nessun dato bancario, nessuna pubblicità profilata.</p></div>
        <a href="#/termini">Leggi anche i Termini ${Ico.chevron(15)}</a>
      </aside>
      <main class="legal-document">
        <div class="legal-notice"><strong>Un progetto indipendente e trasparente</strong><p>NotAStore è un simulatore di shopping: non vende prodotti, non gestisce pagamenti reali e non richiede dati bancari. Questa informativa descrive i dati necessari per offrire e proteggere il servizio online.</p></div>
        ${legalSection('01','titolare','Chi gestisce i dati',`<p>NotAStore è un progetto indipendente ideato e sviluppato da <strong>Michael</strong>, nelle Marche, che gestisce i dati trattati dal servizio.</p><p>Per informazioni, richieste privacy, accesso, rettifica o cancellazione dei dati puoi scrivere a <a href="mailto:info@notastore.shop"><strong>info@notastore.shop</strong></a>.</p>`)}
        ${legalSection('02','dati','Quali dati utilizziamo',`<p>Quando crei e usi un account, NotAStore può conservare:</p><ul><li>nome, username, email e password protetta tramite hash;</li><li>avatar, indirizzi inseriti e preferenze dell’account;</li><li>carrello, wishlist, prodotti visualizzati e configurazioni scelte;</li><li>ordini, movimenti, saldo, livello e carte interamente virtuali;</li><li>check-in, streak, premi social, codici campagna e stato degli inviti;</li><li>stato di accesso e dati tecnici essenziali alla sicurezza del servizio.</li></ul><p>Non vengono richiesti né elaborati numeri di carte bancarie reali. Gli ultimi numeri mostrati sulle carte sono fittizi e non hanno valore finanziario.</p>`)}
        ${legalSection('03','finalita','Perché servono',`<p>I dati sono usati per creare l’account, mantenere la sessione, salvare le scelte, simulare ordini e progressione, mostrare statistiche personali, gestire ricompense e inviti e proteggere il servizio da usi impropri.</p><p>Quando usi il pulsante di condivisione, NotAStore prepara il testo e apre il menu di condivisione del dispositivo; non riceve conferma del social scelto né accesso al tuo account social. Le basi giuridiche applicabili sono l’esecuzione del servizio richiesto dall’utente e, per sicurezza e prevenzione degli abusi, il legittimo interesse del gestore. NotAStore non usa questi dati per marketing o profilazione pubblicitaria.</p>`)}
        ${legalSection('04','visibilita','Cosa può essere visibile',`<p>Se abiliti la <strong>leaderboard pubblica</strong>, username, livello, carta virtuale e totale simulato possono comparire nella classifica. Puoi disattivarla dalle impostazioni privacy dell’account.</p><p>Gli altri dati dell’account non vengono mostrati pubblicamente dalla demo.</p>`)}
        ${legalSection('05','conservazione','Dove e per quanto tempo',`<p>Render ospita l’applicazione, mentre i dati persistenti dell’account sono conservati nel database Supabase utilizzato da NotAStore per tutta la durata dell’account. Le sessioni scadono dopo 30 giorni; il carrello ospite rimane nel browser finché non cancelli i dati del sito.</p><p>Puoi chiedere la cancellazione scrivendo a <a href="mailto:info@notastore.shop">info@notastore.shop</a>. La richiesta viene gestita entro 30 giorni. Il piano gratuito attuale non include copie di sicurezza automatiche del database: il gestore può effettuare esportazioni di sicurezza manuali protette.</p>`)}
        ${legalSection('06','cookie','Cookie e servizi esterni',`<div class="legal-table-wrap"><table class="legal-table"><thead><tr><th>Strumento</th><th>Scopo</th><th>Durata</th></tr></thead><tbody><tr><td><code>__Host-nas_session</code></td><td>Cookie tecnico per mantenere l’accesso</td><td>Fino a 30 giorni</td></tr><tr><td><code>notastore_guest_v1</code></td><td>Memoria locale per carrello e wishlist ospite</td><td>Fino alla cancellazione dal browser</td></tr></tbody></table></div><p>Non sono presenti cookie pubblicitari o analytics. Render ospita l’applicazione, Supabase conserva il database, Resend invia le email transazionali, Cloudflare gestisce DNS, sicurezza e distribuzione del sito e Register.it gestisce le caselle email del dominio. Google Fonts fornisce i caratteri grafici. Quando selezioni l’inglese, le sole stringhe generiche dell’interfaccia non presenti nella cache possono essere inviate a MyMemory per la traduzione automatica; campi account, indirizzi ed email sono esclusi.</p>`)}
        ${legalSection('07','diritti','I tuoi diritti',`<p>Puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità quando applicabile e opposizione al trattamento. Puoi inoltre presentare reclamo al Garante per la protezione dei dati personali.</p><p>Per esercitare questi diritti o fare una domanda scrivi a <a href="mailto:info@notastore.shop"><strong>info@notastore.shop</strong></a>.</p>`)}
        ${legalSection('08','sicurezza','Sicurezza e buon senso',`<p>Le password non sono memorizzate in chiaro. La demo usa sessioni tecniche e limita l’accesso ai dati personali all’account interessato. Nessun sistema è però infallibile: non inserire dati bancari, documenti o informazioni sensibili nei campi liberi.</p>`)}
        ${legalSection('09','fonti','Riferimenti',`<p>Questa pagina è stata impostata seguendo i principi del <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj/?locale=it" target="_blank" rel="noopener noreferrer">Regolamento generale sulla protezione dei dati (GDPR)</a> e le <a href="https://www.garanteprivacy.it/faq/cookie" target="_blank" rel="noopener noreferrer">indicazioni del Garante sui cookie</a>. Non sostituisce una verifica legale professionale prima della pubblicazione.</p>`)}
      </main>
    </div>
  </div>`;
  return { html, title: 'Privacy Policy' };
}

export function terms() {
  const html = `<div class="legal-page">
    ${legalHero('LE REGOLE DELLA SIMULAZIONE', 'Termini chiari. Niente sorprese.', 'NotAStore ha l’aspetto di un e-commerce, ma non è un negozio. Questi termini spiegano cosa succede — e soprattutto cosa non succede — quando lo utilizzi.', 'termini')}
    <div class="wrap legal-layout">
      <aside class="legal-aside">
        <p class="legal-date">Ultimo aggiornamento<br><strong>26 settembre 2026</strong></p>
        <div class="legal-summary"><strong>Il punto essenziale</strong><p>Ogni acquisto, pagamento, consegna e rimborso è soltanto una simulazione.</p></div>
        <a href="#/privacy">Leggi la Privacy Policy ${Ico.chevron(15)}</a>
      </aside>
      <main class="legal-document">
        <div class="legal-notice legal-notice-dark"><strong>Not a store. Davvero.</strong><p>Usando la demo riconosci che NotAStore non vende prodotti e che saldo, carte, ordini e movimenti non hanno alcun valore economico.</p></div>
        ${legalSection('01','servizio','Che cos’è NotAStore',`<p>NotAStore è uno shopping simulator nato per offrire una pausa dall’acquisto impulsivo: permette di esplorare, configurare, aggiungere al carrello e completare ordini fittizi senza spendere denaro.</p><p>Non è una piattaforma di commercio elettronico, un intermediario, un servizio finanziario o uno strumento terapeutico.</p>`)}
        ${legalSection('02','acquisti','Nessuna vendita reale',`<p>La conferma di un ordine non crea un contratto di vendita. Nessun prodotto viene spedito, nessun pagamento viene riscosso e non esistono resi o rimborsi reali. Le schermate di consegna e processazione del pagamento sono parte dell’esperienza simulata.</p>`)}
        ${legalSection('03','account','Account e dati inseriti',`<p>Se crei un account, sei responsabile della riservatezza delle credenziali e delle attività effettuate nella tua sessione. Usa informazioni appropriate alla demo e non inserire dati bancari, documenti, codici reali o contenuti di terzi.</p><p>Il gestore può sospendere o rimuovere account usati per compromettere il servizio, accedere a dati altrui o interferire con la demo.</p>`)}
        ${legalSection('04','virtuale','Saldo, carte e progressione',`<p>Wallet, accrediti, cashback, livelli, ricompense e carte sono interamente virtuali. Non costituiscono moneta elettronica, credito, premio convertibile o promessa di pagamento e non possono essere prelevati, trasferiti o scambiati con denaro o beni.</p>`)}
        ${legalSection('05','catalogo','Catalogo, prezzi e contenuti',`<p>Immagini, nomi, marchi e specifiche sono usati a scopo descrittivo e illustrativo. I marchi appartengono ai rispettivi titolari. Prezzi e configurazioni possono ispirarsi a informazioni pubbliche, ma disponibilità, recensioni, promozioni, tempi di consegna e stati d’ordine sono simulati e possono contenere inesattezze.</p><p>NotAStore non è affiliato, sponsorizzato o approvato dai produttori mostrati, salvo indicazione espressa.</p>`)}
        ${legalSection('06','uso','Uso corretto',`<p>Puoi usare NotAStore per finalità personali e dimostrative. Non puoi tentare accessi non autorizzati, alterare dati di altri utenti, sovraccaricare il servizio, automatizzare abusi o riutilizzare il progetto in modo da far credere che venda davvero i prodotti mostrati.</p>`)}
        ${legalSection('07','benessere','Un aiuto, non una terapia',`<p>Il progetto invita a rallentare il gesto d’acquisto, ma non offre diagnosi, consulenza psicologica o trattamento medico. Se lo shopping causa sofferenza, debiti o difficoltà nella vita quotidiana, è importante rivolgersi a una persona o a un professionista qualificato.</p>`)}
        ${legalSection('08','disponibilita','Disponibilità e modifiche',`<p>La demo può essere aggiornata, sospesa, ripristinata o modificata in qualunque momento, anche con perdita di dati virtuali. Le funzioni vengono offerte nello stato in cui si trovano, senza garanzia di continuità o assenza di errori.</p>`)}
        ${legalSection('09','responsabilita','Responsabilità',`<p>Nei limiti consentiti dalla legge, il gestore non risponde di decisioni di acquisto prese altrove, affidamento su prezzi o caratteristiche simulate, perdita di progressi virtuali o indisponibilità temporanea della demo. Restano sempre fermi i diritti che non possono essere esclusi per legge.</p>`)}
        ${legalSection('10','aggiornamenti','Aggiornamenti dei termini',`<p>Questi termini possono cambiare insieme al progetto. La data in alto indica l’ultima revisione. In caso di modifiche importanti, la nuova versione sarà resa visibile all’interno del sito.</p>`)}
      </main>
    </div>
  </div>`;
  return { html, title: 'Termini e condizioni' };
}

/* ================= CATALOGO ================= */
export function catalog(mode, slug, q) {
  const s = state.catalog;
  s.onlyDeals = mode === 'deals';
  s.cats = mode === 'category' && slug ? [slug] : [];
  s.brands = []; s.min = ''; s.max = ''; s.sort = 'rilevanza';

  const info = mode === 'category'
    ? { t: catName(slug), e: (CATEGORIES.find((c) => c.slug === slug) || {}).group || 'Categoria', sub: '' }
    : mode === 'search'
      ? { t: `Risultati per “${esc(q)}”`, e: 'Ricerca', sub: '' }
      : mode === 'deals'
        ? { t: 'Offerte del giorno', e: 'Sconti sensazionali', sub: 'Le migliori occasioni selezionate, aggiornate ogni giorno.' }
        : { t: 'Tutti i prodotti', e: 'Catalogo completo', sub: `Esplora ${PRODUCTS.length} prodotti in 16 categorie.` };

  const html = `
  <div class="wrap">
    ${crumbs(info.t, mode === 'category' ? `<a href="#/prodotti">Categorie</a>` : '')}
    ${pageHead(info.e, info.t, info.sub)}
    <div class="catalog">
      <aside class="filters panel desk-only" style="padding:20px">${filtersHTML()}</aside>
      <div>
        <div class="catalog-toolbar">
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
            <button class="chip mobile-only" data-act="open-filters">${Ico.gear(15)} Filtri</button>
            <span class="count-label" style="font-size:13.5px;color:var(--ink-3)"></span>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-size:13.5px;color:var(--ink-3)">Ordina per</span>
            <select class="sort" data-filter="sort">
              <option value="rilevanza">Più rilevanti</option>
              <option value="prezzo-asc">Prezzo crescente</option>
              <option value="prezzo-desc">Prezzo decrescente</option>
              <option value="valutazione">Valutazione</option>
              <option value="recensioni">Più recensiti</option>
              <option value="sconto">Sconto maggiore</option>
            </select>
          </div>
        </div>
        <div id="catalogResults"></div>
      </div>
    </div>
  </div>
  <aside id="filterDrawer" class="page-hidden"></aside>`;

  const mount = () => { renderResults(mode, slug, q); renderDrawer(mode, slug, q); };
  return { html, title: info.t, mount };
}

function filtersHTML() {
  const s = state.catalog;
  return `
  <div class="fgroup"><div style="display:flex;justify-content:space-between;align-items:center">
    <h4 style="margin:0">Filtri</h4><button data-act="reset-filters" style="font-size:12.5px;color:var(--brand);font-weight:650">Azzera</button></div></div>
  <div class="fgroup"><h4>Categoria</h4>
    ${CATEGORIES.map((c) => `<label class="check"><input type="checkbox" data-filter="cat" value="${c.slug}" ${s.cats.includes(c.slug) ? 'checked' : ''}> ${c.icon} ${c.name}</label>`).join('')}</div>
  <div class="fgroup"><h4>Prezzo (€)</h4>
    <div class="range"><input placeholder="Min" inputmode="numeric" data-filter="min" value="${s.min}"><span style="color:var(--ink-3)">–</span><input placeholder="Max" inputmode="numeric" data-filter="max" value="${s.max}"></div>
    <label class="check" style="margin-top:10px"><input type="checkbox" data-filter="onlyDeals" ${s.onlyDeals ? 'checked' : ''}> Solo in offerta</label></div>
  <div class="fgroup"><h4>Marchio</h4>
    ${brands.map((b) => `<label class="check"><input type="checkbox" data-filter="brand" value="${b}" ${s.brands.includes(b) ? 'checked' : ''}> ${b}</label>`).join('')}</div>`;
}

function currentList(mode, slug, q) {
  let list = PRODUCTS;
  if (mode === 'category' && slug) list = list.filter((p) => p.category === slug);
  if (mode === 'deals') list = list.filter((p) => p.listPrice && p.listPrice > p.price && discountPct(p) >= 15);
  if (mode === 'search' && q) {
    const t = q.toLowerCase();
    list = list.filter((p) => (p.name + ' ' + p.brand + ' ' + catName(p.category)).toLowerCase().includes(t));
  }
  const s = state.catalog;
  list = list.filter((p) => {
    if (s.brands.length && !s.brands.includes(p.brand)) return false;
    if (s.cats.length && !s.cats.includes(p.category)) return false;
    if (s.onlyDeals && !(p.listPrice && p.listPrice > p.price)) return false;
    if (s.min && p.price < Number(s.min)) return false;
    if (s.max && p.price > Number(s.max)) return false;
    return true;
  });
  const by = {
    'prezzo-asc': (a, b) => a.price - b.price,
    'prezzo-desc': (a, b) => b.price - a.price,
    'valutazione': (a, b) => b.rating - a.rating,
    'recensioni': (a, b) => b.reviews - a.reviews,
    'sconto': (a, b) => ((b.listPrice - b.price) / b.listPrice) - ((a.listPrice - a.price) / a.listPrice),
    'rilevanza': (a, b) => b.sold - a.sold,
  };
  return [...list].sort(by[s.sort] || by.rilevanza);
}

let ctx = { mode: 'all', slug: '', q: '' };

export function renderResults(mode, slug, q) {
  ctx = { mode, slug, q };
  const box = document.getElementById('catalogResults');
  if (!box) return;
  const list = currentList(mode, slug, q);
  const label = document.querySelector('.count-label');
  const active = state.catalog.brands.length + state.catalog.cats.length + (state.catalog.onlyDeals ? 1 : 0);
  if (label) label.textContent = `${list.length} risultati${active ? ` · ${active} filtri attivi` : ''}`;

  const sk = `<div class="grid-products">${Array.from({ length: 8 }).map(() => skeleton()).join('')}</div>`;
  box.innerHTML = sk;
  setTimeout(() => {
    const b = document.getElementById('catalogResults');
    if (!b) return;
    b.innerHTML = list.length === 0
      ? `<div class="empty panel"><div class="ic">🔍</div><h3>Nessun prodotto trovato</h3><p>Prova a modificare i filtri o a cercare un termine diverso.</p><button class="btn btn-primary" data-act="reset-filters">Azzera i filtri</button></div>`
      : `<div class="grid-products">${list.map((p) => card(p)).join('')}</div>
         <p style="text-align:center;color:var(--ink-3);font-size:13px;margin-top:22px">Hai visto ${list.length} di ${list.length} prodotti</p>`;
  }, 320);
}

function renderDrawer(mode, slug, q) {
  const d = document.getElementById('filterDrawer');
  if (!d) return;
  d.className = 'drawer-right page-hidden';
  d.innerHTML = `<div class="drawer-inner"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
    <strong style="font-size:17px">Filtri</strong><button class="btn btn-soft btn-icon" data-act="close-filters">${Ico.close(18)}</button></div>
    ${filtersHTML()}
    <button class="btn btn-primary btn-block btn-lg" style="margin-top:16px" data-act="close-filters">Mostra i risultati</button></div>`;
}

/* ================= PRODOTTO ================= */
export function product(id) {
  const p = byId(id);
  if (!p) return { html: `<div class="wrap">${emptyBox('📦', 'Prodotto non trovato', 'Il prodotto che stai cercando non è disponibile.', 'Torna al catalogo', '/prodotti')}</div>`, title: 'Prodotto' };

  const st = state.product;
  if (st.id !== id) { st.id = id; st.qty = 1; st.gi = 0; st.variants = defaultVariants(p); }
  const off = discountPct(p);
  const configuredPrice = variantPrice(p, st.variants);
  const configuredListPrice = variantListPrice(p, st.variants);
  const configuredTitle = variantTitle(p, st.variants);
  const configuredImage = variantImage(p, st.variants);
  const releaseLabel = p.releaseDate ? new Date(`${p.releaseDate}T12:00:00`).toLocaleDateString(currentLocale(),{day:'numeric',month:'long',year:'numeric'}) : '';
  const wished = store.wishlist.includes(p.id);
  const out = p.stock === 0;
  const delivery = deliveryDate(p.fast ? 1 : 4);
  const bundle = PRODUCTS.filter((x) => x.id !== p.id).filter((x) => x.category === p.category || x.price < p.price * 0.6).slice(0, 3);
  const bundleTotal = bundle.reduce((s, x) => s + x.price, 0) + p.price;
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 8);
  const alsoViewed = PRODUCTS.filter((x) => x.id !== p.id).sort((a, b) => b.sold - a.sold).slice(0, 8);
  const english = currentLocale() === 'en-GB';
  const productDescription = english
    ? `${p.name} combines carefully selected materials, refined finishes and leading performance for its category. Every configuration shown reflects the options selected on this page.`
    : p.desc;

  const specs = ['Prodotto coerente con la scheda e le varianti selezionate', 'Ordine e consegna interamente simulati', `Disponibilità ${p.fast ? 'immediata' : 'standard'}`, 'Pagamento esclusivamente con saldo virtuale'];
  const tabs = ['descrizione', 'specifiche', 'spedizioni'];
  const tabBody = {
    descrizione: `<p>${productDescription}</p><p style="margin-top:10px">${english ? `${p.name} is sold and shipped by NotAStore with a simulated official warranty and dedicated support.` : `${p.name} rappresenta il meglio della categoria ${catName(p.category).toLowerCase()}: materiali selezionati, finiture curate e prestazioni ai vertici. Venduto e spedito da NotAStore con garanzia ufficiale e assistenza dedicata.`}</p>`,
    specifiche: `<table class="table"><tbody>${[['Marca', p.brand], ['Categoria', catName(p.category)], ['Sottocategoria', p.subcategory], ['SKU', p.sku], ...Object.entries(p.specs || {}).filter(([key]) => !Object.hasOwn(st.variants,key)), ...Object.entries(st.variants), ['Disponibilità', out ? (p.releaseDate ? `In uscita il ${releaseLabel}` : 'Esaurito') : `${p.stock} pezzi disponibili`]].map(([k, v]) => `<tr data-spec="${esc(k)}"><td style="color:var(--ink-3);width:38%">${esc(k)}</td><td style="font-weight:600">${esc(v)}</td></tr>`).join('')}</tbody></table>`,
    spedizioni: `<ul style="display:grid;gap:12px"><li>🚚 <strong>Standard</strong> — gratuito, consegna in 2-3 giorni lavorativi.</li><li>⚡ <strong>Prioritaria</strong> — €7,99, consegna il giorno successivo.</li><li>👑 <strong>Premium</strong> — inclusa con account Premium, consegna entro le 12:00.</li><li>↩️ <strong>Resi</strong> — gratuiti entro 30 giorni, rimborso entro 5 giorni lavorativi.</li></ul>`,
  };
  const dist = [78, 15, 5, 1, 1];

  const html = `
  <div class="wrap">
    ${crumbs(p.name, `<a href="#/categoria/${p.category}">${catName(p.category)}</a>`)}
    <div class="pdp">
      <div class="gallery rise">
        <div class="main">${off > 0 ? `<span class="badge badge-deal" style="position:absolute;top:14px;left:14px;z-index:3">-${off}%</span>` : ''}
          ${imgTag(p, configuredImage)}</div>
        <div class="thumbs"><button class="active">${imgTag(p, configuredImage)}</button></div>
      </div>
      <div class="pdp-info rise-2">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <span style="font-size:12.5px;font-weight:750;letter-spacing:.06em;text-transform:uppercase;color:var(--brand)">${p.brand}</span>
          ${p.badge ? `<span class="badge badge-soft">${p.badge}</span>` : ''}</div>
        <h1 data-product-title>${configuredTitle}</h1>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:14px">
          ${p.reviews ? `<span class="stars" style="font-size:16px">★★★★★</span><strong>${p.rating}</strong>` : '<span>Nuovo nel catalogo</span>'}
          <span style="color:var(--ink-3);text-decoration:underline">${p.reviews.toLocaleString(currentLocale())} recensioni</span>
          <span style="color:var(--ink-3)">· ${p.sold.toLocaleString(currentLocale())} venduti</span></div>
        <div class="pricebox"><span class="now" data-product-price>${eur(configuredPrice)}</span>${p.listPrice > p.price ? `<span class="was" data-product-list-price>${eur(configuredListPrice)}</span><span class="badge badge-deal">-${off}%</span>` : ''}</div>
        <p style="font-size:13px;color:var(--ink-3)">Prezzo IVA inclusa. Spedizione calcolata al checkout.</p>
        <div class="spec">${specs.map((s) => `<div class="li"><span class="d">✓</span><span>${s}</span></div>`).join('')}</div>
        <div class="notice" style="margin-bottom:16px">${Ico.truck(18)}<span><strong>Consegna prevista il ${delivery}</strong> se ordini entro le 16:00 di oggi.</span></div>
        <div class="pill-tabs">${tabs.map((t) => `<button class="chip ${st.tab === t ? 'active' : ''}" data-act="tab" data-tab="${t}">${t.charAt(0).toUpperCase() + t.slice(1)}</button>`).join('')}</div>
        <div id="pdpTabBody" style="font-size:14.5px;color:var(--ink-2);line-height:1.7;margin-bottom:20px">${tabBody[st.tab]}</div>
        ${tabs.map((tab) => `<template id="pdp-tab-${tab}">${tabBody[tab]}</template>`).join('')}
      </div>
      <aside class="buybox rise-3">
        <div class="mobile-product-preview">
          <div class="mobile-product-preview-image">${imgTag(p, configuredImage)}</div>
          <div class="mobile-product-preview-copy"><strong data-product-title>${configuredTitle}</strong><span data-product-price>${eur(configuredPrice)}</span></div>
        </div>
        <div data-product-price style="font-size:24px;font-weight:800;letter-spacing:-.02em">${eur(configuredPrice)}</div>
        ${p.listPrice > p.price ? `<div style="font-size:13px;color:var(--brand);font-weight:650;margin-top:2px">Risparmi <span data-product-saving>${eur(configuredListPrice - configuredPrice)}</span> (${off}%)</div>` : ''}
        <div style="margin:14px 0;font-weight:700;font-size:14.5px;color:${out ? 'var(--brand)' : 'var(--ok)'}">${out ? '● Non disponibile' : '● Disponibile'}</div>
        ${out ? '' : `<div style="font-size:13px;color:var(--ink-3)">Solo ${p.stock} pezzi rimasti</div><div class="bar-stock"><div class="f" style="width:${Math.min(100, p.stock * 3)}%"></div></div>`}
        <div class="row" style="margin-top:16px"><span>Consegna</span><strong>${delivery}</strong></div>
        <div class="row"><span>Spedizione</span><strong style="color:var(--ok)">Gratuita</strong></div>
        <div class="row"><span>Venduto da</span><strong>NotAStore</strong></div>
        ${p.family ? `<div class="variant-group"><span class="variant-label">Modello</span><div class="variant-options">${familyModels(p).map((model) => `<button class="variant-option ${model.id === p.id ? 'on' : ''}" data-act="product-model" data-id="${model.id}" aria-pressed="${model.id === p.id}">${esc(model.model)}</button>`).join('')}</div></div>` : ''}
        ${Object.entries(p.variants || {}).map(([name, values]) => `<div class="variant-group"><span class="variant-label">${esc(name)}</span><div class="variant-options">${values.map((value) => `<button class="variant-option ${st.variants[name] === value ? 'on' : ''}" data-act="variant" data-name="${esc(name)}" data-value="${esc(value)}">${esc(value)}</button>`).join('')}</div></div>`).join('')}
        <div style="display:flex;align-items:center;justify-content:space-between;margin:16px 0">
          <span style="font-size:13.5px;font-weight:600">Quantità</span>
          <div class="qty"><button data-act="qdec" aria-label="Diminuisci quantità">${Ico.minus(16)}</button><span>${st.qty}</span><button data-act="qinc" aria-label="Aumenta quantità">${Ico.plus(16)}</button></div></div>
        <button class="btn btn-primary btn-block btn-lg" data-act="add" data-id="${p.id}" data-qty="${st.qty}" ${out ? 'disabled' : ''}>${Ico.cart(18)} ${out ? (p.releaseDate ? `In uscita il ${releaseLabel}` : 'Non disponibile') : 'Aggiungi al carrello'}</button>
        <button class="btn btn-ghost btn-block" style="margin-top:10px" data-act="wish" data-id="${p.id}">${Ico.heart(17, wished)} ${wished ? 'Nei preferiti' : 'Preferiti'}</button>
        <div style="margin-top:16px;display:grid;gap:10px;font-size:12.5px;color:var(--ink-3)">
          <span style="display:flex;gap:8px;align-items:center">${Ico.lock(15)} Transazione crittografata</span>
          <span style="display:flex;gap:8px;align-items:center">${Ico.ret(15)} Reso gratuito entro 30 giorni</span>
          <span style="display:flex;gap:8px;align-items:center">${Ico.shield(15)} Garanzia ufficiale 24 mesi</span></div>
      </aside>
    </div>

    <section class="section"><div class="sec-head"><div><div class="eyebrow">Bundle</div><h2>Comprati spesso insieme</h2></div></div>
      <div class="panel" style="display:flex;gap:24px;flex-wrap:wrap;align-items:center">
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          ${[p, ...bundle].map((x, i) => `<div style="display:flex;align-items:center;gap:12px">${i > 0 ? '<span style="font-size:20px;color:var(--ink-3)">+</span>' : ''}
            <a href="#/prodotto/${x.id}" style="width:96px;text-align:center"><div style="width:96px;height:96px;border-radius:12px;overflow:hidden;border:1px solid var(--line)">${imgTag(x)}</div>
            <div style="font-size:11.5px;margin-top:6px;color:var(--ink-3)">${x.name}</div></a></div>`).join('')}
        </div>
        <div style="margin-left:auto;text-align:right">
          <div style="font-size:12.5px;color:var(--ink-3)">Prezzo bundle</div>
          <div style="font-size:26px;font-weight:800;letter-spacing:-.03em">${eur(bundleTotal)}</div>
          <button class="btn btn-dark" style="margin-top:10px" data-act="add-bundle" data-id="${p.id}" data-bundle="${bundle.map((x) => x.id).join(',')}">Aggiungi i ${bundle.length + 1} articoli</button>
        </div>
      </div></section>

    ${p.reviews ? `<section class="section"><div class="sec-head"><div><div class="eyebrow">Opinioni dei clienti</div><h2>Recensioni</h2></div></div>
      <div class="rev-grid" style="display:grid;grid-template-columns:minmax(0,320px) minmax(0,1fr);gap:26px;align-items:start">
        <div class="panel" style="text-align:center">
          <div style="font-size:52px;font-weight:800;letter-spacing:-.03em">${p.rating}</div>
          <div class="stars" style="font-size:20px">★★★★★</div>
          <p style="color:var(--ink-3);font-size:13.5px;margin-top:6px">su ${p.reviews.toLocaleString(currentLocale())} recensioni verificate</p>
          <div style="margin-top:18px;display:grid;gap:6px">
            ${dist.map((pct, i) => `<div class="rbar"><span style="width:42px">${5 - i} ★</span><span class="track"><span class="fill" style="width:${pct}%"></span></span><span style="width:38px;text-align:right;color:var(--ink-3)">${pct}%</span></div>`).join('')}
          </div>
        </div>
        <div class="reviews">
          ${REVIEWS.map((r) => `<div class="review"><div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">
            <div><strong style="font-size:14.5px">${esc(r.title)}</strong><div class="stars" style="font-size:14px">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div></div>
            <span style="font-size:12.5px;color:var(--ink-3)">${esc(r.date)}</span></div>
            <p style="margin-top:10px;color:var(--ink-2);font-size:14px">${esc(r.text)}</p>
            <div style="margin-top:10px;font-size:12.5px;color:var(--ink-3);display:flex;gap:10px;align-items:center"><span>${esc(r.author)}</span>${r.verified ? `<span class="badge badge-ok">${Ico.check(12)} Acquisto verificato</span>` : ''}</div></div>`).join('')}
        </div>
      </div></section>` : ''}

    ${related.length ? rail(`Altri prodotti in ${catName(p.category)}`, 'Dalla stessa categoria', 'Vedi tutto', `/categoria/${p.category}`, related.map((x) => card(x)).join('')) : ''}
    ${rail('Chi ha visto questo articolo ha visto anche', 'Consigliati per te', '', '/', alsoViewed.map((x) => card(x, true)).join(''))}
  </div>`;

  const mount = () => { store.visit(p.id); };
  return { html, title: p.name, mount };
}

/* ================= WISHLIST ================= */
export function wishlist() {
  const items = store.wishlist.map(byId).filter(Boolean);
  const html = `<div class="wrap">${crumbs('Wishlist')}${pageHead('I tuoi preferiti', 'Wishlist',
    `${items.length} ${items.length === 1 ? 'articolo salvato' : 'articoli salvati'}. I preferiti restano salvati sul tuo dispositivo.`)}
    <div style="padding:22px 0 60px">${items.length === 0
      ? emptyBox('💛', 'La tua wishlist è vuota', 'Tocca il cuore su un prodotto per salvarlo qui e ritrovarlo in un attimo.', 'Scopri i prodotti', '/prodotti')
      : `<div class="grid-products">${items.map((p) => card(p)).join('')}</div>`}</div></div>`;
  return { html, title: 'Wishlist' };
}

/* ================= CARRELLO ================= */
export function cart() {
  const lines = store.lines();
  const subtotal = store.subtotal();
  const count = store.count();
  const shipping = subtotal >= 49 || subtotal === 0 ? 0 : 4.99;
  const total = subtotal + shipping;
  const sugg = PRODUCTS.filter((p) => !lines.find((l) => l.id === p.id)).sort((a, b) => b.rating - a.rating).slice(0, 8);

  if (!count) {
    return {
      html: `<div class="wrap">${crumbs('Carrello')}<div style="padding:30px 0 60px">
        ${emptyBox('🛒', 'Il tuo carrello è vuoto', "Non hai ancora aggiunto articoli. Dai un'occhiata alle offerte del giorno.", 'Offerte del giorno', '/offerte')}</div>
        ${rail('Consigliati per te', 'Potrebbero interessarti', '', '/', sugg.map((p) => card(p)).join(''))}</div>`,
      title: 'Carrello',
    };
  }

  const html = `<div class="wrap">${crumbs('Carrello')}
    <div style="padding:18px 0 6px;display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap">
      <div><div class="eyebrow">Riepilogo</div><h1 style="font-size:clamp(24px,3.2vw,34px);margin-top:6px">Carrello (${count})</h1></div>
      <button class="btn btn-soft" data-act="cart-clear">${Ico.trash(16)} Svuota carrello</button></div>
    <div class="checkout" style="padding-top:22px">
      <div>
        <div class="panel" style="padding:0;overflow:hidden">
          ${lines.map((l, i) => `<div class="cart-row" data-cart-index="${i}" style="display:grid;grid-template-columns:110px minmax(0,1fr) auto;gap:16px;padding:18px;align-items:center;border-bottom:${i === lines.length - 1 ? 'none' : '1px solid var(--line)'}">
            <a href="#/prodotto/${l.id}" style="width:110px;height:110px;border-radius:12px;overflow:hidden;border:1px solid var(--line)">${imgTag(l.product,l.displayImage)}</a>
            <div style="min-width:0">
              <span style="font-size:11.5px;font-weight:750;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)">${l.product.brand}</span>
              <a href="#/prodotto/${l.id}" style="display:block;font-weight:650;font-size:15px;margin:4px 0 6px">${l.displayName}</a>
              <div style="font-size:12.5px;color:var(--ok);font-weight:600">● Disponibile</div>
              <div style="font-size:12.5px;color:var(--ink-3);margin-top:4px">${Ico.truck(13)} consegna ${deliveryDate(l.product.fast ? 1 : 3)}</div>
              ${Object.entries(l.product.variants || {}).length ? `<div class="cart-variants">${Object.entries(l.product.variants).map(([name, values]) => `<label>${esc(name)}<select data-cart-variant data-index="${i}" data-name="${esc(name)}">${values.map((value) => `<option ${l.variants?.[name] === value ? 'selected' : ''}>${esc(value)}</option>`).join('')}</select></label>`).join('')}</div>` : ''}
              <div style="display:flex;gap:14px;align-items:center;margin-top:12px;flex-wrap:wrap">
                <div class="qty"><button data-act="qdec" data-id="${l.id}" data-index="${i}">${Ico.minus(15)}</button><span>${l.qty}</span><button data-act="qinc" data-id="${l.id}" data-index="${i}">${Ico.plus(15)}</button></div>
                <button data-act="cart-remove" data-id="${l.id}" style="font-size:13px;color:var(--brand);font-weight:600;display:flex;align-items:center;gap:6px">${Ico.trash(15)} Rimuovi</button></div>
            </div>
            <div style="text-align:right"><div class="cart-line-total" style="font-size:19px;font-weight:800;letter-spacing:-.02em">${eur(l.unitPrice * l.qty)}</div>${l.qty > 1 ? `<div style="font-size:12.5px;color:var(--ink-3)">${eur(l.unitPrice)} cad.</div>` : ''}</div>
          </div>`).join('')}
        </div>
        <div class="notice" style="margin-top:16px">${Ico.ret(18)}<span>Hai <strong>30 giorni</strong> per rendere qualsiasi articolo gratuitamente. Il rimborso viene accreditato entro 5 giorni lavorativi.</span></div>
      </div>
      <aside class="summary-side"><div class="panel">
        <h3 style="font-size:18px;margin-bottom:16px">Riepilogo ordine</h3>
        <div style="display:grid;gap:11px;font-size:14px">
          <div style="display:flex;justify-content:space-between"><span data-cart-count>Articoli (${count})</span><strong data-cart-subtotal>${eur(subtotal)}</strong></div>
          <div style="display:flex;justify-content:space-between"><span>Spedizione</span><strong style="color:${shipping === 0 ? 'var(--ok)' : 'inherit'}">${shipping === 0 ? 'Gratuita' : eur(shipping)}</strong></div>
        </div>
        <div style="height:1px;background:var(--line);margin:16px 0"></div>
        <div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font-size:16px;font-weight:700">Totale ordine</span><span data-cart-total style="font-size:26px;font-weight:800;letter-spacing:-.03em">${eur(total)}</span></div>
        <div style="font-size:12px;color:var(--ink-3);text-align:right">IVA inclusa</div>
        <a class="btn btn-primary btn-block btn-lg" style="margin-top:18px" href="#/checkout">Procedi al checkout ${Ico.chevron(17)}</a>
        <a class="btn btn-ghost btn-block" style="margin-top:10px" href="#/prodotti">Continua gli acquisti</a>
        <div style="margin-top:14px;font-size:12px;color:var(--ink-3);display:flex;gap:8px;align-items:center">${Ico.lock(14)} Checkout simulato — nessun addebito reale.</div>
      </div></aside>
    </div>
    ${rail('Spesso acquistati insieme', 'Completa il tuo ordine', '', '/', sugg.map((p) => card(p, true)).join(''))}</div>`;
  return { html, title: 'Carrello' };
}

/* ================= CHECKOUT ================= */
export function checkout() {
  if (!store.count()) {
    return { html: `<div class="wrap"><div style="margin:40px 0">${emptyBox('🧾', 'Non ci sono articoli da pagare', 'Aggiungi dei prodotti al carrello per procedere al checkout.', 'Vai ai prodotti', '/prodotti')}</div></div>`, title: 'Checkout' };
  }
  const st = state.checkout;
  const lines = store.lines();
  const count = store.count();
  const subtotal = store.subtotal();
  const addresses = store.user?.addresses || [];
  if (!st.address && addresses[0]) st.address = addresses[0].id;
  const cardObj = store.card || { name: 'Postepay', last4: '••••' };
  const shippingMethod = SHIPPING.find((s) => s.id === st.ship) || SHIPPING[0];
  const shippingCost = shippingMethod.price;
  const discount = 0;
  const total = subtotal + shippingCost - discount;

  const html = `<div class="wrap">${crumbs('Checkout', '<a href="#/carrello">Carrello</a>')}
    <div style="padding:18px 0 6px;display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap">
      <div><div class="eyebrow">Acquisto sicuro</div><h1 style="font-size:clamp(24px,3.2vw,34px);margin-top:6px">Completa l'ordine</h1></div>
      <span class="sim-note">${Ico.shield(15)} Checkout simulato — nessun addebito reale</span></div>
    <div class="steps" style="margin:16px 0;max-width:640px">
      ${['Indirizzo', 'Consegna', 'Pagamento', 'Conferma'].map((s, i) => `<div class="st ${i <= 2 ? 'done' : 'active'}"><span class="bubble">${i < 2 ? Ico.check(16) : i + 1}</span><span>${s}</span></div>`).join('')}
    </div>
    <div class="checkout">
      <div>
        <section class="co-step"><div class="hd"><span class="n">1</span><h3>Indirizzo di consegna</h3></div>
          ${addresses.map((a) => `<label class="pick ${st.address === a.id ? 'on' : ''}" data-act="sel-address" data-id="${a.id}"><span class="radio"></span><div style="flex:1"><strong style="font-size:14.5px">${esc(a.recipient)}</strong><div style="font-size:13.5px;color:var(--ink-3);margin-top:4px">${esc(a.street)} ${esc(a.number)} — ${esc(a.cap)} ${esc(a.city)}, ${esc(a.country)}</div></div></label>`).join('')}
          ${addresses.length ? '' : `<form id="addressForm" class="form-grid panel" style="margin-top:10px"><div style="font-weight:750">Aggiungi un indirizzo simulato</div><label class="field">Destinatario<input name="recipient" required></label><div style="display:grid;grid-template-columns:1fr 110px;gap:10px"><label class="field">Indirizzo<input name="street" required></label><label class="field">Civico<input name="number" required></label></div><div style="display:grid;grid-template-columns:110px 1fr;gap:10px"><label class="field">CAP<input name="cap" required></label><label class="field">Città<input name="city" required></label></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><label class="field">Provincia/Regione<input name="region" required></label><label class="field">Paese<input name="country" value="Italia" required></label></div><label class="field">Istruzioni<textarea name="instructions" rows="2"></textarea></label><button class="btn btn-dark" type="submit">Salva indirizzo</button></form>`}</section>

        <section class="co-step"><div class="hd"><span class="n">2</span><h3>Modalità di consegna</h3></div>
          ${SHIPPING.map((s) => `<label class="pick ${st.ship === s.id ? 'on' : ''}" data-act="sel-ship" data-id="${s.id}"><span class="radio"></span>
            <div style="flex:1;display:flex;justify-content:space-between;gap:12px;align-items:flex-start">
              <div><strong style="font-size:14.5px">${s.name}</strong>${s.id === 'prem' ? '<span class="badge badge-gold" style="margin-left:8px">Premium</span>' : ''}
              <div style="font-size:13.5px;color:var(--ink-3);margin-top:4px">${s.desc}</div></div>
              <strong style="font-size:14.5px;color:${s.price === 0 ? 'var(--ok)' : 'inherit'};white-space:nowrap">${s.price === 0 ? 'Gratis' : eur(s.price)}</strong>
            </div></label>`).join('')}</section>

        <section class="co-step"><div class="hd"><span class="n">3</span><h3>Metodo di pagamento</h3></div>
          <div class="notice" style="margin-bottom:16px">${Ico.lock(18)}<span>I metodi sono già salvati nel tuo account. Puoi selezionare una carta senza inserire alcun dato — questa è una simulazione.</span></div>
          <div class="pick on" style="align-items:center"><span class="radio"></span><div style="flex:1"><strong>${esc(cardObj.name || cardObj.type)}</strong><div style="font-size:13px;color:var(--ink-3);letter-spacing:.08em">•••• •••• •••• ${cardObj.last4}</div><div class="sim-caption">Saldo virtuale · Nessun valore monetario reale</div></div><strong>${eur(store.wallet)}</strong></div>
        </section>
      </div>

      <aside class="summary-side"><div class="panel">
        <h3 style="font-size:18px;margin-bottom:14px">Riepilogo ordine</h3>
        <div style="display:grid;gap:12px;max-height:260px;overflow-y:auto;margin-bottom:14px">
          ${lines.map((l) => `<div style="display:flex;gap:10px;align-items:center">
            <div style="width:46px;height:46px;border-radius:9px;overflow:hidden;border:1px solid var(--line);flex:none">${imgTag(l.product,l.displayImage)}</div>
            <div style="min-width:0;flex:1"><div style="font-size:12.5px;font-weight:600">${l.displayName}</div><div style="font-size:12px;color:var(--ink-3)">Qtà ${l.qty}</div></div>
            <strong style="font-size:13px">${eur(l.unitPrice * l.qty)}</strong></div>`).join('')}
        </div>
        <div style="height:1px;background:var(--line);margin:6px 0 14px"></div>
        <div style="display:grid;gap:10px;font-size:14px">
          <div style="display:flex;justify-content:space-between"><span>Articoli (${count})</span><strong>${eur(subtotal)}</strong></div>
          <div style="display:flex;justify-content:space-between"><span>${esc(shippingMethod.name)}</span><strong style="color:${shippingCost === 0 ? 'var(--ok)' : 'inherit'}">${shippingCost === 0 ? 'Gratuita' : eur(shippingCost)}</strong></div>
          ${discount > 0 ? `<div style="display:flex;justify-content:space-between;color:var(--ok)"><span>Sconto fedeltà</span><strong>-${eur(discount)}</strong></div>` : ''}
        </div>
        <div style="height:1px;background:var(--line);margin:16px 0"></div>
        <div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font-size:16px;font-weight:700">Totale ordine</span><span style="font-size:27px;font-weight:800;letter-spacing:-.03em">${eur(total)}</span></div>
        <div style="font-size:12px;color:var(--ink-3);text-align:right">IVA inclusa</div>
        <button class="btn btn-primary btn-block btn-lg" style="margin-top:18px" data-act="place" data-total="${total}" data-ship="${shippingCost}" data-disc="${discount}">${Ico.lock(18)} ACQUISTA ORA</button>
        <div style="margin-top:12px;font-size:12px;color:var(--ink-3);text-align:center">Confermando accetti i Termini. Nessun pagamento reale verrà elaborato.</div>
      </div>
      <div class="panel" style="margin-top:16px;display:grid;gap:12px;font-size:13px">
        <div style="display:flex;gap:10px;align-items:center">${Ico.truck(18)} Consegna stimata il ${deliveryDate(2)}</div>
        <div style="display:flex;gap:10px;align-items:center">${Ico.shield(18)} Pagamento protetto dalla garanzia NotAStore</div>
        <div style="display:flex;gap:10px;align-items:center">${Ico.card(18)} ${cardObj.name || cardObj.type} •••• ${cardObj.last4}</div>
      </div></aside>
    </div></div>`;
  return { html, title: 'Checkout' };
}

export function payOverlayHTML(total = 0, paymentCard = {}) {
  return `<div class="payment-shell" id="payOverlay"><dialog class="pay-card" aria-labelledby="payTitle" aria-describedby="paySub" aria-busy="true">
    <span class="payment-label">NOTASTORE · PAGAMENTO SIMULATO</span>
    <div class="payment-amount">${eur(total)}</div>
    <p class="payment-method">${esc(paymentCard.name || 'Carta virtuale')} · •••• ${esc(paymentCard.last4 || '••••')}</p>
    <div class="pay-icon" id="payIcon"><span class="spinner"></span></div>
    <div role="status" aria-live="polite"><h3 id="payTitle">Preparazione pagamento</h3><p id="paySub">Invio della richiesta per il tuo ordine.</p></div>
    <ol class="payment-steps"><li class="active" aria-current="step">Riepilogo</li><li>Elaborazione</li><li>Conferma</li></ol>
    <p class="payment-note">Solo saldo virtuale. Nessun addebito reale e nessun dato bancario richiesto.</p>
    </dialog></div>`;
}

/* ================= CONFERMA ================= */
const STEPS = ['Ordine effettuato', 'Pagamento confermato', 'Preparazione', 'Spedito', 'Consegnato'];

export function confirmation(id) {
  const order = (id && store.getOrder(id)) || store.latestOrder();
  if (!order) return { html: `<div class="wrap"><div style="margin:40px 0">${emptyBox('📦', 'Nessun ordine recente', 'Completa un acquisto simulato per vedere la conferma.', 'Vai ai prodotti', '/prodotti')}</div></div>`, title: 'Conferma ordine' };
  const cardLbl = order.card?.name || CARD_LABEL[order.cardId] || 'Carta virtuale';
  const stepIdx = 1;

  const html = `<div class="wrap">
    <div style="padding:40px 0 10px"><div class="panel rise" style="padding:clamp(24px,4vw,44px);text-align:center">
      <div style="width:76px;height:76px;border-radius:50%;background:var(--ok-2);color:var(--ok);display:grid;place-items:center;margin:0 auto 18px">${Ico.check(38)}</div>
      <h1 class="serif" style="font-size:clamp(26px,4vw,42px)">Ordine confermato</h1>
      <p style="color:var(--ink-3);margin-top:10px;font-size:16px">Grazie, ${esc(store.user?.name || 'cliente')}. Il tuo ordine virtuale è stato registrato correttamente.</p>
      <div class="confirm-grid">
        <div><div class="k">Numero ordine</div><div class="v">#${order.id}</div></div>
        <div><div class="k">Totale</div><div class="v">${eur(order.total)}</div></div>
        <div><div class="k">Pagamento</div><div class="v" style="font-size:13.5px">${cardLbl}</div></div>
        <div><div class="k">Consegna prevista</div><div class="v">${deliveryDate(2)}</div></div>
      </div>
      <div style="margin-top:22px;display:grid;gap:6px;text-align:left">
        <div style="font-size:12.5px;color:var(--ink-3)">Indirizzo di consegna</div>
        <div style="font-size:14.5px;font-weight:600">${order.address ? `${esc(order.address.street)} ${esc(order.address.number)} — ${esc(order.address.cap)} ${esc(order.address.city)}, ${esc(order.address.country)}` : 'Indirizzo simulato'}</div></div>
    </div></div>

    <section class="section"><div class="panel">
      <div class="sec-head" style="margin-bottom:26px"><div><div class="eyebrow">Stato ordine</div><h2 style="font-size:20px">Tracciamento</h2></div>
        <span class="badge badge-ok">${Ico.truck(13)} In preparazione</span></div>
      <div class="steps">${STEPS.map((s, i) => `<div class="st ${i < stepIdx ? 'done' : i === stepIdx ? 'active' : ''}"><span class="bubble">${i < stepIdx ? Ico.check(16) : i + 1}</span><span>${s}</span></div>`).join('')}</div>
      <div class="notice" style="margin-top:24px">${Ico.box(18)}<span><strong>Ordine effettuato</strong> — il pagamento è stato confermato e il pacco verrà affidato al corriere entro le prossime 24 ore.</span></div>
    </div></section>

    <section class="section" style="padding-top:0"><div class="panel">
      <h3 style="font-size:18px;margin-bottom:16px">Articoli dell'ordine</h3>
      <div style="display:grid;gap:16px">
        ${order.items.map((it) => { const p = byId(it.id || it.productId); if (!p) return ''; const itemName = it.name || variantTitle(p, it.variants || {}); const itemImage = it.image || variantImage(p, it.variants || {}); return `<div style="display:flex;gap:14px;align-items:center">
          <div style="width:64px;height:64px;border-radius:11px;overflow:hidden;border:1px solid var(--line);flex:none">${imgTag(p, itemImage)}</div>
          <div style="flex:1;min-width:0"><a href="#/prodotto/${p.id}" style="font-weight:650;font-size:14.5px">${esc(itemName)}</a>
          <div style="font-size:12.5px;color:var(--ink-3)">${p.brand} · Qtà ${it.qty} · ${Object.entries(it.variants || {}).map(([k,v]) => `${k}: ${v}`).join(' · ') || catName(p.category)}</div></div>
          <strong style="font-size:14.5px">${eur((it.unitPrice || p.price) * it.qty)}</strong></div>`; }).join('')}
      </div>
      <div style="height:1px;background:var(--line);margin:18px 0"></div>
      <div style="display:grid;gap:9px;font-size:14px;max-width:340px;margin-left:auto">
        <div style="display:flex;justify-content:space-between"><span>Articoli</span><strong>${eur(order.subtotal)}</strong></div>
        <div style="display:flex;justify-content:space-between"><span>Spedizione</span><strong style="color:var(--ok)">${order.shipping > 0 ? eur(order.shipping) : 'Gratuita'}</strong></div>
        ${order.discount > 0 ? `<div style="display:flex;justify-content:space-between;color:var(--ok)"><span>Sconto</span><strong>-${eur(order.discount)}</strong></div>` : ''}
        <div style="display:flex;justify-content:space-between;font-size:18px;font-weight:800;border-top:1px solid var(--line);padding-top:10px"><span>Totale</span><span>${eur(order.total)}</span></div>
      </div>
    </div></section>

    <section class="section" style="padding-top:0"><div class="sim-reveal rise"><div style="position:relative;z-index:2">
      <div class="lbl">Importo realmente addebitato</div>
      <div class="zero" style="margin:8px 0 12px">€0,00</div>
      <p style="color:rgba(255,255,255,.78);max-width:520px;margin:0 auto">Hai simulato un acquisto da <strong style="color:#fff">${eur(order.total)}</strong> senza spendere realmente denaro.</p>
    </div></div></section>

    <section class="section" style="padding-top:0"><div class="counter-grid">
      <div class="counter rise"><div class="k">Saldo virtuale disponibile</div><div class="v" style="color:var(--brand);margin-top:8px">${eur(store.wallet)}</div>
        <p style="font-size:13px;color:var(--ink-3);margin-top:6px">Saldo virtuale · Nessun valore monetario reale.</p></div>
      <div class="counter rise-2"><div class="k">Spesa virtuale cumulativa</div><div class="v" style="margin-top:8px">${eur(store.stats.totalSpent)}</div>
        <p style="font-size:13px;color:var(--ink-3);margin-top:6px">Utilizzata per la progressione delle carte.</p></div>
    </div></section>

    <section class="section" style="padding-top:0;padding-bottom:60px">
      <div class="panel" style="display:flex;gap:14px;flex-wrap:wrap;align-items:center;justify-content:space-between">
        <div style="display:flex;gap:12px;align-items:center;font-size:13.5px;color:var(--ink-2)">${Ico.lock(18)} Nessun pagamento reale è stato elaborato. Questa è una dimostrazione.</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <a class="btn btn-dark" href="#/account/dashboard">I miei acquisti simulati ${Ico.chevron(16)}</a>
          <a class="btn btn-ghost" href="#/ordini">I miei ordini</a>
          <a class="btn btn-ghost" href="#/">Torna alla home</a></div>
      </div></section>
  </div>`;
  return { html, title: 'Ordine confermato' };
}

/* ================= ORDINI ================= */
export function orders() {
  const html = `<div class="wrap">${crumbs('I miei ordini')}
    ${pageHead('Storico acquisti', 'I miei ordini', `${store.orders.length} ordini simulati · tracciamento incluso per ogni spedizione.`)}
    <div style="padding:22px 0 60px;display:grid;gap:16px">
      ${store.orders.map((o) => {
        const qty = o.items.reduce((s, i) => s + i.qty, 0);
        return `<div class="panel" style="padding:0;overflow:hidden">
          <button class="order-head" data-act="order-toggle" data-id="${o.id}">
            <div><div class="k">Ordine</div><div style="font-weight:800;font-size:14.5px">#${o.id}</div></div>
            <div class="hide-sm"><div class="k">Data</div><div style="font-weight:600">${new Date(o.date).toLocaleDateString(currentLocale(), { day: 'numeric', month: 'long' })}</div></div>
            <div><div class="k">Totale</div><div style="font-weight:800">${eur(o.total)}</div></div>
            <div><div class="k">Articoli</div><div style="font-weight:600">${qty}</div></div>
            <div style="display:flex;align-items:center;gap:10px"><span class="badge ${o.step >= 5 ? 'badge-ok' : 'badge-gold'}">${o.step >= 5 ? 'Consegnato · Simulato' : 'In preparazione'}</span>${Ico.chevron(18)}</div>
          </button>
          <div class="order-body page-hidden" data-order="${o.id}" style="padding:0 20px 22px">
            <div class="steps" style="margin-bottom:22px">${STEPS.map((s, i) => `<div class="st ${i < o.step ? 'done' : i === o.step ? 'active' : ''}"><span class="bubble">${i < o.step ? Ico.check(15) : i + 1}</span><span>${s}</span></div>`).join('')}</div>
            <div style="display:grid;gap:14px">
              ${o.items.map((it) => { const p = byId(it.id || it.productId); if (!p) return ''; const itemName = it.name || variantTitle(p, it.variants || {}); const itemImage = it.image || variantImage(p, it.variants || {}); return `<div style="display:flex;gap:14px;align-items:center;padding:12px;border:1px solid var(--line);border-radius:12px">
                <div style="width:56px;height:56px;border-radius:10px;overflow:hidden;flex:none;border:1px solid var(--line)">${imgTag(p, itemImage)}</div>
                <div style="flex:1;min-width:0"><a href="#/prodotto/${p.id}" style="font-weight:650;font-size:14px">${esc(itemName)}</a>
                <div style="font-size:12.5px;color:var(--ink-3)">${catName(p.category)} · Qtà ${it.qty} · ${Object.entries(it.variants || {}).map(([k,v]) => `${esc(k)}: ${esc(v)}`).join(' · ')}</div></div>
                <div style="display:flex;gap:10px;flex-wrap:wrap">
                  <button class="btn btn-soft" style="padding:8px 14px;font-size:13px" data-act="noop">${Ico.truck(15)} Traccia</button>
                  <button class="btn btn-ghost" style="padding:8px 14px;font-size:13px" data-act="noop">${Ico.ret(15)} Reso</button></div></div>`; }).join('')}
            </div>
          </div>
        </div>`;
      }).join('')}
      <div class="panel" style="text-align:center">
        <div style="font-size:34px">📦</div>
        <p style="color:var(--ink-3);margin-top:8px">Tutti gli ordini sono simulati: nessuna spedizione reale avverrà.</p>
        <a class="btn btn-primary" style="margin-top:12px" href="#/prodotti">Continua gli acquisti</a></div>
    </div></div>`;
  return { html, title: 'I miei ordini' };
}

/* ================= ACCOUNT ================= */
export function account() {
  const nav = [
    ['#/account', 'Il mio account', 'user'], ['#/ordini', 'I miei ordini', 'box'], ['#/wishlist', 'Wishlist', 'heart'],
    ['#/account/pagamenti', 'Metodi di pagamento', 'card'], ['#/account/dashboard', 'I miei acquisti simulati', 'chart'],
  ];
  const html = `<div class="wrap">${crumbs('Account')}
    <div class="acct">
      <aside class="acct-side">
        <div class="who"><span class="avatar">MR</span><div><strong style="font-size:15px">Marco Riccardi</strong><div style="font-size:12.5px;color:var(--ink-3)">NotAStore Premium</div></div></div>
        ${nav.map(([h, l, ic]) => `<a href="${h}" class="${h === '#/account' ? 'on' : ''}">${Ico[ic](18)} ${l}</a>`).join('')}
      </aside>
      <div>
        <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap;margin-bottom:20px">
          <div><div class="eyebrow">Benvenuto</div><h1 style="font-size:clamp(24px,3.2vw,34px);margin-top:6px">Il mio account</h1></div>
          <span class="badge badge-gold">★ Membro Premium</span></div>
        <div class="stat-grid" style="margin-bottom:20px">
          <div class="counter"><div class="k">Ordini totali</div><div class="v">${store.orders.length}</div></div>
          <div class="counter"><div class="k">Acquisti simulati (mese)</div><div class="v">${store.simulatedThisMonth}</div></div>
          <div class="counter"><div class="k">Denaro non speso (mese)</div><div class="v" style="color:var(--brand)">${eur(store.savedThisMonth)}</div></div>
          <div class="counter"><div class="k">Totale non speso</div><div class="v">${eur(store.saved)}</div></div></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-bottom:24px">
          ${[['I miei ordini', 'Traccia spedizioni e gestisci i resi', '#/ordini', '📦'],
             ['Metodi di pagamento', `${CARDS.length} carte salvate nel tuo profilo`, '#/account/pagamenti', '💳'],
             ['Denaro non speso', 'Statistiche dei tuoi acquisti simulati', '#/account/dashboard', '📊'],
             ['Wishlist', 'I prodotti che hai salvato', '#/wishlist', '💛']].map(([t, d, h, i]) =>
            `<a class="panel" href="${h}" style="display:block"><div style="font-size:26px">${i}</div><strong style="display:block;font-size:16px;margin-top:10px">${t}</strong><span style="font-size:13.5px;color:var(--ink-3)">${d}</span></a>`).join('')}
        </div>
        <section class="panel" id="indirizzi" style="margin-bottom:24px"><h3 style="font-size:18px;margin-bottom:16px">I miei indirizzi</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px">
            ${ADDRESSES.map((a) => `<div style="border:1px solid var(--line);border-radius:12px;padding:16px">
              <div style="display:flex;gap:8px;align-items:center"><strong style="font-size:14.5px">${a.label}</strong>${a.default ? '<span class="badge badge-soft">Predefinito</span>' : ''}</div>
              <div style="font-size:13.5px;color:var(--ink-2);margin-top:6px">${a.name}</div>
              <div style="font-size:13.5px;color:var(--ink-3)">${a.line1} — ${a.cap} ${a.city} ${a.prov}</div></div>`).join('')}
          </div></section>
        <section class="panel" id="impostazioni"><h3 style="font-size:18px;margin-bottom:16px">Impostazioni account</h3>
          <div style="display:grid;gap:12px">
            ${[['Profilo', 'Marco Riccardi · marco.riccardi@example.it'], ['Sicurezza', 'Autenticazione a due fattori attiva'],
               ['Notifiche', 'E-mail e notifiche push attive'], ['Lingua', 'Italiano (Italia)'], ['Paese', 'Italia']].map(([k, v]) =>
              `<div style="display:flex;justify-content:space-between;gap:16px;padding:12px 0;border-bottom:1px solid var(--line);flex-wrap:wrap"><strong style="font-size:14px">${k}</strong><span style="font-size:13.5px;color:var(--ink-3)">${v}</span></div>`).join('')}
          </div></section>
      </div>
    </div></div>`;
  return { html, title: 'Il mio account' };
}

/* ================= PAGAMENTI ================= */
export function payments() {
  const html = `<div class="wrap">${crumbs('Metodi di pagamento', '<a href="#/account">Account</a>')}
    <div style="padding:18px 0 6px;display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap">
      <div><div class="eyebrow">Wallet</div><h1 style="font-size:clamp(24px,3.2vw,34px);margin-top:6px">Metodi di pagamento</h1>
      <p style="color:var(--ink-3);margin-top:8px">${CARDS.length} carte salvate · gestite in modo sicuro, solo ultime quattro cifre visibili.</p></div>
      <span class="sim-note">${Ico.shield(15)} Demo — non inserire dati reali</span></div>
    <div style="padding:24px 0 60px">
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px">
        ${CARDS.map((c) => `<div class="card-select">
          <div class="ccard ${c.tone}">
            <div class="cc-top"><span class="cc-type">${c.type}</span><span class="cc-chip"></span></div>
            <div class="cc-num">•••• •••• •••• ${c.last4}</div>
            <div class="cc-bot">
              <div><small>Titolare</small><strong style="font-size:12px;display:block">${c.holder}</strong></div>
              <div style="text-align:right"><small>Scadenza</small><strong style="font-size:12px;display:block">${c.exp}</strong></div>
              <span class="cc-net">${c.net}</span></div>
          </div>
          <div class="foot">
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
              ${c.default ? `<span class="badge badge-ok">${Ico.check(12)} Predefinita</span>` : '<span class="badge badge-soft">Salvata</span>'}
              <span style="font-size:12px;color:var(--ink-3)">Ultime 4: ${c.last4}</span></div>
            <div style="display:flex;gap:8px">
              <button class="btn btn-soft" style="padding:8px 14px;font-size:13px" data-act="noop">Predefinita</button>
              <button class="btn btn-ghost" style="padding:8px 14px;font-size:13px" data-act="noop">Rimuovi</button></div>
          </div></div>`).join('')}
        <button class="panel" style="display:grid;place-items:center;min-height:240px;border:2px dashed var(--line-2);background:transparent" data-act="noop">
          <div style="text-align:center"><span class="btn btn-soft btn-icon" style="margin-bottom:10px">${Ico.plus(20)}</span>
          <strong style="display:block;font-size:15px">Aggiungi metodo</strong><span style="font-size:13px;color:var(--ink-3)">Disabilitato nella demo</span></div></button>
      </div>
      <div class="notice" style="margin-top:24px;max-width:720px">${Ico.lock(18)}
        <span>Per tutela della privacy, in questa dimostrazione non è presente alcun modulo per inserire numeri di carta o codici di sicurezza. Le carte mostrate sono fittizie: sono visibili soltanto le ultime quattro cifre, generate a scopo illustrativo.</span></div>
    </div></div>`;
  return { html, title: 'Metodi di pagamento' };
}

/* ================= DASHBOARD ================= */
export function dashboard() {
  const rows = [];
  store.orders.forEach((o) => o.items.forEach((it) => {
    const p = byId(it.id); if (!p) return;
    rows.push({
      date: new Date(o.date).toLocaleDateString(currentLocale(), { day: 'numeric', month: 'long' }),
      product: p.name, category: catName(p.category), amount: p.price * it.qty,
      method: CARD_LABEL[o.cardId] || '—', status: 'Simulato',
    });
  }));
  const totalValue = store.orders.reduce((s, o) => s + o.total, 0);
  const avg = rows.length ? totalValue / rows.length : 0;
  const byCat = {};
  rows.forEach((r) => { byCat[r.category] = (byCat[r.category] || 0) + r.amount; });
  const sorted = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
  const topCat = sorted[0] ? sorted[0][0] : '—';
  const maxCat = sorted[0] ? sorted[0][1] : 1;

  const html = `<div class="wrap">${crumbs('I miei acquisti simulati', '<a href="#/account">Account</a>')}
    ${pageHead('Dashboard personale', 'I miei acquisti simulati', 'Tutto ciò che hai “acquistato” nella demo, con importi e metodi scelti. Nessun addebito reale.')}
    <div class="stat-grid" style="margin:24px 0">
      <div class="counter"><div class="k">${Ico.chart(14)} Acquisti simulati questo mese</div><div class="v" style="margin-top:8px">${store.simulatedThisMonth}</div></div>
      <div class="counter"><div class="k">Valore totale</div><div class="v" style="margin-top:8px">${eur(totalValue)}</div></div>
      <div class="counter"><div class="k">Categoria principale</div><div class="v" style="margin-top:8px;font-size:22px">${topCat}</div></div>
      <div class="counter"><div class="k">Prodotto medio</div><div class="v" style="margin-top:8px">${eur(Math.round(avg))}</div></div></div>
    <div class="sim-reveal" style="margin-bottom:24px"><div style="position:relative;z-index:2">
      <div class="lbl">Denaro non speso · questo mese</div><div class="zero" style="margin:8px 0">${eur(store.savedThisMonth)}</div>
      <p style="color:rgba(255,255,255,.78)">Totale complessivo dall'apertura dell'account: <strong style="color:#fff">${eur(store.saved)}</strong></p></div></div>
    <div class="panel" style="padding:0;overflow:hidden;margin-bottom:26px">
      <div style="padding:20px 22px 12px"><h3 style="font-size:18px">Dettaglio acquisti</h3>
        <p style="font-size:13.5px;color:var(--ink-3);margin-top:4px">${rows.length} voci · importi simulati</p></div>
      <div style="overflow-x:auto"><table class="table">
        <thead><tr><th>Data</th><th>Prodotto</th><th class="hide-sm">Categoria</th><th>Importo</th><th class="hide-sm">Metodo scelto</th><th>Stato</th></tr></thead>
        <tbody>${rows.map((r) => `<tr>
          <td style="white-space:nowrap;color:var(--ink-3)">${r.date}</td>
          <td style="font-weight:600">${r.product}</td>
          <td class="hide-sm"><span class="badge badge-soft">${r.category}</span></td>
          <td style="font-weight:700">${eur(r.amount)}</td>
          <td class="hide-sm" style="color:var(--ink-2);font-size:13px">${r.method}</td>
          <td><span class="badge badge-ok">Simulato</span></td></tr>`).join('')}</tbody>
      </table></div></div>
    <div class="panel"><h3 style="font-size:18px;margin-bottom:18px">Ripartizione per categoria</h3>
      <div style="display:grid;gap:14px">${sorted.map(([cat, val]) => `<div>
        <div style="display:flex;justify-content:space-between;font-size:13.5px;margin-bottom:6px"><strong>${cat}</strong><span style="color:var(--ink-3)">${eur(val)}</span></div>
        <div class="bar-stock"><div class="f" style="width:${(val / maxCat) * 100}%"></div></div></div>`).join('')}</div></div>
    <div style="margin-top:24px;display:flex;gap:10px;flex-wrap:wrap">
      <a class="btn btn-primary" href="#/prodotti">Continua gli acquisti</a>
      <a class="btn btn-ghost" href="#/account/pagamenti">Metodi di pagamento</a></div>
  </div>`;
  return { html, title: 'I miei acquisti simulati' };
}

const accountNav = (active) => `<aside class="acct-side"><div class="who"><span class="avatar">${esc((store.user?.name || 'N A').split(/\s+/).map((x) => x[0]).join('').slice(0,2).toUpperCase())}</span><div><strong style="font-size:15px">${esc(store.user?.name || 'NotAStore')}</strong><div style="font-size:12.5px;color:var(--ink-3)">@${esc(store.user?.username || '')}</div></div></div>${[
  ['account','Il mio account','#/account','user'],['rewards','Ricompense','#/account/ricompense','spark'],['dashboard','Dashboard','#/account/dashboard','chart'],['cards','Le mie carte','#/account/carte','card'],['moves','Movimenti','#/account/movimenti','ret'],['orders','I miei ordini','#/ordini','box'],['wishlist','Wishlist','#/wishlist','heart'],...(store.user?.isDemo ? [['inbox','Email NotAStore','#/account/email','spark']] : []),...(store.user?.role === 'admin' ? [['admin','Console admin','#/admin','lock']] : [])
].map(([id,label,href,icon]) => `<a href="${href}" class="${active === id ? 'on' : ''}">${Ico[icon](18)} ${label}</a>`).join('')}</aside>`;

function cardArtwork(level, active) {
  const name = level.name.toLowerCase();
  const amex = name.includes('american express');
  const network = amex ? 'amex' : name.includes('mastercard') ? 'mastercard' : name.includes('visa') ? 'visa' : 'postepay';
  const chip = '<svg class="card-chip" viewBox="0 0 52 40" aria-hidden="true"><rect x="1" y="1" width="50" height="38" rx="7" fill="currentColor"/><path d="M18 1v11l-7 7H1m50 0H41l-7-7V1M18 39V28l-7-7H1m50 0H41l-7 7v11M18 12h16v16H18zM1 10h17m16 0h17M1 30h17m16 0h17" fill="none" stroke="#695e42" stroke-width=".8"/><rect x="1" y="1" width="50" height="38" rx="7" fill="none" stroke="#fff" stroke-opacity=".45"/></svg>';
  const contactless = '<svg class="contactless" viewBox="0 0 24 30" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 11a8 8 0 0 1 0 8M8 7a14 14 0 0 1 0 16M12 3a20 20 0 0 1 0 24M16 0a26 26 0 0 1 0 30"/></g></svg>';
  return `<span class="card-engraving" aria-hidden="true"></span>${amex ? '<span class="card-portrait" aria-hidden="true"></span>' : ''}<div class="card-top">${chip}${contactless}<img class="network network-${network}" src="images/cards/${network}.svg" alt="${network === 'amex' ? 'American Express' : network === 'postepay' ? 'Postepay' : network === 'visa' ? 'Visa' : 'Mastercard'}"></div><div class="number">•••• •••• •••• ${active ? store.card.last4 : '••••'}</div><div class="card-bottom"><div><small>Intestatario</small><strong>${active ? esc(store.card.holder) : 'NOTASTORE MEMBER'}</strong></div><div><small>Livello</small><strong>${level.level}</strong></div></div>`;
}

export function auth(mode = 'login', inviteCode = '') {
  const register = mode === 'register';
  return { title: register ? 'Crea account' : 'Accedi', html: `<div class="wrap"><div class="auth-shell panel rise"><div class="eyebrow">NotAStore account</div><h1 style="font-size:30px;margin:7px 0 8px">${register ? 'Crea il tuo account' : 'Bentornato'}</h1><p style="color:var(--ink-3);margin-bottom:22px">${register ? 'Riceverai Postepay Livello 1 e 1.000 € di saldo virtuale.' : 'Accedi al wallet, agli ordini e alla tua progressione.'}</p>${inviteCode ? `<div class="invite-auth-note">${Ico.spark(18)} Sei stato invitato su NotAStore · codice <strong>${esc(inviteCode)}</strong></div>` : ''}<form id="authForm" class="form-grid" data-mode="${mode}">${register ? '<label class="field">Nome<input name="name" autocomplete="name" required></label><label class="field">Username pubblico<input name="username" autocomplete="username" minlength="3" required></label>' : ''}${inviteCode ? `<input type="hidden" name="inviteCode" value="${esc(inviteCode)}">` : ''}<label class="field">Email<input type="email" name="email" autocomplete="email" required></label><label class="field">Password<input type="password" name="password" autocomplete="current-password" minlength="8" required></label><div id="authError" style="color:var(--brand);font-size:13px"></div><button class="btn btn-primary btn-lg btn-block" type="submit">${register ? 'Crea account' : 'Accedi'}</button></form><p style="text-align:center;margin-top:18px;font-size:13.5px">${register ? 'Hai già un account?' : 'Non hai un account?'} <a style="color:var(--brand);font-weight:700" href="#/${register ? 'login' : 'registrazione'}">${register ? 'Accedi' : 'Registrati'}</a></p><div class="sim-caption" style="text-align:center">Marketplace simulato · Nessun acquisto o pagamento reale</div></div></div>` };
}

export function accountHub() {
  const u = store.user; const activeCard = store.card || store.levels.find((level) => level.level === u?.level) || store.levels[0] || { level: 1, name: 'Carta NotAStore' }; const actualSpent = store.stats.totalSpent; const next = store.stats.next; const pct = next ? Math.min(100, store.stats.totalSpent / next.threshold * 100) : 100;
  return { title: 'Il mio account', html: `<div class="wrap">${crumbs('Account')}<div class="acct">${accountNav('account')}<div><div class="sec-head"><div><div class="eyebrow">Benvenuto</div><h1>Ciao, ${esc((u?.name || 'utente').split(' ')[0])}</h1></div><button class="btn btn-ghost" data-act="logout">Esci</button></div><div class="stat-grid"><div class="counter"><div class="k">Saldo virtuale</div><div class="v">${eur(store.wallet)}</div></div><div class="counter"><div class="k">Totale speso realmente nel simulatore</div><div class="v">${eur(actualSpent)}</div></div><div class="counter"><div class="k">Ordini</div><div class="v">${store.orders.length}</div></div><div class="counter"><div class="k">Leaderboard</div><div class="v">${store.stats.rank ? `#${store.stats.rank}` : '—'}</div></div></div><div class="panel" style="margin-top:20px"><div class="sec-head"><div><div class="eyebrow">Livello ${activeCard.level}</div><h2>${esc(activeCard.name)}</h2></div><a class="btn btn-soft" href="#/account/carte">Le mie carte</a></div>${next ? `<div style="display:flex;justify-content:space-between;gap:12px;font-size:13px;margin-bottom:8px"><strong>Prossima carta: ${esc(next.name)}</strong><span>${eur(store.stats.totalSpent)} / ${eur(next.threshold)}</span></div><div class="progress-track"><span style="width:${pct}%"></span></div><p style="margin-top:9px;color:var(--ink-3);font-size:13px">Ti mancano ${eur(Math.max(0,next.threshold-store.stats.totalSpent))} di acquisti virtuali.</p>` : '<strong>Hai raggiunto il livello massimo.</strong>'}</div><div class="panel" style="margin-top:20px"><div class="sec-head"><div><h3>Privacy classifica</h3><p style="color:var(--ink-3);font-size:13px">Viene mostrato soltanto lo username pubblico.</p></div><label class="chip"><input type="checkbox" data-act="privacy" ${u?.publicLeaderboard ? 'checked' : ''}> Mostrami nella classifica pubblica</label></div></div></div></div></div>` };
}

export function rewardCenter() {
  const center = store.rewardCenter || {};
  const level = store.levels.find((item) => item.level === Number(store.user?.level || 1)) || store.levels[0] || { level: 1, name: 'Postepay' };
  const milestones = center.milestones || [];
  const shareDate = center.shareAvailableAt ? new Date(center.shareAvailableAt).toLocaleDateString(currentLocale(), { day: '2-digit', month: 'long' }) : '';
  return { title: 'Ricompense', html: `<div class="wrap">${crumbs('Ricompense','<a href="#/account">Account</a>')}<div class="acct">${accountNav('rewards')}<main class="rewards-page">
    <section class="rewards-hero"><div><div class="eyebrow">LIVELLO ${level.level} · ${esc(level.name)}</div><h1>Le tue ricompense,<br>proporzionate al livello.</h1><p>Streak, condivisioni e inviti aumentano il saldo virtuale senza modificare la spesa complessiva.</p></div><div class="rewards-balance"><span>Saldo virtuale</span><strong>${eur(store.wallet)}</strong><small>Ogni premio arriva tramite un link personale valido 24 ore.</small></div></section>
    ${!center.emailVerified ? `<section class="reward-alert" role="status">${Ico.shield(21)}<div><strong>Verifica la tua email</strong><p>Serve per rendere validi gli inviti e proteggere le ricompense.</p></div><button class="btn btn-dark" data-act="resend-verification">Invia di nuovo</button></section>` : ''}
    <section class="reward-grid">
      <article class="reward-card reward-streak"><div class="reward-card-head"><span class="reward-icon">${Ico.spark(22)}</span><span class="badge badge-soft">${center.streak || 0} giorni</span></div><h2>Streak NotAStore</h2><p>Fai il check-in una volta al giorno. Hai un giorno di tolleranza al mese.</p><button class="btn btn-primary btn-block" data-act="reward-checkin" ${center.checkedInToday ? 'disabled' : ''}>${center.checkedInToday ? 'Check-in completato' : 'Fai il check-in di oggi'}</button><div class="streak-steps">${milestones.map((item) => { const reached = Number(center.streak || 0) >= item.days; const claimed = (center.claimedMilestones || []).includes(item.days); return `<div class="streak-step ${reached ? 'reached' : ''}"><span>${item.days} giorni</span><strong>${eur(item.amount)}</strong>${claimed ? '<small>Richiesto</small>' : reached ? `<button data-act="claim-streak" data-milestone="${item.days}">Ricevi</button>` : '<small>Da raggiungere</small>'}</div>`; }).join('')}</div></article>
      <article class="reward-card"><div class="reward-card-head"><span class="reward-icon">${Ico.ret(22)}</span><span class="badge badge-soft">Ogni 7 giorni</span></div><h2>Condividi il risultato</h2><p>Condividi il totale speso nel simulatore senza mostrare dati personali.</p><div class="reward-amount">+${eur(center.shareReward || 0)}</div><button class="btn btn-dark btn-block" data-act="reward-share" ${center.canShareReward ? '' : 'disabled'}>${center.canShareReward ? 'Condividi la mia spesa' : `Di nuovo dal ${shareDate}`}</button></article>
      <article class="reward-card"><div class="reward-card-head"><span class="reward-icon">${Ico.heart(22)}</span><span class="badge badge-soft">Codice campagna</span></div><h2>Segui NotAStore</h2><p>Trova il codice nel profilo social ufficiale e inseriscilo qui.</p><div class="reward-amount">+${eur(center.followReward || 0)}</div><div class="reward-code-row"><label class="reward-code-field" for="socialRewardCode">Codice trovato sui social<input id="socialRewardCode" autocomplete="off" placeholder="Es. NOTASOCIAL"></label><button class="btn btn-primary" data-act="social-code">Conferma</button></div></article>
    </section>
    <section class="referral-panel panel"><div class="referral-copy"><div class="eyebrow">INVITA UN AMICO</div><h2>Tu ricevi di più.<br>L’amico parte con un bonus.</h2><p>Il premio diventa disponibile dopo la verifica email, il primo ordine simulato e 24 ore dalla registrazione.</p><div class="referral-values"><div><span>Il tuo premio</span><strong>${eur(center.referralInviterReward || 0)}</strong></div><div><span>Premio dell’amico</span><strong>${eur(center.referralWelcomeReward || 0)}</strong></div></div></div><div class="referral-actions"><label>Il tuo codice invito<input value="${esc(center.inviteCode || '')}" readonly></label><label>Link personale<input id="inviteUrl" value="${esc(center.inviteUrl || '')}" readonly></label><button class="btn btn-dark btn-block" data-act="copy-invite">Copia il link</button><button class="btn btn-soft btn-block" data-act="check-referrals">Controlla inviti</button><small>${center.referralStats?.completed || 0} completati · ${center.referralStats?.pending || 0} in attesa · massimo 5 premi al mese</small></div></section>
  </main></div></div>` };
}

export function cards() {
  const spent = store.stats.totalSpent;
  const currentLevel = Number(store.user?.level || 1);
  return { title: 'Le mie carte', mount: mountCardFinish, html: `<div class="wrap">${crumbs('Le mie carte','<a href="#/account">Account</a>')}<div class="acct">${accountNav('cards')}<div>${pageHead('Progressione','Le mie carte','Saldo virtuale · Nessun valore monetario reale')}<div class="cards-progression-grid">${store.levels.map((level) => { const unlocked = level.level <= currentLevel; const active = level.level === currentLevel; const eligible = level.level === currentLevel + 1 && spent >= level.threshold; const missing = Math.max(0, level.threshold - spent); const progress = level.threshold ? Math.min(100, spent/level.threshold*100) : 100; return `<div class="panel card-level-panel ${unlocked ? 'is-unlocked' : 'is-locked'}" style="padding:12px"><div class="wallet-card finish-${level.level} ${level.tone} ${active ? 'active' : ''} ${unlocked ? '' : 'locked-card'}"><div class="card-name"><strong>${esc(level.name)}</strong><span class="badge">${active ? 'ATTIVA' : unlocked ? 'SBLOCCATA' : 'BLOCCATA'}</span></div>${cardArtwork(level, active)}</div><div class="card-level-meta"><div><span>Soglia ${eur(level.threshold)}</span><strong>${progress.toFixed(1)}%</strong></div><div class="progress-track"><span style="width:${progress}%"></span></div>${active ? '<span class="card-current-note">Carta attualmente attiva</span>' : unlocked ? '<span class="card-current-note">Carta già sbloccata</span>' : eligible ? `<button class="btn btn-primary btn-block" data-act="unlock-card" data-level="${level.level}">Sblocca</button>` : `<button class="btn btn-soft btn-block locked-requirement-btn" data-act="card-requirements" data-level="${level.level}" data-name="${esc(level.name)}" data-threshold="${level.threshold}" data-spent="${spent}" data-missing="${missing}" aria-disabled="true">Scopri i requisiti</button>`}</div></div>`; }).join('')}</div></div></div></div>` };
}

export function walletDashboard() {
  const orders = store.orders; const total = orders.reduce((sum, order) => sum + order.total, 0); const avg = orders.length ? total/orders.length : 0; const category = {};
  orders.flatMap((o) => o.items).forEach((i) => { category[i.category] = (category[i.category] || 0) + i.unitPrice*i.qty; });
  const favorite = Object.entries(category).sort((a,b)=>b[1]-a[1])[0]?.[0] || '—';
  const chartOrders = orders.slice(0, 12).reverse(); const max = Math.max(...chartOrders.map((o) => o.total), 1);
  return { title:'Dashboard', html:`<div class="wrap">${crumbs('Dashboard','<a href="#/account">Account</a>')}<div class="acct">${accountNav('dashboard')}<div>${pageHead('Il tuo andamento','Dashboard personale','Dati calcolati dagli ordini virtuali persistenti del tuo account.')}<div class="stat-grid"><div class="counter"><div class="k">Saldo virtuale</div><div class="v">${eur(store.wallet)}</div></div><div class="counter"><div class="k">Totale speso</div><div class="v">${eur(total)}</div></div><div class="counter"><div class="k">Media per ordine</div><div class="v">${eur(avg)}</div></div><div class="counter"><div class="k">Categoria preferita</div><div class="v" style="font-size:20px">${esc(catName(favorite))}</div></div></div><div class="panel spend-panel"><div class="sec-head"><div><h3>Le tue spese</h3><p>Importi degli ordini nel periodo selezionato</p></div><strong class="spend-total">${eur(chartOrders.reduce((sum,o)=>sum+o.total,0))}</strong></div><div class="chart-range"><select id="chartRange"><option value="7">Ultimi 7 giorni</option><option value="30">Ultimi 30 giorni</option><option value="90">Ultimi 3 mesi</option><option value="180">Ultimi 6 mesi</option><option value="365">Ultimo anno</option><option value="all" selected>Tutto</option><option value="custom">Periodo personalizzato</option></select><label class="custom-date">Dal <input type="date" id="chartFrom"></label><label class="custom-date">Al <input type="date" id="chartTo"></label><button class="btn btn-soft" data-act="chart-apply">Applica</button></div><div id="spendChartData" data-orders='${esc(JSON.stringify(orders.map(o=>({date:o.date,total:o.total}))))}'>${chartOrders.length ? `<div class="spend-chart"><div class="y-axis"><span>${eur(max)}</span><span>${eur(max/2)}</span><span>€0</span></div><div class="plot">${chartOrders.map((o)=>`<div class="bar-col"><strong>${eur(o.total)}</strong><div class="bar" style="height:${Math.max(8,o.total/max*100)}%"></div><span>${new Date(o.date).toLocaleDateString(currentLocale(),{day:'2-digit',month:'2-digit'})}</span></div>`).join('')}</div></div>` : '<div class="chart-empty">Completa il primo acquisto per visualizzare il grafico.</div>'}</div></div></div></div></div>` };
}

export function movements() {
  const labels = { INITIAL_BALANCE:'Saldo iniziale', PURCHASE:'Acquisto virtuale', RANDOM_CREDIT:'Accredito virtuale', LEVEL_UP_BONUS:'Bonus nuova carta', STREAK_BONUS:'Premio streak', SOCIAL_SHARE:'Premio condivisione', SOCIAL_FOLLOW:'Premio social', REFERRAL_INVITER:'Bonus invito', REFERRAL_WELCOME:'Benvenuto da invito' };
  return { title:'Movimenti', html:`<div class="wrap">${crumbs('Movimenti','<a href="#/account">Account</a>')}<div class="acct">${accountNav('moves')}<div>${pageHead('Wallet','Movimenti','Gli accrediti pending non fanno parte del saldo disponibile.')}<div class="panel" style="padding:0;overflow:hidden"><div style="overflow-x:auto"><table class="table"><thead><tr><th>Data</th><th>Tipo</th><th>Carta utilizzata</th><th>Importo</th><th>Saldo precedente</th><th>Saldo successivo</th></tr></thead><tbody>${store.transactions.map((t)=>`<tr><td>${new Date(t.timestamp).toLocaleString(currentLocale())}</td><td><strong>${labels[t.type]||t.type}</strong><div style="font-size:11px;color:var(--ink-3)">${t.id}</div></td><td>${t.type === 'PURCHASE' ? `<strong>${esc(t.card || store.card.name)}</strong><div style="font-size:12px;color:var(--ink-3)">•••• ${esc(t.cardLast4 || store.card.last4)}</div>` : '<span style="color:var(--ink-3)">—</span>'}</td><td style="font-weight:800;color:${t.amount>=0?'var(--ok)':'var(--brand)'}">${t.amount>=0?'+':''}${eur(t.amount)}</td><td>${eur(t.balanceBefore)}</td><td>${eur(t.balanceAfter)}</td></tr>`).join('')}</tbody></table></div></div></div></div></div>` };
}

export function inbox() {
  return { title:'Email NotAStore', html:`<div class="wrap">${crumbs('Email NotAStore','<a href="#/account">Account</a>')}<div class="acct">${accountNav('inbox')}<div>${pageHead('Posta simulata','Email NotAStore','Anteprima locale delle email transazionali. In produzione le email vengono inviate tramite Resend.')}${store.outbox.length ? `<div class="panel">${store.outbox.map((m)=>`<div class="mail-item"><span class="eyebrow">${new Date(m.createdAt).toLocaleString(currentLocale())}</span><strong>${esc(m.subject)}</strong>${m.amount ? `<div style="font-size:25px;font-weight:800">+${eur(m.amount)}</div>` : ''}${m.claimUrl ? `<a class="btn btn-primary" style="width:max-content" href="${m.claimUrl}">${m.type === 'VERIFY_EMAIL' ? 'Verifica email' : `Accredita ${eur(m.amount)}`}</a><span class="sim-caption">${m.type === 'VERIFY_EMAIL' ? 'Link personale valido 24 ore' : 'Credito virtuale NotAStore · Nessun valore monetario reale'}</span>` : '<span class="sim-caption">Benvenuto nel marketplace simulato NotAStore.</span>'}</div>`).join('')}</div>` : emptyBox('✉','Nessuna email','Le comunicazioni NotAStore appariranno qui.','Torna all’account','/account')}<button class="btn btn-soft" style="margin-top:16px" data-act="random-reward">Simula accredito casuale</button></div></div></div>` };
}

export function adminConsole() {
  const levels = store.levels.map((level) => `<option value="${level.level}">${level.level} · ${esc(level.name)}</option>`).join('');
  const html = `<div class="admin-page wrap">
    <div class="admin-head"><div><div class="eyebrow">AREA RISERVATA</div><h1>Console amministratore</h1><p>Trova un account tramite email e gestisci saldo, spesa, livello e accrediti virtuali.</p></div><span class="admin-lock">${Ico.lock(16)} Solo admin</span></div>
    <div class="admin-summary"><div><span>Ricerca</span><strong>Email esatta</strong></div><div><span>Accrediti</span><strong>Immediati o via email</strong></div><div><span>Link email</span><strong>Validità 24 ore</strong></div></div>
    <div class="panel admin-table-shell"><form id="adminLookup" class="admin-toolbar"><div><h2>Cerca un utente</h2><p>Inserisci l’indirizzo usato durante la registrazione.</p></div><div class="admin-email-search"><input id="adminSearch" type="email" placeholder="utente@email.it" aria-label="Email utente" required><button class="btn btn-dark" type="submit">Cerca</button></div></form>
      <div class="admin-table-wrap"><table class="table admin-table"><thead><tr><th>Utente</th><th>Saldo e spesa complessiva</th><th>Accredito immediato</th><th>Accredito via email</th><th>Livello</th></tr></thead><tbody id="adminUsers"><tr><td colspan="5" class="admin-empty">Inserisci un’email per visualizzare l’account.</td></tr></tbody></table></div>
    </div>
  </div>`;
  const mount = async () => {
    const host = document.getElementById('adminUsers');
    try {
      const data = await store.adminUsers();
      const form = document.getElementById('adminLookup');
      const search = document.getElementById('adminSearch');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = search.value.trim().toLowerCase();
        const user = data.users.find((entry) => String(entry.email).toLowerCase() === email);
        if (!user) { host.innerHTML = '<tr><td colspan="5" class="admin-empty">Nessun account trovato con questa email.</td></tr>'; return; }
        host.innerHTML = `<tr data-admin-user>
          <td><strong>${esc(user.name)}</strong><span>@${esc(user.username)}</span><span>${esc(user.email)}</span>${user.isDemo ? '<em>DEMO · ADMIN</em>' : ''}<span class="badge badge-soft">Livello ${user.level}</span></td>
          <td><div class="admin-metrics"><label><span>Saldo virtuale €</span><input data-admin-wallet type="number" min="0" step="0.01" value="${user.wallet}"></label><label><span>Totale speso €</span><input data-admin-spent type="number" min="0" step="0.01" value="${user.totalSpent}"></label><button class="btn btn-soft" data-act="admin-metrics" data-id="${user.id}">Salva valori</button></div></td>
          <td><div class="admin-action admin-action-stack"><label><span>Importo €</span><input data-admin-direct-amount type="number" min="0.01" step="0.01" placeholder="500"></label><button class="btn btn-dark" data-act="admin-direct-credit" data-id="${user.id}">Accredita ora</button><small>Aggiunge subito il saldo.</small></div></td>
          <td><div class="admin-action admin-action-stack"><label><span>Importo €</span><input data-admin-amount type="number" min="0.01" step="0.01" placeholder="500"></label><button class="btn btn-primary" data-act="admin-credit" data-id="${user.id}">Invia email</button><small>Link personale valido 24 ore.</small></div></td>
          <td><div class="admin-action admin-action-stack"><label><span>Nuovo livello</span><select data-admin-level>${levels.replace(`value="${user.level}"`, `value="${user.level}" selected`)}</select></label><button class="btn btn-dark" data-act="admin-level" data-id="${user.id}">Aggiorna</button></div></td>
        </tr>`;
      });
    } catch (error) { host.innerHTML = `<tr><td colspan="5">${esc(error.message)}</td></tr>`; }
  };
  return { html, title: 'Console amministratore', mount };
}

export function leaderboard() {
  return { title:'Leaderboard', html:`<div class="wrap">${pageHead('Classifica globale','NotAStore Leaderboard','Basata esclusivamente sulla valuta virtuale effettivamente spesa.')}<div class="pill-tabs" style="margin:14px 0"><button class="chip">Oggi</button><button class="chip">Settimana</button><button class="chip">Mese</button><button class="chip active">Sempre</button></div><div class="panel" id="leaderboardRows" style="padding:0;overflow:hidden">${skeleton(8)}</div></div>`, mount: async()=>{ const host=document.getElementById('leaderboardRows'); try { const data=await store.leaderboard(); host.innerHTML=data.entries.length?data.entries.map((x)=>`<div class="leader-row ${x.id===data.currentUserId?'me':''}"><strong>#${x.position}</strong><div><strong>@${esc(x.username)}</strong><div style="font-size:12px;color:var(--ink-3)">${esc(x.card)}</div></div><span class="badge badge-soft">L${x.level}</span><span class="leader-hide">${esc(x.card)}</span><strong>${eur(x.totalSpent)}</strong></div>`).join(''):'<div style="padding:24px">La classifica è ancora vuota.</div>'; } catch(e){ host.innerHTML=`<div style="padding:24px">${esc(e.message)}</div>`; } } };
}

export function creditResult(params) {
  const status=params.get('status'); const amount=Number(params.get('amount')||0); const success=status==='success';
  return { title:success?'Accredito ricevuto':'Accredito', html:`<div class="wrap"><div class="auth-shell panel" style="text-align:center"><div style="width:72px;height:72px;border-radius:50%;background:var(--ok-2);color:var(--ok);display:grid;place-items:center;margin:0 auto 18px">${Ico.check(34)}</div><h1>${success?'Accredito ricevuto':status==='claimed'?'Accredito già ricevuto':'Accredito non ricevuto'}</h1>${amount?`<div style="font-size:36px;font-weight:850;margin:15px 0">+${eur(amount)}</div>`:''}<p style="color:var(--ink-3)">${success?'Il saldo virtuale è stato aggiornato.':status==='claimed'?'Questo accredito era già stato aggiunto al saldo.':'Accredito non ricevuto, probabilmente sono passate 24 ore o il link non è valido'}</p><a class="btn btn-primary btn-lg" style="margin-top:22px" href="#/account/dashboard">${success?'Inizia a spendere':'Vai al wallet'}</a><div class="sim-caption">Credito virtuale NotAStore · Nessun valore monetario reale</div></div></div>`, mount:()=>store.refresh() };
}

export function notFound() {
  return { html: `<div class="wrap"><div style="margin:60px 0">${emptyBox('🧭', 'Pagina non trovata', 'La pagina che cerchi non esiste o è stata spostata.', 'Torna alla home', '/')}</div></div>`, title: 'Pagina non trovata' };
}


