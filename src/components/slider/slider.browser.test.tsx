import './slider.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Slider, SliderRoot } from './index.js';

test('renders the Tinyrack Slider wrapper', async () => {
  expect(Slider.Root).toBe(SliderRoot);
  await render(
    <Slider.Root defaultValue={[50]}>
      <Slider.Label>Volume</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
        </Slider.Track>
        <Slider.Thumb />
      </Slider.Control>
    </Slider.Root>,
  );
  expect(document.querySelector('.tr-slider')).not.toBeNull();
});
