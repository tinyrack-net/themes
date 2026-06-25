import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-actionicon',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-actionicon');
}

function ActionIconStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/ActionIcon',
  component: ActionIconStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ActionIconStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
