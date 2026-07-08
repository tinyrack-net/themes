import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.mantineSizeOptions)[number];
  dropdownOpened?: boolean;
  radius?: (typeof Controls.mantineRadiusOptions)[number];
};

function ComboboxStory(controlValues: ComponentStoryProps) {
  const store = Mantine.useCombobox();

  return (
    <Mantine.Combobox store={store} withinPortal={false}>
      <Mantine.Combobox.Target>
        <Mantine.Input
          component="button"
          pointer
          radius={controlValues.radius ?? 'md'}
          size={controlValues.size ?? 'sm'}
          type="button"
        >
          nas-01
        </Mantine.Input>
      </Mantine.Combobox.Target>
      {(controlValues.dropdownOpened ?? true) ? (
        <Mantine.Combobox.Dropdown>
          <Mantine.Combobox.Options>
            <Mantine.Combobox.Option value="nas-01">nas-01</Mantine.Combobox.Option>
            <Mantine.Combobox.Option value="router">router</Mantine.Combobox.Option>
          </Mantine.Combobox.Options>
        </Mantine.Combobox.Dropdown>
      ) : null}
    </Mantine.Combobox>
  );
}

ComboboxStory.displayName = 'ComboboxStory';

const meta = {
  title: 'Mantine/Combobox',
  component: ComboboxStory,
  tags: ['autodocs'],
  args: {
    size: 'sm',
    radius: 'md',
    dropdownOpened: true,
  },
  argTypes: {
    size: Controls.selectControl(Controls.mantineSizeOptions, 'Mantine size token.'),
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    dropdownOpened: Controls.booleanControl('Shows the Combobox dropdown.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Combobox themed preview',
      },
    },
  },
} satisfies Meta<typeof ComboboxStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
