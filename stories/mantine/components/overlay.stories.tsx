import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-overlay',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-overlay');
}

function OverlayStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Overlay',
  component: OverlayStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof OverlayStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
