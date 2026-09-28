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

await cp(new URL('../accesso.html', import.meta.url), new URL('accesso.html', output));
await mkdir(new URL('admin/', output), { recursive: true });
await cp(new URL('../admin-gateway.html', import.meta.url), new URL('admin/index.html', output));
await mkdir(new URL('amministrazione/', output), { recursive: true });
await cp(new URL('../admin-console.html', import.meta.url), new URL('amministrazione/index.html', output));

const preview = new URL('preview/', output);
await mkdir(preview, { recursive: true });
await cp(new URL('../index.html', import.meta.url), new URL('index.html', preview));
for (const directory of ['css', 'data', 'images', 'js']) {
  await cp(new URL(`../${directory}/`, import.meta.url), new URL(`${directory}/`, preview), { recursive: true });
}
for (const file of ['manifest.webmanifest', 'robots.txt', 'sitemap.xml']) {
  await cp(new URL(`../${file}`, import.meta.url), new URL(file, preview));
}

console.log('Build Cloudflare Pages pronto in dist/');
