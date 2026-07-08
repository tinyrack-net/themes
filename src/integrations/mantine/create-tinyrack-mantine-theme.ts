import {
  createTheme,
  defaultVariantColorsResolver,
  type MantineThemeOverride,
  type VariantColorsResolver,
} from '@mantine/core';
import { tinyrackPalettes } from '../../theme/colors.js';
import {
  tinyrackAvatarContract,
  tinyrackIndicatorContract,
  tinyrackLoaderContract,
  tinyrackRangeContract,
  tinyrackRatingContract,
  tinyrackStepperContract,
  tinyrackTabsContract,
  tinyrackTimelineContract,
} from '../../theme/components.js';
import { tinyrackRadii } from '../../theme/radii.js';
import { tinyrackSemanticColors } from '../../theme/semantic.js';
import { tinyrackShadows } from '../../theme/shadows.js';
import { tinyrackSpacing } from '../../theme/spacing.js';
import { tinyrackTypography } from '../../theme/typography.js';

export type TinyrackMantineThemeOptions = {
  fontFamily?: string;
  headingFontFamily?: string;
  primaryColor?: 'tinyrack';
};

type ComponentVars = Record<string, Record<string, string>>;
type ComponentVarsProps = Record<string, unknown> & {
  color?: unknown;
  variant?: unknown;
};

const tinyrackMantineFilledColorVariable = 'var(--tinyrack-mantine-filled-color)';
const tinyrackPrimaryVariable = 'var(--tinyrack-primary)';

const brandScale = [
  tinyrackPalettes.brand[50],
  tinyrackPalettes.brand[100],
  tinyrackPalettes.brand[200],
  tinyrackPalettes.brand[300],
  tinyrackPalettes.brand[400],
  tinyrackPalettes.brand[500],
  tinyrackPalettes.brand[600],
  tinyrackPalettes.brand[700],
  tinyrackPalettes.brand[800],
  tinyrackPalettes.brand[900],
] as const;

const darkScale = [
  tinyrackPalettes.neutral[50],
  tinyrackPalettes.neutral[100],
  tinyrackPalettes.neutral[300],
  tinyrackPalettes.neutral[500],
  tinyrackPalettes.neutral[600],
  tinyrackPalettes.neutral[700],
  tinyrackPalettes.neutral[800],
  tinyrackPalettes.neutral[900],
  tinyrackPalettes.neutral[900],
  tinyrackPalettes.neutral[950],
] as const;

function createSemanticScale(
  lightValue: string,
  darkValue: string,
): [string, string, string, string, string, string, string, string, string, string] {
  return [
    lightValue,
    lightValue,
    lightValue,
    lightValue,
    lightValue,
    darkValue,
    darkValue,
    darkValue,
    darkValue,
    darkValue,
  ];
}

const successScale = createSemanticScale(
  tinyrackSemanticColors.dark.success,
  tinyrackSemanticColors.light.success,
);
const warningScale = createSemanticScale(
  tinyrackSemanticColors.dark.warning,
  tinyrackSemanticColors.light.warning,
);
const errorScale = createSemanticScale(
  tinyrackSemanticColors.dark.error,
  tinyrackSemanticColors.light.error,
);
const infoScale = createSemanticScale(
  tinyrackSemanticColors.dark.info,
  tinyrackSemanticColors.light.info,
);

const tinyrackMantineFontSizes = {
  xs: tinyrackTypography.fontSize.xs,
  sm: tinyrackTypography.fontSize.sm,
  md: tinyrackTypography.fontSize.md,
  lg: tinyrackTypography.fontSize.lg,
  xl: tinyrackTypography.fontSize.xl,
  '2xs': tinyrackTypography.fontSize['2xs'],
  '2xl': tinyrackTypography.fontSize['2xl'],
  '3xl': tinyrackTypography.fontSize['3xl'],
  '4xl': tinyrackTypography.fontSize['4xl'],
  '5xl': tinyrackTypography.fontSize['5xl'],
} as const;

