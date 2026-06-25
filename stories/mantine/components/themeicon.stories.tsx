import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-themeicon',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-themeicon');
}

function ThemeIconStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/ThemeIcon',
  component: ThemeIconStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ThemeIconStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
