import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-link',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-link');
}

function linkStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/link',
  component: linkStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof linkStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
