import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-ringprogress',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-ringprogress');
}

function RingProgressStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/RingProgress',
  component: RingProgressStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RingProgressStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
