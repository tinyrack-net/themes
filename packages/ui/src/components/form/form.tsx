'use client';

import { Form as BaseForm, type FormProps as BaseFormProps } from '@base-ui/react/form';
import { mergeComponentClassName } from '../../internal/component-class-name.js';

export type FormValues = Record<string, unknown>;
export type FormProps<Values extends FormValues = FormValues> = BaseFormProps<Values>;

export function Form<Values extends FormValues = FormValues>({
  className,
  ...props
}: FormProps<Values>) {
  return (
    <BaseForm<Values>
      {...props}
      className={mergeComponentClassName('tr-form', className)}
    />
  );
}
