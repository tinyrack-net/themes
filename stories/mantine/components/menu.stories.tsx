import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-menu',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-menu');
}

function MenuStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Menu',
  component: MenuStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MenuStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
