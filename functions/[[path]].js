const PROXY_PREFIXES = ['/api/', '/claim/', '/verify/', '/healthz'];
const PREVIEW_PREFIX = '/preview';
const ADMIN_PREFIX = '/amministrazione';

function cookieValue(request, name) {
  const cookies = request.headers.get('cookie') || '';
  for (const item of cookies.split(';')) {
    const [key, ...value] = item.trim().split('=');
    if (key === name) return decodeURIComponent(value.join('='));
  }
  return '';
}

async function accessToken(secret) {
  const bytes = new TextEncoder().encode(`notastore-preview:${secret}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function hasPrivateAccess(context) {
  const configuredCode = String(context.env.PREVIEW_ACCESS_CODE || '');
  const expectedToken = configuredCode ? await accessToken(configuredCode) : '';
  return Boolean(expectedToken && cookieValue(context.request, 'notastore_preview') === expectedToken);
}

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.pathname === '/api/preview-login' && context.request.method === 'POST') {
    const configuredCode = String(context.env.PREVIEW_ACCESS_CODE || '');
    const form = await context.request.formData();
    const submittedCode = String(form.get('code') || '');
    const returnTo = String(form.get('next') || '') === '/admin' ? '/admin' : '/preview/#/';
    if (!configuredCode || submittedCode !== configuredCode) {
      return Response.redirect(`${url.origin}${returnTo === '/admin' ? '/admin?errore=1' : '/accesso.html?errore=1'}`, 303);
    }
    const token = await accessToken(configuredCode);
    const base = String(context.env.SUPABASE_FUNCTION_URL || '').replace(/\/$/, '');
    const key = String(context.env.SUPABASE_PUBLISHABLE_KEY || '');
    if (!base) return Response.json({ error: 'Backend Supabase non configurato.' }, { status: 503 });
    const sessionResponse = await fetch(`${base}/api/admin/session`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-notastore-admin-key': configuredCode, ...(key ? { apikey: key } : {}) },
      body: '{}',
    });
    if (!sessionResponse.ok) {
      const detail = await sessionResponse.json().catch(() => ({}));
      return Response.json({ error: detail.error || 'Sessione amministratore non disponibile.' }, { status: sessionResponse.status });
    }
    const responseHeaders = new Headers({ location: `${url.origin}${returnTo}`, 'cache-control': 'no-store' });
    responseHeaders.append('set-cookie', `notastore_preview=${token}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Strict`);
    const accountCookie = sessionResponse.headers.get('set-cookie');
    if (accountCookie) responseHeaders.append('set-cookie', accountCookie);
    return new Response(null, { status: 303, headers: responseHeaders });
  }

  if (url.pathname === '/api/private-status') {
    return Response.json({ authenticated: await hasPrivateAccess(context) }, { headers: { 'cache-control': 'no-store' } });
  }

  if (url.pathname === '/api/preview-logout') {
    return new Response(null, {
      status: 303,
      headers: {
        location: `${url.origin}/`,
        'set-cookie': 'notastore_preview=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict',
        'cache-control': 'no-store',
      },
    });
  }

  if (url.pathname === PREVIEW_PREFIX || url.pathname.startsWith(`${PREVIEW_PREFIX}/`) || url.pathname === ADMIN_PREFIX || url.pathname.startsWith(`${ADMIN_PREFIX}/`)) {
    if (!(await hasPrivateAccess(context))) {
      return Response.redirect(`${url.origin}/admin`, 302);
    }
  }

  if (!PROXY_PREFIXES.some((prefix) => url.pathname === prefix || url.pathname.startsWith(prefix))) {
    return context.next();
  }

  const base = String(context.env.SUPABASE_FUNCTION_URL || '').replace(/\/$/, '');
  if (!base) return Response.json({ error: 'Backend Supabase non configurato.' }, { status: 503 });

  const target = new URL(`${base}${url.pathname}${url.search}`);
  const headers = new Headers(context.request.headers);
  const key = String(context.env.SUPABASE_PUBLISHABLE_KEY || '');
  if (key) headers.set('apikey', key);
  if (url.pathname.startsWith('/api/admin/')) {
    if (!(await hasPrivateAccess(context))) return Response.json({ error: 'Accesso amministratore non valido.' }, { status: 401 });
    headers.set('x-notastore-admin-key', String(context.env.PREVIEW_ACCESS_CODE || ''));
  }
  headers.delete('host');

  const response = await fetch(target, {
    method: context.request.method,
    headers,
    body: ['GET', 'HEAD'].includes(context.request.method) ? undefined : context.request.body,
    redirect: 'manual',
  });
  return new Response(response.body, { status: response.status, headers: response.headers });
}
