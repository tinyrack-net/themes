import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-unstyledbutton',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-unstyledbutton');
}

function UnstyledButtonStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/UnstyledButton',
  component: UnstyledButtonStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof UnstyledButtonStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
