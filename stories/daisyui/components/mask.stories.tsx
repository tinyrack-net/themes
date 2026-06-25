import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-mask',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-mask');
}

function maskStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/mask',
  component: maskStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof maskStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
