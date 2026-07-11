import '../../core/core.css';
import './pin-input.css';
import { createRef } from 'react';
import { expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { PinInput, type PinInputRef } from './react.js';

test('PinInput accepts digits, advances, normalizes paste and completes', async () => {
  const onChange = vi.fn();
  const onComplete = vi.fn();
  const screen = await render(
    <PinInput length={4} onChange={onChange} onComplete={onComplete} />,
  );
  const first = screen.getByLabelText('Digit 1 of 4');
  await first.fill('1');
  expect(document.activeElement?.getAttribute('aria-label')).toBe('Digit 2 of 4');

  const firstElement = first.element() as HTMLInputElement;
  const paste = new Event('paste', { bubbles: true, cancelable: true });
  Object.defineProperty(paste, 'clipboardData', {
    value: { getData: () => '1a2-34' },
  });
  firstElement.dispatchEvent(paste);
  await new Promise((resolve) => requestAnimationFrame(resolve));

  expect(onChange).toHaveBeenLastCalledWith('1234');
  expect(onComplete).toHaveBeenCalledWith('1234');
  expect(
    screen
      .getByRole('textbox')
      .all()
      .map((input) => (input.element() as HTMLInputElement).value),
  ).toEqual(['1', '2', '3', '4']);
});

test('PinInput supports disabled and invalid state plus focus and clear ref methods', async () => {
  const ref = createRef<PinInputRef>();
  const screen = await render(
    <PinInput defaultValue="1234" invalid length={4} ref={ref} />,
  );
  const group = screen.getByRole('group');
  expect(group.element().getAttribute('aria-invalid')).toBe('true');

  ref.current?.clear();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  expect(
    screen
      .getByRole('textbox')
      .all()
      .every((input) => (input.element() as HTMLInputElement).value === ''),
  ).toBe(true);
  expect(document.activeElement).toBe(screen.getByLabelText('Digit 1 of 4').element());

  const disabled = await render(<PinInput disabled length={4} />);
  expect(
    Array.from(disabled.container.querySelectorAll('input[type="text"]')).every(
      (input) => input.hasAttribute('disabled'),
    ),
  ).toBe(true);
});
