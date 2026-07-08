import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  size?: (typeof Controls.daisySizeOptions)[number];
  disabled?: boolean;
};

function FieldsetStory(controlValues: ComponentStoryProps) {
  const size = controlValues.size ?? 'md';

  return (
    <fieldset
      className="fieldset w-80 rounded-box border border-base-300 p-4"
      disabled={controlValues.disabled ?? false}
    >
      <legend className="fieldset-legend">Node access</legend>
      <label className="label" htmlFor="daisy-fieldset-hostname">
        Hostname
      </label>
      <input
        className={Controls.cx('input w-full', `input-${size}`)}
        defaultValue="nas-01"
        id="daisy-fieldset-hostname"
      />
    </fieldset>
  );
}

FieldsetStory.displayName = 'FieldsetStory';

const meta = {
  title: 'daisyUI/Fieldset',
  component: FieldsetStory,
  tags: ['autodocs'],
  args: {
    size: 'md',
    disabled: false,
  },
  argTypes: {
    size: Controls.selectControl(Controls.daisySizeOptions, 'Size modifier class.'),
    disabled: Controls.booleanControl('Disabled state.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI fieldset themed preview',
      },
    },
  },
} satisfies Meta<typeof FieldsetStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
