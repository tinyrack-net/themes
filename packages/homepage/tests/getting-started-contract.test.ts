import { describe, expect, it } from 'vitest';
import { gettingStartedContract } from '../app/documentation/shared/getting-started-contract.js';

describe('canonical getting-started snippets', () => {
  it('uses the real Vite plugin, CSS order, theme, and current button intent', () => {
    expect(gettingStartedContract.vite).toContain(
      "import tailwindcss from '@tailwindcss/vite';",
    );
    expect(gettingStartedContract.vite).toContain('tailwindcss()');
    expect(gettingStartedContract.styles.indexOf('@tinyrack/ui/core.css')).toBeLessThan(
      gettingStartedContract.styles.indexOf('@tinyrack/ui/components/button.css'),
    );
    expect(gettingStartedContract.theme).toContain('data-theme="rack-blue"');
    expect(gettingStartedContract.button).toContain('<TRButton intent="primary">');
    expect(gettingStartedContract.button).not.toContain('variant=');
  });
});
