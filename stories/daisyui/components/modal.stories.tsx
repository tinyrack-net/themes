import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-modal',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-modal');
}

function modalStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/modal',
  component: modalStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof modalStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
