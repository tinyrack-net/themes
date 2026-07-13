import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Divider,
  type DividerOrientation,
} from '../../src/components/divider/index.js';

type DividerStoryArgs = { orientation: DividerOrientation };

const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'centered' },
  args: { orientation: 'horizontal' },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
  render: ({ orientation }) =>
    orientation === 'vertical' ? (
      <div className="flex h-16 items-center gap-4">
        <span>CPU</span>
        <Divider orientation="vertical" />
        <span>Memory</span>
      </div>
    ) : (
      <div className="grid w-80 gap-3">
        <span>Overview</span>
        <Divider />
        <span>Network</span>
      </div>
    ),
} satisfies Meta<DividerStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
