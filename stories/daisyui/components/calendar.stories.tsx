import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-calendar',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-calendar');
}

function calendarStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/calendar',
  component: calendarStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof calendarStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
