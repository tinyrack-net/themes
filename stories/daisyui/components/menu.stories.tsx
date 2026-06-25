import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-menu',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-menu');
}

function menuStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/menu',
  component: menuStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof menuStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
