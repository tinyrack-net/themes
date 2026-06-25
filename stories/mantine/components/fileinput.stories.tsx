import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-fileinput',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-fileinput');
}

function FileInputStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/FileInput',
  component: FileInputStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FileInputStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
