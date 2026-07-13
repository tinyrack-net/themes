'use client';

import { Field as BaseField } from '@base-ui/react/field';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type FormControlProps = ComponentProps<typeof BaseField.Control>;
export const FormControl = createComponentPart(BaseField.Control, 'tr-input');
