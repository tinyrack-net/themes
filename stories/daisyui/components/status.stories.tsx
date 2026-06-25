import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-status',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-status');
}

function statusStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/status',
  component: statusStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof statusStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
