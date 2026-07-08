import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  compact?: boolean;
  current?: 'services' | 'node' | 'logs';
};

function BreadcrumbsStory(controlValues: ComponentStoryProps) {
  const compact = controlValues.compact ?? false;
  const current = controlValues.current ?? 'node';

  return (
    <div className={Controls.cx('breadcrumbs', compact ? 'text-xs' : 'text-sm')}>
      <ul>
        <li>
          <a href="#top">Rack</a>
        </li>
        <li>
          <a
            className={current === 'services' ? 'text-primary' : undefined}
            href="#top"
          >
            Services
          </a>
        </li>
        <li>
          <a className={current === 'node' ? 'text-primary' : undefined} href="#top">
            nas-01
          </a>
        </li>
        <li>
          <span className={current === 'logs' ? 'text-primary' : undefined}>Logs</span>
        </li>
      </ul>
    </div>
  );
}

BreadcrumbsStory.displayName = 'BreadcrumbsStory';

const meta = {
  title: 'daisyUI/Breadcrumbs',
  component: BreadcrumbsStory,
  tags: ['autodocs'],
  args: {
    compact: false,
    current: 'node',
  },
  argTypes: {
    compact: Controls.booleanControl('Uses a compact text scale.'),
    current: Controls.selectControl(
      ['services', 'node', 'logs'],
      'Highlighted breadcrumb item.',
    ),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI breadcrumbs themed preview',
      },
    },
  },
} satisfies Meta<typeof BreadcrumbsStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
