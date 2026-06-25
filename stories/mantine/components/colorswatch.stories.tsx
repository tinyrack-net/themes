import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-colorswatch',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-colorswatch');
}

function ColorSwatchStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/ColorSwatch',
  component: ColorSwatchStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ColorSwatchStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
