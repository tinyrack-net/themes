import { afterAll, beforeAll, describe, it } from 'vitest';
import {
  auditEveryDocument,
  createBrowserAuditRuntime,
} from './browser-audit-runtime.ts';

const runtime = createBrowserAuditRuntime();

describe('built React Router documentation in light desktop mode', () => {
  beforeAll(() => runtime.start());
  afterAll(() => runtime.stop());

  it('renders every document', () =>
    auditEveryDocument(runtime.browser, runtime.origin, {
      name: 'light desktop',
      theme: 'tinyrack-light',
      viewport: { height: 900, width: 1440 },
    }));
});
