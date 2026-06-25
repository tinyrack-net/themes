import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-scrollarea',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-scrollarea');
}

function ScrollAreaStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/ScrollArea',
  component: ScrollAreaStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ScrollAreaStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
