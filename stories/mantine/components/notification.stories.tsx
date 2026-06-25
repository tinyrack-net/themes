import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-notification',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-notification');
}

function NotificationStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Notification',
  component: NotificationStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof NotificationStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
