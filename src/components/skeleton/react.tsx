import { forwardRef, type HTMLAttributes } from 'react';
import { type SkeletonShape, skeletonClassName, skeletonContract } from './contract.js';

export type { SkeletonShape } from './contract.js';

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  animate?: boolean;
  shape?: SkeletonShape;
};

function mergeClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  {
    animate = skeletonContract.defaultAnimate,
    className,
    shape = skeletonContract.defaultShape,
    ...skeletonProps
  },
  ref,
) {
  return (
    <div
      {...skeletonProps}
      aria-hidden={skeletonProps['aria-hidden'] ?? true}
      className={mergeClassNames(skeletonClassName, className)}
      data-animate={animate ? 'true' : 'false'}
      data-shape={shape}
      ref={ref}
    />
  );
});
