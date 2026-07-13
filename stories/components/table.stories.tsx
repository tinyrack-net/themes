import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, type TableDensity } from '../../src/components/table/index.js';

type TableStoryArgs = { caption: string; density: TableDensity; striped: boolean };

const meta = {
  title: 'Components/Table',
  parameters: { layout: 'centered' },
  args: { caption: 'Rack status', density: 'comfortable', striped: true },
  argTypes: {
    caption: { control: 'text' },
    density: {
      control: 'select',
      options: ['compact', 'comfortable', 'spacious'],
    },
    striped: { control: 'boolean' },
  },
  render: ({ caption, ...rootProps }) => (
    <Table.Root className="min-w-96" {...rootProps}>
      <Table.Caption>{caption}</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Status</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Rack A</Table.Cell>
          <Table.Cell>Healthy</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Rack B</Table.Cell>
          <Table.Cell>Maintenance</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  ),
} satisfies Meta<TableStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
