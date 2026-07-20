import { readFile, stat } from 'node:fs/promises';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { extname, join, resolve, sep } from 'node:path';
import { loadDocsManifest } from '@tinyrack/docs/config';
import { type Browser, chromium, type Locator, type Page } from 'playwright';
import sharp from 'sharp';
import { expect } from 'vitest';
import { componentDocsManifest } from '../app/content/shared/component-docs-manifest.js';
import config from '../docs.config.js';

export { componentDocsManifest, sharp };

const buildRoot = join(process.cwd(), 'build/client');
export const staticDocumentRoutes = loadDocsManifest(config, {
  root: process.cwd(),
}).pages;

export const localeUi = {
  en: { navigation: 'Documentation', openNavigation: 'Open navigation' },
  ko: { navigation: '문서', openNavigation: '탐색 열기' },
  ja: { navigation: 'ドキュメント', openNavigation: 'ナビゲーションを開く' },
} as const;

const contentTypes: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pagefind': 'application/wasm',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
};

async function staticPath(requestUrl: string) {
  const pathname = decodeURIComponent(
    new URL(requestUrl, 'http://homepage.local').pathname,
  ).replaceAll('\\', '/');
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const baseCandidate = resolve(buildRoot, relative);
  const rootPrefix = `${resolve(buildRoot)}${sep}`;
  if (baseCandidate !== resolve(buildRoot) && !baseCandidate.startsWith(rootPrefix)) {
    return undefined;
  }

  for (const candidate of [
    baseCandidate,
    join(baseCandidate, 'index.html'),
    `${baseCandidate}.html`,
  ]) {
    try {
      const candidateStat = await stat(candidate);
      if (candidateStat.isFile()) return candidate;
    } catch {}
  }
  return undefined;
}

async function startServer() {
  const server = createServer(async (request, response) => {
    const path = await staticPath(request.url ?? '/');
    if (path === undefined) {
      const notFound = await readFile(join(buildRoot, '404.html'));
      response.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
      response.end(notFound);
      return;
    }
    const file = await readFile(path);
    response.writeHead(200, {
      'cache-control': 'no-store',
      'content-type': contentTypes[extname(path)] ?? 'application/octet-stream',
    });
    response.end(file);
  });

  await new Promise<void>((resolveListen, rejectListen) => {
    server.once('error', rejectListen);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', rejectListen);
      resolveListen();
    });
  });
  return {
    origin: `http://127.0.0.1:${(server.address() as AddressInfo).port}`,
    server,
  };
}

async function closeServer(server: Server) {
  await new Promise<void>((resolveClose, rejectClose) => {
    server.close((error) =>
      error === undefined ? resolveClose() : rejectClose(error),
    );
  });
}

export async function holdRouteModule(page: Page, assetPattern: RegExp) {
  let releaseRequest = () => {};
  const requestGate = new Promise<void>((resolveRequest) => {
    releaseRequest = resolveRequest;
  });
  await page.route(assetPattern, async (route) => {
    await requestGate;
    await route.continue();
  });
  return releaseRequest;
}

export async function setTheme(page: Page, theme: 'tinyrack-dark' | 'tinyrack-light') {
  await page.addInitScript((selectedTheme) => {
    localStorage.setItem('tinyrack-theme', selectedTheme);
  }, theme);
}

export async function gotoHydrated(page: Page, url: string) {
  await page.goto(url);
  await page.locator('html[data-hydrated="true"]').waitFor();
}

export async function expectVisible(locator: Locator) {
  await locator.waitFor({ state: 'visible' });
}

export async function expectHidden(locator: Locator) {
  await locator.waitFor({ state: 'hidden' });
}

export async function expectInsideViewport(page: Page, locator: Locator) {
  await expect
    .poll(async () => {
      const box = await locator.boundingBox();
      const viewport = page.viewportSize();
      if (box === null || viewport === null) return false;

      return (
        box.x >= -1 &&
        box.y >= -1 &&
        box.x + box.width <= viewport.width + 1 &&
        box.y + box.height <= viewport.height + 1
      );
    })
    .toBe(true);
}

export async function expectHorizontallyInsideViewport(page: Page, locator: Locator) {
  await expect
    .poll(async () => {
      const box = await locator.boundingBox();
      const viewport = page.viewportSize();
      if (box === null || viewport === null) return false;

      return box.x >= -1 && box.x + box.width <= viewport.width + 1;
    })
    .toBe(true);
}

export async function expectVerticallyCentered(container: Locator, item: Locator) {
  const containerBox = await container.boundingBox();
  const itemBox = await item.boundingBox();
  expect(containerBox).not.toBeNull();
  expect(itemBox).not.toBeNull();

  const containerCenter = (containerBox?.y ?? 0) + (containerBox?.height ?? 0) / 2;
  const itemCenter = (itemBox?.y ?? 0) + (itemBox?.height ?? 0) / 2;
  expect(Math.abs(itemCenter - containerCenter)).toBeLessThanOrEqual(1);
}

export async function expectVerticallyContained(container: Locator, item: Locator) {
  const containerBox = await container.boundingBox();
  const itemBox = await item.boundingBox();
  expect(containerBox).not.toBeNull();
  expect(itemBox).not.toBeNull();

  expect(itemBox?.y ?? 0).toBeGreaterThanOrEqual(containerBox?.y ?? 0);
  expect((itemBox?.y ?? 0) + (itemBox?.height ?? 0)).toBeLessThanOrEqual(
    (containerBox?.y ?? 0) + (containerBox?.height ?? 0),
  );
}

