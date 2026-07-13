import type { Meta, StoryObj } from '@storybook/react-vite';
import type { BundledLanguage, BundledTheme } from 'shiki/bundle/web';
import { CodeBlock } from '../../src/components/code-block/index.js';

type CodeBlockStoryArgs = {
  code: string;
  language: BundledLanguage;
  theme: BundledTheme;
  wrap: boolean;
};

const meta = {
  title: 'Components/Code Block',
  component: CodeBlock,
  parameters: { layout: 'centered' },
  args: {
    code: "const status = 'healthy';",
    language: 'ts',
    theme: 'github-dark',
    wrap: false,
  },
  argTypes: {
    code: { control: 'text' },
    language: {
      control: 'select',
      options: ['ts', 'tsx', 'js', 'json', 'css', 'html', 'shellscript'],
    },
    theme: {
      control: 'select',
      options: ['github-dark', 'github-light', 'dark-plus', 'light-plus'],
    },
    wrap: { control: 'boolean' },
  },
  render: (args) => <CodeBlock className="max-w-xl" {...args} />,
} satisfies Meta<CodeBlockStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
