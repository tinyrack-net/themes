import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-filter',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-filter');
}

function filterStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/filter',
  component: filterStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof filterStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
