import type { ComponentProps } from 'react';
import { mergeClassNames } from '../../internal/component-class-name.js';

export type CardRootProps = ComponentProps<'div'> & {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'elevated';
};

export function CardRoot({
  className,
  padding = 'md',
  variant = 'default',
  ...props
}: CardRootProps) {
  return (
    <div
      {...props}
      className={mergeClassNames('tr-card', className)}
      data-padding={padding}
      data-variant={variant}
    />
  );
}
