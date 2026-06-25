import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-fieldset',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-fieldset');
}

function fieldsetStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/fieldset',
  component: fieldsetStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof fieldsetStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
