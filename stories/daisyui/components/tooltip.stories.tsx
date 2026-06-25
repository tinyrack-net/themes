import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-tooltip',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-tooltip');
}

function tooltipStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/tooltip',
  component: tooltipStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof tooltipStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
