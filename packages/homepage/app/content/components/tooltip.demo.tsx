import { IconButton } from '@tinyrack/ui/components/icon-button';
import { Tooltip } from '@tinyrack/ui/components/tooltip';
import { Info } from 'lucide-react';
import type {
  DemoMeta as Meta,
  DemoVariant as StoryObj,
} from '../../playground/demo.js';
import {
  definePlayground,
  usePlaygroundArgs as useArgs,
} from '../../playground/demo.js';

type TooltipStoryArgs = {
  align: 'start' | 'center' | 'end';
  closeDelay: number;
  content: string;
  delay: number;
  open: boolean;
  side: 'top' | 'right' | 'bottom' | 'left';
  trigger: string;
  triggerMode: 'text' | 'icon';
};

type TooltipExampleProps = Partial<TooltipStoryArgs> & {
  onOpenChange?: (open: boolean) => void;
};

export function TooltipExample({
  align = 'center',
  closeDelay = 0,
  content = 'Rack temperature: 24°C',
  delay = 400,
  open = false,
  side = 'top',
  trigger = 'Hover for details',
  triggerMode = 'text',
  onOpenChange,
}: TooltipExampleProps) {
  const stateProps =
    onOpenChange === undefined ? { defaultOpen: open } : { onOpenChange, open };

  return (
    <Tooltip.Provider closeDelay={closeDelay} delay={delay}>
      <Tooltip.Root {...stateProps}>
        {triggerMode === 'icon' ? (
          <Tooltip.Trigger
            render={
              <IconButton aria-label={trigger}>
                <Info aria-hidden="true" />
              </IconButton>
            }
          />
        ) : (
          <Tooltip.Trigger>{trigger}</Tooltip.Trigger>
        )}
        <Tooltip.Portal>
          <Tooltip.Positioner align={align} side={side}>
            <Tooltip.Popup>
              {content}
              <Tooltip.Arrow />
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

const delayGroupItems = [
  ['CPU status', '42% utilization'],
  ['Memory status', '68% utilization'],
  ['Storage status', '2.4 TB available'],
] as const;

export function TooltipDelayGroupExample() {
  return (
    <Tooltip.Provider closeDelay={100} delay={500}>
      <div className="flex flex-wrap gap-3">
        {delayGroupItems.map(([label, content]) => (
          <Tooltip.Root key={label}>
            <Tooltip.Trigger
              render={
                <IconButton aria-label={label}>
                  <Info aria-hidden="true" />
                </IconButton>
              }
            />
            <Tooltip.Portal>
              <Tooltip.Positioner side="top">
                <Tooltip.Popup>
                  {content}
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        ))}
      </div>
    </Tooltip.Provider>
  );
}

const meta = {
  title: 'Components/Tooltip',
  excludeStories: /.*Example$/,
  parameters: { layout: 'centered' },
  args: {
    align: 'center',
    closeDelay: 100,
    content: 'Rack temperature: 24°C',
    delay: 400,
    open: true,
    side: 'top',
    trigger: 'Rack temperature details',
    triggerMode: 'icon',
  },
  argTypes: {
    align: { control: 'select', options: ['start', 'center', 'end'] },
    closeDelay: { control: { type: 'range', min: 0, max: 1000, step: 50 } },
    content: { control: 'text' },
    delay: { control: { type: 'range', min: 0, max: 1500, step: 50 } },
    open: { control: 'boolean' },
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    trigger: { control: 'text' },
    triggerMode: { control: 'select', options: ['text', 'icon'] },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<TooltipStoryArgs>();

    return <TooltipExample {...args} onOpenChange={(open) => updateArgs({ open })} />;
  },
} satisfies Meta<TooltipStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Open: Story = { args: { open: true } };

export const playground = definePlayground(meta);
