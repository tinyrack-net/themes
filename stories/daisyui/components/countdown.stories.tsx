import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-countdown',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-countdown');
}

function countdownStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/countdown',
  component: countdownStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof countdownStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
