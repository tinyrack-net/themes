import type { Meta, StoryObj } from '@storybook/react-vite';
import { DaisyUiTailwindEnvironmentFixture } from '../../src/environments/index.js';
import '../../src/environments/environment-fixtures.css';

// Story contract markers: ENVIRONMENT SMOKE · daisyUI + Tailwind, data-environment="daisyui-tailwind"
const meta = {
  title: 'Environments/daisyUI + Tailwind',
  component: DaisyUiTailwindEnvironmentFixture,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DaisyUiTailwindEnvironmentFixture>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SmokePage: Story = {};
