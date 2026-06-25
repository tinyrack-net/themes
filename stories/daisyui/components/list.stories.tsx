import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-list',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-list');
}

function listStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/list',
  component: listStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof listStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
