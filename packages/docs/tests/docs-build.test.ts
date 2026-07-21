import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  pagefindOutputPath,
  relocateClientAssets,
  removeSpaFallbacks,
  restoreRedirectFiles,
} from '../src/react-router/docs-build.js';

const roots: string[] = [];

function temporaryRoot() {
  const root = mkdtempSync(join(tmpdir(), 'tinyrack-docs-build-'));
  roots.push(root);
  return root;
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { force: true, recursive: true });
});

describe('documentation build output', () => {
  it('restores redirect files after React Router prerender overwrites them', () => {
    const root = temporaryRoot();
    mkdirSync(join(root, 'legacy'), { recursive: true });
    writeFileSync(join(root, 'index.html'), '<title>Page not found</title>');
    writeFileSync(join(root, 'legacy', 'index.html'), '<title>Page not found</title>');

    restoreRedirectFiles(root, {
      'index.html': '<meta content="0;url=/en/" http-equiv="refresh" />',
      'legacy/index.html': '<meta content="0;url=/en/intro/" http-equiv="refresh" />',
    });

    expect(readFileSync(join(root, 'index.html'), 'utf8')).toContain('url=/en/');
    expect(readFileSync(join(root, 'legacy', 'index.html'), 'utf8')).toContain(
      'url=/en/intro/',
    );
  });

  it('rejects redirect paths outside the build root', () => {
    const root = temporaryRoot();
    expect(() => restoreRedirectFiles(root, { '../escape.html': 'unsafe' })).toThrow(
      'Redirect output must stay inside the client build',
    );
  });

  it('removes nested SPA fallback files without deleting real index files', () => {
    const root = temporaryRoot();
    mkdirSync(join(root, 'nested'), { recursive: true });
    writeFileSync(join(root, 'index.html'), 'home');
    writeFileSync(join(root, '__spa-fallback.html'), 'fallback');
    writeFileSync(join(root, 'nested', '__spa-fallback.html'), 'fallback');

    removeSpaFallbacks(root);

    expect(readFileSync(join(root, 'index.html'), 'utf8')).toBe('home');
    expect(existsSync(join(root, '__spa-fallback.html'))).toBe(false);
    expect(existsSync(join(root, 'nested', '__spa-fallback.html'))).toBe(false);
  });

  it('relocates all root assets under a multi-segment base path', () => {
    const root = temporaryRoot();
    mkdirSync(join(root, 'team', 'docs'), { recursive: true });
    mkdirSync(join(root, 'assets'), { recursive: true });
    writeFileSync(join(root, 'index.html'), 'obsolete root');
    writeFileSync(join(root, 'team', 'docs', 'index.html'), 'docs home');
    writeFileSync(join(root, 'assets', 'app.js'), 'asset');
    writeFileSync(join(root, 'robots.txt'), 'robots');

    relocateClientAssets(root, '/team/docs');

    expect(readFileSync(join(root, 'team', 'docs', 'index.html'), 'utf8')).toBe(
      'docs home',
    );
    expect(readFileSync(join(root, 'team', 'docs', 'assets', 'app.js'), 'utf8')).toBe(
      'asset',
    );
    expect(readFileSync(join(root, 'team', 'docs', 'robots.txt'), 'utf8')).toBe(
      'robots',
    );
    expect(existsSync(join(root, 'assets'))).toBe(false);
    expect(existsSync(join(root, 'robots.txt'))).toBe(false);
  });

  it('selects Pagefind output inside the deployed base path', () => {
    const root = temporaryRoot();
    expect(pagefindOutputPath(root, '/')).toBe(join(root, 'pagefind'));
    expect(pagefindOutputPath(root, '/team/docs')).toBe(
      join(root, 'team', 'docs', 'pagefind'),
    );
  });
});
