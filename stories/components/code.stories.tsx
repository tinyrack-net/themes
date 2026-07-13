import type { Meta, StoryObj } from '@storybook/react-vite';
import { Code } from '../../src/components/code/index.js';

type CodeStoryArgs = { children: string };

const meta = {
  title: 'Components/Code',
  component: Code,
  parameters: { layout: 'centered' },
  args: { children: 'pnpm verify' },
  argTypes: { children: { control: 'text' } },
  render: ({ children }) => (
    <p>
      Run <Code>{children}</Code> before publishing.
    </p>
  ),
} satisfies Meta<CodeStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
