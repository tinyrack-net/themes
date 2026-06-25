import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { daisyUiShowcaseEntries } from '../daisyui-showcase.js';
import { mantineShowcaseEntries } from '../mantine-showcase.js';

const repoRoot = process.cwd();

function storyPath(library: 'mantine' | 'daisyui', id: string) {
  return join(repoRoot, 'stories', library, 'components', `${id}.stories.tsx`);
}

describe('storybook component story structure', () => {
  it('has one Mantine story file per showcase entry', () => {
    const missing = mantineShowcaseEntries
      .map((entry) => storyPath('mantine', entry.id.replace(/^mantine-/, '')))
      .filter((path) => !existsSync(path));

    expect(missing).toEqual([]);
  });

  it('has one daisyUI story file per showcase entry', () => {
    const missing = daisyUiShowcaseEntries
      .map((entry) => storyPath('daisyui', entry.id.replace(/^daisyui-/, '')))
      .filter((path) => !existsSync(path));

    expect(missing).toEqual([]);
  });

  it('does not expose the old all-components bucket stories', () => {
    expect(
      existsSync(join(repoRoot, 'stories/mantine/all-components.stories.tsx')),
    ).toBe(false);
    expect(
      existsSync(join(repoRoot, 'stories/daisyui/all-components.stories.tsx')),
    ).toBe(false);
  });

  it('overrides Storybook canvas overflow so long and scrollable previews can scroll', () => {
    const previewCss = readFileSync(join(repoRoot, '.storybook/preview.css'), 'utf8');

    expect(previewCss).toContain('body.sb-show-main');
    expect(previewCss).toContain('overflow: auto');
    expect(previewCss).toContain('#storybook-root');
  });
});
