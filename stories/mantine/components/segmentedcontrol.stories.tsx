import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-segmentedcontrol',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-segmentedcontrol');
}

function SegmentedControlStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/SegmentedControl',
  component: SegmentedControlStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SegmentedControlStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
