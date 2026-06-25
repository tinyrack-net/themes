import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-spoiler',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-spoiler');
}

function SpoilerStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Spoiler',
  component: SpoilerStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SpoilerStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
