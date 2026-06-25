import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-loader',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-loader');
}

function LoaderStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Loader',
  component: LoaderStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LoaderStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
