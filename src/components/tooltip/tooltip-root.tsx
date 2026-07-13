'use client';

import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import type { ComponentProps } from 'react';
import { createComponentPart } from '../../internal/component-part.js';

export type TooltipRootProps = ComponentProps<typeof BaseTooltip.Root>;
export const TooltipRoot = createComponentPart(BaseTooltip.Root);
