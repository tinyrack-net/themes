import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-indicator',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-indicator');
}

function indicatorStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/indicator',
  component: indicatorStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof indicatorStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
