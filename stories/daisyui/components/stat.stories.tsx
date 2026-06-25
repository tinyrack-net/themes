import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-stat',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-stat');
}

function statStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/stat',
  component: statStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof statStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
