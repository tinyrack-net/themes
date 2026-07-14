'use client';

import { useRender } from '@base-ui/react/use-render';
import { mergeClassNames } from '../../internal/component-class-name.js';

export type AppShellMainProps = useRender.ComponentProps<'main'>;

export function AppShellMain({ className, ref, render, ...props }: AppShellMainProps) {
  return useRender({
    defaultTagName: 'main',
    props: { ...props, className: mergeClassNames('tr-app-shell-main', className) },
    ref,
    render,
  });
}
