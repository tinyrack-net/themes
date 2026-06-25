import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-swap',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-swap');
}

function swapStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/swap',
  component: swapStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof swapStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
