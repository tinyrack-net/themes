import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-timeline',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-timeline');
}

function timelineStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/timeline',
  component: timelineStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof timelineStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
