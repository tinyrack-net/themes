import type { ComponentProps } from 'react';
import { mergeClassNames } from '../../internal/component-class-name.js';

export type TableDensity = 'compact' | 'comfortable' | 'spacious';
export type TableRootProps = ComponentProps<'table'> & {
  containerClassName?: string;
  density?: TableDensity;
  striped?: boolean;
};

export function TableRoot({
  className,
  containerClassName,
  density = 'comfortable',
  striped = false,
  ...props
}: TableRootProps) {
  return (
    <div className={mergeClassNames('tr-table-container', containerClassName)}>
      <table
        {...props}
        className={mergeClassNames('tr-table', className)}
        data-density={density}
        data-striped={striped ? 'true' : undefined}
      />
    </div>
  );
}
