import type { Meta, StoryObj } from '@storybook/react-vite';
import { StarlightEnvironmentFixture } from '../../src/environments/index.js';
import '../../src/environments/environment-fixtures.css';

// Story contract markers: ENVIRONMENT SMOKE · Starlight, data-environment="starlight"
const meta = {
  title: 'Environments/Starlight',
  component: StarlightEnvironmentFixture,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof StarlightEnvironmentFixture>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SmokePage: Story = {};
