'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type SelectPositionerProps = ComponentProps<typeof BaseSelect.Positioner>;
export const SelectPositioner = createComponentPart(
  BaseSelect.Positioner,
  'tr-select-positioner',
);
