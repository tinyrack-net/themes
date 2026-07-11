import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import {
  FieldDescription,
  Input,
  InputAdornment,
  InputGroup,
  RadioGroup,
  Textarea,
} from './react.js';

describe('Form enhancements', () => {
  it('renders descriptions, adornments, autosize bounds and segmented groups', () => {
    const description = renderToString(createElement(FieldDescription, null, 'Hint'));
    const group = renderToString(
      createElement(
        InputGroup,
        { invalid: true },
        createElement(InputAdornment, { position: 'start' }, '$'),
        createElement(Input, { 'aria-label': 'Cost' }),
      ),
    );
    const textarea = renderToString(
      createElement(Textarea, { autosize: true, minRows: 2, maxRows: 6 }),
    );
    const radios = renderToString(
      createElement(RadioGroup, { appearance: 'segmented' }),
    );

    expect(description).toContain('tr-field-description');
    expect(group).toContain('class="tr-input-group"');
    expect(group).toContain('data-invalid="true"');
    expect(group).toContain('data-position="start"');
    expect(textarea).toContain('data-autosize="true"');
    expect(textarea).toContain('data-min-rows="2"');
    expect(textarea).toContain('data-max-rows="6"');
    expect(radios).toContain('data-appearance="segmented"');
  });
});
