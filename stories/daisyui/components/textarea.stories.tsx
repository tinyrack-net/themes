import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-textarea',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-textarea');
}

function textareaStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/textarea',
  component: textareaStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof textareaStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
