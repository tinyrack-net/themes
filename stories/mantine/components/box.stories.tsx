import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-box',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-box');
}

function BoxStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Box',
  component: BoxStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BoxStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
