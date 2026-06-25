import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-space',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-space');
}

function SpaceStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Space',
  component: SpaceStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SpaceStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
