# Pubblicazione gratuita di NotAStore

Architettura utilizzata:

- Render Free: server Node e file del sito;
- Supabase Free: database persistente;
- Resend Free: email di verifica e accredito tramite API HTTPS;
- Cloudflare Free: DNS, HTTPS e dominio.

## 1. Supabase

1. Crea un account su `https://supabase.com`.
2. Crea un nuovo progetto sul piano Free e scegli una regione europea.
3. Apri **SQL Editor > New query**.
4. Incolla ed esegui tutto il contenuto di `supabase-setup.sql`.
5. Apri **Project Settings > API**.
6. Copia il **Project URL**: sarà `SUPABASE_URL`.
7. Copia la chiave segreta **service_role**: sarà `SUPABASE_SERVICE_ROLE_KEY`.

La service role key deve essere salvata esclusivamente su Render. Non inserirla mai nel browser, nel repository o in un messaggio pubblico.

## 2. Resend

1. Crea un account su `https://resend.com`.
2. Apri **Domains > Add Domain** e aggiungi `notastore.shop`.
3. Copia in Cloudflare tutti i record DNS indicati da Resend, senza eliminare i record MX di Register.it.
4. Attendi che il dominio risulti **Verified**.
5. Crea una API key con permesso di invio: sarà `RESEND_API_KEY`.

Il mittente configurato è `NotAStore Accrediti <accrediti@notastore.shop>`. La casella Register.it può continuare a ricevere normalmente: Resend viene utilizzato soltanto dal sito per l’invio automatico.

## 3. Aggiornamento GitHub

Nella cartella del progetto:

```powershell
git add .
git commit -m "Hosting gratuito con Supabase e Resend"
git push
```

Controlla che `.env` e `data/notastore.json` non compaiano nel repository.

## 4. Render Free

1. Annulla il vecchio Blueprint a pagamento, se ancora aperto.
2. In Render scegli **New > Blueprint** e collega nuovamente il repository.
3. Il nuovo `render.yaml` usa `plan: free` e non crea dischi a pagamento.
4. Inserisci quando richiesto:
   - `SUPABASE_URL`;
   - `SUPABASE_SERVICE_ROLE_KEY`;
   - `RESEND_API_KEY`;
   - `NOTASTORE_SOCIAL_CODE`.
5. Per il test iniziale imposta `PUBLIC_BASE_URL` con l’indirizzo `onrender.com` assegnato al servizio.
6. Avvia il deploy.

`/healthz` deve restituire un risultato simile a:

```json
{"ok":true,"service":"notastore","storage":"supabase","email":"resend"}
```

Se appare `storage: local` o `email: not-configured`, non aprire ancora le registrazioni.

## 5. Primo amministratore

1. Registra sul sito l’account con `info@notastore.shop`.
2. Apri l’email di verifica ricevuta e conferma l’indirizzo.
3. Dopo la verifica l’account viene promosso automaticamente ad amministratore.
4. Esci e rientra se la console admin non compare immediatamente.

## 6. Dominio e test

1. Aggiungi `notastore.shop` nei domini personalizzati di Render.
2. Configura in Cloudflare il record indicato da Render.
3. Usa SSL/TLS **Full (strict)** e abilita **Always Use HTTPS**.
4. Riporta `PUBLIC_BASE_URL` a `https://notastore.shop`.
5. Verifica registrazione, email, login, ordine, accredito, streak, codice social e inviti.
6. Apri `/robots.txt`, `/sitemap.xml`, `/privacy`, `/termini` e `/healthz`.

Render Free può sospendere il server dopo un periodo senza visite. Il primo accesso successivo può quindi richiedere più tempo. Supabase Free conserva i dati separatamente e non li perde quando Render si riavvia.
