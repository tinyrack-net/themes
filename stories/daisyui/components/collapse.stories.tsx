import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-collapse',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-collapse');
}

function collapseStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/collapse',
  component: collapseStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof collapseStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
