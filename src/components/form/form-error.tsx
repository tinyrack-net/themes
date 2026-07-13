'use client';

import { Field as BaseField } from '@base-ui/react/field';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type FormErrorProps = ComponentProps<typeof BaseField.Error>;
export const FormError = createComponentPart(BaseField.Error, 'tr-form-message');
