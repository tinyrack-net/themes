import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-appshell',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-appshell');
}

function AppShellStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/AppShell',
  component: AppShellStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AppShellStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
