import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-rating',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-rating');
}

function ratingStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/rating',
  component: ratingStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ratingStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
