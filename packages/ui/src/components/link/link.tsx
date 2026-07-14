'use client';

import { useRender } from '@base-ui/react/use-render';
import { mergeClassNames } from '../../internal/component-class-name.js';

export type LinkUnderline = 'always' | 'hover' | 'none';
export type LinkVariant = 'default' | 'muted' | 'danger';
export type LinkProps = useRender.ComponentProps<'a'> & {
  disabled?: boolean;
  underline?: LinkUnderline;
  variant?: LinkVariant;
};
type LinkClickEvent = Parameters<NonNullable<LinkProps['onClick']>>[0];
type LinkKeyDownEvent = Parameters<NonNullable<LinkProps['onKeyDown']>>[0];

export function Link({
  className,
  disabled = false,
  href,
  onClick,
  onKeyDown,
  ref,
  render,
  underline = 'hover',
  variant = 'default',
  ...props
}: LinkProps) {
  return useRender({
    defaultTagName: 'a',
    props: {
      ...props,
      'aria-disabled': disabled || undefined,
      className: mergeClassNames('tr-link', className),
      'data-disabled': disabled ? '' : undefined,
      'data-underline': underline,
      'data-variant': variant,
      href: disabled ? undefined : href,
      onClick(event: LinkClickEvent) {
        if (disabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClick?.(event);
      },
      onKeyDown(event: LinkKeyDownEvent) {
        if (disabled && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onKeyDown?.(event);
      },
      tabIndex: disabled ? -1 : props.tabIndex,
    },
    ref,
    render,
  });
}
