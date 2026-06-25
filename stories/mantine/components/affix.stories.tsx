import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-affix',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-affix');
}

function AffixStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Affix',
  component: AffixStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AffixStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
