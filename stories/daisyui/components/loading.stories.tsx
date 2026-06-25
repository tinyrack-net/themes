import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-loading',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-loading');
}

function loadingStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/loading',
  component: loadingStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof loadingStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
