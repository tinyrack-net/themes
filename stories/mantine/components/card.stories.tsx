import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-card',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-card');
}

function CardStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Card',
  component: CardStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CardStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
