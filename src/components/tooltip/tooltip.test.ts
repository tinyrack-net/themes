import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Tooltip, TooltipContent, TooltipTrigger } from './react.js';

describe('Tooltip SSR', () => {
  it('renders a deterministic described-by popover contract', () => {
    const html = renderToString(
      createElement(
        Tooltip,
        { openDelay: 0, placement: 'top' },
        createElement(
          TooltipTrigger,
          null,
          createElement('button', { type: 'button' }, 'Info'),
        ),
        createElement(TooltipContent, null, 'Details'),
      ),
    );
    const descriptionId = html.match(/aria-describedby="([^"]+)"/)?.[1];
    expect(descriptionId).toBeTruthy();
    expect(html).toContain(`id="${descriptionId}"`);
    expect(html).toContain('role="tooltip"');
    expect(html).toContain('popover="manual"');
  });
});
