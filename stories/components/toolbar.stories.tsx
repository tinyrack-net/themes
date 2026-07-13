import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toolbar } from '../../src/components/toolbar/index.js';

type StoryArgs = {
  label: string;
  disabled: boolean;
  orientation: 'horizontal' | 'vertical';
};

export function ToolbarPreview({ label, disabled, orientation }: StoryArgs) {
  return (
    <Toolbar.Root aria-label={label} orientation={orientation}>
      <Toolbar.Group>
        <Toolbar.Button disabled={disabled}>Bold</Toolbar.Button>
        <Toolbar.Button>Italic</Toolbar.Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Link href="#help">Help</Toolbar.Link>
    </Toolbar.Root>
  );
}

const meta = {
  title: 'Components/Toolbar',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    label: 'Editor controls',
    disabled: false,
    orientation: 'horizontal',
  },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    orientation: { options: ['horizontal', 'vertical'], control: 'radio' },
  },
  render: (args) => <ToolbarPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
