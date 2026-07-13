import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { CSPProvider } from './csp/index.js';
import { DirectionProvider, useDirection } from './direction/index.js';

function DirectionProbe() {
  const direction = useDirection();
  return <output data-testid="direction">{direction}</output>;
}

test('composes CSP and direction behavior through public providers', async () => {
  const screen = await render(
    <CSPProvider nonce="tinyrack-test-nonce">
      <DirectionProvider direction="rtl">
        <DirectionProbe />
      </DirectionProvider>
    </CSPProvider>,
  );

  await expect.element(screen.getByTestId('direction')).toHaveTextContent('rtl');
});
