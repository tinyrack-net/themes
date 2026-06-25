import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-table',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-table');
}

function tableStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/table',
  component: tableStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof tableStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
