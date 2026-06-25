import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-container',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-container');
}

function ContainerStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Container',
  component: ContainerStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ContainerStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