const tinyrackMantineLineHeights = {
  xs: tinyrackTypography.lineHeight.xs,
  sm: tinyrackTypography.lineHeight.sm,
  md: tinyrackTypography.lineHeight.md,
  lg: tinyrackTypography.lineHeight.lg,
  xl: tinyrackTypography.lineHeight.xl,
} as const;

function createTokenVariableFallback(name: string, fallback: string) {
  return `var(${name}, ${fallback})`;
}

const tinyrackVariantColorResolver: VariantColorsResolver = (input) => {
  const colors = defaultVariantColorsResolver(input);

  if (input.color === 'tinyrack' && input.variant === 'filled') {
    return {
      ...colors,
      background: tinyrackPrimaryVariable,
      hover: 'var(--tinyrack-accent)',
      color: tinyrackMantineFilledColorVariable,
    };
  }

  if (input.color === 'tinyrack' && input.variant === 'white') {
    return {
      ...colors,
      color: tinyrackPalettes.neutral[950],
    };
  }

  return colors;
};

function usesTinyrackColor(props: ComponentVarsProps) {
  const color = props.color;

  return color === undefined || color === 'tinyrack';
}

function usesTinyrackFilledVariant(props: ComponentVarsProps) {
  const variant = props.variant;

  return usesTinyrackColor(props) && (variant === undefined || variant === 'filled');
}

function createRootVars(vars: Record<string, string>): ComponentVars {
  return { root: vars };
}

function createTinyrackFilledTextVars(cssVariable: string) {
  return (_theme: unknown, props: ComponentVarsProps): ComponentVars =>
    usesTinyrackFilledVariant(props)
      ? createRootVars({ [cssVariable]: tinyrackMantineFilledColorVariable })
      : {};
}

