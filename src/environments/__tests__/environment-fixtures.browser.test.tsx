import '@mantine/core/styles.css';
import '../environment-fixtures.css';
import '../../mantine/styles.css';
import '../../daisyui/theme.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { TinyrackMantineProvider } from '../../mantine/index.js';
import {
  DaisyUiTailwindEnvironmentFixture,
  MantineTailwindEnvironmentFixture,
  StarlightEnvironmentFixture,
} from '../index.js';

function expectRootWidth(testId: string) {
  const root = document.querySelector(`[data-testid="${testId}"]`);

  expect(root).not.toBeNull();
  expect(root?.getBoundingClientRect().width).toBeGreaterThan(100);
}

test('renders the Starlight environment fixture in browser mode', async () => {
  const screen = await render(<StarlightEnvironmentFixture />);

  await expect.element(screen.getByTestId('environment-starlight')).toBeVisible();
  await expect.element(screen.getByText('ENVIRONMENT SMOKE · Starlight')).toBeVisible();
  await expect.element(screen.getByText('Smoke check')).toBeVisible();
  expectRootWidth('environment-starlight');
});

test('renders the Mantine plus Tailwind environment fixture in browser mode', async () => {
  const screen = await render(
    <TinyrackMantineProvider>
      <MantineTailwindEnvironmentFixture />
    </TinyrackMantineProvider>,
  );

  await expect
    .element(screen.getByTestId('environment-mantine-tailwind'))
    .toBeVisible();
  await expect
    .element(screen.getByText('ENVIRONMENT SMOKE · Mantine + Tailwind'))
    .toBeVisible();
  await expect.element(screen.getByText('Workspace provisioning')).toBeVisible();
  await expect.element(screen.getByText('Adapter online')).toBeVisible();
  expectRootWidth('environment-mantine-tailwind');
});

test('renders the daisyUI plus Tailwind environment fixture in browser mode', async () => {
  document.documentElement.dataset.theme = 'tinyrack-dark';
  const screen = await render(<DaisyUiTailwindEnvironmentFixture />);

  await expect
    .element(screen.getByTestId('environment-daisyui-tailwind'))
    .toBeVisible();
  await expect
    .element(screen.getByText('ENVIRONMENT SMOKE · daisyUI + Tailwind'))
    .toBeVisible();
  await expect.element(screen.getByText('Operations console')).toBeVisible();
  await expect.element(screen.getByText('Deploy worker')).toBeVisible();
  expectRootWidth('environment-daisyui-tailwind');
});
