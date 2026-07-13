import { FormControl } from './form-control.js';
import { FormDescription } from './form-description.js';
import { FormError } from './form-error.js';
import { FormField } from './form-field.js';
import { FormLabel } from './form-label.js';

export const Form = {
  Field: FormField,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Error: FormError,
} as const;

export type { FormControlProps } from './form-control.js';
export type { FormDescriptionProps } from './form-description.js';
export type { FormErrorProps } from './form-error.js';
export type { FormFieldProps } from './form-field.js';
export type { FormLabelProps } from './form-label.js';
export { FormControl, FormDescription, FormError, FormField, FormLabel };
