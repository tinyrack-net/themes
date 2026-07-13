import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollArea } from '../../src/components/scroll-area/index.js';

type StoryArgs = {
  content: string;
  orientation: 'horizontal' | 'vertical';
};

export function ScrollAreaPreview({ content, orientation }: StoryArgs) {
  return (
    <ScrollArea.Root className="h-40 w-80">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          {Array.from({ length: 12 }, (_, index) => `${content} ${index + 1}`).map(
            (entry) => (
              <p key={entry}>{entry}</p>
            ),
          )}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation={orientation}>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}

const meta = {
  title: 'Components/Scroll Area',
  excludeStories: /.*Preview$/,
  parameters: { layout: 'centered' },
  args: {
    content: 'Rack event log',
    orientation: 'vertical',
  },
  argTypes: {
    content: { control: 'text' },
    orientation: { options: ['horizontal', 'vertical'], control: 'radio' },
  },
  render: (args) => <ScrollAreaPreview {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
