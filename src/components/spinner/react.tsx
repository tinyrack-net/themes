import { forwardRef, type HTMLAttributes } from 'react';
import {
  type SpinnerSize,
  type SpinnerVariant,
  spinnerClassName,
  spinnerContract,
} from './contract.js';

export type { SpinnerSize, SpinnerVariant } from './contract.js';

export type SpinnerProps = Omit<HTMLAttributes<HTMLSpanElement>, 'role'> & {
  label?: string;
  size?: SpinnerSize;
  variant?: SpinnerVariant;
};

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  {
    'aria-label': ariaLabel,
    className,
    label,
    size = spinnerContract.defaultSize,
    variant = spinnerContract.defaultVariant,
    ...spinnerProps
  },
  ref,
) {
  const accessibleLabel = ariaLabel ?? label;

  if (accessibleLabel === undefined) {
    return (
      <span
        {...spinnerProps}
        aria-hidden="true"
        className={[spinnerClassName, className].filter(Boolean).join(' ')}
        data-size={size}
        data-variant={variant}
        ref={ref}
        role="presentation"
      />
    );
  }

  return (
    <span
      {...spinnerProps}
      aria-label={accessibleLabel}
      className={[spinnerClassName, className].filter(Boolean).join(' ')}
      data-size={size}
      data-variant={variant}
      ref={ref}
      role="status"
    />
  );
});
