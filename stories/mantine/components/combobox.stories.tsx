import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-combobox',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-combobox');
}

function ComboboxStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Combobox',
  component: ComboboxStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ComboboxStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
