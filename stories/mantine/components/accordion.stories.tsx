import '../../../src/showcase/showcase.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mantineShowcaseEntries,
  SingleShowcaseStory,
} from '../../../src/showcase/index.js';

const entry = mantineShowcaseEntries.find(
  (showcaseEntry) => showcaseEntry.id === 'mantine-accordion',
);

if (!entry) {
  throw new Error('Missing showcase entry: mantine-accordion');
}

function AccordionStory() {
  return <SingleShowcaseStory entry={entry} library="mantine" />;
}

const meta = {
  title: 'Mantine/Components/Accordion',
  component: AccordionStory,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AccordionStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
