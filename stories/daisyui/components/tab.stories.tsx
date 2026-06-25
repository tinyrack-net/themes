import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-tab',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-tab');
}

function tabStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/tab',
  component: tabStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof tabStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
