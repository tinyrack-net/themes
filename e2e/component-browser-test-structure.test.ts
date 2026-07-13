import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const repoRoot = process.cwd();
const componentsRoot = join(repoRoot, 'src/components');
const expectedComponents = [
  'accordion',
  'alert',
  'avatar',
  'badge',
  'button',
  'card',
  'code',
  'code-block',
  'combobox',
  'disclosure',
  'divider',
  'form',
  'link',
  'menu',
  'modal',
  'pin-input',
  'popover',
  'progress',
  'skeleton',
  'spinner',
  'table',
  'tabs',
  'toast',
  'tooltip',
];

describe('React-only component structure', () => {
  it('has exactly the supported public component directories', () => {
    const actual = readdirSync(componentsRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();

    expect(actual).toEqual([...expectedComponents].sort());
  });

  it.each(
    expectedComponents,
  )('%s has a public index, CSS, and one browser suite', (component) => {
    const componentRoot = join(componentsRoot, component);
    expect(existsSync(join(componentRoot, 'index.tsx'))).toBe(true);
    expect(existsSync(join(componentRoot, `${component}.css`))).toBe(true);
    expect(existsSync(join(componentRoot, `${component}.browser.test.tsx`))).toBe(true);
  });

  it('rejects legacy adapters, DOM managers, contracts, and parity suites', () => {
    const forbiddenNames = new Set([
      'contract.ts',
      'dom.ts',
      'react.tsx',
      'shared.ts',
      'utils.ts',
      'types.ts',
    ]);
    const files = expectedComponents.flatMap((component) =>
      readdirSync(join(componentsRoot, component)).map(
        (file) => `${component}/${file}`,
      ),
    );

    expect(
      files.filter((file) => forbiddenNames.has(file.split('/').at(-1) ?? '')),
    ).toEqual([]);
    expect(
      files.filter((file) => /-(dom|react|parity)\.browser\.test\.tsx$/.test(file)),
    ).toEqual([]);
    expect(existsSync(join(componentsRoot, 'overlay'))).toBe(false);
    expect(existsSync(join(componentsRoot, 'index.tsx'))).toBe(false);
  });

  it.each(expectedComponents)('%s index is composition-only', (component) => {
    const source = readFileSync(join(componentsRoot, component, 'index.tsx'), 'utf8');

    expect(source).not.toMatch(/\buse(State|Effect|LayoutEffect|Reducer|Ref)\b/);
    expect(source).not.toMatch(/return\s*\(/);
    expect(source).not.toMatch(/className=/);
    expect(source).not.toMatch(/<\w/);
  });
});