const tinyrackMantineComponentOverrides = {
  Avatar: {
    defaultProps: {
      color: 'tinyrack',
      variant: 'filled',
    },
    vars: (_theme: unknown, props: ComponentVarsProps): ComponentVars =>
      usesTinyrackColor(props)
        ? createRootVars({
            '--avatar-bg': createTokenVariableFallback(
              '--tinyrack-avatar-background',
              tinyrackAvatarContract.background,
            ),
            '--avatar-bd': `${createTokenVariableFallback(
              '--tinyrack-avatar-border-width',
              tinyrackAvatarContract.borderWidth,
            )} solid var(--tinyrack-border)`,
            '--avatar-color': createTokenVariableFallback(
              '--tinyrack-avatar-color',
              tinyrackAvatarContract.color,
            ),
          })
        : {},
  },
  Button: {
    defaultProps: {
      color: 'tinyrack',
    },
  },
  Badge: {
    defaultProps: {
      color: 'tinyrack',
    },
    vars: createTinyrackFilledTextVars('--badge-color'),
  },
  Chip: {
    defaultProps: {
      color: 'tinyrack',
    },
    vars: createTinyrackFilledTextVars('--chip-color'),
  },
  Checkbox: {
    defaultProps: {
      color: 'tinyrack',
    },
    vars: (_theme: unknown, props: ComponentVarsProps): ComponentVars =>
      usesTinyrackColor(props)
        ? createRootVars({
            '--checkbox-color': tinyrackPrimaryVariable,
            '--checkbox-icon-color': tinyrackMantineFilledColorVariable,
          })
        : {},
  },
  Drawer: {
    defaultProps: {
      radius: 'md',
    },
  },
  Indicator: {
    defaultProps: {
      color: 'tinyrack',
    },
    vars: (_theme: unknown, props: ComponentVarsProps): ComponentVars =>
      usesTinyrackColor(props)
        ? createRootVars({
            '--indicator-color': createTokenVariableFallback(
              '--tinyrack-indicator-background',
              tinyrackIndicatorContract.background,
            ),
            '--indicator-text-color': createTokenVariableFallback(
              '--tinyrack-indicator-color',
              tinyrackIndicatorContract.color,
            ),
          })
        : {},
  },
  Loader: {
    defaultProps: {
      color: 'tinyrack',
    },
    vars: (_theme: unknown, props: ComponentVarsProps): ComponentVars =>
      usesTinyrackColor(props)
        ? createRootVars({
            '--loader-color': createTokenVariableFallback(
              '--tinyrack-loader-color',
              tinyrackLoaderContract.color,
            ),
          })
        : {},
  },
  Menu: {
    defaultProps: {
      radius: 'md',
      shadow: 'none',
    },
  },
  Modal: {
    defaultProps: {
      radius: 'md',
    },
  },
  Pagination: {
    defaultProps: {
      color: 'tinyrack',
    },
    vars: (_theme: unknown, props: ComponentVarsProps): ComponentVars =>
      usesTinyrackColor(props)
        ? createRootVars({
            '--pagination-active-bg': tinyrackPrimaryVariable,
            '--pagination-active-color': tinyrackMantineFilledColorVariable,
          })
        : {},
  },
  PaginationRoot: {
    defaultProps: {
      color: 'tinyrack',
    },
  },
  Radio: {
    defaultProps: {
      color: 'tinyrack',
    },
    vars: (_theme: unknown, props: ComponentVarsProps): ComponentVars =>
      usesTinyrackColor(props)
        ? createRootVars({
            '--radio-color': tinyrackPrimaryVariable,
            '--radio-icon-color': tinyrackMantineFilledColorVariable,
          })
        : {},
  },
  Rating: {
    defaultProps: {
      color: 'tinyrack',
    },
    vars: (_theme: unknown, props: ComponentVarsProps): ComponentVars =>
      usesTinyrackColor(props)
        ? createRootVars({
            '--rating-color': createTokenVariableFallback(
              '--tinyrack-rating-color',
              tinyrackRatingContract.color,
            ),
          })
        : {},
  },
  RangeSlider: {
    defaultProps: {
      color: 'tinyrack',
      radius: 'sm',
      size: 'md',
    },
    vars: (_theme: unknown, props: ComponentVarsProps): ComponentVars =>
      usesTinyrackColor(props)
        ? createRootVars({
            '--slider-color': createTokenVariableFallback(
              '--tinyrack-range-color',
              tinyrackRangeContract.color,
            ),
          })
        : {},
  },
  SegmentedControl: {
    defaultProps: {
      color: 'tinyrack',
    },
    vars: (_theme: unknown, props: ComponentVarsProps): ComponentVars =>
      usesTinyrackColor(props)
        ? createRootVars({
            '--sc-color': tinyrackPrimaryVariable,
            '--sc-label-color': tinyrackMantineFilledColorVariable,
          })
        : {},
  },
  Slider: {
    defaultProps: {
      color: 'tinyrack',
      radius: 'sm',
      size: 'md',
    },
    vars: (_theme: unknown, props: ComponentVarsProps): ComponentVars =>
      usesTinyrackColor(props)
        ? createRootVars({
            '--slider-color': createTokenVariableFallback(
              '--tinyrack-range-color',
              tinyrackRangeContract.color,
            ),
          })
        : {},
  },
  Stepper: {
    defaultProps: {
      color: 'tinyrack',
    },
    vars: (_theme: unknown, props: ComponentVarsProps): ComponentVars =>
      usesTinyrackColor(props)
        ? createRootVars({
            '--stepper-icon-color': createTokenVariableFallback(
              '--tinyrack-stepper-active-text-color',
              tinyrackStepperContract.activeTextColor,
            ),
          })
        : {},
  },
  Table: {
    defaultProps: {
      horizontalSpacing: 'md',
      verticalSpacing: 'md',
    },
  },
  Tooltip: {
    defaultProps: {
      color: 'tinyrack',
      radius: 'sm',
    },
  },
  Switch: {
    defaultProps: {
      color: 'tinyrack',
    },
    vars: (_theme: unknown, props: ComponentVarsProps): ComponentVars =>
      usesTinyrackColor(props)
        ? createRootVars({
            '--switch-color': tinyrackPrimaryVariable,
          })
        : {},
  },
  Tabs: {
    defaultProps: {
      color: 'tinyrack',
    },
    vars: (_theme: unknown, props: ComponentVarsProps): ComponentVars =>
      usesTinyrackColor(props)
        ? createRootVars({
            '--tabs-text-color': createTokenVariableFallback(
              '--tinyrack-tabs-active-color',
              tinyrackTabsContract.activeColor,
            ),
          })
        : {},
  },
  ThemeIcon: {
    defaultProps: {
      color: 'tinyrack',
    },
    vars: createTinyrackFilledTextVars('--ti-color'),
  },
  Timeline: {
    defaultProps: {
      color: 'tinyrack',
    },
    vars: (_theme: unknown, props: ComponentVarsProps): ComponentVars =>
      usesTinyrackColor(props)
        ? createRootVars({
            '--tl-icon-color': createTokenVariableFallback(
              '--tinyrack-timeline-active-text-color',
              tinyrackTimelineContract.activeTextColor,
            ),
          })
        : {},
  },
};

