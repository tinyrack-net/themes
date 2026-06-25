import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-image',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-image');
}

function ImageStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Image',
  component: ImageStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ImageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
