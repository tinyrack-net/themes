import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-kbd',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-kbd');
}

function kbdStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/kbd',
  component: kbdStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof kbdStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
