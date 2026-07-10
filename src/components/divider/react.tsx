import { forwardRef, type HTMLAttributes } from 'react';
import {
  type DividerOrientation,
  dividerClassName,
  dividerContract,
} from './contract.js';

export type { DividerOrientation } from './contract.js';

export type DividerProps = HTMLAttributes<HTMLHRElement> & {
  orientation?: DividerOrientation;
};

function mergeClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
  { className, orientation = dividerContract.defaultOrientation, ...dividerProps },
  ref,
) {
  return (
    <hr
      {...dividerProps}
      aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
      className={mergeClassNames(dividerClassName, className)}
      data-orientation={orientation}
      ref={ref}
    />
  );
});
