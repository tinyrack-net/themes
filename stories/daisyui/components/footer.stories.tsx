import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-footer',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-footer');
}

function footerStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/footer',
  component: footerStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof footerStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
