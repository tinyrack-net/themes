import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-checkbox',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-checkbox');
}

function checkboxStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/checkbox',
  component: checkboxStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof checkboxStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
