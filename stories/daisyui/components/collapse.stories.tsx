import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  indicator?: 'arrow' | 'plus';
  open?: boolean;
};

function CollapseStory(controlValues: ComponentStoryProps) {
  const indicator = controlValues.indicator ?? 'arrow';

  return (
    <div
      className={Controls.cx(
        'collapse w-80 bg-base-200',
        `collapse-${indicator}`,
        (controlValues.open ?? true) ? 'collapse-open' : undefined,
      )}
    >
      <div className="collapse-title font-semibold">Maintenance notes</div>
      <div className="collapse-content">
        <p>Router firmware check is scheduled tonight.</p>
      </div>
    </div>
  );
}

CollapseStory.displayName = 'CollapseStory';

const meta = {
  title: 'daisyUI/Collapse',
  component: CollapseStory,
  tags: ['autodocs'],
  args: {
    indicator: 'arrow',
    open: true,
  },
  argTypes: {
    indicator: Controls.selectControl(['arrow', 'plus'], 'Collapse indicator class.'),
    open: Controls.booleanControl('Applies collapse-open state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI collapse themed preview',
      },
    },
  },
} satisfies Meta<typeof CollapseStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
