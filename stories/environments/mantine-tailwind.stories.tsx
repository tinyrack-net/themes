import type { Meta, StoryObj } from '@storybook/react-vite';
import { MantineTailwindEnvironmentFixture } from '../../src/environments/index.js';
import '../../src/environments/environment-fixtures.css';

// Story contract markers: ENVIRONMENT SMOKE · Mantine + Tailwind, data-environment="mantine-tailwind"
const meta = {
  title: 'Environments/Mantine + Tailwind',
  component: MantineTailwindEnvironmentFixture,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MantineTailwindEnvironmentFixture>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SmokePage: Story = {};
