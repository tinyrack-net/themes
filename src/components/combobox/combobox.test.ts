import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
} from './react.js';

describe('Combobox SSR', () => {
  it('renders a deterministic select and hidden form contract', () => {
    const html = renderToString(
      createElement(
        Combobox,
        { defaultInputValue: 'English', defaultValue: 'en', name: 'language' },
        createElement(ComboboxInput, { 'aria-label': 'Language' }),
        createElement(
          ComboboxContent,
          null,
          createElement(
            ComboboxList,
            null,
            createElement(ComboboxOption, { value: 'en' }, 'English'),
          ),
          createElement(ComboboxEmpty, null, 'No language'),
        ),
      ),
    );
    expect(html).toContain('role="combobox"');
    expect(html).toContain('aria-haspopup="listbox"');
    expect(html).toContain('role="option"');
    expect(html).toContain('aria-selected="true"');
    expect(html).toContain('type="hidden"');
    expect(html).toContain('name="language"');
    expect(html).toContain('value="en"');
  });
});
