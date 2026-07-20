import { afterAll, beforeAll, describe, it } from 'vitest';
import {
  auditEveryDocument,
  createBrowserAuditRuntime,
} from './browser-audit-runtime.ts';

const runtime = createBrowserAuditRuntime();

describe('built React Router documentation in dark mobile mode', () => {
  beforeAll(() => runtime.start());
  afterAll(() => runtime.stop());

  it('renders every document', () =>
    auditEveryDocument(runtime.browser, runtime.origin, {
      name: 'dark mobile',
      theme: 'tinyrack-dark',
      viewport: { height: 844, width: 390 },
    }));
});
