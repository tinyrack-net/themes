import { Code } from '@tinyrack/ui/components/code';
import type {
  DemoMeta as Meta,
  DemoVariant as StoryObj,
} from '../../playground/demo.js';
import { definePlayground } from '../../playground/demo.js';

type CodeStoryArgs = { children: string; containerWidth: number };

const meta = {
  title: 'Components/Code',
  component: Code,
  parameters: { layout: 'centered' },
  args: { children: 'pnpm test:component\npnpm verify', containerWidth: 320 },
  argTypes: {
    children: { control: 'textarea' },
    containerWidth: { control: { type: 'range', min: 160, max: 640, step: 16 } },
  },
  render: ({ children, containerWidth }) => (
    <p style={{ maxWidth: containerWidth }}>
      Run <Code>{children}</Code> before publishing.
    </p>
  ),
} satisfies Meta<CodeStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const playground = definePlayground(meta);
