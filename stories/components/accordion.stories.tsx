import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from '../../src/components/accordion/index.js';

type AccordionStoryArgs = {
  disabled: boolean;
  expanded: boolean;
  multiple: boolean;
};

const meta = {
  title: 'Components/Accordion',
  parameters: { layout: 'centered' },
  args: { disabled: false, expanded: true, multiple: false },
  argTypes: {
    disabled: { control: 'boolean' },
    expanded: { control: 'boolean' },
    multiple: { control: 'boolean' },
  },
  render: ({ disabled, expanded, multiple }) => (
    <Accordion.Root
      className="w-96 max-w-full"
      defaultValue={expanded ? (multiple ? ['overview', 'install'] : ['overview']) : []}
      key={`${expanded}-${multiple}`}
      multiple={multiple}
    >
      <Accordion.Item value="overview">
        <Accordion.Header>
          <Accordion.Trigger>What is Tinyrack?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>A React-only UI system.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item disabled={disabled} value="install">
        <Accordion.Header>
          <Accordion.Trigger>How do I install it?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>Install the package and component CSS.</Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  ),
} satisfies Meta<AccordionStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
