import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { Toggle } from '../../src/components/toggle/index.js';

type StoryArgs = {
  label: string;
  pressed: boolean;
  disabled: boolean;
};

export function TogglePreview({ label, pressed, disabled }: StoryArgs) {
  const [currentPressed, setCurrentPressed] = useState(pressed);

  useEffect(() => {
    setCurrentPressed(pressed);
  }, [pressed]);

  return (
    <Toggle
      disabled={disabled}
      onPressedChange={setCurrentPressed}
      pressed={currentPressed}
    >
      {label}
    </Toggle>
  );
}

const meta = {
  title: 'Components/Toggle',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    label: 'Bold',
    pressed: false,
    disabled: false,
  },
  argTypes: {
    label: { control: 'text' },
    pressed: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => <TogglePreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
