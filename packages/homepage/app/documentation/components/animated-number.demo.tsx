import {
  TRAnimatedNumber,
  type TRAnimatedNumberAnimation,
  type TRAnimatedNumberRollDirection,
} from '@tinyrack/ui/components/animated-number';
import { TRButton } from '@tinyrack/ui/components/button';
import { useState } from 'react';
import type {
  DemoMeta as Meta,
  DemoVariant as StoryObj,
} from '../../playground/demo.js';
import { definePlayground } from '../../playground/demo.js';
import { useDemoLocale } from '../shared/demo-locale.js';

type AnimatedNumberFormatPreset = 'decimal' | 'currency' | 'percent' | 'unit';

type AnimatedNumberStoryArgs = {
  animation: TRAnimatedNumberAnimation;
  duration: number;
  formatPreset: AnimatedNumberFormatPreset;
  locale: 'en-US' | 'ja-JP' | 'ko-KR';
  rollDirection: TRAnimatedNumberRollDirection;
  value: number;
};

const animatedNumberCopy = {
  en: { decrease: 'Decrease', increase: 'Increase', update: 'Update values' },
  ko: { decrease: '감소', increase: '증가', update: '값 바꾸기' },
  ja: { decrease: '減らす', increase: '増やす', update: '値を変更' },
} as const;

const localeByDemoLocale = {
  en: 'en-US',
  ko: 'ko-KR',
  ja: 'ja-JP',
} as const;

function formatForPreset(
  preset: AnimatedNumberFormatPreset,
): Intl.NumberFormatOptions | undefined {
  if (preset === 'currency') {
    return { currency: 'USD', style: 'currency' };
  }
  if (preset === 'percent') {
    return { maximumFractionDigits: 1, style: 'percent' };
  }
  if (preset === 'unit') {
    return { style: 'unit', unit: 'gigabyte', unitDisplay: 'short' };
  }
  return undefined;
}

function AnimatedNumberPreview({
  animation,
  duration,
  formatPreset,
  locale,
  rollDirection,
  value,
}: AnimatedNumberStoryArgs) {
  const format = formatForPreset(formatPreset);
  return (
    <TRAnimatedNumber
      animation={animation}
      className="text-5xl font-semibold"
      duration={duration}
      locale={locale}
      rollDirection={rollDirection}
      value={value}
      {...(format === undefined ? {} : { format })}
    />
  );
}

export function AnimatedNumberCounterPreview() {
  const locale = useDemoLocale();
  const copy = animatedNumberCopy[locale];
  const [value, setValue] = useState(1248);
  return (
    <div className="grid justify-items-center gap-4" data-docs-example-item="">
      <TRAnimatedNumber
        aria-live="polite"
        className="text-5xl font-semibold"
        locale={localeByDemoLocale[locale]}
        value={value}
      />
      <div className="flex gap-2">
        <TRButton
          appearance="outline"
          onClick={() => setValue((current) => current - 125)}
        >
          {copy.decrease}
        </TRButton>
        <TRButton onClick={() => setValue((current) => current + 125)}>
          {copy.increase}
        </TRButton>
      </div>
    </div>
  );
}

export function AnimatedNumberModesPreview() {
  const locale = useDemoLocale();
  const copy = animatedNumberCopy[locale];
  const [value, setValue] = useState(42);
  return (
    <div className="grid justify-items-center gap-4">
      <div
        className="flex flex-wrap items-end justify-center gap-8"
        data-docs-example-item-count="2"
      >
        {(['roll', 'count'] as const).map((animation) => (
          <span
            className="grid justify-items-center gap-1"
            data-docs-example-item=""
            key={animation}
          >
            <TRAnimatedNumber
              animation={animation}
              className="text-4xl font-semibold"
              value={value}
            />
            <span className="text-sm text-[var(--tinyrack-text-muted)]">
              {animation}
            </span>
          </span>
        ))}
      </div>
      <TRButton onClick={() => setValue((current) => (current === 42 ? 867 : 42))}>
        {copy.update}
      </TRButton>
    </div>
  );
}

