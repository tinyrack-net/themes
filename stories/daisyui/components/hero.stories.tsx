import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-hero',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-hero');
}

function heroStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/hero',
  component: heroStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof heroStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
