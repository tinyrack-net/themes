import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-avatar',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-avatar');
}

function avatarStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/avatar',
  component: avatarStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof avatarStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
