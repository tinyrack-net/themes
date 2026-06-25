import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-radialprogress',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-radialprogress');
}

function radialprogressStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/radialprogress',
  component: radialprogressStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof radialprogressStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
