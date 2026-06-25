import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-dropdown',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-dropdown');
}

function dropdownStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/dropdown',
  component: dropdownStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof dropdownStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
