import { PRODUCTS, byId, variantPrice, variantTitle, variantImage } from './data.js?v=20260922c';

const GUEST_KEY = 'notastore_guest_v1';

async function request(path, options = {}) {
  const response = await fetch(path, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
    body: options.body && typeof options.body !== 'string' ? JSON.stringify(options.body) : options.body,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw Object.assign(new Error(data.error || 'Operazione non riuscita'), { status: response.status, data });
  return data;
}

export const store = {
  user: null, wallet: 0, card: null, levels: [], cart: [], wishlist: [], recent: [], orders: [], transactions: [], rewards: [], outbox: [], rewardCenter: null,
  stats: { totalSpent: 0, orders: 0, rank: 0, next: null }, listeners: [],

  async init() {
    try { const data = await request('/api/bootstrap'); this.apply(data); if (!this.user) this.loadGuest(); }
    catch { this.loadGuest(); }
  },
  apply(data) {
    for (const key of ['user', 'wallet', 'card', 'levels', 'cart', 'wishlist', 'orders', 'transactions', 'rewards', 'outbox', 'stats', 'rewardCenter']) if (data[key] !== undefined) this[key] = data[key];
    this.emit(false);
  },
  loadGuest() { try { const p = JSON.parse(localStorage.getItem(GUEST_KEY) || '{}'); this.cart = Array.isArray(p.cart) ? p.cart : []; this.wishlist = Array.isArray(p.wishlist) ? p.wishlist : []; this.recent = Array.isArray(p.recent) ? p.recent : []; } catch {} },
  saveGuest() { if (!this.user) try { localStorage.setItem(GUEST_KEY, JSON.stringify({ cart: this.cart, wishlist: this.wishlist, recent: this.recent })); } catch {} },
  async syncCart() { if (this.user) await request('/api/cart', { method: 'PUT', body: { cart: this.cart } }); else this.saveGuest(); },
  async syncWishlist() { if (this.user) await request('/api/wishlist', { method: 'PUT', body: { wishlist: this.wishlist } }); else this.saveGuest(); },
  on(fn) { this.listeners.push(fn); },
  emit(persist = true) { if (persist) this.saveGuest(); this.listeners.forEach((fn) => fn()); },

  async register(payload) { const data = await request('/api/auth/register', { method: 'POST', body: payload }); this.apply(data); return data; },
  async login(payload) { const data = await request('/api/auth/login', { method: 'POST', body: payload }); this.apply(data); return data; },
  async logout() { await request('/api/auth/logout', { method: 'POST' }); Object.assign(this, { user: null, wallet: 0, card: null, orders: [], transactions: [], outbox: [], cart: [], wishlist: [] }); this.emit(); },
  async refresh() { this.apply(await request('/api/bootstrap')); },

  async add(id, qty = 1, variants = {}) { const key = JSON.stringify(variants); const line = this.cart.find((x) => x.id === id && JSON.stringify(x.variants || {}) === key); if (line) line.qty += qty; else this.cart.push({ id, qty, variants }); this.emit(); await this.syncCart(); return byId(id); },
  async setQty(id, qty, variants = null) { const line = this.cart.find((x) => x.id === id && (!variants || JSON.stringify(x.variants || {}) === JSON.stringify(variants))); if (!line) return; line.qty = Math.max(1, Math.min(20, qty)); this.emit(); await this.syncCart(); },
  async setQtyAt(index, qty) { const line = this.cart[index]; if (!line) return; line.qty = Math.max(1, Math.min(20, qty)); this.emit(); await this.syncCart(); },
  async setVariantAt(index, name, value) { const line = this.cart[index]; if (!line) return; line.variants = { ...(line.variants || {}), [name]: value }; this.emit(); await this.syncCart(); },
  async remove(id) { this.cart = this.cart.filter((x) => x.id !== id); this.emit(); await this.syncCart(); },
  async clear() { this.cart = []; this.emit(); await this.syncCart(); },
  async toggleWish(id) { const index = this.wishlist.indexOf(id); if (index >= 0) this.wishlist.splice(index, 1); else this.wishlist.unshift(id); this.emit(); await this.syncWishlist(); return index < 0; },
  visit(id) { this.recent = [id, ...this.recent.filter((x) => x !== id)].slice(0, 8); this.saveGuest(); },
  async checkout(addressId, shippingId = 'std') {
    const fingerprint = JSON.stringify([this.user?.id, this.cart, addressId, shippingId]);
    if (this.paymentAttempt?.fingerprint !== fingerprint) this.paymentAttempt = { fingerprint, key: crypto.randomUUID() };
    try {
      const data = await request('/api/checkout', { method: 'POST', signal: AbortSignal.timeout(30000), body: { addressId, shippingId, paymentKey: this.paymentAttempt.key } });
      this.paymentAttempt = null;
      this.apply(data.bootstrap); return data;
    } catch (error) {
      if (error.status >= 400 && error.status < 500) this.paymentAttempt = null;
      throw error;
    }
  },
  async addAddress(payload) { const data = await request('/api/addresses', { method: 'POST', body: payload }); await this.refresh(); return data.address; },
  async randomReward() { const data = await request('/api/rewards/random', { method: 'POST' }); await this.refresh(); return data; },
  async setLeaderboardPrivacy(value) { await request('/api/privacy', { method: 'PUT', body: { publicLeaderboard: value } }); await this.refresh(); },
  async leaderboard() { return request('/api/leaderboard'); },
  async adminUsers() { return request('/api/admin/users'); },
  async adminCredit(userId, amount) { return request('/api/admin/rewards', { method: 'POST', body: { userId, amount } }); },
  async adminSetLevel(userId, level) { const data = await request(`/api/admin/users/${encodeURIComponent(userId)}/level`, { method: 'PUT', body: { level } }); if (this.user?.id === userId) await this.refresh(); return data; },
  async adminSetMetrics(userId, wallet, totalSpent) { const data = await request(`/api/admin/users/${encodeURIComponent(userId)}/metrics`, { method: 'PUT', body: { wallet, totalSpent } }); if (this.user?.id === userId) await this.refresh(); return data; },
  async unlockCard(level) { const data = await request('/api/cards/unlock', { method: 'POST', body: { level } }); this.apply(data.bootstrap); return data; },
  async rewardCheckIn() { const data = await request('/api/rewards/check-in', { method: 'POST' }); this.rewardCenter = data.rewardCenter; return data; },
  async claimStreak(milestone) { const data = await request('/api/rewards/streak', { method: 'POST', body: { milestone } }); this.rewardCenter = data.rewardCenter; await this.refresh(); return data; },
  async rewardShare() { const data = await request('/api/rewards/social/share', { method: 'POST' }); this.rewardCenter = data.rewardCenter; await this.refresh(); return data; },
  async redeemSocialCode(code) { const data = await request('/api/rewards/social/code', { method: 'POST', body: { code } }); this.rewardCenter = data.rewardCenter; await this.refresh(); return data; },
  async checkReferrals() { const data = await request('/api/rewards/referrals/check', { method: 'POST' }); this.rewardCenter = data.rewardCenter; await this.refresh(); return data; },
  async resendVerification() { return request('/api/auth/resend-verification', { method: 'POST' }); },

  getOrder(id) { return this.orders.find((o) => o.id === id); }, latestOrder() { return this.orders[0]; },
  lines() { return this.cart.map((line) => ({ ...line, product: byId(line.id), unitPrice: variantPrice(byId(line.id), line.variants), displayName: variantTitle(byId(line.id), line.variants), displayImage: variantImage(byId(line.id), line.variants) })).filter((line) => line.product); },
  subtotal() { return this.lines().reduce((sum, line) => sum + line.unitPrice * line.qty, 0); }, count() { return this.cart.reduce((sum, line) => sum + line.qty, 0); },
  variantsComplete(product, selected = {}) { return Object.entries(product.variants || {}).every(([key, values]) => values.includes(String(selected[key] || ''))); },
};

export { PRODUCTS };
