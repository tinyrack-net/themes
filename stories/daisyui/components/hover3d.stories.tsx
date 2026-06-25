import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  daisyUiShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = daisyUiShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'daisyui-hover3d',
);

if (!entry) {
  throw new Error('Missing showcase entry: daisyui-hover3d');
}

function hover3dStory() {
  return <SingleShowcaseStory entry={entry} library="daisyui" />;
}

const meta = {
  title: 'daisyUI/Components/hover3d',
  component: hover3dStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof hover3dStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
