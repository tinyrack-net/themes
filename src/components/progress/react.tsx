import { forwardRef, type ProgressHTMLAttributes } from 'react';
import {
  type ProgressSize,
  type ProgressVariant,
  progressClassName,
  progressContract,
} from './contract.js';

export type { ProgressSize, ProgressVariant } from './contract.js';

export type ProgressProps = ProgressHTMLAttributes<HTMLProgressElement> & {
  size?: ProgressSize;
  variant?: ProgressVariant;
};

function mergeClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(
  function Progress(
    {
      className,
      size = progressContract.defaultSize,
      variant = progressContract.defaultVariant,
      ...progressProps
    },
    ref,
  ) {
    return (
      <progress
        {...progressProps}
        className={mergeClassNames(progressClassName, className)}
        data-size={size}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);
