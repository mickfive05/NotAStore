// Isolated UI fixture: never reads or writes the live account database.
import { join } from 'node:path';
import { unlink } from 'node:fs/promises';
const dbFile = join(process.cwd(), 'data', `preview-${Date.now()}.json`);
process.env.NOTASTORE_DB_FILE = dbFile;
process.env.PORT = '8128';
const { server } = await import('../server.js');
let cookie = '';
async function call(path, payload) {
  const r = await fetch(`http://127.0.0.1:8128/api/${path}`, { method:'POST', headers: { 'Content-Type':'application/json', Cookie:cookie }, body:JSON.stringify(payload) });
  cookie = r.headers.get('set-cookie')?.split(';')[0] || cookie;
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
await call('auth/register', {name:'Preview',username:'previewtest',email:'preview@notastore.local',password:'PreviewTest123!'});
await call('addresses', {recipient:'Preview',street:'Via Demo',number:'1',cap:'20100',city:'Milano',region:'MI',country:'Italia'});
console.log('UI fixture ready: http://127.0.0.1:8128/#/login');
async function close() { await new Promise(resolve => server.close(resolve)); await unlink(dbFile).catch(()=>{}); process.exit(0); }
process.on('SIGINT', close);
process.on('SIGTERM', close);
