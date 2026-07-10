import { forwardRef, type HTMLAttributes } from 'react';
import {
  type CardPadding,
  type CardVariant,
  cardClassName,
  cardContract,
} from './contract.js';

export type { CardPadding, CardVariant } from './contract.js';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  padding?: CardPadding;
  variant?: CardVariant;
};

function mergeClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    className,
    padding = cardContract.defaultPadding,
    variant = cardContract.defaultVariant,
    ...cardProps
  },
  ref,
) {
  return (
    <div
      {...cardProps}
      className={mergeClassNames(cardClassName, className)}
      data-padding={padding}
      data-variant={variant}
      ref={ref}
    />
  );
});
