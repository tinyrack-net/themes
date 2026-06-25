import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-colorinput',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-colorinput');
}

function ColorInputStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/ColorInput',
  component: ColorInputStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ColorInputStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