export function AnimatedNumberFormatsPreview() {
  const [value, setValue] = useState(1234.5);
  const locale = useDemoLocale();
  const copy = animatedNumberCopy[locale];
  const resolvedLocale = localeByDemoLocale[locale];
  const formats = [
    { format: { currency: 'USD', style: 'currency' } as const, label: 'currency' },
    {
      format: { maximumFractionDigits: 1, style: 'percent' } as const,
      label: 'percent',
      scale: 0.0001,
    },
    {
      format: { style: 'unit', unit: 'gigabyte', unitDisplay: 'short' } as const,
      label: 'unit',
    },
  ];
  return (
    <div className="grid justify-items-start gap-4">
      <div className="grid gap-3" data-docs-example-item-count="3">
        {formats.map(({ format, label, scale = 1 }) => (
          <span className="grid gap-1" data-docs-example-item="" key={label}>
            <span className="text-sm text-[var(--tinyrack-text-muted)]">{label}</span>
            <TRAnimatedNumber
              className="text-2xl font-semibold"
              format={format}
              locale={resolvedLocale}
              value={value * scale}
            />
          </span>
        ))}
      </div>
      <TRButton
        onClick={() => setValue((current) => (current === 1234.5 ? 9876.5 : 1234.5))}
      >
        {copy.update}
      </TRButton>
    </div>
  );
}

export function AnimatedNumberDirectionsPreview() {
  const locale = useDemoLocale();
  const copy = animatedNumberCopy[locale];
  const [value, setValue] = useState(10);
  return (
    <div className="grid justify-items-center gap-4">
      <div className="flex gap-8" data-docs-example-item-count="2">
        {(['up', 'down'] as const).map((direction) => (
          <span
            className="grid justify-items-center gap-1"
            data-docs-example-item=""
            key={direction}
          >
            <TRAnimatedNumber
              className="text-4xl font-semibold"
              rollDirection={direction}
              value={value}
            />
            <span className="text-sm text-[var(--tinyrack-text-muted)]">
              {direction}
            </span>
          </span>
        ))}
      </div>
      <TRButton onClick={() => setValue((current) => (current === 10 ? 90 : 10))}>
        {copy.update}
      </TRButton>
    </div>
  );
}

export const animatedNumberBasicSource = String.raw`import '@tinyrack/ui/components/animated-number.css';
import { TRAnimatedNumber } from '@tinyrack/ui/components/animated-number';

<TRAnimatedNumber value={1248} />`;

export const animatedNumberModesSource = String.raw`import '@tinyrack/ui/components/animated-number.css';
import { TRAnimatedNumber } from '@tinyrack/ui/components/animated-number';

export function NumberModes({ value }: { value: number }) {
  return <div>
    <TRAnimatedNumber animation="roll" value={value} />
    <TRAnimatedNumber animation="count" value={value} />
  </div>;
}`;

export const animatedNumberFormatsSource = String.raw`import '@tinyrack/ui/components/animated-number.css';
import { TRAnimatedNumber } from '@tinyrack/ui/components/animated-number';

export function FormattedNumbers() {
  return <div>
    <TRAnimatedNumber
      format={{ currency: 'USD', style: 'currency' }}
      locale="en-US"
      value={1234.5}
    />
    <TRAnimatedNumber
      format={{ maximumFractionDigits: 1, style: 'percent' }}
      locale="en-US"
      value={0.42}
    />
    <TRAnimatedNumber
      format={{ style: 'unit', unit: 'gigabyte', unitDisplay: 'short' }}
      locale="en-US"
      value={128}
    />
  </div>;
}`;

export const animatedNumberDirectionsSource = String.raw`import '@tinyrack/ui/components/animated-number.css';
import { TRAnimatedNumber } from '@tinyrack/ui/components/animated-number';

export function ForcedDirections({ value }: { value: number }) {
  return <div>
    <TRAnimatedNumber rollDirection="up" value={value} />
    <TRAnimatedNumber rollDirection="down" value={value} />
  </div>;
}`;

const meta: Meta<AnimatedNumberStoryArgs> = {
  title: 'Components/Animated Number',
  component: TRAnimatedNumber,
  excludeStories: /.*(?:Preview|Source)$/,
  parameters: { layout: 'centered' },
  args: {
    animation: 'roll',
    duration: 600,
    formatPreset: 'decimal',
    locale: 'en-US',
    rollDirection: 'auto',
    value: 1248,
  },
  argTypes: {
    animation: { control: 'select', options: ['roll', 'count'] },
    duration: { control: { type: 'range', min: 0, max: 1500, step: 50 } },
    formatPreset: {
      control: 'select',
      options: ['decimal', 'currency', 'percent', 'unit'],
    },
    locale: { control: 'select', options: ['en-US', 'ko-KR', 'ja-JP'] },
    rollDirection: { control: 'select', options: ['auto', 'up', 'down'] },
    value: { control: { type: 'range', min: -10_000, max: 10_000, step: 1 } },
  },
  localizedArgs: {
    ja: { locale: 'ja-JP' },
    ko: { locale: 'ko-KR' },
  },
  render: AnimatedNumberPreview,
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const playground = definePlayground(meta);
