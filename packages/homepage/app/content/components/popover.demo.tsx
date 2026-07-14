import { Popover } from '@tinyrack/ui/components/popover';
import { Select } from '@tinyrack/ui/components/select';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type {
  DemoMeta as Meta,
  DemoVariant as StoryObj,
} from '../../playground/demo.js';
import {
  definePlayground,
  usePlaygroundArgs as useArgs,
} from '../../playground/demo.js';

type PopoverStoryArgs = {
  align: 'start' | 'center' | 'end';
  alignOffset: number;
  collisionMode: 'flip' | 'shift' | 'none';
  description: string;
  open: boolean;
  side: 'top' | 'right' | 'bottom' | 'left';
  sideOffset: number;
  title: string;
};

type PopoverExampleProps = Partial<PopoverStoryArgs> & {
  onOpenChange?: (open: boolean) => void;
};

export function PopoverExample({
  align = 'center',
  alignOffset = 0,
  collisionMode = 'flip',
  description = 'All nodes online.',
  open = false,
  side = 'bottom',
  sideOffset = 8,
  title = 'Rack A',
  onOpenChange,
}: PopoverExampleProps) {
  const [theme, setTheme] = useState('system');
  const stateProps =
    onOpenChange === undefined ? { defaultOpen: open } : { onOpenChange, open };

  return (
    <Popover.Root {...stateProps}>
      <Popover.Trigger>Rack details</Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          align={align}
          alignOffset={alignOffset}
          collisionAvoidance={
            collisionMode === 'flip'
              ? { align: 'flip', side: 'flip' }
              : { align: collisionMode, side: collisionMode }
          }
          side={side}
          sideOffset={sideOffset}
        >
          <Popover.Popup>
            <Popover.Arrow />
            <Popover.Title>{title}</Popover.Title>
            <Popover.Description>{description}</Popover.Description>
            <Select.Root
              items={{ system: 'System', light: 'Light', dark: 'Dark' }}
              onValueChange={(value) => setTheme((value as string | null) ?? 'system')}
              value={theme}
            >
              <Select.Label>Dashboard theme</Select.Label>
              <Select.Trigger aria-label="Dashboard theme">
                <Select.Value />
                <Select.Icon aria-hidden="true">
                  <ChevronDown />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner>
                  <Select.Popup>
                    <Select.List>
                      <Select.Item value="system">
                        <Select.ItemText>System</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="light">
                        <Select.ItemText>Light</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="dark">
                        <Select.ItemText>Dark</Select.ItemText>
                      </Select.Item>
                    </Select.List>
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>
            <output aria-live="polite">Theme: {theme}</output>
            <Popover.Close>Close</Popover.Close>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function PopoverControlledLifecycle() {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid w-full justify-items-end gap-3">
      <PopoverExample
        align="end"
        alignOffset={12}
        collisionMode="flip"
        description="Collision handling keeps this long surface inside the viewport."
        onOpenChange={setOpen}
        open={open}
        side="right"
        sideOffset={16}
        title="Controlled edge popover"
      />
      <output aria-live="polite">Popover is {open ? 'open' : 'closed'}.</output>
    </div>
  );
}

const meta = {
  title: 'Components/Popover',
  parameters: { layout: 'centered' },
  args: {
    align: 'center',
    alignOffset: 0,
    collisionMode: 'flip',
    description: 'All nodes online.',
    open: false,
    side: 'bottom',
    sideOffset: 8,
    title: 'Rack A',
  },
  argTypes: {
    align: { control: 'select', options: ['start', 'center', 'end'] },
    alignOffset: { control: { type: 'range', min: -24, max: 24, step: 2 } },
    collisionMode: { control: 'select', options: ['flip', 'shift', 'none'] },
    description: { control: 'text' },
    open: { control: 'boolean' },
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    sideOffset: { control: { type: 'range', min: 0, max: 32, step: 2 } },
    title: { control: 'text' },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<PopoverStoryArgs>();

    return <PopoverExample {...args} onOpenChange={(open) => updateArgs({ open })} />;
  },
} satisfies Meta<PopoverStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Open: Story = { args: { open: true } };

export const playground = definePlayground(meta);
