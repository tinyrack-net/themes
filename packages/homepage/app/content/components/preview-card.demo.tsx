import { PreviewCard } from '@tinyrack/ui/components/preview-card';
import type {
  DemoMeta as Meta,
  DemoVariant as StoryObj,
} from '../../playground/demo.js';
import {
  definePlayground,
  usePlaygroundArgs as useArgs,
} from '../../playground/demo.js';

type StoryArgs = {
  align: 'start' | 'center' | 'end';
  closeDelay: number;
  delay: number;
  label: string;
  open: boolean;
  side: 'top' | 'right' | 'bottom' | 'left';
};

type PreviewCardPreviewProps = StoryArgs & {
  onOpenChange?: (open: boolean) => void;
};

export function PreviewCardPreview({
  align,
  closeDelay,
  delay,
  label,
  open,
  onOpenChange,
  side,
}: PreviewCardPreviewProps) {
  const stateProps =
    onOpenChange === undefined ? { defaultOpen: open } : { onOpenChange, open };

  return (
    <PreviewCard.Root {...stateProps}>
      <PreviewCard.Trigger closeDelay={closeDelay} delay={delay} href="#rack-alpha">
        {label}
      </PreviewCard.Trigger>
      <PreviewCard.Portal>
        <PreviewCard.Positioner align={align} side={side}>
          <PreviewCard.Popup>
            <PreviewCard.Arrow />
            <strong>Rack Alpha</strong>
            <p>Healthy · 12 services</p>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}

const meta = {
  title: 'Components/Preview Card',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    align: 'center',
    closeDelay: 300,
    delay: 600,
    label: 'Rack Alpha',
    open: false,
    side: 'bottom',
  },
  argTypes: {
    align: { control: 'select', options: ['start', 'center', 'end'] },
    closeDelay: { control: { type: 'range', min: 0, max: 1000, step: 50 } },
    delay: { control: { type: 'range', min: 0, max: 1500, step: 50 } },
    label: { control: 'text' },
    open: { control: 'boolean' },
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>();

    return (
      <PreviewCardPreview {...args} onOpenChange={(open) => updateArgs({ open })} />
    );
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Open: Story = { args: { open: true } };

export const playground = definePlayground(meta);
