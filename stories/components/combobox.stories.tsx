import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxList,
  type ComboboxMode,
  ComboboxOption,
} from '../../src/components/combobox/react.js';

function ComboboxStory({
  disabled,
  invalid,
  mode,
}: {
  disabled: boolean;
  invalid: boolean;
  mode: ComboboxMode;
}) {
  return (
    <Combobox disabled={disabled} invalid={invalid} mode={mode} name="language">
      <ComboboxInput aria-label="Language" placeholder="Search languages" />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxOption value="en">English</ComboboxOption>
          <ComboboxOption value="ko">한국어</ComboboxOption>
          <ComboboxOption value="ja">日本語</ComboboxOption>
        </ComboboxList>
        <ComboboxEmpty>No language found</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  );
}

const meta = {
  title: 'Components/Combobox',
  component: ComboboxStory,
  args: { disabled: false, invalid: false, mode: 'select' },
  argTypes: {
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    mode: { control: 'select', options: ['select', 'freeform'] },
  },
} satisfies Meta<typeof ComboboxStory>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
