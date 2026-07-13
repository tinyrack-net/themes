import './preview-card.css';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { PreviewCard, PreviewCardRoot } from './index.js';

test('renders the Tinyrack PreviewCard wrapper', async () => {
  expect(PreviewCard.Root).toBe(PreviewCardRoot);
  await render(
    <PreviewCard.Root>
      <PreviewCard.Trigger href="#preview">Preview</PreviewCard.Trigger>
    </PreviewCard.Root>,
  );
  expect(document.querySelector('.tr-preview-card-trigger')).not.toBeNull();
});
