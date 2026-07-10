import { tinyrackBorders } from '../src/core/tokens/borders.ts';
import { tinyrackControlMetrics } from '../src/core/tokens/control-metrics.ts';
import { tinyrackMotion } from '../src/core/tokens/motion.ts';
import { tinyrackOpacity } from '../src/core/tokens/opacity.ts';
import { tinyrackRadii } from '../src/core/tokens/radii.ts';
import { tinyrackSemanticColors } from '../src/core/tokens/semantic.ts';
import { tinyrackShadows } from '../src/core/tokens/shadows.ts';
import { tinyrackSpacing } from '../src/core/tokens/spacing.ts';
import { tinyrackTypography } from '../src/core/tokens/typography.ts';

function camelToKebab(value: string) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function declarations(values: Record<string, string | number>, prefix: string) {
  return Object.entries(values)
    .map(([name, value]) => `  --${prefix}-${camelToKebab(name)}: ${value};`)
    .join('\n');
}

function tailwindBridge() {
  const lines = [
    ...Object.keys(tinyrackTypography.fontFamily).map(
      (name) => `  --font-tinyrack-${name}: var(--tinyrack-font-${name});`,
    ),
    ...Object.keys(tinyrackTypography.fontSize).flatMap((name) => [
      `  --text-tinyrack-${name}: var(--tinyrack-text-${name});`,
      `  --text-tinyrack-${name}--line-height: var(--tinyrack-leading-${
        ['2xs', 'xs', 'xl', '2xl', '3xl', '4xl', '5xl'].includes(name) ? 'sm' : 'md'
      });`,
    ]),
    ...Object.keys(tinyrackTypography.lineHeight).map(
      (name) => `  --leading-tinyrack-${name}: var(--tinyrack-leading-${name});`,
    ),
    ...Object.keys(tinyrackTypography.letterSpacing).map(
      (name) => `  --tracking-tinyrack-${name}: var(--tinyrack-tracking-${name});`,
    ),
    ...Object.keys(tinyrackTypography.fontWeight).map(
      (name) => `  --font-weight-tinyrack-${name}: var(--tinyrack-weight-${name});`,
    ),
    ...Object.keys(tinyrackSpacing).map(
      (name) => `  --spacing-tinyrack-${name}: var(--tinyrack-space-${name});`,
    ),
    ...Object.keys(tinyrackRadii).map(
      (name) => `  --radius-tinyrack-${name}: var(--tinyrack-radius-${name});`,
    ),
    ...Object.keys(tinyrackShadows).map(
      (name) => `  --shadow-tinyrack-${name}: var(--tinyrack-shadow-${name});`,
    ),
    ...Object.keys(tinyrackSemanticColors.light).map(
      (name) =>
        `  --color-tinyrack-${camelToKebab(name)}: var(--tinyrack-${camelToKebab(name)});`,
    ),
  ];

  return `@theme static {\n${lines.join('\n')}\n}`;
}

function rootVariables() {
  const controlLines = Object.entries(tinyrackControlMetrics).flatMap(
    ([size, metrics]) => [
      `  --tinyrack-control-height-${size}: ${metrics.height};`,
      `  --tinyrack-control-padding-inline-${size}: ${metrics.paddingInline};`,
      `  --tinyrack-control-gap-${size}: ${metrics.gap};`,
      `  --tinyrack-control-font-size-${size}: var(--tinyrack-text-${metrics.fontSize});`,
      `  --tinyrack-control-line-height-${size}: ${metrics.lineHeight};`,
    ],
  );

  return `:root {
${declarations(tinyrackTypography.fontStack, 'tinyrack-font')}
${declarations(tinyrackTypography.fontSize, 'tinyrack-text')}
${declarations(tinyrackTypography.lineHeight, 'tinyrack-leading')}
${declarations(tinyrackTypography.letterSpacing, 'tinyrack-tracking')}
${declarations(tinyrackTypography.fontWeight, 'tinyrack-weight')}
${declarations(tinyrackSpacing, 'tinyrack-space')}
${declarations(tinyrackRadii, 'tinyrack-radius')}
${declarations(tinyrackBorders.width, 'tinyrack-border-width')}
  --tinyrack-focus-width: ${tinyrackBorders.focus.width};
  --tinyrack-focus-offset: ${tinyrackBorders.focus.offset};
${declarations(tinyrackShadows, 'tinyrack-shadow')}
${declarations(tinyrackMotion.duration, 'tinyrack-duration')}
  --tinyrack-ease-standard: ${tinyrackMotion.easing.standard};
  --tinyrack-ease-out: ${tinyrackMotion.easing.easeOut};
  --tinyrack-ease-linear: ${tinyrackMotion.easing.linear};
${declarations(tinyrackOpacity, 'tinyrack-opacity')}
${controlLines.join('\n')}
}`;
}

function themeVariables(theme: keyof typeof tinyrackSemanticColors) {
  return `[data-theme="tinyrack-${theme}"] {\n${declarations(
    tinyrackSemanticColors[theme],
    'tinyrack',
  )}\n}`;
}

export function createTinyrackCoreCss() {
  return `/* Generated from src/core/tokens. Do not edit directly. */

${tailwindBridge()}

${rootVariables()}

${themeVariables('light')}

${themeVariables('dark')}
`;
}
