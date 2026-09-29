import { unlink } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const dbFile = join(root, 'data', `test-${Date.now()}.json`);
process.env.PORT = '8127';
process.env.NOTASTORE_DB_FILE = dbFile;
process.env.NOTASTORE_TEST_OUTBOX = 'true';
process.env.NOTASTORE_SOCIAL_CODE = 'TESTSOCIAL2026';
const { server } = await import('../server.js');
const base = 'http://127.0.0.1:8127';
let cookie = '';

async function call(path, method = 'GET', payload, redirect = 'follow') {
  const response = await fetch(base + path, { method, redirect, headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) }, body: payload ? JSON.stringify(payload) : undefined });
  const setCookie = response.headers.get('set-cookie'); if (setCookie) cookie = setCookie.split(';')[0];
  const type = response.headers.get('content-type') || '';
  const data = type.includes('json') ? await response.json() : await response.text();
  if (!response.ok && !(redirect === 'manual' && response.status === 302)) throw new Error(`${method} ${path}: ${response.status} ${JSON.stringify(data)}`);
  return { response, data };
}

function assert(value, message) { if (!value) throw new Error(message); }

try {
  const email = `test-${Date.now()}@notastore.local`;
  let state = (await call('/api/auth/register', 'POST', { name: 'Test User', username: `tester${Date.now()}`, email, password: 'TestPass123!' })).data;
  assert(state.wallet === 1000, 'Il saldo iniziale deve essere 1.000 €');
  assert(state.user.level === 1 && state.card.name === 'Postepay', 'La carta iniziale deve essere Postepay Livello 1');
  const verificationMail = state.outbox.find((m) => m.type === 'VERIFY_EMAIL');
  assert(verificationMail?.claimUrl, 'L’email di verifica non è stata generata');
  await call(verificationMail.claimUrl, 'GET', undefined, 'manual');
  state = (await call('/api/bootstrap')).data;
  assert(state.rewardCenter.emailVerified, 'La verifica email non è stata registrata');
  const checkin = (await call('/api/rewards/check-in', 'POST')).data;
  const repeatedCheckin = (await call('/api/rewards/check-in', 'POST')).data;
  assert(checkin.rewardCenter.streak === 1 && repeatedCheckin.alreadyCheckedIn, 'Il check-in giornaliero non è idempotente');
  const social = (await call('/api/rewards/social/code', 'POST', { code: 'TESTSOCIAL2026' })).data;
  assert(social.amount === 10000 && social.delivery === 'instant', 'La GiftCard di lancio deve accreditare subito 10.000 €');
  state = (await call('/api/bootstrap')).data;
  assert(state.wallet === 11000, 'La GiftCard di lancio non ha aggiornato subito il saldo');
  assert(!state.outbox.some((m) => m.type === 'SOCIAL_FOLLOW'), 'La GiftCard di lancio non deve inviare email');
  const share = (await call('/api/rewards/social/share', 'POST')).data;
  assert(share.amount === 62.5, 'Il premio condivisione del livello 1 deve essere il 25% del massimale');
  let shareLimited = false;
  try { await call('/api/rewards/social/share', 'POST'); } catch (error) { shareLimited = /429/.test(error.message); }
  assert(shareLimited, 'Il cooldown settimanale della condivisione non è applicato');

  const address = (await call('/api/addresses', 'POST', { recipient: 'Test User', street: 'Via Test', number: '1', cap: '20100', city: 'Milano', region: 'MI', country: 'Italia' })).data.address;
  await call('/api/cart', 'PUT', { cart: [{ id: 'pr-03', qty: 1, variants: { Formato: '50 ml' } }] });
  const paymentKey = crypto.randomUUID();
  let purchase = (await call('/api/checkout', 'POST', { addressId: address.id, paymentKey })).data;
  const repeated = (await call('/api/checkout', 'POST', { addressId: address.id, paymentKey })).data;
  assert(repeated.order.id === purchase.order.id && repeated.wallet === purchase.wallet && repeated.bootstrap.orders.length === 1, 'Richiesta ripetuta: ordine o addebito duplicato');
  assert(purchase.order.items[0].sku && purchase.order.items[0].variants.Formato === '50 ml', 'Snapshot ordine e varianti mancanti');
  assert(purchase.wallet === 10680, 'Il saldo non è stato sottratto correttamente');

  await call('/api/rewards/random', 'POST');
  state = (await call('/api/bootstrap')).data;
  const firstMail = state.outbox.find((m) => m.type === 'RANDOM_CREDIT' && m.claimUrl);
  const beforeClaim = state.wallet;
  await call(firstMail.claimUrl, 'GET', undefined, 'manual');
  state = (await call('/api/bootstrap')).data;
  assert(state.wallet > beforeClaim, 'Il claim non ha accreditato il reward');
  const claimedBalance = state.wallet;
  await call(firstMail.claimUrl, 'GET', undefined, 'manual');
  state = (await call('/api/bootstrap')).data;
  assert(state.wallet === claimedBalance, 'Il doppio claim ha modificato il saldo');

  while (state.wallet < 2700) {
    await call('/api/rewards/random', 'POST');
    state = (await call('/api/bootstrap')).data;
    const pending = state.outbox.find((m) => m.claimUrl && state.rewards.some((r) => r.status === 'pending' && r.amount === m.amount));
    await call(pending.claimUrl, 'GET', undefined, 'manual');
    state = (await call('/api/bootstrap')).data;
  }
  await call('/api/cart', 'PUT', { cart: [{ id: 'pr-03', qty: 7, variants: { Formato: '50 ml' } }] });
  purchase = (await call('/api/checkout', 'POST', { addressId: address.id })).data;
  assert(purchase.bootstrap.user.level === 1, 'La carta non deve sbloccarsi automaticamente');
  const unlocked = (await call('/api/cards/unlock', 'POST', { level: 2 })).data;
  assert(unlocked.bootstrap.user.level === 2, 'Lo sblocco manuale della Visa Classic non è avvenuto');
  const levelReward = unlocked.bootstrap.rewards.find((r) => r.type === 'LEVEL_UP_BONUS' && r.status === 'pending');
  assert(levelReward && purchase.wallet === unlocked.bootstrap.wallet, 'Il bonus level-up non deve essere accreditato subito');
  const bonusMail = unlocked.bootstrap.outbox.find((m) => m.type === 'LEVEL_UP_BONUS');
  const beforeBonus = purchase.wallet;
  await call(bonusMail.claimUrl, 'GET', undefined, 'manual');
  state = (await call('/api/bootstrap')).data;
  assert(state.wallet === beforeBonus + 250, 'Il bonus Visa Classic deve valere 250 €');
  assert(state.orders.length === 2 && state.transactions.some((t) => t.type === 'LEVEL_UP_BONUS'), 'Ordini o movimenti non persistenti');
  console.log('Smoke test NotAStore completato: account → acquisto → reward → doppio claim → level-up → bonus.');
} finally {
  await new Promise((resolve) => server.close(resolve));
  await unlink(dbFile).catch(() => {});
}
