import { execFileSync } from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { componentNames } from '../scripts/component-catalog.ts';

const repoRoot = process.cwd();
const pnpm = process.platform === 'win32' ? 'pnpm.exe' : 'pnpm';
const consumerRoot = mkdtempSync(join(tmpdir(), 'tinyrack-ui-consumer-'));
const artifactsRoot = join(consumerRoot, 'artifacts');
const appRoot = join(consumerRoot, 'app');

function run(command: string, args: string[], cwd: string) {
  execFileSync(command, args, {
    cwd,
    encoding: 'utf8',
    stdio: 'pipe',
  });
}

try {
  mkdirSync(artifactsRoot);
  mkdirSync(appRoot);

  run(pnpm, ['pack', '--pack-destination', artifactsRoot], repoRoot);

  const archive = readdirSync(artifactsRoot).find((file) => file.endsWith('.tgz'));
  if (!archive) {
    throw new Error('pnpm pack did not create a package archive');
  }

  const archivePath = join(artifactsRoot, archive).replaceAll('\\', '/');
  writeFileSync(
    join(appRoot, 'package.json'),
    `${JSON.stringify(
      {
        name: 'tinyrack-ui-consumer-smoke',
        private: true,
        type: 'module',
        dependencies: {
          '@tinyrack/ui': `file:${archivePath}`,
          '@types/react': '19.2.17',
          '@types/react-dom': '19.2.3',
          react: '19.2.7',
          'react-dom': '19.2.7',
          typescript: '6.0.3',
        },
      },
      null,
      2,
    )}\n`,
  );

  run(pnpm, ['install', '--ignore-scripts'], appRoot);

  writeFileSync(
    join(appRoot, 'smoke.mjs'),
    `import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Button } from '@tinyrack/ui/components/button';
import { Tabs } from '@tinyrack/ui/components/tabs';
import { createTinyrackMdxComponents, tinyrackMdxComponents } from '@tinyrack/ui/mdx';
import { CSPProvider } from '@tinyrack/ui/providers/csp';
import { DirectionProvider, useDirection } from '@tinyrack/ui/providers/direction';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(typeof Button === 'function', 'Button is not a React component');
assert(typeof Tabs.Root === 'function', 'Tabs.Root is not a React component');
assert(typeof Tabs.List === 'function', 'Tabs.List is not a React component');
assert(typeof Tabs.Tab === 'function', 'Tabs.Tab is not a React component');
assert(typeof Tabs.Panel === 'function', 'Tabs.Panel is not a React component');
assert(typeof CSPProvider === 'function', 'CSPProvider is missing');
assert(typeof DirectionProvider === 'function', 'DirectionProvider is missing');
assert(typeof useDirection === 'function', 'useDirection is missing');
assert(typeof createTinyrackMdxComponents === 'function', 'MDX factory is missing');
assert(typeof tinyrackMdxComponents === 'object', 'MDX component map is missing');

for (const component of ${JSON.stringify(componentNames)}) {
  const module = await import('@tinyrack/ui/components/' + component);
  assert(Object.keys(module).length > 0, component + ' has no public exports');
  const cssPath = fileURLToPath(
    import.meta.resolve('@tinyrack/ui/components/' + component + '.css'),
  );
  assert(
    readFileSync(cssPath, 'utf8').includes('.tr-'),
    component + ' has invalid CSS',
  );
}

for (const [specifier, marker] of [
  ['@tinyrack/ui/core.css', '--tinyrack-primary'],
  ['@tinyrack/ui/components/button.css', '.tr-btn'],
  ['@tinyrack/ui/components/tabs.css', '.tr-tabs'],
]) {
  const path = fileURLToPath(import.meta.resolve(specifier));
  assert(readFileSync(path, 'utf8').includes(marker), specifier + ' has invalid CSS');
}

for (const specifier of [
  '@tinyrack/ui',
  '@tinyrack/ui/components/button/react',
  '@tinyrack/ui/components/button/dom',
  '@tinyrack/ui/components/overlay',
  '@tinyrack/ui/components/modal',
  '@tinyrack/ui/components/disclosure',
  '@tinyrack/ui/components/pin-input',
  '@tinyrack/ui/components/divider',
  '@tinyrack/ui/mdx/react',
  '@tinyrack/ui/mdx/astro',
]) {
  let resolved = true;
  try {
    await import(specifier);
  } catch {
    resolved = false;
  }
  assert(!resolved, specifier + ' must remain an unsupported breaking path');
}
`,
  );

  writeFileSync(
    join(appRoot, 'consumer.tsx'),
    `import { createRef } from 'react';
import { Button, type ButtonProps } from '@tinyrack/ui/components/button';
import { Dialog, type DialogRootProps } from '@tinyrack/ui/components/dialog';
import { Tabs, type TabsRootProps } from '@tinyrack/ui/components/tabs';
import { createTinyrackMdxComponents } from '@tinyrack/ui/mdx';
import { CSPProvider } from '@tinyrack/ui/providers/csp';
import { DirectionProvider } from '@tinyrack/ui/providers/direction';

const buttonRef = createRef<HTMLButtonElement>();
const buttonProps: ButtonProps = { appearance: 'outline', ref: buttonRef };
const tabsProps: TabsRootProps = { defaultValue: 'overview' };
const dialogProps: DialogRootProps = { defaultOpen: false };

export const fixture = (
  <CSPProvider nonce="consumer-nonce">
    <DirectionProvider direction="ltr">
      <Button {...buttonProps}>Save</Button>
      <Tabs.Root {...tabsProps}>
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="overview">Content</Tabs.Panel>
      </Tabs.Root>
      <Dialog.Root {...dialogProps} />
    </DirectionProvider>
  </CSPProvider>
);

export const mdxComponents = createTinyrackMdxComponents();
`,
  );

  writeFileSync(
    join(appRoot, 'tsconfig.json'),
    `${JSON.stringify(
      {
        compilerOptions: {
          exactOptionalPropertyTypes: true,
          jsx: 'react-jsx',
          lib: ['ES2022', 'DOM'],
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          noEmit: true,
          strict: true,
          target: 'ES2022',
        },
        include: ['consumer.tsx'],
      },
      null,
      2,
    )}\n`,
  );

  run(process.execPath, ['smoke.mjs'], appRoot);
  run(pnpm, ['exec', 'tsc', '--project', 'tsconfig.json'], appRoot);

  const packedPackage = JSON.parse(
    readFileSync(resolve(appRoot, 'node_modules/@tinyrack/ui/package.json'), 'utf8'),
  ) as { files?: string[] };
  if (!packedPackage.files?.includes('dist')) {
    throw new Error('installed package does not declare dist as a published file');
  }

  console.log('installed package consumer smoke test passed');
} finally {
  rmSync(consumerRoot, { force: true, recursive: true });
}
