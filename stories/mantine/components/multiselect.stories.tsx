import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-multiselect',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-multiselect');
}

function MultiSelectStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/MultiSelect',
  component: MultiSelectStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MultiSelectStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
