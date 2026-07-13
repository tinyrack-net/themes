import './meter.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Meter, MeterRoot } from './index.js';

test('renders the Tinyrack Meter wrapper', async () => {
  expect(Meter.Root).toBe(MeterRoot);
  await render(
    <Meter.Root value={60}>
      <Meter.Label>Usage</Meter.Label>
      <Meter.Track>
        <Meter.Indicator />
      </Meter.Track>
      <Meter.Value />
    </Meter.Root>,
  );
  expect(document.querySelector('.tr-meter')).not.toBeNull();
});
