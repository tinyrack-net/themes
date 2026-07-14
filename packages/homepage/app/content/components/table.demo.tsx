import { Table, type TableDensity } from '@tinyrack/ui/components/table';
import type {
  DemoMeta as Meta,
  DemoVariant as StoryObj,
} from '../../playground/demo.js';
import { definePlayground } from '../../playground/demo.js';

type TableStoryArgs = { caption: string; density: TableDensity; striped: boolean };

const rackRows = [
  ['Rack A', 'Seoul · Zone 1', 12, '42%', 'Healthy'],
  ['Rack B', 'Seoul · Zone 2', 10, '67%', 'Healthy'],
  ['Rack C', 'Busan · Zone 1', 8, '81%', 'Degraded'],
  ['Rack D', 'Daejeon · Zone 1', 6, '28%', 'Healthy'],
  ['Rack E', 'Seoul · Zone 3', 12, '—', 'Maintenance'],
] as const;

export function TableOverflowAndEmptyStates() {
  return (
    <div className="grid gap-6">
      <div className="grid min-w-0 gap-2">
        <p className="m-0 text-tinyrack-sm text-tinyrack-muted">
          Scroll horizontally inside the named region to inspect every column.
        </p>
        <Table.Root
          className="min-w-3xl"
          containerProps={{ 'aria-label': 'Long deployment records', tabIndex: 0 }}
        >
          <Table.Caption>Long deployment records</Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.Head scope="col">Service</Table.Head>
              <Table.Head scope="col">Artifact</Table.Head>
              <Table.Head scope="col">Owner</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Head scope="row">Gateway</Table.Head>
              <Table.Cell>
                registry.example.internal/platform/gateway:2026.07.14-release-candidate
              </Table.Cell>
              <Table.Cell>Platform reliability</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </div>
      <Table.Root>
        <Table.Caption>Queued deployments</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head scope="col">Service</Table.Head>
            <Table.Head scope="col">Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan={2}>No deployments are queued.</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  );
}

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
    <Table.Root
      className="min-w-3xl"
      containerProps={{
        'aria-label': `${caption} scroll region`,
        tabIndex: 0,
      }}
      {...rootProps}
    >
      <Table.Caption>{caption}</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head scope="col">Rack</Table.Head>
          <Table.Head scope="col">Location</Table.Head>
          <Table.Head align="right" scope="col">
            Nodes
          </Table.Head>
          <Table.Head align="right" scope="col">
            Load
          </Table.Head>
          <Table.Head scope="col">Status</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rackRows.map(([rack, location, nodes, load, status]) => (
          <Table.Row key={rack}>
            <Table.Head scope="row">{rack}</Table.Head>
            <Table.Cell>{location}</Table.Cell>
            <Table.Cell align="right">{nodes}</Table.Cell>
            <Table.Cell align="right">{load}</Table.Cell>
            <Table.Cell>{status}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  ),
} satisfies Meta<TableStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const playground = definePlayground(meta);
