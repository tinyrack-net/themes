export const dividerClassName = 'tr-divider';
export const dividerOrientations = ['horizontal', 'vertical'] as const;

export type DividerOrientation = (typeof dividerOrientations)[number];

export const dividerContract = {
  defaultOrientation: 'horizontal',
} as const satisfies {
  defaultOrientation: DividerOrientation;
};
