import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-alert',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-alert');
}

function alertStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/alert',
  component: alertStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof alertStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
