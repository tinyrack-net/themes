export const mantineSizeOptions = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export const mantineInputSizeOptions = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export const mantineColorOptions = [
  'tinyrack',
  'blue',
  'gray',
  'green',
  'yellow',
  'red',
] as const;
export const mantineRadiusOptions = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export const mantineShadowOptions = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
export const mantineSpacingOptions = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export const mantineButtonVariantOptions = [
  'filled',
  'light',
  'outline',
  'subtle',
  'transparent',
  'white',
  'default',
  'gradient',
] as const;
export const mantineAlertVariantOptions = [
  'filled',
  'light',
  'outline',
  'default',
  'transparent',
  'white',
] as const;
export const mantineInputVariantOptions = ['default', 'filled', 'unstyled'] as const;
export const mantineTextVariantOptions = ['text', 'gradient'] as const;
export const mantineOrientationOptions = ['horizontal', 'vertical'] as const;

export const daisyToneOptions = [
  'primary',
  'secondary',
  'accent',
  'neutral',
  'info',
  'success',
  'warning',
  'error',
] as const;
export const daisyStateToneOptions = ['info', 'success', 'warning', 'error'] as const;
export const daisySizeOptions = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export const daisyButtonStyleOptions = [
  'default',
  'outline',
  'dash',
  'soft',
  'ghost',
  'link',
] as const;
export const daisyButtonShapeOptions = [
  'default',
  'square',
  'circle',
  'wide',
  'block',
] as const;
export const daisyFieldStyleOptions = ['default', 'ghost'] as const;
export const daisyAlertStyleOptions = ['default', 'soft', 'outline', 'dash'] as const;
export const daisyOrientationOptions = ['horizontal', 'vertical'] as const;
export const daisyInlinePlacementOptions = ['start', 'center', 'end'] as const;
export const daisyBlockPlacementOptions = ['top', 'middle', 'bottom'] as const;
export const daisyPlacementOptions = [
  'top',
  'bottom',
  'left',
  'right',
  'start',
  'center',
  'end',
] as const;
export const daisyLoadingStyleOptions = [
  'spinner',
  'dots',
  'ring',
  'ball',
  'bars',
  'infinity',
] as const;
export const daisyMaskShapeOptions = [
  'squircle',
  'decagon',
  'diamond',
  'heart',
  'hexagon',
  'hexagon-2',
  'circle',
  'pentagon',
  'star',
  'star-2',
  'triangle',
  'triangle-2',
  'triangle-3',
  'triangle-4',
] as const;
export const daisyMockupFrameOptions = ['code', 'window', 'browser', 'phone'] as const;
export const daisyTabStyleOptions = ['border', 'lift', 'box'] as const;
export const daisySwapEffectOptions = ['rotate', 'flip'] as const;

export function selectControl<T extends readonly string[]>(
  options: T,
  description: string,
) {
  return {
    control: 'select',
    options,
    description,
  } as const;
}

export function booleanControl(description: string) {
  return {
    control: 'boolean',
    description,
  } as const;
}

export function numberControl(
  description: string,
  bounds: { min: number; max: number; step?: number },
) {
  return {
    control: {
      type: 'number',
      min: bounds.min,
      max: bounds.max,
      step: bounds.step ?? 1,
    },
    description,
  } as const;
}

export function rangeControl(
  description: string,
  bounds: { min: number; max: number; step?: number },
) {
  return {
    control: {
      type: 'range',
      min: bounds.min,
      max: bounds.max,
      step: bounds.step ?? 1,
    },
    description,
  } as const;
}

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export function optionalModifier(
  prefix: string,
  value: string,
  defaultValue = 'default',
) {
  return value === defaultValue ? undefined : `${prefix}-${value}`;
}
