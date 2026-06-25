import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-steps',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-steps');
}

function stepsStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/steps',
  component: stepsStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof stepsStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
