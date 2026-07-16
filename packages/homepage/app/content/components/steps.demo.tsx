import { CodeBlock } from '@tinyrack/ui/components/code-block';
import { Steps } from '@tinyrack/ui/components/steps';
import { Tabs } from '@tinyrack/ui/components/tabs';
import type {
  DemoMeta as Meta,
  DemoVariant as StoryObj,
} from '../../playground/demo.js';

type Args = { count: number };
export function StepsPreview({ count }: Args) {
  return (
    <Steps.Root className="!my-0">
      {['Install the package', 'Create the config', 'Build the site']
        .slice(0, count)
        .map((label) => (
          <Steps.Item key={label}>
            <strong>{label}</strong>
          </Steps.Item>
        ))}
    </Steps.Root>
  );
}

export function StepsGuidePreview({ count = 3 }: Args = { count: 3 }) {
  return (
    <Steps.Root className="!my-0 w-full max-w-2xl">
      <Steps.Item>
        <h3 className="text-tinyrack-lg font-semibold">Create a project</h3>
        <p>Start with a React app and add the Tinyrack packages.</p>
        <Tabs.Root defaultValue="pnpm" uiSize="sm">
          <Tabs.List aria-label="Package manager" activateOnFocus>
            <Tabs.Tab value="pnpm">pnpm</Tabs.Tab>
            <Tabs.Tab value="npm">npm</Tabs.Tab>
            <Tabs.Tab value="yarn">Yarn</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="pnpm">
            <CodeBlock
              code="pnpm create vite my-app --template react-ts"
              language="shellscript"
            />
          </Tabs.Panel>
          <Tabs.Panel value="npm">
            <CodeBlock
              code="npm create vite@latest my-app -- --template react-ts"
              language="shellscript"
            />
          </Tabs.Panel>
          <Tabs.Panel value="yarn">
            <CodeBlock
              code="yarn create vite my-app --template react-ts"
              language="shellscript"
            />
          </Tabs.Panel>
        </Tabs.Root>
      </Steps.Item>
      {count > 1 ? (
        <Steps.Item>
          <h3 className="text-tinyrack-lg font-semibold">Install and configure</h3>
          <p>Install the UI package, then import the shared and component styles.</p>
          <CodeBlock
            code={
              "pnpm add @tinyrack/ui react react-dom\n\nimport '@tinyrack/ui/core.css';\nimport '@tinyrack/ui/components/steps.css';"
            }
            language="tsx"
          />
        </Steps.Item>
      ) : null}
      {count > 2 ? (
        <Steps.Item>
          <h3 className="text-tinyrack-lg font-semibold">Write the guide</h3>
          <p>
            Use normal React children inside each item: headings, prose, links, and code
            all remain available.
          </p>
        </Steps.Item>
      ) : null}
    </Steps.Root>
  );
}
const meta = {
  args: { count: 3 },
  argTypes: { count: { control: 'number' } },
  parameters: { layout: 'centered' },
  render: StepsGuidePreview,
  title: 'Components/Steps',
} satisfies Meta<Args>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
