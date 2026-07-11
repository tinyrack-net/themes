import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Disclosure,
  DisclosureContent,
  DisclosureSummary,
} from '../../src/components/disclosure/react.js';

function DisclosureStory({ open }: { open: boolean }) {
  return (
    <Disclosure key={String(open)} open={open}>
      <DisclosureSummary>Advanced translator settings</DisclosureSummary>
      <DisclosureContent>
        Configure retry and request timeout behavior.
      </DisclosureContent>
    </Disclosure>
  );
}

const meta = {
  title: 'Components/Disclosure',
  component: DisclosureStory,
  args: { open: false },
  argTypes: { open: { control: 'boolean' } },
} satisfies Meta<typeof DisclosureStory>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
