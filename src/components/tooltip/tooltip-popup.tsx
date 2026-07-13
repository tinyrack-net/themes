'use client';

import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type TooltipPopupProps = ComponentProps<typeof BaseTooltip.Popup>;
export const TooltipPopup = createComponentPart(
  BaseTooltip.Popup,
  'tr-layer tr-tooltip-content',
);
