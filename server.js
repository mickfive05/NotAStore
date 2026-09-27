import { randomBytes, randomUUID, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
import { Buffer } from 'node:buffer';
import { PRODUCTS, variantPrice, variantTitle, variantImage } from './js/data.js';

const IS_EDGE = typeof Deno !== 'undefined';
const ENV = IS_EDGE ? Deno.env.toObject() : process.env;
const ROOT_URL = new URL('.', import.meta.url);
const PORT = Number(ENV.PORT || 8000);
const SUPABASE_URL = String(ENV.SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_SERVICE_ROLE_KEY = String(ENV.SUPABASE_SERVICE_ROLE_KEY || '');
const USE_SUPABASE = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
const STATE_ID = 'primary';
const LEVELS = [
  { level: 1, name: 'Postepay', threshold: 0, min: 100, max: 250, bonus: 0, tone: 'red' },
  { level: 2, name: 'Visa Classic', threshold: 2500, min: 250, max: 1000, bonus: 250, tone: 'blue' },
  { level: 3, name: 'Mastercard', threshold: 10000, min: 750, max: 3000, bonus: 1000, tone: 'dark' },
  { level: 4, name: 'Visa Gold', threshold: 30000, min: 1500, max: 7500, bonus: 3000, tone: 'gold' },
  { level: 5, name: 'American Express', threshold: 75000, min: 4000, max: 20000, bonus: 7500, tone: 'green' },
  { level: 6, name: 'Visa Infinite', threshold: 200000, min: 10000, max: 50000, bonus: 20000, tone: 'black' },
  { level: 7, name: 'Mastercard World Elite', threshold: 500000, min: 25000, max: 100000, bonus: 50000, tone: 'black' },
  { level: 8, name: 'American Express Platinum', threshold: 1000000, min: 100000, max: 500000, bonus: 100000, tone: 'platinum' },
  { level: 9, name: 'American Express Centurion · AMEX BLACK', threshold: 5000000, min: 250000, max: 1000000, bonus: 500000, tone: 'centurion' }
];

for (let index = 0; index < LEVELS.length - 1; index += 1) {
  const current = LEVELS[index];
  const next = LEVELS[index + 1];
  if (current.max > next.threshold * 0.1) throw new Error(`Accredito massimo incoerente per ${current.name}`);
}

let db = { users: [], sessions: [], rewards: [], outbox: [], emailVerifications: [], referrals: [] };
const translationCache = new Map();
let writeQueue = Promise.resolve();
const rate = new Map();
const isProduction = IS_EDGE || ENV.NODE_ENV === 'production';

function securityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'DENY',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    ...(isProduction ? { 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains' } : {}),
  };
}

function sessionCookie(value, maxAge = 2592000) {
  const name = isProduction ? '__Host-nas_session' : 'nas_session';
  return `${name}=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${isProduction ? '; Secure' : ''}`;
}

async function loadDb() {
  if (isProduction && !USE_SUPABASE) throw new Error('In produzione devi configurare SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.');
  if (USE_SUPABASE) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/notastore_state?id=eq.${STATE_ID}&select=state`, { headers: supabaseHeaders() });
    if (!response.ok) throw new Error(`Supabase non disponibile (${response.status}): verifica tabella, URL e service role key.`);
    const rows = await response.json();
    if (rows[0]?.state) db = rows[0].state;
    else {
      const created = await fetch(`${SUPABASE_URL}/rest/v1/notastore_state`, { method: 'POST', headers: supabaseHeaders({ Prefer: 'return=minimal' }), body: JSON.stringify({ id: STATE_ID, state: db, updated_at: new Date().toISOString() }) });
      if (!created.ok) throw new Error(`Impossibile inizializzare Supabase (${created.status}).`);
    }
  } else {
    const { readFile, mkdir } = await import('node:fs/promises');
    const { join } = await import('node:path');
    const { fileURLToPath } = await import('node:url');
    const root = fileURLToPath(ROOT_URL);
    const dataDir = join(root, 'data');
    const dbFile = ENV.NOTASTORE_DB_FILE || join(dataDir, 'notastore.json');
    await mkdir(dataDir, { recursive: true });
    try { db = JSON.parse(await readFile(dbFile, 'utf8')); }
    catch { await persist(); }
  }
  let changed = false;
  for (const key of ['users', 'sessions', 'rewards', 'outbox', 'emailVerifications', 'referrals']) if (!Array.isArray(db[key])) { db[key] = []; changed = true; }
  for (const user of db.users) {
    const isMainDemo = user.email === 'demo.max@notastore.it';
    if (user.isDemo === undefined) { user.isDemo = isMainDemo; changed = true; }
    if (!user.role) { user.role = isMainDemo ? 'admin' : 'user'; changed = true; }
    if (!user.emailVerifiedAt) { user.emailVerifiedAt = user.createdAt || new Date().toISOString(); changed = true; }
    if (!user.inviteCode) { user.inviteCode = inviteCodeFor(user); changed = true; }
    const engagementDefaults = { streak: 0, lastCheckin: null, cycleId: null, claimedMilestones: [], graceMonth: null, lastShareRewardAt: null, socialCampaigns: [] };
    if (!user.engagement || !Array.isArray(user.engagement.claimedMilestones) || !Array.isArray(user.engagement.socialCampaigns)) { user.engagement = { ...engagementDefaults, ...(user.engagement || {}) }; user.engagement.claimedMilestones = Array.isArray(user.engagement.claimedMilestones) ? user.engagement.claimedMilestones : []; user.engagement.socialCampaigns = Array.isArray(user.engagement.socialCampaigns) ? user.engagement.socialCampaigns : []; changed = true; }
  }
  if (changed) await persist();
}

function supabaseHeaders(extra = {}) {
  return { apikey: SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json', ...extra };
}

function persist() {
  writeQueue = writeQueue.then(async () => {
    if (USE_SUPABASE) {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/notastore_state?id=eq.${STATE_ID}`, { method: 'PATCH', headers: supabaseHeaders({ Prefer: 'return=minimal' }), body: JSON.stringify({ state: db, updated_at: new Date().toISOString() }) });
      if (!response.ok) throw new Error(`Salvataggio Supabase non riuscito (${response.status}).`);
    } else {
      const { writeFile, rename, mkdir } = await import('node:fs/promises');
      const { join } = await import('node:path');
      const { fileURLToPath } = await import('node:url');
      const dataDir = join(fileURLToPath(ROOT_URL), 'data');
      const dbFile = ENV.NOTASTORE_DB_FILE || join(dataDir, 'notastore.json');
      await mkdir(dataDir, { recursive: true });
      const tmp = `${dbFile}.tmp`;
      await writeFile(tmp, JSON.stringify(db, null, 2), 'utf8');
      await rename(tmp, dbFile);
    }
  });
  return writeQueue;
}

