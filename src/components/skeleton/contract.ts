export const skeletonClassName = 'tr-skeleton';
export const skeletonShapes = ['text', 'rectangle', 'circle'] as const;

export type SkeletonShape = (typeof skeletonShapes)[number];

export const skeletonContract = {
  defaultAnimate: true,
  defaultShape: 'text',
} as const satisfies {
  defaultAnimate: boolean;
  defaultShape: SkeletonShape;
};
