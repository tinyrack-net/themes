import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-textrotate',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-textrotate');
}

function textrotateStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/textrotate',
  component: textrotateStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof textrotateStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
