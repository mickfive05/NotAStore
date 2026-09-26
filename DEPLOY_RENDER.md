# Pubblicazione di NotAStore su Render

## 1. Prima di iniziare

1. Crea in Register.it la casella `accrediti@notastore.shop` e scegli una password forte e unica.
2. Verifica dalla webmail che la casella possa inviare e ricevere.
3. Mantieni `info@notastore.shop` come recapito pubblico e privacy.
4. Carica il progetto in un repository Git privato senza includere `.env`, `data/notastore.json` o file di log.

## 2. Creazione su Render

1. In Render scegli **New > Blueprint** e collega il repository.
2. Render leggerà `render.yaml` e creerà il servizio `notastore` nella regione di Francoforte.
3. Quando richiesto, inserisci `SMTP_PASS`: è la password della casella `accrediti@notastore.shop`.
4. Inserisci `NOTASTORE_SOCIAL_CODE`: è il codice privato della campagna che pubblicherai nella bio o nei contenuti social.
5. Non salvare mai password o codici campagna nel repository.
6. Attendi che `/healthz` risponda con `{"ok":true,"service":"notastore"}`.

Il piano indicato è `starter` perché il database JSON richiede un disco persistente. Senza disco persistente account, sessioni, saldi e ordini possono andare persi durante deploy o riavvii.

## 3. Dominio

1. Su Render aggiungi `notastore.shop` come dominio personalizzato.
2. In Cloudflare crea il record DNS richiesto da Render.
3. Aggiungi anche `www.notastore.shop` e reindirizzalo permanentemente a `https://notastore.shop`.
4. In Cloudflare usa SSL/TLS **Full (strict)** e abilita **Always Use HTTPS**.
5. Non modificare o eliminare i record MX, SPF e DKIM forniti da Register.it.

## 4. Configurazione email usata dal server

- Host: `authsmtp.securemail.pro`
- Porta: `465`
- Sicurezza: SSL/TLS (`SMTP_SECURE=true`)
- Username: `accrediti@notastore.shop`
- Mittente: `NotAStore Accrediti <accrediti@notastore.shop>`

Questi valori seguono i parametri SMTP pubblicati da Register.it. Se il piano email acquistato applica limiti o richiede il prodotto “Invii aggiuntivi”, verificarli nel pannello Register.it prima del lancio.

## 5. Verifica finale

1. Registra un account reale con un indirizzo email personale.
2. Dalla console admin invia un accredito minimo.
3. Controlla ricezione, cartella spam, link monouso e scadenza.
4. Esegui `npm run check`, `npm test` e `npm run seo` prima di ogni deploy pubblico.
5. Apri `/robots.txt`, `/sitemap.xml`, `/privacy`, `/termini` e `/healthz` sul dominio definitivo.
6. Registra la sitemap in Google Search Console dopo la pubblicazione.
