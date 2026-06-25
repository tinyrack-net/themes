import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-tabs',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-tabs');
}

function TabsStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Tabs',
  component: TabsStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TabsStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
