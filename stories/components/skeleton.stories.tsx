import type { Meta, StoryObj } from '@storybook/react-vite';
import { skeletonShapes } from '../../src/components/skeleton/contract.js';
import { Skeleton, type SkeletonProps } from '../../src/components/skeleton/react.js';

type ComponentStoryProps = Pick<SkeletonProps, 'animate' | 'shape'>;

function SkeletonStory(controlValues: ComponentStoryProps) {
  return <Skeleton {...controlValues} />;
}

SkeletonStory.displayName = 'SkeletonStory';

const meta = {
  title: 'Components/Skeleton',
  component: SkeletonStory,
  args: { animate: true, shape: 'text' },
  argTypes: {
    animate: { control: 'boolean' },
    shape: { control: 'select', options: skeletonShapes },
  },
} satisfies Meta<typeof SkeletonStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
