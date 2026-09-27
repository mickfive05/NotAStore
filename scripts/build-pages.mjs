import { cp, mkdir, rm } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

await cp(new URL('../coming-soon.html', import.meta.url), new URL('index.html', output));
await mkdir(new URL('css/', output), { recursive: true });
await mkdir(new URL('images/', output), { recursive: true });
await cp(new URL('../css/coming-soon.css', import.meta.url), new URL('css/coming-soon.css', output));
await cp(new URL('../images/notastore-logo.png', import.meta.url), new URL('images/notastore-logo.png', output));
await cp(new URL('../images/notastore-mark.svg', import.meta.url), new URL('images/notastore-mark.svg', output));

console.log('Build Cloudflare Pages pronto in dist/');
