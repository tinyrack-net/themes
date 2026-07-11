import { describe, expect, it } from 'vitest';
import { consumerUiCoverage, coverageKinds } from './consumer-ui.js';

describe('TinyAuth and Tiny Translate UI replacement coverage', () => {
  it('maps every inventoried entry to a concrete resolution without missing', () => {
    expect(coverageKinds).not.toContain('missing');
    expect(consumerUiCoverage.length).toBeGreaterThanOrEqual(90);

    for (const entry of consumerUiCoverage) {
      expect(coverageKinds).toContain(entry.coverage);
      expect(entry.target.trim().length).toBeGreaterThan(0);
      expect(entry.target.toLocaleLowerCase()).not.toContain('daisyui');
      expect(entry.target.toLocaleLowerCase()).not.toContain('mantine');
    }
  });

  it('covers both consumers and keeps inventory keys unique', () => {
    const counts = new Map<string, number>();
    const keys = new Set<string>();
    for (const entry of consumerUiCoverage) {
      counts.set(entry.consumer, (counts.get(entry.consumer) ?? 0) + 1);
      const key = `${entry.consumer}:${entry.source}:${entry.item}`;
      expect(keys.has(key), `duplicate coverage entry: ${key}`).toBe(false);
      keys.add(key);
    }

    expect(counts.get('tinyauth')).toBeGreaterThanOrEqual(40);
    expect(counts.get('tiny-translate')).toBeGreaterThanOrEqual(40);
  });
});
