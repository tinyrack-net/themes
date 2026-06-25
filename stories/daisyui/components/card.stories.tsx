import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-card',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-card');
}

function cardStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/card',
  component: cardStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof cardStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
