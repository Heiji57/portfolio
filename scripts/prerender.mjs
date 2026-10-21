// Runs after `vite build` + the SSR build: fills dist/index.html with the rendered page and
// structured data, and writes robots.txt, sitemap.xml and llms.txt from the same site data.
import { readFile, rm, writeFile } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const ssrDir = new URL('../dist-ssr/', import.meta.url);

const { render, site, structuredData, llmsTxt } = await import(new URL('entry-server.js', ssrDir).href);

// `<` is escaped so text inside the JSON can never close the script tag.
const jsonLd = JSON.stringify(structuredData()).replace(/</g, '\\u003c');

const indexPath = new URL('index.html', dist);
const template = await readFile(indexPath, 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('prerender: empty #root not found in dist/index.html');

const html = template
  .replace('<div id="root"></div>', () => `<div id="root">${render()}</div>`)
  .replace('</head>', () => `  <script type="application/ld+json">${jsonLd}</script>\n  </head>`);

const today = new Date().toISOString().slice(0, 10);

await Promise.all([
  writeFile(indexPath, html),
  writeFile(new URL('llms.txt', dist), llmsTxt()),
  writeFile(new URL('robots.txt', dist), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}sitemap.xml\n`),
  writeFile(
    new URL('sitemap.xml', dist),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site.url}</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`,
  ),
]);

await rm(ssrDir, { recursive: true, force: true });
console.log('prerender: wrote index.html, llms.txt, robots.txt, sitemap.xml');
