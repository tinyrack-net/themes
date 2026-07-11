export const spinnerClassName = 'tr-spinner';
export const spinnerSizes = ['sm', 'md', 'lg'] as const;
export const spinnerVariants = [
  'currentColor',
  'neutral',
  'primary',
  'danger',
] as const;

export type SpinnerSize = (typeof spinnerSizes)[number];
export type SpinnerVariant = (typeof spinnerVariants)[number];

export const spinnerContract = {
  defaultSize: 'md',
  defaultVariant: 'currentColor',
} as const satisfies {
  defaultSize: SpinnerSize;
  defaultVariant: SpinnerVariant;
};
