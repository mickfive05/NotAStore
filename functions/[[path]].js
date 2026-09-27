const PROXY_PREFIXES = ['/api/', '/claim/', '/verify/', '/healthz'];

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (!PROXY_PREFIXES.some((prefix) => url.pathname === prefix || url.pathname.startsWith(prefix))) {
    return context.next();
  }

  const base = String(context.env.SUPABASE_FUNCTION_URL || '').replace(/\/$/, '');
  if (!base) return Response.json({ error: 'Backend Supabase non configurato.' }, { status: 503 });

  const target = new URL(`${base}${url.pathname}${url.search}`);
  const headers = new Headers(context.request.headers);
  const key = String(context.env.SUPABASE_PUBLISHABLE_KEY || '');
  if (key) headers.set('apikey', key);
  headers.delete('host');

  const response = await fetch(target, {
    method: context.request.method,
    headers,
    body: ['GET', 'HEAD'].includes(context.request.method) ? undefined : context.request.body,
    redirect: 'manual',
  });
  return new Response(response.body, { status: response.status, headers: response.headers });
}
