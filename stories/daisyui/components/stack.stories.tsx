import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-stack',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-stack');
}

function stackStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/stack',
  component: stackStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof stackStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
