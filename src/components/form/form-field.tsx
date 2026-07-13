'use client';

import { Field as BaseField } from '@base-ui/react/field';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type FormFieldProps = ComponentProps<typeof BaseField.Root>;
export const FormField = createComponentPart(BaseField.Root, 'tr-field');
