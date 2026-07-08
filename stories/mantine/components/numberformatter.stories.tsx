import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  value?: number;
  thousandSeparator?: boolean;
  decimalScale?: number;
  prefix?: '$' | '';
};

function NumberFormatterStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Text size="xl" fw={700}>
      <Mantine.NumberFormatter
        decimalScale={controlValues.decimalScale ?? 0}
        prefix={controlValues.prefix ?? ''}
        thousandSeparator={controlValues.thousandSeparator ?? true}
        value={controlValues.value ?? 12800}
      />
    </Mantine.Text>
  );
}

NumberFormatterStory.displayName = 'NumberFormatterStory';

const meta = {
  title: 'Mantine/NumberFormatter',
  component: NumberFormatterStory,
  tags: ['autodocs'],
  args: {
    value: 12800,
    thousandSeparator: true,
    decimalScale: 0,
    prefix: '',
  },
  argTypes: {
    value: Controls.numberControl('Formatted numeric value.', {
      min: 0,
      max: 100000,
      step: 100,
    }),
    thousandSeparator: Controls.booleanControl('Uses thousand separators.'),
    decimalScale: Controls.numberControl('Decimal places.', { min: 0, max: 3 }),
    prefix: Controls.selectControl(['', '$'], 'Number prefix.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core NumberFormatter themed preview',
      },
    },
  },
} satisfies Meta<typeof NumberFormatterStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
