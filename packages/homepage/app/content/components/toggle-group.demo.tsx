import { Toggle } from '@tinyrack/ui/components/toggle';
import { ToggleGroup } from '@tinyrack/ui/components/toggle-group';
import { useState } from 'react';
import type {
  DemoMeta as Meta,
  DemoVariant as StoryObj,
} from '../../playground/demo.js';
import {
  definePlayground,
  usePlaygroundArgs as useArgs,
} from '../../playground/demo.js';

type StoryArgs = {
  disabled: boolean;
  itemDisabled: boolean;
  loopFocus: boolean;
  multiple: boolean;
  orientation: 'horizontal' | 'vertical';
  value: string[];
};

type ToggleGroupPreviewProps = StoryArgs & {
  onValueChange?: (value: string[]) => void;
};

export function ToggleGroupPreview({
  disabled,
  itemDisabled,
  loopFocus,
  multiple,
  onValueChange,
  orientation,
  value,
}: ToggleGroupPreviewProps) {
  return (
    <div className="grid justify-items-start gap-3">
      <ToggleGroup
        aria-label="Text alignment"
        disabled={disabled}
        loopFocus={loopFocus}
        multiple={multiple}
        onValueChange={onValueChange}
        orientation={orientation}
        value={value}
      >
        <Toggle value="start">Start</Toggle>
        <Toggle value="center">Center</Toggle>
        <Toggle disabled={itemDisabled} value="end">
          End
        </Toggle>
      </ToggleGroup>
      <output aria-live="polite" className="text-tinyrack-sm text-tinyrack-text-muted">
        Active: {value.length === 0 ? 'none' : value.join(', ')}
      </output>
    </div>
  );
}

export function ToggleGroupInteractiveExample() {
  const [value, setValue] = useState<string[]>(['start']);

  return (
    <div className="grid justify-items-start gap-3">
      <ToggleGroup
        aria-label="Text alignment"
        defaultValue={['start']}
        onValueChange={setValue}
      >
        <Toggle value="start">Start</Toggle>
        <Toggle value="center">Center</Toggle>
        <Toggle value="end">End</Toggle>
      </ToggleGroup>
      <output aria-live="polite" className="text-tinyrack-sm text-tinyrack-text-muted">
        Active: {value.length === 0 ? 'none' : value.join(', ')}
      </output>
    </div>
  );
}

export function ToggleGroupMultipleExample() {
  const [value, setValue] = useState<string[]>(['bold', 'underline']);

  return (
    <div className="grid justify-items-start gap-3">
      <ToggleGroup
        aria-label="Text formatting"
        multiple
        onValueChange={setValue}
        value={value}
      >
        <Toggle value="bold">Bold</Toggle>
        <Toggle value="italic">Italic</Toggle>
        <Toggle value="underline">Underline</Toggle>
      </ToggleGroup>
      <output aria-live="polite" className="text-tinyrack-sm text-tinyrack-text-muted">
        Formatting: {value.length === 0 ? 'none' : value.join(', ')}
      </output>
    </div>
  );
}

export function ToggleGroupAvailabilityExample() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <div className="grid justify-items-start gap-3">
        <p className="text-tinyrack-sm font-semibold">Group disabled</p>
        <ToggleGroup
          aria-label="Unavailable panel placement"
          defaultValue={['top']}
          disabled
          loopFocus={false}
          orientation="vertical"
        >
          <Toggle value="top">Top</Toggle>
          <Toggle value="middle">Middle</Toggle>
          <Toggle value="bottom">Bottom</Toggle>
        </ToggleGroup>
      </div>

      <div className="grid justify-items-start gap-3">
        <p className="text-tinyrack-sm font-semibold">One item disabled</p>
        <ToggleGroup
          aria-label="Available panel placement"
          defaultValue={['top']}
          loopFocus={false}
          orientation="vertical"
        >
          <Toggle value="top">Top</Toggle>
          <Toggle value="middle">Middle</Toggle>
          <Toggle disabled value="bottom">
            Bottom unavailable
          </Toggle>
        </ToggleGroup>
      </div>
    </div>
  );
}

const meta = {
  title: 'Components/Toggle Group',
  excludeStories: /.*(?:Preview|Example)$/,
  parameters: { layout: 'centered' },
  args: {
    disabled: false,
    itemDisabled: false,
    loopFocus: true,
    multiple: false,
    orientation: 'horizontal',
    value: ['start'],
  },
  argTypes: {
    disabled: { control: 'boolean' },
    itemDisabled: { control: 'boolean' },
    loopFocus: { control: 'boolean' },
    multiple: { control: 'boolean' },
    orientation: { options: ['horizontal', 'vertical'], control: 'radio' },
    value: {
      control: 'json',
      validate: (value) =>
        Array.isArray(value) && value.every((entry) => typeof entry === 'string'),
      validationMessage: 'Enter a JSON array of string values.',
    },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>();

    return (
      <ToggleGroupPreview {...args} onValueChange={(value) => updateArgs({ value })} />
    );
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const playground = definePlayground(meta);
