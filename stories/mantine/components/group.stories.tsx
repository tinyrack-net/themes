import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-group',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-group');
}

function GroupStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Group',
  component: GroupStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof GroupStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
