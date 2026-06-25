import '../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DaisyUiShowcaseGallery } from '../../src/showcase/index.js';

const meta = {
  title: 'daisyUI/All Components',
  component: DaisyUiShowcaseGallery,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DaisyUiShowcaseGallery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Gallery: Story = {};
