import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-select',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-select');
}

function selectStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/select',
  component: selectStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof selectStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
