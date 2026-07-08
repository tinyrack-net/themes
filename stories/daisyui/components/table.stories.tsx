import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.daisySizeOptions)[number];
  zebra?: boolean;
};

function TableStory(controlValues: ComponentStoryProps) {
  return (
    <div className="overflow-x-auto">
      <table
        className={Controls.cx(
          'table w-96',
          `table-${controlValues.size ?? 'md'}`,
          (controlValues.zebra ?? true) ? 'table-zebra' : undefined,
        )}
      >
        <thead>
          <tr>
            <th>Node</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>nas-01</td>
            <td>Healthy</td>
          </tr>
          <tr>
            <td>router</td>
            <td>Online</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

TableStory.displayName = 'TableStory';

const meta = {
  title: 'daisyUI/Table',
  component: TableStory,
  tags: ['autodocs'],
  args: {
    size: 'md',
    zebra: true,
  },
  argTypes: {
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
    zebra: Controls.booleanControl('Applies table-zebra rows.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI table themed preview',
      },
    },
  },
} satisfies Meta<typeof TableStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
