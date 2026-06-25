import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-input',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-input');
}

function inputStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/input',
  component: inputStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof inputStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
