import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-radio',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-radio');
}

function radioStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/radio',
  component: radioStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof radioStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
