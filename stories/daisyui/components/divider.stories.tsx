import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-divider',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-divider');
}

function dividerStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/divider',
  component: dividerStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof dividerStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
