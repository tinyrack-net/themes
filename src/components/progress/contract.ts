export const progressClassName = 'tr-progress';
export const progressSizes = ['sm', 'md', 'lg'] as const;
export const progressVariants = ['neutral', 'primary', 'danger'] as const;

export type ProgressSize = (typeof progressSizes)[number];
export type ProgressVariant = (typeof progressVariants)[number];

export const progressContract = {
  defaultSize: 'md',
  defaultVariant: 'primary',
} as const satisfies {
  defaultSize: ProgressSize;
  defaultVariant: ProgressVariant;
};
