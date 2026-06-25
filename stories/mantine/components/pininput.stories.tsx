import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-pininput',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-pininput');
}

function PinInputStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/PinInput',
  component: PinInputStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PinInputStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
