import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  type ButtonAppearance,
  type ButtonSize,
  type ButtonVariant,
} from '../../src/components/button/index.js';

type ButtonStoryArgs = {
  appearance: ButtonAppearance;
  children: string;
  disabled: boolean;
  loading: boolean;
  size: ButtonSize;
  variant: ButtonVariant;
};

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  args: {
    appearance: 'solid',
    children: 'Deploy',
    disabled: false,
    loading: false,
    size: 'md',
    variant: 'primary',
  },
  argTypes: {
    appearance: { control: 'select', options: ['solid', 'outline', 'ghost'] },
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['secondary', 'primary', 'danger'] },
  },
  render: (args) => <Button {...args} loadingLabel="Deploying changes" />,
} satisfies Meta<ButtonStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
