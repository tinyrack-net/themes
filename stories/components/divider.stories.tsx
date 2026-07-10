import type { Meta, StoryObj } from '@storybook/react-vite';
import { dividerOrientations } from '../../src/components/divider/contract.js';
import { Divider, type DividerProps } from '../../src/components/divider/react.js';

type ComponentStoryProps = Pick<DividerProps, 'className' | 'orientation'>;

function DividerStory(controlValues: ComponentStoryProps) {
  return (
    <div className="flex min-h-16 w-full items-center justify-center gap-4">
      {controlValues.orientation === 'vertical' ? (
        <>
          <span>Before</span>
          <Divider {...controlValues} />
          <span>After</span>
        </>
      ) : (
        <div className="grid w-full gap-3">
          <span>Before</span>
          <Divider {...controlValues} />
          <span>After</span>
        </div>
      )}
    </div>
  );
}

DividerStory.displayName = 'DividerStory';

const meta = {
  title: 'Components/Divider',
  component: DividerStory,
  args: { orientation: 'horizontal' },
  argTypes: {
    orientation: { control: 'select', options: dividerOrientations },
  },
} satisfies Meta<typeof DividerStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
