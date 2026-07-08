import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  orientation?: (typeof Controls.daisyOrientationOptions)[number];
  tone?: (typeof Controls.daisyToneOptions)[number];
  activeStep?: number;
};

function StepsStory(controlValues: ComponentStoryProps) {
  const activeStep = controlValues.activeStep ?? 2;
  const tone = controlValues.tone ?? 'primary';
  const orientation = controlValues.orientation ?? 'horizontal';

  return (
    <ul className={Controls.cx('steps', `steps-${orientation}`)}>
      {[1, 2, 3].map((step) => (
        <li
          className={Controls.cx(
            'step',
            step <= activeStep ? `step-${tone}` : undefined,
          )}
          key={step}
        >
          Step {step}
        </li>
      ))}
    </ul>
  );
}

StepsStory.displayName = 'StepsStory';

const meta = {
  title: 'daisyUI/Steps',
  component: StepsStory,
  tags: ['autodocs'],
  args: {
    orientation: 'horizontal',
    tone: 'primary',
    activeStep: 2,
  },
  argTypes: {
    orientation: Controls.selectControl(
      Controls.daisyOrientationOptions,
      'Steps orientation class.',
    ),
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
    activeStep: Controls.numberControl('Last active step.', { min: 1, max: 3 }),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI steps themed preview',
      },
    },
  },
} satisfies Meta<typeof StepsStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
