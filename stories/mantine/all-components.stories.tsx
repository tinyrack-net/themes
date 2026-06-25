import '../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MantineShowcaseGallery } from '../../src/showcase/index.js';

const meta = {
  title: 'Mantine/All Components',
  component: MantineShowcaseGallery,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MantineShowcaseGallery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Gallery: Story = {};
