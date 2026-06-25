import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-slider',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-slider');
}

function SliderStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Slider',
  component: SliderStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SliderStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
