import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Separator,
  type SeparatorOrientation,
} from '../../src/components/separator/index.js';

type SeparatorStoryArgs = { orientation: SeparatorOrientation };

const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: { layout: 'centered' },
  args: { orientation: 'horizontal' },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
  render: ({ orientation }) =>
    orientation === 'vertical' ? (
      <div className="flex h-16 items-center gap-4">
        <span>CPU</span>
        <Separator orientation="vertical" />
        <span>Memory</span>
      </div>
    ) : (
      <div className="grid w-80 gap-3">
        <span>Overview</span>
        <Separator />
        <span>Network</span>
      </div>
    ),
} satisfies Meta<SeparatorStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
