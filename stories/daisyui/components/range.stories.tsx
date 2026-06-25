import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-range',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-range');
}

function rangeStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/range',
  component: rangeStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof rangeStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
