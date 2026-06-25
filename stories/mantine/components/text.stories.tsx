import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-text',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-text');
}

function TextStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Text',
  component: TextStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TextStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