function json(res, status, body, headers = {}) {
  res.writeHead(status, { ...securityHeaders(), 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
  res.end(JSON.stringify(body));
}

async function body(req) {
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 1_000_000) throw new Error('Payload troppo grande');
  }
  return raw ? JSON.parse(raw) : {};
}

function cookie(req, name) {
  const found = (req.headers.cookie || '').split(';').map((v) => v.trim()).find((v) => v.startsWith(`${name}=`));
  return found ? decodeURIComponent(found.slice(name.length + 1)) : '';
}

function currentUser(req) {
  const sid = cookie(req, isProduction ? '__Host-nas_session' : 'nas_session');
  const session = db.sessions.find((s) => s.id === sid && new Date(s.expiresAt) > new Date());
  return session ? db.users.find((u) => u.id === session.userId) : null;
}

function publicUser(user) {
  if (!user) return null;
  const { passwordHash, ...safe } = user;
  return safe;
}

function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}

function inviteCodeFor(user) {
  const name = String(user.username || 'MEMBER').replace(/[^a-z0-9]/gi, '').slice(0, 10).toUpperCase() || 'MEMBER';
  return `NAS-${name}-${createHash('sha256').update(String(user.id)).digest('hex').slice(0, 5).toUpperCase()}`;
}

function italyDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

function daysBetween(a, b) {
  return Math.round((Date.parse(`${b}T12:00:00Z`) - Date.parse(`${a}T12:00:00Z`)) / 864e5);
}

function amountFor(user, ratio) {
  const level = LEVELS[user.level - 1] || LEVELS[0];
  return Math.max(1, Math.round(level.max * ratio * 100) / 100);
}

function checkPassword(password, stored) {
  const [salt, hash] = stored.split(':');
  const actual = scryptSync(password, salt, 64);
  return timingSafeEqual(actual, Buffer.from(hash, 'hex'));
}

function sessionFor(user) {
  const id = randomBytes(32).toString('base64url');
  db.sessions.push({ id, userId: user.id, expiresAt: new Date(Date.now() + 30 * 864e5).toISOString() });
  return id;
}

function levelFor(totalSpent) {
  return [...LEVELS].reverse().find((l) => totalSpent >= l.threshold) || LEVELS[0];
}

function cardFor(user) {
  const requestedLevel = Number(user.level) || 1;
  const level = LEVELS.find((item) => item.level === requestedLevel) || levelFor(user.totalSpent || 0) || LEVELS[0];
  return { ...level, last4: user.cardLast4, holder: user.name.toUpperCase(), status: 'ATTIVA' };
}

function transaction(user, type, amount, meta = {}) {
  const before = user.wallet;
  user.wallet = Math.round((user.wallet + amount) * 100) / 100;
  user.transactions.unshift({ id: `TX-${randomUUID()}`, timestamp: new Date().toISOString(), type, amount, balanceBefore: before, balanceAfter: user.wallet, ...meta });
}

async function deliverMail(user, mail, content) {
  if (user.isDemo || ENV.NOTASTORE_TEST_OUTBOX === 'true') {
    db.outbox.unshift({ ...mail, delivery: 'internal' });
    return 'internal';
  }
  if (!ENV.RESEND_API_KEY || !ENV.EMAIL_FROM) throw new Error('Invio email non configurato. Imposta RESEND_API_KEY ed EMAIL_FROM.');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${ENV.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: ENV.EMAIL_FROM, to: [user.email], subject: mail.subject, text: content.text, html: content.html }),
  });
  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Invio Resend non riuscito (${response.status}): ${details.slice(0, 240)}`);
  }
  db.outbox.unshift({ ...mail, delivery: 'sent' });
  return 'email';
}

async function createEmailVerification(user) {
  db.emailVerifications = db.emailVerifications.filter((item) => item.userId !== user.id || item.usedAt);
  const token = randomBytes(32).toString('base64url');
  const now = new Date();
  const verification = { id: `EV-${randomUUID()}`, userId: user.id, tokenHash: createHash('sha256').update(token).digest('hex'), createdAt: now.toISOString(), expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(), usedAt: null };
  db.emailVerifications.push(verification);
  const publicBase = String(ENV.PUBLIC_BASE_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
  const claimUrl = `/verify/${token}`;
  const mail = { id: `MAIL-${randomUUID()}`, userId: user.id, to: user.email, type: 'VERIFY_EMAIL', subject: 'Verifica il tuo account NotAStore', createdAt: now.toISOString(), expiresAt: verification.expiresAt, claimUrl };
  await deliverMail(user, mail, {
    text: `Verifica il tuo account NotAStore entro 24 ore: ${publicBase}${claimUrl}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto"><h1>NotAStore</h1><p>Conferma il tuo indirizzo email per attivare le ricompense e gli inviti.</p><p><a href="${publicBase}${claimUrl}" style="display:inline-block;padding:13px 20px;background:#c0492b;color:#fff;text-decoration:none;border-radius:8px;font-weight:700">Verifica l’email</a></p><p style="color:#666">Il link è personale e valido per 24 ore.</p></div>`,
  });
  return verification;
}

