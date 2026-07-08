import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  tone?: (typeof Controls.daisyToneOptions)[number];
  expanded?: boolean;
};

function FabStory(controlValues: ComponentStoryProps) {
  const tone = controlValues.tone ?? 'primary';

  return (
    <div
      className={Controls.cx(
        'fab static',
        (controlValues.expanded ?? true) ? 'fab-flower' : undefined,
      )}
    >
      <button
        className={Controls.cx('btn btn-circle fab-main-action', `btn-${tone}`)}
        type="button"
        aria-label="Floating action"
      >
        +
      </button>
      {(controlValues.expanded ?? true) ? (
        <>
          <button className="btn btn-circle btn-sm" type="button">
            L
          </button>
          <button className="btn btn-circle btn-sm" type="button">
            S
          </button>
        </>
      ) : null}
    </div>
  );
}

FabStory.displayName = 'FabStory';

const meta = {
  title: 'daisyUI/Fab',
  component: FabStory,
  tags: ['autodocs'],
  args: {
    tone: 'primary',
    expanded: true,
  },
  argTypes: {
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
    expanded: Controls.booleanControl('Shows secondary FAB actions.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI fab themed preview',
      },
    },
  },
} satisfies Meta<typeof FabStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
