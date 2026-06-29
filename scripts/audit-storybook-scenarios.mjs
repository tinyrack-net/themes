import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, relative, resolve, sep } from 'node:path';
import { chromium } from 'playwright';

const root = resolve(import.meta.dirname, '..');
const storybookStaticDir = resolve(root, 'storybook-static');
const indexPath = resolve(root, 'storybook-static/index.json');
const reportPath = resolve(root, 'artifacts/storybook-scenario-audit/audit.json');
const preferredPort = Number.parseInt(process.env.STORYBOOK_AUDIT_PORT ?? '61082', 10);
const auditAll = process.env.STORYBOOK_AUDIT_ALL === '1';
const defaultAuditLimit = 100;
const scenarioSuffixes = [
  '--preview',
  '--variants',
  '--states',
  '--composition',
  '--tokens',
  '--accessibility',
  '--playground',
];
const curatedComponentSlugs = new Set([
  'alert',
  'badge',
  'button',
  'card',
  'checkbox',
  'dropdown',
  'input',
  'modal',
  'navbar',
  'progress',
  'radio',
  'stepper',
  'steps',
  'switch',
  'table',
  'tabs',
  'textinput',
  'toggle',
]);

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.wasm', 'application/wasm'],
]);

function scenarioId(storyId) {
  return scenarioSuffixes
    .find((suffix) => storyId.endsWith(suffix))
    ?.slice('--'.length);
}

function componentSlug(storyId) {
  const suffix = scenarioSuffixes.find((value) => storyId.endsWith(value));

  return suffix
    ? storyId
        .slice(0, -suffix.length)
        .replace(/^mantine-components-/, '')
        .replace(/^daisyui-components-/, '')
    : storyId;
}

function isComponentScenario(entry) {
  const id = entry.id ?? '';
  const title = entry.title ?? '';
  const importPath = entry.importPath ?? '';

  return (
    scenarioSuffixes.some((suffix) => id.endsWith(suffix)) &&
    (title.startsWith('Mantine/Components/') ||
      title.startsWith('daisyUI/Components/') ||
      importPath.includes('/components/'))
  );
}

function readEntries(indexJson) {
  const rawEntries = indexJson.entries ?? indexJson.stories ?? indexJson;

  return Object.values(rawEntries)
    .filter((entry) => entry && typeof entry === 'object')
    .filter((entry) => entry.type === undefined || entry.type === 'story')
    .filter(isComponentScenario)
    .sort((left, right) => left.id.localeCompare(right.id));
}

function selectEntries(entries) {
  if (auditAll) {
    return entries;
  }

  const selected = new Map();
  const add = (entry) => selected.set(entry.id, entry);

  for (const entry of entries) {
    if (/^(mantine|daisyui)-components-button--/.test(entry.id)) {
      add(entry);
    }
  }

  for (const entry of entries) {
    const scenario = scenarioId(entry.id);

    if (
      (scenario === 'tokens' || scenario === 'accessibility') &&
      curatedComponentSlugs.has(componentSlug(entry.id))
    ) {
      add(entry);
    }
  }

  const remaining = entries.filter((entry) => !selected.has(entry.id));
  const scenarioBuckets = new Map(
    scenarioSuffixes.map((suffix) => [suffix.slice('--'.length), []]),
  );

  for (const entry of remaining) {
    scenarioBuckets.get(scenarioId(entry.id))?.push(entry);
  }

  while (selected.size < defaultAuditLimit) {
    let added = false;

    for (const bucket of scenarioBuckets.values()) {
      const nextEntry = bucket.shift();

      if (nextEntry) {
        add(nextEntry);
        added = true;
      }

      if (selected.size >= defaultAuditLimit) {
        break;
      }
    }

    if (!added) {
      break;
    }
  }

  return [...selected.values()].sort((left, right) => left.id.localeCompare(right.id));
}

function createStaticServer() {
  return createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url ?? '/', 'http://127.0.0.1');
      const requestedPath = decodeURIComponent(requestUrl.pathname);
      const filePath = resolve(
        storybookStaticDir,
        requestedPath === '/' ? 'index.html' : requestedPath.slice(1),
      );
      const relativePath = relative(storybookStaticDir, filePath);

      if (relativePath.startsWith('..') || relativePath.includes(`..${sep}`)) {
        response.writeHead(403);
        response.end('Forbidden');
        return;
      }

      const fileStat = await stat(filePath);
      const finalPath = fileStat.isDirectory()
        ? join(filePath, 'index.html')
        : filePath;
      const body = await readFile(finalPath);

      response.writeHead(200, {
        'Content-Type':
          contentTypes.get(extname(finalPath)) ?? 'application/octet-stream',
      });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end('Not found');
    }
  });
}

