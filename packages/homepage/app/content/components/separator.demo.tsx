import { Button } from '@tinyrack/ui/components/button';
import { Separator, type SeparatorProps } from '@tinyrack/ui/components/separator';
import type {
  DemoMeta as Meta,
  DemoVariant as StoryObj,
} from '../../playground/demo.js';
import { definePlayground } from '../../playground/demo.js';

type SeparatorStoryArgs = {
  decorative: boolean;
  orientation: NonNullable<SeparatorProps['orientation']>;
};

const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: { layout: 'centered' },
  args: { decorative: false, orientation: 'horizontal' },
  argTypes: {
    decorative: { control: 'boolean' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
  render: ({ decorative, orientation }) =>
    orientation === 'vertical' ? (
      <div
        aria-label="Resource filters"
        className="flex h-16 items-center gap-4"
        role="toolbar"
      >
        <Button uiSize="sm" type="button">
          CPU
        </Button>
        <Separator
          orientation="vertical"
          role={decorative ? 'presentation' : 'separator'}
        />
        <Button uiSize="sm" type="button">
          Memory
        </Button>
      </div>
    ) : (
      <div className="grid w-80 gap-3">
        <span>Overview</span>
        <Separator role={decorative ? 'presentation' : 'separator'} />
        <span>Network</span>
      </div>
    ),
} satisfies Meta<SeparatorStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const playground = definePlayground(meta);
