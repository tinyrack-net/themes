import { type ButtonHTMLAttributes, forwardRef, type HTMLAttributes } from 'react';
import { Spinner } from '../spinner/react.js';
import {
  type ButtonAppearance,
  type ButtonGroupOrientation,
  type ButtonSize,
  type ButtonVariant,
  buttonClassName,
  buttonContract,
  buttonGroupClassName,
  iconButtonClassName,
} from './contract.js';

export type {
  ButtonAppearance,
  ButtonGroupOrientation,
  ButtonSize,
  ButtonVariant,
} from './contract.js';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  appearance?: ButtonAppearance;
  loading?: boolean;
  loadingLabel?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export type ButtonGroupProps = HTMLAttributes<HTMLDivElement> & {
  attached?: boolean;
  orientation?: ButtonGroupOrientation;
};

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  appearance?: ButtonAppearance;
  label: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

function mergeClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    appearance = buttonContract.defaultAppearance,
    children,
    className,
    disabled,
    loading = false,
    loadingLabel,
    size = buttonContract.defaultSize,
    type = 'button',
    variant = buttonContract.defaultVariant,
    ...buttonProps
  },
  ref,
) {
  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      aria-label={
        loading
          ? (loadingLabel ?? buttonProps['aria-label'])
          : buttonProps['aria-label']
      }
      className={mergeClassNames(buttonClassName, className)}
      data-appearance={appearance}
      data-size={size}
      data-variant={variant}
      disabled={disabled || loading}
      ref={ref}
      type={type}
    >
      {loading ? <Spinner size="sm" /> : null}
      {children}
    </button>
  );
});

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup(
    {
      attached = false,
      className,
      orientation = 'horizontal',
      role = 'group',
      ...groupProps
    },
    ref,
  ) {
    return (
      <div
        {...groupProps}
        className={mergeClassNames(buttonGroupClassName, className)}
        data-attached={attached ? 'true' : undefined}
        data-orientation={orientation}
        ref={ref}
        role={role}
      />
    );
  },
);

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      appearance = buttonContract.defaultAppearance,
      className,
      label,
      size = buttonContract.defaultSize,
      type = 'button',
      variant = buttonContract.defaultVariant,
      ...buttonProps
    },
    ref,
  ) {
    return (
      <button
        {...buttonProps}
        aria-label={label}
        className={mergeClassNames(iconButtonClassName, className)}
        data-appearance={appearance}
        data-size={size}
        data-variant={variant}
        ref={ref}
        type={type}
      />
    );
  },
);
