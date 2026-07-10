import type { Meta, StoryObj } from '@storybook/react-vite';
import { cardPaddings, cardVariants } from '../../src/components/card/contract.js';
import { Card, type CardProps } from '../../src/components/card/react.js';

type ComponentStoryProps = Pick<CardProps, 'children' | 'padding' | 'variant'>;

function CardStory(controlValues: ComponentStoryProps) {
  return <Card {...controlValues} />;
}

CardStory.displayName = 'CardStory';

const meta = {
  title: 'Components/Card',
  component: CardStory,
  args: {
    children: 'Rack overview',
    padding: 'md',
    variant: 'default',
  },
  argTypes: {
    children: { control: 'text', description: 'Card content.' },
    padding: { control: 'select', options: cardPaddings },
    variant: { control: 'select', options: cardVariants },
  },
} satisfies Meta<typeof CardStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
