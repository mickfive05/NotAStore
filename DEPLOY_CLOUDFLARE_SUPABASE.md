# Deploy gratuito: Cloudflare Pages + Supabase Edge Functions

Questa configurazione elimina Render dal percorso pubblico. Cloudflare Pages serve il frontend e inoltra API, accrediti e verifiche alla Edge Function `notastore` di Supabase.

## 1. Pubblicare la Edge Function

Installa/accedi alla CLI e collega il progetto:

```powershell
npx supabase login
npx supabase link --project-ref ID_PROGETTO
```

Imposta i segreti (i valori `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` sono già forniti automaticamente da Supabase):

```powershell
npx supabase secrets set RESEND_API_KEY="re_..." EMAIL_FROM="NotAStore Accrediti <accrediti@notastore.shop>" PUBLIC_BASE_URL="https://notastore.shop" NOTASTORE_ADMIN_EMAIL="info@notastore.shop" NOTASTORE_SOCIAL_CODE="IL_TUO_CODICE"
npx supabase functions deploy notastore --no-verify-jwt
```

La funzione sarà disponibile su:

```text
https://ID_PROGETTO.supabase.co/functions/v1/notastore
```

## 2. Creare Cloudflare Pages

In Cloudflare apri **Workers & Pages → Create → Pages → Connect to Git** e scegli il repository `NotAStore`.

- Framework preset: `None`
- Build command: `npm run build:pages`
- Build output directory: `dist`
- Root directory: lasciare vuota

Aggiungi in **Settings → Variables and Secrets**:

```text
SUPABASE_FUNCTION_URL=https://ID_PROGETTO.supabase.co/functions/v1/notastore
SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Ripeti le variabili sia per Production sia per Preview, quindi avvia il deploy.

## 3. Collegare il dominio

Nel progetto Pages apri **Custom domains → Set up a custom domain** e aggiungi `notastore.shop`. Cloudflare mostrerà i record DNS necessari. Se i DNS restano su Register.it, inserisci lì i record mostrati; non modificare MX, SPF o DKIM della posta.

## 4. Verifica

- `https://notastore.shop/healthz` deve restituire JSON con `ok: true`.
- Registrazione, login, carrello e ordini devono funzionare.
- Il link di verifica e il link accredito devono tornare su `https://notastore.shop`.
- Dopo la verifica, Render può essere disattivato.
