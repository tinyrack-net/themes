import '../../core/core.css';
import './code-block.css';
import type { BundledLanguage } from 'shiki/bundle/web';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { CodeBlock } from './react.js';

const themeDatasetKey = 'theme';

function computedStyleFor(element: Element) {
  return getComputedStyle(element);
}

test('CodeBlock renders a pre/code pair with scroll-safe block styling', async () => {
  document.documentElement.dataset[themeDatasetKey] = 'tinyrack-light';
  await render(
    <CodeBlock className="custom-block" code="pnpm add @tinyrack/ui && pnpm verify" />,
  );
  const pre = document.querySelector<HTMLElement>('.tr-code-block');
  const nestedCode = pre?.querySelector('code');

  if (pre === null || nestedCode === undefined || nestedCode === null) {
    throw new Error('Unable to find CodeBlock.');
  }

  await expect.element(pre).toBeVisible();
  expect(pre.tagName).toBe('PRE');
  expect(pre.getAttribute('data-language')).toBeNull();
  expect(nestedCode.tagName).toBe('CODE');
  expect(pre.className).toContain('custom-block');

  const styles = computedStyleFor(pre);

  expect(styles.backgroundColor).toBe('rgb(245, 245, 245)');
  expect(styles.color).toBe('rgb(23, 23, 23)');
  expect(styles.overflowX).toBe('auto');
  expect(styles.whiteSpace).toBe('pre');
});

test('CodeBlock supports opt-in wrapping for long text', async () => {
  document.documentElement.dataset[themeDatasetKey] = 'tinyrack-dark';
  await render(<CodeBlock code={'a'.repeat(120)} wrap />);
  const pre = document.querySelector<HTMLElement>('.tr-code-block');

  if (pre === null) {
    throw new Error('Unable to find wrapping CodeBlock.');
  }

  expect(pre.getAttribute('data-wrap')).toBe('true');

  const styles = computedStyleFor(pre);

  expect(styles.whiteSpace).toBe('pre-wrap');
  expect(styles.overflowWrap).toBe('anywhere');
});

test('CodeBlock progressively replaces plain code with token spans', async () => {
  document.documentElement.dataset[themeDatasetKey] = 'tinyrack-dark';
  await render(
    <CodeBlock code="const answer = 1;" language="ts" theme="github-dark" />,
  );
  const pre = document.querySelector<HTMLElement>('.tr-code-block');

  if (pre === null) {
    throw new Error('Unable to find highlighted CodeBlock.');
  }

  expect(pre.textContent).toBe('const answer = 1;');
  await expect
    .poll(() => pre.querySelectorAll('span[style*="color"]').length)
    .toBeGreaterThan(0);
  expect(pre.getAttribute('data-highlighted')).toBe('true');
  expect(computedStyleFor(pre).backgroundColor).toBe('rgb(36, 41, 46)');
});

test('CodeBlock leaves readable plain code when highlighting fails', async () => {
  document.documentElement.dataset[themeDatasetKey] = 'tinyrack-dark';
  await render(
    <CodeBlock code="still readable" language={'not-a-language' as BundledLanguage} />,
  );
  const pre = document.querySelector<HTMLElement>('.tr-code-block');

  if (pre === null) {
    throw new Error('Unable to find fallback CodeBlock.');
  }

  expect(pre.textContent).toBe('still readable');
  await new Promise((resolve) => setTimeout(resolve, 250));
  expect(pre.textContent).toBe('still readable');
});
