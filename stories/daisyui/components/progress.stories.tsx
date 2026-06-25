import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-progress',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-progress');
}

function progressStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/progress',
  component: progressStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof progressStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
