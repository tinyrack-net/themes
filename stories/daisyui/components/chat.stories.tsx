import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-chat',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-chat');
}

function chatStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/chat',
  component: chatStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof chatStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
