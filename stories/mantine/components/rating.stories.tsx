import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-rating',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-rating');
}

function RatingStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Rating',
  component: RatingStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RatingStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
