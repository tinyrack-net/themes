import { type DetailsHTMLAttributes, forwardRef, type HTMLAttributes } from 'react';
import {
  disclosureClassName,
  disclosureContentClassName,
  disclosureSummaryClassName,
} from './contract.js';

function mergeClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export type DisclosureProps = DetailsHTMLAttributes<HTMLDetailsElement>;
export type DisclosureSummaryProps = HTMLAttributes<HTMLElement>;
export type DisclosureContentProps = HTMLAttributes<HTMLDivElement>;

export const Disclosure = forwardRef<HTMLDetailsElement, DisclosureProps>(
  function Disclosure({ className, ...disclosureProps }, ref) {
    return (
      <details
        {...disclosureProps}
        className={mergeClassNames(disclosureClassName, className)}
        ref={ref}
      />
    );
  },
);

export const DisclosureSummary = forwardRef<HTMLElement, DisclosureSummaryProps>(
  function DisclosureSummary({ className, ...summaryProps }, ref) {
    return (
      <summary
        {...summaryProps}
        className={mergeClassNames(disclosureSummaryClassName, className)}
        ref={ref}
      />
    );
  },
);

export const DisclosureContent = forwardRef<HTMLDivElement, DisclosureContentProps>(
  function DisclosureContent({ className, ...contentProps }, ref) {
    return (
      <div
        {...contentProps}
        className={mergeClassNames(disclosureContentClassName, className)}
        ref={ref}
      />
    );
  },
);
