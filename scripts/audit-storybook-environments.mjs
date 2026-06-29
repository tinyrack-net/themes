import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, relative, resolve, sep } from 'node:path';
import { chromium } from 'playwright';

const root = resolve(import.meta.dirname, '..');
const storybookStaticDir = resolve(root, 'storybook-static');
const indexPath = resolve(root, 'storybook-static/index.json');
const reportPath = resolve(root, 'artifacts/storybook-environment-audit/audit.json');
const preferredPort = Number.parseInt(
  process.env.STORYBOOK_ENVIRONMENT_AUDIT_PORT ?? '61084',
  10,
);

const expectedEnvironmentPages = [
  {
    dataEnvironment: 'starlight',
    marker: 'ENVIRONMENT SMOKE · Starlight',
    title: 'Environments/Starlight',
  },
  {
    dataEnvironment: 'mantine-tailwind',
    marker: 'ENVIRONMENT SMOKE · Mantine + Tailwind',
    title: 'Environments/Mantine + Tailwind',
  },
  {
    dataEnvironment: 'daisyui-tailwind',
    marker: 'ENVIRONMENT SMOKE · daisyUI + Tailwind',
    title: 'Environments/daisyUI + Tailwind',
  },
];

const expectedTitles = new Set(expectedEnvironmentPages.map((page) => page.title));

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.wasm', 'application/wasm'],
]);

function readRawEntries(indexJson) {
  const rawEntries = indexJson.entries ?? indexJson.stories ?? indexJson;

  return Object.values(rawEntries)
    .filter((entry) => entry && typeof entry === 'object')
    .filter(
      (entry) =>
        entry.type === undefined || entry.type === 'story' || entry.type === 'docs',
    );
}

function readEnvironmentEntries(indexJson) {
  const entries = readRawEntries(indexJson).filter((entry) =>
    String(entry.title ?? '').startsWith('Environments/'),
  );
  const availableTitles = new Set(entries.map((entry) => entry.title));
  const contractFailures = [];

  for (const title of expectedTitles) {
    if (!availableTitles.has(title)) {
      contractFailures.push(`missing environment title: ${title}`);
    }
  }

  for (const title of availableTitles) {
    if (!expectedTitles.has(title)) {
      contractFailures.push(`unexpected environment title: ${title}`);
    }
  }

  const selectedEntries = [];

  for (const expectedPage of expectedEnvironmentPages) {
    const matches = entries.filter((entry) => entry.title === expectedPage.title);
    const storyEntry = matches.find((entry) => entry.type === 'story') ?? matches[0];

    if (storyEntry) {
      selectedEntries.push({ ...expectedPage, entry: storyEntry });
    }
  }

  return { contractFailures, selectedEntries };
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

  throw new Error(
    `Unable to bind Storybook environment audit server near port ${preferredPort}`,
  );
}

async function close(server) {
  await new Promise((resolveClose, rejectClose) => {
    server.close((error) => (error ? rejectClose(error) : resolveClose()));
  });
}

async function auditPage(page, expectedPage, auditPort) {
  const url = `http://127.0.0.1:${auditPort}/iframe.html?id=${expectedPage.entry.id}`;

  await page.goto(url, { waitUntil: 'networkidle' });

  const metrics = await page.evaluate(
    ({ marker }) => {
      const root = document.querySelector('.tinyrack-environment-page');
      const rootRect = root?.getBoundingClientRect();
      const bodyText = (document.body.textContent ?? '').replace(/\s+/g, ' ').trim();

      return {
        bodyTextContainsMarker: bodyText.includes(marker),
        dataEnvironment: root?.getAttribute('data-environment') ?? null,
        rootHeight: rootRect?.height ?? 0,
        rootPresent: Boolean(root),
        rootWidth: rootRect?.width ?? 0,
        textLength: bodyText.length,
      };
    },
    {
      marker: expectedPage.marker,
    },
  );

  const failures = [];

  if (!metrics.rootPresent) {
    failures.push('missing .tinyrack-environment-page root');
  }

  if (metrics.dataEnvironment !== expectedPage.dataEnvironment) {
    failures.push(
      `data-environment expected ${expectedPage.dataEnvironment}, received ${metrics.dataEnvironment}`,
    );
  }

  if (!metrics.bodyTextContainsMarker) {
    failures.push(`missing marker text: ${expectedPage.marker}`);
  }

  if (metrics.rootWidth < 480) {
    failures.push(`root width ${Math.round(metrics.rootWidth)}px is below 480px`);
  }

  if (metrics.rootHeight < 240) {
    failures.push(`root height ${Math.round(metrics.rootHeight)}px is below 240px`);
  }

  if (metrics.textLength < 120) {
    failures.push(`body text length ${metrics.textLength} is below 120`);
  }

  return {
    id: expectedPage.entry.id,
    title: expectedPage.title,
    url,
    metrics,
    failures,
  };
}

async function writeReport(report) {
  await mkdir(resolve(root, 'artifacts/storybook-environment-audit'), {
    recursive: true,
  });
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
}

async function main() {
  const indexJson = JSON.parse(await readFile(indexPath, 'utf8'));
  const { contractFailures, selectedEntries } = readEnvironmentEntries(indexJson);

  if (contractFailures.length > 0) {
    await writeReport({
      auditedAt: new Date().toISOString(),
      auditedCount: 0,
      failures: contractFailures.map((failure) => ({ failures: [failure] })),
      port: null,
      results: [],
    });

    console.error(
      `Storybook environment audit failed: ${contractFailures.length} contract failures.`,
    );
    for (const failure of contractFailures) {
      console.error(`- ${failure}`);
    }
    console.error(`Report: ${relative(root, reportPath)}`);
    process.exitCode = 1;
    return;
  }

  const server = createStaticServer();
  let browser;
  let auditPort;

  auditPort = await listen(server);

  try {
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const results = [];

    for (const expectedPage of selectedEntries) {
      results.push(await auditPage(page, expectedPage, auditPort));
    }

    const failures = results.filter((result) => result.failures.length > 0);
    const report = {
      auditedAt: new Date().toISOString(),
      auditedCount: results.length,
      failures: failures.map(({ id, title, failures: entryFailures }) => ({
        failures: entryFailures,
        id,
        title,
      })),
      port: auditPort,
      results,
    };

    await writeReport(report);

    if (failures.length > 0) {
      console.error(
        `Storybook environment audit failed: ${failures.length} of ${results.length} pages failed.`,
      );
      for (const failure of failures) {
        console.error(`- ${failure.id}: ${failure.failures.join('; ')}`);
      }
      console.error(`Report: ${relative(root, reportPath)}`);
      process.exitCode = 1;
      return;
    }

    console.log('Storybook environment audit passed: 3 pages audited.');
  } finally {
    await browser?.close();
    await close(server);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
