import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  orientation?: (typeof Controls.daisyOrientationOptions)[number];
  compact?: boolean;
  snapIcon?: boolean;
};

function TimelineStory(controlValues: ComponentStoryProps) {
  const orientation = controlValues.orientation ?? 'vertical';

  return (
    <ul
      className={Controls.cx(
        'timeline',
        `timeline-${orientation}`,
        (controlValues.compact ?? false) ? 'timeline-compact' : undefined,
        (controlValues.snapIcon ?? true) ? 'timeline-snap-icon' : undefined,
      )}
    >
      {['Deploy', 'Backup', 'Audit'].map((title, index) => (
        <li key={title}>
          <div className="timeline-start">{title}</div>
          <div className="timeline-middle">
            <span
              className={Controls.cx(
                'status',
                index === 1 ? 'status-primary' : 'status-neutral',
              )}
            />
          </div>
          <div className="timeline-end timeline-box">
            {index === 1 ? 'running' : 'done'}
          </div>
        </li>
      ))}
    </ul>
  );
}

TimelineStory.displayName = 'TimelineStory';

const meta = {
  title: 'daisyUI/Timeline',
  component: TimelineStory,
  tags: ['autodocs'],
  args: {
    orientation: 'vertical',
    compact: false,
    snapIcon: true,
  },
  argTypes: {
    orientation: Controls.selectControl(
      Controls.daisyOrientationOptions,
      'Timeline orientation class.',
    ),
    compact: Controls.booleanControl('Applies timeline-compact.'),
    snapIcon: Controls.booleanControl('Applies timeline-snap-icon.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI timeline themed preview',
      },
    },
  },
} satisfies Meta<typeof TimelineStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
