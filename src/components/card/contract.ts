export const cardClassName = 'tr-card';
export const cardVariants = ['default', 'muted'] as const;
export const cardPaddings = ['sm', 'md', 'lg'] as const;

export type CardVariant = (typeof cardVariants)[number];
export type CardPadding = (typeof cardPaddings)[number];

export const cardContract = {
  defaultPadding: 'md',
  defaultVariant: 'default',
} as const satisfies {
  defaultPadding: CardPadding;
  defaultVariant: CardVariant;
};
