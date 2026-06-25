import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-pill',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-pill');
}

function PillStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Pill',
  component: PillStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PillStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
