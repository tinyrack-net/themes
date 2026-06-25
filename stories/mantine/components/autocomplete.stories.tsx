import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-autocomplete',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-autocomplete');
}

function AutocompleteStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Autocomplete',
  component: AutocompleteStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AutocompleteStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
