import { forwardRef, type HTMLAttributes } from 'react';
import {
  type FormControlSize,
  formContract,
  inputAdornmentClassName,
  inputGroupClassName,
} from './contract.js';

function mergeClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export type InputGroupProps = HTMLAttributes<HTMLDivElement> & {
  invalid?: boolean;
  size?: FormControlSize;
};

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(
    { className, invalid, size = formContract.defaultSize, ...groupProps },
    ref,
  ) {
    return (
      <div
        {...groupProps}
        className={mergeClassNames(inputGroupClassName, className)}
        data-invalid={invalid ? 'true' : undefined}
        data-size={size}
        ref={ref}
      />
    );
  },
);

export type InputAdornmentProps = HTMLAttributes<HTMLSpanElement> & {
  position?: 'start' | 'end';
};

export const InputAdornment = forwardRef<HTMLSpanElement, InputAdornmentProps>(
  function InputAdornment({ className, position = 'start', ...adornmentProps }, ref) {
    return (
      <span
        {...adornmentProps}
        className={mergeClassNames(inputAdornmentClassName, className)}
        data-position={position}
        ref={ref}
      />
    );
  },
);
