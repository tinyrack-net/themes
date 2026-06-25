import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-hovercard',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-hovercard');
}

function HoverCardStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/HoverCard',
  component: HoverCardStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HoverCardStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
