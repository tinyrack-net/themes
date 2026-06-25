import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-carousel',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-carousel');
}

function carouselStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/carousel',
  component: carouselStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof carouselStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
