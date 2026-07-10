export const alertClassName = 'tr-alert';
export const alertVariants = ['neutral', 'primary', 'danger'] as const;

export type AlertVariant = (typeof alertVariants)[number];

export const alertContract = {
  defaultVariant: 'neutral',
} as const satisfies {
  defaultVariant: AlertVariant;
};
