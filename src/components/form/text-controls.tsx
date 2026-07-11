import {
  forwardRef,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import {
  type FormControlSize,
  formContract,
  inputClassName,
  selectClassName,
  textareaClassName,
} from './contract.js';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  invalid?: boolean;
  size?: FormControlSize;
};

export type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
> & {
  autosize?: boolean;
  invalid?: boolean;
  maxRows?: number;
  minRows?: number;
  size?: FormControlSize;
};

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
  invalid?: boolean;
  size?: FormControlSize;
};

function mergeClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

function invalidState(invalid: boolean | undefined) {
  return invalid ? 'true' : undefined;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, size = formContract.defaultSize, ...inputProps },
  ref,
) {
  return (
    <input
      {...inputProps}
      aria-invalid={invalid ? true : inputProps['aria-invalid']}
      className={mergeClassNames(inputClassName, className)}
      data-invalid={invalidState(invalid)}
      data-size={size}
      ref={ref}
    />
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      autosize = false,
      className,
      invalid,
      maxRows,
      minRows,
      rows,
      size = formContract.defaultSize,
      style,
      ...textareaProps
    },
    ref,
  ) {
    return (
      <textarea
        {...textareaProps}
        aria-invalid={invalid ? true : textareaProps['aria-invalid']}
        className={mergeClassNames(textareaClassName, className)}
        data-autosize={autosize ? 'true' : undefined}
        data-invalid={invalidState(invalid)}
        data-max-rows={maxRows}
        data-min-rows={minRows}
        data-size={size}
        ref={ref}
        rows={rows ?? minRows}
        style={{
          ...style,
          maxHeight: maxRows === undefined ? style?.maxHeight : `${maxRows}lh`,
        }}
      />
    );
  },
);

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, invalid, size = formContract.defaultSize, ...selectProps },
  ref,
) {
  return (
    <select
      {...selectProps}
      aria-invalid={invalid ? true : selectProps['aria-invalid']}
      className={mergeClassNames(selectClassName, className)}
      data-invalid={invalidState(invalid)}
      data-size={size}
      ref={ref}
    />
  );
});
