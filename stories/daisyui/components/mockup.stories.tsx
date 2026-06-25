import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-mockup',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-mockup');
}

function mockupStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/mockup',
  component: mockupStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof mockupStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