export async function expectNoLocalOverflow(locator: Locator, label: string) {
  const overflow = await locator.evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
  }));
  expect(overflow.scrollWidth, label).toBeLessThanOrEqual(overflow.clientWidth + 1);
}

export async function verticalGap(heading: Locator, content: Locator) {
  const headingBox = await heading.boundingBox();
  const contentBox = await content.boundingBox();
  expect(headingBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  return (contentBox?.y ?? 0) - ((headingBox?.y ?? 0) + (headingBox?.height ?? 0));
}

export async function settledScrollTop(locator: Locator) {
  return locator.evaluate(async (element) => {
    let previous = element.scrollTop;
    let stableFrames = 0;
    for (let frame = 0; frame < 120; frame += 1) {
      await new Promise<void>((resolveFrame) =>
        requestAnimationFrame(() => resolveFrame()),
      );
      const current = element.scrollTop;
      stableFrames = Math.abs(current - previous) < 1 ? stableFrames + 1 : 0;
      previous = current;
      if (stableFrames >= 6) return current;
    }
    return element.scrollTop;
  });
}

export async function highlightedCodeColors(locator: Locator) {
  return locator.evaluate((element) => {
    const token = element.querySelector('span');
    if (token === null) throw new Error('Highlighted TRCodeBlock has no token spans.');

    return {
      background: getComputedStyle(element).backgroundColor,
      token: getComputedStyle(token).color,
    };
  });
}

export async function auditEveryDocument(
  browser: Browser,
  origin: string,
  scenario: {
    name: 'dark mobile' | 'light desktop';
    theme: 'tinyrack-dark' | 'tinyrack-light';
    viewport: { height: number; width: number };
  },
) {
  const context = await browser.newContext({ viewport: scenario.viewport });
  const page = await context.newPage();
  await setTheme(page, scenario.theme);
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(`${page.url()}: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() !== 'error') return;
    const source = message.location().url;
    consoleErrors.push(source ? `${message.text()} [${source}]` : message.text());
  });
  try {
    for (const documentRoute of staticDocumentRoutes) {
      await gotoHydrated(page, `${origin}${documentRoute.path}`);
      const ui = localeUi[documentRoute.locale as keyof typeof localeUi];
      if (documentRoute.layout === 'splash') {
        await page
          .getByRole('heading', {
            level: 1,
            name: 'TINYRACK DESIGN SYSTEM',
          })
          .waitFor();
      } else {
        await page.locator('h1').filter({ hasText: documentRoute.title }).waitFor();
      }
      const componentEntry = componentDocsManifest.find(
        (entry) => documentRoute.path === `/en/components/${entry.id}`,
      );
      if (componentEntry !== undefined) {
        if (
          !('hasPlayground' in componentEntry) ||
          componentEntry.hasPlayground !== false
        ) {
          await expect(
            page.locator('[data-component-playground]').count(),
          ).resolves.toBe(1);
        }
        await expect(
          page.locator('[data-component-example]').count(),
        ).resolves.toBeGreaterThanOrEqual(componentEntry.requiredExamples.length);
      }
      const overflow = await page.locator('html').evaluate((element) => ({
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
      }));
      expect(overflow.scrollWidth, documentRoute.path).toBeLessThanOrEqual(
        overflow.clientWidth + 1,
      );
      expect(await page.locator('html').getAttribute('data-theme')).toBe(
        scenario.theme,
      );
      await expect(page.locator('main').count()).resolves.toBe(1);
      if (scenario.name === 'dark mobile') {
        await page.keyboard.press('Escape');
        await expect
          .poll(
            () =>
              page.locator('.tr-docs-shell-header').first().getAttribute('aria-hidden'),
            { message: documentRoute.path },
          )
          .toBeNull();
        const siteNavigationTrigger = page
          .locator('.tr-docs-shell-header')
          .first()
          .getByRole('button', { name: ui.openNavigation });
        await expect
          .poll(() => siteNavigationTrigger.count(), {
            message: documentRoute.path,
            timeout: 10_000,
          })
          .toBe(1);
        await siteNavigationTrigger.click();
      }
      const currentNavigationLink = page.locator(
        `.tr-docs-sidebar-inner > nav[aria-label="${ui.navigation}"] [aria-current="page"]`,
      );
      await expect
        .poll(() => currentNavigationLink.count(), {
          message: documentRoute.path,
          timeout: 10_000,
        })
        .toBe(documentRoute.navigation ? 1 : 0);
    }
    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  } finally {
    await context.close();
  }
}

export function createBrowserAuditRuntime() {
  let browser: Browser | undefined;
  let origin: string | undefined;
  let server: Server | undefined;

  return {
    get browser() {
      if (browser === undefined)
        throw new Error('Browser audit runtime is not started');
      return browser;
    },
    get origin() {
      if (origin === undefined) throw new Error('Browser audit runtime is not started');
      return origin;
    },
    async start() {
      await stat(join(buildRoot, 'index.html'));
      const started = await startServer();
      origin = started.origin;
      server = started.server;
      browser = await chromium.launch();
    },
    async stop() {
      await browser?.close();
      if (server !== undefined) await closeServer(server);
      browser = undefined;
      origin = undefined;
      server = undefined;
    },
  };
}
