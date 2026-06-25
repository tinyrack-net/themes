import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-fileinput',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-fileinput');
}

function fileinputStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/fileinput',
  component: fileinputStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof fileinputStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
