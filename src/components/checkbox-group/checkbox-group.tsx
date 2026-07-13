'use client';

import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type CheckboxGroupProps = ComponentProps<typeof BaseCheckboxGroup>;
export const CheckboxGroup = createComponentPart(
  BaseCheckboxGroup,
  'tr-checkbox-group',
);
