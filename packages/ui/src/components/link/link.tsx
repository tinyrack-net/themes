'use client';

import { useRender } from '@base-ui/react/use-render';
import { mergeClassNames } from '../../internal/component-class-name.js';

export type LinkUnderline = 'always' | 'hover' | 'none';
export type LinkVariant = 'default' | 'muted' | 'primary' | 'danger';
export type LinkProps = useRender.ComponentProps<'a'> & {
  underline?: LinkUnderline;
  variant?: LinkVariant;
};

export function Link({
  className,
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
      className: mergeClassNames('tr-link', className),
      'data-underline': underline,
      'data-variant': variant,
    },
    ref,
    render,
  });
}
