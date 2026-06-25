import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-dock',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-dock');
}

function dockStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/dock',
  component: dockStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof dockStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
