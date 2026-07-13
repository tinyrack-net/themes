'use client';

import { Field as BaseField } from '@base-ui/react/field';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type FormDescriptionProps = ComponentProps<typeof BaseField.Description>;
export const FormDescription = createComponentPart(
  BaseField.Description,
  'tr-field-description',
);
