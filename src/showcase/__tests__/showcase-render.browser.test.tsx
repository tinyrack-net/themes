import '@mantine/core/styles.css';
import '../showcase.css';
import '../../mantine/styles.css';
import '../../daisyui/theme.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { TinyrackMantineProvider } from '../../mantine/index.js';
import {
  DaisyUiShowcaseGallery,
  daisyUiShowcaseEntries,
  MantineShowcaseGallery,
  mantineShowcaseEntries,
} from '../index.js';

test('renders every Mantine showcase component in browser mode', async () => {
  const screen = await render(
    <TinyrackMantineProvider>
      <MantineShowcaseGallery />
    </TinyrackMantineProvider>,
  );

  await expect.element(screen.getByText('Mantine components')).toBeVisible();
  expect(document.querySelectorAll('[data-showcase-library="mantine"]')).toHaveLength(
    mantineShowcaseEntries.length,
  );
});

test('renders every daisyUI showcase component in browser mode', async () => {
  document.documentElement.dataset.theme = 'tinyrack-light';
  const screen = await render(<DaisyUiShowcaseGallery />);

  await expect.element(screen.getByText('daisyUI components')).toBeVisible();
  expect(document.querySelectorAll('[data-showcase-library="daisyui"]')).toHaveLength(
    daisyUiShowcaseEntries.length,
  );
});
