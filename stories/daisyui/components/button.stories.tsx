import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-button',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-button');
}

function buttonStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/button',
  component: buttonStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof buttonStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
