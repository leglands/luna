import assert from 'node:assert/strict';
import { access, readdir, readFile, stat } from 'node:fs/promises';
import { dirname, relative, resolve, sep } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const WEB = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = resolve(WEB, 'build');
const ROUTES = resolve(WEB, 'src/routes');
const DOMAIN = 'luna.macaron-software.com';
const SITEMAP_LOCS = [`https://${DOMAIN}/`];

async function text(path) {
  return readFile(path, 'utf8');
}

async function routeAllowlist(dir = ROUTES, prefix = '') {
  const entries = await readdir(dir, { withFileTypes: true });
  const routes = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      routes.push(...await routeAllowlist(resolve(dir, entry.name), `${prefix}/${entry.name}`));
    } else if (entry.name === '+page.svelte') {
      routes.push(prefix || '/');
    }
  }
  return routes.map((route) => route === '/' ? '/' : `${route.replace(/\/+$/, '')}/`).sort();
}

async function staticFile(requestPath) {
  const clean = requestPath === '/' ? '' : requestPath.replace(/^\/+|\/+$/g, '');
  const candidates = clean
    ? [resolve(BUILD, clean), resolve(BUILD, clean, 'index.html')]
    : [resolve(BUILD, 'index.html')];
  for (const candidate of candidates) {
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {
      // This candidate is not a published file.
    }
  }
  return null;
}

async function generatedPageFiles() {
  const files = [];
  async function visit(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = resolve(dir, entry.name);
      if (entry.isDirectory()) await visit(path);
      else if (entry.name === 'index.html') files.push(relative(BUILD, path).split(sep).join('/'));
    }
  }
  await visit(BUILD);
  return files.sort();
}

function canonicalFrom(html) {
  return html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? null;
}

test('Luna build publishes exactly the source-derived page allowlist', async () => {
  const routes = await routeAllowlist();
  assert.deepEqual(routes, [
    '/', '/cycle/', '/export/', '/fertility/', '/history/', '/insights/',
    '/log/', '/onboarding/', '/settings/',
  ]);

  const expectedFiles = routes.map((route) => route === '/' ? 'index.html' : `${route.slice(1)}index.html`);
  assert.deepEqual(await generatedPageFiles(), expectedFiles.sort());

  for (const route of routes) {
    await access(resolve(BUILD, route === '/' ? 'index.html' : `${route.slice(1)}index.html`));
    assert.ok(await staticFile(route), `missing ${route}`);
    if (route !== '/') assert.ok(await staticFile(route.slice(0, -1)), `missing slash variant ${route}`);
  }
});

test('Luna unknown deep links and absent legal endpoints stay 404 candidates', async () => {
  for (const unknown of [
    '/privacy',
    '/privacy/',
    '/terms',
    '/terms/',
    '/llms.txt',
    '/.well-known/security.txt',
    '/.well-known/apple-app-site-association',
    '/.well-known/assetlinks.json',
    '/not-a-real-route',
    '/not-a-real-route/deep/',
  ]) {
    assert.equal(await staticFile(unknown), null, `${unknown} must not be in static output`);
  }
});

test('Luna sitemap and canonicals use exact owner URLs with trailing slash', async () => {
  const xml = await text(resolve(BUILD, 'sitemap.xml'));
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc);
  assert.deepEqual(locs, SITEMAP_LOCS);
  assert.doesNotMatch(xml, /guide\.aida\.macaron-software\.com/);
  assert.doesNotMatch(xml, /https?:\/\/[^<]*[^/]<\/loc>/);

  for (const route of await routeAllowlist()) {
    const html = await text(await staticFile(route));
    assert.equal(canonicalFrom(html), `https://${DOMAIN}${route}`, `canonical for ${route}`);
  }
});

test('Luna static build has no analytics script and no generated .svelte-kit artifact', async () => {
  const appHtml = await text(resolve(WEB, 'src/app.html'));
  const privacyPolicy = await text(resolve(WEB, '..', 'docs/privacy_policy.md'));
  assert.doesNotMatch(appHtml, /analytics\.macaron-software\.com\/script\.js/);
  assert.doesNotMatch(appHtml, /data-website-id=/);
  assert.doesNotMatch(appHtml, /<script[^>]+src=["']https?:\/\//i);
  assert.match(privacyPolicy, /Analytics, ads, tracking \| \*\*None\*\*/);
  assert.doesNotMatch((await generatedPageFiles()).join('\n'), /\.svelte-kit/);
});

test('Luna static adapter is strict and has no fictitious legal routes', async () => {
  const config = await text(resolve(WEB, 'svelte.config.js'));
  const layout = await text(resolve(WEB, 'src/routes/+layout.ts'));

  assert.doesNotMatch(config, /fallback\s*:/);
  assert.match(config, /strict\s*:\s*true/);
  assert.match(layout, /export const prerender = true;/);
  assert.match(layout, /export const trailingSlash = ['"]always['"];/);
  await assert.rejects(access(resolve(WEB, 'src/routes/privacy')));
  await assert.rejects(access(resolve(WEB, 'src/routes/terms')));
});
