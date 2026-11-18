// Renders every email in render-all.tsx to HTML and plain text for the MX email previews workflow
// (.github/workflows/mx-email-previews.yml). Vite loads the templates with the same Lingui macro
// and catalog plugins as the email preview app (packages/email/preview), in development mode so the
// source strings are used where a catalog has no entry yet.
//
// Run from packages/email after `npm ci` and `prisma generate`:
//   NODE_ENV=development node mx-previews/run.mjs <output folder>
import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { lingui } from '@lingui/vite-plugin';
import { createServer } from 'vite';
import macrosPlugin from 'vite-plugin-babel-macros';

process.env.NODE_ENV ??= 'development';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(process.argv[2] ?? path.join(here, 'out'));

const server = await createServer({
  configFile: false,
  root: here,
  logLevel: 'warn',
  appType: 'custom',
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [] },
  esbuild: { jsx: 'automatic', jsxDev: false },
  plugins: [macrosPlugin(), lingui()],
  ssr: {
    noExternal: ['@documenso/email'],
    external: [
      '@napi-rs/canvas',
      '@node-rs/bcrypt',
      '@prisma/client',
      '@documenso/tailwind-config',
      'playwright',
      'playwright-core',
      '@playwright/browser-chromium',
      'pdfjs-dist',
      '@google-cloud/kms',
      '@google-cloud/secret-manager',
    ],
  },
});

let failures = [];

try {
  const { renderAll, previewAssetBaseUrl } = await server.ssrLoadModule('/render-all.tsx');
  const rendered = await renderAll();

  failures = rendered.failures;

  // The emails point at the pictures on sign.mediax.plus, like a real send. A second copy points at
  // the pictures in this branch, so new pictures can be judged before a release ships them.
  const localDir = path.join(outDir, 'with-local-pictures');
  mkdirSync(localDir, { recursive: true });
  cpSync(path.resolve(here, '../../../apps/remix/public/static'), path.join(outDir, 'static'), {
    recursive: true,
    filter: (source) => !source.endsWith('.svg') && !source.includes('og-share'),
  });

  for (const { name, html, text } of rendered.results) {
    writeFileSync(path.join(outDir, `${name}.html`), html);
    writeFileSync(path.join(outDir, `${name}.txt`), text);
    writeFileSync(path.join(localDir, `${name}.html`), html.replaceAll(`${previewAssetBaseUrl}/static/`, '../static/'));
  }

  const escape = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // One page with every email at 600 px and as a 360 px phone, side by side.
  const rows = rendered.results
    .map(
      ({ name, description }) => `<section>
<h2><a href="${name}.html">${escape(name)}</a> <span>${escape(description)}</span> <a href="${name}.txt">text</a></h2>
<div class="pair"><iframe src="with-local-pictures/${name}.html" width="600" height="900" title="${escape(name)} at 600 px"></iframe><iframe src="with-local-pictures/${name}.html" width="360" height="900" title="${escape(name)} at 360 px"></iframe></div>
</section>`,
    )
    .join('\n');

  writeFileSync(
    path.join(outDir, 'index.html'),
    `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>MX email previews</title>
<style>
body{margin:0;padding:24px;font:14px/20px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0b2035;background:#f5f5f5}
h1{font-size:20px;margin:0 0 4px}
p{margin:0 0 24px;color:#3b4659}
section{margin:0 0 32px}
h2{font-size:15px;margin:0 0 8px}
h2 span{font-weight:400;color:#3b4659}
.pair{display:flex;gap:24px;align-items:flex-start}
iframe{border:1px solid #e6e6e6;background:#ffffff}
</style></head>
<body>
<h1>MX email previews</h1>
<p>Left at 600 px, right as a 360 px phone, with the pictures from this branch. The files in the top folder load their pictures from sign.mediax.plus, as a real send does.</p>
${rows}
</body></html>
`,
  );

  writeFileSync(
    path.join(outDir, 'checks.txt'),
    failures.length > 0 ? `${failures.join('\n')}\n` : `All ${rendered.results.length} emails passed the checks.\n`,
  );

  console.log(`Rendered ${rendered.results.length} emails into ${outDir}`);
} finally {
  await server.close();
}

if (failures.length > 0) {
  console.error(`${failures.length} checks failed:\n${failures.join('\n')}`);
  process.exit(1);
}
