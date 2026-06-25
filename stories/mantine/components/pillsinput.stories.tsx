import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-pillsinput',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-pillsinput');
}

function PillsInputStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/PillsInput',
  component: PillsInputStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PillsInputStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