async function listen(server) {
  const maxAttempts = 20;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const candidatePort = preferredPort + attempt;

    try {
      await new Promise((resolveListen, rejectListen) => {
        const onError = (error) => {
          server.off('listening', onListening);
          rejectListen(error);
        };
        const onListening = () => {
          server.off('error', onError);
          resolveListen();
        };

        server.once('error', onError);
        server.once('listening', onListening);
        server.listen(candidatePort, '127.0.0.1');
      });

      return candidatePort;
    } catch (error) {
      if (error?.code !== 'EADDRINUSE' || attempt === maxAttempts - 1) {
        throw error;
      }
    }
  }

  throw new Error(`Unable to bind Storybook audit server near port ${preferredPort}`);
}

async function close(server) {
  await new Promise((resolveClose, rejectClose) => {
    server.close((error) => (error ? rejectClose(error) : resolveClose()));
  });
}

function expectedSelectorsFor(scenario) {
  if (scenario === 'preview') {
    return [];
  }

  return [
    '.tinyrack-variant-matrix',
    '.tinyrack-docs-page',
    '.tinyrack-docs-card',
    '.tinyrack-scenario-list',
  ];
}

async function auditPage(page, entry, auditPort) {
  const storyScenario = scenarioId(entry.id);
  const url = `http://127.0.0.1:${auditPort}/iframe.html?id=${entry.id}`;

  await page.goto(url, { waitUntil: 'networkidle' });

  const metrics = await page.evaluate((expectedSelectors) => {
    const root = document.querySelector(
      '.tinyrack-showcase-single, .tinyrack-docs-page',
    );
    const rootRect = root?.getBoundingClientRect();
    const bodyStyle = window.getComputedStyle(document.body);
    const htmlStyle = window.getComputedStyle(document.documentElement);
    const visibleText = (root?.textContent ?? document.body.textContent ?? '')
      .replace(/\s+/g, ' ')
      .trim();

    return {
      bodyOverflow: bodyStyle.overflow,
      bodyOverflowX: bodyStyle.overflowX,
      bodyOverflowY: bodyStyle.overflowY,
      documentHeight: document.documentElement.scrollHeight,
      expectedContentPresent: expectedSelectors.length
        ? expectedSelectors.some((selector) => document.querySelector(selector))
        : true,
      htmlOverflow: htmlStyle.overflow,
      rootHeight: rootRect?.height ?? 0,
      rootPresent: Boolean(root),
      rootWidth: rootRect?.width ?? 0,
      textLength: visibleText.length,
    };
  }, expectedSelectorsFor(storyScenario));

  const failures = [];

  if (!metrics.rootPresent) {
    failures.push('missing .tinyrack-showcase-single or .tinyrack-docs-page root');
  }

  if (metrics.textLength < 20 || metrics.rootHeight < 80) {
    failures.push('page appears blank or too small');
  }

  if (metrics.rootWidth < 900) {
    failures.push(`root width ${Math.round(metrics.rootWidth)}px is too narrow`);
  }

  if (
    (metrics.bodyOverflow === 'hidden' || metrics.bodyOverflowY === 'hidden') &&
    metrics.documentHeight > 1000
  ) {
    failures.push('body overflow is hidden');
  }

  if (!metrics.expectedContentPresent) {
    failures.push(`missing expected scenario content for ${storyScenario}`);
  }

  return {
    id: entry.id,
    scenario: storyScenario,
    title: entry.title,
    url,
    metrics,
    failures,
  };
}

async function main() {
  const indexJson = JSON.parse(await readFile(indexPath, 'utf8'));
  const entries = readEntries(indexJson);
  const selectedEntries = selectEntries(entries);

  if (selectedEntries.length === 0) {
    throw new Error(
      'No Storybook component scenario entries found in storybook-static/index.json',
    );
  }

  const server = createStaticServer();
  let browser;
  let auditPort;

  auditPort = await listen(server);

  try {
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const results = [];

    for (const entry of selectedEntries) {
      results.push(await auditPage(page, entry, auditPort));
    }

    const failures = results.filter((result) => result.failures.length > 0);
    const report = {
      auditedAt: new Date().toISOString(),
      auditAll,
      auditedCount: results.length,
      availableCount: entries.length,
      defaultAuditLimit,
      failures: failures.map(({ id, failures: entryFailures }) => ({
        id,
        failures: entryFailures,
      })),
      port: auditPort,
      results,
    };

    await mkdir(resolve(root, 'artifacts/storybook-scenario-audit'), {
      recursive: true,
    });
    await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);

    if (failures.length > 0) {
      console.error(
        `Storybook scenario audit failed: ${failures.length} of ${results.length} pages failed.`,
      );
      for (const failure of failures.slice(0, 20)) {
        console.error(`- ${failure.id}: ${failure.failures.join('; ')}`);
      }
      console.error(`Report: ${relative(root, reportPath)}`);
      process.exitCode = 1;
      return;
    }

    console.log(
      `Storybook scenario audit passed: ${results.length} pages audited. Report: ${relative(
        root,
        reportPath,
      )}`,
    );
  } finally {
    await browser?.close();
    await close(server);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
