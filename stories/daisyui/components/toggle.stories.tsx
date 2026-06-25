import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-toggle',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-toggle');
}

function toggleStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/toggle',
  component: toggleStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof toggleStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
