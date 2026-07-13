import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from '../../src/components/popover/index.js';

type PopoverStoryArgs = {
  align: 'start' | 'center' | 'end';
  description: string;
  open: boolean;
  side: 'top' | 'right' | 'bottom' | 'left';
  title: string;
};

export function PopoverExample({
  align = 'center',
  description = 'All nodes online.',
  open = false,
  side = 'bottom',
  title = 'Rack A',
}: Partial<PopoverStoryArgs>) {
  return (
    <Popover.Root defaultOpen={open} key={`${open}-${side}-${align}`}>
      <Popover.Trigger>Rack details</Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner align={align} side={side}>
          <Popover.Popup>
            <Popover.Title>{title}</Popover.Title>
            <Popover.Description>{description}</Popover.Description>
            <Popover.Close>Close</Popover.Close>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

const meta = {
  title: 'Components/Popover',
  parameters: { layout: 'centered' },
  args: {
    align: 'center',
    description: 'All nodes online.',
    open: false,
    side: 'bottom',
    title: 'Rack A',
  },
  argTypes: {
    align: { control: 'select', options: ['start', 'center', 'end'] },
    description: { control: 'text' },
    open: { control: 'boolean' },
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    title: { control: 'text' },
  },
  render: (args) => <PopoverExample {...args} />,
} satisfies Meta<PopoverStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Open: Story = { args: { open: true } };
