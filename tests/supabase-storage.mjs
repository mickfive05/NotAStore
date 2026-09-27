import http from 'node:http';

let remoteState = null;
let writes = 0;
const mock = http.createServer(async (req, res) => {
  let raw = '';
  for await (const chunk of req) raw += chunk;
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'GET') return res.end(JSON.stringify(remoteState ? [{ state: remoteState }] : []));
  if (req.method === 'POST') { remoteState = JSON.parse(raw).state; writes += 1; res.statusCode = 201; return res.end('{}'); }
  if (req.method === 'PATCH') { remoteState = JSON.parse(raw).state; writes += 1; res.statusCode = 204; return res.end(); }
  res.statusCode = 405; return res.end('{}');
});

await new Promise((resolve) => mock.listen(8134, '127.0.0.1', resolve));
process.env.PORT = '8135';
process.env.NODE_ENV = 'production';
process.env.SUPABASE_URL = 'http://127.0.0.1:8134';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';
process.env.NOTASTORE_TEST_OUTBOX = 'true';

const { server, handleEdgeRequest } = await import('../server.js');

try {
  const response = await fetch('http://127.0.0.1:8135/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Supabase Test', username: 'supabasetest', email: 'supabase@test.local', password: 'TestPass123!' }),
  });
  if (!response.ok) throw new Error(`Registrazione fallita: ${response.status}`);
  if (!remoteState?.users?.some((user) => user.email === 'supabase@test.local')) throw new Error('Utente non persistito nello stato Supabase');
  const edgeResponse = await handleEdgeRequest(new Request('https://project.supabase.co/functions/v1/notastore/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '127.0.0.2' },
    body: JSON.stringify({ name: 'Edge Test', username: 'edgetest', email: 'edge@test.local', password: 'TestPass123!' }),
  }));
  if (edgeResponse.status !== 201 || !edgeResponse.headers.get('set-cookie')?.includes('__Host-nas_session=')) throw new Error('Adapter Edge Function non operativo');
  if (!remoteState?.users?.some((user) => user.email === 'edge@test.local')) throw new Error('Utente Edge non persistito nello stato Supabase');
  if (writes < 2) throw new Error('Inizializzazione o aggiornamento Supabase mancante');
  console.log('Test Supabase completato: persistenza Node + adapter Edge Function.');
} finally {
  await new Promise((resolve) => server.close(resolve));
  await new Promise((resolve) => mock.close(resolve));
}
