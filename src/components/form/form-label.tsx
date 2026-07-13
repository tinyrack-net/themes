'use client';

import { Field as BaseField } from '@base-ui/react/field';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type FormLabelProps = ComponentProps<typeof BaseField.Label>;
export const FormLabel = createComponentPart(BaseField.Label, 'tr-label');
