import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-label',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-label');
}

function labelStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/label',
  component: labelStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof labelStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
