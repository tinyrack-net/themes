import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-checkbox',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-checkbox');
}

function CheckboxStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Checkbox',
  component: CheckboxStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CheckboxStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
