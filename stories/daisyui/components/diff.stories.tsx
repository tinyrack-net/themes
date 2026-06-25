import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-diff',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-diff');
}

function diffStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/diff',
  component: diffStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof diffStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