export function createTinyrackMantineTheme(
  options: TinyrackMantineThemeOptions = {},
): MantineThemeOverride {
  return createTheme({
    primaryColor: options.primaryColor ?? 'tinyrack',
    colors: {
      dark: [...darkScale],
      error: [...errorScale],
      info: [...infoScale],
      success: [...successScale],
      tinyrack: [...brandScale],
      warning: [...warningScale],
    },
    variantColorResolver: tinyrackVariantColorResolver,
    fontFamily: options.fontFamily ?? tinyrackTypography.fontFamily.body,
    fontFamilyMonospace: tinyrackTypography.fontFamily.mono,
    fontSizes: tinyrackMantineFontSizes,
    lineHeights: tinyrackMantineLineHeights,
    headings: {
      fontFamily: options.headingFontFamily ?? tinyrackTypography.fontFamily.heading,
      fontWeight: '700',
      textWrap: 'balance',
      sizes: {
        h1: {
          fontSize: tinyrackTypography.fontSize['4xl'],
          lineHeight: tinyrackTypography.lineHeight.sm,
        },
        h2: {
          fontSize: tinyrackTypography.fontSize['3xl'],
          lineHeight: tinyrackTypography.lineHeight.sm,
        },
        h3: {
          fontSize: tinyrackTypography.fontSize['2xl'],
          lineHeight: tinyrackTypography.lineHeight.sm,
        },
        h4: {
          fontSize: tinyrackTypography.fontSize.xl,
          lineHeight: tinyrackTypography.lineHeight.md,
        },
        h5: {
          fontSize: tinyrackTypography.fontSize.lg,
          lineHeight: tinyrackTypography.lineHeight.md,
        },
        h6: {
          fontSize: tinyrackTypography.fontSize.md,
          lineHeight: tinyrackTypography.lineHeight.md,
        },
      },
    },
    defaultRadius: 'sm',
    radius: {
      xs: tinyrackRadii.xs,
      sm: tinyrackRadii.sm,
      md: tinyrackRadii.md,
      lg: tinyrackRadii.lg,
      xl: tinyrackRadii.xl,
    },
    spacing: {
      xs: tinyrackSpacing.xs,
      sm: tinyrackSpacing.sm,
      md: tinyrackSpacing.md,
      lg: tinyrackSpacing.lg,
      xl: tinyrackSpacing.xl,
      '2xl': tinyrackSpacing['2xl'],
    },
    shadows: {
      xs: tinyrackShadows.sm,
      sm: tinyrackShadows.sm,
      md: tinyrackShadows.md,
      lg: tinyrackShadows.lg,
      xl: tinyrackShadows.lg,
    },
    components: tinyrackMantineComponentOverrides,
    autoContrast: true,
    focusRing: 'auto',
    cursorType: 'pointer',
  });
}

export const tinyrackMantineTheme = createTinyrackMantineTheme();