async function createReward(user, type, amount, level, meta = {}) {
  const token = randomBytes(32).toString('base64url');
  const createdAt = new Date();
  const reward = { id: `RW-${randomUUID()}`, userId: user.id, type, amount, level, status: 'pending', createdAt: createdAt.toISOString(), expiresAt: new Date(createdAt.getTime() + 24 * 60 * 60 * 1000).toISOString(), claimedAt: null, claimHash: createHash('sha256').update(token).digest('hex'), ...meta };
  db.rewards.push(reward);
  const card = LEVELS[level - 1].name;
  const claimUrl = `/claim/${token}`;
  const subjects = { LEVEL_UP_BONUS: `Hai sbloccato ${card}`, STREAK_BONUS: 'Premio streak NotAStore', SOCIAL_SHARE: 'Premio condivisione NotAStore', SOCIAL_FOLLOW: 'Premio social NotAStore', REFERRAL_INVITER: 'Un tuo invito è stato completato', REFERRAL_WELCOME: 'Bonus benvenuto da invito' };
  const mail = { id: `MAIL-${randomUUID()}`, userId: user.id, to: user.email, type, subject: subjects[type] || 'Hai ricevuto un accredito', amount, card, createdAt: reward.createdAt, expiresAt: reward.expiresAt, claimUrl };
  const publicBase = String(ENV.PUBLIC_BASE_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
  let delivery;
  try { delivery = await deliverMail(user, mail, {
    text: `Hai ricevuto un accredito virtuale NotAStore di ${amount} €. Apri questo link entro 24 ore: ${publicBase}${claimUrl}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto"><h1>NotAStore</h1><p>Hai ricevuto un accredito virtuale di <strong>${amount.toLocaleString('it-IT')} €</strong>.</p><p><a href="${publicBase}${claimUrl}" style="display:inline-block;padding:13px 20px;background:#ef5b32;color:#fff;text-decoration:none;border-radius:8px;font-weight:700">Ricevi l’accredito</a></p><p style="color:#666">Il link è personale, monouso e valido per 24 ore. Nessun valore monetario reale.</p></div>`,
  }); } catch (error) { reward.status = 'delivery_failed'; throw error; }
  return { reward, delivery };
}

async function maybeLevelUp(user) {
  const target = levelFor(user.totalSpent);
  if (target.level <= user.level) return null;
  user.level = target.level;
  if (!user.claimedLevelBonuses.includes(target.level)) {
    user.claimedLevelBonuses.push(target.level);
    await createReward(user, 'LEVEL_UP_BONUS', target.bonus, target.level);
  }
  return target;
}

function variantsFor(product) {
  return product.variants || {};
}

function validVariants(product, selected = {}) {
  const schema = variantsFor(product);
  return Object.entries(schema).every(([key, values]) => values.includes(String(selected[key] || '')));
}

const STREAK_REWARDS = { 3: 0.10, 7: 0.25, 14: 0.50, 30: 1 };

function rewardCenter(user) {
  const engagement = user.engagement || {};
  const referrals = db.referrals.filter((item) => item.inviterId === user.id || item.inviteeId === user.id);
  const lastShare = engagement.lastShareRewardAt ? new Date(engagement.lastShareRewardAt).getTime() : 0;
  const shareAvailableAt = lastShare ? new Date(lastShare + 7 * 864e5).toISOString() : null;
  return {
    streak: Number(engagement.streak || 0),
    lastCheckin: engagement.lastCheckin || null,
    checkedInToday: engagement.lastCheckin === italyDate(),
    claimedMilestones: engagement.claimedMilestones || [],
    milestones: Object.entries(STREAK_REWARDS).map(([days, ratio]) => ({ days: Number(days), amount: amountFor(user, ratio) })),
    shareReward: amountFor(user, 0.25),
    shareAvailableAt,
    canShareReward: !shareAvailableAt || new Date(shareAvailableAt).getTime() <= Date.now(),
    followReward: amountFor(user, 0.50),
    socialCodeConfigured: Boolean(ENV.NOTASTORE_SOCIAL_CODE),
    inviteCode: user.inviteCode,
    inviteUrl: `${String(ENV.PUBLIC_BASE_URL || `http://localhost:${PORT}`).replace(/\/$/, '')}/#/invito/${encodeURIComponent(user.inviteCode)}`,
    referralInviterReward: amountFor(user, 1),
    referralWelcomeReward: amountFor(user, 0.50),
    referralStats: {
      pending: referrals.filter((item) => item.inviterId === user.id && item.status === 'pending').length,
      completed: referrals.filter((item) => item.inviterId === user.id && item.status === 'rewarded').length,
      joinedThroughInvite: referrals.some((item) => item.inviteeId === user.id),
    },
    emailVerified: Boolean(user.emailVerifiedAt),
  };
}

async function settleReferrals(user) {
  const relevant = db.referrals.filter((item) => item.status === 'pending' && (item.inviterId === user.id || item.inviteeId === user.id));
  let completed = 0;
  for (const referral of relevant) {
    const inviter = db.users.find((entry) => entry.id === referral.inviterId);
    const invitee = db.users.find((entry) => entry.id === referral.inviteeId);
    if (!inviter || !invitee || !invitee.emailVerifiedAt || !invitee.orders.length || Date.now() < new Date(invitee.createdAt).getTime() + 24 * 60 * 60 * 1000) continue;
    const month = new Date().toISOString().slice(0, 7);
    const rewardedThisMonth = db.referrals.filter((entry) => entry.inviterId === inviter.id && entry.status === 'rewarded' && String(entry.rewardedAt || '').startsWith(month)).length;
    if (rewardedThisMonth >= 5) continue;
    referral.status = 'processing';
    try {
      await createReward(inviter, 'REFERRAL_INVITER', amountFor(inviter, 1), inviter.level, { referralId: referral.id });
      await createReward(invitee, 'REFERRAL_WELCOME', amountFor(invitee, 0.5), invitee.level, { referralId: referral.id });
      referral.status = 'rewarded'; referral.rewardedAt = new Date().toISOString(); completed += 1;
    } catch (error) { referral.status = 'pending'; referral.lastError = error.message; }
  }
  await persist();
  return completed;
}

function bootstrap(user) {
  if (!user) return { user: null, levels: LEVELS, cart: [], wishlist: [] };
  const next = LEVELS[user.level] || null;
  return {
    user: publicUser(user),
    wallet: user.wallet,
    card: cardFor(user),
    levels: LEVELS,
    cart: user.cart,
    wishlist: user.wishlist,
    orders: user.orders,
    transactions: user.transactions,
    rewards: db.rewards.filter((r) => r.userId === user.id).map(({ claimHash, ...r }) => r),
    outbox: (user.isDemo || ENV.NOTASTORE_TEST_OUTBOX === 'true') ? db.outbox.filter((m) => m.userId === user.id) : [],
    stats: { totalSpent: user.totalSpent, orders: user.orders.length, rank: leaderboard().findIndex((x) => x.id === user.id) + 1, next },
    rewardCenter: rewardCenter(user),
  };
}

function leaderboard() {
  return db.users.filter((u) => u.publicLeaderboard).sort((a, b) => b.totalSpent - a.totalSpent).map((u, i) => ({ position: i + 1, id: u.id, username: u.username, avatar: u.avatar || '', level: u.level, card: LEVELS[u.level - 1].name, totalSpent: u.totalSpent }));
}

function limited(req) {
  const key = `${req.socket.remoteAddress}:${req.url}`;
  const now = Date.now();
  const hits = (rate.get(key) || []).filter((t) => now - t < 60_000);
  hits.push(now); rate.set(key, hits);
  return hits.length > 30;
}

async function api(req, res, url) {
  if (limited(req)) return json(res, 429, { error: 'Troppe richieste. Riprova tra poco.' });
  const user = currentUser(req);
  if (req.method === 'POST' && url.pathname === '/api/translate') {
    const data = await body(req);
    const texts = Array.isArray(data.texts) ? data.texts.map((value) => String(value || '').trim()).filter(Boolean).slice(0, 40) : [];
    const target = data.target === 'en' ? 'en' : 'en';
    const translateOne = async (text) => {
      const key = `it|${target}|${text}`;
      if (translationCache.has(key)) return translationCache.get(key);
      if (Buffer.byteLength(text, 'utf8') > 480) return text;
      try {
        const endpoint = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=it|${target}`;
        const response = await fetch(endpoint, { headers: { Accept: 'application/json', 'User-Agent': 'NotAStore/1.0' }, signal: AbortSignal.timeout(7000) });
        if (!response.ok) throw new Error('Servizio traduzione non disponibile');
        const payload = await response.json();
        const candidate = String(payload?.responseData?.translatedText || text).trim();
        const translated = /<\/?[a-z][^>]*>/i.test(candidate) ? text : candidate;
        translationCache.set(key, translated);
        return translated;
      } catch { return text; }
    };
    const translations = await Promise.all(texts.map(translateOne));
    return json(res, 200, { translations });
  }
  if (req.method === 'GET' && url.pathname === '/api/bootstrap') return json(res, 200, bootstrap(user));
  if (req.method === 'GET' && url.pathname === '/api/leaderboard') return json(res, 200, { entries: leaderboard(), currentUserId: user?.id || null });

  if (req.method === 'POST' && url.pathname === '/api/auth/register') {
    const data = await body(req);
    const email = String(data.email || '').trim().toLowerCase();
    const username = String(data.username || '').trim().replace(/[^a-zA-Z0-9_.-]/g, '').slice(0, 24);
    const name = String(data.name || '').trim().slice(0, 80);
    const password = String(data.password || '');
    if (!name || !username || !/^\S+@\S+\.\S+$/.test(email) || password.length < 8) return json(res, 400, { error: 'Inserisci dati validi e una password di almeno 8 caratteri.' });
    if (db.users.some((u) => u.email === email || u.username.toLowerCase() === username.toLowerCase())) return json(res, 409, { error: 'Email o username già utilizzati.' });
    const inviter = data.inviteCode ? db.users.find((entry) => entry.inviteCode === String(data.inviteCode).trim().toUpperCase()) : null;
    if (data.inviteCode && !inviter) return json(res, 400, { error: 'Il codice invito non è valido.' });
    const newUser = { id: randomUUID(), name, username, email, passwordHash: hashPassword(password), avatar: '', createdAt: new Date().toISOString(), emailVerifiedAt: null, addresses: [], level: 1, role: 'user', isDemo: false, cardLast4: String(Math.floor(1000 + Math.random() * 9000)), wallet: 0, totalSpent: 0, cart: [], wishlist: [], orders: [], transactions: [], claimedLevelBonuses: [1], publicLeaderboard: false, engagement: { streak: 0, lastCheckin: null, cycleId: null, claimedMilestones: [], graceMonth: null, lastShareRewardAt: null, socialCampaigns: [] } };
    newUser.inviteCode = inviteCodeFor(newUser);
    transaction(newUser, 'INITIAL_BALANCE', 1000);
    db.users.push(newUser);
    if (inviter && inviter.id !== newUser.id) db.referrals.push({ id: `REF-${randomUUID()}`, inviterId: inviter.id, inviteeId: newUser.id, createdAt: new Date().toISOString(), status: 'pending', rewardedAt: null });
    try { await createEmailVerification(newUser); } catch (error) { console.error(`Verifica email non inviata a ${email}:`, error.message); }
    const sid = sessionFor(newUser); await persist();
    return json(res, 201, bootstrap(newUser), { 'Set-Cookie': sessionCookie(sid) });
  }

  if (req.method === 'POST' && url.pathname === '/api/auth/login') {
    const data = await body(req); const email = String(data.email || '').trim().toLowerCase();
    const found = db.users.find((u) => u.email === email);
    if (!found || !checkPassword(String(data.password || ''), found.passwordHash)) return json(res, 401, { error: 'Credenziali non valide.' });
    const sid = sessionFor(found); await persist();
    return json(res, 200, bootstrap(found), { 'Set-Cookie': sessionCookie(sid) });
  }

  if (req.method === 'POST' && url.pathname === '/api/auth/logout') {
    const sid = cookie(req, isProduction ? '__Host-nas_session' : 'nas_session'); db.sessions = db.sessions.filter((s) => s.id !== sid); await persist();
    return json(res, 200, { ok: true }, { 'Set-Cookie': sessionCookie('', 0) });
  }

  if (!user) return json(res, 401, { error: 'Accedi per continuare.' });

  if (req.method === 'POST' && url.pathname === '/api/auth/resend-verification') {
    if (user.emailVerifiedAt) return json(res, 409, { error: 'Questa email è già verificata.' });
    const recent = db.emailVerifications.find((item) => item.userId === user.id && !item.usedAt && Date.now() - new Date(item.createdAt).getTime() < 60_000);
    if (recent) return json(res, 429, { error: 'Attendi un minuto prima di richiedere una nuova email.' });
    await createEmailVerification(user); await persist();
    return json(res, 201, { ok: true });
  }

  if (req.method === 'POST' && url.pathname === '/api/rewards/check-in') {
    const engagement = user.engagement;
    const today = italyDate();
    if (engagement.lastCheckin === today) return json(res, 200, { alreadyCheckedIn: true, rewardCenter: rewardCenter(user) });
    const difference = engagement.lastCheckin ? daysBetween(engagement.lastCheckin, today) : 0;
    const month = today.slice(0, 7);
    if (difference === 1) engagement.streak += 1;
    else if (difference === 2 && engagement.graceMonth !== month) { engagement.streak += 1; engagement.graceMonth = month; }
    else { engagement.streak = 1; engagement.cycleId = today; engagement.claimedMilestones = []; }
    engagement.lastCheckin = today;
    await persist(); return json(res, 200, { alreadyCheckedIn: false, rewardCenter: rewardCenter(user) });
  }

  if (req.method === 'POST' && url.pathname === '/api/rewards/streak') {
    const data = await body(req); const milestone = Number(data.milestone); const ratio = STREAK_REWARDS[milestone];
    if (!ratio || user.engagement.streak < milestone) return json(res, 409, { error: 'Traguardo streak non ancora raggiunto.' });
    if (user.engagement.claimedMilestones.includes(milestone)) return json(res, 409, { error: 'Premio streak già richiesto.' });
    const issued = await createReward(user, 'STREAK_BONUS', amountFor(user, ratio), user.level, { streakMilestone: milestone });
    user.engagement.claimedMilestones.push(milestone); await persist();
    return json(res, 201, { delivery: issued.delivery, amount: issued.reward.amount, rewardCenter: rewardCenter(user) });
  }

  if (req.method === 'POST' && url.pathname === '/api/rewards/social/share') {
    const last = user.engagement.lastShareRewardAt ? new Date(user.engagement.lastShareRewardAt).getTime() : 0;
    if (last && Date.now() < last + 7 * 864e5) return json(res, 429, { error: 'Il premio condivisione è disponibile una volta ogni 7 giorni.' });
    const issued = await createReward(user, 'SOCIAL_SHARE', amountFor(user, 0.25), user.level);
    user.engagement.lastShareRewardAt = new Date().toISOString(); await persist();
    return json(res, 201, { delivery: issued.delivery, amount: issued.reward.amount, rewardCenter: rewardCenter(user) });
  }

  if (req.method === 'POST' && url.pathname === '/api/rewards/social/code') {
    const data = await body(req); const configured = String(ENV.NOTASTORE_SOCIAL_CODE || '').trim().toUpperCase(); const supplied = String(data.code || '').trim().toUpperCase();
    if (!configured) return json(res, 503, { error: 'La campagna social non è ancora attiva.' });
    if (!supplied || supplied !== configured) return json(res, 400, { error: 'Il codice social non è valido.' });
    const campaign = createHash('sha256').update(configured).digest('hex').slice(0, 16);
    if (user.engagement.socialCampaigns.includes(campaign)) return json(res, 409, { error: 'Hai già usato il codice di questa campagna.' });
    const issued = await createReward(user, 'SOCIAL_FOLLOW', amountFor(user, 0.50), user.level, { campaign });
    user.engagement.socialCampaigns.push(campaign); await persist();
    return json(res, 201, { delivery: issued.delivery, amount: issued.reward.amount, rewardCenter: rewardCenter(user) });
  }

  if (req.method === 'POST' && url.pathname === '/api/rewards/referrals/check') {
    const completed = await settleReferrals(user);
    return json(res, 200, { completed, rewardCenter: rewardCenter(user) });
  }

  if (url.pathname.startsWith('/api/admin/')) {
    if (user.role !== 'admin') return json(res, 403, { error: 'Accesso riservato agli amministratori.' });
    if (req.method === 'GET' && url.pathname === '/api/admin/users') {
      return json(res, 200, { users: db.users.map((entry) => ({ id: entry.id, name: entry.name, username: entry.username, email: entry.email, level: entry.level, wallet: entry.wallet, totalSpent: entry.totalSpent, isDemo: Boolean(entry.isDemo), role: entry.role || 'user', createdAt: entry.createdAt })) });
    }
    if (req.method === 'POST' && url.pathname === '/api/admin/rewards') {
      const data = await body(req);
      const target = db.users.find((entry) => entry.id === data.userId);
      const amount = Math.round(Number(data.amount) * 100) / 100;
      if (!target) return json(res, 404, { error: 'Utente non trovato.' });
      const creditLimit = LEVELS[target.level - 1]?.max || LEVELS[0].max;
      if (!Number.isFinite(amount) || amount <= 0) return json(res, 400, { error: 'Inserisci un importo valido.' });
      if (amount > creditLimit) return json(res, 400, { error: `Per ${LEVELS[target.level - 1].name} l’accredito massimo è ${creditLimit.toLocaleString('it-IT')} €.` });
      try {
        const issued = await createReward(target, 'ADMIN_CREDIT', amount, target.level);
        await persist();
        return json(res, 201, { ok: true, delivery: issued.delivery, expiresAt: issued.reward.expiresAt });
      } catch (error) { await persist(); return json(res, 503, { error: error.message }); }
    }
    const levelMatch = url.pathname.match(/^\/api\/admin\/users\/([^/]+)\/level$/);
    if (req.method === 'PUT' && levelMatch) {
      const target = db.users.find((entry) => entry.id === decodeURIComponent(levelMatch[1]));
      const data = await body(req); const level = Number(data.level);
      if (!target) return json(res, 404, { error: 'Utente non trovato.' });
      if (!Number.isInteger(level) || level < 1 || level > LEVELS.length) return json(res, 400, { error: 'Livello non valido.' });
      target.level = level; await persist();
      return json(res, 200, { ok: true, level, card: LEVELS[level - 1].name });
    }
    const metricsMatch = url.pathname.match(/^\/api\/admin\/users\/([^/]+)\/metrics$/);
    if (req.method === 'PUT' && metricsMatch) {
      const target = db.users.find((entry) => entry.id === decodeURIComponent(metricsMatch[1]));
      const data = await body(req); const wallet = Math.round(Number(data.wallet) * 100) / 100; const totalSpent = Math.round(Number(data.totalSpent) * 100) / 100;
      if (!target) return json(res, 404, { error: 'Utente non trovato.' });
      if (!Number.isFinite(wallet) || wallet < 0 || wallet > 1_000_000_000_000) return json(res, 400, { error: 'Saldo non valido.' });
      if (!Number.isFinite(totalSpent) || totalSpent < 0 || totalSpent > 1_000_000_000_000) return json(res, 400, { error: 'Spesa complessiva non valida.' });
      target.wallet = wallet; target.totalSpent = totalSpent; await persist();
      return json(res, 200, { ok: true, wallet, totalSpent });
    }
    return json(res, 404, { error: 'Endpoint admin non trovato.' });
  }

  if (req.method === 'PUT' && url.pathname === '/api/cart') {
    const data = await body(req);
    user.cart = Array.isArray(data.cart) ? data.cart.slice(0, 100).map((x) => ({ id: String(x.id), qty: Math.max(1, Math.min(20, Number(x.qty) || 1)), variants: x.variants && typeof x.variants === 'object' ? x.variants : {} })).filter((x) => PRODUCTS.some((p) => p.id === x.id)) : [];
    await persist(); return json(res, 200, { cart: user.cart });
  }

  if (req.method === 'PUT' && url.pathname === '/api/wishlist') {
    const data = await body(req); user.wishlist = [...new Set((data.wishlist || []).map(String))].filter((id) => PRODUCTS.some((p) => p.id === id)).slice(0, 200);
    await persist(); return json(res, 200, { wishlist: user.wishlist });
  }

  if (req.method === 'POST' && url.pathname === '/api/addresses') {
    const data = await body(req); const required = ['recipient', 'street', 'number', 'cap', 'city', 'region', 'country'];
    if (!required.every((k) => String(data[k] || '').trim())) return json(res, 400, { error: 'Completa tutti i campi obbligatori.' });
    const address = { id: randomUUID(), recipient: String(data.recipient).slice(0, 80), street: String(data.street).slice(0, 120), number: String(data.number).slice(0, 12), cap: String(data.cap).slice(0, 12), city: String(data.city).slice(0, 80), region: String(data.region).slice(0, 80), country: String(data.country).slice(0, 80), instructions: String(data.instructions || '').slice(0, 240) };
    user.addresses.push(address); await persist(); return json(res, 201, { address });
  }

  if (req.method === 'PUT' && url.pathname === '/api/privacy') {
    const data = await body(req); user.publicLeaderboard = Boolean(data.publicLeaderboard); await persist(); return json(res, 200, { publicLeaderboard: user.publicLeaderboard });
  }

  if (req.method === 'POST' && url.pathname === '/api/cards/unlock') {
    const data = await body(req); const requestedLevel = Number(data.level); const nextLevel = user.level + 1; const target = LEVELS.find((entry) => entry.level === requestedLevel);
    if (!target || requestedLevel !== nextLevel) return json(res, 409, { error: 'Puoi sbloccare soltanto la carta successiva.' });
    if (user.totalSpent < target.threshold) return json(res, 409, { error: 'Requisiti non ancora raggiunti.', threshold: target.threshold, totalSpent: user.totalSpent, missing: target.threshold - user.totalSpent });
    user.level = target.level;
    let delivery = null;
    if (!user.claimedLevelBonuses.includes(target.level)) {
      user.claimedLevelBonuses.push(target.level);
      try { delivery = (await createReward(user, 'LEVEL_UP_BONUS', target.bonus, target.level)).delivery; }
      catch (error) { console.error('Invio bonus sblocco non riuscito:', error.message); }
    }
    await persist(); return json(res, 200, { ok: true, level: target.level, card: target.name, delivery, bootstrap: bootstrap(user) });
  }

  if (req.method === 'POST' && url.pathname === '/api/checkout') {
    const data = await body(req); const cart = user.cart;
    const paymentKey = typeof data.paymentKey === 'string' && /^[a-zA-Z0-9-]{16,80}$/.test(data.paymentKey) ? data.paymentKey : null;
    const existing = paymentKey && user.orders.find(order => order.paymentKey === paymentKey);
    if (existing) return json(res, 200, { order: existing, wallet: user.wallet, totalSpent: user.totalSpent, bootstrap: bootstrap(user) });
    if (!cart.length) return json(res, 400, { error: 'Il carrello è vuoto.' });
    const address = user.addresses.find((a) => a.id === data.addressId) || user.addresses[0];
    if (!address) return json(res, 400, { error: 'Aggiungi un indirizzo prima di completare l’ordine.' });
    const items = [];
    for (const line of cart) {
      const product = PRODUCTS.find((p) => p.id === line.id);
      if (!product || product.stock === 0) return json(res, 409, { error: 'Uno dei prodotti non è disponibile.' });
      if (product.id === 'vg-04' && new Date() < new Date('2026-11-19T00:00:00+01:00')) return json(res, 409, { error: 'GTA VI sarà disponibile dal 19 novembre 2026.' });
      if (!validVariants(product, line.variants)) return json(res, 400, { error: `Seleziona tutte le varianti per ${product.name}.` });
      items.push({ id: product.id, productId: product.id, sku: product.sku || product.id.toUpperCase(), name: variantTitle(product, line.variants), brand: product.brand, category: product.category, image: variantImage(product, line.variants), variants: line.variants, qty: line.qty, unitPrice: variantPrice(product, line.variants) });
    }
    const shippingMethods = { std: 0, pri: 7.99, prem: 0 };
    const shippingId = Object.hasOwn(shippingMethods, data.shippingId) ? data.shippingId : 'std';
    const subtotal = items.reduce((s, x) => s + x.unitPrice * x.qty, 0); const shipping = shippingMethods[shippingId]; const total = Math.round((subtotal + shipping) * 100) / 100;
    if (user.wallet < total) return json(res, 409, { error: 'Saldo virtuale insufficiente.', balance: user.wallet, total });
    const order = { id: `NAS-${Date.now().toString(36).toUpperCase()}`, date: new Date().toISOString(), items, subtotal, shipping, shippingId, total, address: { ...address }, card: cardFor(user), status: 'Ordine confermato', step: 1 };
    if (paymentKey) order.paymentKey = paymentKey;
    transaction(user, 'PURCHASE', -total, { orderId: order.id, card: cardFor(user).name, cardLast4: user.cardLast4 }); user.orders.unshift(order); user.totalSpent = Math.round((user.totalSpent + total) * 100) / 100; user.cart = [];
    const levelUp = null; await persist();
    return json(res, 201, { order, wallet: user.wallet, totalSpent: user.totalSpent, levelUp, bootstrap: bootstrap(user) });
  }

  if (req.method === 'POST' && url.pathname === '/api/rewards/random') {
    const level = LEVELS[user.level - 1]; const amount = Math.floor(level.min + Math.random() * (level.max - level.min + 1));
    if (!user.isDemo && ENV.NOTASTORE_TEST_OUTBOX !== 'true') return json(res, 403, { error: 'Funzione disponibile soltanto per l’account demo.' });
    const issued = await createReward(user, 'RANDOM_CREDIT', amount, user.level); await persist(); return json(res, 201, { reward: issued.reward, message: 'Email simulata generata nella posta NotAStore.' });
  }

  return json(res, 404, { error: 'Endpoint non trovato.' });
}

async function claim(res, token) {
  const hash = createHash('sha256').update(token).digest('hex');
  const reward = db.rewards.find((r) => r.claimHash === hash); const user = reward && db.users.find((u) => u.id === reward.userId);
  if (!reward || !user) { res.writeHead(302, { Location: '/#/accredito?status=invalid' }); return res.end(); }
  if (reward.status === 'claimed') { res.writeHead(302, { Location: `/#/accredito?status=claimed&amount=${reward.amount}` }); return res.end(); }
  if (reward.status !== 'pending' || !reward.expiresAt || new Date(reward.expiresAt).getTime() <= Date.now()) {
    if (reward.status === 'pending') { reward.status = 'expired'; await persist(); }
    res.writeHead(302, { Location: '/#/accredito?status=invalid' }); return res.end();
  }
  reward.status = 'claimed'; reward.claimedAt = new Date().toISOString(); transaction(user, reward.type, reward.amount, { rewardId: reward.id }); await persist();
  res.writeHead(302, { Location: `/#/accredito?status=success&amount=${reward.amount}` }); res.end();
}

async function verifyEmail(res, token) {
  const tokenHash = createHash('sha256').update(token).digest('hex');
  const verification = db.emailVerifications.find((item) => item.tokenHash === tokenHash);
  const user = verification && db.users.find((entry) => entry.id === verification.userId);
  if (!verification || !user || verification.usedAt || new Date(verification.expiresAt).getTime() <= Date.now()) {
    res.writeHead(302, { ...securityHeaders(), Location: '/#/account/ricompense?verified=invalid' }); return res.end();
  }
  verification.usedAt = new Date().toISOString(); user.emailVerifiedAt = verification.usedAt;
  if (String(user.email).toLowerCase() === String(ENV.NOTASTORE_ADMIN_EMAIL || '').trim().toLowerCase()) user.role = 'admin';
  await persist();
  res.writeHead(302, { ...securityHeaders(), Location: '/#/account/ricompense?verified=success' }); return res.end();
}

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.svg': 'image/svg+xml', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json; charset=utf-8', '.json': 'application/json; charset=utf-8', '.ico': 'image/x-icon' };
const PUBLIC_PAGE = /^\/(?:prodotti|offerte|come-funziona|chi-siamo|privacy|termini|prodotto\/[^/]+)\/?$/;
async function staticFile(req, res, url) {
  const { stat } = await import('node:fs/promises');
  const { createReadStream } = await import('node:fs');
  const { extname, join, normalize, resolve } = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const ROOT = fileURLToPath(ROOT_URL);
  const rel = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
  const path = resolve(ROOT, `.${normalize(rel)}`);
  if (!path.startsWith(resolve(ROOT))) return json(res, 403, { error: 'Accesso negato' });
  try {
    const info = await stat(path); if (!info.isFile()) throw new Error();
    const extension = extname(path).toLowerCase();
    const cacheControl = ['.html', '.js', '.css', '.json'].includes(extension) ? 'no-cache' : 'public, max-age=3600';
    res.writeHead(200, { ...securityHeaders(), 'Content-Type': MIME[extension] || 'application/octet-stream', 'Cache-Control': cacheControl }); createReadStream(path).pipe(res);
  } catch {
    if (PUBLIC_PAGE.test(url.pathname)) {
      res.writeHead(200, { ...securityHeaders(), 'Content-Type': MIME['.html'], 'Cache-Control': 'no-cache' });
      return createReadStream(join(ROOT, 'index.html')).pipe(res);
    }
    json(res, 404, { error: 'File non trovato' });
  }
}

function scheduleCredits() {
  const minutes = Math.max(1, Number(ENV.NOTASTORE_CREDIT_INTERVAL_MINUTES || 180));
  const delay = minutes * 60_000 * (0.7 + Math.random() * 0.6);
  const timer = setTimeout(async () => {
    for (const user of db.users) {
      const level = LEVELS[user.level - 1];
      const amount = Math.floor(level.min + Math.random() * (level.max - level.min + 1));
      try { await createReward(user, 'RANDOM_CREDIT', amount, user.level); } catch (error) { console.error(`Accredito non inviato a ${user.email}:`, error.message); }
    }
    if (db.users.length) await persist();
    scheduleCredits();
  }, delay);
  timer.unref();
}
async function routeRequest(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if (req.method === 'GET' && url.pathname === '/healthz') return json(res, 200, { ok: true, service: 'notastore', storage: USE_SUPABASE ? 'supabase' : 'local', email: ENV.RESEND_API_KEY ? 'resend' : 'not-configured' });
    if (url.pathname.startsWith('/api/')) return await api(req, res, url);
    if (req.method === 'GET' && url.pathname.startsWith('/claim/')) return await claim(res, url.pathname.split('/').pop());
    if (req.method === 'GET' && url.pathname.startsWith('/verify/')) return await verifyEmail(res, url.pathname.split('/').pop());
    if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, { error: 'Metodo non consentito' });
    return await staticFile(req, res, url);
  } catch (error) { console.error(error); return json(res, 500, { error: 'Errore interno NotAStore.' }); }
}

class EdgeRequestAdapter {
  constructor(request, pathname) {
    this.method = request.method;
    this.url = `${pathname}${new URL(request.url).search}`;
    this.headers = Object.fromEntries(request.headers.entries());
    this.socket = { remoteAddress: request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'edge' };
    this.request = request;
  }
  async *[Symbol.asyncIterator]() {
    if (this.method === 'GET' || this.method === 'HEAD') return;
    const bytes = Buffer.from(await this.request.arrayBuffer());
    if (bytes.length) yield bytes;
  }
}

class EdgeResponseAdapter {
  constructor() { this.status = 200; this.headers = new Headers(); this.payload = null; }
  writeHead(status, headers = {}) {
    this.status = status;
    for (const [key, value] of Object.entries(headers)) this.headers.set(key, String(value));
  }
  end(payload = null) { this.payload = payload; }
  toResponse() {
    const location = this.headers.get('Location');
    if (location?.startsWith('/')) this.headers.set('Location', `${String(ENV.PUBLIC_BASE_URL || '').replace(/\/$/, '')}${location}`);
    return new Response(this.payload, { status: this.status, headers: this.headers });
  }
}

let edgeQueue = Promise.resolve();
export function handleEdgeRequest(request) {
  const run = async () => {
    await loadDb();
    const incoming = new URL(request.url);
    const marker = ['/functions/v1/notastore', '/notastore'].find((value) => incoming.pathname.startsWith(value));
    const pathname = marker ? incoming.pathname.slice(marker.length) || '/' : incoming.pathname;
    const req = new EdgeRequestAdapter(request, pathname);
    const res = new EdgeResponseAdapter();
    await routeRequest(req, res);
    return res.toResponse();
  };
  const result = edgeQueue.then(run, run);
  edgeQueue = result.then(() => undefined, () => undefined);
  return result;
}

let server = null;
if (!IS_EDGE) {
  await loadDb();
  if (ENV.NOTASTORE_ENABLE_SCHEDULED_CREDITS === 'true') scheduleCredits();
  const http = await import('node:http');
  server = http.default.createServer(routeRequest);
  server.listen(PORT, () => console.log(`NotAStore disponibile su http://localhost:${PORT}`));
}

export { server, LEVELS, routeRequest };
