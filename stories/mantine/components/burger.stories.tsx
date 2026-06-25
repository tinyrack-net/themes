import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-burger',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-burger');
}

function BurgerStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Burger',
  component: BurgerStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BurgerStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
