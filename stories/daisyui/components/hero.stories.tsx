import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Controls from '../../story-control-options.js';

type ComponentStoryProps = {
  overlay?: boolean;
  tone?: (typeof Controls.daisyToneOptions)[number];
};

function HeroStory(controlValues: ComponentStoryProps) {
  const tone = controlValues.tone ?? 'primary';

  return (
    <section
      className={Controls.cx(
        'hero min-h-56 w-96 overflow-hidden rounded-box',
        `bg-${tone}`,
        `text-${tone}-content`,
      )}
    >
      {(controlValues.overlay ?? true) ? (
        <div className="hero-overlay bg-black/30" />
      ) : null}
      <div className="hero-content text-center">
        <div>
          <h1 className="text-2xl font-bold">Rack console</h1>
          <p>Cluster status is healthy.</p>
        </div>
      </div>
    </section>
  );
}

HeroStory.displayName = 'HeroStory';

const meta = {
  title: 'daisyUI/Hero',
  component: HeroStory,
  tags: ['autodocs'],
  args: {
    tone: 'primary',
    overlay: true,
  },
  argTypes: {
    tone: Controls.selectControl(Controls.daisyToneOptions, 'Color modifier class.'),
    overlay: Controls.booleanControl('Shows hero-overlay layer.'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'daisyUI hero themed preview',
      },
    },
  },
} satisfies Meta<typeof HeroStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
