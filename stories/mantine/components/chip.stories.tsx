import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-chip',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-chip');
}

function ChipStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Chip',
  component: ChipStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ChipStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
