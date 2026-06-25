import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-skeleton',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-skeleton');
}

function skeletonStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/skeleton',
  component: skeletonStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof skeletonStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
