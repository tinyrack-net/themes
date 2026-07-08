import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  value?: number;
  size?: (typeof Controls.daisySizeOptions)[number];
};

function CountdownStory(controlValues: ComponentStoryProps) {
  const value = controlValues.value ?? 42;
  const size = controlValues.size ?? 'md';

  return (
    <span
      className={Controls.cx(
        'countdown font-mono',
        size === 'md' ? 'text-2xl' : `text-${size}`,
      )}
    >
      <span style={{ '--value': value } as React.CSSProperties} />
    </span>
  );
}

CountdownStory.displayName = 'CountdownStory';

const meta = {
  title: 'daisyUI/Countdown',
  component: CountdownStory,
  tags: ['autodocs'],
  args: {
    value: 42,
    size: 'md',
  },
  argTypes: {
    value: Controls.numberControl('Countdown value custom property.', {
      min: 0,
      max: 99,
    }),
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI countdown themed preview',
      },
    },
  },
} satisfies Meta<typeof CountdownStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
