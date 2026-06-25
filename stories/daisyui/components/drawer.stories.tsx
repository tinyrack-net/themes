import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-drawer',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-drawer');
}

function drawerStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/drawer',
  component: drawerStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof drawerStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
