import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-highlight',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-highlight');
}

function HighlightStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Highlight',
  component: HighlightStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HighlightStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
