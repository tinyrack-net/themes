import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-switch',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-switch');
}

function SwitchStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Switch',
  component: SwitchStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SwitchStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
