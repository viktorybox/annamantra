import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const files = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(filename);
    else if (entry.name.endsWith('.html')) files.push(filename);
  }
}
await walk(root);
const pages = new Map();
const errors = [];
for (const filename of files) {
  const html = await readFile(filename, 'utf8');
  const route = `/${path.relative(root, filename).replaceAll(path.sep, '/').replace(/index\.html$/, '')}`;
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${route}: duplicate id`);
  const redirect = /http-equiv="refresh"/i.test(html);
  if (!redirect && (html.match(/<h1\b/g) ?? []).length !== 1) errors.push(`${route}: expected one h1`);
  if (!redirect && !/<html[^>]+lang="(?:ru|fr)"/.test(html)) errors.push(`${route}: missing language`);
  if (!redirect && !/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${route}: missing description`);
  if (/inbox[\\/]/i.test(html)) errors.push(`${route}: source inbox path in output`);
  if (/<(?:script|link)[^>]+(?:src|href)="https?:\/\//i.test(html)) errors.push(`${route}: remote script or stylesheet`);
  pages.set(filename, { route, html, ids: new Set(ids) });
}
for (const page of pages.values()) {
  for (const match of page.html.matchAll(/\b(href|src|poster)="([^"]*)"/g)) {
    const [ , attribute, raw ] = match;
    const value = raw.replaceAll('&amp;', '&');
    if (!value) { errors.push(`${page.route}: empty ${attribute}`); continue; }
    if (/^(?:https?:|mailto:|tel:|data:)/i.test(value)) continue;
    if (/^[a-z][a-z\d+.-]*:/i.test(value)) { errors.push(`${page.route}: unsupported URL ${value}`); continue; }
    const url = new URL(value, `https://audit.invalid${page.route}`);
    const decoded = decodeURIComponent(url.pathname);
    const candidate = path.resolve(root, `.${decoded}`);
    if (!candidate.startsWith(`${root}${path.sep}`) && candidate !== root) { errors.push(`${page.route}: invalid path ${value}`); continue; }
    let target = candidate;
    if (!path.extname(decoded)) target = path.join(candidate, 'index.html');
    try { await access(target); } catch { errors.push(`${page.route}: missing ${value}`); continue; }
    if (attribute === 'href' && url.hash && pages.has(target) && !pages.get(target).ids.has(decodeURIComponent(url.hash.slice(1)))) errors.push(`${page.route}: missing anchor ${value}`);
  }
  for (const match of page.html.matchAll(/\baria-controls="([^"]+)"/g)) {
    if (!page.ids.has(match[1])) errors.push(`${page.route}: missing aria-controls target ${match[1]}`);
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else console.log(`Checked ${pages.size} HTML pages: internal links, anchors, assets, headings and language are valid.`);
