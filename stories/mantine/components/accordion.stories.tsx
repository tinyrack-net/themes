import * as Mantine from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  variant?: 'default' | 'contained' | 'filled' | 'separated';
  radius?: (typeof Controls.mantineRadiusOptions)[number];
  chevronPosition?: 'left' | 'right';
};

function AccordionStory(controlValues: ComponentStoryProps) {
  return (
    <Mantine.Accordion
      chevronPosition={controlValues.chevronPosition ?? 'right'}
      className="w-96"
      defaultValue="backup"
      radius={controlValues.radius ?? 'md'}
      variant={controlValues.variant ?? 'default'}
    >
      <Mantine.Accordion.Item value="backup">
        <Mantine.Accordion.Control>Backup</Mantine.Accordion.Control>
        <Mantine.Accordion.Panel>
          Nightly backup finished successfully.
        </Mantine.Accordion.Panel>
      </Mantine.Accordion.Item>
      <Mantine.Accordion.Item value="network">
        <Mantine.Accordion.Control>Network</Mantine.Accordion.Control>
        <Mantine.Accordion.Panel>Router is online.</Mantine.Accordion.Panel>
      </Mantine.Accordion.Item>
    </Mantine.Accordion>
  );
}

AccordionStory.displayName = 'AccordionStory';

const meta = {
  title: 'Mantine/Accordion',
  component: AccordionStory,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    radius: 'md',
    chevronPosition: 'right',
  },
  argTypes: {
    variant: Controls.selectControl(
      ['default', 'contained', 'filled', 'separated'],
      'Accordion visual variant.',
    ),
    radius: Controls.selectControl(
      Controls.mantineRadiusOptions,
      'Mantine radius token.',
    ),
    chevronPosition: Controls.selectControl(['left', 'right'], 'Chevron position.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '@mantine/core Accordion themed preview',
      },
    },
  },
} satisfies Meta<typeof AccordionStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
