import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  color?: (typeof Controls.mantineColorOptions)[number];
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  loading?: boolean;
  withBorder?: boolean;
  withCloseButton?: boolean;
};

function NotificationStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Notification
      color={controlValues.color ?? 'tinyrack'}
      loading={controlValues.loading ?? false}
      radius={controlValues.radius ?? 'md'}
      title="Backup complete"
      withBorder={controlValues.withBorder ?? true}
      withCloseButton={controlValues.withCloseButton ?? true}
      className="w-80"
    >
      nas-01 snapshot is ready.
    </Mantine.Notification>
  );
}

NotificationStory.displayName = 'NotificationStory';

const meta = {
  title: 'Mantine/Notification',
  component: NotificationStory,
  tags: ['autodocs'],
  args: {
    color: 'tinyrack',
    radius: 'md',
    loading: false,
    withBorder: true,
    withCloseButton: true,
  },
  argTypes: {
    color: Controls.selectControl(
      Controls.mantineColorOptions,
      'Mantine theme color token.',
    ),
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    loading: Controls.booleanControl('Shows loading indicator.'),
    withBorder: Controls.booleanControl('Shows notification border.'),
    withCloseButton: Controls.booleanControl('Shows close button.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Notification themed preview',
      },
    },
  },
} satisfies Meta<typeof NotificationStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
