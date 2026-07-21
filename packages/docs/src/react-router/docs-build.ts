import { mkdirSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import * as pagefind from 'pagefind';
import type { DocsManifest } from '../config/docs-config.ts';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function createRedirectPage(target: string, manifest: DocsManifest) {
  const canonicalTarget = `${manifest.site.url}${target}`;
  return `<!doctype html>
<html lang="${escapeXml(manifest.locales[manifest.defaultLocale]?.language ?? manifest.site.locale.language)}">
  <head>
    <meta charset="utf-8" />
    <meta content="0;url=${escapeXml(target)}" http-equiv="refresh" />
    <link href="${escapeXml(canonicalTarget)}" rel="canonical" />
    <meta content="noindex" name="robots" />
    <title>Redirecting · ${escapeXml(manifest.site.title)}</title>
  </head>
  <body><a href="${escapeXml(target)}">Continue</a></body>
</html>\n`;
}

function redirectFile(path: string) {
  const normalized = path.replace(/^\/+|\/+$/g, '');
  return normalized.length === 0 ? 'index.html' : `${normalized}/index.html`;
}

export function createRedirectFiles(manifest: DocsManifest) {
  return new Map(
    Object.entries(manifest.redirects).map(([path, target]) => [
      redirectFile(path),
      createRedirectPage(target, manifest),
    ]),
  );
}

export function restoreRedirectFiles(
  clientRoot: string,
  redirects: Readonly<Record<string, string>>,
) {
  const resolvedRoot = resolve(clientRoot);
  for (const [fileName, source] of Object.entries(redirects)) {
    const output = resolve(resolvedRoot, fileName);
    const relativeOutput = relative(resolvedRoot, output);
    if (
      isAbsolute(relativeOutput) ||
      relativeOutput === '..' ||
      relativeOutput.startsWith(`..${sep}`)
    ) {
      throw new Error(`Redirect output must stay inside the client build: ${fileName}`);
    }
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, source);
  }
}

export function removeSpaFallbacks(directory: string) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      removeSpaFallbacks(path);
      continue;
    }
    if (entry.name === '__spa-fallback.html') rmSync(path, { force: true });
  }
}

export function pagefindOutputPath(clientRoot: string, basePath: string) {
  return basePath === '/'
    ? join(clientRoot, 'pagefind')
    : join(clientRoot, ...basePath.split('/').filter(Boolean), 'pagefind');
}

export function relocateClientAssets(clientRoot: string, basePath: string) {
  if (basePath === '/') return;
  const segments = basePath.split('/').filter(Boolean);
  const firstSegment = segments[0];
  if (firstSegment === undefined) return;

  const targetRoot = join(clientRoot, ...segments);
  mkdirSync(targetRoot, { recursive: true });
  for (const entry of readdirSync(clientRoot, { withFileTypes: true })) {
    if (entry.name === firstSegment) continue;
    if (entry.isFile() && entry.name === 'index.html') {
      rmSync(join(clientRoot, entry.name), { force: true });
      continue;
    }
    renameSync(join(clientRoot, entry.name), join(targetRoot, entry.name));
  }
}

function assertNoPagefindErrors(operation: string, errors: string[]) {
  if (errors.length > 0) {
    throw new Error(`Pagefind ${operation} failed:\n${errors.join('\n')}`);
  }
}

async function buildPagefindIndex(clientRoot: string, basePath: string) {
  try {
    const created = await pagefind.createIndex();
    assertNoPagefindErrors('initialization', created.errors);
    if (created.index === undefined)
      throw new Error('Pagefind did not create an index');

    const added = await created.index.addDirectory({ path: clientRoot });
    assertNoPagefindErrors('indexing', added.errors);
    const outputPath = pagefindOutputPath(clientRoot, basePath);
    rmSync(outputPath, { force: true, recursive: true });
    const written = await created.index.writeFiles({ outputPath });
    assertNoPagefindErrors('output', written.errors);
  } finally {
    await pagefind.close();
  }
}

export async function finalizeDocsBuild(clientRoot: string, manifest: DocsManifest) {
  removeSpaFallbacks(clientRoot);
  restoreRedirectFiles(clientRoot, Object.fromEntries(createRedirectFiles(manifest)));
  await buildPagefindIndex(clientRoot, manifest.site.basePath);
  relocateClientAssets(clientRoot, manifest.site.basePath);
}
