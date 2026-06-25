import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-jsoninput',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-jsoninput');
}

function JsonInputStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/JsonInput',
  component: JsonInputStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof JsonInputStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
