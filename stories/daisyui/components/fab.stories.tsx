import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-fab',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-fab');
}

function fabStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/fab',
  component: fabStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof fabStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
