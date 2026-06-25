import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-navbar',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-navbar');
}

function navbarStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/navbar',
  component: navbarStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof navbarStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
