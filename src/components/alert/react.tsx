import { forwardRef, type HTMLAttributes } from 'react';
import { type AlertVariant, alertClassName, alertContract } from './contract.js';

export type { AlertVariant } from './contract.js';

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
};

function mergeClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { className, variant = alertContract.defaultVariant, ...alertProps },
  ref,
) {
  return (
    <div
      {...alertProps}
      className={mergeClassNames(alertClassName, className)}
      data-variant={variant}
      ref={ref}
    />
  );
});
